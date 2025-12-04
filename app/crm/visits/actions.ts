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

  const { data: visit, error } = await supabase.from("visits").insert(visitData).select().single()

  if (error) {
    throw new Error(error.message)
  }

  const productsJson = formData.get("products") as string
  if (productsJson && visit) {
    try {
      const productIds = JSON.parse(productsJson) as string[]
      const visitProducts = productIds.map((productId) => ({
        visit_id: visit.id,
        product_id: productId,
      }))
      await supabase.from("visit_products").insert(visitProducts)
    } catch (e) {
      console.error("[v0] Failed to add visit products:", e)
    }
  }

  const participantsStr = formData.get("participants") as string
  if (participantsStr && visit) {
    const names = participantsStr
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n)
    for (const fullName of names) {
      const words = fullName.split(" ").filter((w) => w)
      if (words.length >= 2 && words.length <= 3) {
        const firstName = words[0]
        const lastName = words.length === 3 ? words[2] : words[1]
        const middleName = words.length === 3 ? words[1] : null

        // Insert or get participant
        const { data: participant } = await supabase
          .from("participants")
          .insert({ full_name: fullName, first_name: firstName, middle_name: middleName, last_name: lastName })
          .select()
          .single()

        if (participant) {
          await supabase.from("visit_participants").insert({
            visit_id: visit.id,
            participant_id: participant.id,
          })
        }
      }
    }
  }

  const assigneesJson = formData.get("assignees") as string
  if (assigneesJson && visit) {
    try {
      const userIds = JSON.parse(assigneesJson) as string[]
      const assignees = userIds.map((userId) => ({
        visit_id: visit.id,
        user_id: userId,
      }))
      await supabase.from("assignees").insert(assignees)
    } catch (e) {
      console.error("[v0] Failed to add assignees:", e)
    }
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
