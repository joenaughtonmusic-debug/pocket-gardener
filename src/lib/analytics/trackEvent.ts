import { createSupabaseBrowserClient } from '../../app/lib/supabaseClient'

export type AppEventName =
  | 'visualise_created'
  | 'quick_preview_saved'
  | 'plant_added_to_preview'
  | 'future_plant_saved'
  | 'plant_added_to_garden'
  | 'calendar_task_completed'
  | 'plant_problem_searched'
  | 'guide_opened'
  | 'upgrade_clicked'
  | 'garden_coach_option_clicked'
  | 'garden_coach_question_submitted'

export interface AppEventMetadata {
  plant_name?: string
  route?: string
  overlay_count?: number
  preview_mode?: string
  source?: string
  task_type?: string
  guide_name?: string
  option?: string
  intent?: string
}

/**
 * Fire-and-forget analytics event. Failures are silently swallowed so they
 * never break the app. Does NOT store photo URLs, user messages, or private notes.
 */
export async function trackEvent(
  eventName: AppEventName,
  metadata?: AppEventMetadata,
): Promise<void> {
  try {
    const supabase = createSupabaseBrowserClient()
    // getSession reads from local storage — no network round-trip.
    const { data: { session } } = await supabase.auth.getSession()

    await supabase.from('app_events').insert({
      user_id:    session?.user?.id ?? null,
      event_name: eventName,
      metadata:   metadata ?? null,
    })
  } catch {
    // Never surface analytics errors to the user.
  }
}
