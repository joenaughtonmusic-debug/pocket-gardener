import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { getImageProvider } from '../../../../lib/visualIdeas/imageProviders'

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
    const {
      conceptId,
      goalText,
      detectedIntent,
      selectedSpecies,
      hedgeForm,
      originalPhotoUrl,
      placementPoint,
      plantingType,
    } = body

    if (!conceptId) {
      return NextResponse.json({ error: 'conceptId is required' }, { status: 400 })
    }

    if (!originalPhotoUrl) {
      return NextResponse.json(
        { error: 'No photo found for this concept. Please create a new visual idea with a photo.' },
        { status: 400 }
      )
    }

    // fal provider requires a placement point to generate a meaningful mask
    const activeProvider = (process.env.VISUAL_IDEAS_IMAGE_PROVIDER ?? '').toLowerCase().trim()
    if (activeProvider === 'fal' && !placementPoint) {
      return NextResponse.json(
        {
          error:
            'Please tap the photo to mark where you want to plant before generating. ' +
            'The fal.ai provider uses your placement point to create a precise inpainting mask.',
        },
        { status: 422 }
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

    const provider = getImageProvider()
    const { imageBuffer, error } = await provider.generate({
      originalPhotoUrl,
      goalText: goalText ?? '',
      detectedIntent: detectedIntent ?? 'general planting',
      selectedSpecies: selectedSpecies ?? [],
      hedgeForm: hedgeForm ?? null,
      placementPoint: placementPoint ?? null,
      plantingType: plantingType ?? null,
    })

    if (error || !imageBuffer) {
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
    const uploadPath = `visual-ideas/generated/${user.id}/${Date.now()}.png`

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
