"use client"
import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import {
  Building2,
  CheckCircle2,
  FileText,
  Users,
  Target,
  Clock,
  PieChart,
  Activity,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react"

interface DashboardStats {
  schoolsCount: number
  visitsCount: number
  proposalsCount: number
  wonCount: number
  lostCount: number
  todayVisitsCount: number
  recentVisits: any[]
}

export function CRMDashboardClient({
  stats = {
    schoolsCount: 0,
    visitsCount: 0,
    proposalsCount: 0,
    wonCount: 0,
    lostCount: 0,
    todayVisitsCount: 0,
    recentVisits: [],
  },
}: {
  stats?: DashboardStats
}) {
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3")
      audioRef.current.volume = 0.3
    }
    
    // Bottom nav için özel kontrol
    const checkBottomNav = () => {
      const nav = document.querySelector('.bottom-nav')
      if (nav) {
        // Pozisyonu kesin olarak ayarla
        const htmlNav = nav as HTMLElement
        htmlNav.style.cssText = `
          position: fixed !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 68px !important;
          background: white !important;
          border-top: 1px solid #e2e8f0 !important;
          z-index: 2147483647 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-around !important;
          padding: 0 8px !important;
          box-shadow: 0 -2px 8px rgba(0,0,0,0.05) !important;
          transform: none !important;
          translate: none !important;
        `
        
        // Viewport kontrolü
        const rect = nav.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        console.log('Nav position check:', {
          navBottom: rect.bottom,
          viewportHeight,
          difference: rect.bottom - viewportHeight
        })
      }
    }
    
    // Periyodik kontrol
    const interval = setInterval(checkBottomNav, 500)
    
    return () => clearInterval(interval)
  }, [])

  const { schoolsCount, visitsCount, proposalsCount, wonCount, lostCount, todayVisitsCount, recentVisits } = stats

  const total = schoolsCount || 0
  const won = wonCount || 0
  const lost = lostCount || 0
  const conversionRate = total > 0 ? ((won / total) * 100).toFixed(0) : "0"
  const visits = visitsCount || 0
  const proposals = proposalsCount || 0
  const todayVisits = todayVisitsCount || 0

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  return (
    <div className="space-y-4" style={{
      paddingBottom: '20px', // Bottom nav için minimum padding
      minHeight: 'calc(100vh - 180px)', // Header + bottom nav için yükseklik
      position: 'relative',
      zIndex: 1 // Bottom nav'ın altında kalacak şekilde
    }}>
      {/* Main 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Institutions Card */}
        <Card
          className={`p-4 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-2xl shadow-md border border-blue-200/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "0ms", transform: 'none' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-blue-200/50">
              <Building2 className="w-6 h-6 text-blue-700" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-900 mb-1">{total}</div>
          <div className="text-sm font-bold text-blue-800">Toplam Kurum</div>
        </Card>

        {/* Won Deals Card */}
        <Card
          className={`p-4 bg-gradient-to-br from-emerald-100 via-emerald-50 to-white rounded-2xl shadow-md border border-emerald-200/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "100ms", transform: 'none' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-emerald-200/50">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900 mb-1">{won}</div>
          <div className="text-sm font-bold text-emerald-800">Kazanıldı</div>
        </Card>

        {/* Visits Card */}
        <Card
          className={`p-4 bg-gradient-to-br from-purple-100 via-purple-50 to-white rounded-2xl shadow-md border border-purple-200/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "200ms", transform: 'none' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-purple-200/50">
              <Users className="w-6 h-6 text-purple-700" />
            </div>
            <Activity className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-900 mb-1">{visits}</div>
          <div className="text-sm font-bold text-purple-800">Toplam Ziyaret</div>
        </Card>

        {/* Proposals Card */}
        <Card
          className={`p-4 bg-gradient-to-br from-orange-100 via-orange-50 to-white rounded-2xl shadow-md border border-orange-200/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "300ms", transform: 'none' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-orange-200/50">
              <FileText className="w-6 h-6 text-orange-700" />
            </div>
            <FileText className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-3xl font-black text-orange-900 mb-1">{proposals}</div>
          <div className="text-sm font-bold text-orange-800">Teklif Sayısı</div>
        </Card>
      </div>

      {/* Secondary 2x1 Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card
          className={`p-4 bg-gradient-to-br from-teal-100 via-teal-50 to-white rounded-2xl shadow-md border border-teal-200/50 transition-all duration-500 hover:shadow-lg ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "400ms", transform: 'none' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-teal-200/50">
              <Target className="w-6 h-6 text-teal-700" />
            </div>
          </div>
          <div className="text-3xl font-black text-teal-900 mb-1">{conversionRate}%</div>
          <div className="text-sm font-bold text-teal-800">Dönüşüm Oranı</div>
        </Card>

        <Card
          className={`p-4 bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-2xl shadow-md border border-pink-200/50 transition-all duration-500 hover:shadow-lg ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "500ms", transform: 'none' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-pink-200/50">
              <Clock className="w-6 h-6 text-pink-700" />
            </div>
          </div>
          <div className="text-3xl font-black text-pink-900 mb-1">{todayVisits}</div>
          <div className="text-sm font-bold text-pink-800">Bugünkü Ziyaret</div>
        </Card>
      </div>

      {/* Performance Chart Section */}
      <Card
        className={`p-5 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-md border border-indigo-200/50 transition-all duration-500 ${
          mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
        }`}
        style={{ animationDelay: "600ms", transform: 'none' }}
      >
        <h3 className="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-600" />
          Performans Analizi
        </h3>
        <div className="h-40 bg-gradient-to-br from-white/80 to-indigo-50/50 rounded-xl flex items-center justify-center border-2 border-dashed border-indigo-200">
          <div className="text-center">
            <Activity className="w-10 h-10 mx-auto mb-2 text-indigo-400 animate-pulse" />
            <p className="text-sm text-gray-700 font-semibold">Grafik Yakında</p>
          </div>
        </div>
      </Card>

      {/* Recent Activities Section */}
      <Card
        className={`p-5 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-2xl shadow-md border border-violet-200/50 transition-all duration-500 ${
          mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
        }`}
        style={{ animationDelay: "700ms", transform: 'none' }}
      >
        <h3 className="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-violet-600" />
          Son Aktiviteler
        </h3>
        <div className="space-y-2">
          {recentVisits && recentVisits.length > 0 ? (
            recentVisits.map((visit: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white/80 rounded-xl shadow-sm border border-violet-100 hover:shadow-md transition-all duration-300"
                onClick={playNotificationSound}
              >
                <div className="p-2 rounded-lg bg-violet-100">
                  <Users className="w-4 h-4 text-violet-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{visit.schools?.name || "Kurum"}</p>
                  <p className="text-xs text-gray-600">{new Date(visit.visit_date).toLocaleDateString("tr-TR")}</p>
                </div>
                <div className="px-2.5 py-1 bg-violet-100 rounded-full shrink-0">
                  <span className="text-xs font-bold text-violet-700">✓</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="p-3 rounded-xl bg-gray-100/50 inline-block mb-2">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Henüz aktivite yok</p>
            </div>
          )}
        </div>
      </Card>
      
      {/* Bottom nav için boşluk */}
      <div style={{ 
        height: '80px',
        width: '100%',
        pointerEvents: 'none',
        visibility: 'hidden'
      }} />
    </div>
  )
}
