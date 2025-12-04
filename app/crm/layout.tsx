// app/crm/layout.tsx
"use client"

import type React from "react"
import { BottomNav } from "@/components/bottom-nav"
import { useEffect } from "react"

export default function CrmLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    // Body ve html elementlerini düzelt
    document.body.style.cssText = `
      margin: 0 !important;
      padding: 0 !important;
      overflow-x: hidden !important;
      position: relative !important;
      min-height: 100vh !important;
    `
    
    document.documentElement.style.cssText = `
      margin: 0 !important;
      padding: 0 !important;
      overflow-x: hidden !important;
    `
    
    // Viewport height'i kontrol et
    const updateViewport = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    
    updateViewport()
    window.addEventListener('resize', updateViewport)
    
    return () => {
      window.removeEventListener('resize', updateViewport)
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      position: 'relative',
      paddingBottom: '0', // Bottom nav için padding KALDIRILDI
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* İçerik - flex-grow ile genişlesin */}
      <div style={{ flex: 1, paddingBottom: '0' }}>
        {children}
      </div>
      
      {/* Bottom nav - fixed ve viewport'a yapışık */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: '68px'
      }}>
        <BottomNav />
      </div>
      
      {/* JavaScript ile pozisyon kontrolü */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Viewport height hesapla
            function setViewportHeight() {
              let vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
            }
            
            // Bottom nav pozisyonunu düzelt
            function fixBottomNav() {
              const nav = document.querySelector('.bottom-nav');
              if (!nav) return;
              
              // Viewport'a göre pozisyon ayarla
              const viewportHeight = window.innerHeight;
              const navRect = nav.getBoundingClientRect();
              
              // Eğer nav viewport'un altındaysa
              if (navRect.bottom > viewportHeight) {
                const diff = navRect.bottom - viewportHeight;
                nav.style.bottom = (parseInt(nav.style.bottom || '0') - diff) + 'px';
              }
              
              // Eğer nav viewport'un üstündeyse
              if (navRect.top < viewportHeight - 68) {
                nav.style.bottom = '0px';
              }
            }
            
            // Event listeners
            setViewportHeight();
            fixBottomNav();
            
            window.addEventListener('resize', function() {
              setViewportHeight();
              fixBottomNav();
            });
            
            window.addEventListener('scroll', fixBottomNav);
            
            // Her saniye kontrol et
            setInterval(fixBottomNav, 1000);
          })();
        `
      }} />
    </div>
  )
}
