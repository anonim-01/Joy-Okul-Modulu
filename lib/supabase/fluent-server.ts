import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/lib/types/fluent-crm-database"

export async function createFluentCRMServerClient() {
  const cookieStore = await cookies()

  const url = process.env.SUPABASE_URL!
  const key = process.env.SUPABASE_ANON_KEY!

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server component, ignore
        }
      },
    },
  })
}
