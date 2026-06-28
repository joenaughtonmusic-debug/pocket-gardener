/**
 * CI/dev check: every path in plantOverlayAssets ASSETS registry must exist on disk.
 * Run: npm run validate:overlay-paths
 */
import fs from 'node:fs'
import path from 'node:path'
import { REGISTERED_OVERLAY_PATHS } from '../src/lib/visualIdeas/plantOverlayAssets'

const publicRoot = path.join(process.cwd(), 'public')

const broken = REGISTERED_OVERLAY_PATHS.filter((src) => {
  const filePath = path.join(publicRoot, src.replace(/^\//, ''))
  return !fs.existsSync(filePath)
})

if (broken.length > 0) {
  console.error('Missing overlay files:')
  for (const src of broken) console.error(`  ${src}`)
  process.exit(1)
}

console.log(`OK — ${REGISTERED_OVERLAY_PATHS.length} registered overlay paths verified.`)
