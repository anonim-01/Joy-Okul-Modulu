import { createClient } from "@/lib/supabase/server"
import { SchoolsTable } from "@/components/crm/schools-table"
import { AddSchoolDialog } from "@/components/crm/add-school-dialog"
import { School } from "lucide-react"

export default async function SchoolsPage() {
  const supabase = await createClient()

  const { data: schools } = await supabase.from("schools").select("*").order("created_at", { ascending: false })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 drop-shadow-md">Okul Yönetimi</h1>
          <p className="text-gray-700 drop-shadow-sm">Pendik bölgesindeki eğitim kurumlarını yönetin</p>
        </div>
        <AddSchoolDialog />
      </div>

      {!schools || schools.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <School className="w-10 h-10 text-gray-400" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3 drop-shadow-sm">Henüz okul eklenmemiş</h3>
          <p className="text-gray-600 mb-6 drop-shadow-sm">Başlamak için ilk okulunuzu ekleyin</p>
          <AddSchoolDialog />
        </div>
      ) : (
        <SchoolsTable schools={schools} />
      )}
    </div>
  )
}
