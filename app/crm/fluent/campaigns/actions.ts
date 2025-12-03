"use server"

import { createFluentCRMServerClient } from "@/lib/supabase/fluent-server"
import { revalidatePath } from "next/cache"

export async function createCampaign(formData: FormData) {
  const supabase = await createFluentCRMServerClient()

  const title = formData.get("title") as string
  const type = formData.get("type") as string
  const emailSubject = formData.get("emailSubject") as string
  const emailPreHeader = formData.get("emailPreHeader") as string
  const emailBody = formData.get("emailBody") as string
  const status = formData.get("status") as string

  const { data, error } = await supabase
    .from("fc_campaigns")
    .insert({
      title,
      type,
      email_subject: emailSubject,
      email_pre_header: emailPreHeader,
      email_body: emailBody,
      status,
      recipients_count: 0,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Campaign creation error:", error)
    return { error: error.message }
  }

  revalidatePath("/crm/fluent/campaigns")
  return { success: true, data }
}
