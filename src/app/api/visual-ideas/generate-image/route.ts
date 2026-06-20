import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { generateVisualConcept } from '../../../../lib/visualIdeas/generateVisualConcept'

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
    const { conceptId, goalText, detectedIntent, selectedSpecies, hedgeForm, originalPhotoUrl } = body

    if (!conceptId) {
      return NextResponse.json({ error: 'conceptId is required' }, { status: 400 })
    }

    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    await adminSupabase
      .from('garden_visual_concepts')
      .update({ status: 'generating', error_message: null, updated_at: new Date().toISOString() })
      .eq('id', conceptId)
      .eq('user_id', user.id)

    const { imageUrl, error } = await generateVisualConcept({
      goalText: goalText ?? '',
      detectedIntent: detectedIntent ?? 'general planting',
      selectedSpecies: selectedSpecies ?? [],
      hedgeForm: hedgeForm ?? null,
      originalPhotoUrl: originalPhotoUrl ?? null,
    })

    if (error || !imageUrl) {
      await adminSupabase
        .from('garden_visual_concepts')
        .update({
          status: 'error',
          error_message: error ?? 'Unknown error',
          updated_at: new Date().toISOString(),
        })
        .eq('id', conceptId)
        .eq('user_id', user.id)

      return NextResponse.json({ error: error ?? 'Image generation failed' }, { status: 422 })
    }

    await adminSupabase
      .from('garden_visual_concepts')
      .update({
        generated_image_url: imageUrl,
        status: 'complete',
        error_message: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', conceptId)
      .eq('user_id', user.id)

    return NextResponse.json({ imageUrl })
  } catch (err: any) {
    console.error('Generate image error:', err)
    return NextResponse.json({ error: err.message || 'Image generation failed' }, { status: 500 })
  }
}
