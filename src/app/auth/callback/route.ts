import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // We check for a 'next' param, defaulting to dashboard
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = await cookies()
    
    // Create the response object first so we can attach the session to it
    const response = NextResponse.redirect(`${origin}${next}`)

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
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
                // ADDED: This specific line fixes the mobile/Safari login loop
                response.cookies.set(name, value, options)
              })
            } catch (error) {
              // This catch is fine, but on iPhones, if this fails, the loop starts
            }
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // SUCCESS: Using the response object we created above
      return response
    }

    console.error("❌ HANDSHAKE ERROR:", error.message)
  }

  // FAIL: If no code or exchange failed, send back to login
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}