import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getApps, initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Initialise Firebase Admin SDK once per cold start.
 * The getApps() guard prevents "app already exists" errors if this module
 * is imported in the same process as another route that also calls initializeApp.
 */
function initFirebase() {
  if (getApps().length > 0) return;
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON!
  ) as ServiceAccount;
  initializeApp({ credential: cert(serviceAccount) });
}

/**
 * GET /api/cron/sick-followups
 *
 * Invoked by Vercel Cron every Wednesday at 22:00 UTC (≈ Thursday 10:00 NZST).
 * Sending mid-week keeps it distinct from the Monday weekly-reminder.
 *
 * Trigger: plant_logs rows where:
 *   - status = 'Ongoing'  (issue not resolved)
 *   - created_at ≤ 30 days ago  (issue has been ongoing long enough)
 *   - last_notified_at IS NULL OR last_notified_at ≤ 30 days ago
 *     (not notified within the current 30-day window)
 *
 * Dedupe: last_notified_at is written to plant_logs after a successful send.
 * The same log is ignored for another 30 days. If all sends fail (stale tokens),
 * last_notified_at is NOT written so the cron retries next week.
 *
 * Deep link: /plants/[plants.id] when the catalog plant ID is available,
 * otherwise /dashboard.
 *
 * Returns: { sent, skipped, failed }
 */
export async function GET(req: Request) {
  // Verify Vercel cron secret. Skip check in local dev if var is unset.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  console.log('🤒 Sick plant follow-up cron starting...');

  try {
    initFirebase();
  } catch (err: any) {
    console.error('❌ Firebase init error:', err);
    return NextResponse.json(
      { error: `Firebase init failed: ${err.message}` },
      { status: 500 }
    );
  }

  // Cutoff: 30 days ago. Logs older than this (and still Ongoing) are eligible.
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const cutoff = thirtyDaysAgo.toISOString();

  // Fetch eligible sick-plant logs with the plant name + ID for notification copy
  // and deep-link construction. The join mirrors the dashboard's 30-day query.
  const { data: logs, error: logsError } = await supabaseAdmin
    .from('plant_logs')
    .select(
      `id,
       user_id,
       issue_type,
       created_at,
       last_notified_at,
       user_plants (
         nickname,
         plants ( id, common_name )
       )`
    )
    .eq('status', 'Ongoing')
    .lte('created_at', cutoff)
    .or(`last_notified_at.is.null,last_notified_at.lte.${cutoff}`);

  if (logsError) {
    console.error('❌ Error fetching sick plant logs:', logsError);
    return NextResponse.json({ error: logsError.message }, { status: 500 });
  }

  if (!logs || logs.length === 0) {
    console.log('✅ No sick plant follow-ups needed');
    return NextResponse.json({ sent: 0, skipped: 0, failed: 0 });
  }

  console.log(`🔍 Found ${logs.length} sick plant log(s) needing follow-up`);

  const messaging = getMessaging();
  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const log of logs) {
    // ── Resolve plant metadata from the nested join ───────────────────────────
    // Supabase infers the FK-joined row as an array; cast through unknown to
    // access it as a single object (plant_logs.user_plant_id is a many-to-one).
    const userPlant = (log.user_plants as unknown) as {
      nickname: string | null;
      plants: { id: number; common_name: string | null } | null;
    } | null;
    const plant = userPlant?.plants ?? null;

    // Prefer the user's nickname for the plant; fall back to catalog name.
    const plantName = userPlant?.nickname?.trim() || plant?.common_name?.trim() || 'your plant';
    const plantId   = plant?.id ?? null;

    const issueName = (log.issue_type as string | null)?.trim().toLowerCase() || 'an issue';

    const daysSince = Math.floor(
      (Date.now() - new Date(log.created_at as string).getTime()) / (1000 * 60 * 60 * 24)
    );

    const title = `How is your ${plantName} doing? 🌿`;
    const body  = `It's been ${daysSince} days since you logged ${issueName}.`;
    const path  = plantId ? `/plants/${plantId}?mode=my-garden` : '/dashboard';

    // ── Fetch device tokens for this user ─────────────────────────────────────
    const { data: tokens } = await supabaseAdmin
      .from('device_tokens')
      .select('id, token')
      .eq('user_id', log.user_id as string);

    if (!tokens || tokens.length === 0) {
      console.log(`⏭️  Skipping log ${log.id} (${plantName}) — no device tokens for user`);
      skipped++;
      continue;
    }

    console.log(`🌱 Notifying user about ${plantName}: "${issueName}", ${daysSince} days → ${path}`);

    // ── Send to each of the user's tokens ─────────────────────────────────────
    let sentForThisLog = false;

    for (const { id: tokenId, token } of tokens) {
      try {
        await messaging.send({
          token,
          notification: { title, body },
          data: { path },
          android: {
            priority: 'normal',
            notification: { channelId: 'default' },
          },
        });

        console.log(`✅ Sent sick follow-up to token ${tokenId}`);
        sent++;
        sentForThisLog = true;
      } catch (err: any) {
        const code: string = err?.errorInfo?.code ?? '';
        const isStale =
          code === 'messaging/invalid-registration-token' ||
          code === 'messaging/registration-token-not-registered';

        if (isStale) {
          // Token is no longer valid — remove it immediately.
          await supabaseAdmin.from('device_tokens').delete().eq('id', tokenId);
          console.log(`🗑️  Removed stale token ${tokenId}`);
        } else {
          console.error(`❌ FCM send failed for token ${tokenId}:`, err.message);
        }
        failed++;
      }
    }

    // ── Dedup: write last_notified_at only when at least one send succeeded ───
    // If every token was stale or errored, do NOT write last_notified_at so the
    // cron retries next week (rather than silently suppressing for 30 days).
    if (sentForThisLog) {
      const { error: updateError } = await supabaseAdmin
        .from('plant_logs')
        .update({ last_notified_at: new Date().toISOString() })
        .eq('id', log.id as string);

      if (updateError) {
        console.error(`❌ Failed to update last_notified_at for log ${log.id}:`, updateError.message);
      }
    }
  }

  console.log(`📊 Sick follow-ups done — sent: ${sent}, skipped: ${skipped}, failed: ${failed}`);
  return NextResponse.json({ sent, skipped, failed });
}
