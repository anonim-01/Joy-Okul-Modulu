"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { VisitInsert, VisitUpdate } from "@/lib/types/database"

export async function addVisit(formData: FormData) {
  const supabase = await createClient()

  const visitData: VisitInsert = {
    school_id: formData.get("school_id") as string,
    visitor_id: formData.get("visitor_id") as string,
    visit_date: formData.get("visit_date") as string,
    visit_type: formData.get("visit_type") as any,
    status: formData.get("status") as any,
    summary: formData.get("summary") as string,
    findings: formData.get("findings") as string,
    action_items: formData.get("action_items") as string,
    next_steps: formData.get("next_steps") as string,
    participants: formData.get("participants")
      ? (formData.get("participants") as string).split(",").map((p) => p.trim())
      : null,
  }

  const { error } = await supabase.from("visits").insert(visitData)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/visits")
  return { success: true }
}

export async function updateVisit(id: string, formData: FormData) {
  const supabase = await createClient()

  const visitData: VisitUpdate = {
    school_id: formData.get("school_id") as string,
    visitor_id: formData.get("visitor_id") as string,
    visit_date: formData.get("visit_date") as string,
    visit_type: formData.get("visit_type") as any,
    status: formData.get("status") as any,
    summary: formData.get("summary") as string,
    findings: formData.get("findings") as string,
    action_items: formData.get("action_items") as string,
    next_steps: formData.get("next_steps") as string,
    participants: formData.get("participants")
      ? (formData.get("participants") as string).split(",").map((p) => p.trim())
      : null,
  }

  const { error } = await supabase.from("visits").update(visitData).eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/visits")
  return { success: true }
}

export async function deleteVisit(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("visits").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/visits")
  return { success: true }
}
