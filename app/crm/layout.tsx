"use client"

import type { ReactNode } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { Toaster } from "@/components/ui/sonner"

export default function CRMLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-container relative">
      <div className="app-content pb-20">{children}</div>
      <BottomNav />
      <Toaster position="top-center" />
    </div>
  )
}
