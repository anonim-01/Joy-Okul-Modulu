import { createClient } from "@/lib/supabase/server"
import { TransitionLink } from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BarChart3, TrendingUp, Building2, FileText } from "lucide-react"

export default async function ReportsPage() {
  const supabase = await createClient()

  // Get statistics
  const { count: schoolsCount } = await supabase.from("schools").select("*", { count: "exact", head: true })
  const { count: visitsCount } = await supabase.from("visits").select("*", { count: "exact", head: true })
  const { count: proposalsCount } = await supabase.from("proposals").select("*", { count: "exact", head: true })

  const stats = [
    {
      title: "Toplam Okul",
      value: schoolsCount || 0,
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Toplam Ziyaret",
      value: visitsCount || 0,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Toplam Teklif",
      value: proposalsCount || 0,
      icon: FileText,
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <TransitionLink href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Button>
            </TransitionLink>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-md mb-2">Raporlar ve Analizler</h1>
          <p className="text-gray-700 drop-shadow-sm">CRM sisteminizdeki verilerin detaylı analizi</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 drop-shadow-sm">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md`}
                >
                  <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Report Actions */}
        <Card className="p-6 md:p-8 bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-slate-700" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 drop-shadow-sm">Rapor İşlemleri</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="justify-start hover:bg-blue-50 transition-colors bg-transparent"
            >
              Okul Listesi (Excel)
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="justify-start hover:bg-blue-50 transition-colors bg-transparent"
            >
              Ziyaret Raporu (PDF)
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="justify-start hover:bg-blue-50 transition-colors bg-transparent"
            >
              Teklif Analizi (Excel)
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="justify-start hover:bg-blue-50 transition-colors bg-transparent"
            >
              Aylık Özet Rapor (PDF)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
