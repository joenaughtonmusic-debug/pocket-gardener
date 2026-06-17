/**
 * Projection of the `plants` table columns selected by the calendar query.
 * All fields are nullable because the Supabase join may return null for
 * any column when the row exists but a column is unset.
 */
export type PlantRow = {
  id: number;
  common_name: string | null;
  plant_type: string | null;
  task_category: string | null;
  maintenance_level: string | null;
  trim_cycle: number | null;
  feed_cycle: number | null;
  trim_notes: string | null;
  feed_notes: string | null;
};

/**
 * A row from `user_plants` with the nested plant projection used in the calendar.
 */
export type UserPlantRow = {
  id: number;
  quantity: number | null;
  length_metres: number | null;
  nickname: string | null;
  personal_notes: string | null;
  is_sick: boolean | null;
  current_issue: string | null;
  current_remedy: string | null;
  current_shopping_tags: string[] | null;
  plants: PlantRow | null;
};

/**
 * A row from `auckland_monthly_care`.
 */
export type MonthlyCareRow = {
  id: number;
  month_number: number;
  plant_type: string | null;
  care_note: string | null;
};

/**
 * A row from `plant_task_rules` — the rule engine driving the calendar agenda.
 */
export type TaskRuleRow = {
  id: number;
  plant_category: string | null;
  task_type: string | null;
  trigger_type: string | null;
  trigger_month: number | null;
  frequency_per_year: number | null;
  base_priority: number | null;
  estimated_minutes: number | null;
  tool_tags: string[] | null;
  shopping_tags: string[] | null;
};

/**
 * A row from `user_task_status` — records whether a task was completed in a given week.
 */
export type TaskStatusRow = {
  task_key: string;
  is_done: boolean;
};

/**
 * A resolved task candidate ready to display in the weekly agenda.
 */
export type TaskCandidate = {
  id: string;
  title: string;
  note: string;
  taskType: string;
  score: number;
  urgency: 'must' | 'should' | 'could';
  minutes: number;
  tools: string[];
  shopping: string[];
  isGeneral?: boolean;
  canBundle: boolean;
};
