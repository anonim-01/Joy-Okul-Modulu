import { createFluentCRMServerClient } from "@/lib/supabase/fluent-server"
import type { Campaign } from "@/lib/types/fluent-crm-database"
import { Mail, Send, Calendar, BarChart3 } from "lucide-react"
import { AddCampaignDialog } from "@/components/crm/add-campaign-dialog"

export default async function FluentCampaignsPage() {
  const supabase = await createFluentCRMServerClient()

  const { data: campaigns, error } = await supabase
    .from("fc_campaigns")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    console.error("Error fetching campaigns:", error)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "draft":
        return "bg-gray-100 text-gray-700"
      case "scheduled":
        return "bg-yellow-100 text-yellow-700"
      case "paused":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-[#fef9f6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-black drop-shadow-lg">E-posta Kampanyaları</h1>
            <p className="text-gray-700 mt-2 font-medium drop-shadow-sm">
              E-posta kampanyalarınızı oluşturun ve yönetin
            </p>
          </div>
          <AddCampaignDialog />
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {campaigns &&
            campaigns.map((campaign: Campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-black drop-shadow-sm">{campaign.title}</h3>
                        <span
                          className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(campaign.status)}`}
                        >
                          {campaign.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {campaign.email_subject && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 font-medium">Konu:</p>
                        <p className="text-base text-black">{campaign.email_subject}</p>
                      </div>
                    )}

                    {campaign.email_pre_header && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">{campaign.email_pre_header}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span className="font-medium text-black">{campaign.recipients_count}</span> alıcı
                      </div>
                      {campaign.scheduled_at && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(campaign.scheduled_at).toLocaleDateString("tr-TR")}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Tip: <span className="font-medium text-black">{campaign.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Detaylar
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Düzenle
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {(!campaigns || campaigns.length === 0) && (
          <div className="text-center py-16">
            <Mail className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">Henüz kampanya oluşturulmamış</h3>
            <p className="text-gray-600 mb-6">İlk e-posta kampanyanızı oluşturmak için başlayın</p>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Kampanya Oluştur
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
