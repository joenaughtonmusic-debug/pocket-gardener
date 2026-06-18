/**
 * Master plant catalog record from the `plants` table.
 * All fields beyond `id` and `common_name` are optional because different
 * queries select different column subsets.
 */
export interface Plant {
  id: number;
  common_name: string;
  scientific_name?: string | null;
  botanical_name?: string | null;
  plant_type?: string | null;
  task_category?: string | null;
  image_url?: string | null;
  is_native?: boolean | null;
  is_star_performer?: boolean | null;
  flower_color?: string | null;
  hardiness_level?: string | null;
  maintenance_level?: string | null;
  description?: string | null;
  overview?: string | null;
  pro_tip?: string | null;
  trim_notes?: string | null;
  feed_notes?: string | null;
  health_notes?: string | null;
  trim_cycle?: number | null;
  feed_cycle?: number | null;
  // Postgres array columns — returned as string[] by Supabase, but may arrive
  // as a raw JSON string in some query paths.
  sun_requirement?: string | string[] | null;
  soil_type?: string | string[] | null;
  water_behavior?: string | string[] | null;
  mature_size?: string | string[] | null;
  slope_suitability?: string | string[] | null;
  /** Direct style tags, e.g. ['Formal','Coastal','Low Maintenance']. Set via seed/admin. */
  style_tags?: string[] | null;
}
