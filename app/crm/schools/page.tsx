import { createClient } from "@/lib/supabase/server"
import { SchoolsTable } from "@/components/crm/schools-table"
import { AddSchoolDialog } from "@/components/crm/add-school-dialog"
import { School } from "lucide-react"

export default async function SchoolsPage() {
  const supabase = await createClient()
  const { data: schools } = await supabase.from("schools").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="crm-title">Kurum Yönetimi</h1>
          <p className="crm-subtitle">Eğitim kurumlarını yönetin</p>
        </div>
        <AddSchoolDialog />
      </div>

      {!schools || schools.length === 0 ? (
        <div className="crm-card text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <School className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-sm font-bold text-black mb-1">Henüz kurum yok</h3>
          <p className="text-xs text-gray-500 mb-3">İlk kurumunuzu ekleyin</p>
          <AddSchoolDialog />
        </div>
      ) : (
        <SchoolsTable schools={schools} />
      )}
    </div>
  )
}
