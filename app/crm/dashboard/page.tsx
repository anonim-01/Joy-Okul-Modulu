import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Building2, FileText, Calendar, TrendingUp } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { count: schoolsCount } = await supabase.from("schools").select("*", { count: "exact", head: true })
  const { count: visitsCount } = await supabase.from("visits").select("*", { count: "exact", head: true })
  const { count: proposalsCount } = await supabase.from("proposals").select("*", { count: "exact", head: true })

  const { data: recentSchools } = await supabase
    .from("schools")
    .select("name, created_at")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 drop-shadow-md mb-2">Dashboard</h1>
        <p className="text-gray-700 drop-shadow-sm">CRM sistem istatistikleriniz</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Building2 className="w-8 h-8 text-blue-600" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 drop-shadow-sm mb-1">{schoolsCount || 0}</div>
          <div className="text-sm text-gray-600">Toplam Okul</div>
        </Card>

        <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-purple-600" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 drop-shadow-sm mb-1">{visitsCount || 0}</div>
          <div className="text-sm text-gray-600">Toplam Ziyaret</div>
        </Card>

        <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-orange-600" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 drop-shadow-sm mb-1">{proposalsCount || 0}</div>
          <div className="text-sm text-gray-600">Toplam Teklif</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-sm mb-2">Dönüşüm Oranı</div>
          <div className="text-3xl font-bold mb-1">
            {schoolsCount ? Math.round(((proposalsCount || 0) / schoolsCount) * 100) : 0}%
          </div>
          <div className="text-xs opacity-90">Bu Ay</div>
        </Card>
      </div>

      <Card className="p-6 bg-white shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 drop-shadow-sm mb-4">Son Eklenen Okullar</h2>
        <div className="space-y-3">
          {recentSchools && recentSchools.length > 0 ? (
            recentSchools.map((school: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900 drop-shadow-sm">{school.name}</span>
                </div>
                <span className="text-sm text-gray-600">{new Date(school.created_at).toLocaleDateString("tr-TR")}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-8">Henüz okul eklenmemiş</p>
          )}
        </div>
      </Card>
    </div>
  )
}
