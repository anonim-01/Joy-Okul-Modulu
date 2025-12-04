"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const supabase = createClient()

        // Get the code from URL
        const code = new URLSearchParams(window.location.search).get("code")

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            console.error("[v0] Error exchanging code:", error)
            router.push("/auth/error")
            return
          }
        }

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
          router.push("/crm/dashboard")
          router.refresh()
        } else {
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
