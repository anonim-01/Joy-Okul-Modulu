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
  TrendingUp,
  Zap,
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
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Total Institutions Card */}
        <Card
          className={`p-5 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-3xl shadow-lg border border-blue-200/50 transition-all duration-500 hover:shadow-xl hover:scale-105 ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "0ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-2xl bg-blue-200/50">
              <Building2 className="w-7 h-7 text-blue-700" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-blue-900">{total}</div>
              <div className="text-xs font-medium text-blue-600 mt-1">+12%</div>
            </div>
          </div>
          <div className="text-sm font-bold text-blue-800">Toplam Kurum</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-blue-600" />
            <span className="text-xs text-blue-600">Bu ay aktif</span>
          </div>
        </Card>

        {/* Won Deals Card */}
        <Card
          className={`p-5 bg-gradient-to-br from-emerald-100 via-emerald-50 to-white rounded-3xl shadow-lg border border-emerald-200/50 transition-all duration-500 hover:shadow-xl hover:scale-105 ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-2xl bg-emerald-200/50">
              <CheckCircle2 className="w-7 h-7 text-emerald-700" />
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <div className="text-3xl font-black text-emerald-900">{won}</div>
                <ArrowUpRight className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-xs font-medium text-emerald-600 mt-1">+8%</div>
            </div>
          </div>
          <div className="text-sm font-bold text-emerald-800">Kazanıldı</div>
          <div className="flex items-center gap-1 mt-2">
            <Zap className="w-3 h-3 text-emerald-600" />
            <span className="text-xs text-emerald-600">Harika gidiyor!</span>
          </div>
        </Card>

        {/* Visits Card */}
        <Card
          className={`p-5 bg-gradient-to-br from-purple-100 via-purple-50 to-white rounded-3xl shadow-lg border border-purple-200/50 transition-all duration-500 hover:shadow-xl hover:scale-105 ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-2xl bg-purple-200/50">
              <Users className="w-7 h-7 text-purple-700" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-purple-900">{visits}</div>
              <div className="text-xs font-medium text-purple-600 mt-1">+15%</div>
            </div>
          </div>
          <div className="text-sm font-bold text-purple-800">Ziyaret</div>
          <div className="flex items-center gap-1 mt-2">
            <Activity className="w-3 h-3 text-purple-600" />
            <span className="text-xs text-purple-600">Tamamlandı</span>
          </div>
        </Card>

        {/* Proposals Card */}
        <Card
          className={`p-5 bg-gradient-to-br from-orange-100 via-orange-50 to-white rounded-3xl shadow-lg border border-orange-200/50 transition-all duration-500 hover:shadow-xl hover:scale-105 ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-2xl bg-orange-200/50">
              <FileText className="w-7 h-7 text-orange-700" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-orange-900">{proposals}</div>
              <div className="text-xs font-medium text-orange-600 mt-1">+5%</div>
            </div>
          </div>
          <div className="text-sm font-bold text-orange-800">Teklif</div>
          <div className="flex items-center gap-1 mt-2">
            <FileText className="w-3 h-3 text-orange-600" />
            <span className="text-xs text-orange-600">Gönderildi</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card
          className={`p-5 bg-gradient-to-br from-teal-100 via-teal-50 to-white rounded-3xl shadow-lg border border-teal-200/50 transition-all duration-500 hover:shadow-xl ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "400ms" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-teal-200/50">
              <Target className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <div className="text-3xl font-black text-teal-900">{conversionRate}%</div>
              <div className="text-xs text-teal-600 font-medium">↗ +3% bu ay</div>
            </div>
          </div>
          <div className="text-sm font-bold text-teal-800">Dönüşüm Oranı</div>
        </Card>

        <Card
          className={`p-5 bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-3xl shadow-lg border border-pink-200/50 transition-all duration-500 hover:shadow-xl ${
            mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
          }`}
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-pink-200/50">
              <Clock className="w-6 h-6 text-pink-700" />
            </div>
            <div>
              <div className="text-3xl font-black text-pink-900">{todayVisits}</div>
              <div className="text-xs text-pink-600 font-medium">Bugün</div>
            </div>
          </div>
          <div className="text-sm font-bold text-pink-800">Bugün Ziyaret</div>
        </Card>
      </div>

      <Card
        className={`p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-lg border border-indigo-200/50 transition-all duration-500 ${
          mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
        }`}
        style={{ animationDelay: "600ms" }}
      >
        <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-600" />
          Performans Grafikleri
        </h3>
        <div className="h-48 bg-gradient-to-br from-white/80 to-indigo-50/50 rounded-2xl flex items-center justify-center border-2 border-dashed border-indigo-200">
          <div className="text-center">
            <Activity className="w-12 h-12 mx-auto mb-2 text-indigo-400 animate-pulse" />
            <p className="text-sm text-gray-700 font-semibold">Grafik Yakında Eklenecek</p>
            <p className="text-xs text-gray-500 mt-1">Canlı verilerle güncellenecek</p>
          </div>
        </div>
      </Card>

      <Card
        className={`p-6 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-3xl shadow-lg border border-violet-200/50 transition-all duration-500 ${
          mounted ? "animate-in fade-in-50 slide-in-from-bottom-4" : "opacity-0"
        }`}
        style={{ animationDelay: "700ms" }}
      >
        <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-violet-600" />
          Son Aktiviteler
        </h3>
        <div className="space-y-3">
          {recentVisits && recentVisits.length > 0 ? (
            recentVisits.map((visit: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white/80 rounded-2xl shadow-sm border border-violet-100 hover:shadow-md transition-all duration-300 hover:scale-102"
                onClick={playNotificationSound}
              >
                <div className="p-2.5 rounded-xl bg-violet-100">
                  <Users className="w-5 h-5 text-violet-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{visit.schools?.name || "Kurum"}</p>
                  <p className="text-xs text-gray-600 font-medium">
                    {new Date(visit.visit_date).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <div className="px-3 py-1 bg-violet-100 rounded-full">
                  <span className="text-xs font-bold text-violet-700">Tamamlandı</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="p-4 rounded-2xl bg-gray-100/50 inline-block mb-3">
                <AlertCircle className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Henüz aktivite yok</p>
              <p className="text-xs text-gray-500 mt-1">İlk ziyaretinizi ekleyin</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
