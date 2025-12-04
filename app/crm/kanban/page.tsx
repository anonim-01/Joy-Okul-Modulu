"use client"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Phone,
  Users,
  FileText,
  MessageCircle,
  CheckCircle2,
  XCircle,
  MapPin,
  ArrowRight,
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { toast } from "sonner"

interface SchoolCard {
  id: string
  name: string
  neighborhood?: string
  manager_name?: string
  student_count?: number
  status?: string
}

const categories = [
  {
    id: "NEW",
    title: "Yeni",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    icon: Sparkles,
  },
  {
    id: "CONTACTED",
    title: "İletişim",
    bgColor: "bg-gradient-to-br from-amber-500 to-yellow-500",
    icon: Phone,
  },
  {
    id: "VISITED",
    title: "Ziyaret",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    icon: Users,
  },
  {
    id: "PROPOSAL_SENT",
    title: "Teklif",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    icon: FileText,
  },
  {
    id: "NEGOTIATING",
    title: "Görüşme",
    bgColor: "bg-gradient-to-br from-pink-500 to-pink-600",
    icon: MessageCircle,
  },
  {
    id: "WON",
    title: "Kazanıldı",
    bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    icon: CheckCircle2,
  },
  {
    id: "LOST",
    title: "Kayıp",
    bgColor: "bg-gradient-to-br from-red-500 to-red-600",
    icon: XCircle,
  },
]

const allStatuses = categories

export default function KanbanPage() {
  const [schools, setSchools] = useState<Record<string, SchoolCard[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [moveDialogOpen, setMoveDialogOpen] = useState(false)
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null)

  useEffect(() => {
    loadSchools()
  }, [])

  const loadSchools = async () => {
    try {
      const { data, error } = await supabase.from("schools").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error loading schools:", error)
        setLoading(false)
        return
      }

      if (data) {
        const grouped = allStatuses.reduce(
          (acc, status) => {
            acc[status.id] = data.filter((school: any) => school.status === status.id)
            return acc
          },
          {} as Record<string, SchoolCard[]>,
        )
        setSchools(grouped)
      }
    } catch (error) {
      console.error("[v0] Exception loading schools:", error)
    } finally {
      setLoading(false)
    }
  }

  const moveCard = async (schoolId: string, toStatus: string) => {
    try {
      const { error } = await supabase.from("schools").update({ status: toStatus }).eq("id", schoolId)

      if (error) {
        console.error("[v0] Error moving card:", error.message)
        toast.error(`Kart taşınırken hata oluştu: ${error.message}`)
        return
      }

      setMoveDialogOpen(false)
      setSelectedSchoolId(null)

      setTimeout(async () => {
        await loadSchools()
        toast.success("Başarıyla taşındı")
      }, 0)
    } catch (error: any) {
      console.error("[v0] Exception moving card:", error)
      toast.error("Beklenmeyen bir hata oluştu")
    }
  }

  const getCategoryCount = (categoryId: string) => {
    return schools[categoryId]?.length || 0
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-sm font-bold animate-pulse">Yükleniyor...</div>
      </div>
    )
  }

  if (!selectedCategory) {
    return (
      <div className="space-y-4 pb-20 px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Button
            size="lg"
            disabled
            className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg opacity-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="text-center min-w-[120px]">
            <h2 className="text-xl font-black text-gray-900">← Kaydır →</h2>
          </div>
          <Button
            size="lg"
            disabled
            className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg opacity-50"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            const count = getCategoryCount(category.id)
            return (
              <Card
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${category.bgColor} p-6 rounded-2xl shadow-xl border-0 cursor-pointer active:scale-95 transition-transform`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{category.title}</h3>
                      <p className="text-sm text-white/80">{count} kurum</p>
                    </div>
                  </div>
                  <Badge className="bg-white/30 text-white text-xl px-5 py-2 font-bold border-0 backdrop-blur-sm">
                    {count}
                  </Badge>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  const currentCategory = categories.find((c) => c.id === selectedCategory)!
  const IconComponent = currentCategory.icon
  const categorySchools = schools[selectedCategory] || []

  return (
    <div className="space-y-4 pb-20 px-4">
      <div className="flex items-center justify-between mb-4">
        <Button onClick={() => setSelectedCategory(null)} variant="outline" className="rounded-xl font-semibold">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Geri
        </Button>
        <h2 className="text-lg font-black text-gray-900">{currentCategory.title}</h2>
        <div className="w-20" />
      </div>

      <div className="space-y-3">
        {categorySchools.length > 0 ? (
          categorySchools.map((school) => (
            <Card
              key={school.id}
              className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <h4 className="text-base font-bold text-gray-900 mb-3 leading-tight">{school.name}</h4>

              <div className="space-y-2 mb-4">
                {school.neighborhood && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{school.neighborhood}</span>
                  </div>
                )}
                {school.manager_name && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{school.manager_name}</span>
                  </div>
                )}
              </div>

              <Button
                onClick={() => {
                  setSelectedSchoolId(school.id)
                  setMoveDialogOpen(true)
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl h-11 font-bold text-sm shadow-md"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                İlerlet
              </Button>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <IconComponent className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 font-medium mb-1">Boş</p>
            <p className="text-sm text-gray-400">Henüz {currentCategory.title.toLowerCase()} kurumu yok</p>
          </Card>
        )}
      </div>

      <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">Nereye Taşınsın?</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 mt-4">
            {allStatuses
              .filter((status) => status.id !== selectedCategory)
              .map((status) => {
                const StatusIcon = status.icon
                return (
                  <Button
                    key={status.id}
                    onClick={() => selectedSchoolId && moveCard(selectedSchoolId, status.id)}
                    variant="outline"
                    className="h-14 justify-start gap-3 rounded-xl hover:bg-blue-50 hover:border-blue-300"
                  >
                    <StatusIcon className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-900">{status.title}</span>
                  </Button>
                )
              })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
