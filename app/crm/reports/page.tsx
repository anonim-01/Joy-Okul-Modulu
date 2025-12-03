import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  Building2,
  FileText,
  Download,
  Calendar,
  Users,
  Target,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default async function ReportsPage() {
  const supabase = await createClient()

  const { count: schoolsCount } = await supabase.from("schools").select("*", { count: "exact", head: true })
  const { count: visitsCount } = await supabase.from("visits").select("*", { count: "exact", head: true })
  const { count: proposalsCount } = await supabase.from("proposals").select("*", { count: "exact", head: true })

  // Kazanılan ve kaybedilen kurumlar
  const { count: wonCount } = await supabase
    .from("schools")
    .select("*", { count: "exact", head: true })
    .eq("status", "WON")
  const { count: lostCount } = await supabase
    .from("schools")
    .select("*", { count: "exact", head: true })
    .eq("status", "LOST")

  // Son ziyaretler
  const { data: recentVisits } = await supabase
    .from("visits")
    .select("*, schools(name)")
    .order("visit_date", { ascending: false })
    .limit(5)

  // Son teklifler
  const { data: recentProposals } = await supabase
    .from("proposals")
    .select("*, schools(name)")
    .order("created_at", { ascending: false })
    .limit(5)

  const total = schoolsCount || 0
  const won = wonCount || 0
  const lost = lostCount || 0
  const conversionRate = total > 0 ? ((won / total) * 100).toFixed(0) : "0"
  const visits = visitsCount || 0
  const proposals = proposalsCount || 0

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-base sm:text-lg font-black text-black">Raporlar</h1>
        <p className="text-[10px] sm:text-xs text-gray-500">Detaylı veri analizi ve raporlar</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2.5 sm:p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-[10px] font-medium opacity-90">Toplam Kurum</p>
              <p className="text-lg sm:text-xl font-black">{total}</p>
            </div>
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-2.5 sm:p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-[10px] font-medium opacity-90">Kazanıldı</p>
              <p className="text-lg sm:text-xl font-black">{won}</p>
            </div>
            <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-2.5 sm:p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-[10px] font-medium opacity-90">Ziyaret</p>
              <p className="text-lg sm:text-xl font-black">{visits}</p>
            </div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-2.5 sm:p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-[10px] font-medium opacity-90">Teklif</p>
              <p className="text-lg sm:text-xl font-black">{proposals}</p>
            </div>
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-2.5 sm:p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-[10px] font-medium opacity-90">Dönüşüm</p>
              <p className="text-lg sm:text-xl font-black">{conversionRate}%</p>
            </div>
            <Target className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white p-2.5 sm:p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-[10px] font-medium opacity-90">Kaybedildi</p>
              <p className="text-lg sm:text-xl font-black">{lost}</p>
            </div>
            <ArrowDownRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
          </div>
        </Card>
      </div>

      <Card className="p-3 rounded-xl shadow-md bg-white">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-black">Rapor İndir</h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="justify-start text-xs h-9 gap-2 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
          >
            <Download className="w-3.5 h-3.5" />
            Kurum Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="justify-start text-xs h-9 gap-2 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
          >
            <Download className="w-3.5 h-3.5" />
            Ziyaret PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="justify-start text-xs h-9 gap-2 bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
          >
            <Download className="w-3.5 h-3.5" />
            Teklif Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="justify-start text-xs h-9 gap-2 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
          >
            <Download className="w-3.5 h-3.5" />
            Özet PDF
          </Button>
        </div>
      </Card>

      <Card className="p-3 rounded-xl shadow-md bg-white">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-purple-600" />
          <h2 className="text-sm font-bold text-black">Son Ziyaretler</h2>
        </div>
        <div className="space-y-1.5">
          {recentVisits && recentVisits.length > 0 ? (
            recentVisits.map((visit: any) => (
              <div key={visit.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 text-purple-600" />
                  </div>
                  <span className="font-medium text-black truncate">{visit.schools?.name || "Kurum"}</span>
                </div>
                <span className="text-gray-500 text-[10px]">
                  {new Date(visit.visit_date).toLocaleDateString("tr-TR")}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-3 text-xs">Henüz ziyaret yok</p>
          )}
        </div>
      </Card>

      <Card className="p-3 rounded-xl shadow-md bg-white">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-orange-600" />
          <h2 className="text-sm font-bold text-black">Son Teklifler</h2>
        </div>
        <div className="space-y-1.5">
          {recentProposals && recentProposals.length > 0 ? (
            recentProposals.map((proposal: any) => (
              <div key={proposal.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <FileText className="w-3 h-3 text-orange-600" />
                  </div>
                  <span className="font-medium text-black truncate">{proposal.schools?.name || "Kurum"}</span>
                </div>
                <span className="text-gray-500 text-[10px]">
                  {new Date(proposal.created_at).toLocaleDateString("tr-TR")}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-3 text-xs">Henüz teklif yok</p>
          )}
        </div>
      </Card>

      <Card className="p-3 rounded-xl shadow-md bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-teal-600" />
          <h2 className="text-sm font-bold text-black">Performans Grafiği</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center">
            <PieChart className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-xs font-bold text-blue-700">Durum Dağılımı</p>
            <p className="text-[10px] text-blue-600 mt-1">Yakında</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-xs font-bold text-green-700">Trend Analizi</p>
            <p className="text-[10px] text-green-600 mt-1">Yakında</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
