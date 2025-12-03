"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addProposal(formData: FormData) {
  const supabase = await createClient()

  const proposalData = {
    school_id: formData.get("school_id") as string,
    title: formData.get("title") as string,
    code: formData.get("code") as string,
    status: formData.get("status") as string,
    amount: formData.get("amount") ? Number.parseFloat(formData.get("amount") as string) : null,
    currency: formData.get("currency") as string,
    validity_date: formData.get("validity_date") as string,
    start_date: formData.get("start_date") as string,
    end_date: formData.get("end_date") as string,
    duration_days: formData.get("duration_days") ? Number.parseInt(formData.get("duration_days") as string) : null,
    payment_terms: formData.get("payment_terms") as string,
    warranty: formData.get("warranty") as string,
  }

  const { error } = await supabase.from("proposals").insert(proposalData)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/proposals")
  return { success: true }
}
