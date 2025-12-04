import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!url || !key) {
    const errorMsg =
      "Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel project variables."
    console.error("[v0]", errorMsg)
    throw new Error(errorMsg)
  }

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
