"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addUser(formData: FormData) {
  const supabase = await createClient()

  const userData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    role: formData.get("role") as string,
    department: formData.get("department") as string,
    is_active: true,
  }

  const { error } = await supabase.from("users").insert(userData)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/admin")
  return { success: true }
}

export async function updateUser(id: string, formData: FormData) {
  const supabase = await createClient()

  const userData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    role: formData.get("role") as string,
    department: formData.get("department") as string,
  }

  const { error } = await supabase.from("users").update(userData).eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/admin")
  return { success: true }
}

export async function toggleUserStatus(id: string, isActive: boolean) {
  const supabase = await createClient()

  const { error } = await supabase.from("users").update({ is_active: !isActive }).eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/crm/admin")
  return { success: true }
}
