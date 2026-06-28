/**
 * Export deduplicated plant catalog from Supabase for coverage audits.
 * Run: npm run export:plant-catalog
 */
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    process.exit(1)
  }

  const supabase = createClient(url, key)
  const { data, error } = await supabase
    .from('plants')
    .select(
      'id, common_name, scientific_name, plant_type, task_category, flower_color, is_native, maintenance_level',
    )
    .order('common_name')

  if (error) {
    console.error(error)
    process.exit(1)
  }

  const map = new Map<number, (typeof data)[number]>()
  for (const p of data ?? []) {
    const name = p.common_name?.trim()
    if (!name) continue
    const existing = [...map.values()].find((x) => x.common_name.trim() === name)
    if (!existing) map.set(p.id, p)
  }

  const plants = [...map.values()].sort((a, b) =>
    a.common_name.localeCompare(b.common_name),
  )

  const outPath = path.join(process.cwd(), 'src/lib/visualiser/plantDatabaseCatalog.json')
  fs.writeFileSync(outPath, `${JSON.stringify({ exportedAt: new Date().toISOString(), count: plants.length, plants }, null, 2)}\n`)
  console.log(`Exported ${plants.length} plants → ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
