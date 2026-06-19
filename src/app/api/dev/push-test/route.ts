import { NextResponse } from 'next/server';
import { getApps, initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

/**
 * DEV-ONLY — POST /api/dev/push-test
 *
 * Sends a single FCM notification to one explicit device token using the same
 * Firebase Admin payload as production crons. Use this instead of the Firebase
 * Console to verify that `data.path` arrives correctly in Android Intent extras.
 *
 * Request body:
 *   {
 *     token: string   — the raw FCM registration token to target
 *     path?: string   — deep-link path (defaults to "/calendar")
 *   }
 *
 * Auth: Bearer <CRON_SECRET> in the Authorization header.
 *
 * Returns:
 *   { ok, tokenPrefix, title, body, path, messageId }
 *
 * This route must never be called by production crons. It exists purely for
 * verifying end-to-end notification delivery during development.
 */

function initFirebase() {
  if (getApps().length > 0) return;
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON!
  ) as ServiceAccount;
  initializeApp({ credential: cert(serviceAccount) });
}

export async function POST(req: Request) {
  // Auth — same CRON_SECRET used by the production cron routes.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  let body: { token?: string; path?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { token, path = '/calendar' } = body;

  if (!token || typeof token !== 'string' || token.trim() === '') {
    return NextResponse.json(
      { error: 'Missing required field: token' },
      { status: 400 }
    );
  }

  try {
    initFirebase();
  } catch (err: any) {
    return NextResponse.json(
      { error: `Firebase init failed: ${err.message}` },
      { status: 500 }
    );
  }

  const title = 'Test notification 🌿';
  const bodyText = `Dev push test — deep link: ${path}`;

  try {
    const messageId = await getMessaging().send({
      token: token.trim(),
      notification: { title, body: bodyText },
      // data fields must be string→string. This is the payload
      // that populates Android Intent extras on cold-start tap.
      data: { path },
      android: {
        priority: 'high',
        notification: { channelId: 'default' },
      },
    });

    return NextResponse.json({
      ok: true,
      tokenPrefix: token.slice(0, 20) + '…',
      title,
      body: bodyText,
      path,
      messageId,
    });
  } catch (err: any) {
    const code: string = err?.errorInfo?.code ?? 'unknown';
    return NextResponse.json(
      { error: err.message, code },
      { status: 500 }
    );
  }
}
