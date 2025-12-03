"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { SchoolInsert, SchoolUpdate } from "@/lib/types/database"

export async function addSchool(formData: FormData) {
  const supabase = await createClient()

  // Generate unique code
  const code = `SCH-${Date.now()}`

  const schoolData: SchoolInsert = {
    name: formData.get("name") as string,
    code,
    neighborhood: formData.get("neighborhood") as string,
    type: formData.get("type") as any,
    category: formData.get("category") as any,
    manager_name: formData.get("manager_name") as string,
    manager_phone: formData.get("manager_phone") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    student_count: formData.get("student_count") ? Number.parseInt(formData.get("student_count") as string) : null,
    status: "NEW",
    visit_status: "NONE",
  }

  const { data, error } = await supabase.from("schools").insert([schoolData]).select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/schools")
  return { success: true, data }
}

export async function updateSchool(id: string, formData: FormData) {
  const supabase = await createClient()

  const schoolData: SchoolUpdate = {
    name: formData.get("name") as string,
    neighborhood: formData.get("neighborhood") as string,
    type: formData.get("type") as any,
    category: formData.get("category") as any,
    manager_name: formData.get("manager_name") as string,
    manager_phone: formData.get("manager_phone") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    student_count: formData.get("student_count") ? Number.parseInt(formData.get("student_count") as string) : null,
    status: formData.get("status") as any,
    visit_status: formData.get("visit_status") as any,
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

export async function deleteSchool(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("schools").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/schools")
  return { success: true }
}
