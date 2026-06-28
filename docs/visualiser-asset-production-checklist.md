# Visualiser asset production checklist

Practical workflow derived from the [full coverage audit](./visualiser-asset-coverage.md).

**Source:** `src/lib/visualiser/visualiserAssetProductionChecklist.ts`  
**Regenerate:** `npx tsx scripts/generateProductionChecklist.ts`

Last generated: 2026-06-28

> **Do not wire assets until QA status is `approved`.** Gardenia and other pale-flower plants may require `manual_cutout_needed` before approval.

---

## Summary

| Metric | Count |
|--------|------:|
| Total production items | 56 |
| Batch 1 (highest launch value) | 13 |
| Batch 2 (soon after launch) | 15 |
| Batch 3 (later) | 28 |
| Manual cutout / pale flower track | 18 |
| Pale flower risk flagged | 18 |
| Visualise selector gaps | 3 |

---

## Source image rules (all assets)

- Full plant visible — whole plant inside frame
- Front-on or near front-on angle (not extreme top-down)
- No pot, no soil, no nursery label
- Muted grey-green background (not pure white)
- Strong edge contrast between foliage and background
- No flowers touching the image edge
- White/pale flowers: shoot warm cream tones OR use strong contrast against a non-white background
- Even lighting — avoid harsh backlight on pale petals
- Single specimen — no mixed planting in frame

---

## QA status workflow

| Status | Meaning |
|--------|---------|
| `needed` | Asset not started — add to production queue |
| `raw_created` | Source photo captured; not yet processed |
| `processed` | Background removed / PNG exported via process:plant-overlays |
| `approved` | Visual QA passed — acceptable for registry |
| `wired` | Registered in plantOverlayAssets.ts and live (do not wire until approved) |
| `rejected` | Cutout or form unsuitable — reshoot or manual fix required |
| `manual_cutout_needed` | Auto background removal failed — hand-mask in editor |

Typical flow: `needed` → `raw_created` → `processed` → `approved` → `wired`  
Pale flowers may branch to `manual_cutout_needed` before `approved`.

---

## Gardenia — manual cutout priority

### 1. Gardenia

| Field | Value |
|-------|-------|
| Scientific name | Gardeniat jasminoides |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `manual_cutout_needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | **HIGH** |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | Manual cutout needed |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white. GARDENIA: existing gardenia-v2.png failed auto cutout — reshoot with cream flowers on grey-green OR plan manual mask.

**Notes:** gardenia-v2.png on disk but NOT registered — auto cutout likely removes white flowers. Manual cutout or non-white source background required before wiring. Do NOT mark exact until QA passes. White/pale flowers may need manual cutout or a non-white source background.


**Action:** Do not register `gardenia-v2.png` until manual QA confirms white/cream flowers survive cutout.

---

## Batch 1 — Highest launch value

13 assets.

### 1. Agapanthus

| Field | Value |
|-------|-------|
| Scientific name | — |
| Visual form | `strappy_clump` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | Likely |
| Current fallback | `lomandra (/plant-overlays/lomandra.png)` |
| Flags | Visualise selector |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Show full clump including base; strap leaves radiating naturally. Include flower stems if species has them (e.g. Agapanthus). PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Visualise selector only — not in plantDatabaseCatalog.json export. lomandra overlay.

### 2. Phormium

| Field | Value |
|-------|-------|
| Scientific name | — |
| Visual form | `architectural_flax` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `flax (/plant-overlays/flax.png)` |
| Flags | Visualise selector |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Upright strap-leaf fan from base; show full height.

**Notes:** Visualise selector only — not in plantDatabaseCatalog.json export. flax overlay.

### 3. Pratia

| Field | Value |
|-------|-------|
| Scientific name | Pratia angulata |
| Visual form | `groundcover` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | Likely |
| Current fallback | `groundcover (/plant-overlays/groundcover.png)` |
| Flags | Visualise selector |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Low spreading mat; shoot from slight angle to show depth. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Shares groundcover.png. White flowers — manual cutout may be needed. White/pale flowers may need manual cutout or a non-white source background.

### 4. Fortnight Lily (Dietes)

| Field | Value |
|-------|-------|
| Scientific name | Dietes grandiflora |
| Visual form | `strappy_clump` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | Likely |
| Current fallback | `lomandra (/plant-overlays/lomandra.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Show full clump including base; strap leaves radiating naturally. Include flower stems if species has them (e.g. Agapanthus). PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Fortnight Lily (Dietes) shares lomandra.png. White flowers — distinct form from Lomandra. White/pale flowers may need manual cutout or a non-white source background.

### 5. Gardenia

| Field | Value |
|-------|-------|
| Scientific name | Gardeniat jasminoides |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `manual_cutout_needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | **HIGH** |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | Manual cutout needed |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white. GARDENIA: existing gardenia-v2.png failed auto cutout — reshoot with cream flowers on grey-green OR plan manual mask.

**Notes:** gardenia-v2.png on disk but NOT registered — auto cutout likely removes white flowers. Manual cutout or non-white source background required before wiring. Do NOT mark exact until QA passes. White/pale flowers may need manual cutout or a non-white source background.

### 6. Kentia Palm

| Field | Value |
|-------|-------|
| Scientific name | Howea forsteriana |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Kentia Palm — intent/palm rules may map to ponga/nikau; not all palms suit Nikau silhouette.

### 7. King Palm

| Field | Value |
|-------|-------|
| Scientific name | Archontophoenix |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** King Palm — shares palm/feature resolution; dedicated palm asset later.

### 8. Lavender

| Field | Value |
|-------|-------|
| Scientific name | Lavandula |
| Visual form | `rounded_evergreen_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `raw_created` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Compact evergreen shrub; show leaf texture — avoid overexposed highlights on fine leaves.

**Notes:** lavender white.png on disk, unregistered. Process and QA before registry.

### 9. Muehlenbeckia

| Field | Value |
|-------|-------|
| Scientific name | Muehlenbeckia complexa |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `groundcover (/plant-overlays/groundcover.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Muehlenbeckia shares groundcover.png.

### 10. Sago Palm

| Field | Value |
|-------|-------|
| Scientific name | Cycas revoluta |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Sago Palm — palm-like; may share nikau/ponga intent asset.

### 11. Silver Flax (Astelia)

| Field | Value |
|-------|-------|
| Scientific name | Astelia Silver |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `flax (/plant-overlays/flax.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Silver Flax (Astelia) shares flax.png.

### 12. Sugar Cane Palm

| Field | Value |
|-------|-------|
| Scientific name | Dypsis baronii |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | close_shared_asset_ok |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Sugar Cane Palm — palm silhouette share.

### 13. Titoki

| Field | Value |
|-------|-------|
| Scientific name | Alectryon excelsus |
| Visual form | `small_tree` |
| Asset type | **row** |
| Classification | temporary_fallback_only |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `hedge (/plant-overlays/hedge-section.svg)` |
| Flags | Row mode |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Small tree with visible trunk base to first branches.

**Notes:** Row mode only. Uses generic hedge-section.svg — replace with Titoki native screen PNG.



## Batch 2 — Soon after launch

15 assets.

### 1. Hellebore (Winter Rose)

| Field | Value |
|-------|-------|
| Scientific name | Helleborus x hybridus |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | Likely |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Hellebore — white/cream flowers; low perennial. White/pale flowers may need manual cutout or a non-white source background.

### 2. Hibiscus

| Field | Value |
|-------|-------|
| Scientific name | Hibiscus rosa-sinensis |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Hibiscus — subtropical shrub; no overlay.

### 3. Kōwhai

| Field | Value |
|-------|-------|
| Scientific name | Sophora chathamica |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Kōwhai — native feature tree; needs dedicated asset.

### 4. Ligustrum

| Field | Value |
|-------|-------|
| Scientific name | Ligustrum rotundifolium |
| Visual form | `hedge_screen` |
| Asset type | **row** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | Likely |
| Current fallback | `hedge (/plant-overlays/hedge-section.svg)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Horizontal hedge section or pleached screen segment; dense foliage wall, flat face to camera. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Ligustrum hedge — white flower spikes; needs hedge PNG. White/pale flowers may need manual cutout or a non-white source background.

### 5. Manuka

| Field | Value |
|-------|-------|
| Scientific name | Leptospermum scoparium |
| Visual form | `rounded_evergreen_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | Likely |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Compact evergreen shrub; show leaf texture — avoid overexposed highlights on fine leaves. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Manuka (Leptospermum) — fine-textured native shrub. White/pale flowers may need manual cutout or a non-white source background.

### 6. Michelia Bubbles

| Field | Value |
|-------|-------|
| Scientific name | Michelia figo x |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | Likely |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Michelia Bubbles — white flowers; manual cutout likely. White/pale flowers may need manual cutout or a non-white source background.

### 7. Murraya

| Field | Value |
|-------|-------|
| Scientific name | Murraya paniculata |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **row** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `hedge (/plant-overlays/hedge-section.svg)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame.

**Notes:** Murraya hedge — no dedicated PNG.

### 8. Olive Tree

| Field | Value |
|-------|-------|
| Scientific name | Olea europaea |
| Visual form | `small_tree` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Small tree with visible trunk base to first branches.

**Notes:** Olive — silvery tree/shrub; no overlay.

### 9. Pittosporum

| Field | Value |
|-------|-------|
| Scientific name | Pittosporum tenuifolium |
| Visual form | `hedge_screen` |
| Asset type | **row** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `hedge (/plant-overlays/hedge-section.svg)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Horizontal hedge section or pleached screen segment; dense foliage wall, flat face to camera.

**Notes:** Pittosporum hedge — common NZ screen; needs dedicated PNG.

### 10. Pohutukawa

| Field | Value |
|-------|-------|
| Scientific name | Metrosideros excelsa |
| Visual form | `feature_tree` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Specimen tree — trunk and canopy; may need wider frame.

**Notes:** Large coastal tree — poor fit for spot overlay scale without dedicated asset.

### 11. Port Wine Magnolia

| Field | Value |
|-------|-------|
| Scientific name | Michelia figo |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **row** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | None |
| Current fallback | `hedge (/plant-overlays/hedge-section.svg)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Port Wine Magnolia hedge — no overlay. White/pale flowers may need manual cutout or a non-white source background.

### 12. Rhododendron

| Field | Value |
|-------|-------|
| Scientific name | Rhododendron |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame.

**Notes:** Rhododendron shrub — no species rule.

### 13. Rhododendron Vireya

| Field | Value |
|-------|-------|
| Scientific name | Rhododendron vireya |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame.

**Notes:** Vireya rhododendron — no species rule.

### 14. Rose

| Field | Value |
|-------|-------|
| Scientific name | Rosa spp. |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame.

**Notes:** Rose — cottage shrub; no overlay.

### 15. Westringia

| Field | Value |
|-------|-------|
| Scientific name | Westringia fruticosa |
| Visual form | `rounded_evergreen_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | Likely |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Compact evergreen shrub; show leaf texture — avoid overexposed highlights on fine leaves. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Westringia — white flowers; coastal shrub overlay. White/pale flowers may need manual cutout or a non-white source background.



## Batch 3 — Later

28 assets.

### 1. Ficus Pumila

| Field | Value |
|-------|-------|
| Scientific name | Ficus pumila |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `star-jasmine (/plant-overlays/star-jasmine.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Ficus Pumila — held; ficus pumilia.png cutout too transparent/weak for production.

### 2. Forest Pansy

| Field | Value |
|-------|-------|
| Scientific name | Cercis chinensis |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Forest Pansy — small tree.

### 3. Foxtail Agave

| Field | Value |
|-------|-------|
| Scientific name | Agave attenuata |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `lomandra (/plant-overlays/lomandra.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Foxtail Agave — succulent rosette; no overlay.

### 4. Hardenbergia

| Field | Value |
|-------|-------|
| Scientific name | Hardenbergia violacea |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `star-jasmine (/plant-overlays/star-jasmine.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Hardenbergia — climber; no overlay.

### 5. Hen and Chicken Fern

| Field | Value |
|-------|-------|
| Scientific name | Asplenium bulbiferum |
| Visual form | `fern` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Fronds arching from crown; soft edges need strong background contrast.

**Notes:** Hen and Chicken Fern — ground fern; not tree-fern scale.

### 6. Iresine

| Field | Value |
|-------|-------|
| Scientific name | Iresine herbstii |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Iresine — colourful foliage perennial; low priority.

### 7. Japanese Maple

| Field | Value |
|-------|-------|
| Scientific name | Acer palmatum |
| Visual form | `small_tree` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Small tree with visible trunk base to first branches.

**Notes:** Japanese Maple — deciduous feature; large tree overlay.

### 8. Lemon Tree

| Field | Value |
|-------|-------|
| Scientific name | Citrus limon |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | None |
| Current fallback | `lomandra (/plant-overlays/lomandra.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Citrus — tree overlay needed. White/pale flowers may need manual cutout or a non-white source background.

### 9. Lime Tree

| Field | Value |
|-------|-------|
| Scientific name | Citrus aurantiifolia |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | None |
| Current fallback | `lomandra (/plant-overlays/lomandra.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Citrus — tree overlay needed. White/pale flowers may need manual cutout or a non-white source background.

### 10. Magnolia (Deciduous)

| Field | Value |
|-------|-------|
| Scientific name | Magnolia grandiflora |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Deciduous magnolia — large tree overlay. White/pale flowers may need manual cutout or a non-white source background.

### 11. Magnolia (Evergreen)

| Field | Value |
|-------|-------|
| Scientific name | Magnolia grandiflora |
| Visual form | `rounded_flowering_shrub` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Evergreen magnolia — large tree overlay. White/pale flowers may need manual cutout or a non-white source background.

### 12. Mandarin Tree

| Field | Value |
|-------|-------|
| Scientific name | Citrus reticulata |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | None |
| Current fallback | `lomandra (/plant-overlays/lomandra.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Citrus — tree overlay needed. White/pale flowers may need manual cutout or a non-white source background.

### 13. Meyer Lemon

| Field | Value |
|-------|-------|
| Scientific name | Citrus x meyeri |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `raw_created` |
| Pale flower risk | **Yes** |
| Manual cutout risk | None |
| Current fallback | `lomandra (/plant-overlays/lomandra.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** lemon white.png on disk, unregistered. Citrus tree-scale overlay needed. White/pale flowers may need manual cutout or a non-white source background.

### 14. Mondo Grass

| Field | Value |
|-------|-------|
| Scientific name | Ophiopogon japonicus |
| Visual form | `strappy_clump` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `groundcover (/plant-overlays/groundcover.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Show full clump including base; strap leaves radiating naturally. Include flower stems if species has them (e.g. Agapanthus).

**Notes:** Mondo Grass — too low for spot overlay.

### 15. Orange Trumpet Vine

| Field | Value |
|-------|-------|
| Scientific name | Pyrostegia venusta |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `star-jasmine (/plant-overlays/star-jasmine.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Orange Trumpet Vine — climber; no overlay.

### 16. Pink Rhaphiolepis

| Field | Value |
|-------|-------|
| Scientific name | Rhaphiolepis indica |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Pink Rhaphiolepis — shrub; no overlay.

### 17. Pūriri

| Field | Value |
|-------|-------|
| Scientific name | Vitex lucens |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Large native tree — defer dedicated asset.

### 18. Rain Lily

| Field | Value |
|-------|-------|
| Scientific name | Zephyranthes |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Rain Lily — small bulb; poor overlay scale.

### 19. Redbud

| Field | Value |
|-------|-------|
| Scientific name | Cercis canadensis |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Redbud — small flowering tree. White/pale flowers may need manual cutout or a non-white source background.

### 20. Silver Bush

| Field | Value |
|-------|-------|
| Scientific name | Convolvulus cneorum |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | **Yes** |
| Manual cutout risk | Likely |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay. PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.

**Notes:** Silver Bush — white flowers; low shrub. White/pale flowers may need manual cutout or a non-white source background.

### 21. Silver Falls

| Field | Value |
|-------|-------|
| Scientific name | Dichondra argentea |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `groundcover (/plant-overlays/groundcover.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Silver Falls — trailing groundcover; poor overlay scale.

### 22. Silver Lady Fern

| Field | Value |
|-------|-------|
| Scientific name | Blechnum gibbum |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Silver Lady Fern — shade fern; no overlay.

### 23. Smoke Bush

| Field | Value |
|-------|-------|
| Scientific name | Cotinus coggygria |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `nikau (/plant-overlays/nikau.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Smoke Bush — large shrub/small tree.

### 24. Spanish Shawl

| Field | Value |
|-------|-------|
| Scientific name | Heterocentron elegans |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `groundcover (/plant-overlays/groundcover.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Spanish Shawl — groundcover; low priority.

### 25. Tecomanthe

| Field | Value |
|-------|-------|
| Scientific name | Tecomanthe speciosa |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `star-jasmine (/plant-overlays/star-jasmine.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Tecomanthe — native climber; no overlay.

### 26. Tractor Seat Plant

| Field | Value |
|-------|-------|
| Scientific name | Ligularia reniformis |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Tractor Seat — bold leaf perennial; low overlay priority.

### 27. Virginia Creeper

| Field | Value |
|-------|-------|
| Scientific name | Parthenocissus quinquefolia |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `star-jasmine (/plant-overlays/star-jasmine.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Virginia Creeper — climber; no overlay.

### 28. Xanadu

| Field | Value |
|-------|-------|
| Scientific name | Philodendron Xanadu |
| Visual form | `unknown` |
| Asset type | **spot** |
| Classification | needs_new_asset |
| QA status | `needed` |
| Pale flower risk | No |
| Manual cutout risk | None |
| Current fallback | `camellia (/plant-overlays/camellia.png)` |
| Flags | — |

**Source image guidance:** Full plant visible — whole plant inside frame; Front-on or near front-on angle (not extreme top-down); No pot, no soil, no nursery label; Muted grey-green background (not pure white); Strong edge contrast between foliage and background; No flowers touching the image edge. Match natural garden scale for spot overlay.

**Notes:** Philodendron Xanadu — subtropical clump; no overlay.



---

## Manual cutout / pale flower risk track

Plants requiring extra care when shooting or processing (18 items). Many also appear in batches above.

| Plant | Batch | Cutout risk | Pale flowers | QA status | Fallback key |
|-------|------:|-------------|--------------|-----------|--------------|
| Agapanthus | 1 | likely | Yes | `needed` | `lomandra` |
| Pratia | 1 | likely | Yes | `needed` | `groundcover` |
| Fortnight Lily (Dietes) | 1 | likely | Yes | `needed` | `lomandra` |
| Gardenia | 1 | high | Yes | `manual_cutout_needed` | `camellia` |
| Hellebore (Winter Rose) | 2 | likely | Yes | `needed` | `camellia` |
| Ligustrum | 2 | likely | Yes | `needed` | `hedge` |
| Manuka | 2 | likely | Yes | `needed` | `camellia` |
| Michelia Bubbles | 2 | likely | Yes | `needed` | `camellia` |
| Port Wine Magnolia | 2 | none | Yes | `needed` | `hedge` |
| Westringia | 2 | likely | Yes | `needed` | `camellia` |
| Lemon Tree | 3 | none | Yes | `needed` | `lomandra` |
| Lime Tree | 3 | none | Yes | `needed` | `lomandra` |
| Magnolia (Deciduous) | 3 | none | Yes | `needed` | `nikau` |
| Magnolia (Evergreen) | 3 | none | Yes | `needed` | `nikau` |
| Mandarin Tree | 3 | none | Yes | `needed` | `lomandra` |
| Meyer Lemon | 3 | none | Yes | `raw_created` | `lomandra` |
| Redbud | 3 | none | Yes | `needed` | `nikau` |
| Silver Bush | 3 | likely | Yes | `needed` | `camellia` |

---

## Row mode reminder

Row mode remains **hedge/screen PNG assets only** (Griselinia, Ficus Tuffy, Buxus, Titoki). Do not add strappy plants (Lomandra, Agapanthus, flax) to row mode when wiring new assets.

---

## Maintenance

1. Refresh plant catalog: `npm run export:plant-catalog`
2. Regenerate coverage doc: `npx tsx scripts/generateCoverageMarkdown.ts`
3. Regenerate this checklist: `npx tsx scripts/generateProductionChecklist.ts`
4. After creating assets: run `npm run process:plant-overlays`, then `npm run validate:overlay-paths`
5. Only wire to `plantOverlayAssets.ts` when QA is `approved` (separate task)

## Related files

- `src/lib/visualiser/visualiserAssetCoverage.ts` — full 120-plant audit
- `src/lib/visualIdeas/plantOverlayAssets.ts` — runtime registry (do not change in production pass)
- `src/lib/visualIdeas/plantVisualForms.ts` — visual form labels
- `public/plant-overlays/` — overlay files
