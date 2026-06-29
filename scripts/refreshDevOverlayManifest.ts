/**
 * Regenerates devOverlayManifest.generated.ts from assets/plant-overlays/processed/.
 *
 * Discovers PNGs not already in the production registry or static dev QA list,
 * copies any missing files to public/plant-overlays/, and writes the "new batch"
 * entries consumed by /dev-overlay.
 *
 * Does not modify plantOverlayAssets.ts (production registry).
 */

import fs from 'fs'
import path from 'path'
import { REGISTERED_OVERLAY_PATHS } from '../src/lib/visualIdeas/plantOverlayAssets'
import { DEV_QA_OVERLAY_FILES } from '../src/lib/visualiser/devOverlayAssets'

const PROCESSED_DIR = path.resolve('assets/plant-overlays/processed')
const PUBLIC_DIR = path.resolve('public/plant-overlays')
const OUTPUT_FILE = path.resolve('src/lib/visualiser/devOverlayManifest.generated.ts')
const CACHE_BUST_OUTPUT = path.resolve('src/lib/visualiser/devOverlayCacheBust.generated.ts')

function fileFromRegisteredPath(src: string): string {
  return src.replace(/^\/plant-overlays\//, '')
}

function slugify(filename: string): string {
  return path
    .basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function labelFromFilename(filename: string): string {
  const base = path.basename(filename, path.extname(filename))
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/** Slug → preferred kebab-case output filename when it differs from slugify (e.g. Hoheria → lacebark). */
const CANONICAL_BATCH_FILENAMES: Record<string, string> = {
  hoheria: 'lacebark.png',
  'manuka-tree': 'manuka.png',
  'magnolia-tree-evergreen-final': 'magnolia-evergreen.png',
}

function isKebabCasePng(filename: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*\.png$/.test(filename)
}

function canonicalBatchFilename(slug: string, sourceFilename: string): string {
  return CANONICAL_BATCH_FILENAMES[slug] ?? (isKebabCasePng(sourceFilename) ? sourceFilename : `${slug}.png`)
}

function pickPreferredSource(filenames: string[], processedDir: string): string {
  return filenames.sort((a, b) => {
    const ma = fs.statSync(path.join(processedDir, a)).mtimeMs
    const mb = fs.statSync(path.join(processedDir, b)).mtimeMs
    if (mb !== ma) return mb - ma
    const kebabA = isKebabCasePng(a) ? 0 : 1
    const kebabB = isKebabCasePng(b) ? 0 : 1
    if (kebabA !== kebabB) return kebabA - kebabB
    return a.localeCompare(b, undefined, { sensitivity: 'base' })
  })[0]
}

function cacheBustToken(filename: string): string {
  for (const dir of [PUBLIC_DIR, PROCESSED_DIR]) {
    const filePath = path.join(dir, filename)
    if (fs.existsSync(filePath)) {
      return String(Math.floor(fs.statSync(filePath).mtimeMs))
    }
  }
  return '0'
}

function escapeString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function main(): void {
  if (!fs.existsSync(PROCESSED_DIR)) {
    console.error(`Missing directory: ${PROCESSED_DIR}`)
    process.exit(1)
  }
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }

  const registeredFiles = new Set(
    REGISTERED_OVERLAY_PATHS.map(fileFromRegisteredPath),
  )
  const qaFiles = new Set(DEV_QA_OVERLAY_FILES)
  const knownFiles = new Set([...registeredFiles, ...qaFiles])

  const processedFiles = fs
    .readdirSync(PROCESSED_DIR)
    .filter((f) => {
      const ext = path.extname(f).toLowerCase()
      return ext === '.png' && !f.startsWith('.')
    })
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

  const slugGroups = new Map<string, string[]>()
  for (const file of processedFiles) {
    const slug = slugify(file)
    const group = slugGroups.get(slug) ?? []
    group.push(file)
    slugGroups.set(slug, group)
  }

  const newBatchFiles: string[] = []
  let copied = 0

  for (const [slug, sources] of slugGroups) {
    if (sources.every((file) => knownFiles.has(file))) continue
    const canonicalKnown =
      CANONICAL_BATCH_FILENAMES[slug] && knownFiles.has(CANONICAL_BATCH_FILENAMES[slug])
    if (canonicalKnown) continue

    const sourceFile = pickPreferredSource(sources, PROCESSED_DIR)
    const canonicalFile = canonicalBatchFilename(slug, sourceFile)
    if (knownFiles.has(canonicalFile)) continue

    const src = path.join(PROCESSED_DIR, sourceFile)
    for (const dir of [PROCESSED_DIR, PUBLIC_DIR]) {
      const dest = path.join(dir, canonicalFile)
      fs.copyFileSync(src, dest)
      if (dir === PUBLIC_DIR) copied++
    }

    if (!newBatchFiles.includes(canonicalFile)) {
      newBatchFiles.push(canonicalFile)
    }
  }

  newBatchFiles.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

  let registeredSynced = 0
  for (const [slug, sources] of slugGroups) {
    const canonicalFile = CANONICAL_BATCH_FILENAMES[slug]
    if (!canonicalFile || !registeredFiles.has(canonicalFile)) continue
    const sourceFile = pickPreferredSource(sources, PROCESSED_DIR)
    const src = path.join(PROCESSED_DIR, sourceFile)
    for (const dir of [PROCESSED_DIR, PUBLIC_DIR]) {
      const dest = path.join(dir, canonicalFile)
      fs.copyFileSync(src, dest)
      if (dir === PUBLIC_DIR) registeredSynced++
    }
  }

  const entries = newBatchFiles.map((file) => {
    const id = `batch-${slugify(file)}`
    const label = labelFromFilename(file)
    const cacheBust = cacheBustToken(file)
    return `  {
    id: '${escapeString(id)}',
    label: '${escapeString(label)}',
    file: '${escapeString(file)}',
    defaultWidth: 220,
    aspect: 1,
    group: 'latest_batch' as const,
    cacheBust: '${cacheBust}',
  }`
  })

  const content = `/**
 * AUTO-GENERATED by scripts/refreshDevOverlayManifest.ts — do not edit manually.
 * Run: npm run refresh:dev-overlays
 */

import type { DevOverlayDef } from './devOverlayAssets'

export const GENERATED_NEW_BATCH_TEST_OVERLAYS: DevOverlayDef[] = [
${entries.join(',\n')}
]
`

  fs.writeFileSync(OUTPUT_FILE, content, 'utf8')

  const cacheBustEntries = [...registeredFiles]
    .filter((file) => file.endsWith('.png'))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .map((file) => `  '${escapeString(file)}': '${cacheBustToken(file)}',`)

  const cacheBustContent = `/**
 * AUTO-GENERATED by scripts/refreshDevOverlayManifest.ts — do not edit manually.
 * Dev-only cache bust tokens for production PNG overlays in /dev-overlay.
 * Run: npm run refresh:dev-overlays
 */

export const DEV_OVERLAY_FILE_CACHE_BUST: Record<string, string> = {
${cacheBustEntries.join('\n')}
}
`

  fs.writeFileSync(CACHE_BUST_OUTPUT, cacheBustContent, 'utf8')

  console.log(`Refreshed dev overlay manifest → ${path.relative(process.cwd(), OUTPUT_FILE)}`)
  console.log(`Refreshed dev cache bust   → ${path.relative(process.cwd(), CACHE_BUST_OUTPUT)}`)
  console.log(`  Processed PNGs scanned:  ${processedFiles.length}`)
  console.log(`  Registered (skipped):    ${registeredFiles.size}`)
  console.log(`  Dev QA static (skipped): ${qaFiles.size}`)
  console.log(`  New batch entries:       ${newBatchFiles.length}`)
  if (copied > 0) {
    console.log(`  Copied to public/:       ${copied}`)
  }
  if (registeredSynced > 0) {
    console.log(`  Registered synced:       ${registeredSynced}`)
  }
  if (newBatchFiles.length > 0) {
    console.log('  New batch files:')
    for (const file of newBatchFiles) {
      console.log(`    · ${file}`)
    }
  }
  console.log('  Preview → http://localhost:3000/dev-overlay')
}

main()
