import { NextResponse } from 'next/server'

/**
 * Legacy DALL-E garden render endpoint — disabled at launch.
 * The visualiser uses client-side plant overlays instead.
 * Re-enable only with auth + Pro gating + usage quotas.
 */
export async function POST() {
  return NextResponse.json(
    { error: 'This feature is not available.' },
    { status: 410 },
  )
}
