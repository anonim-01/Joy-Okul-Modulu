"use client"

import type React from "react"
import { useState } from "react"
import { TransitionLink } from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import { Menu, X, LayoutDashboard, School, ClipboardList, FileText, Settings, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { icon: Home, label: "Ana Sayfa", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/crm/dashboard" },
    { icon: School, label: "Okul Yönetimi", href: "/crm/schools" },
    { icon: ClipboardList, label: "Ziyaret Takibi", href: "/crm/visits" },
    { icon: FileText, label: "Teklif Yönetimi", href: "/crm/proposals" },
    { icon: FileText, label: "Raporlar", href: "/crm/reports" },
    { icon: Settings, label: "Sistem Yönetimi", href: "/crm/admin" },
  ]

  return (
    <div className="min-h-screen bg-[#fef9f6] pt-24">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-24 left-4 z-50 lg:hidden bg-white shadow-lg border-gray-300"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          "fixed top-24 left-0 h-[calc(100vh-6rem)] bg-white shadow-xl z-40 transition-transform duration-300 ease-in-out",
          "w-72 border-r border-gray-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <nav className="p-6 space-y-3">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 drop-shadow-sm">CRM Menü</h2>
          </div>
          {menuItems.map((item) => (
            <TransitionLink key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors shadow-sm py-6 text-base"
                onClick={() => {
                  if (window.innerWidth < 1024) setSidebarOpen(false)
                }}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium drop-shadow-sm">{item.label}</span>
              </Button>
            </TransitionLink>
          ))}
        </nav>
      </aside>

      <div className={cn("transition-all duration-300 ease-in-out p-4 lg:p-8 min-h-[calc(100vh-6rem)]", "lg:ml-72")}>
        {children}
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden top-24" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
