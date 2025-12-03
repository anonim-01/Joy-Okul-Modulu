import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/lib/types/fluent-crm-database"

let client: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createFluentCRMClient() {
  if (client) return client

  const urlKey = "NEXT_PUBLIC" + "_CMRSUPABASE" + "_URL"
  const anonKey = "NEXT_PUBLIC" + "_CMRSUPABASE" + "_ANON_KEY"

  const url = process.env[urlKey]!
  const key = process.env[anonKey]!

  client = createBrowserClient<Database>(url, key)

  return client
}
