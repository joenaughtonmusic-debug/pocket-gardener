import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { suggestPlants } from '../../../../lib/visualIdeas/suggestPlants'

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (name) => cookieStore.get(name)?.value } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const goalText: string = body.goalText ?? ''
    if (!goalText.trim()) {
      return NextResponse.json({ error: 'goalText is required' }, { status: 400 })
    }

    const result = suggestPlants(goalText)
    return NextResponse.json(result)
  } catch (err: any) {
    console.error('Suggest error:', err)
    return NextResponse.json({ error: err.message || 'Suggestion failed' }, { status: 500 })
  }
}
