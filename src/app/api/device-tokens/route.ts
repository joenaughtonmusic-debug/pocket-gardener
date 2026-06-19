import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // Authenticate via session cookie.
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const token: string = body.token;
    const platform: string = body.platform ?? 'android';

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'token is required' }, { status: 400 });
    }

    // Upsert: insert or update updated_at on duplicate (user_id, token).
    const { error } = await supabaseAdmin
      .from('device_tokens')
      .upsert(
        {
          user_id: user.id,
          token,
          platform,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,token' }
      );

    if (error) {
      console.error('❌ device_tokens upsert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`🔔 Device token saved for user ${user.id} (${platform})`);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ /api/device-tokens error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
