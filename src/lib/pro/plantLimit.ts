/** Free tier: max owned garden plants (not future-project entries). */
export const FREE_PLANT_LIMIT = 3

export const PLANT_LIMIT_MESSAGE =
  'Garden limit reached — free accounts can track up to 3 plants in My Garden. Upgrade to Pro for unlimited plants.'

export const PLANT_LIMIT_UPGRADE_HREF = '/dashboard#pro-upgrade'

export function isAtFreePlantLimit(count: number | null, isPro: boolean): boolean {
  if (isPro) return false
  return count !== null && count >= FREE_PLANT_LIMIT
}
