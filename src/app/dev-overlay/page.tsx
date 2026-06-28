'use client'

/**
 * DEV-ONLY — Plant Overlay Smoke Test
 *
 * Single-spot and hedge-row preview for processed PNG overlays before production wiring.
 *
 * This file and public/plant-overlays/ can be deleted once a decision is made.
 * Route: /dev-overlay
 */

import { useState, useRef, useCallback, useMemo } from 'react'
import {
  DEFAULT_DEV_OVERLAY,
  devOverlaySrc,
  getDevOverlayCatalog,
  type DevOverlayDef,
  type DevOverlayFilterId,
} from '../../lib/visualiser/devOverlayAssets'
import {
  DEV_OVERLAY_FILTERS,
  getDevOverlaySections,
  overlayButtonStyleTags,
} from '../../lib/visualiser/devOverlayCatalog'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Pos { x: number; y: number }

type PreviewMode = 'single' | 'row'

/** Matches production row tiling defaults (visualise detail page). */
const ROW_TILE_OVERLAP_DEFAULT = 0.2
const ROW_TILE_EDGE_CROP_RATIO = 0.05

function buildRowLayout(tileWidth: number, tileCount: number, overlapRatio: number) {
  const step = tileWidth * (1 - overlapRatio)
  const totalWidth = tileCount <= 1 ? tileWidth : tileWidth + step * (tileCount - 1)
  return { step, totalWidth }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DevOverlayPage() {
  const [selected, setSelected]       = useState<DevOverlayDef>(DEFAULT_DEV_OVERLAY)
  const [previewMode, setPreviewMode] = useState<PreviewMode>('single')
  const [pos, setPos]                 = useState<Pos>({ x: 180, y: 140 })
  const [width, setWidth]             = useState(DEFAULT_DEV_OVERLAY.defaultWidth)
  const [bgSrc, setBgSrc]             = useState<string | null>(null)
  const [isDragging, setIsDragging]   = useState(false)
  const [rowTileCount, setRowTileCount] = useState(4)
  const [rowOverlap, setRowOverlap]   = useState(ROW_TILE_OVERLAP_DEFAULT)
  const [rowEdgeCrop, setRowEdgeCrop] = useState(true)
  const [showTileSeams, setShowTileSeams] = useState(true)

  const [activeFilter, setActiveFilter] = useState<DevOverlayFilterId>('latest')

  const dragOrigin = useRef({ clientX: 0, clientY: 0, posX: 0, posY: 0 })

  const catalog = useMemo(() => getDevOverlayCatalog(), [])
  const sections = useMemo(
    () => getDevOverlaySections(catalog, activeFilter),
    [catalog, activeFilter],
  )
  const visibleOverlays = useMemo(
    () => sections.flatMap((section) => section.items),
    [sections],
  )
  const isPng = selected.file.toLowerCase().endsWith('.png')
  const effectiveMode: PreviewMode = isPng ? previewMode : 'single'

  // ── Overlay selection ────────────────────────────────────────────────────
  function selectOverlay(ov: DevOverlayDef) {
    setSelected(ov)
    setWidth(ov.defaultWidth)
    setPos({ x: 180, y: 140 })
  }

  // ── Drag handlers ────────────────────────────────────────────────────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      setIsDragging(true)
      dragOrigin.current = { clientX: e.clientX, clientY: e.clientY, posX: pos.x, posY: pos.y }
    },
    [pos],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
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

  const pointerHandlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  }

  // ── Computed ─────────────────────────────────────────────────────────────
  const tileHeight = Math.round(width / selected.aspect)
  const rowLayout = buildRowLayout(width, rowTileCount, rowOverlap)
  const overlayHeight = tileHeight
  const overlaySrc = devOverlaySrc(selected.file, selected.cacheBust)
  const cropInset = rowEdgeCrop ? ROW_TILE_EDGE_CROP_RATIO * 100 : 0

  return (
    <div style={styles.page}>

      {/* Dev banner */}
      <div style={styles.devBanner}>
        ⚠ Dev only — delete <code>/dev-overlay</code> and <code>/public/plant-overlays/</code> when done
      </div>

      <h1 style={styles.h1}>Plant Overlay Smoke Test</h1>

      {/* ── Controls ── */}
      <div style={styles.controls}>

        {/* Overlay picker — filters + grouped sections */}
        <div style={{ ...styles.controlGroup, flex: '1 1 100%' }}>
          <span style={styles.label}>Overlay library</span>
          <div style={styles.filterRow}>
            {DEV_OVERLAY_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                title={filter.hint}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  ...styles.filterBtn,
                  ...(activeFilter === filter.id ? styles.filterBtnActive : {}),
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div style={styles.legendRow}>
            <span style={styles.legendItem}><span style={styles.badgeSpot}>Spot</span> spot / preview</span>
            <span style={styles.legendItem}><span style={styles.badgeHedge}>Hedge</span> row / tile</span>
            <span style={styles.legendItem}><span style={styles.badgeHeld}>Held</span> not approved</span>
            <span style={styles.legendItem}><span style={styles.badgeLatest}>Latest</span> new batch</span>
          </div>
          {sections.length === 0 ? (
            <p style={styles.emptyFilter}>No overlays match this filter.</p>
          ) : (
            sections.map((section) => (
              <div key={section.key} style={styles.overlaySection}>
                <div style={styles.sectionHeader}>
                  <span style={styles.sectionTitle}>{section.title}</span>
                  <span style={styles.sectionCount}>{section.items.length}</span>
                  <span style={styles.sectionDesc}>{section.description}</span>
                </div>
                <div style={styles.btnRow}>
                  {section.items.map((ov) => {
                    const badge = overlayButtonStyleTags(ov.tags)
                    return (
                      <button
                        key={ov.id}
                        type="button"
                        onClick={() => selectOverlay(ov)}
                        style={{
                          ...styles.btn,
                          ...(ov.group === 'latest_batch' ? styles.btnLatest : {}),
                          ...(ov.group === 'held' ? styles.btnHeld : {}),
                          ...(badge.hedge ? styles.btnHedge : {}),
                          ...(selected.id === ov.id ? styles.btnActive : {}),
                        }}
                        title={[ov.file, ov.statusNote, ov.pairWith ? `Pair: ${ov.pairWith}` : '']
                          .filter(Boolean)
                          .join(' · ')}
                      >
                        <span style={styles.btnLabel}>{ov.label}</span>
                        <span style={styles.btnBadges}>
                          {badge.spot && <span style={styles.badgeSpot}>Spot</span>}
                          {badge.hedge && <span style={styles.badgeHedge}>Hedge</span>}
                          {badge.held && <span style={styles.badgeHeld}>Held</span>}
                          {badge.latest && <span style={styles.badgeLatest}>New</span>}
                          {ov.pairLabel && !badge.spot && !badge.hedge && badge.unwired && ov.tags?.includes('hedge') && (
                            <span style={styles.badgeHedge}>Hedge?</span>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
          {selected.statusNote && (
            <p style={styles.selectedMeta}>
              <span style={styles.mono}>{selected.file}</span>
              {' — '}
              {selected.statusNote}
              {selected.pairWith && (
                <>
                  {' · Pair: '}
                  <span style={styles.mono}>{selected.pairWith}</span>
                </>
              )}
            </p>
          )}
        </div>

        {/* Preview mode */}
        <div style={styles.controlGroup}>
          <span style={styles.label}>Preview mode</span>
          <div style={styles.btnRow}>
            <button
              type="button"
              onClick={() => setPreviewMode('single')}
              style={{
                ...styles.btn,
                ...(effectiveMode === 'single' ? styles.btnActive : {}),
              }}
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('row')}
              disabled={!isPng}
              style={{
                ...styles.btn,
                ...(effectiveMode === 'row' ? styles.btnActive : {}),
                ...(!isPng ? styles.btnDisabled : {}),
              }}
              title={isPng ? 'Repeat PNG as a hedge row' : 'Row preview requires a PNG overlay'}
            >
              Hedge row
            </button>
          </div>
        </div>

        {/* Tile count (row mode) */}
        {effectiveMode === 'row' && (
          <div style={styles.controlGroup}>
            <span style={styles.label}>Tiles in row</span>
            <div style={styles.btnRow}>
              {[3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRowTileCount(n)}
                  style={{
                    ...styles.btn,
                    ...(rowTileCount === n ? styles.btnActive : {}),
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size slider */}
        <div style={styles.controlGroup}>
          <span style={styles.label}>
            {effectiveMode === 'row' ? 'Tile width' : 'Size'}
            {' '}
            <span style={styles.mono}>
              {width} × {overlayHeight} px
              {effectiveMode === 'row' && (
                <> &nbsp;·&nbsp; row {Math.round(rowLayout.totalWidth)} px</>
              )}
            </span>
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

        {/* Row overlap */}
        {effectiveMode === 'row' && (
          <div style={styles.controlGroup}>
            <span style={styles.label}>
              Tile overlap &nbsp;
              <span style={styles.mono}>{Math.round(rowOverlap * 100)}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={30}
              value={Math.round(rowOverlap * 100)}
              onChange={(e) => setRowOverlap(Number(e.target.value) / 100)}
              style={styles.slider}
            />
          </div>
        )}

        {/* Row toggles */}
        {effectiveMode === 'row' && (
          <div style={styles.controlGroup}>
            <span style={styles.label}>Row QA aids</span>
            <div style={styles.btnRow}>
              <button
                type="button"
                onClick={() => setRowEdgeCrop((v) => !v)}
                style={{
                  ...styles.btn,
                  ...(rowEdgeCrop ? styles.btnActive : {}),
                }}
                title="Crop 5% from each tile edge (matches production row mode)"
              >
                Edge crop
              </button>
              <button
                type="button"
                onClick={() => setShowTileSeams((v) => !v)}
                style={{
                  ...styles.btn,
                  ...(showTileSeams ? styles.btnActive : {}),
                }}
                title="Show faint vertical lines at tile boundaries"
              >
                Tile seams
              </button>
            </div>
          </div>
        )}

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
            {effectiveMode === 'row' && (
              <>
                <div style={styles.checkerBand} />
                <div style={styles.rowZoneLabel}>Hedge row zone — checkerboard shows transparency gaps</div>
              </>
            )}
            <div style={styles.hint}>
              {effectiveMode === 'row'
                ? '← Row mode: drag the hedge strip to inspect tiling on lawn + checkerboard'
                : '← Load a real garden photo to test overlay placement'}
            </div>
          </>
        )}

        {/* Photo + row mode: subtle checker behind row only */}
        {bgSrc && effectiveMode === 'row' && (
          <div
            style={{
              ...styles.checkerBand,
              top: pos.y - 8,
              left: pos.x - 8,
              width: rowLayout.totalWidth + 16,
              height: tileHeight + 16,
              borderRadius: 8,
              opacity: 0.85,
            }}
          />
        )}

        {effectiveMode === 'single' ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={`${selected.id}-${selected.cacheBust ?? 'v1'}-single`}
            src={overlaySrc}
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
            {...pointerHandlers}
          />
        ) : (
          <div
            role="presentation"
            aria-label={`${selected.label} hedge row preview`}
            draggable={false}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              width: rowLayout.totalWidth,
              height: tileHeight,
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'none',
              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.45))',
              zIndex: 10,
              overflow: 'visible',
            }}
            {...pointerHandlers}
          >
            {Array.from({ length: rowTileCount }, (_, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: index * rowLayout.step,
                  width,
                  height: tileHeight,
                  overflow: 'hidden',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={overlaySrc}
                  alt=""
                  draggable={false}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                    pointerEvents: 'none',
                    clipPath: cropInset > 0
                      ? `inset(0 ${cropInset}% 0 ${cropInset}%)`
                      : undefined,
                  }}
                />
                {showTileSeams && index > 0 && (
                  <div style={styles.tileSeam} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Status bar */}
        <div style={styles.statusBar}>
          {selected.label} &nbsp;·&nbsp; <span style={styles.mono}>{selected.file}</span> &nbsp;·&nbsp;
          {effectiveMode === 'row'
            ? `${rowTileCount} tiles · ${Math.round(rowOverlap * 100)}% overlap · ${Math.round(rowLayout.totalWidth)} px row`
            : `${width} px wide`}
          &nbsp;·&nbsp; pos ({Math.round(pos.x)}, {Math.round(pos.y)})
          &nbsp;·&nbsp; drag to place
        </div>
      </div>

      <p style={styles.footer}>
        Smoke test only — no saving, no database, no fal.ai calls.
        {' '}{visibleOverlays.filter((ov) => ov.file.endsWith('.png')).length} PNG overlays visible
        ({catalog.filter((ov) => ov.file.endsWith('.png')).length} total)
        plus {visibleOverlays.filter((ov) => ov.file.endsWith('.svg')).length} SVG placeholders in view.
        Assets live in <code style={{ color: '#9090c0' }}>public/plant-overlays/</code>.
        Use filters above to separate production, latest batch, hedge candidates, and held assets.
        Run <code style={{ color: '#9090c0' }}>npm run refresh:dev-overlays</code> after processing new PNGs.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Inline styles (avoids any Tailwind dependency issues in dev pages)
// ---------------------------------------------------------------------------

const CHECKER =
  'linear-gradient(45deg, #888 25%, transparent 25%), linear-gradient(-45deg, #888 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #888 75%), linear-gradient(-45deg, transparent 75%, #888 75%)'

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

  btnRow: {
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

  btnLatest: {
    border: '1px solid #3d5a80',
    background: '#1a2438',
  } as React.CSSProperties,

  btnHeld: {
    border: '1px solid #8b3a3a',
    background: '#2a1414',
  } as React.CSSProperties,

  btnHedge: {
    borderLeft: '3px solid #60a5fa',
  } as React.CSSProperties,

  filterRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 8,
    marginBottom: 10,
  } as React.CSSProperties,

  filterBtn: {
    padding: '6px 12px',
    borderRadius: 999,
    border: '1px solid #3a3a58',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 12,
    background: '#1a1a2e',
    color: '#b0b0cc',
  } as React.CSSProperties,

  filterBtnActive: {
    background: '#4ade80',
    color: '#0a1a0a',
    border: '1px solid #4ade80',
  } as React.CSSProperties,

  legendRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px 14px',
    marginBottom: 12,
    fontSize: 11,
    color: '#707090',
  } as React.CSSProperties,

  legendItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  } as React.CSSProperties,

  badgeSpot: {
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 700,
    background: '#1a3d2a',
    color: '#86efac',
  } as React.CSSProperties,

  badgeHedge: {
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 700,
    background: '#1a2840',
    color: '#93c5fd',
  } as React.CSSProperties,

  badgeHeld: {
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 700,
    background: '#3d1a1a',
    color: '#fca5a5',
  } as React.CSSProperties,

  badgeLatest: {
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 700,
    background: '#2a2240',
    color: '#c4b5fd',
  } as React.CSSProperties,

  btnLabel: {
    display: 'block',
  } as React.CSSProperties,

  btnBadges: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 4,
    marginTop: 4,
  } as React.CSSProperties,

  sectionCount: {
    fontSize: 11,
    fontWeight: 700,
    color: '#8080a8',
    background: '#1e1e32',
    padding: '2px 8px',
    borderRadius: 999,
  } as React.CSSProperties,

  selectedMeta: {
    margin: '8px 0 0',
    fontSize: 12,
    color: '#9090b0',
    maxWidth: 900,
  } as React.CSSProperties,

  emptyFilter: {
    fontSize: 13,
    color: '#707090',
    margin: '4px 0 0',
  } as React.CSSProperties,

  btnActive: {
    background: '#4ade80',
    color: '#0a1a0a',
    border: '1px solid #4ade80',
  } as React.CSSProperties,

  btnDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
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

  checkerBand: {
    position: 'absolute' as const,
    top: '38%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    backgroundImage: CHECKER,
    backgroundSize: '24px 24px',
    backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0',
    opacity: 0.55,
    pointerEvents: 'none' as const,
    zIndex: 1,
  } as React.CSSProperties,

  rowZoneLabel: {
    position: 'absolute' as const,
    top: '42%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    background: 'rgba(0,0,0,0.35)',
    padding: '4px 12px',
    borderRadius: 16,
    pointerEvents: 'none' as const,
    zIndex: 2,
    whiteSpace: 'nowrap' as const,
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
    zIndex: 2,
  } as React.CSSProperties,

  tileSeam: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    bottom: 0,
    width: 2,
    background: 'rgba(255, 80, 80, 0.65)',
    pointerEvents: 'none' as const,
    zIndex: 5,
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
    maxWidth: 760,
  } as React.CSSProperties,
}
