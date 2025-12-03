"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { ProposalInsert } from "@/lib/types/database"

export async function addProposal(formData: FormData) {
  const supabase = await createClient()

  // Generate unique code
  const code = `PRO-${Date.now()}`

  const proposalData: ProposalInsert = {
    school_id: formData.get("school_id") as string,
    title: formData.get("title") as string,
    code,
    status: formData.get("status") as any,
    amount: formData.get("amount") ? Number.parseFloat(formData.get("amount") as string) : null,
    currency: (formData.get("currency") as string) || "TRY",
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
