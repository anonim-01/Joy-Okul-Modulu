import { createFluentCRMServerClient } from "@/lib/supabase/fluent-server"
import type { Funnel } from "@/lib/types/fluent-crm-database"
import { GitBranch, Zap, Play, Pause, Archive } from "lucide-react"

export default async function FluentFunnelsPage() {
  const supabase = await createFluentCRMServerClient()

  const { data: funnels, error } = await supabase
    .from("fc_funnels")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    console.error("Error fetching funnels:", error)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-5 h-5 text-green-600" />
      case "paused":
        return <Pause className="w-5 h-5 text-orange-600" />
      case "archived":
        return <Archive className="w-5 h-5 text-gray-600" />
      default:
        return <Zap className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "paused":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "archived":
        return "bg-gray-100 text-gray-600 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-[#fef9f6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black drop-shadow-md">Marketing Otomasyonları</h1>
            <p className="text-gray-600 mt-2">Otomatik iş akışlarınızı oluşturun ve yönetin</p>
          </div>
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Yeni Otomasyon Oluştur
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {funnels &&
            funnels.map((funnel: Funnel) => (
              <div
                key={funnel.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
                      <GitBranch className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-black drop-shadow-sm">{funnel.title}</h3>
                      <span
                        className={`inline-block px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor(funnel.status)}`}
                      >
                        {funnel.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {getStatusIcon(funnel.status)}
                </div>

                {funnel.trigger_name && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-600 font-medium mb-1">Tetikleyici:</p>
                    <p className="text-sm text-black font-medium">{funnel.trigger_name}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Tip: <span className="font-medium text-black">{funnel.type}</span>
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                      Düzenle
                    </button>
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors">
                      İstatistikler
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {(!funnels || funnels.length === 0) && (
          <div className="text-center py-16">
            <GitBranch className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">Henüz otomasyon oluşturulmamış</h3>
            <p className="text-gray-600 mb-6">İlk otomasyonunuzu oluşturmak için başlayın</p>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Otomasyon Oluştur
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
