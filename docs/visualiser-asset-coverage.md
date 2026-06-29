# Visualiser plant overlay — asset coverage report

Developer-facing audit for Pocket Gardener's photo overlay visualiser.

**Source of truth:** `src/lib/visualiser/visualiserAssetCoverage.ts` (built from `plantDatabaseCatalog.json`)

Last generated: 2026-06-29

Refresh plant list: `npm run export:plant-catalog` (requires Supabase env)  
Validate overlay paths: `npm run validate:overlay-paths`

---

## Why the prior audit showed 51 rows

The first coverage pass (51 rows) was a **curated subset**: Visualise selector plants, row-mode hedges, suggest-engine names, and style-tag seed patterns — not the full Supabase `plants` table.

This report covers **all 120 plants** in the Plant Library database export, plus 2 Visualise-selector-only entries not present under matching DB names (e.g. Agapanthus, Phormium).

Runtime resolution is unchanged — `resolveOverlayAsset()` in `plantOverlayAssets.ts`.

---

## Summary (full database)

| Metric | Count |
|--------|------:|
| **Total plants in database** | 120 |
| **Visualiser-relevant** | 116 |
| **Exact asset ready** | 102 |
| **Close shared asset OK** | 4 |
| **Temporary fallback only** | 1 |
| **Needs new asset** | 9 |
| **Not visualiser relevant** | 4 |
| **High manual cutout risk** | 1 |
| **White/pale flower risk flagged** | 45 |
| **Broken registry paths** | 0 |
| **Registered overlay keys** | 110 |

### Visualise selector (spot mode)

101 plants in `PREVIEW_PLANT_OPTIONS` — all resolve to approved PNG keys (no broken paths in chooser).

### Row mode (hedge/screen only)

Allowed: Griselinia Hedge, Ficus Tuffy Hedge, Buxus Hedge, Titoki, Camellia Hedge, Corokia Geentys Green Hedge, Corokia Virgata Hedge, Eugenia

Excluded examples (must NOT be added): Lomandra, Agapanthus, NZ Flax, Phormium, Clivia, Fortnight Lily (Dietes)

---

## Asset production roadmap

### Launch priority

- Ake-Ake
- Apple Tree
- Avocado
- Begonia
- Bird Of Paradise
- Blueberry
- Boston Ivy
- Bottlebrush
- Box Elder
- Bromeliad
- Buxus (Box Hedge)
- Cabbage Tree
- Camellia
- Canna Lily
- Cherry Tree
- Clivia
- Cordyline Stricta
- Corokia Geentys Green
- Corokia Virgata
- Crepe Myrtle
- Dogwood
- English Holly
- English Oak
- Erman's Birch
- Escallonia
- Eugenia
- European Beech
- European Hornbeam
- Evergreen Ash
- Feijoa
- Ficus Tuffi
- Flame Tree
- Flax Lily
- Forest Pansy
- Fortnight Lily (Dietes)
- Foxtail Agave
- Gardenia
- Griselinia
- Hardenbergia
- Hebe (Koromiko)
- Hellebore (Winter Rose)
- Hen and Chicken Fern
- Hibiscus
- Himalayan Birch
- Hydrangea
- Iresine
- Japanese Box
- Japanese Maple
- Kahikatea
- Karaka
- Kauri
- Kentia Palm
- King Palm
- Kohekohe
- Kōwhai
- Lacebark
- Lancewood
- Lavender
- Lemon Tree
- Ligustrum
- Lime Tree
- Liriope (Lilyturf)
- Lomandra
- London Plane Tree
- Magnolia (Deciduous)
- Magnolia (Evergreen)
- Mandarin Tree
- Manuka
- Mexican Alder
- Meyer Lemon
- Michelia Bubbles
- Mirror Bush
- Mondo Grass
- Monstera (Swiss Cheese Plant)
- Monterey Cypress
- Muehlenbeckia
- Murraya
- Nikau Palm
- Norfolk Island Pine
- NZ Flax
- Olive Tree
- Orange Trumpet Vine
- Peach Tree
- Pink Rhaphiolepis
- Pittosporum
- Pohutukawa
- Ponga Fern
- Port Wine Magnolia
- Pūriri
- Putaputawētā
- Rain Lily
- Redbud
- Renga Renga Lily
- Rewarewa
- Rhododendron
- Rhododendron Vireya
- Rose
- Sago Palm
- Serviceberry
- Silk Tree
- Silver Bush
- Silver Falls
- Star Jasmine

### Soon after launch

- Pratia — Shares groundcover
- Silver Flax (Astelia) — Silver Flax (Astelia) shares flax
- Sugar Cane Palm — Sugar Cane Palm — palm silhouette share
- Titoki — Row mode only

### Later

- Ficus Pumila
- Silver Lady Fern
- Smoke Bush
- Spanish Shawl
- Tecomanthe
- Tractor Seat Plant
- Virginia Creeper
- Westringia
- Xanadu

### Manual cutout likely / high

- Corokia Geentys Green (likely)
- Corokia Virgata (likely)
- Escallonia (likely, pale flowers)
- Eugenia (likely, pale flowers)
- Fortnight Lily (Dietes) (likely, pale flowers)
- Gardenia (high, pale flowers)
- Hellebore (Winter Rose) (likely, pale flowers)
- Ligustrum (likely, pale flowers)
- Manuka (likely, pale flowers)
- Michelia Bubbles (likely, pale flowers)
- Pratia (likely, pale flowers)
- Renga Renga Lily (likely, pale flowers)
- Silver Bush (likely, pale flowers)
- Star Jasmine (likely, pale flowers)
- Westringia (likely, pale flowers)

**Note:** White/pale flowers may need manual cutout or a non-white source background.

### Gardenia status

Gardenia is **needs_new_asset** (not exact_asset_ready). `gardenia-v2.png` exists on disk but is unwired — auto background removal likely removes white flowers. Do not register until manual QA passes.

---

## Unwired disk assets

- `/plant-overlays/gardenia-v2.png`
- `/plant-overlays/Gardenia white.png`
- `/plant-overlays/lavender white.png`
- `/plant-overlays/lemon white.png`
- `/plant-overlays/griselinia.png`
- `/plant-overlays/buxus-hedge-v2.png`
- `/plant-overlays/ficus tuffi.png`
- `/plant-overlays/Buxus ball white.png`
- `/plant-overlays/Buxus white.png`
- `/plant-overlays/Hydrangea white.png`
- `/plant-overlays/Nikau white.png`
- `/plant-overlays/Flax white.png`
- `/plant-overlays/hebe white.png`
- `/plant-overlays/clivia white.png`
- `/plant-overlays/groundcover white.png`
- `/plant-overlays/ponga white.png`
- `/plant-overlays/renga renga white.png`
- `/plant-overlays/star jasmine white.png`
- `/plant-overlays/birds of paradies white.png`

---

## Full per-plant coverage (120 database plants)

| Plant | Scientific name | Type | Asset key | Classification | Priority | Cutout risk | Pale flowers | Notes |
|-------|-----------------|------|-----------|----------------|----------|-------------|--------------|-------|
| Ake-Ake | Dodonaea viscosa | Tree | ake-ake | exact_asset_ready | launch | none | — | Dedicated ake-ake.png overlay. |
| Apple Tree | Malus domestica | Fruit | apple-tree | exact_asset_ready | launch | none | Yes | Dedicated apple-tree.png overlay. White/pale flowers may need manual cutout or a non-white source background. |
| Avocado | Persea americana | Fruit | avocado | exact_asset_ready | launch | none | — | Dedicated avocado.png overlay. |
| Begonia | Begonia x semperflorens | Flower | begonia | exact_asset_ready | launch | none | — | Dedicated begonia.png overlay. |
| Bird Of Paradise | Strelitzia reginae | Flower | bird-of-paradise | exact_asset_ready | launch | none | — | Dedicated bird-of-paradise.png. |
| Blueberry | Vaccinium | Fruit | blueberry | exact_asset_ready | launch | none | Yes | Dedicated blueberry.png overlay. White/pale flowers may need manual cutout or a non-white source background. |
| Boston Ivy | Parthenocissus tricuspidata | Climber | boston-ivy | exact_asset_ready | launch | none | — | Dedicated boston-ivy.png overlay. |
| Bottlebrush | Callistemon | Shrub | bottlebrush | exact_asset_ready | launch | none | — | Dedicated bottlebrush.png overlay. |
| Box Elder | Acer negundo | Tree | box-elder | exact_asset_ready | launch | none | Yes | Dedicated box-elder.png overlay. White/pale flowers may need manual cutout or a non-white source background. |
| Bromeliad | Alcantarea imperialis | Shrub | bromeliad | exact_asset_ready | launch | none | — | Dedicated bromeliad.png overlay. |
| Buxus (Box Hedge) | Buxus sempervirens | Hedge | buxus-hedge | exact_asset_ready | launch | none | — | Maps to buxus-hedge.png. Row mode + spot hedge rule. |
| Cabbage Tree | Cordyline australis | Tree | cabbage-tree | exact_asset_ready | launch | none | Yes | Dedicated cabbage-tree.png overlay. White/pale flowers may need manual cutout or a non-white source background. |
| Camellia | Camellia japonica | Shrub | camellia | exact_asset_ready | launch | none | — | Spot: camellia.png. Row: camellia-hedge.png via Camellia Hedge row option. |
| Canna Lily | Canna indica | Perennial | canna-lily | exact_asset_ready | launch | none | — | Dedicated canna-lily.png overlay. |
| Cherry Tree | — | Tree | cherry-tree | exact_asset_ready | launch | none | — | Dedicated cherry-tree.png overlay. |
| Clivia | Clivia miniata | Flower | clivia | exact_asset_ready | launch | none | — | Dedicated clivia.png. |
| Cordyline Stricta | Cordyline stricta | Perennial | cordyline-stricta | exact_asset_ready | launch | none | — | Dedicated cordyline-stricta.png overlay. |
| Corokia Geentys Green | Corokia cotoneaster | Hedge | corokia-geentys-green | exact_asset_ready | launch | likely | — | Spot: corokia-geentys-green.png. Row: corokia-geentys-green-hedge.png. |
| Corokia Virgata | Corokia virgata | Hedge / Shrub | corokia-virgata | exact_asset_ready | launch | likely | — | Spot: corokia-virgata.png. Row: corokia-virgata-hedge.png. |
| Crepe Myrtle | Lagerstroemia indica | Tree / Shrub | crepe-myrtle | exact_asset_ready | launch | none | — | Dedicated crepe-myrtle.png overlay. |
| Dogwood | Cornus florida | Tree | dogwood | exact_asset_ready | launch | none | Yes | Dedicated dogwood.png overlay. White/pale flowers may need manual cutout or a non-white source background. |
| English Holly | Ilex aquifolium | Tree / Hedge | english-holly | exact_asset_ready | launch | none | — | Dedicated english-holly.png overlay. |
| English Oak | Quercus robur | Tree | oak | exact_asset_ready | launch | none | Yes | Dedicated oak.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Erman's Birch | Betula ermanii | Tree | birch | exact_asset_ready | launch | none | Yes | Dedicated birch.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Escallonia | Escallonia exoniensis | Hedge | escallonia | exact_asset_ready | launch | likely | Yes | Dedicated escallonia.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Eugenia | Eugenia | Hedge | eugenia | exact_asset_ready | launch | likely | Yes | Dedicated eugenia.png hedge row overlay — row mode only. White/pale flowers may need manual cutout or a non-white source background. |
| European Beech | Fagus sylvatica | Tree | european-beech | exact_asset_ready | launch | none | Yes | Dedicated european-beech.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| European Hornbeam | Carpinus betulus | Tree / Hedge | european-hornbeam | exact_asset_ready | launch | none | Yes | Dedicated european-hornbeam.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Evergreen Ash | Fraxinus griffithii | Tree | evergreen-ash | exact_asset_ready | launch | none | — | Dedicated evergreen-ash.png overlay — spot mode only. |
| Feijoa | Acca sellowiana | Fruit | feijoa | exact_asset_ready | launch | none | — | Dedicated feijoa.png overlay — spot mode only. |
| Ficus Pumila | Ficus pumila | Climber | star-jasmine | needs_new_asset | later | none | — | Ficus Pumila — held; ficus pumilia.png cutout too transparent/weak for production. |
| Ficus Tuffi | Ficus Tuffi | Hedge | ficus-tuffy-hedge | exact_asset_ready | launch | none | — | Maps to ficus-tuffy-hedge.png. Row mode + spot hedge rule. |
| Flame Tree | Brachychiton acerifolia | Tree | flame-tree | exact_asset_ready | launch | none | Yes | Dedicated flame-tree.png overlay. White/pale flowers may need manual cutout or a non-white source background. |
| Flax Lily | Dianella | Shrub | flax-lily | exact_asset_ready | launch | none | — | Dedicated flax-lily.png overlay (Dianella). |
| Forest Pansy | Cercis chinensis | Tree | forest-pansy | exact_asset_ready | launch | none | — | Dedicated forest-pansy.png overlay. |
| Fortnight Lily (Dietes) | Dietes grandiflora | Flower | fortnight-lily | exact_asset_ready | launch | likely | Yes | Dedicated fortnight-lily.png overlay. White flowers passed QA. White/pale flowers may need manual cutout or a non-white source background. |
| Foxtail Agave | Agave attenuata | Succulent | foxtail-agave | exact_asset_ready | launch | none | — | Dedicated foxtail-agave.png overlay. |
| Gardenia | Gardeniat jasminoides | Flower | gardenia | exact_asset_ready | launch | high | Yes | Dedicated gardenia.png overlay — spot mode only. Manual cutout QA passed. White/pale flowers may need manual cutout or a non-white source background. |
| Griselinia | Griselinia littoralis | Hedge | griselinia-hedge | exact_asset_ready | launch | none | — | Maps to griselinia-hedge.png. Row mode + spot hedge rule. |
| Hardenbergia | Hardenbergia violacea | Climber | hardenbergia | exact_asset_ready | launch | none | — | Dedicated hardenbergia.png overlay. |
| Hebe (Koromiko) | Hebe koromiko | Shrub | hebe | exact_asset_ready | launch | none | — | Dedicated hebe.png. |
| Hellebore (Winter Rose) | Helleborus x hybridus | Perennial | hellebore | exact_asset_ready | launch | likely | Yes | Dedicated hellebore.png overlay. White/cream flowers passed QA. White/pale flowers may need manual cutout or a non-white source background. |
| Hen and Chicken Fern | Asplenium bulbiferum | Fern | hen-and-chicken-fern | exact_asset_ready | launch | none | — | Dedicated hen-and-chicken-fern.png overlay. |
| Hibiscus | Hibiscus rosa-sinensis | Shrub | hibiscus | exact_asset_ready | launch | none | — | Dedicated hibiscus.png overlay. |
| Himalayan Birch | Betula utilis | Tree | himalayan-birch | exact_asset_ready | launch | none | Yes | Dedicated himalayan-birch.png overlay — distinct from Erman's Birch (birch.png). White/pale flowers may need manual cutout or a non-white source background. |
| Hydrangea | Hydrangea macrophylla | Shrub | hydrangea | exact_asset_ready | launch | none | — | Dedicated hydrangea.png. |
| Iresine | Iresine herbstii | Perennial | iresine | exact_asset_ready | launch | none | — | Dedicated iresine.png overlay — spot mode only. |
| Japanese Box | Buxus microphylla | Hedge / Shrub | hedge | exact_asset_ready | launch | none | — | Japanese Box → buxus-hedge.png via species rule. |
| Japanese Maple | Acer palmatum | Tree | japanese-maple | exact_asset_ready | launch | none | — | Dedicated japanese-maple.png overlay — spot mode only. |
| Kahikatea | Dacrycarpus | Tree | kahikatea | exact_asset_ready | launch | none | — | Dedicated kahikatea.png overlay — spot mode only. |
| Karaka | Corynocarpus laevigatus | Tree | karaka | exact_asset_ready | launch | none | — | Dedicated karaka.png overlay — spot mode only. |
| Kauri | Agathis australis | Tree | kauri | exact_asset_ready | launch | none | — | Dedicated kauri.png overlay — spot mode only. |
| Kentia Palm | Howea forsteriana | Palm | kentia-palm | exact_asset_ready | launch | none | — | Dedicated kentia-palm.png overlay — spot mode only. |
| King Palm | Archontophoenix | Palm | king-palm | exact_asset_ready | launch | none | — | Dedicated king-palm.png overlay — spot mode only. |
| Kohekohe | Dysoxylum spectabile | Tree | kohekohe | exact_asset_ready | launch | none | — | Dedicated kohekohe.png overlay — spot mode only. |
| Kōwhai | Sophora chathamica | Tree | kowhai | exact_asset_ready | launch | none | — | Dedicated kowhai.png overlay — spot mode only. |
| Lacebark | Hoheria populnea | Tree | lacebark | exact_asset_ready | launch | none | Yes | Dedicated lacebark.png overlay (Hoheria) — spot mode only. Pale flowers passed QA. White/pale flowers may need manual cutout or a non-white source background. |
| Lancewood | Pseudopanax crassifolius | Tree | lancewood | exact_asset_ready | launch | none | — | Dedicated lancewood.png overlay — spot mode only. |
| Lavender | Lavandula | Shrub | lavender | exact_asset_ready | launch | none | — | Dedicated lavender.png overlay — spot mode only. |
| Lemon Tree | Citrus limon | Fruit | lemon | exact_asset_ready | launch | none | Yes | Dedicated lemon.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Ligustrum | Ligustrum rotundifolium | Hedge | ligustrum | exact_asset_ready | launch | likely | Yes | Dedicated ligustrum.png overlay — spot shrub specimen only, not row mode. White/pale flowers may need manual cutout or a non-white source background. |
| Lime Tree | Citrus aurantiifolia | Fruit | lime-tree | exact_asset_ready | launch | none | Yes | Dedicated lime-tree.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Liriope (Lilyturf) | Liriope muscari | Groundcover / Grass | liriope | exact_asset_ready | launch | none | — | Dedicated liriope.png overlay — spot mode only. |
| Lomandra | Lomandra Tanika | Shrub | lomandra | exact_asset_ready | launch | none | Yes | Dedicated lomandra.png (large file — consider resize). Small white flower spikes — monitor cutout quality. White/pale flowers may need manual cutout or a non-white source background. |
| London Plane Tree | Platanus orientalis | Tree | london-plane-tree | exact_asset_ready | launch | none | Yes | Dedicated london-plane-tree.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Magnolia (Deciduous) | Magnolia grandiflora | Tree | magnolia-deciduous | exact_asset_ready | launch | none | Yes | Dedicated magnolia-deciduous.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Magnolia (Evergreen) | Magnolia grandiflora | Tree | magnolia-evergreen | exact_asset_ready | launch | none | Yes | Dedicated magnolia-evergreen.png overlay — spot mode only. Cream flowers passed QA. White/pale flowers may need manual cutout or a non-white source background. |
| Mandarin Tree | Citrus reticulata | Fruit | mandarin-tree | exact_asset_ready | launch | none | Yes | Dedicated mandarin-tree.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Manuka | Leptospermum scoparium | Shrub | manuka | exact_asset_ready | launch | likely | Yes | Dedicated manuka.png overlay — spot mode only. Latest replacement with denser foliage; pink flowers passed QA. White/pale flowers may need manual cutout or a non-white source background. |
| Mexican Alder | Alnus jorullensis | Tree | mexican-alder | exact_asset_ready | launch | none | Yes | Dedicated mexican-alder.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Meyer Lemon | Citrus x meyeri | Fruit | lemon | exact_asset_ready | launch | none | Yes | Reuses lemon.png via Meyer Lemon species rule (same asset as Lemon Tree). Spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Michelia Bubbles | Michelia figo x | Shrub | michelia-bubbles | exact_asset_ready | launch | likely | Yes | Dedicated michelia-bubbles.png overlay — spot mode only. Cream flowers passed QA. White/pale flowers may need manual cutout or a non-white source background. |
| Mirror Bush | Coprosma repens | Shrub | mirror-bush | exact_asset_ready | launch | none | — | Dedicated mirror-bush.png overlay — spot mode only. |
| Mondo Grass | Ophiopogon japonicus | Groundcover | mondo-grass | exact_asset_ready | launch | none | — | Dedicated mondo-grass.png overlay — spot mode only. |
| Monstera (Swiss Cheese Plant) | Monstera deliciosa | Indoor / Tropical | monstera | exact_asset_ready | launch | none | — | Dedicated monstera.png overlay — spot mode only. |
| Monterey Cypress | Cupressus macrocarpa | Tree | monterey-cypress | exact_asset_ready | launch | none | Yes | Dedicated monterey-cypress.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Muehlenbeckia | Muehlenbeckia complexa | Groundcover | muehlenbeckia | exact_asset_ready | launch | none | — | Dedicated muehlenbeckia.png overlay — spot mode only. |
| Murraya | Murraya paniculata | Hedge | murraya | exact_asset_ready | launch | none | Yes | Dedicated murraya.png overlay — spot shrub specimen only, not row mode. White/pale flowers may need manual cutout or a non-white source background. |
| Nikau Palm | Palm | Palm | nikau | exact_asset_ready | launch | none | — | Dedicated nikau.png. |
| Norfolk Island Pine | Araucaria heterophylla | Tree | norfolk-island-pine | exact_asset_ready | launch | none | Yes | Dedicated norfolk-island-pine.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| NZ Flax | Phormium tenax | Flax | flax | close_shared_asset_ok | launch | none | — | Shares flax.png — same strappy form family. |
| Olive Tree | Olea europaea | Shrub | olive-tree | exact_asset_ready | launch | none | — | Dedicated olive-tree.png overlay — spot mode only. |
| Orange Trumpet Vine | Pyrostegia venusta | Climber | orange-trumpet-vine | exact_asset_ready | launch | none | — | Dedicated orange-trumpet-vine.png overlay — spot climber specimen only. |
| Peach Tree | Prunus persica | Fruit | peach-tree | exact_asset_ready | launch | none | Yes | Dedicated peach-tree.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Pink Rhaphiolepis | Rhaphiolepis indica | Shrub | pink-rhaphiolepis | exact_asset_ready | launch | none | — | Dedicated pink-rhaphiolepis.png overlay — spot mode only. |
| Pittosporum | Pittosporum tenuifolium | Hedge | pittosporum | exact_asset_ready | launch | none | — | Dedicated pittosporum.png overlay — spot shrub specimen only, not row mode. |
| Pohutukawa | Metrosideros excelsa | Tree | pohutukawa | exact_asset_ready | launch | none | — | Dedicated pohutukawa.png overlay — spot mode only. |
| Ponga Fern | Dicksonia squarrosa | Fern | ponga | exact_asset_ready | launch | none | — | Dedicated ponga.png. |
| Port Wine Magnolia | Michelia figo | Shrub / Hedge | port-wine-magnolia | exact_asset_ready | launch | none | Yes | Dedicated port-wine-magnolia.png overlay — spot shrub specimen only, not row mode. White/pale flowers may need manual cutout or a non-white source background. |
| Pratia | Pratia angulata | Groundcover | groundcover | close_shared_asset_ok | soon | likely | Yes | Shares groundcover.png. White flowers — manual cutout may be needed. White/pale flowers may need manual cutout or a non-white source background. |
| Pūriri | Vitex lucens | Tree | puriri | exact_asset_ready | launch | none | — | Dedicated puriri.png overlay — spot mode only. |
| Putaputawētā | Carpodetus serratus | Tree | putaputaweta | exact_asset_ready | launch | none | — | Dedicated putaputaweta.png overlay — spot mode only. |
| Rain Lily | Zephyranthes | Perennial | rain-lily | exact_asset_ready | launch | none | Yes | Dedicated rain-lily.png overlay — cream/soft-white flowers via luminance-preserving recolour; spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Redbud | Cercis canadensis | Tree | redbud | exact_asset_ready | launch | none | Yes | Dedicated redbud.png overlay — distinct from Forest Pansy; spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Renga Renga Lily | Arthropodium cirratum | Perennial | renga-renga-lily | exact_asset_ready | launch | likely | Yes | Dedicated renga-renga-lily.png. White/pale flowers may need manual cutout or non-white source background. White/pale flowers may need manual cutout or a non-white source background. |
| Rewarewa | Knightia excelsa | Tree | rewarewa | exact_asset_ready | launch | none | — | Dedicated rewarewa.png overlay — spot mode only. |
| Rhododendron | Rhododendron | Shrub | rhododendron | exact_asset_ready | launch | none | — | Dedicated rhododendron.png overlay — spot mode only. |
| Rhododendron Vireya | Rhododendron vireya | Shrub | rhododendron-vireya | exact_asset_ready | launch | none | — | Dedicated rhododendron-vireya.png overlay — distinct from standard rhododendron; spot mode only. |
| Rose | Rosa spp. | Shrub | rose | exact_asset_ready | launch | none | — | Dedicated rose.png overlay — spot shrub specimen only, not row mode. |
| Sago Palm | Cycas revoluta | Palm | sago-palm | exact_asset_ready | launch | none | — | Dedicated sago-palm.png overlay — spot mode only. Not palm/tree fallback. |
| Serviceberry | Amelanchier canadensis | Tree / Shrub | serviceberry | exact_asset_ready | launch | none | Yes | Dedicated serviceberry.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Silk Tree | Albizia julibrissin | Tree | silk-tree | exact_asset_ready | launch | none | Yes | Dedicated silk-tree.png overlay — spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Silver Bush | Convolvulus cneorum | Flower | silver-bush | exact_asset_ready | launch | likely | Yes | Dedicated silver-bush.png overlay — compact silver shrub; distinct from Silver Falls; spot mode only. White/pale flowers may need manual cutout or a non-white source background. |
| Silver Falls | Dichondra argentea | Groundcover | silver-falls | exact_asset_ready | launch | none | — | Dedicated silver-falls.png overlay — trailing groundcover; distinct from Silver Bush; spot mode only. |
| Silver Flax (Astelia) | Astelia Silver | Flax | flax | close_shared_asset_ok | soon | none | — | Silver Flax (Astelia) shares flax.png. |
| Silver Lady Fern | Blechnum gibbum | Fern | nikau | needs_new_asset | later | none | — | Silver Lady Fern — shade fern; no overlay. |
| Small-leaved Lime | Tilia cordata | Tree | nikau | not_visualiser_relevant | not_needed | none | Yes | Large deciduous tree — out of scope. White/pale flowers may need manual cutout or a non-white source background. |
| Smoke Bush | Cotinus coggygria | Shrub / Tree | nikau | needs_new_asset | later | none | — | Smoke Bush — large shrub/small tree. |
| Spanish Shawl | Heterocentron elegans | Groundcover | groundcover | needs_new_asset | later | none | — | Spanish Shawl — groundcover; low priority. |
| Star Jasmine | Trachelospermum jasminoides | Climber | star-jasmine | exact_asset_ready | launch | likely | Yes | Dedicated star-jasmine.png. White flowers may need manual cutout or non-white source background. White/pale flowers may need manual cutout or a non-white source background. |
| Sugar Cane Palm | Dypsis baronii | Palm | nikau | close_shared_asset_ok | soon | none | — | Sugar Cane Palm — palm silhouette share. |
| Taraire | Beilschmiedia taraire | Tree | nikau | not_visualiser_relevant | not_needed | none | — | Large native tree — out of scope. |
| Tecomanthe | Tecomanthe speciosa | Climber | star-jasmine | needs_new_asset | later | none | — | Tecomanthe — native climber; no overlay. |
| Titoki | Alectryon excelsus | Tree | hedge | temporary_fallback_only | soon | none | — | Row mode only. Uses generic hedge-section.svg — replace with Titoki native screen PNG. |
| Totara | Podocarpus totara | Tree | nikau | not_visualiser_relevant | not_needed | none | — | Large native timber tree — out of scope. |
| Tractor Seat Plant | Ligularia reniformis | Flower | camellia | needs_new_asset | later | none | — | Tractor Seat — bold leaf perennial; low overlay priority. |
| Virginia Creeper | Parthenocissus quinquefolia | Climber | star-jasmine | needs_new_asset | later | none | — | Virginia Creeper — climber; no overlay. |
| Westringia | Westringia fruticosa | Shrub | camellia | needs_new_asset | later | likely | Yes | Westringia — white flowers; coastal shrub overlay. White/pale flowers may need manual cutout or a non-white source background. |
| Wych Elm | Ulmus glabra | Tree | nikau | not_visualiser_relevant | not_needed | none | Yes | Large deciduous tree — out of scope. White/pale flowers may need manual cutout or a non-white source background. |
| Xanadu | Philodendron Xanadu | Perennial | camellia | needs_new_asset | later | none | — | Philodendron Xanadu — subtropical clump; no overlay. |

---

## Visualise selector only (not in DB export under same name)

| Plant | Scientific name | Type | Asset key | Classification | Priority | Cutout risk | Pale flowers | Notes |
|-------|-----------------|------|-----------|----------------|----------|-------------|--------------|-------|
| Agapanthus | — | — | lomandra | close_shared_asset_ok | soon | likely | Yes | Visualise selector only — not in plantDatabaseCatalog.json export. lomandra overlay. |
| Phormium | — | — | flax | close_shared_asset_ok | soon | none | — | Visualise selector only — not in plantDatabaseCatalog.json export. flax overlay. |

---

## Maintenance

1. After DB plant changes: `npm run export:plant-catalog`
2. Update overrides in `visualiserCoverageRules.ts` when assets ship
3. Regenerate this doc: `npx tsx scripts/generateCoverageMarkdown.ts`
4. Row mode: only true hedge/screen PNG assets in `ROW_PREVIEW_PLANT_OPTIONS`
5. Do not wire weak cutouts — keep Gardenia and similar as needs_new until QA passes

## Related files

- `src/lib/visualiser/plantDatabaseCatalog.json` — DB export snapshot
- `src/lib/visualiser/visualiserCoverageRules.ts` — overrides and heuristics
- `src/lib/visualIdeas/plantOverlayAssets.ts` — runtime registry
- `scripts/exportPlantCatalog.ts` — refresh catalog from Supabase
