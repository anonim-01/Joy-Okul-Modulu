"use client"

import type { School } from "@/lib/types/database"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Edit, Trash2, User } from "lucide-react"
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
      NEW: "bg-blue-100 text-blue-700 border-blue-500",
      CONTACTED: "bg-yellow-100 text-yellow-700 border-yellow-500",
      VISITED: "bg-purple-100 text-purple-700 border-purple-500",
      PROPOSAL_SENT: "bg-orange-100 text-orange-700 border-orange-500",
      NEGOTIATING: "bg-pink-100 text-pink-700 border-pink-500",
      WON: "bg-green-100 text-green-700 border-green-500",
      LOST: "bg-red-100 text-red-700 border-red-500",
    }
    return colors[status as keyof typeof colors] || colors.NEW
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      NEW: "Yeni",
      CONTACTED: "İletişim",
      VISITED: "Ziyaret",
      PROPOSAL_SENT: "Teklif",
      NEGOTIATING: "Müzakere",
      WON: "Kazanıldı",
      LOST: "Kaybedildi",
    }
    return labels[status as keyof typeof labels] || status
  }

  const handleEdit = (school: School) => {
    setSelectedSchool(school)
    setEditOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kurumu silmek istediğinizden emin misiniz?")) return
    try {
      await deleteSchool(Number(id))
      toast.success("Kurum silindi")
      router.refresh()
    } catch (error) {
      toast.error("Hata oluştu")
    }
  }

  const getCardClass = (status: string) => {
    const classes = {
      NEW: "card-blue",
      CONTACTED: "card-yellow",
      VISITED: "card-purple",
      PROPOSAL_SENT: "card-orange",
      NEGOTIATING: "card-pink",
      WON: "card-green",
      LOST: "card-red",
    }
    return `card-pastel ${classes[status as keyof typeof classes] || "card-blue"}`
  }

  return (
    <>
      <div className="grid-2x2">
        {schools.map((school) => (
          <Card key={school.id} className={getCardClass(school.status)}>
            <div className="flex items-start gap-2 mb-2">
              <Building2 className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
              <h3 className="text-sm font-bold text-black flex-1 line-clamp-2 leading-tight">{school.name}</h3>
            </div>

            <Badge className={`${getStatusColor(school.status)} text-[10px] px-2 py-0.5 mb-2 border`}>
              {getStatusLabel(school.status)}
            </Badge>

            <div className="space-y-1 text-[11px] text-gray-600 mb-3">
              {school.neighborhood && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 flex-shrink-0 text-gray-400" />
                  <span className="truncate">{school.neighborhood}</span>
                </div>
              )}
              {school.manager_name && (
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3 flex-shrink-0 text-gray-400" />
                  <span className="truncate font-medium text-gray-700">{school.manager_name}</span>
                </div>
              )}
              {school.student_count && (
                <div className="text-gray-500">
                  <span className="font-semibold text-gray-700">{school.student_count}</span> öğrenci
                </div>
              )}
            </div>

            <div className="flex gap-1.5 pt-2 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1 text-[10px] h-7 border-gray-200 bg-transparent"
                onClick={() => handleEdit(school)}
              >
                <Edit className="w-3 h-3" />
                Düzenle
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-red-600 hover:bg-red-50 text-[10px] h-7 w-8 p-0 border-red-200 bg-transparent"
                onClick={() => handleDelete(school.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {selectedSchool && <EditSchoolDialog school={selectedSchool} open={editOpen} onOpenChange={setEditOpen} />}
    </>
  )
}
