import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getApps, initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Returns the current ISO 8601 week string, e.g. '2026-W25'.
 * Used as a deduplication key stored on each device_token row.
 */
function getISOWeekString(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayOfWeek = d.getUTCDay() || 7; // Sunday = 7
  d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek); // Shift to Thursday of the same week
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/**
 * Initialise Firebase Admin SDK once per cold start.
 * Serverless functions may be re-imported; the apps.length guard prevents
 * "app already exists" errors on subsequent invocations in the same process.
 */
function initFirebase() {
  if (getApps().length > 0) return;
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON!
  ) as ServiceAccount;
  initializeApp({ credential: cert(serviceAccount) });
}

/**
 * GET /api/cron/weekly-reminders
 *
 * Invoked by Vercel Cron every Sunday at 21:00 UTC (≈ Monday 09:00 NZST).
 * Protected by CRON_SECRET — Vercel injects it as Bearer token automatically.
 *
 * Logic:
 *  1. Find all device_tokens not yet notified for the current ISO week.
 *  2. For each unique user, confirm they own at least one plant (is_project=false).
 *  3. Send a single FCM notification to every token for that user.
 *  4. Mark each successfully-sent token with the current week string.
 *  5. Remove any tokens that FCM reports as invalid/unregistered.
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

  const currentWeek = getISOWeekString();
  console.log(`🌿 Weekly reminders cron — week: ${currentWeek}`);

  try {
    initFirebase();
  } catch (err: any) {
    console.error('❌ Firebase init error:', err);
    return NextResponse.json(
      { error: `Firebase init failed: ${err.message}` },
      { status: 500 }
    );
  }

  // Fetch tokens that have not yet been notified this week.
  const { data: tokens, error: tokensError } = await supabaseAdmin
    .from('device_tokens')
    .select('id, user_id, token, last_notified_week')
    .or(`last_notified_week.is.null,last_notified_week.neq.${currentWeek}`);

  if (tokensError) {
    console.error('❌ Error fetching device tokens:', tokensError);
    return NextResponse.json({ error: tokensError.message }, { status: 500 });
  }

  if (!tokens || tokens.length === 0) {
    console.log('✅ All tokens already notified for this week');
    return NextResponse.json({ sent: 0, skipped: 0, failed: 0 });
  }

  // Group token rows by user so we can check plants once per user.
  const tokensByUser = new Map<string, { id: string; token: string }[]>();
  for (const row of tokens) {
    if (!tokensByUser.has(row.user_id)) {
      tokensByUser.set(row.user_id, []);
    }
    tokensByUser.get(row.user_id)!.push({ id: row.id, token: row.token });
  }

  const messaging = getMessaging();
  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const [userId, userTokens] of tokensByUser) {
    // Fetch owned plants (non-project) including sick status for personalised copy.
    const { data: ownedPlants } = await supabaseAdmin
      .from('user_plants')
      .select('id, is_sick')
      .eq('user_id', userId)
      .eq('is_project', false);

    if (!ownedPlants || ownedPlants.length === 0) {
      console.log(`⏭️  Skipping user ${userId} — no owned plants`);
      skipped++;
      continue;
    }

    const sickCount = ownedPlants.filter((p: { is_sick: boolean | null }) => p.is_sick).length;

    // Build notification copy — mention sick plants if any are flagged.
    // TODO: Future hedge reminders — extend personalisation using plant_task_rules for the current
    // week (hedge trims, feeds) and surface task-specific copy instead of the generic message.
    // TODO: Monthly Garden Report — add a separate monthly cron (or Pro variant) that sends a
    // summary: tasks completed, sick plants resolved, and upcoming planting windows.
    const notifTitle = 'Your garden needs attention 🌿';
    const notifBody = sickCount > 0
      ? sickCount === 1
        ? "One of your plants still needs a follow-up check. See this week's tasks in the Calendar."
        : `${sickCount} of your plants need follow-up checks. See this week's tasks in the Calendar.`
      : "Open your care calendar to see this week's tasks.";

    for (const { id: tokenId, token } of userTokens) {
      try {
        await messaging.send({
          token,
          notification: {
            title: notifTitle,
            body: notifBody,
          },
          data: { path: '/calendar' },
          android: {
            priority: 'normal',
            notification: {
              // Matches the default notification channel on Android.
              // The app must register this channel on first launch (handled by
              // Capacitor PushNotifications plugin automatically).
              channelId: 'default',
            },
          },
        });

        // Record that this token has been notified for the current week.
        await supabaseAdmin
          .from('device_tokens')
          .update({
            last_notified_week: currentWeek,
            updated_at: new Date().toISOString(),
          })
          .eq('id', tokenId);

        console.log(`✅ Notified user ${userId} via token ${tokenId}`);
        sent++;
      } catch (err: any) {
        const code: string = err?.errorInfo?.code ?? '';
        const isStale =
          code === 'messaging/invalid-registration-token' ||
          code === 'messaging/registration-token-not-registered';

        if (isStale) {
          // Token is no longer valid — clean it up so we don't try again.
          await supabaseAdmin.from('device_tokens').delete().eq('id', tokenId);
          console.log(`🗑️  Removed stale token ${tokenId}`);
        } else {
          console.error(`❌ FCM send failed for token ${tokenId}:`, err.message);
        }
        failed++;
      }
    }
  }

  console.log(`📊 Done — sent: ${sent}, skipped: ${skipped}, failed: ${failed}`);
  return NextResponse.json({ sent, skipped, failed });
}
