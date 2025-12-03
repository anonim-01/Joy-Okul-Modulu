"use client"

import type { School } from "@/lib/types/database"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Phone, Mail, MapPin, Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import { EditSchoolDialog } from "./edit-school-dialog"
import { deleteSchool } from "@/app/crm/schools/actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface SchoolsTableProps {
  schools: School[]
}

export function SchoolsTable({ schools }: SchoolsTableProps) {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const router = useRouter()

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-700",
      contacted: "bg-yellow-100 text-yellow-700",
      needs_analysis: "bg-purple-100 text-purple-700",
      proposal_sent: "bg-orange-100 text-orange-700",
      negotiation: "bg-pink-100 text-pink-700",
      won: "bg-green-100 text-green-700",
      lost: "bg-red-100 text-red-700",
      archived: "bg-gray-100 text-gray-700",
    }
    return colors[status as keyof typeof colors] || colors.new
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      new: "Yeni",
      contacted: "İletişimde",
      needs_analysis: "Analiz Gerekli",
      proposal_sent: "Teklif Gönderildi",
      negotiation: "Müzakerede",
      won: "Kazanıldı",
      lost: "Kaybedildi",
      archived: "Arşivlendi",
    }
    return labels[status as keyof typeof labels] || status
  }

  const handleEdit = (school: School) => {
    setSelectedSchool(school)
    setEditOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu okulu silmek istediğinizden emin misiniz?")) return

    try {
      await deleteSchool(Number(id))
      toast.success("Okul başarıyla silindi")
      router.refresh()
    } catch (error) {
      toast.error("Okul silinirken hata oluştu")
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schools.length === 0 ? (
          <Card className="col-span-full p-12 text-center bg-white shadow-md">
            <Building2 className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 drop-shadow-sm mb-2">Henüz okul eklenmemiş</h3>
            <p className="text-gray-700 drop-shadow-sm mb-4">Başlamak için ilk okulunuzu ekleyin</p>
          </Card>
        ) : (
          schools.map((school) => (
            <Card key={school.id} className="p-6 hover:shadow-xl transition-all bg-white border border-gray-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <Building2 className="w-5 h-5 text-slate-500" />
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 drop-shadow-sm">{school.name}</h3>
                    </div>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <Badge className={getStatusColor(school.status)}>{getStatusLabel(school.status)}</Badge>
                      <Badge variant="outline" className="text-gray-700">
                        {school.type === "Devlet" ? "Devlet" : "Özel"}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-700 drop-shadow-sm">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{school.neighborhood}</span>
                      </div>
                      {school.phone && (
                        <div className="flex items-center gap-2 text-gray-700 drop-shadow-sm">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{school.phone}</span>
                        </div>
                      )}
                      {school.email && (
                        <div className="flex items-center gap-2 text-gray-700 drop-shadow-sm">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{school.email}</span>
                        </div>
                      )}
                      {school.manager_name && (
                        <div className="text-gray-700 drop-shadow-sm">
                          <span className="font-medium">Yetkili:</span> {school.manager_name}
                        </div>
                      )}
                    </div>

                    {school.notes && (
                      <p className="mt-3 text-sm text-gray-600 drop-shadow-sm line-clamp-2">{school.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 bg-transparent"
                    onClick={() => handleEdit(school)}
                  >
                    <Edit className="w-4 h-4" />
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-red-600 hover:bg-red-50 bg-transparent"
                    onClick={() => handleDelete(school.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {selectedSchool && <EditSchoolDialog school={selectedSchool} open={editOpen} onOpenChange={setEditOpen} />}
    </>
  )
}
