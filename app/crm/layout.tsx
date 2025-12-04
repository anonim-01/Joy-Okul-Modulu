"use client"

import type { ReactNode } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { Toaster } from "@/components/ui/sonner"

export default function CRMLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="overflow-y-auto h-screen">
        <div className="p-4 pb-24">{children}</div>
      </div>

      <BottomNav />
      <Toaster position="top-center" />
    </div>
  )
}
