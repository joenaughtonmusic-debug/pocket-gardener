/**
 * Lightweight tests for foreground mask utilities and feature flag gating.
 * Run: npm run test:foreground-masks
 */

import {
  clampMaskPoint,
  createForegroundMask,
  isForegroundMasksEnabled,
  maskToClipPath,
  MIN_FOREGROUND_MASK_POINTS,
  parseForegroundMasks,
  pointerToImageRelative,
} from '../src/lib/visualIdeas/foregroundMasks'

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message)
  }
}

function testFeatureFlagDefaultOff() {
  const previous = process.env.NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS
  delete process.env.NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS
  assert(!isForegroundMasksEnabled(), 'flag should be off when unset')
  process.env.NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS = 'false'
  assert(!isForegroundMasksEnabled(), 'flag should be off when false')
  process.env.NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS = previous
}

function testFeatureFlagOn() {
  const previous = process.env.NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS
  process.env.NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS = 'true'
  assert(isForegroundMasksEnabled(), 'flag should be on when true')
  process.env.NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS = previous
}

function testRelativeCoordinates() {
  const point = pointerToImageRelative(150, 250, {
    left: 100,
    top: 200,
    width: 400,
    height: 800,
  })
  assert(Math.abs(point.x - 0.125) < 0.0001, 'x should be normalised')
  assert(Math.abs(point.y - 0.0625) < 0.0001, 'y should be normalised')

  const clamped = clampMaskPoint({ x: 1.5, y: -0.2 })
  assert(clamped.x === 1 && clamped.y === 0, 'points should clamp to 0–1')
}

function testMaskValidation() {
  assert(createForegroundMask([{ x: 0.1, y: 0.1 }, { x: 0.2, y: 0.2 }]) === null, '<3 points rejected')
  const mask = createForegroundMask([
    { x: 0.1, y: 0.1 },
    { x: 0.5, y: 0.2 },
    { x: 0.4, y: 0.8 },
  ])
  assert(mask !== null, 'valid mask should be created')
  assert(mask!.points.length === MIN_FOREGROUND_MASK_POINTS, 'mask keeps 3 points')
}

function testClipPath() {
  assert(maskToClipPath([{ x: 0, y: 0 }, { x: 1, y: 0 }]) === 'none', 'clip path needs 3+ points')
  const clip = maskToClipPath([
    { x: 0, y: 0 },
    { x: 0.5, y: 0 },
    { x: 0.25, y: 1 },
  ])
  assert(clip.includes('polygon('), 'clip path should be a CSS polygon')
  assert(clip.includes('50% 0%'), 'clip path uses percentage coordinates')
}

function testParseForegroundMasks() {
  const parsed = parseForegroundMasks([
    {
      id: 'm1',
      createdAt: '2026-01-01T00:00:00.000Z',
      points: [{ x: 0.1, y: 0.2 }, { x: 0.3, y: 0.4 }, { x: 0.5, y: 0.6 }],
    },
    {
      id: 'bad',
      createdAt: '2026-01-01T00:00:00.000Z',
      points: [{ x: 0.1, y: 0.2 }],
    },
  ])
  assert(parsed.length === 1, 'invalid masks should be skipped')
  assert(parsed[0].id === 'm1', 'valid mask should parse')
}

function main() {
  testFeatureFlagDefaultOff()
  testFeatureFlagOn()
  testRelativeCoordinates()
  testMaskValidation()
  testClipPath()
  testParseForegroundMasks()
  console.log('OK — foreground mask tests passed.')
}

main()
