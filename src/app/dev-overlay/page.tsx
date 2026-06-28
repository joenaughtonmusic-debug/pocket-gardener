'use client'

/**
 * DEV-ONLY — Plant Overlay Smoke Test
 *
 * Lets you drag a semi-transparent plant silhouette over a garden photo to
 * check whether overlay previews feel useful before building a full feature.
 *
 * This file and public/plant-overlays/ can be deleted once a decision is made.
 * Route: /dev-overlay
 */

import { useState, useRef, useCallback } from 'react'
import {
  DEFAULT_DEV_OVERLAY,
  DEV_OVERLAY_GROUPS,
  devOverlaySrc,
  getDevOverlaysByGroup,
  type DevOverlayDef,
} from '../../lib/visualiser/devOverlayAssets'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Pos { x: number; y: number }

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DevOverlayPage() {
  const [selected, setSelected]   = useState<DevOverlayDef>(DEFAULT_DEV_OVERLAY)
  const [pos,      setPos]        = useState<Pos>({ x: 180, y: 140 })
  const [width,    setWidth]      = useState(DEFAULT_DEV_OVERLAY.defaultWidth)
  const [bgSrc,    setBgSrc]      = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const dragOrigin = useRef({ clientX: 0, clientY: 0, posX: 0, posY: 0 })

  const allOverlays = DEV_OVERLAY_GROUPS.flatMap((g) => getDevOverlaysByGroup(g.key))

  // ── Overlay selection ────────────────────────────────────────────────────
  function selectOverlay(ov: DevOverlayDef) {
    setSelected(ov)
    setWidth(ov.defaultWidth)
    setPos({ x: 180, y: 140 })
  }

  // ── Drag handlers ────────────────────────────────────────────────────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      setIsDragging(true)
      dragOrigin.current = { clientX: e.clientX, clientY: e.clientY, posX: pos.x, posY: pos.y }
    },
    [pos],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      if (!isDragging) return
      setPos({
        x: dragOrigin.current.posX + e.clientX - dragOrigin.current.clientX,
        y: dragOrigin.current.posY + e.clientY - dragOrigin.current.clientY,
      })
    },
    [isDragging],
  )

  const onPointerUp = useCallback(() => setIsDragging(false), [])

  // ── Photo upload ─────────────────────────────────────────────────────────
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setBgSrc(URL.createObjectURL(f))
  }

  // ── Computed ─────────────────────────────────────────────────────────────
  const overlayHeight = Math.round(width / selected.aspect)

  return (
    <div style={styles.page}>

      {/* Dev banner */}
      <div style={styles.devBanner}>
        ⚠ Dev only — delete <code>/dev-overlay</code> and <code>/public/plant-overlays/</code> when done
      </div>

      <h1 style={styles.h1}>Plant Overlay Smoke Test</h1>

      {/* ── Controls ── */}
      <div style={styles.controls}>

        {/* Overlay picker — grouped */}
        <div style={{ ...styles.controlGroup, flex: '1 1 100%' }}>
          <span style={styles.label}>Overlay</span>
          {DEV_OVERLAY_GROUPS.map((group) => {
            const items = getDevOverlaysByGroup(group.key)
            if (items.length === 0) return null
            return (
              <div key={group.key} style={styles.overlaySection}>
                <div style={styles.sectionHeader}>
                  <span style={styles.sectionTitle}>{group.title}</span>
                  <span style={styles.sectionDesc}>{group.description}</span>
                </div>
                <div style={styles.row}>
                  {items.map((ov) => (
                    <button
                      key={ov.id}
                      type="button"
                      onClick={() => selectOverlay(ov)}
                      style={{
                        ...styles.btn,
                        ...(ov.group === 'new_batch' ? styles.btnNewBatch : {}),
                        ...(selected.id === ov.id ? styles.btnActive : {}),
                      }}
                      title={ov.file}
                    >
                      {ov.label}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Size slider */}
        <div style={styles.controlGroup}>
          <span style={styles.label}>
            Size &nbsp;<span style={styles.mono}>{width} × {overlayHeight} px</span>
          </span>
          <input
            type="range"
            min={60}
            max={640}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        {/* Photo upload */}
        <div style={styles.controlGroup}>
          <span style={styles.label}>Background photo</span>
          <label style={styles.uploadBtn}>
            📷 Load photo
            <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
          </label>
          {bgSrc && (
            <button
              type="button"
              onClick={() => setBgSrc(null)}
              style={{ ...styles.btn, marginLeft: 8, background: '#3a1010' }}
            >
              Remove
            </button>
          )}
        </div>

      </div>

      {/* ── Canvas ── */}
      <div
        style={{
          ...styles.canvas,
          backgroundImage: bgSrc ? `url(${bgSrc})` : undefined,
        }}
      >
        {/* Placeholder sky+garden gradient when no photo loaded */}
        {!bgSrc && (
          <>
            <div style={styles.sky} />
            <div style={styles.lawn} />
            <div style={styles.hint}>← Load a real garden photo to test overlay placement</div>
          </>
        )}

        {/* Plant overlay */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={`${selected.id}-${selected.cacheBust ?? 'v1'}`}
          src={devOverlaySrc(selected.file, selected.cacheBust)}
          alt={selected.label}
          draggable={false}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width,
            height: 'auto',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            touchAction: 'none',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.45))',
            zIndex: 10,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />

        {/* Status bar */}
        <div style={styles.statusBar}>
          {selected.label} &nbsp;·&nbsp; <span style={styles.mono}>{selected.file}</span> &nbsp;·&nbsp;
          {width} px wide &nbsp;·&nbsp;
          pos ({Math.round(pos.x)}, {Math.round(pos.y)}) &nbsp;·&nbsp; drag to place
        </div>
      </div>

      <p style={styles.footer}>
        Smoke test only — no saving, no database, no fal.ai calls.
        {' '}{allOverlays.filter((ov) => ov.file.endsWith('.png')).length} PNG overlays
        plus {allOverlays.filter((ov) => ov.file.endsWith('.svg')).length} SVG placeholders.
        Assets live in <code style={{ color: '#9090c0' }}>public/plant-overlays/</code>.
        New batch items are not in the production Visualise selector until manually approved and wired.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Inline styles (avoids any Tailwind dependency issues in dev pages)
// ---------------------------------------------------------------------------

const styles = {
  page: {
    minHeight: '100vh',
    background: '#12121e',
    color: '#e8e8f0',
    padding: '24px 28px',
    fontFamily: 'system-ui, sans-serif',
  } as React.CSSProperties,

  devBanner: {
    background: '#b84a00',
    color: '#fff',
    padding: '7px 16px',
    borderRadius: 6,
    fontSize: 13,
    display: 'inline-block',
    marginBottom: 18,
  } as React.CSSProperties,

  h1: {
    margin: '0 0 22px',
    fontSize: 22,
    fontWeight: 700,
    color: '#fff',
  } as React.CSSProperties,

  controls: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 24,
    marginBottom: 24,
    alignItems: 'flex-end',
  } as React.CSSProperties,

  controlGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  } as React.CSSProperties,

  label: {
    fontSize: 12,
    color: '#9090b0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  } as React.CSSProperties,

  mono: {
    fontFamily: 'monospace',
    color: '#c0c0d8',
    fontWeight: 600,
  } as React.CSSProperties,

  overlaySection: {
    marginBottom: 14,
  } as React.CSSProperties,

  sectionHeader: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'baseline',
    gap: '6px 12px',
    marginBottom: 8,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#d0d0e8',
  } as React.CSSProperties,

  sectionDesc: {
    fontSize: 12,
    color: '#707090',
  } as React.CSSProperties,

  row: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 8,
    maxWidth: 900,
  } as React.CSSProperties,

  btn: {
    padding: '8px 18px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    background: '#26263e',
    color: '#c8c8e0',
    transition: 'background 0.15s',
  } as React.CSSProperties,

  btnNewBatch: {
    border: '1px solid #3d5a80',
    background: '#1a2438',
  } as React.CSSProperties,

  btnActive: {
    background: '#4ade80',
    color: '#0a1a0a',
    border: '1px solid #4ade80',
  } as React.CSSProperties,

  slider: {
    width: 200,
    accentColor: '#4ade80',
  } as React.CSSProperties,

  uploadBtn: {
    padding: '8px 18px',
    borderRadius: 8,
    background: '#26263e',
    color: '#c8c8e0',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-block',
  } as React.CSSProperties,

  canvas: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: 900,
    height: 560,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 6px 40px rgba(0,0,0,0.6)',
    border: '1px solid #2a2a42',
  } as React.CSSProperties,

  sky: {
    position: 'absolute' as const,
    inset: 0,
    background: 'linear-gradient(180deg, #6ab4e8 0%, #94cef0 38%, #b2dfee 42%)',
  } as React.CSSProperties,

  lawn: {
    position: 'absolute' as const,
    top: '40%',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, #6aaa40 0%, #559030 30%, #4a7828 70%, #3e6422 100%)',
  } as React.CSSProperties,

  hint: {
    position: 'absolute' as const,
    top: '18%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    background: 'rgba(0,0,0,0.28)',
    padding: '5px 14px',
    borderRadius: 20,
    whiteSpace: 'nowrap' as const,
    pointerEvents: 'none' as const,
  } as React.CSSProperties,

  statusBar: {
    position: 'absolute' as const,
    bottom: 10,
    left: 10,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    background: 'rgba(0,0,0,0.45)',
    borderRadius: 6,
    padding: '4px 12px',
    pointerEvents: 'none' as const,
    zIndex: 20,
    maxWidth: 'calc(100% - 20px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,

  footer: {
    marginTop: 18,
    fontSize: 13,
    color: '#60607a',
    maxWidth: 700,
  } as React.CSSProperties,
}
