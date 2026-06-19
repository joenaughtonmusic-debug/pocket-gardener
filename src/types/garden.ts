import type { Plant } from './plants';

/**
 * A named garden area belonging to a user — a row from `garden_areas`.
 * Stores the five matchmaker conditions so recommendations can be regenerated.
 */
export interface GardenArea {
  id: string;
  user_id: string;
  name: string;
  sun_condition: string | null;
  soil_condition: string | null;
  water_condition: string | null;
  size_condition: string | null;
  slope_condition: string | null;
  notes: string | null;
  style: string | null;
  goal: string | null;
  created_at: string;
}

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
  current_issue?: string | null;
  current_remedy?: string | null;
  current_shopping_tags?: string[] | null;
  garden_area_id?: string | null;
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
 * pro_source values:    'stripe' | 'revenuecat_apple' | 'revenuecat_google' | 'manual'
 * subscription_status:  'free' | 'active' | 'canceled' | 'past_due' | 'expired'
 *   'canceled' → user cancelled but is still within the paid period (is_pro stays true)
 *   'expired'  → paid period ended; is_pro is false
 */
export interface Profile {
  id: string;
  is_pro: boolean;
  stripe_customer_id?: string | null;
  pro_source?: 'stripe' | 'revenuecat_apple' | 'revenuecat_google' | 'manual' | null;
  pro_expires_at?: string | null;
  subscription_status?: 'free' | 'active' | 'canceled' | 'past_due' | 'expired';
}
