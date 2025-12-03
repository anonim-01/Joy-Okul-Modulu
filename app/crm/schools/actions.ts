"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addSchool(formData: FormData) {
  const supabase = await createClient()

  const schoolData = {
    name: formData.get("name") as string,
    neighborhood: formData.get("neighborhood") as string,
    type: formData.get("type") as string,
    category: formData.get("category") as string,
    manager: formData.get("manager") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    student_count: Number.parseInt(formData.get("student_count") as string) || 0,
    status: "new",
    visit_status: "none",
  }

  const { data, error } = await supabase.from("schools").insert([schoolData]).select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/schools")
  return { success: true, data }
}

export async function updateSchool(id: number, formData: FormData) {
  const supabase = await createClient()

  const schoolData = {
    name: formData.get("name") as string,
    neighborhood: formData.get("neighborhood") as string,
    type: formData.get("type") as string,
    category: formData.get("category") as string,
    manager: formData.get("manager") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    student_count: Number.parseInt(formData.get("student_count") as string) || 0,
    status: formData.get("status") as string,
    visit_status: formData.get("visit_status") as string,
    notes: formData.get("notes") as string,
    deficiencies: formData.get("deficiencies") as string,
  }

  const { data, error } = await supabase.from("schools").update(schoolData).eq("id", id).select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/schools")
  return { success: true, data }
}

export async function deleteSchool(id: number) {
  const supabase = await createClient()

  const { error } = await supabase.from("schools").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/schools")
  return { success: true }
}
