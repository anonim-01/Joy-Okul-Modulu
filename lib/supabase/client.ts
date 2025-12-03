import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (client) return client

  const urlKey = "NEXT_PUBLIC" + "_CMRSUPABASE" + "_URL"
  const anonKey = "NEXT_PUBLIC" + "_CMRSUPABASE" + "_ANON_KEY"

  const url = process.env[urlKey]!
  const key = process.env[anonKey]!

  client = createBrowserClient(url, key)

  return client
}

export function getSupabase() {
  if (typeof window === "undefined") {
    throw new Error("Supabase client can only be used in the browser")
  }
  return createClient()
}

// Keep named export for backwards compatibility but make it lazy
export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient>, {
  get(target, prop) {
    return getSupabase()[prop as keyof ReturnType<typeof createBrowserClient>]
  },
})
