"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      console.log("[v0] Auth callback page loaded")

      try {
        const supabase = createClient()

        // Get the code from URL
        const code = new URLSearchParams(window.location.search).get("code")
        console.log("[v0] Auth code present:", !!code)

        if (code) {
          // Exchange the code for a session
          const { error } = await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            console.error("[v0] Error exchanging code:", error)
            router.push("/auth/error")
            return
          }
        }

        // Check if user is authenticated
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("[v0] Session error:", sessionError)
          router.push("/auth/error")
          return
        }

        if (session) {
          console.log("[v0] Session found, redirecting to dashboard")
          router.push("/crm/dashboard")
        } else {
          console.log("[v0] No session, redirecting to login")
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("[v0] Callback error:", error)
        router.push("/auth/error")
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-4 text-gray-400">Giriş yapılıyor...</p>
      </div>
    </div>
  )
}
