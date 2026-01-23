'use server'

import { createSupabaseServer } from "../../supabaseServer";
import { revalidatePath } from "next/cache";

// Action to Add a Plant
export async function addToGarden(plantId: string) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Not authenticated" };

  // 1. Check if this plant is already in the user's garden
  const { data: existing } = await supabase
    .from("user_plants")
    .select("id")
    .eq("user_id", user.id)
    .eq("plant_id", plantId)
    .single();

  if (existing) {
    return { success: false, error: "This plant is already in your garden!" };
  }

  // 2. If not, add it
  const { error } = await supabase
    .from("user_plants")
    .insert([
      { user_id: user.id, plant_id: plantId }
    ]);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/plants/${plantId}`);
  return { success: true };
}

// Action to Remove a Plant
export async function removeFromGarden(plantId: string) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("user_plants")
    .delete()
    .eq("user_id", user.id)
    .eq("plant_id", plantId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/plants/${plantId}`);
  return { success: true };
}