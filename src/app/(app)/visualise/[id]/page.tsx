'use client'

import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabaseClient'
import Link from 'next/link'
import {
  ArrowLeft, Loader2, ExternalLink,
} from 'lucide-react'
import type { VisualConcept, SuggestedSpecies, PreviewOverlay } from '../../../../types/garden'
import {
  resolveOverlayAsset,
  PREVIEW_PLANT_OPTIONS,
  ROW_PREVIEW_PLANT_OPTIONS,
  DEFAULT_ROW_WIDTH,
  type OverlayAsset,
} from '../../../../lib/visualIdeas/plantOverlayAssets'
import {
  categoriesUsedByPreviewPlants,
  previewPlantMatchesCategory,
} from '../../../../lib/visualIdeas/previewPlantCategories'
import type { PlantCategoryFilter } from '../../../../lib/plants/plantCategories'
import {
  PREVIEW_PICKER_HELPER_TEXT,
  PREVIEW_PICKER_NO_MATCHES_TEXT,
  sortPreviewPlantsByOptionalFilters,
  VISUALISER_GARDEN_STYLE_OPTIONS,
  VISUALISER_PLANT_ROLE_OPTIONS,
  type VisualiserGardenStyleTag,
  type VisualiserPlantRoleTag,
} from '../../../../lib/visualIdeas/previewPlantPickerFilters'
import { trackEvent } from '../../../../lib/analytics/trackEvent'
import { capturePreviewThumbnail } from '../../../../lib/visualIdeas/capturePreviewThumbnail'
import {
  getDevAlphaPreviewPlantOptions,
  getDevAlphaAssetForPlant,
  isDevAlphaPreviewPlant,
  isDevOverlaysEnabled,
  isDevAlphaAssetKey,
  resolvePreviewAsset,
  warnMissingDevAlphaOverlay,
} from '../../../../lib/visualiser/devAlphaBatchOverlays'

interface Pos { x: number; y: number }

type PlacementMode = 'single' | 'row'

function getOverlayMode(overlay: PreviewOverlay): 'single' | 'row' {
  return overlay.mode === 'row' ? 'row' : 'single'
}

function normalizeOverlayItem(item: PreviewOverlay): PreviewOverlay {
  const mode = getOverlayMode(item)
  if (mode === 'row') {
    return {
      ...item,
      mode: 'row',
      width: typeof item.width === 'number' ? Number(item.width) : DEFAULT_ROW_WIDTH,
    }
  }
  return {
    id: item.id,
    assetKey: item.assetKey,
    plantName: item.plantName,
    x: Number(item.x),
    y: Number(item.y),
    scale: Number(item.scale),
    mode: 'single',
  }
}

function isPreviewOverlayItem(value: unknown): value is PreviewOverlay {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.assetKey === 'string' &&
    typeof item.plantName === 'string' &&
    typeof item.x === 'number' &&
    typeof item.y === 'number' &&
    typeof item.scale === 'number'
  )
}

function parseOverlayItems(raw: PreviewOverlay[] | unknown | null | undefined): PreviewOverlay[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null

  const items = raw
    .filter(isPreviewOverlayItem)
    .map((item) => normalizeOverlayItem({
      id: item.id,
      assetKey: item.assetKey,
      plantName: item.plantName,
      x: Number(item.x),
      y: Number(item.y),
      scale: Number(item.scale),
      mode: item.mode === 'row' ? 'row' : 'single',
      width: typeof item.width === 'number' ? Number(item.width) : undefined,
    }))

  return items.length > 0 ? items : null
}

function legacyOverlayFromConcept(concept: VisualConcept): PreviewOverlay | null {
  if (
    !concept.overlay_asset_key ||
    !concept.overlay_position ||
    concept.overlay_scale == null
  ) {
    return null
  }

  const plantName =
    concept.selected_species?.find((name) => {
      const asset = resolveOverlayAsset([name], concept.detected_intent)
      return asset.key === concept.overlay_asset_key
    }) ??
    concept.selected_species?.[0] ??
    concept.overlay_asset_key

  return {
    id: crypto.randomUUID(),
    assetKey: concept.overlay_asset_key,
    plantName,
    x: concept.overlay_position.x,
    y: concept.overlay_position.y,
    scale: Number(concept.overlay_scale),
    mode: 'single',
  }
}

// ---------------------------------------------------------------------------
// Quick Preview helpers
// ---------------------------------------------------------------------------

function calcInitialOverlay(
  containerW: number,
  containerH: number,
  asset: OverlayAsset,
  placementPoint: Pos | null,
  savedPos: Pos | null,
  savedScale: number | null,
): { pos: Pos; width: number } {
  const width = savedScale && savedScale > 0
    ? Math.round(savedScale * containerW)
    : Math.round(asset.defaultWidthFraction * containerW)
  const height = width / asset.aspect

  let x: number
  let y: number

  if (savedPos) {
    x = Math.round(savedPos.x * containerW - width / 2)
    y = Math.round(savedPos.y * containerH - height / 2)
  } else if (placementPoint) {
    x = Math.round(placementPoint.x * containerW - width / 2)
    y = Math.round(placementPoint.y * containerH - height / 2)
  } else {
    x = Math.round((containerW - width) / 2)
    y = Math.round((containerH - height) / 2)
  }

  return { pos: { x, y }, width }
}

function overlayToPixels(
  overlay: PreviewOverlay,
  containerW: number,
  containerH: number,
  asset: OverlayAsset,
): { left: number; top: number; width: number; height: number } {
  if (getOverlayMode(overlay) === 'row') {
    const segmentWidth = overlay.scale * containerW
    const height = segmentWidth / asset.aspect
    const width = (overlay.width ?? DEFAULT_ROW_WIDTH) * containerW
    return {
      left: overlay.x * containerW - width / 2,
      top: overlay.y * containerH - height / 2,
      width,
      height,
    }
  }

  const width = overlay.scale * containerW
  const height = width / asset.aspect
  return {
    left: overlay.x * containerW - width / 2,
    top: overlay.y * containerH - height / 2,
    width,
    height,
  }
}

/** Horizontal tile overlap for row overlays (reduces visible gaps between segments). */
const ROW_TILE_OVERLAP_RATIO = 0.2
/** Crop each row tile's left/right edges to hide lighter seam bands (4–6% per side). */
const ROW_TILE_EDGE_CROP_RATIO = 0.05

function buildRowTileLayout(rowWidthPx: number, rowHeightPx: number, aspect: number) {
  const tileWidth = rowHeightPx * aspect
  const step = tileWidth * (1 - ROW_TILE_OVERLAP_RATIO)
  const count = Math.max(1, Math.ceil((rowWidthPx - tileWidth) / step + 1))
  return { tileWidth, step, count }
}

function createOverlayFromAsset(
  plantName: string,
  asset: OverlayAsset,
  containerW: number,
  containerH: number,
  placementPoint: Pos | null,
  savedPos: Pos | null = null,
  savedScale: number | null = null,
  offsetIndex = 0,
): PreviewOverlay {
  const { pos, width } = calcInitialOverlay(
    containerW,
    containerH,
    asset,
    placementPoint,
    savedPos,
    savedScale,
  )
  const offsetX = offsetIndex * 0.04 * containerW
  const centerX = (pos.x + width / 2 + offsetX) / containerW
  const centerY = (pos.y + width / asset.aspect / 2) / containerH

  return {
    id: crypto.randomUUID(),
    assetKey: asset.key,
    plantName,
    x: Math.min(0.95, Math.max(0.05, centerX)),
    y: Math.min(0.95, Math.max(0.05, centerY)),
    scale: width / containerW,
    mode: 'single',
  }
}

function createRowOverlayFromAsset(
  plantName: string,
  asset: OverlayAsset,
  containerW: number,
  containerH: number,
  placementPoint: Pos | null,
  offsetIndex = 0,
): PreviewOverlay {
  const base = createOverlayFromAsset(
    plantName,
    asset,
    containerW,
    containerH,
    placementPoint,
    null,
    null,
    offsetIndex,
  )

  return {
    ...base,
    mode: 'row',
    width: DEFAULT_ROW_WIDTH,
  }
}

function initOverlaysFromConcept(
  concept: VisualConcept,
  containerW: number,
  containerH: number,
  suggestedNames: string[],
): PreviewOverlay[] {
  const savedItems = parseOverlayItems(concept.overlay_items)
  if (savedItems) return savedItems

  const legacyItem = legacyOverlayFromConcept(concept)
  if (legacyItem) return [legacyItem]

  const species = concept.selected_species ?? []
  if (species.length > 0) {
    const asset = resolveOverlayAsset(
      species,
      concept.detected_intent,
      suggestedNames,
    )
    const plantName =
      species.find((name) => resolveOverlayAsset([name], concept.detected_intent).key === asset.key) ??
      species[0]

    return [createOverlayFromAsset(
      plantName,
      asset,
      containerW,
      containerH,
      concept.placement_point,
    )]
  }

  return []
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function VisualConceptDetailPage() {
  const { id } = useParams<{ id: string }>()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const [concept,    setConcept]    = useState<VisualConcept | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [notFound,   setNotFound]   = useState(false)

  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([])
  const [addingPlants,    setAddingPlants]    = useState(false)
  const [addPlantsResult, setAddPlantsResult] = useState<string | null>(null)

  // ── Quick Preview state ─────────────────────────────────────────────────
  const previewContainerRef               = useRef<HTMLDivElement>(null)
  const [previewDims, setPreviewDims]     = useState<{ w: number; h: number }>({ w: 0, h: 0 })
  const [previewReady, setPreviewReady]   = useState(false)
  const [overlays, setOverlays]           = useState<PreviewOverlay[]>([])
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null)
  const [plantToAdd, setPlantToAdd]       = useState(PREVIEW_PLANT_OPTIONS[0]?.name ?? '')
  const [plantCategoryFilter, setPlantCategoryFilter] = useState<PlantCategoryFilter | ''>('')
  const [plantSearchQuery, setPlantSearchQuery] = useState('')
  const [gardenStyleFilter, setGardenStyleFilter] = useState<VisualiserGardenStyleTag | 'Any'>('Any')
  const [plantRoleFilter, setPlantRoleFilter] = useState<VisualiserPlantRoleTag | 'Any'>('Any')
  const [placementMode, setPlacementMode] = useState<PlacementMode>('single')
  const [isDraggingOverlay, setIsDraggingOverlay] = useState(false)
  const overlayDragOrigin                 = useRef<{
    overlayId: string
    clientX: number
    clientY: number
    posX: number
    posY: number
  }>({ overlayId: '', clientX: 0, clientY: 0, posX: 0, posY: 0 })
  const [savingPreview, setSavingPreview] = useState(false)
  const [showFuturePlantsModal, setShowFuturePlantsModal] = useState(false)
  const [futurePlantsSaved, setFuturePlantsSaved] = useState(false)

  const suggestedNames = useMemo(
    () => ((concept?.suggested_species ?? []) as SuggestedSpecies[]).map((s) => s.name),
    [concept?.suggested_species],
  )

  const selectedOverlay = useMemo(
    () => overlays.find((o) => o.id === selectedOverlayId) ?? null,
    [overlays, selectedOverlayId],
  )

  const selectedOverlayWidth = useMemo(() => {
    if (!selectedOverlay || !previewDims.w) return 0
    return Math.round(selectedOverlay.scale * previewDims.w)
  }, [selectedOverlay, previewDims.w])

  const selectedOverlayRowWidth = useMemo(() => {
    if (!selectedOverlay || !previewDims.w || getOverlayMode(selectedOverlay) !== 'row') return 0
    return Math.round((selectedOverlay.width ?? DEFAULT_ROW_WIDTH) * previewDims.w)
  }, [selectedOverlay, previewDims.w])

  const showDevOverlays = isDevOverlaysEnabled()

  const devAlphaPlantOptions = useMemo(() => {
    if (!showDevOverlays) return []
    return getDevAlphaPreviewPlantOptions().filter((plant) => {
      const matchesCategory = previewPlantMatchesCategory(plant, plantCategoryFilter)
      const query = plantSearchQuery.trim().toLowerCase()
      const matchesSearch = !query || plant.name.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [showDevOverlays, plantCategoryFilter, plantSearchQuery])

  const previewPlantCategories = useMemo(() => {
    const plants = showDevOverlays
      ? [...PREVIEW_PLANT_OPTIONS, ...getDevAlphaPreviewPlantOptions()]
      : PREVIEW_PLANT_OPTIONS
    return categoriesUsedByPreviewPlants(plants)
  }, [showDevOverlays])

  const filteredSinglePlantOptions = useMemo(() => {
    return PREVIEW_PLANT_OPTIONS.filter((plant) => {
      const matchesCategory = previewPlantMatchesCategory(plant, plantCategoryFilter)
      const query = plantSearchQuery.trim().toLowerCase()
      const matchesSearch = !query || plant.name.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [plantCategoryFilter, plantSearchQuery])

  const sortedSinglePlantPicker = useMemo(
    () => sortPreviewPlantsByOptionalFilters(
      filteredSinglePlantOptions,
      gardenStyleFilter,
      plantRoleFilter,
    ),
    [filteredSinglePlantOptions, gardenStyleFilter, plantRoleFilter],
  )

  const productionSingleAddOptions = useMemo(
    () => [...sortedSinglePlantPicker.recommended, ...sortedSinglePlantPicker.other],
    [sortedSinglePlantPicker.recommended, sortedSinglePlantPicker.other],
  )

  const addPlantOptions = placementMode === 'row'
    ? ROW_PREVIEW_PLANT_OPTIONS
    : [...productionSingleAddOptions, ...devAlphaPlantOptions]

  const showNoStyleRoleMatches = placementMode === 'single'
    && sortedSinglePlantPicker.hasActiveFilters
    && !sortedSinglePlantPicker.hasExactMatches
    && filteredSinglePlantOptions.length > 0

  const showRecommendedGroup = placementMode === 'single'
    && sortedSinglePlantPicker.hasActiveFilters
    && sortedSinglePlantPicker.hasExactMatches
    && sortedSinglePlantPicker.recommended.length > 0
    && sortedSinglePlantPicker.other.length > 0

  const showDevAlphaGroup = placementMode === 'single' && devAlphaPlantOptions.length > 0

  useEffect(() => {
    if (addPlantOptions.some((plant) => plant.name === plantToAdd)) return
    setPlantToAdd(addPlantOptions[0]?.name ?? '')
  }, [addPlantOptions, plantToAdd])

  function handlePlacementModeChange(mode: PlacementMode) {
    setPlacementMode(mode)
    if (mode === 'row') {
      setPlantCategoryFilter('')
      setPlantSearchQuery('')
      setGardenStyleFilter('Any')
      setPlantRoleFilter('Any')
      setPlantToAdd(ROW_PREVIEW_PLANT_OPTIONS[0]?.name ?? '')
    }
  }

  function updateOverlay(id: string, patch: Partial<PreviewOverlay>) {
    setOverlays((prev) =>
      prev.map((overlay) => (overlay.id === id ? { ...overlay, ...patch } : overlay)),
    )
  }
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('garden_visual_concepts')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error || !data) { setNotFound(true); setLoading(false); return }

      const c = data as VisualConcept
      setConcept(c)
      setSelectedSpecies(c.selected_species ?? [])
      setLoading(false)
    }
    load()
  }, [id, supabase])

  const overlayPlantNames = useMemo(
    () => overlays.map((overlay) => overlay.plantName),
    [overlays],
  )

  const uniqueOverlayPlantNames = useMemo(
    () => [...new Set(overlayPlantNames)],
    [overlayPlantNames],
  )

  // ── Background image load — first-time initialization ───────────────────
  function handleBgImageLoad() {
    if (previewReady || !concept) return
    const container = previewContainerRef.current
    if (!container) return

    const w = container.offsetWidth
    const h = container.offsetHeight
    if (!w || !h) return

    const initial = initOverlaysFromConcept(concept, w, h, suggestedNames)
    setPreviewDims({ w, h })
    setOverlays(initial)
    setSelectedOverlayId(initial[0]?.id ?? null)
    setPreviewReady(true)
  }

  // ── Add / select / delete overlays ───────────────────────────────────────
  function handleAddPlant() {
    if (!plantToAdd || !previewDims.w || !previewDims.h || !concept) return

    if (placementMode === 'row') {
      const rowPlant = ROW_PREVIEW_PLANT_OPTIONS.find((p) => p.name === plantToAdd)
      if (!rowPlant) return

      const asset = resolveOverlayAsset([rowPlant.name], rowPlant.detectedIntent)
      const newOverlay = createRowOverlayFromAsset(
        rowPlant.name,
        asset,
        previewDims.w,
        previewDims.h,
        concept.placement_point,
        overlays.length,
      )

      setOverlays((prev) => [...prev, newOverlay])
      setSelectedOverlayId(newOverlay.id)
      trackEvent('plant_added_to_preview', {
        plant_name:    rowPlant.name,
        preview_mode:  'row',
        overlay_count: overlays.length + 1,
        route:         `/visualise/${id}`,
      })
      return
    }

    const plant = PREVIEW_PLANT_OPTIONS.find((p) => p.name === plantToAdd)
    const devAsset = isDevAlphaPreviewPlant(plantToAdd)
      ? getDevAlphaAssetForPlant(plantToAdd)
      : undefined
    if (!plant && !devAsset) return

    const asset = devAsset ?? resolveOverlayAsset([plant!.name], plant!.detectedIntent)
    const newOverlay = createOverlayFromAsset(
      plantToAdd,
      asset,
      previewDims.w,
      previewDims.h,
      concept.placement_point,
      null,
      null,
      overlays.length,
    )

    setOverlays((prev) => [...prev, newOverlay])
    setSelectedOverlayId(newOverlay.id)
    trackEvent('plant_added_to_preview', {
      plant_name:    plantToAdd,
      preview_mode:  'single',
      overlay_count: overlays.length + 1,
      route:         `/visualise/${id}`,
    })
  }

  function handleDeleteOverlay(id: string) {
    setOverlays((prev) => {
      const next = prev.filter((overlay) => overlay.id !== id)
      if (selectedOverlayId === id) {
        setSelectedOverlayId(next[next.length - 1]?.id ?? null)
      }
      return next
    })
  }

  // ── Drag handlers (selected overlay only) ────────────────────────────────
  const handleOverlayPointerDown = useCallback(
    (overlayId: string) => (e: React.PointerEvent<HTMLElement>) => {
      if (!previewDims.w || !previewDims.h) return

      const overlay = overlays.find((item) => item.id === overlayId)
      if (!overlay) return

      e.preventDefault()
      e.stopPropagation()
      e.currentTarget.setPointerCapture(e.pointerId)
      setSelectedOverlayId(overlayId)
      setIsDraggingOverlay(true)

      const asset = resolvePreviewAsset(overlay.assetKey)
      const { left, top } = overlayToPixels(overlay, previewDims.w, previewDims.h, asset)
      overlayDragOrigin.current = {
        overlayId,
        clientX: e.clientX,
        clientY: e.clientY,
        posX: left,
        posY: top,
      }
    },
    [overlays, previewDims.h, previewDims.w],
  )

  const handleOverlayPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!isDraggingOverlay || !previewDims.w || !previewDims.h) return

      const { overlayId, clientX, clientY, posX, posY } = overlayDragOrigin.current

      setOverlays((prev) => {
        const overlay = prev.find((item) => item.id === overlayId)
        if (!overlay) return prev

        const asset = resolvePreviewAsset(overlay.assetKey)
        const { width: widthPx, height: heightPx } = overlayToPixels(
          overlay,
          previewDims.w,
          previewDims.h,
          asset,
        )
        const newLeft = posX + e.clientX - clientX
        const newTop = posY + e.clientY - clientY

        return prev.map((item) =>
          item.id === overlayId
            ? {
                ...item,
                x: (newLeft + widthPx / 2) / previewDims.w,
                y: (newTop + heightPx / 2) / previewDims.h,
              }
            : item,
        )
      })
    },
    [isDraggingOverlay, previewDims.h, previewDims.w],
  )

  const handleOverlayPointerUp = useCallback(() => setIsDraggingOverlay(false), [])

  function handleSelectedOverlayWidthChange(width: number) {
    if (!selectedOverlayId || !previewDims.w) return
    updateOverlay(selectedOverlayId, { scale: width / previewDims.w })
  }

  function handleSelectedOverlayRowWidthChange(width: number) {
    if (!selectedOverlayId || !previewDims.w) return
    updateOverlay(selectedOverlayId, { width: width / previewDims.w })
  }

  // ── Reset selected overlay to default placement ──────────────────────────
  function handleResetOverlay() {
    if (!selectedOverlay || !previewDims.w || !previewDims.h || !concept) return

    if (getOverlayMode(selectedOverlay) === 'row') {
      const rowPlant = ROW_PREVIEW_PLANT_OPTIONS.find((p) => p.name === selectedOverlay.plantName)
      const asset = resolvePreviewAsset(selectedOverlay.assetKey)
      const reset = createRowOverlayFromAsset(
        selectedOverlay.plantName,
        rowPlant ? resolveOverlayAsset([rowPlant.name], rowPlant.detectedIntent) : asset,
        previewDims.w,
        previewDims.h,
        concept.placement_point,
      )

      updateOverlay(selectedOverlay.id, {
        x: reset.x,
        y: reset.y,
        scale: reset.scale,
        width: reset.width,
        mode: 'row',
      })
      return
    }

    const plant = PREVIEW_PLANT_OPTIONS.find((p) => p.name === selectedOverlay.plantName)
    const devAsset = isDevAlphaPreviewPlant(selectedOverlay.plantName)
      ? getDevAlphaAssetForPlant(selectedOverlay.plantName)
      : undefined
    const asset = resolvePreviewAsset(selectedOverlay.assetKey)
    const reset = createOverlayFromAsset(
      selectedOverlay.plantName,
      devAsset ?? (plant ? resolveOverlayAsset([plant.name], plant.detectedIntent) : asset),
      previewDims.w,
      previewDims.h,
      concept.placement_point,
    )

    updateOverlay(selectedOverlay.id, {
      x: reset.x,
      y: reset.y,
      scale: reset.scale,
      mode: 'single',
    })
  }

  // ── Save Quick Preview ───────────────────────────────────────────────────
  async function handleSavePreview() {
    if (!concept || !previewDims.w || overlays.length === 0) return

    setSavingPreview(true)

    const overlayItems = overlays.map((overlay) => normalizeOverlayItem(overlay))
    const primaryOverlay = overlays[0]
    const normalizedPos = { x: primaryOverlay.x, y: primaryOverlay.y }
    const normalizedScale = primaryOverlay.scale
    const speciesToSave = uniqueOverlayPlantNames

    let previewThumbnailUrl: string | null = concept.preview_thumbnail_url ?? null

    if (concept.original_photo_url) {
      const thumbBlob = await capturePreviewThumbnail(
        concept.original_photo_url,
        overlays,
        previewDims.w,
        previewDims.h,
      )
      if (thumbBlob) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const thumbPath = `visual-ideas/thumbnails/${user.id}/${concept.id}.jpg`
          const { error: uploadError } = await supabase.storage
            .from('weed-images')
            .upload(thumbPath, thumbBlob, { contentType: 'image/jpeg', upsert: true })
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('weed-images')
              .getPublicUrl(thumbPath)
            previewThumbnailUrl = publicUrl
          }
        }
      }
    }

    const { error } = await supabase
      .from('garden_visual_concepts')
      .update({
        overlay_items:       overlayItems,
        overlay_asset_key: primaryOverlay.assetKey,
        overlay_position:    normalizedPos,
        overlay_scale:       normalizedScale,
        preview_mode:        'overlay',
        selected_species:    speciesToSave,
        preview_thumbnail_url: previewThumbnailUrl,
        updated_at:          new Date().toISOString(),
      })
      .eq('id', concept.id)

    if (!error) {
      setConcept((prev) => prev ? {
        ...prev,
        overlay_items:       overlayItems,
        overlay_asset_key: primaryOverlay.assetKey,
        overlay_position:    normalizedPos,
        overlay_scale:       normalizedScale,
        preview_mode:        'overlay',
        selected_species:    speciesToSave,
        preview_thumbnail_url: previewThumbnailUrl,
      } : prev)
      setSelectedSpecies(speciesToSave)
      setFuturePlantsSaved(false)
      setAddPlantsResult(null)
      setShowFuturePlantsModal(true)
      trackEvent('quick_preview_saved', {
        overlay_count: overlays.length,
        preview_mode:  'overlay',
        route:         `/visualise/${concept.id}`,
      })
    }
    setSavingPreview(false)
  }

  async function handleSaveToFuturePlants() {
    const speciesForFuture = uniqueOverlayPlantNames.length > 0
      ? uniqueOverlayPlantNames
      : [...new Set(selectedSpecies)]
    if (!concept || speciesForFuture.length === 0) return
    setAddingPlants(true)
    setAddPlantsResult(null)

    const res = await fetch('/api/visual-ideas/add-planned-plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selectedSpecies: speciesForFuture,
        gardenAreaId: concept.garden_area_id || null,
      }),
    })

    const json = await res.json()
    if (!res.ok) {
      setAddPlantsResult(json.error || 'Could not save to Future Plants.')
    } else {
      setFuturePlantsSaved(true)
      setAddPlantsResult('Saved to Future Plants')
      trackEvent('future_plant_saved', {
        plant_name:    speciesForFuture[0],
        overlay_count: speciesForFuture.length,
        source:        'quick_preview',
        route:         `/visualise/${concept.id}`,
      })
    }
    setAddingPlants(false)
  }

  // ── Loading / not-found states ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-green-800/20 border-t-green-800 rounded-full animate-spin" />
          <p className="text-green-800 font-black uppercase text-[10px] tracking-widest">Loading…</p>
        </div>
      </div>
    )
  }

  if (notFound || !concept) {
    return (
      <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <p className="text-4xl">🌿</p>
          <p className="text-sm font-black text-green-950 uppercase">Concept not found</p>
          <Link href="/visualise" className="text-[10px] font-black uppercase tracking-widest text-green-700 underline">
            Back to Visualise
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40">

      {/* Header */}
      <div className="bg-green-900 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-xl shadow-green-900/20 mb-6">
        <Link
          href="/visualise"
          className="inline-flex items-center gap-2 text-green-300 text-[10px] font-black uppercase tracking-widest mb-5 active:opacity-70"
        >
          <ArrowLeft size={12} strokeWidth={3} />
          Visualise
        </Link>
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none mb-1">
          {concept.name}
        </h1>
        {concept.detected_intent && (
          <p className="text-green-400 text-[10px] font-black uppercase tracking-widest">
            {concept.detected_intent}
          </p>
        )}
      </div>

      <div className="px-6 space-y-6">

        {/* ── Quick Preview (primary) ───────────────────────────────────────── */}
        {concept.original_photo_url && (
          <section className="space-y-4 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5">
            <div className="px-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-green-800">
                Quick Preview
              </p>
              <p className="text-[12px] text-gray-600 font-medium mt-1 leading-relaxed">
                Place plant cut-outs into your photo to test shape, scale, and position.
              </p>
              {showDevOverlays && (
                <p className="text-[11px] text-amber-800 font-medium mt-2 leading-relaxed bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                  Dev QA overlays enabled — alpha batch plants appear at the bottom of the picker.
                </p>
              )}
            </div>

            {/* Add plant */}
            <div
              className={`rounded-[1.5rem] border p-4 space-y-3 ${
                previewReady && overlays.length === 0
                  ? 'bg-green-50 border-green-200'
                  : 'bg-[#f0f4f1] border-gray-100'
              }`}
            >
              {previewReady && overlays.length === 0 && (
                <div className="px-1">
                  <p className="text-sm font-black text-green-950 uppercase tracking-tight">
                    Add your first plant
                  </p>
                  <p className="text-[12px] text-gray-600 font-medium mt-1 leading-relaxed">
                    Choose one or more plants to preview in this photo.
                  </p>
                </div>
              )}
              <div className="px-1 space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40">
                  Placement
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handlePlacementModeChange('single')}
                    className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                      placementMode === 'single'
                        ? 'bg-green-900 text-white border-green-900'
                        : 'bg-white text-gray-500 border-gray-100'
                    }`}
                  >
                    Single plant
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePlacementModeChange('row')}
                    className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                      placementMode === 'row'
                        ? 'bg-green-900 text-white border-green-900'
                        : 'bg-white text-gray-500 border-gray-100'
                    }`}
                  >
                    Hedge / row
                  </button>
                </div>
                {placementMode === 'row' && (
                  <div className="px-1">
                    <p className="text-[11px] font-black text-green-950 uppercase tracking-tight">
                      Hedge / row preview
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed">
                      Adjust width to roughly match the length of hedge or border.
                    </p>
                  </div>
                )}
              </div>
              {placementMode === 'single' && (
                <>
                  <p className="px-1 text-[11px] text-gray-500 font-medium leading-relaxed">
                    {PREVIEW_PICKER_HELPER_TEXT}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="bg-white border border-gray-100 rounded-[1rem] px-4 py-3">
                      <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">
                        Garden style
                      </label>
                      <select
                        value={gardenStyleFilter}
                        onChange={(e) => setGardenStyleFilter(e.target.value as VisualiserGardenStyleTag | 'Any')}
                        className="w-full bg-transparent text-[12px] font-bold text-green-950 outline-none appearance-none cursor-pointer"
                      >
                        {VISUALISER_GARDEN_STYLE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option === 'Any' ? 'Any style' : option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-[1rem] px-4 py-3">
                      <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">
                        Plant role
                      </label>
                      <select
                        value={plantRoleFilter}
                        onChange={(e) => setPlantRoleFilter(e.target.value as VisualiserPlantRoleTag | 'Any')}
                        className="w-full bg-transparent text-[12px] font-bold text-green-950 outline-none appearance-none cursor-pointer"
                      >
                        {VISUALISER_PLANT_ROLE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option === 'Any' ? 'Any role' : option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
              {placementMode === 'single' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-white border border-gray-100 rounded-[1rem] px-4 py-3">
                    <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">
                      Category
                    </label>
                    <select
                      value={plantCategoryFilter}
                      onChange={(e) => setPlantCategoryFilter(e.target.value as PlantCategoryFilter | '')}
                      className="w-full bg-transparent text-[12px] font-bold text-green-950 outline-none appearance-none cursor-pointer"
                    >
                      <option value="">All categories</option>
                      {previewPlantCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-[1rem] px-4 py-3">
                    <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">
                      Search
                    </label>
                    <input
                      type="text"
                      value={plantSearchQuery}
                      onChange={(e) => setPlantSearchQuery(e.target.value)}
                      placeholder="Filter by name..."
                      className="w-full bg-transparent text-[12px] font-bold text-green-950 outline-none placeholder:text-gray-300"
                    />
                  </div>
                </div>
              )}
              {showNoStyleRoleMatches && (
                <p className="px-1 text-[11px] text-amber-700 font-medium leading-relaxed">
                  {PREVIEW_PICKER_NO_MATCHES_TEXT}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={plantToAdd}
                  onChange={(e) => setPlantToAdd(e.target.value)}
                  disabled={addPlantOptions.length === 0}
                  className="flex-1 bg-white border border-gray-100 rounded-[1rem] px-4 py-3 text-[12px] font-bold text-green-950 outline-none disabled:opacity-50"
                >
                  {addPlantOptions.length === 0 ? (
                    <option value="">No plants match</option>
                  ) : showRecommendedGroup ? (
                    <>
                      <optgroup label="Recommended">
                        {sortedSinglePlantPicker.recommended.map((plant) => (
                          <option key={plant.name} value={plant.name}>
                            {plant.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="All plants">
                        {sortedSinglePlantPicker.other.map((plant) => (
                          <option key={plant.name} value={plant.name}>
                            {plant.name}
                          </option>
                        ))}
                      </optgroup>
                      {showDevAlphaGroup && (
                        <optgroup label="Dev QA (alpha batch)">
                          {devAlphaPlantOptions.map((plant) => (
                            <option key={plant.name} value={plant.name}>
                              {plant.name}
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </>
                  ) : (
                    <>
                      {productionSingleAddOptions.map((plant) => (
                        <option key={plant.name} value={plant.name}>
                          {plant.name}
                        </option>
                      ))}
                      {showDevAlphaGroup && (
                        <optgroup label="Dev QA (alpha batch)">
                          {devAlphaPlantOptions.map((plant) => (
                            <option key={plant.name} value={plant.name}>
                              {plant.name}
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </>
                  )}
                </select>
                <button
                  type="button"
                  onClick={handleAddPlant}
                  disabled={!previewReady || !plantToAdd || addPlantOptions.length === 0}
                  className="bg-green-900 text-white px-5 py-3 rounded-[1rem] text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {placementMode === 'row' ? 'Add row' : 'Add plant'}
                </button>
              </div>
            </div>

            {/* Photo canvas with draggable overlays */}
            <div
              ref={previewContainerRef}
              className="relative rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm bg-gray-100"
              onClick={() => setSelectedOverlayId(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={concept.original_photo_url}
                alt="Your garden"
                className="w-full h-auto block select-none pointer-events-none"
                draggable={false}
                onLoad={handleBgImageLoad}
              />

              {previewReady && overlays.map((overlay) => {
                const asset = resolvePreviewAsset(overlay.assetKey)
                const { left, top, width, height } = overlayToPixels(
                  overlay,
                  previewDims.w,
                  previewDims.h,
                  asset,
                )
                const isSelected = overlay.id === selectedOverlayId
                const isRow = getOverlayMode(overlay) === 'row'
                const sharedStyle = {
                  position: 'absolute' as const,
                  left,
                  top,
                  cursor: isSelected
                    ? (isDraggingOverlay ? 'grabbing' : 'grab')
                    : 'pointer',
                  userSelect: 'none' as const,
                  touchAction: 'none' as const,
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.45))',
                  background: 'transparent',
                  zIndex: isSelected ? 20 : 10,
                  outline: isSelected ? '3px solid rgba(74, 222, 128, 0.95)' : undefined,
                  outlineOffset: isSelected ? '2px' : undefined,
                  borderRadius: isSelected ? '6px' : undefined,
                }
                const pointerHandlers = {
                  onPointerDown: handleOverlayPointerDown(overlay.id),
                  onPointerMove: handleOverlayPointerMove,
                  onPointerUp: handleOverlayPointerUp,
                  onPointerCancel: handleOverlayPointerUp,
                  onClick: (e: React.MouseEvent) => e.stopPropagation(),
                }

                if (isRow) {
                  const { tileWidth, step, count } = buildRowTileLayout(width, height, asset.aspect)

                  return (
                    <div
                      key={overlay.id}
                      role="presentation"
                      aria-label={overlay.plantName}
                      draggable={false}
                      style={{
                        ...sharedStyle,
                        width,
                        height,
                        overflow: 'hidden',
                      }}
                      {...pointerHandlers}
                    >
                      {Array.from({ length: count }, (_, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={index}
                          src={asset.src}
                          alt=""
                          draggable={false}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: index * step,
                            height: '100%',
                            width: tileWidth,
                            display: 'block',
                            pointerEvents: 'none',
                            clipPath: `inset(0 ${ROW_TILE_EDGE_CROP_RATIO * 100}% 0 ${ROW_TILE_EDGE_CROP_RATIO * 100}%)`,
                          }}
                        />
                      ))}
                    </div>
                  )
                }

                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={overlay.id}
                    src={asset.src}
                    alt={overlay.plantName}
                    draggable={false}
                    onError={() => {
                      if (isDevAlphaAssetKey(overlay.assetKey)) {
                        warnMissingDevAlphaOverlay(overlay.plantName, asset.src)
                      }
                    }}
                    style={{
                      ...sharedStyle,
                      width,
                      height: 'auto',
                    }}
                    {...pointerHandlers}
                  />
                )
              })}

              {previewReady && overlays.length === 0 && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ zIndex: 15 }}
                >
                  <div className="bg-black/45 text-white rounded-[1.25rem] px-5 py-4 text-center max-w-[16rem]">
                    <p className="text-[11px] font-black uppercase tracking-tight">
                      Add your first plant
                    </p>
                    <p className="text-[10px] font-medium mt-1 leading-relaxed text-white/80">
                      Choose one or more plants to preview in this photo.
                    </p>
                  </div>
                </div>
              )}

              {previewReady && (
                <div
                  className="absolute bottom-3 left-3 text-[10px] text-white/80 font-medium bg-black/40 rounded-full px-3 py-1 pointer-events-none"
                  style={{ zIndex: 30 }}
                >
                  {overlays.length} item{overlays.length === 1 ? '' : 's'}
                  {selectedOverlay ? ` · ${selectedOverlay.plantName}` : ''}
                  {selectedOverlay && getOverlayMode(selectedOverlay) === 'row' ? ' · row' : ''}
                </div>
              )}
            </div>

            {/* Plants in this preview */}
            {previewReady && overlays.length > 0 && (
              <div className="space-y-2 px-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40">
                  Plants in this preview
                </p>
                <div className="space-y-2">
                  {overlays.map((overlay) => {
                    const isSelected = overlay.id === selectedOverlayId
                    return (
                      <div
                        key={overlay.id}
                        className={`flex items-center justify-between gap-3 p-3 rounded-[1rem] border ${
                          isSelected
                            ? 'bg-green-50 border-green-200'
                            : 'bg-[#f0f4f1] border-gray-100'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-[11px] font-black text-green-950 truncate">
                            {overlay.plantName}
                          </p>
                          {getOverlayMode(overlay) === 'row' && (
                            <p className="text-[9px] font-black uppercase tracking-widest text-green-700/70 mt-0.5">
                              Hedge / row
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setSelectedOverlayId(overlay.id)}
                            className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                              isSelected
                                ? 'bg-green-900 text-white'
                                : 'bg-white text-green-800 border border-gray-100'
                            }`}
                          >
                            Select
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteOverlay(overlay.id)}
                            className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white text-red-600 border border-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-3 px-1">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40">
                    {selectedOverlay && getOverlayMode(selectedOverlay) === 'row' ? 'Height' : 'Size'}
                    {selectedOverlay ? ` · ${selectedOverlay.plantName}` : ''}
                  </p>
                  <p className="text-[9px] font-mono text-green-800/40">
                    {selectedOverlay ? `${selectedOverlayWidth}px` : 'Select an item'}
                  </p>
                </div>
                <input
                  type="range"
                  min={30}
                  max={previewDims.w || 400}
                  value={selectedOverlayWidth || 120}
                  disabled={!selectedOverlay}
                  onChange={(e) => handleSelectedOverlayWidthChange(Number(e.target.value))}
                  className="w-full accent-green-700 disabled:opacity-40"
                />
              </div>

              {selectedOverlay && getOverlayMode(selectedOverlay) === 'row' && (
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40">
                      Row width
                    </p>
                    <p className="text-[9px] font-mono text-green-800/40">
                      {selectedOverlayRowWidth}px
                    </p>
                  </div>
                  <input
                    type="range"
                    min={Math.round((previewDims.w || 400) * 0.15)}
                    max={Math.round((previewDims.w || 400) * 0.95)}
                    value={selectedOverlayRowWidth || Math.round((previewDims.w || 400) * DEFAULT_ROW_WIDTH)}
                    onChange={(e) => handleSelectedOverlayRowWidthChange(Number(e.target.value))}
                    className="w-full accent-green-700"
                  />
                  <p className="text-[10px] text-gray-400 font-medium mt-2 leading-relaxed">
                    Adjust width to roughly match the length of hedge or border.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleSavePreview}
                  disabled={savingPreview || overlays.length === 0}
                  className="w-full bg-green-900 text-white py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {savingPreview ? (
                    <Loader2 size={14} strokeWidth={3} className="animate-spin" />
                  ) : (
                    'Save Preview'
                  )}
                </button>
                {overlays.length === 0 && (
                  <p className="text-center text-[10px] text-gray-400 font-medium leading-relaxed">
                    Add at least one plant before saving your preview.
                  </p>
                )}
                <button
                  onClick={handleResetOverlay}
                  disabled={!selectedOverlay}
                  className="w-full bg-[#f0f4f1] border border-gray-100 text-green-800/60 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all disabled:opacity-40"
                >
                  Reset selected
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ── Disclaimer ── */}
        <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
            Visual ideas are for inspiration only. Plant spacing, mature size, and
            suitability should be confirmed before planting.
          </p>
        </div>

        {/* ── Pristine Gardens CTA ── */}
        <div className="bg-green-950 rounded-[2rem] p-6 text-center space-y-3 shadow-xl">
          <p className="text-[9px] font-black uppercase tracking-widest text-green-400">
            Professional help
          </p>
          <p className="text-white font-black text-[15px] leading-snug">
            Need help sourcing or planting this?
          </p>
          <p className="text-green-200/60 text-[11px] font-medium">
            Ask Pristine Gardens — Auckland's local planting specialists.
          </p>
          <a
            href="https://pristinegardens.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-400 text-green-950 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full shadow active:scale-95 transition-all"
          >
            Ask Pristine Gardens
            <ExternalLink size={11} strokeWidth={3} />
          </a>
        </div>

      </div>

      {showFuturePlantsModal && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 px-4 pt-4 overflow-y-auto pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:pb-8"
        >
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-xl space-y-4 max-h-[min(85dvh,calc(100dvh-2rem-env(safe-area-inset-bottom,0px)))] overflow-y-auto sm:max-h-none sm:overflow-visible">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-green-800">
                Preview saved
              </p>
              {futurePlantsSaved ? (
                <p className="text-[13px] text-green-800 font-bold mt-2">
                  Saved to Future Plants
                </p>
              ) : (
                <>
                  <p className="text-[13px] text-gray-700 font-medium mt-2 leading-relaxed">
                    Would you like to save {uniqueOverlayPlantNames.length === 1 ? 'this plant' : 'these plants'} to your Future Plants list?
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium mt-2">
                    Future Plants — plants you&apos;re considering
                  </p>
                </>
              )}
            </div>

            {addPlantsResult && !futurePlantsSaved && (
              <p className="text-[11px] text-red-600 font-medium">{addPlantsResult}</p>
            )}

            {!futurePlantsSaved ? (
              <div className="space-y-2">
                <button
                  onClick={handleSaveToFuturePlants}
                  disabled={addingPlants || uniqueOverlayPlantNames.length === 0}
                  className="w-full bg-green-900 text-white py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {addingPlants ? (
                    <Loader2 size={14} strokeWidth={3} className="animate-spin" />
                  ) : (
                    'Save to Future Plants'
                  )}
                </button>
                <button
                  onClick={() => setShowFuturePlantsModal(false)}
                  className="w-full bg-[#f0f4f1] text-green-800/60 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all"
                >
                  Not now
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowFuturePlantsModal(false)}
                className="w-full bg-green-900 text-white py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
