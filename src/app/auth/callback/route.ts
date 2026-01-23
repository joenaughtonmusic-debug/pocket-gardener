import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (error) {
              // The setAll can fail if called from a Server Component, but we need it for Route Handlers
            }
          },
        },
      }
    )

    // The 'auth-code-error' usually happens here
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      console.log("✅ HANDSHAKE COMPLETE - Redirecting to dashboard")
      // Use a hard URL to break the loop
      return NextResponse.redirect(`${origin}/dashboard`)
    }

    console.error("❌ HANDSHAKE ERROR:", error.message)
  }

  // If we land here, something went wrong with the 'code'
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}