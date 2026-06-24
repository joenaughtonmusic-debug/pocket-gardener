'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import type { UserPlant, PlantRemedy } from '../types/garden'
import PlantThumbnail from './PlantThumbnail'
import { enrichShoppingForIssue, prettySupplyTag } from '../lib/taskSupplies'

export interface DiagnoseProblemModalProps {
  open: boolean
  onClose: () => void
  /** Plant context. null = generic / no-plant mode. */
  plant: UserPlant | null
  /** Pre-loaded remedies. For plant mode: plant-specific + universal. For generic mode: all remedies. */
  remedies: PlantRemedy[]
  loading: boolean
  saving: boolean
  /** Pre-fill the search bar (e.g. from a Garden Coach suggestion). */
  initialSearch?: string
  /** Called when the user selects a remedy. The plant is always provided (either the prop or chosen from picker). */
  onSelectIssue: (remedy: PlantRemedy, plant: UserPlant) => Promise<void>
  /** Needed for the plant picker in generic mode. */
  ownedPlants: UserPlant[]
}

// ── Search helpers ────────────────────────────────────────────────────────────

/**
 * Synonym/related-term expansions so that colloquial descriptions still match
 * database issue text. Longer triggers are checked first by convention.
 */
const SYNONYM_MAP: [trigger: string, expansions: string[]][] = [
  ['bumpy fruit',    ['rough', 'scabby', 'scab', 'lumpy', 'uneven', 'fruit']],
  ['scabby fruit',   ['rough', 'scabby', 'scab', 'bumpy', 'fruit']],
  ['sticky leaves',  ['scale', 'sooty', 'sooty mould', 'honeydew', 'aphid']],
  ['yellowing',      ['yellow', 'pale', 'chlorosis', 'magnesium']],
  ['dropping leaves',['drop', 'fall', 'wilting', 'droop']],
  ['falling leaves', ['drop', 'fall', 'wilting', 'droop']],
  ['bumpy',          ['rough', 'scabby', 'lumpy', 'uneven']],
  ['scabby',         ['rough', 'bumpy', 'scab']],
  ['sticky',         ['scale', 'sooty', 'honeydew', 'aphid']],
  ['holes',          ['hole', 'chewing', 'caterpillar', 'damage']],
  ['dropping',       ['drop', 'droop', 'wilting', 'fall']],
  ['limp',           ['wilting', 'drooping', 'soft']],
  ['mushy',          ['rot', 'soft', 'overwatering', 'root rot']],
  ['crispy',         ['dry', 'burnt', 'brown', 'underwatering']],
  ['white powder',   ['mildew', 'powdery mildew', 'fungal']],
  ['white',          ['mildew', 'powdery', 'scale', 'mealy']],
  ['rust',           ['rust', 'orange', 'fungal', 'spore']],
  ['spots',          ['spot', 'lesion', 'mark', 'fungal']],
  ['black',          ['black spot', 'sooty', 'fungal']],
]

/**
 * Build an expanded set of search terms from a raw query.
 * Includes: the full query, individual words ≥3 chars, and synonym expansions.
 */
function buildSearchTerms(query: string): string[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const terms = new Set<string>([q])
  // Individual words
  q.split(/\s+/).filter((w) => w.length >= 3).forEach((w) => terms.add(w))
  // Synonym expansion
  for (const [trigger, expansions] of SYNONYM_MAP) {
    if (q.includes(trigger)) expansions.forEach((e) => terms.add(e))
  }
  return [...terms]
}

function matchesTerms(remedy: PlantRemedy, terms: string[]): boolean {
  const text = [remedy.issue_type, remedy.remedy_title, remedy.remedy_description, remedy.search_keywords]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return terms.some((t) => text.includes(t))
}

// ─────────────────────────────────────────────────────────────────────────────

export default function DiagnoseProblemModal({
  open,
  onClose,
  plant,
  remedies,
  loading,
  saving,
  initialSearch,
  onSelectIssue,
  ownedPlants,
}: DiagnoseProblemModalProps) {
  const [searchQuery,   setSearchQuery]   = useState(initialSearch ?? '')
  const [showPicker,    setShowPicker]    = useState(false)
  const [pendingRemedy, setPendingRemedy] = useState<PlantRemedy | null>(null)

  // Reset internal state whenever the modal opens or initialSearch changes.
  useEffect(() => {
    if (open) {
      setSearchQuery(initialSearch ?? '')
      setShowPicker(false)
      setPendingRemedy(null)
    }
  }, [open, initialSearch])

  if (!open) return null

  const isGeneric  = plant === null
  const hasQuery   = searchQuery.trim().length > 0
  const searchTerms = hasQuery ? buildSearchTerms(searchQuery) : []

  // ── Separate unfiltered buckets ─────────────────────────────────────────────
  const plantSpecificRemedies = remedies.filter(
    (r) => plant && Number(r.specific_plant_id) === Number(plant.plant_id),
  )
  const universalRemedies = remedies.filter(
    (r) => r.is_universal === true &&
      (!plant || Number(r.specific_plant_id) !== Number(plant.plant_id)),
  )

  // ── Apply search filter ─────────────────────────────────────────────────────
  const filteredSpecific  = hasQuery ? plantSpecificRemedies.filter((r) => matchesTerms(r, searchTerms)) : plantSpecificRemedies
  const filteredUniversal = hasQuery ? universalRemedies.filter((r) => matchesTerms(r, searchTerms))     : universalRemedies

  // ── Plant-mode fallback ─────────────────────────────────────────────────────
  // When a search yields no results at all for a plant we know about, show all
  // plant-specific issues as a "common issues" fallback instead of an empty state.
  const noFilteredResults  = hasQuery && filteredSpecific.length === 0 && filteredUniversal.length === 0
  const showingFallback    = !isGeneric && noFilteredResults && plantSpecificRemedies.length > 0

  const specificToShow  = showingFallback ? plantSpecificRemedies : filteredSpecific
  // In fallback mode keep the focus on plant-specific issues; skip universal.
  const universalToShow = showingFallback ? [] : filteredUniversal

  const plantDisplayName = plant?.nickname ?? plant?.plants?.common_name ?? 'Your plant'

  // ── Event handlers ──────────────────────────────────────────────────────────

  async function handleRemedyClick(remedy: PlantRemedy) {
    if (plant) {
      await onSelectIssue(remedy, plant)
    } else {
      setPendingRemedy(remedy)
      setShowPicker(true)
    }
  }

  async function handlePickPlant(chosen: UserPlant) {
    setShowPicker(false)
    if (!pendingRemedy) return
    await onSelectIssue(pendingRemedy, chosen)
    setPendingRemedy(null)
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">

      {/* ── Plant picker (overlaid inside modal when generic mode needs plant) ── */}
      {showPicker && (
        <div className="absolute inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                  Track Issue
                </p>
                <h3 className="text-lg font-black text-green-950 uppercase italic">
                  Which plant is affected?
                </h3>
              </div>
              <button
                onClick={() => { setShowPicker(false); setPendingRemedy(null) }}
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {ownedPlants.length === 0 ? (
                <p className="text-center text-[11px] text-gray-400 font-medium py-6 italic">
                  No plants in your garden yet. Add a plant first.
                </p>
              ) : (
                ownedPlants.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePickPlant(p)}
                    disabled={saving}
                    className="w-full flex items-center gap-3 p-4 rounded-[1.5rem] border border-gray-100 bg-gray-50/40 text-left active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    <PlantThumbnail plant={p.plants} size="sm" />
                    <span className="text-sm font-black text-green-950 uppercase">
                      {p.nickname ?? p.plants?.common_name ?? 'Unknown Plant'}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Main modal ───────────────────────────────────────────────────────── */}
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${isGeneric ? 'text-green-700' : 'text-red-400'}`}>
              {isGeneric ? 'Plant problem finder' : 'Plant is unhealthy'}
            </p>
            <h3 className="text-lg font-black text-green-950 uppercase italic">
              {isGeneric ? 'Diagnose a Problem' : plantDisplayName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* Search bar */}
          <div className="relative">
            <input
              autoFocus
              type="text"
              placeholder={
                isGeneric
                  ? 'Search symptoms, e.g. yellow leaves, white spots…'
                  : 'Search issue or symptom…'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-full px-5 py-4 pr-12 text-sm font-bold outline-none focus:border-orange-200 transition-colors"
            />
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
          </div>

          {/* Loading */}
          {loading ? (
            <div className="py-10 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
              Loading issues…
            </div>
          ) : (
            <>
              {/* Generic empty state — prompt to type */}
              {isGeneric && !hasQuery && (
                <p className="text-center text-[11px] text-gray-400 font-medium italic py-4 leading-relaxed">
                  Describe what you&apos;re seeing — e.g. &quot;yellow leaves&quot;, &quot;black spots&quot;, or &quot;drooping&quot;.
                </p>
              )}

              {/* Fallback banner — shown when search had no matches but plant issues exist */}
              {showingFallback && (
                <p className="text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 leading-relaxed">
                  No exact match for &ldquo;{searchQuery}&rdquo;. Showing common {plantDisplayName} issues.
                </p>
              )}

              {/* Plant-specific results */}
              {specificToShow.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em] px-1">
                    {showingFallback
                      ? `Common ${plant?.plants?.common_name ?? 'plant'} issues`
                      : `${plant?.plants?.common_name ?? 'Plant'} specific`}
                  </p>
                  {specificToShow.map((r) => (
                    <RemedyCard
                      key={r.id}
                      remedy={r}
                      onSelect={() => handleRemedyClick(r)}
                      saving={saving}
                    />
                  ))}
                </div>
              )}

              {/* Universal / general results (hidden when showing fallback) */}
              {universalToShow.length > 0 && (
                <div className="space-y-3 pt-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">
                    {specificToShow.length > 0 ? 'General issues' : 'Search results'}
                  </p>
                  {universalToShow.map((r) => (
                    <RemedyCard
                      key={r.id}
                      remedy={r}
                      onSelect={() => handleRemedyClick(r)}
                      saving={saving}
                    />
                  ))}
                </div>
              )}

              {/* No results — only reachable in generic mode or plant mode with no specific issues */}
              {hasQuery && !showingFallback && specificToShow.length === 0 && universalToShow.length === 0 && (
                <div className="py-8 space-y-3 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">
                    No matches found
                  </p>
                  {isGeneric && (
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                      Try a symptom like{' '}
                      {['yellow leaves', 'wilting', 'sticky leaves', 'spots', 'white powder'].map((s, i, arr) => (
                        <span key={s}>
                          <button
                            type="button"
                            onClick={() => setSearchQuery(s)}
                            className="underline underline-offset-2 text-green-700/70 active:text-green-900"
                          >
                            {s}
                          </button>
                          {i < arr.length - 1 ? ', ' : '.'}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Remedy card sub-component ─────────────────────────────────────────────────

function RemedyCard({
  remedy,
  onSelect,
  saving,
}: {
  remedy: PlantRemedy
  onSelect: () => void
  saving: boolean
}) {
  const displayTags = enrichShoppingForIssue({
    issue: remedy.issue_type,
    remedy: remedy.remedy_description ?? remedy.remedy_title,
    existing: remedy.shopping_tags ?? [],
  })

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={saving}
      className="w-full text-left p-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 active:scale-[0.98] transition-all disabled:opacity-50"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-black text-orange-800 uppercase tracking-tight">
            {remedy.issue_type}
          </p>
          {remedy.remedy_title && (
            <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mt-1">
              {remedy.remedy_title}
            </p>
          )}
          {remedy.remedy_description && (
            <p className="text-xs text-gray-600 italic leading-relaxed mt-2">
              {remedy.remedy_description}
            </p>
          )}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100"
                >
                  {prettySupplyTag(tag)}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest shrink-0">
          {saving ? '…' : 'Start Treatment'}
        </span>
      </div>
    </button>
  )
}
