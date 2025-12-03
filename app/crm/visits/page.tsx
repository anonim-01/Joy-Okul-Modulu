import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User } from "lucide-react"
import { AddVisitDialog } from "@/components/crm/add-visit-dialog"

export default async function VisitsPage() {
  const supabase = await createClient()

  const { data: visits } = await supabase
    .from("visits")
    .select(`*, schools (id, name, neighborhood), users!visits_visitor_id_fkey (id, name)`)
    .order("visit_date", { ascending: false })

  const { data: schools } = await supabase.from("schools").select("id, name").order("name")
  const { data: users } = await supabase.from("users").select("id, name").eq("is_active", true).order("name")

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      PLANNED: "bg-blue-100 text-blue-700",
      COMPLETED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
    }
    return colors[status] || "bg-gray-100 text-gray-700"
  }

  const getTypeName = (type: string) => {
    const types: Record<string, string> = {
      FIRST_CONTACT: "İlk Görüşme",
      PRESENTATION: "Sunum",
      DEMO: "Demo",
      NEGOTIATION: "Görüşme",
      FOLLOWUP: "Takip",
    }
    return types[type] || type
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="crm-title">Ziyaret Takibi</h1>
          <p className="crm-subtitle">Ziyaretleri planlayın</p>
        </div>
        <AddVisitDialog schools={schools || []} users={users || []} />
      </div>

      {visits && visits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {visits.map((visit: any) => (
            <Card key={visit.id} className="crm-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-xs sm:text-sm font-bold text-black flex-1 truncate">{visit.schools?.name}</h3>
                <Badge className={`${getStatusBadge(visit.status)} text-[9px] px-1.5 py-0`}>{visit.status}</Badge>
              </div>
              <Badge className="bg-purple-100 text-purple-700 text-[9px] mb-2">{getTypeName(visit.visit_type)}</Badge>
              <div className="space-y-1 text-[10px] sm:text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(visit.visit_date).toLocaleDateString("tr-TR")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{visit.schools?.neighborhood}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span className="truncate">{visit.users?.name || "—"}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="crm-card text-center py-8">
          <Calendar className="w-10 h-10 mx-auto text-gray-300 mb-2" />
          <h3 className="text-sm font-bold text-black mb-1">Ziyaret yok</h3>
          <p className="text-xs text-gray-500 mb-3">İlk ziyaretinizi planlayın</p>
          <AddVisitDialog schools={schools || []} users={users || []} />
        </Card>
      )}
    </div>
  )
}
