"use client"

import { LayoutDashboard, Trello, Building2, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { id: "panel", label: "Panel", icon: LayoutDashboard, path: "/crm/dashboard" },
  { id: "kanban", label: "Kanban", icon: Trello, path: "/crm/kanban" },
  { id: "kurum", label: "Kurum", icon: Building2, path: "/crm/schools" },
  { id: "rapor", label: "Rapor", icon: BarChart3, path: "/crm/reports" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-[9999] safe-bottom">
      <div className="flex items-center justify-around px-2 py-2 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 min-w-[70px] ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
