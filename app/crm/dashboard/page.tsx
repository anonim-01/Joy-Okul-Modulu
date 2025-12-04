"use client"

import { CRMDashboardClient } from "@/components/crm/dashboard-client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    schoolsCount: 0,
    visitsCount: 0,
    proposalsCount: 0,
    wonCount: 0,
    lostCount: 0,
    todayVisitsCount: 0,
    recentVisits: [] as any[],
  })

  useEffect(() => {
    // Debug için viewport bilgisi
    console.log("📱 Viewport height:", window.innerHeight)
    console.log("📄 Document height:", document.documentElement.clientHeight)
    
    // Bottom nav için body padding ekle
    document.body.style.paddingBottom = "0"
    document.body.style.marginBottom = "0"
    
    // Tüm transform'ları kontrol et
    document.querySelectorAll('*').forEach(el => {
      const styles = window.getComputedStyle(el)
      if (styles.transform !== 'none') {
        console.log("⚠️ Transform found on:", el.tagName, styles.transform)
      }
      if (styles.position === 'fixed' || styles.position === 'absolute') {
        console.log("📍 Position:", styles.position, "on", el.tagName)
      }
    })

    const fetchStats = async () => {
      try {
        const [
          { count: schoolsCount },
          { count: visitsCount },
          { count: wonCount },
          { count: lostCount },
          { count: todayVisits },
          { count: proposalsCount },
          { data: recentVisits },
        ] = await Promise.all([
          supabase.from("schools").select("*", { count: "exact", head: true }),
          supabase.from("visits").select("*", { count: "exact", head: true }),
          supabase.from("schools").select("*", { count: "exact", head: true }).eq("status", "WON"),
          supabase.from("schools").select("*", { count: "exact", head: true }).eq("status", "LOST"),
          supabase
            .from("visits")
            .select("*", { count: "exact", head: true })
            .gte("visit_date", new Date().toISOString().split("T")[0]),
          supabase
            .from("schools")
            .select("*", { count: "exact", head: true })
            .in("status", ["PROPOSAL_SENT", "NEGOTIATING"]),
          supabase.from("visits").select("*, schools(name)").order("visit_date", { ascending: false }).limit(5),
        ])

        setStats({
          schoolsCount: schoolsCount || 0,
          visitsCount: visitsCount || 0,
          proposalsCount: proposalsCount || 0,
          wonCount: wonCount || 0,
          lostCount: lostCount || 0,
          todayVisitsCount: todayVisits || 0,
          recentVisits: recentVisits || [],
        })
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      }
    }

    fetchStats()

    // Bottom nav pozisyonunu düzelt
    const fixBottomNav = () => {
      const nav = document.querySelector('.bottom-nav')
      if (nav) {
        // Pozisyonu sıfırla
        const htmlNav = nav as HTMLElement
        htmlNav.style.bottom = '0px'
        htmlNav.style.transform = 'none'
        htmlNav.style.translate = 'none'
        
        // Parent'ları kontrol et
        let parent = nav.parentElement
        while (parent) {
          const styles = window.getComputedStyle(parent)
          if (styles.transform !== 'none' || styles.translate !== 'none') {
            (parent as HTMLElement).style.transform = 'none'
            ;(parent as HTMLElement).style.translate = 'none'
          }
          parent = parent.parentElement
        }
      }
    }

    // İlk düzeltme
    setTimeout(fixBottomNav, 100)
    
    // Periyodik kontrol
    const interval = setInterval(fixBottomNav, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: 'calc(100vh - 68px)', // Bottom nav yüksekliği çıkar
      background: 'linear-gradient(to bottom right, #f8fafc, #ffffff, #eff6ff)',
      position: 'relative'
    }}>
      {/* Header Section with Greeting and Date */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(226, 232, 240, 0.5)',
        padding: '16px',
        marginBottom: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 900,
            color: '#0f172a'
          }}>
            Merhaba, Ahmet 👋
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            marginTop: '4px'
          }}>
            Bugün {new Date().toLocaleDateString("tr-TR", { 
              day: "numeric", 
              month: "long", 
              year: "numeric" 
            })}
          </p>
        </div>
      </div>

      <div style={{ paddingBottom: '4px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 900,
          color: '#0f172a',
          marginBottom: '16px'
        }}>
          Dashboard
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#64748b',
          marginBottom: '24px'
        }}>
          {new Date().toLocaleDateString("tr-TR", { day: "numeric" })} Aralık{" "}
          {new Date().toLocaleDateString("tr-TR", { year: "numeric" })}
        </p>

        {/* Dashboard Cards with Proper Stats */}
        <CRMDashboardClient stats={stats} />
      </div>
      
      {/* Debug banner */}
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: '#ef4444',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 9998
      }}>
        🐛 BOTTOM NAV TEST
      </div>
    </div>
  )
}
