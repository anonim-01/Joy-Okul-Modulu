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
    <nav className="bottom-nav">
      <div className="nav-container">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <Link key={item.id} href={item.path} className={`nav-item ${isActive ? "active" : ""}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="nav-label">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
