import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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
    const selectedSpecies: string[] = body.selectedSpecies ?? []
    const gardenAreaId: string | null = body.gardenAreaId ?? null

    if (selectedSpecies.length === 0) {
      return NextResponse.json({ error: 'No species selected' }, { status: 400 })
    }

    const { data: plants } = await supabase
      .from('plants')
      .select('id, common_name')
      .in('common_name', selectedSpecies)

    const results: { name: string; status: string; error?: string }[] = []
    const notFound: string[] = []

    for (const speciesName of selectedSpecies) {
      const plant = plants?.find((p) => p.common_name === speciesName)

      if (!plant) {
        notFound.push(speciesName)
        results.push({ name: speciesName, status: 'not_found_in_library' })
        continue
      }

      const { data: existing } = await supabase
        .from('user_plants')
        .select('id')
        .eq('user_id', user.id)
        .eq('plant_id', plant.id)
        .eq('is_project', true)
        .maybeSingle()

      if (existing) {
        results.push({ name: speciesName, status: 'already_planned' })
        continue
      }

      const { error } = await supabase.from('user_plants').insert({
        user_id: user.id,
        plant_id: plant.id,
        is_project: true,
        status: 'Planning',
        garden_area_id: gardenAreaId,
      })

      results.push({
        name: speciesName,
        status: error ? 'error' : 'added',
        ...(error ? { error: error.message } : {}),
      })
    }

    return NextResponse.json({ results, notFound })
  } catch (err: any) {
    console.error('Add planned plants error:', err)
    return NextResponse.json({ error: err.message || 'Failed to add plants' }, { status: 500 })
  }
}
