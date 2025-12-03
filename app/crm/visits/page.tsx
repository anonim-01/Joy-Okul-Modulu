import { createClient } from "@/lib/supabase/server"
import { TransitionLink } from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowLeft, Calendar, MapPin, User } from "lucide-react"

export default async function VisitsPage() {
  const supabase = await createClient()

  const { data: visits } = await supabase
    .from("visits")
    .select(
      `
      *,
      schools (name, neighborhood),
      users!visits_visitor_id_fkey (name)
    `,
    )
    .order("visit_date", { ascending: false })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <TransitionLink href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ana Sayfa
                </Button>
              </TransitionLink>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-md mb-2">Ziyaret Takibi</h1>
            <p className="text-gray-700 drop-shadow-sm">Okul ziyaretlerini planlayın ve raporlayın</p>
          </div>
          <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg w-full sm:w-auto">
            <Plus className="w-5 h-5" />
            Yeni Ziyaret Ekle
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visits && visits.length > 0 ? (
            visits.map((visit: any) => (
              <Card key={visit.id} className="p-6 hover:shadow-xl transition-shadow bg-white border border-gray-200">
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 drop-shadow-sm">
                        {visit.schools?.name}
                      </h3>
                    </div>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <Badge className="bg-purple-100 text-purple-700">{visit.visit_type}</Badge>
                      <Badge variant="outline" className="text-gray-700">
                        {visit.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-gray-700 drop-shadow-sm">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{new Date(visit.visit_date).toLocaleDateString("tr-TR")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 drop-shadow-sm">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{visit.schools?.neighborhood}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 drop-shadow-sm">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span>{visit.users?.name || "Bilinmiyor"}</span>
                      </div>
                    </div>

                    {visit.summary && (
                      <p className="text-sm text-gray-600 drop-shadow-sm line-clamp-2">{visit.summary}</p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Detay Görüntüle
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="col-span-full p-12 text-center bg-white shadow-lg">
              <Calendar className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 drop-shadow-sm mb-2">Henüz ziyaret kaydı yok</h3>
              <p className="text-gray-700 drop-shadow-sm mb-4">İlk ziyaretinizi planlamak için başlayın</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Ziyaret Ekle</Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
