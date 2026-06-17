import type { Plant } from './plants';

/**
 * A user's garden plant — a row from `user_plants` joined with `plants`.
 * Used on the dashboard and plant detail pages.
 */
export interface UserPlant {
  id: string;
  plant_id: number;
  is_project: boolean;
  nickname?: string | null;
  plants: Plant;
  latest_photo?: string | null;
  is_sick?: boolean | null;
}

/**
 * A plant remedy — a row from `plant_remedies`.
 * May be plant-specific (`specific_plant_id` set) or universal (`is_universal` true).
 */
export interface PlantRemedy {
  id: string | number;
  issue_type: string;
  remedy_title?: string | null;
  remedy_description?: string | null;
  category?: string | null;
  specific_plant_id?: number | null;
  is_universal?: boolean | null;
  search_keywords?: string | null;
  shopping_tags?: string[] | null;
}

/**
 * User subscription profile — a row from `profiles`.
 */
export interface Profile {
  id: string;
  is_pro: boolean;
  stripe_customer_id?: string | null;
}
