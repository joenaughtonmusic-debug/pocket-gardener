/**
 * Infer and enrich supplies/tools for calendar tasks and sick-plant remedies.
 * Fills gaps when DB tags are missing or too generic (e.g. seaweed-only for magnesium).
 */

export function prettySupplyTag(tag: string): string {
  return tag.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

function combinedText(parts: (string | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ').toLowerCase()
}

function tagsInclude(tags: Iterable<string>, needles: string[]): boolean {
  const lower = Array.from(tags).map((t) => t.toLowerCase())
  return needles.some((n) => lower.some((t) => t.includes(n)))
}

function isCitrusPlant(name: string | null | undefined): boolean {
  if (!name) return false
  const lower = name.toLowerCase()
  return ['lemon', 'lime', 'mandarin', 'orange', 'grapefruit', 'citrus', 'meyer'].some((k) =>
    lower.includes(k)
  )
}

export function hedgeTrimTools(lengthMetres?: number | null): string[] {
  const tools = ['Hedge Shears', 'Secateurs']
  if (lengthMetres != null && lengthMetres >= 3) {
    tools.push('Pole Hedge Trimmer')
  }
  return tools
}

export function inferToolsFromCareNote(
  note: string,
  opts?: { taskCategory?: string; taskType?: string }
): string[] {
  const lower = note.toLowerCase()
  const tools = new Set<string>()
  const category = (opts?.taskCategory || '').toLowerCase()
  const taskType = (opts?.taskType || '').toLowerCase()

  if (category === 'hedge' && (taskType === 'trim' || taskType === 'prune' || lower.includes('hedge'))) {
    hedgeTrimTools().forEach((t) => tools.add(t))
  }

  if (lower.includes('prune') || lower.includes('trim') || lower.includes('cut back')) {
    tools.add('Secateurs')
  }

  if (lower.includes('hedge')) {
    tools.add('Hedge Shears')
  }

  if (lower.includes('spray') || lower.includes('fungicide') || lower.includes('pest')) {
    tools.add('Garden Sprayer')
  }

  if (lower.includes('mulch')) {
    tools.add('Gloves')
  }

  return Array.from(tools)
}

export function inferShoppingFromCareNote(note: string, plantName?: string | null): string[] {
  const lower = note.toLowerCase()
  const shopping = new Set<string>()

  if (lower.includes('feed') || lower.includes('fertilis')) {
    shopping.add('Granular Fertiliser')
  }

  if (lower.includes('slug') || lower.includes('snail')) {
    shopping.add('Slug Pellets')
  }

  if (
    plantName &&
    isCitrusPlant(plantName) &&
    (lower.includes('feed') || lower.includes('spring') || lower.includes('magnesium'))
  ) {
    shopping.add('Citrus Fertiliser')
    shopping.add('Epsom Salts')
  }

  if (lower.includes('magnesium') || (lower.includes('yellow') && lower.includes('leaf'))) {
    shopping.add('Epsom Salts')
    if (isCitrusPlant(plantName)) {
      shopping.add('Citrus Fertiliser')
    }
  }

  return Array.from(shopping)
}

export function enrichShoppingForIssue(ctx: {
  issue?: string | null
  remedy?: string | null
  plantName?: string | null
  existing?: string[] | null
}): string[] {
  const result = new Set((ctx.existing ?? []).map(prettySupplyTag))
  const text = combinedText([ctx.issue, ctx.remedy, ctx.plantName])

  // Citrus yellow leaves / magnesium — prefer specific feed over seaweed-only advice.
  if (
    text.includes('yellow') ||
    text.includes('magnesium') ||
    text.includes('chloros') ||
    text.includes('interveinal')
  ) {
    if (isCitrusPlant(ctx.plantName) || text.includes('citrus') || text.includes('lemon')) {
      if (!tagsInclude(result, ['epsom', 'magnesium'])) result.add('Epsom Salts')
      if (!tagsInclude(result, ['citrus fertiliser', 'citrus feed'])) result.add('Citrus Fertiliser')
    } else if (!tagsInclude(result, ['epsom', 'magnesium', 'fertiliser'])) {
      result.add('Epsom Salts')
    }
  }

  // Sticky leaves / scale — pest oil treatment, not generic tonic alone.
  if (
    text.includes('scale') ||
    text.includes('sticky') ||
    (text.includes('sap') && (text.includes('insect') || text.includes('bug')))
  ) {
    if (!tagsInclude(result, ['oil', 'neem', 'insecticidal', 'horticultural'])) {
      result.add('Horticultural Oil')
    }
  }

  // Powdery mildew / white coating on leaves.
  if (
    text.includes('mildew') ||
    text.includes('powdery') ||
    text.includes('white powder') ||
    text.includes('white spot') ||
    (text.includes('fungal') && text.includes('leaf'))
  ) {
    if (!tagsInclude(result, ['fungicide', 'fungal', 'mildew'])) {
      result.add('Fungicide Spray')
    }
  }

  // General chewing/sucking pests.
  if (
    (text.includes('aphid') ||
      text.includes('mite') ||
      text.includes('thrip') ||
      text.includes('mealybug')) &&
    !tagsInclude(result, ['oil', 'neem', 'insecticidal', 'spray'])
  ) {
    result.add('Neem Oil')
  }

  return Array.from(result)
}

export function enrichToolsForIssue(ctx: {
  issue?: string | null
  remedy?: string | null
  shopping?: string[]
}): string[] {
  const tools = new Set<string>()
  const text = combinedText([ctx.issue, ctx.remedy])
  const shopping = ctx.shopping ?? []

  if (
    tagsInclude(shopping, ['spray', 'oil', 'neem', 'fungicide', 'insecticidal']) ||
    text.includes('spray') ||
    text.includes('scale') ||
    text.includes('mildew') ||
    text.includes('aphid') ||
    text.includes('fungal')
  ) {
    tools.add('Garden Sprayer')
  }

  if (text.includes('prune') || text.includes('trim') || text.includes('cut back')) {
    tools.add('Secateurs')
  }

  return Array.from(tools)
}

/** Sick-plant calendar note — ties back to the logged issue/remedy with a standard follow-up prompt. */
export function buildSickFollowUpNote(
  issue?: string | null,
  remedy?: string | null
): string {
  let lead = 'This plant needs attention.'
  if (issue?.trim() && remedy?.trim()) {
    lead = `${issue.trim()} — ${remedy.trim()}`
  } else if (issue?.trim()) {
    lead = issue.trim()
  } else if (remedy?.trim()) {
    lead = remedy.trim()
  }

  return `${lead} Check whether it has improved. Repeat treatment if needed, or mark as recovered when better.`
}

export function mergeRuleTaskTools(
  ruleTools: string[],
  taskCategory: string,
  taskType: string,
  lengthMetres?: number | null
): string[] {
  const category = taskCategory.toLowerCase()
  const type = taskType.toLowerCase()

  if (category === 'hedge' && (type === 'trim' || type === 'prune')) {
    return Array.from(new Set([...ruleTools, ...hedgeTrimTools(lengthMetres)]))
  }

  if (ruleTools.length > 0) return ruleTools

  return inferToolsFromCareNote('', { taskCategory: category, taskType: type })
}
