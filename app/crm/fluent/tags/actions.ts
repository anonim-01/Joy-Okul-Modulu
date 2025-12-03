"use server"

import { createFluentCRMServerClient } from "@/lib/supabase/fluent-server"
import { revalidatePath } from "next/cache"

export async function createTag(formData: FormData) {
  const supabase = await createFluentCRMServerClient()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

  const { data, error } = await supabase
    .from("fc_tags")
    .insert({
      title,
      description,
      slug,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Tag creation error:", error)
    return { error: error.message }
  }

  revalidatePath("/crm/fluent/tags")
  return { success: true, data }
}
