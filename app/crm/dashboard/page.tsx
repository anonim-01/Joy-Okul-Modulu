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
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header Section with Greeting and Date */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-4 mb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Merhaba, Ahmet 👋</h1>
          <p className="text-sm text-gray-600 mt-1">
            Bugün {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="pb-4">
        <h2 className="text-xl font-black text-gray-900 mb-4">Dashboard</h2>
        <p className="text-sm text-gray-600 mb-6">
          {new Date().toLocaleDateString("tr-TR", { day: "numeric" })} Aralık{" "}
          {new Date().toLocaleDateString("tr-TR", { year: "numeric" })}
        </p>

        {/* Dashboard Cards with Proper Stats */}
        <CRMDashboardClient stats={stats} />
      </div>
    </div>
  )
}
