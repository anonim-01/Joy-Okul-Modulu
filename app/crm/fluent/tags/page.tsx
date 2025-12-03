import { createFluentCRMServerClient } from "@/lib/supabase/fluent-server"
import type { Tag } from "@/lib/types/fluent-crm-database"
import { Tags, Hash } from "lucide-react"
import { AddTagDialog } from "@/components/crm/add-tag-dialog"

export default async function FluentTagsPage() {
  const supabase = await createFluentCRMServerClient()

  const { data: tags, error } = await supabase.from("fc_tags").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching tags:", error)
  }

  return (
    <div className="min-h-screen bg-[#fef9f6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-black drop-shadow-lg">Etiket Yönetimi</h1>
            <p className="text-gray-700 mt-2 font-medium drop-shadow-sm">
              İletişimlerinizi kategorize etmek için etiketler oluşturun
            </p>
          </div>
          <AddTagDialog />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags &&
            tags.map((tag: Tag) => (
              <div
                key={tag.id}
                className="bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-blue-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                    <Hash className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-black drop-shadow-sm flex-1">{tag.title}</h3>
                </div>

                {tag.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tag.description}</p>}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-mono">{tag.slug}</span>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Düzenle</button>
                </div>
              </div>
            ))}
        </div>

        {(!tags || tags.length === 0) && (
          <div className="text-center py-16">
            <Tags className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">Henüz etiket oluşturulmamış</h3>
            <p className="text-gray-600 mb-6">İlk etiketinizi oluşturmak için başlayın</p>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Etiket Oluştur
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
