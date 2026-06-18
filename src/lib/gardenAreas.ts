/** Label for plants/projects not linked to a named garden area */
export const GENERAL_GARDEN_LABEL = 'General Garden'

export function resolveAreaName(
  gardenAreaId: string | null | undefined,
  areaMap: Map<string, string>,
): string {
  if (!gardenAreaId) return GENERAL_GARDEN_LABEL
  return areaMap.get(gardenAreaId) ?? 'Unassigned'
}
