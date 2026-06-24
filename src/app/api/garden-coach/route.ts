import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

// ── Shared types ─────────────────────────────────────────────────────────────

type CoachIntent =
  | 'find_plants'
  | 'plant_problem'
  | 'plant_suitability'
  | 'care_task'
  | 'visualise'
  | 'garden_area'
  | 'guide_lookup'
  | 'upgrade'
  | 'out_of_scope'

interface CoachAction {
  label: string
  description?: string
  href: string
  /** Pre-fill the DiagnoseProblemModal search bar with the key symptom. */
  initialSearch?: string
  /** Plant name hint (for future use). */
  plantName?: string
}

export interface CoachResponse {
  reply: string
  intent: CoachIntent
  actions: CoachAction[]
  outOfScope: boolean
}

// ── Allowed hrefs (AI output is sanitised against this set) ──────────────────

const ALLOWED_HREFS = new Set([
  '/match',
  '/match?mode=suitability',
  '/plants',
  '/calendar',
  '/guides',
  '/guides/planting',
  '/guides/pests',
  '/guides/weeds',
  '/guides/feeding',
  '/guides/tools',
  '/visualise',
  '/dashboard',
  '/dashboard#diagnose',
  '/dashboard#garden-areas',
  '/about',
])

function isSafeHref(href: string): boolean {
  if (ALLOWED_HREFS.has(href)) return true
  // Allow dynamic plant pages produced by a cautious AI
  if (/^\/plants\/\d+$/.test(href)) return true
  return false
}

// ── Keyword router — deterministic fallback when AI is unavailable ────────────

const SAFETY_KW  = ['toxic', 'poison', 'pet safe', 'child safe', 'safe for', 'deadly', 'edible', 'eat']
const PROBLEM_KW = ['yellow', 'brown', 'black spot', 'sick', 'pest', 'disease', 'spots', 'wilting', 'dying', 'bug', 'insect', 'fungus', 'mould', 'mold', 'problem', 'damaged', 'drooping', 'curling', 'mushy']
const CARE_KW    = ['trim', 'prune', 'feed', 'water', 'fertilise', 'fertilize', 'care', 'when should', 'how often', 'task', 'calendar', 'due', 'this week', 'maintenance']
const SUIT_KW    = ['suit', 'suitable', 'can i plant', 'will it grow', 'full sun', 'part shade', 'full shade', 'wind', 'frost', 'hardy', 'climate', 'soil', 'conditions']
const VIS_KW     = ['visualise', 'visualize', 'preview', 'photo', 'picture', 'design', 'layout', 'look like', 'see how']
const AREA_KW    = ['garden area', 'area', 'section', 'bed', 'border', 'zone']
const FIND_KW    = ['plant', 'grow', 'fence', 'hedge', 'screen', 'privacy', 'pot', 'bare', 'suggest', 'recommend', 'what to plant', 'what can i plant', 'what should i plant']

/** Extract the first matched symptom keyword from a query for prefilling search. */
function extractSymptom(query: string): string | undefined {
  const q = query.toLowerCase()
  // Longer / more-specific phrases checked first to avoid shorter substring matches
  const symptomPhrases = [
    'yellow leaves', 'yellow leaf', 'brown leaves', 'brown tips', 'black spots',
    'white spots', 'sticky leaves', 'pale leaves', 'falling leaves', 'dropping leaves',
    'wilting', 'drooping', 'curling', 'dying', 'mushy', 'rotting',
    'spots', 'pests', 'bugs', 'insects', 'fungus', 'mould', 'mold', 'scale',
    'aphids', 'slugs', 'snails', 'caterpillars', 'thrips', 'whitefly',
  ]
  for (const phrase of symptomPhrases) {
    if (q.includes(phrase)) return phrase
  }
  return undefined
}

/**
 * Known plant name variants → canonical display name.
 * Longer patterns are listed first so they match before shorter sub-strings.
 */
const KNOWN_PLANT_PATTERNS: [pattern: string, canonical: string][] = [
  ['bird of paradise',  'Bird of Paradise'],
  ['strelitzia',        'Bird of Paradise'],
  ['renga renga lily',  'Renga Renga Lily'],
  ['renga renga',       'Renga Renga Lily'],
  ['star jasmine',      'Star Jasmine'],
  ['trachelospermum',   'Star Jasmine'],
  ['ficus tuffy',       'Ficus Tuffy'],
  ['ficus tuffi',       'Ficus Tuffy'],
  ['lemon tree',        'Lemon Tree'],
  ['box hedge',         'Buxus'],
  ['boxwood',           'Buxus'],
  ['tree fern',         'Ponga'],
  ['harakeke',          'Flax'],
  ['phormium',          'Flax'],
  ['camellia',          'Camellia'],
  ['griselinia',        'Griselinia'],
  ['buxus',             'Buxus'],
  ['gardenia',          'Gardenia'],
  ['hydrangea',         'Hydrangea'],
  ['lomandra',          'Lomandra'],
  ['clivia',            'Clivia'],
  ['ponga',             'Ponga'],
  ['ficus',             'Ficus'],
  ['citrus',            'Lemon Tree'],
  ['lemon',             'Lemon Tree'],
  ['flax',              'Flax'],
]

/** Return a canonical plant name if one is recognisable in the query, otherwise undefined. */
function extractPlantName(query: string): string | undefined {
  const q = query.toLowerCase()
  for (const [pattern, canonical] of KNOWN_PLANT_PATTERNS) {
    if (q.includes(pattern)) return canonical
  }
  return undefined
}

function keywordRouter(message: string): CoachResponse {
  const q = message.toLowerCase()

  if (SAFETY_KW.some((k) => q.includes(k))) {
    return {
      reply: "Pet and child safety advice is not covered in Pocket Gardener yet. Please check with a vet, poison centre, or trusted plant toxicity source before planting.",
      intent: 'out_of_scope',
      actions: [],
      outOfScope: true,
    }
  }

  if (PROBLEM_KW.some((k) => q.includes(k))) {
    const symptom   = extractSymptom(message)
    const plantName = extractPlantName(message)
    const label     = plantName ? `Diagnose ${plantName}` : 'Diagnose a problem'
    return {
      reply: plantName
        ? `It looks like your ${plantName} may need attention. Open the problem finder to search issues specific to that plant.`
        : "It sounds like your plant may need attention. Use the problem finder to search symptoms and get practical next steps.",
      intent: 'plant_problem',
      actions: [
        {
          label,
          href: '/dashboard#diagnose',
          ...(plantName  ? { plantName }  : {}),
          ...(symptom    ? { initialSearch: symptom } : {}),
        },
        { label: 'Search plant library', href: '/plants' },
      ],
      outOfScope: false,
    }
  }

  if (CARE_KW.some((k) => q.includes(k))) {
    return {
      reply: "Your care tasks are in the Calendar, organised by week and plant type.",
      intent: 'care_task',
      actions: [
        { label: "This week's care tasks", href: '/calendar' },
        { label: 'Open plant guides', href: '/guides' },
      ],
      outOfScope: false,
    }
  }

  if (SUIT_KW.some((k) => q.includes(k))) {
    return {
      reply: "The plant finder can filter by sun, soil, and wind conditions to check suitability for your space.",
      intent: 'plant_suitability',
      actions: [
        { label: 'Check plant suitability', href: '/match?mode=suitability' },
        { label: 'Find suitable plants', href: '/match' },
        { label: 'Open plant library', href: '/plants' },
      ],
      outOfScope: false,
    }
  }

  if (VIS_KW.some((k) => q.includes(k))) {
    return {
      reply: "Upload a photo of your garden and place plant cut-outs to preview how they'd look.",
      intent: 'visualise',
      actions: [
        { label: 'Open Visualise', href: '/visualise' },
        { label: 'Find plants first', href: '/match' },
      ],
      outOfScope: false,
    }
  }

  if (AREA_KW.some((k) => q.includes(k))) {
    return {
      reply: "You can create garden areas for different spots and assign plants to each one.",
      intent: 'garden_area',
      actions: [
        { label: 'Create a garden area', href: '/dashboard#garden-areas' },
        { label: 'Find plants', href: '/match' },
      ],
      outOfScope: false,
    }
  }

  if (FIND_KW.some((k) => q.includes(k))) {
    return {
      reply: "The plant finder helps you choose plants based on your conditions, spot, and style.",
      intent: 'find_plants',
      actions: [
        { label: 'Find plants', href: '/match' },
        { label: 'Preview in Visualise', href: '/visualise' },
      ],
      outOfScope: false,
    }
  }

  return {
    reply: "I can help with choosing plants, plant problems, care tasks, and visual previews. That question isn't covered yet.",
    intent: 'out_of_scope',
    actions: [
      { label: 'Find plants', href: '/match' },
      { label: 'Diagnose a problem', href: '/dashboard#diagnose' },
      { label: 'Open Calendar', href: '/calendar' },
    ],
    outOfScope: true,
  }
}

// ── OpenAI system prompt ──────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Garden Coach, a helpful assistant inside Pocket Gardener — a mobile garden management app for New Zealand gardeners.

Your ONLY role is to understand what the user wants and suggest the best next step inside the app. You do NOT give detailed gardening advice, conclusively diagnose plant diseases, or give any pet/child safety or toxicity advice.

Available app routes (use ONLY these exact strings in "href"):
- /match — Find plants / plant matchmaker
- /match?mode=suitability — Check whether a specific plant suits their conditions
- /plants — Browse plant library
- /calendar — Weekly care tasks
- /guides — Expert guides index
- /guides/planting — Planting guide
- /guides/pests — Pests and diseases guide
- /guides/feeding — Feeding guide
- /guides/weeds — Weeds guide
- /visualise — Upload garden photo and preview plants
- /dashboard#diagnose — Symptom/problem finder
- /dashboard#garden-areas — Create or manage garden areas

Reply ONLY with a JSON object in this exact shape — no markdown, no extra text:
{
  "reply": "1–2 friendly sentences. Be brief.",
  "intent": one of: find_plants | plant_problem | plant_suitability | care_task | visualise | garden_area | guide_lookup | upgrade | out_of_scope,
  "actions": [ { "label": "Short button label", "href": "/exact-route-from-above" } ],
  "outOfScope": false
}
Maximum 3 actions. Use only hrefs from the list above.

Safety rules:
- pet/child safety, toxicity, poisonous plants → intent=out_of_scope, outOfScope=true, reply="Pet and child safety advice is not covered in Pocket Gardener yet. Please check with a vet, poison centre, or trusted plant toxicity source before planting.", actions=[]
- plant symptoms/pests/disease → intent=plant_problem, route to /dashboard#diagnose.
  * If the user mentions a clear symptom (e.g. "yellow leaves", "black spots", "wilting"), include "initialSearch" with just the symptom phrase (max 4 words, e.g. "yellow leaves").
  * If the user mentions a specific plant by name, include "plantName" with the clean plant name (e.g. "Lemon Tree", "Camellia", "Bird of Paradise", "Griselinia", "Buxus", "Hydrangea", "Star Jasmine", "Ficus Tuffy", "Ponga", "Flax", "Clivia", "Lomandra", "Gardenia", "Renga Renga Lily").
  * Label the action with the plant name when known, e.g. "Diagnose Lemon Tree".
  * Examples:
    "lemon tree yellow leaves" → { "label": "Diagnose Lemon Tree", "href": "/dashboard#diagnose", "plantName": "Lemon Tree", "initialSearch": "yellow leaves" }
    "bird of paradise sticky leaves" → { "label": "Diagnose Bird of Paradise", "href": "/dashboard#diagnose", "plantName": "Bird of Paradise", "initialSearch": "sticky leaves" }
    "yellow leaves" → { "label": "Diagnose a problem", "href": "/dashboard#diagnose", "initialSearch": "yellow leaves" }
    "my plant is wilting" → { "label": "Diagnose a problem", "href": "/dashboard#diagnose", "initialSearch": "wilting" }
- which plants to choose → route to /match
- trimming/pruning/feeding/care → route to /calendar or /guides
- previewing plants in photos → route to /visualise
- unknown/out of scope → outOfScope=true, 2–3 general actions`

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (name) => cookieStore.get(name)?.value } },
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const message: string = (body.message ?? '').trim()

    if (!message || message.length < 2) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }
    if (message.length > 500) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(keywordRouter(message))
    }

    const openai = new OpenAI({ apiKey })

    let raw = ''
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        max_tokens: 300,
        temperature: 0.2,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
      })
      raw = completion.choices[0]?.message?.content ?? ''
    } catch (aiErr) {
      console.warn('Garden coach OpenAI error — using keyword fallback:', aiErr)
      return NextResponse.json(keywordRouter(message))
    }

    let parsed: Partial<CoachResponse>
    try {
      parsed = JSON.parse(raw)
    } catch {
      return NextResponse.json(keywordRouter(message))
    }

    // Sanitise AI output — only allow known safe hrefs, pass through safe optional fields
    const safeActions: CoachAction[] = (parsed.actions ?? [])
      .filter(
        (a): a is CoachAction =>
          typeof a === 'object' &&
          a !== null &&
          typeof (a as CoachAction).label === 'string' &&
          typeof (a as CoachAction).href === 'string' &&
          isSafeHref((a as CoachAction).href),
      )
      .map((a) => {
        const action: CoachAction = { label: a.label.slice(0, 60), href: a.href }
        if (typeof a.initialSearch === 'string') action.initialSearch = a.initialSearch.slice(0, 80)
        if (typeof a.plantName === 'string')    action.plantName    = a.plantName.slice(0, 80)
        return action
      })
      .slice(0, 3)

    const response: CoachResponse = {
      reply:      typeof parsed.reply === 'string' ? parsed.reply.slice(0, 400) : '',
      intent:     (parsed.intent as CoachIntent) ?? 'out_of_scope',
      actions:    safeActions,
      outOfScope: parsed.outOfScope === true,
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error('Garden coach unhandled error:', err)
    const fallback: CoachResponse = {
      reply: "I can help with choosing plants, plant problems, care tasks, and visual previews.",
      intent: 'out_of_scope',
      actions: [
        { label: 'Find plants', href: '/match' },
        { label: 'Diagnose a problem', href: '/dashboard#diagnose' },
        { label: 'Open Calendar', href: '/calendar' },
      ],
      outOfScope: false,
    }
    return NextResponse.json(fallback)
  }
}
