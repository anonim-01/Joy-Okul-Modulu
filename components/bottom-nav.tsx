// components/bottom-nav.tsx
"use client"

import { LayoutDashboard, Trello, Building2, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function BottomNav() {
  const pathname = usePathname()

  useEffect(() => {
    console.log("📍 BottomNav pathname:", pathname)
    
    // Elementi manuel olarak kontrol et
    const nav = document.querySelector('.bottom-nav')
    if (nav) {
      console.log("✅ BottomNav element found")
      
      // Force show
      const htmlElement = nav as HTMLElement
      htmlElement.style.cssText = `
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 68px !important;
        background: white !important;
        border-top: 1px solid #e2e8f0 !important;
        z-index: 9999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-around !important;
        padding: 0 8px !important;
        padding-bottom: env(safe-area-inset-bottom, 0px) !important;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05) !important;
        visibility: visible !important;
        opacity: 1 !important;
      `
    } else {
      console.log("❌ BottomNav element NOT found")
    }
  }, [pathname])

  const navItems = [
    { 
      id: "panel", 
      label: "Panel", 
      icon: LayoutDashboard, 
      path: "/crm/dashboard",
    },
    { 
      id: "kanban", 
      label: "Kanban", 
      icon: Trello, 
      path: "/crm/kanban",
    },
    { 
      id: "kurum", 
      label: "Kurum", 
      icon: Building2, 
      path: "/crm/schools",
    },
    { 
      id: "rapor", 
      label: "Rapor", 
      icon: BarChart3, 
      path: "/crm/reports",
    },
  ]

  return (
    <>
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#ef4444',
          color: 'white',
          padding: '4px',
          fontSize: '12px',
          textAlign: 'center',
          zIndex: 10000
        }}>
          BottomNav Test - Path: {pathname}
        </div>
      )}

      <nav className="bottom-nav">
        <div className="nav-container">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path || 
                            pathname.startsWith(item.path + '/')
            
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="nav-label">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
      
      {/* Content spacer */}
      <div style={{ height: '68px' }} />
    </>
  )
}
