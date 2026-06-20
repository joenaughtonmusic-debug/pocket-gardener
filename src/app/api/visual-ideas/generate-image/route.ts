import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { editVisualConcept } from '../../../../lib/visualIdeas/generateVisualConcept'

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

    if (!originalPhotoUrl) {
      return NextResponse.json(
        { error: 'No photo found for this concept. Please create a new visual idea with a photo.' },
        { status: 400 }
      )
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

    // Use image edit — the original photo is sent to OpenAI as the input image.
    // The model edits it in-place rather than generating a new scene.
    const { b64Image, error } = await editVisualConcept({
      originalPhotoUrl,
      goalText: goalText ?? '',
      detectedIntent: detectedIntent ?? 'general planting',
      selectedSpecies: selectedSpecies ?? [],
      hedgeForm: hedgeForm ?? null,
    })

    if (error || !b64Image) {
      await adminSupabase
        .from('garden_visual_concepts')
        .update({
          status: 'error',
          error_message: error ?? 'Unknown error',
          updated_at: new Date().toISOString(),
        })
        .eq('id', conceptId)
        .eq('user_id', user.id)

      return NextResponse.json({ error: error ?? 'Image editing failed' }, { status: 422 })
    }

    // Upload the edited PNG to Supabase storage for a persistent URL.
    // gpt-image-1 always returns b64_json, never a URL.
    const imageBuffer = Buffer.from(b64Image, 'base64')
    const uploadPath = `visual-ideas/generated/${user.id}-${Date.now()}.png`

    const { error: uploadError } = await adminSupabase.storage
      .from('weed-images')
      .upload(uploadPath, imageBuffer, { contentType: 'image/png', upsert: false })

    if (uploadError) {
      await adminSupabase
        .from('garden_visual_concepts')
        .update({
          status: 'error',
          error_message: `Storage upload failed: ${uploadError.message}`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', conceptId)
        .eq('user_id', user.id)

      return NextResponse.json(
        { error: `Storage upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    const { data: { publicUrl } } = adminSupabase.storage
      .from('weed-images')
      .getPublicUrl(uploadPath)

    await adminSupabase
      .from('garden_visual_concepts')
      .update({
        generated_image_url: publicUrl,
        status: 'complete',
        error_message: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', conceptId)
      .eq('user_id', user.id)

    return NextResponse.json({ imageUrl: publicUrl })
  } catch (err: any) {
    console.error('Generate image error:', err)
    return NextResponse.json({ error: err.message || 'Image editing failed' }, { status: 500 })
  }
}
