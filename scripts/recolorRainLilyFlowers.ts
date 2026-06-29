/**
 * Recolour pink/magenta flower pixels in rain-lily.png to warm cream
 * while preserving petal luminance, veins, and shading detail.
 *
 * Restores from rain-lily-pink-backup.png — does not rerun background removal.
 *
 * Run: npx tsx scripts/recolorRainLilyFlowers.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PROCESSED_DIR = path.resolve('assets/plant-overlays/processed')
const PUBLIC_DIR = path.resolve('public/plant-overlays')

const INPUT = path.join(PROCESSED_DIR, 'rain-lily.png')
const BACKUP = path.join(PROCESSED_DIR, 'rain-lily-pink-backup.png')
const PUBLIC_OUTPUT = path.join(PUBLIC_DIR, 'rain-lily.png')

/** Warm cream hue in degrees (yellow-cream, not pure white). */
const CREAM_HUE = 43
const SAT_SCALE = 0.14
const MAX_SAT = 16
const MIN_SAT = 3

const ALPHA_MIN = 20

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = ((max + min) / 2) * 100

  if (max === min) return { h: CREAM_HUE, s: 0, l }

  const d = max - min
  const s = (l > 50 ? d / (2 - max - min) : d / (max + min)) * 100
  let h = 0

  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
  else if (max === gn) h = ((bn - rn) / d + 2) / 6
  else h = ((rn - gn) / d + 4) / 6

  return { h: h * 360, s, l }
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hn = ((h % 360) + 360) % 360 / 360
  const sn = s / 100
  const ln = l / 100

  if (sn === 0) {
    const v = clamp255(ln * 255)
    return [v, v, v]
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
    let tt = t
    if (tt < 0) tt += 1
    if (tt > 1) tt -= 1
    if (tt < 1 / 6) return p + (q - p) * 6 * tt
    if (tt < 1 / 2) return q
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
    return p
  }

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn
  const p = 2 * ln - q

  return [
    clamp255(hue2rgb(p, q, hn + 1 / 3) * 255),
    clamp255(hue2rgb(p, q, hn) * 255),
    clamp255(hue2rgb(p, q, hn - 1 / 3) * 255),
  ]
}

function isGreenFoliage(r: number, g: number, b: number): boolean {
  if (g > r + 5 && g > b) return true
  if (g > 90 && r < g && b < g * 0.55) return true
  return false
}

function isPinkFlower(r: number, g: number, b: number): boolean {
  if (r < 95 && b < 95) return false
  if (r > g + 20 && b > g - 10 && r > 100) return true
  if (r > 180 && r > g && r > b && g > 110 && r - g > 15) return true
  return false
}

function shouldRecolor(r: number, g: number, b: number, a: number): boolean {
  if (a < ALPHA_MIN) return false
  if (isGreenFoliage(r, g, b)) return false
  return isPinkFlower(r, g, b)
}

/**
 * Luminance-preserving HSL remap: desaturate pink toward warm cream,
 * keep original lightness for petal shading and vein contrast.
 */
function mapPinkToCream(r: number, g: number, b: number): [number, number, number] {
  const { s, l } = rgbToHsl(r, g, b)

  const newS = Math.max(MIN_SAT, Math.min(MAX_SAT, s * SAT_SCALE))
  const hueShift = l > 72 ? 3 : l < 38 ? -2 : 0
  const newL = l

  let [nr, ng, nb] = hslToRgb(CREAM_HUE + hueShift, newS, newL)

  // Retain subtle local chroma contrast from the original pixel (vein/detail).
  const origLum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  const outLum = 0.2126 * nr + 0.7152 * ng + 0.0722 * nb
  if (outLum > 0) {
    const lumRatio = origLum / outLum
    const blend = 0.35
    nr = clamp255(nr * (1 - blend) + nr * lumRatio * blend)
    ng = clamp255(ng * (1 - blend) + ng * lumRatio * blend)
    nb = clamp255(nb * (1 - blend) + nb * lumRatio * blend)
  }

  // Avoid pure white — cap bright highlights to warm cream ceiling.
  const maxC = Math.max(nr, ng, nb)
  if (maxC > 248) {
    const scale = 247 / maxC
    nr = clamp255(nr * scale)
    ng = clamp255(ng * scale)
    nb = clamp255(nb * scale)
  }

  return [nr, ng, nb]
}

async function main(): Promise<void> {
  if (!fs.existsSync(BACKUP)) {
    console.error(`Missing backup: ${BACKUP}`)
    process.exit(1)
  }

  const { data, info } = await sharp(BACKUP)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  if (channels !== 4) {
    console.error(`Expected RGBA input, got ${channels} channels`)
    process.exit(1)
  }

  const pixelCount = data.length / 4
  const alphaBefore = Buffer.alloc(pixelCount)
  const greenMask = new Uint8Array(pixelCount)

  for (let px = 0, i = 0; i < data.length; i += 4, px++) {
    const r = data[i] as number
    const g = data[i + 1] as number
    const b = data[i + 2] as number
    const a = data[i + 3] as number
    alphaBefore[px] = a
    if (a >= ALPHA_MIN && isGreenFoliage(r, g, b)) greenMask[px] = 1
  }

  let recoloredCount = 0

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] as number
    const g = data[i + 1] as number
    const b = data[i + 2] as number
    const a = data[i + 3] as number

    if (!shouldRecolor(r, g, b, a)) continue

    const [nr, ng, nb] = mapPinkToCream(r, g, b)
    data[i] = nr
    data[i + 1] = ng
    data[i + 2] = nb
    recoloredCount++
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(INPUT)

  fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  fs.copyFileSync(INPUT, PUBLIC_OUTPUT)

  const backupRaw = await sharp(BACKUP).ensureAlpha().raw().toBuffer()
  const outputRaw = await sharp(INPUT).ensureAlpha().raw().toBuffer()

  let alphaPreserved = backupRaw.length === outputRaw.length
  let greenUnchanged = 0
  let greenChanged = 0

  if (alphaPreserved) {
    for (let px = 0, i = 0; i < backupRaw.length; i += 4, px++) {
      if (backupRaw[i + 3] !== outputRaw[i + 3]) {
        alphaPreserved = false
        break
      }

      if (greenMask[px]) {
        const same =
          backupRaw[i] === outputRaw[i] &&
          backupRaw[i + 1] === outputRaw[i + 1] &&
          backupRaw[i + 2] === outputRaw[i + 2]
        if (same) greenUnchanged++
        else greenChanged++
      }
    }
  }

  console.log(`Source (restored): ${BACKUP}`)
  console.log(`Output: ${INPUT}`)
  console.log(`Public: ${PUBLIC_OUTPUT}`)
  console.log(`Recolored pixels: ${recoloredCount}`)
  console.log(`Alpha preserved: ${alphaPreserved ? 'yes' : 'NO — check backup'}`)
  console.log(`Green foliage unchanged: ${greenChanged === 0 ? 'yes' : 'NO'}`)
  console.log(`Green pixels checked: ${greenUnchanged + greenChanged} (${greenUnchanged} unchanged, ${greenChanged} changed)`)
  console.log(`Public updated: ${fs.existsSync(PUBLIC_OUTPUT) ? 'yes' : 'no'}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
