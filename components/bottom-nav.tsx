// components/bottom-nav.tsx
"use client"

import { LayoutDashboard, Trello, Building2, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export function BottomNav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("📍 BottomNav mounted:", pathname)
    
    const fixBottomPosition = () => {
      const nav = navRef.current
      if (!nav) return
      
      // 1. Tüm CSS'yi manuel ayarla
      nav.style.cssText = `
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
        padding-bottom: 0 !important;
        box-shadow: 0 -2px 8px rgba(0,0,0,0.05) !important;
        transform: none !important;
        translate: none !important;
        margin-bottom: 0 !important;
      `
      
      // 2. Viewport'un altında olup olmadığını kontrol et
      const rect = nav.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      console.log("Viewport height:", viewportHeight)
      console.log("Nav bottom position:", rect.bottom)
      
      // 3. Eğer görünmüyorsa, pozisyonu düzelt
      if (rect.bottom > viewportHeight) {
        const offset = rect.bottom - viewportHeight
        console.log("⚠️ Nav viewport'un altında, offset:", offset)
        nav.style.bottom = `-${offset}px`
      }
      
      // 4. Parent container'ları kontrol et
      let parent = nav.parentElement
      while (parent) {
        const styles = window.getComputedStyle(parent)
        
        // Transform/translate kontrolü
        if (styles.transform !== 'none' || styles.translate !== 'none') {
          console.log("⚠️ Parent has transform:", parent)
          parent.style.transform = 'none'
          parent.style.translate = 'none'
        }
        
        // Bottom margin/padding kontrolü
        if (parseInt(styles.marginBottom) > 0 || parseInt(styles.paddingBottom) > 0) {
          parent.style.marginBottom = '0'
          parent.style.paddingBottom = '0'
        }
        
        parent = parent.parentElement
      }
    }
    
    // İlk ayar
    fixBottomPosition()
    
    // Her 500ms'de bir kontrol et
    const interval = setInterval(fixBottomPosition, 500)
    
    return () => clearInterval(interval)
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
      {/* Debug overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#10b981',
        color: 'white',
        padding: '8px',
        fontSize: '12px',
        textAlign: 'center',
        zIndex: 9998,
        fontWeight: 'bold'
      }}>
        📍 BOTTOM NAV TEST - Safe Area: {typeof window !== 'undefined' ? 
          `inset-bottom: ${window.visualViewport?.height ? 
            window.innerHeight - window.visualViewport.height : 'N/A'}` : 'Loading...'}
      </div>

      {/* Bottom Navigation */}
      <div 
        ref={navRef}
        className="bottom-nav"
        style={{
          // Inline fallback
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '68px',
          background: 'white',
          borderTop: '1px solid #e2e8f0',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '0 8px',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.05)'
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
          
          return (
            <Link
              key={item.id}
              href={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 12px',
                textDecoration: 'none',
                color: isActive ? '#7c3aed' : '#94a3b8',
                background: isActive ? '#f5f3ff' : 'transparent',
                borderRadius: '12px',
                minWidth: '60px',
                transition: 'all 0.2s ease',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2}
                style={{
                  color: isActive ? '#7c3aed' : '#94a3b8'
                }}
              />
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  marginTop: '4px'
                }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
      
      {/* Content Spacer - FIXED height */}
      <div style={{ height: '68px', display: 'block' }} />
    </>
  )
}
