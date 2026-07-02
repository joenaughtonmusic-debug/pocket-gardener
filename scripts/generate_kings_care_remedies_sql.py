#!/usr/bin/env python3
"""Generate idempotent care / task-rule / remedy SQL for Kings 35 plants."""

from __future__ import annotations

import textwrap

PLANT_NAMES = [
    "Acorus",
    "Agapanthus",
    "Ajuga",
    "Alstroemeria",
    "Apodasmia",
    "Astilbe",
    "Azalea",
    "Carex",
    "Choisya",
    "Clumping Bamboo",
    "Cyclamen",
    "Daphne",
    "Grevillea",
    "Heuchera",
    "Hosta",
    "Jasmine",
    "Leptinella",
    "Leucadendron",
    "Leucospermum",
    "Libertia",
    "Loropetalum",
    "Mandevilla",
    "Nandina",
    "Photinia",
    "Pieris",
    "Plumbago",
    "Potato Vine",
    "Protea",
    "Puka",
    "Salvia",
    "Scleranthus",
    "Selliera",
    "Teucrium",
    "Thuja",
    "Tibouchina",
]

# (plant_type/common_name, month_number, care_note)
MONTHLY_CARE: list[tuple[str, int, str]] = [
    # ── Category rows (calendar matches task_category) ───────────────────────
    (
        "Flowering Shrub",
        2,
        "Light trim after summer flowering on shrubs such as Azalea, Pieris and Choisya. Avoid hard cuts into old wood on Proteaceae plants.",
    ),
    (
        "Flowering Shrub",
        6,
        "Winter check on flowering shrubs: improve drainage on clay, keep mulch away from stems, and watch for scale on dense growth.",
    ),
    (
        "Flowering Shrub",
        9,
        "Spring feed for flowering shrubs. Use acid-loving fertiliser on Azalea, Pieris and Daphne; use low-phosphorus native fertiliser on Grevillea and Protea.",
    ),
    (
        "Flowering Shrub",
        11,
        "Deadhead spent blooms and water deeply before summer on Tibouchina, Plumbago and Loropetalum.",
    ),
    (
        "Climber",
        2,
        "Trim climbers after the main flowering flush. Train new stems on Jasmine, Mandevilla and Potato Vine before growth becomes tangled.",
    ),
    (
        "Climber",
        9,
        "Spring feed and tie-in on climbers. Check supports on Potato Vine and Jasmine before the windy season.",
    ),
    (
        "Climber",
        11,
        "Peak growth month: keep climbers watered in pots and trim runners away from gutters and windows.",
    ),
    # ── Plant-specific rows (calendar matches common_name) ───────────────────
    (
        "Agapanthus",
        1,
        "Remove spent flower stems and pull yellow leaves from the base. Divide crowded clumps if flowering has slowed.",
    ),
    (
        "Agapanthus",
        9,
        "Spring tidy: cut back old foliage and apply compost or slow-release fertiliser if growth is weak.",
    ),
    (
        "Photinia",
        3,
        "Autumn tidy trim on Photinia to keep the hedge sharp through winter and reduce leaf spot in humid weather.",
    ),
    (
        "Photinia",
        10,
        "Spring trim little and often on Photinia to encourage bright red new growth.",
    ),
    (
        "Azalea",
        9,
        "Feed Azaleas with acid-loving fertiliser as buds swell. Keep evenly moist, especially in pots.",
    ),
    (
        "Azalea",
        11,
        "Check leaf undersides for lacebug before spring flowering. Improve airflow if leaves look pale or speckled.",
    ),
    (
        "Daphne",
        6,
        "Leave Daphne alone in winter. Check drainage and keep roots cool with mulch, but keep mulch off the stem.",
    ),
    (
        "Daphne",
        9,
        "Light feed after flowering with gentle acid-loving fertiliser. Avoid root disturbance.",
    ),
    (
        "Hosta",
        8,
        "Slug alert: protect new Hosta shoots as they emerge. Use pet-safe pellets or barriers before damage shows.",
    ),
    (
        "Hosta",
        6,
        "Cut back old Hosta leaves after they yellow. Divide large clumps if the plant has outgrown its spot.",
    ),
    (
        "Puka",
        6,
        "Good native planting month for Puka in Auckland. Mulch young trees and protect from cold wind while establishing.",
    ),
    (
        "Puka",
        9,
        "Spring feed lightly and remove damaged leaves. Give shelter from strong wind on young plants.",
    ),
    (
        "Protea",
        9,
        "Feed Proteas with low-phosphorus native fertiliser only. Never use standard high-phosphorus feeds.",
    ),
    (
        "Protea",
        6,
        "Drainage check: Proteas hate wet feet in Auckland clay. Mound planting or improve drainage before winter rain.",
    ),
    (
        "Grevillea",
        9,
        "Tip prune after flowering and feed sparingly with low-phosphorus native fertiliser.",
    ),
    (
        "Leucadendron",
        9,
        "Light prune after flowering or picking stems. Use low-phosphorus fertiliser in spring.",
    ),
    (
        "Leucospermum",
        9,
        "Remove spent pincushion flowers and check drainage on raised beds before dry weather.",
    ),
    (
        "Thuja",
        10,
        "First spring clip on Thuja — trim only into green growth, never old brown wood.",
    ),
    (
        "Thuja",
        3,
        "Autumn hedge tidy on Thuja. Water deeply if summer was dry to reduce winter browning.",
    ),
    (
        "Clumping Bamboo",
        10,
        "Thin old culms at ground level and feed lightly in spring to support fresh screen growth.",
    ),
    (
        "Clumping Bamboo",
        4,
        "Remove weak culms and trim lower branches if you want a clean-stem screen look.",
    ),
    (
        "Cyclamen",
        4,
        "Start gentle watering as Cyclamen come into growth. Keep the crown dry and pots in bright shade.",
    ),
    (
        "Cyclamen",
        6,
        "Allow Cyclamen to rest in cooler weather. Reduce watering if leaves yellow after flowering.",
    ),
    (
        "Carex",
        8,
        "Comb out dead Carex foliage or cut back tired clumps before spring growth.",
    ),
    (
        "Carex",
        9,
        "Divide congested Carex clumps if needed and apply a light spring feed.",
    ),
    (
        "Salvia",
        9,
        "Cut back woody Salvia stems once frost risk has passed, then feed lightly for summer flowers.",
    ),
    (
        "Salvia",
        2,
        "Deadhead Salvia through summer to keep bees visiting and reduce leggy growth.",
    ),
    (
        "Astilbe",
        6,
        "Keep Astilbe evenly moist through dry spells. Do not let shaded borders bake out.",
    ),
    (
        "Astilbe",
        9,
        "Spring feed with compost and remove old flower stems before new growth expands.",
    ),
    (
        "Heuchera",
        9,
        "Refresh Heuchera by removing tired leaves and applying light slow-release fertiliser.",
    ),
    (
        "Ajuga",
        10,
        "Edge Ajuga runners after spring flowering so it does not creep into lawns or paths.",
    ),
    (
        "Libertia",
        9,
        "Pull dead Libertia leaves from the base and apply compost if clumps look congested.",
    ),
    (
        "Apodasmia",
        8,
        "Tidy dead Apodasmia stems and keep weeds out while clumps are still establishing.",
    ),
    (
        "Scleranthus",
        9,
        "Very light feed only if cushions look pale. Avoid heavy mulch over the crown.",
    ),
    (
        "Selliera",
        6,
        "Keep Selliera moist through dry winter spells and trim edges if mats spread too far.",
    ),
    (
        "Leptinella",
        6,
        "Keep Leptinella evenly moist and weed-free while mats are filling in.",
    ),
    (
        "Mandevilla",
        11,
        "Warm-month feed and water for Mandevilla in pots. Train new stems onto supports.",
    ),
    (
        "Jasmine",
        11,
        "Peak scent month: keep Jasmine watered and tie in new growth after flowering.",
    ),
    (
        "Potato Vine",
        10,
        "Hard prune Potato Vine in spring to control size before it smothers supports.",
    ),
    (
        "Plumbago",
        10,
        "Cut back frost-damaged Plumbago growth and shape after the risk of cold has passed.",
    ),
    (
        "Tibouchina",
        11,
        "Feed Tibouchina through warm months and prune lightly after flowering to stay bushy.",
    ),
    (
        "Acorus",
        8,
        "Comb out old Acorus foliage before spring to refresh edging clumps.",
    ),
    (
        "Nandina",
        8,
        "Thin old Nandina canes from the base rather than shearing the top like a hedge.",
    ),
    (
        "Pieris",
        9,
        "Feed Pieris with acid-loving fertiliser and mulch with compost or leaf mould.",
    ),
    (
        "Loropetalum",
        10,
        "Lightly shape Loropetalum after flowering and mulch before dry spring weather.",
    ),
    (
        "Choisya",
        10,
        "Trim Choisya after spring flowering to keep a tidy shape near paths and entrances.",
    ),
    (
        "Teucrium",
        10,
        "Clip Teucrium little and often in spring for a dense silver hedge.",
    ),
]

# (plant_category, task_type, trigger_month, frequency_per_year, base_priority, estimated_minutes, tool_tags, shopping_tags)
TASK_RULES: list[tuple] = [
    (
        "Hedge",
        "trim",
        10,
        2,
        85,
        30,
        ["hedge_trimmer", "gloves"],
        [],
    ),
    (
        "Flowering Shrub",
        "check",
        6,
        1,
        55,
        10,
        ["gloves"],
        [],
    ),
    (
        "Climber",
        "check",
        11,
        1,
        50,
        15,
        ["secateurs", "gloves"],
        [],
    ),
]

# common_name -> list of remedies
# (issue_type, remedy_title, remedy_description, category, search_keywords, shopping_tags)
REMEDIES: dict[str, list[tuple]] = {
    "Agapanthus": [
        (
            "Snails",
            "Crown and foliage protection",
            "Snails hide in dense Agapanthus foliage. Check at night, remove leaf litter, and use pet-safe pellets if damage continues.",
            "Pest",
            "snails, holes, agapanthus, crown",
            ["Snail Pellets", "Quash"],
        ),
        (
            "Wilting in Wet Soil",
            "Crown rot prevention",
            "Agapanthus crowns rot in waterlogged soil. Improve drainage and avoid burying the base with mulch.",
            "Environment",
            "crown rot, wet soil, collapse, agapanthus",
            ["Gypsum", "Compost"],
        ),
        (
            "Self-seeding",
            "Seed head removal",
            "Remove spent heads before seed drops, especially near bush or waterways. Prefer sterile cultivars where spread is a concern.",
            "Environment",
            "seed, spread, invasive, agapanthus",
            [],
        ),
    ],
    "Photinia": [
        (
            "Leaf Spot",
            "Airflow and hygiene",
            "Humid crowded hedges get leaf spot. Trim lightly, improve airflow, and remove badly spotted leaves.",
            "Disease",
            "leaf spot, photinia, red robin, fungal",
            ["Fungicide Spray", "Garden Sprayer"],
        ),
        (
            "Leggy Growth",
            "Little-and-often trim",
            "If red new growth is weak, trim lightly through the growing season rather than letting the hedge get woody.",
            "Environment",
            "leggy, woody, photinia, hedge",
            [],
        ),
        (
            "Wilting in Wet Soil",
            "Drainage while establishing",
            "Young Photinia can stress in wet clay. Mound soil slightly and mulch the root zone, not the stems.",
            "Environment",
            "wet feet, drought, photinia",
            ["Mulch"],
        ),
    ],
    "Azalea": [
        (
            "Silvery or Mottled Leaves",
            "Lacebug check",
            "Pale or speckled leaves often mean lacebug on undersides. Spray with plant soap and improve airflow.",
            "Pest",
            "lacebug, pale leaves, azalea, rhododendron",
            ["Garden Sprayer", "Plant Soap", "Horticultural Oil"],
        ),
        (
            "Yellow Leaves",
            "Acid soil and moisture",
            "Yellowing may mean alkaline soil or dry roots. Use acid-loving fertiliser and keep evenly moist in pots.",
            "Environment",
            "yellow, azalea, acid, dry",
            ["Granular Fertiliser", "Mulch"],
        ),
        (
            "Wilting in Wet Soil",
            "Root stress in pots",
            "Azaleas need drainage and steady moisture, not wet crowns. Repot with acidic mix if soil stays soggy.",
            "Environment",
            "root rot, azalea, wet, pot",
            ["Fresh Potting Mix"],
        ),
    ],
    "Daphne": [
        (
            "Yellow Leaves",
            "Drainage and disturbance",
            "Daphne hates wet feet and root disturbance. Check drainage and avoid moving or heavy pruning.",
            "Environment",
            "yellow, daphne, dieback, wet",
            ["Mulch"],
        ),
        (
            "Sudden Decline",
            "Root rot warning",
            "Sudden wilting often means root rot. Reduce watering, improve drainage, and do not disturb roots.",
            "Environment",
            "dieback, daphne, collapse, root rot",
            ["Gypsum"],
        ),
    ],
    "Hosta": [
        (
            "Slugs",
            "Spring slug defence",
            "Protect emerging Hosta shoots early in spring before slugs shred new leaves.",
            "Pest",
            "slugs, snails, holes, hosta",
            ["Snail Pellets", "Quash"],
        ),
        (
            "Leaf Scorch",
            "Shade and moisture",
            "Brown crispy leaves mean too much sun or dry soil. Move to shade and keep soil moist.",
            "Environment",
            "scorch, sunburn, hosta, dry",
            ["Mulch"],
        ),
    ],
    "Puka": [
        (
            "Wind Damage",
            "Shelter young trees",
            "Young Puka brown in drying winds. Stake lightly and plant in a sheltered courtyard or protected site.",
            "Environment",
            "wind, frost, puka, brown leaves",
            [],
        ),
        (
            "Wilting in Wet Soil",
            "Clay drainage",
            "Puka struggles in wet heavy clay. Improve drainage and avoid planting in boggy low spots.",
            "Environment",
            "wet clay, puka, root stress",
            ["Gypsum", "Compost"],
        ),
    ],
    "Protea": [
        (
            "Wilting in Wet Soil",
            "Raised planting",
            "Proteas collapse quickly in wet clay. Plant high in free-draining soil and never use rich compost around roots.",
            "Environment",
            "protea, root rot, wet, drainage",
            ["Compost", "Gypsum"],
        ),
        (
            "Yellow Leaves",
            "Phosphorus sensitivity",
            "Never use standard fertilisers. Use low-phosphorus native or protea fertiliser only.",
            "Environment",
            "phosphorus, yellow, protea, fertiliser",
            ["Granular Fertiliser"],
        ),
    ],
    "Grevillea": [
        (
            "Wilting in Wet Soil",
            "Free drainage essential",
            "Grevillea roots rot in wet soil. Plant in raised or sandy beds and avoid heavy feeding.",
            "Environment",
            "grevillea, root rot, wet, drainage",
            ["Gypsum"],
        ),
        (
            "Yellow Leaves",
            "Low-phosphorus feed only",
            "Standard fertilisers can damage Grevillea. Use native low-phosphorus feed sparingly in spring.",
            "Environment",
            "phosphorus, grevillea, yellow, feed",
            ["Granular Fertiliser"],
        ),
        (
            "Leggy Growth",
            "Tip prune after flowering",
            "Tip prune after flowering to keep bushy and remove old woody stems gradually.",
            "Environment",
            "leggy, woody, grevillea",
            [],
        ),
    ],
    "Leucadendron": [
        (
            "Wilting in Wet Soil",
            "Drainage first",
            "Leucadendron wilts quickly in wet clay. Improve drainage and use low-phosphorus fertiliser only.",
            "Environment",
            "leucadendron, wilt, drainage, protea",
            ["Gypsum"],
        ),
        (
            "Leggy Growth",
            "Prune after picking",
            "Light prune after flowering or picking stems to prevent bare woody growth.",
            "Environment",
            "woody, leggy, leucadendron",
            [],
        ),
    ],
    "Leucospermum": [
        (
            "Wilting in Wet Soil",
            "Raised bed planting",
            "Wilting in wet soil is serious. Improve drainage immediately and avoid heavy mulch against the stem.",
            "Environment",
            "leucospermum, wilt, drainage, pincushion",
            ["Gypsum", "Compost"],
        ),
        (
            "Poor Flowering",
            "Sun and drainage",
            "Poor flowering usually means too much shade or wet roots. Move to full sun and free-draining soil.",
            "Environment",
            "no flowers, leucospermum, shade",
            [],
        ),
    ],
    "Thuja": [
        (
            "Browning Leaves",
            "Moisture and mites",
            "Browning may be drought, wet feet, or mites. Check soil moisture and drainage before trimming harder.",
            "Environment",
            "brown, thuja, conifer, hedge",
            ["Garden Sprayer", "Horticultural Oil"],
        ),
        (
            "Leggy Growth",
            "Green growth only",
            "Never cut Thuja back into old brown wood. Trim lightly into green foliage only.",
            "Environment",
            "bare patches, thuja, hedge, brown",
            [],
        ),
    ],
    "Clumping Bamboo": [
        (
            "Dry Stress",
            "Water while establishing",
            "Rolled or dry leaves often mean water stress or wind exposure. Deep soak during dry spells.",
            "Environment",
            "dry, bamboo, wind, scorch",
            ["Mulch"],
        ),
        (
            "Overgrowth",
            "Annual cane thinning",
            "Remove old culms at ground level each year to keep the screen tidy and manageable.",
            "Environment",
            "spread, bamboo, thin, culm",
            [],
        ),
    ],
    "Cyclamen": [
        (
            "Wilting in Wet Soil",
            "Crown rot from overwatering",
            "If stems collapse, check for overwatering. Water the mix, not the crown, and keep in bright shade.",
            "Environment",
            "cyclamen, crown rot, wet, collapse",
            [],
        ),
        (
            "Tiny Bugs / Curled Leaves",
            "Aphid check",
            "Check for aphids on new growth. Spray with plant soap and keep plants in cool bright shade.",
            "Pest",
            "aphids, cyclamen, curled",
            ["Garden Sprayer", "Plant Soap"],
        ),
    ],
    "Carex": [
        (
            "Wilting in Wet Soil",
            "Crown rot in compacted soil",
            "Carex crowns rot in wet compacted soil. Improve drainage and avoid burying the crown with mulch.",
            "Environment",
            "carex, crown rot, wet, sedge",
            ["Gypsum"],
        ),
        (
            "Browning Leaves",
            "Refresh tired clumps",
            "Comb out dead leaves or cut back hard in late winter if the clump looks messy.",
            "Environment",
            "brown, carex, tidy, sedge",
            [],
        ),
    ],
    "Salvia": [
        (
            "White Powdery Leaves",
            "Mildew and airflow",
            "Mildew appears in humid crowded growth. Improve airflow and avoid wetting foliage late in the day.",
            "Disease",
            "mildew, salvia, powdery",
            ["Fungicide Spray", "Garden Sprayer"],
        ),
        (
            "Tiny Bugs / Curled Leaves",
            "Aphids on new growth",
            "Aphids on soft new stems can be removed with a hose or plant soap spray.",
            "Pest",
            "aphids, salvia, curled",
            ["Garden Sprayer", "Plant Soap"],
        ),
    ],
    "Alstroemeria": [
        (
            "Slugs",
            "Protect new shoots",
            "Slugs attack new Alstroemeria shoots in spring. Use pet-safe pellets around clumps.",
            "Pest",
            "slugs, alstroemeria, holes",
            ["Snail Pellets", "Quash"],
        ),
        (
            "Wilting in Wet Soil",
            "Heavy clay rot",
            "Root rot occurs in heavy wet soil. Improve drainage and pull spent stems from the base, do not cut.",
            "Environment",
            "alstroemeria, wet, rot",
            ["Gypsum"],
        ),
    ],
    "Astilbe": [
        (
            "Leaf Scorch",
            "Keep soil moist",
            "Brown crispy leaves mean the site is too dry or sunny. Increase shade and moisture.",
            "Environment",
            "astilbe, dry, scorch, shade",
            ["Mulch"],
        ),
        (
            "Poor Flowering",
            "Moist shade required",
            "Astilbe flowers poorly in dry shade. Mulch and water during dry spells.",
            "Environment",
            "astilbe, no flowers, dry",
            ["Mulch", "Compost"],
        ),
    ],
    "Heuchera": [
        (
            "Wilting in Wet Soil",
            "Crown rot",
            "Keep crowns above wet mulch. If the plant wilts despite moist soil, check for vine weevil or crown rot.",
            "Environment",
            "heuchera, crown rot, wilt, weevil",
            ["Fresh Potting Mix"],
        ),
        (
            "Leaf Scorch",
            "Afternoon shade",
            "Harsh afternoon sun scorches foliage. Move to part shade and keep evenly moist.",
            "Environment",
            "heuchera, scorch, sun",
            [],
        ),
    ],
    "Ajuga": [
        (
            "White Powdery Leaves",
            "Mildew in damp patches",
            "Improve airflow in dense damp patches and trim runners after flowering.",
            "Disease",
            "ajuga, mildew, groundcover",
            ["Fungicide Spray", "Garden Sprayer"],
        ),
        (
            "Slugs",
            "Edge control",
            "Slugs can damage Ajuga in damp shade. Edge regularly and use pellets if needed.",
            "Pest",
            "slugs, ajuga, holes",
            ["Snail Pellets"],
        ),
    ],
    "Acorus": [
        (
            "Browning Leaves",
            "Dry tips",
            "Brown tips usually mean drying out or salt exposure. Keep evenly moist near pond edges and pots.",
            "Environment",
            "acorus, brown tips, dry",
            ["Mulch"],
        ),
        (
            "Wilting in Wet Soil",
            "Crown needs oxygen",
            "Likes moisture but still needs oxygen at the crown. Avoid waterlogging in pots.",
            "Environment",
            "acorus, crown rot, wet",
            [],
        ),
    ],
    "Libertia": [
        (
            "Leaf Spot",
            "Rust spots",
            "Rust spots appear in crowded clumps. Remove old foliage and improve airflow.",
            "Disease",
            "libertia, rust, spots",
            ["Fungicide Spray", "Garden Sprayer"],
        ),
        (
            "Overcrowding",
            "Divide clumps",
            "Divide congested Libertia clumps in spring to refresh growth.",
            "Environment",
            "libertia, divide, congested",
            [],
        ),
    ],
    "Apodasmia": [
        (
            "Dry Stress",
            "Establishment watering",
            "Poor growth before establishment often means drying out. Water until roots settle, then reduce.",
            "Environment",
            "apodasmia, oioi, dry, establish",
            ["Mulch"],
        ),
        (
            "Weeds",
            "Keep weed-free while young",
            "Weed competition slows young Apodasmia. Keep bases clear until clumps fill in.",
            "Environment",
            "weeds, apodasmia, oioi",
            [],
        ),
    ],
    "Scleranthus": [
        (
            "Wilting in Wet Soil",
            "Cushion rot",
            "Brown patches often mean poor drainage or mulch over the cushion. Keep drainage sharp and mulch light.",
            "Environment",
            "scleranthus, rot, cushion, wet",
            ["Gypsum"],
        ),
        (
            "Weeds",
            "Low competition site",
            "Keep weeds away from cushions. Plant in free-draining mounds or rock gardens.",
            "Environment",
            "weeds, scleranthus, competition",
            [],
        ),
    ],
    "Selliera": [
        (
            "Patchy Growth",
            "Even moisture",
            "Patchy mats usually mean inconsistent moisture or weed competition. Water while establishing.",
            "Environment",
            "selliera, patchy, dry, mat",
            ["Mulch"],
        ),
        (
            "Weeds",
            "Keep mats clean",
            "Weeds overtake low Selliera mats quickly while establishing. Hand-weed regularly.",
            "Environment",
            "weeds, selliera, groundcover",
            [],
        ),
    ],
    "Leptinella": [
        (
            "Dry Stress",
            "Keep cool and moist",
            "Browning often comes from drying out or heat between pavers. Keep evenly moist while establishing.",
            "Environment",
            "leptinella, dry, brown, brass buttons",
            ["Mulch"],
        ),
        (
            "Weeds",
            "Protect from competition",
            "Aggressive weeds can outcompete Leptinella mats. Edge and weed while plants are filling in.",
            "Environment",
            "weeds, leptinella, brass buttons",
            [],
        ),
    ],
    "Mandevilla": [
        (
            "Cold Damage",
            "Frost protection",
            "Protect from frost and cold wind. Move pots under eaves and prune cold-damaged growth in spring.",
            "Environment",
            "mandevilla, frost, cold, damage",
            ["Frost Cloth"],
        ),
        (
            "Tiny Bugs / Curled Leaves",
            "Aphids on new shoots",
            "Check new shoots for aphids. Spray with plant soap and keep pots watered in summer.",
            "Pest",
            "aphids, mandevilla, mites",
            ["Garden Sprayer", "Plant Soap"],
        ),
    ],
    "Jasmine": [
        (
            "Poor Flowering",
            "Light and training",
            "Poor flowering often means too much shade or tangled growth. Train stems and improve light.",
            "Environment",
            "jasmine, no flowers, shade, tangled",
            [],
        ),
        (
            "Tiny Bugs / Curled Leaves",
            "Aphids on soft growth",
            "Aphids on new tips can be hosed off or treated with plant soap.",
            "Pest",
            "aphids, jasmine, curled",
            ["Garden Sprayer", "Plant Soap"],
        ),
    ],
    "Potato Vine": [
        (
            "Overgrowth",
            "Schedule hard prune",
            "Potato Vine becomes a tangled mass without pruning. Cut back hard after flowering or in spring.",
            "Environment",
            "potato vine, overgrowth, tangled, solanum",
            ["Secateurs"],
        ),
        (
            "Tiny Bugs / Curled Leaves",
            "Aphids on soft growth",
            "Watch soft new growth for aphids after spring flush.",
            "Pest",
            "aphids, potato vine, solanum",
            ["Garden Sprayer", "Plant Soap"],
        ),
    ],
    "Plumbago": [
        (
            "Frost Damage",
            "Spring cutback",
            "Prune out frost-damaged growth in spring and shape after cold weather has passed.",
            "Environment",
            "plumbago, frost, damage, sprawling",
            [],
        ),
        (
            "Bumps on Stems / Sticky Leaves",
            "Scale on stems",
            "Check stems for scale. Spray with horticultural oil if sticky sooty mould appears.",
            "Pest",
            "scale, plumbago, sticky",
            ["Garden Sprayer", "Horticultural Oil"],
        ),
    ],
    "Tibouchina": [
        (
            "Frost Damage",
            "Shelter and prune",
            "Protect from frost and cold wind. Prune lightly after flowering to stay compact.",
            "Environment",
            "tibouchina, frost, leggy, cold",
            [],
        ),
        (
            "Silvery or Mottled Leaves",
            "Mite check",
            "Check new growth for mites in warm weather. Spray with plant soap or horticultural oil if present.",
            "Pest",
            "mites, tibouchina, dusty leaves",
            ["Garden Sprayer", "Horticultural Oil", "Plant Soap"],
        ),
    ],
    "Nandina": [
        (
            "Bumps on Stems / Sticky Leaves",
            "Scale in dense stems",
            "Scale can hide in dense Nandina stems. Thin old canes and spray with horticultural oil if needed.",
            "Pest",
            "scale, nandina, sticky",
            ["Garden Sprayer", "Horticultural Oil"],
        ),
        (
            "Poor Flowering",
            "Too much shade",
            "Foliage colour fades in deep shade. Move to brighter light or thin surrounding plants.",
            "Environment",
            "nandina, poor colour, shade",
            [],
        ),
    ],
    "Pieris": [
        (
            "Silvery or Mottled Leaves",
            "Lacebug",
            "Pale speckled leaves may mean lacebug. Check undersides and use plant soap.",
            "Pest",
            "lacebug, pieris, pale leaves",
            ["Garden Sprayer", "Plant Soap"],
        ),
        (
            "Yellow Leaves",
            "Acid soil needed",
            "Yellow leaves may mean alkaline soil or poor drainage. Mulch with leaf mould and feed with acid fertiliser.",
            "Environment",
            "pieris, yellow, acid, alkaline",
            ["Granular Fertiliser", "Mulch"],
        ),
    ],
    "Loropetalum": [
        (
            "Poor Flowering",
            "Improve light",
            "Poor foliage colour in too much shade. Improve light or prune surrounding plants.",
            "Environment",
            "loropetalum, shade, colour, bronze",
            [],
        ),
        (
            "Silvery or Mottled Leaves",
            "Mite check",
            "Dry stress and mites can dull foliage. Water during dry spells and treat pests if present.",
            "Pest",
            "mites, loropetalum, dusty",
            ["Garden Sprayer", "Plant Soap"],
        ),
    ],
    "Choisya": [
        (
            "Leggy Growth",
            "Shape after flowering",
            "Shape after flowering and remove older crowded stems if the shrub gets leggy.",
            "Environment",
            "choisya, leggy, mexican orange",
            [],
        ),
        (
            "Bumps on Stems / Sticky Leaves",
            "Scale in dense growth",
            "Check dense growth for scale. Spray with horticultural oil in cooler months.",
            "Pest",
            "scale, choisya, sticky",
            ["Garden Sprayer", "Horticultural Oil"],
        ),
    ],
    "Teucrium": [
        (
            "Leggy Growth",
            "Clip regularly",
            "Clip regularly for density. Renovate gradually rather than cutting hard into old wood.",
            "Environment",
            "teucrium, leggy, hedge, silver",
            [],
        ),
        (
            "Wilting in Wet Soil",
            "Dry-loving hedge",
            "Teucrium yellows or collapses in wet soil. Improve drainage and keep in full sun.",
            "Environment",
            "teucrium, wet, root rot",
            ["Gypsum"],
        ),
    ],
}

DEFAULT_REMEDY = (
    "Wilting in Wet Soil",
    "Drainage check",
    "Improve drainage in heavy Auckland clay, keep mulch away from the stem, and reduce watering if soil stays soggy.",
    "Environment",
    "wet soil, drainage, wilt, clay",
    ["Gypsum", "Mulch"],
)

for name in PLANT_NAMES:
    REMEDIES.setdefault(name, [DEFAULT_REMEDY])


def sql_str(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def sql_array(items: list[str]) -> str:
    if not items:
        return "ARRAY[]::text[]"
    inner = ", ".join(sql_str(x) for x in items)
    return f"ARRAY[{inner}]"


def plant_id_expr(common_name: str) -> str:
    return f"(SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower({sql_str(common_name)}) LIMIT 1)"


def main() -> None:
    lines: list[str] = [
        "-- Pocket Gardener: care calendar, task rules, and remedies for Kings 35 plants",
        "-- Safe / idempotent: skips rows that already exist.",
        "-- Resolves plant IDs by common_name (works across environments).",
        "--",
        "-- Tables:",
        "--   auckland_monthly_care  — matched by plant_type (= common_name or task_category)",
        "--   plant_task_rules       — category rules (shared across plants with same task_category)",
        "--   plant_remedies         — plant-specific diagnose / sick-plant entries",
        "",
        "BEGIN;",
        "",
        "-- Sync id sequences (seed data used explicit ids; nextval may be behind MAX(id)).",
        "DO $$",
        "DECLARE",
        "  seq_name text;",
        "BEGIN",
        "  seq_name := pg_get_serial_sequence('public.auckland_monthly_care', 'id');",
        "  IF seq_name IS NOT NULL THEN",
        "    PERFORM setval(",
        "      seq_name,",
        "      (SELECT COALESCE(MAX(id), 1) FROM public.auckland_monthly_care),",
        "      true",
        "    );",
        "  END IF;",
        "",
        "  seq_name := pg_get_serial_sequence('public.plant_task_rules', 'id');",
        "  IF seq_name IS NOT NULL THEN",
        "    PERFORM setval(",
        "      seq_name,",
        "      (SELECT COALESCE(MAX(id), 1) FROM public.plant_task_rules),",
        "      true",
        "    );",
        "  END IF;",
        "",
        "  seq_name := pg_get_serial_sequence('public.plant_remedies', 'id');",
        "  IF seq_name IS NOT NULL THEN",
        "    PERFORM setval(",
        "      seq_name,",
        "      (SELECT COALESCE(MAX(id), 1) FROM public.plant_remedies),",
        "      true",
        "    );",
        "  END IF;",
        "END $$;",
        "",
    ]

    lines.append("-- ── Auckland monthly care ────────────────────────────────────────────────")
    for plant_type, month, note in MONTHLY_CARE:
        lines.append(
            "INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)\n"
            f"SELECT {sql_str(plant_type)}, {month}, {sql_str(note)}, NULL\n"
            "WHERE NOT EXISTS (\n"
            "  SELECT 1 FROM public.auckland_monthly_care c\n"
            f"  WHERE lower(trim(c.plant_type)) = lower({sql_str(plant_type)})\n"
            f"    AND c.month_number = {month}\n"
            f"    AND c.care_note = {sql_str(note)}\n"
            ");"
        )
        lines.append("")

    # Task rules
    lines.append("-- ── Plant task rules (category-level supplements) ─────────────────────────")
    for cat, task, month, freq, priority, minutes, tools, shopping in TASK_RULES:
        freq_sql = "NULL" if freq is None else str(freq)
        lines.append(
            "INSERT INTO public.plant_task_rules (\n"
            "  plant_category, task_type, trigger_type, trigger_month,\n"
            "  frequency_per_year, base_priority, estimated_minutes, tool_tags, shopping_tags\n"
            ")\n"
            f"SELECT {sql_str(cat)}, {sql_str(task)}, 'fixed_month', {month}, "
            f"{freq_sql}, {priority}, {minutes}, {sql_array(tools)}, {sql_array(shopping)}\n"
            "WHERE NOT EXISTS (\n"
            "  SELECT 1 FROM public.plant_task_rules r\n"
            f"  WHERE lower(trim(r.plant_category)) = lower({sql_str(cat)})\n"
            f"    AND lower(trim(r.task_type)) = lower({sql_str(task)})\n"
            f"    AND r.trigger_month = {month}\n"
            ");"
        )
        lines.append("")

    # Remedies
    lines.append("-- ── Plant remedies ───────────────────────────────────────────────────────")
    for common_name in PLANT_NAMES:
        pid = plant_id_expr(common_name)
        for issue, title, desc, category, keywords, tags in REMEDIES.get(common_name, [DEFAULT_REMEDY]):
            lines.append(
                "INSERT INTO public.plant_remedies (\n"
                "  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,\n"
                "  is_universal, category, search_keywords, shopping_tags\n"
                ")\n"
                f"SELECT {sql_str(issue)}, {pid}, NULL, {sql_str(title)}, {sql_str(desc)}, "
                f"false, {sql_str(category)}, {sql_str(keywords)}, {sql_array(tags)}\n"
                f"WHERE {pid} IS NOT NULL\n"
                "  AND NOT EXISTS (\n"
                "    SELECT 1 FROM public.plant_remedies r\n"
                f"    WHERE r.specific_plant_id = {pid}\n"
                f"      AND lower(trim(r.issue_type)) = lower({sql_str(issue)})\n"
                "  );"
            )
            lines.append("")

    verify_names = ["Flowering Shrub", "Climber", *PLANT_NAMES]
    lines.extend(
        [
            "COMMIT;",
            "",
            "-- ── Verification ─────────────────────────────────────────────────────────",
            "SELECT 'monthly_care' AS section, count(*) AS row_count",
            "FROM public.auckland_monthly_care c",
            "WHERE lower(trim(c.plant_type)) IN (",
            ",\n".join(f"  lower({sql_str(n)})" for n in verify_names),
            ");",
            "",
            "SELECT p.common_name, count(r.id) AS remedy_count",
            "FROM public.plants p",
            "LEFT JOIN public.plant_remedies r ON r.specific_plant_id = p.id",
            "WHERE lower(trim(p.common_name)) IN (",
            ",\n".join(f"  lower({sql_str(n)})" for n in PLANT_NAMES),
            ")",
            "GROUP BY p.common_name",
            "ORDER BY p.common_name;",
            "",
            "-- Expect monthly_care row_count >= 54 and remedy_count >= 2 for each of 35 plants.",
        ]
    )

    out = "/Users/joenaughton/pocket-gardener/scripts/kings_plants_care_remedies.sql"
    with open(out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"Wrote {out}")
    print(f"monthly_care rows: {len(MONTHLY_CARE)}")
    print(f"task_rules rows: {len(TASK_RULES)}")
    remedy_count = sum(len(REMEDIES.get(n, [DEFAULT_REMEDY])) for n in PLANT_NAMES)
    print(f"remedy inserts (max): {remedy_count}")


if __name__ == "__main__":
    main()
