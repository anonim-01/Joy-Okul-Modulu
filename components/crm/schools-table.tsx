"use client"

import type { School } from "@/lib/types/database"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Edit, Trash2, User, Search, X, Filter } from "lucide-react"
import { useState, useMemo, useRef, useEffect } from "react"
import { EditSchoolDialog } from "./edit-school-dialog"
import { deleteSchool } from "@/app/crm/schools/actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SchoolsTableProps {
  schools: School[]
}

export function SchoolsTable({ schools }: SchoolsTableProps) {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>("ALL")
  const [showFilters, setShowFilters] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (searchQuery) {
          setSearchQuery("")
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [searchQuery])

  const neighborhoods = useMemo(() => {
    const unique = new Set(schools.map((s) => s.neighborhood).filter(Boolean))
    return Array.from(unique).sort()
  }, [schools])

  const filteredSchools = useMemo(() => {
    let filtered = schools

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((school) => school.status === statusFilter)
    }

    if (neighborhoodFilter !== "ALL") {
      filtered = filtered.filter((school) => school.neighborhood === neighborhoodFilter)
    }

    if (searchQuery.length >= 1) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (school) =>
          school.name.toLowerCase().includes(query) ||
          school.neighborhood?.toLowerCase().includes(query) ||
          school.manager_name?.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [schools, searchQuery, statusFilter, neighborhoodFilter])

  const isSearching = searchQuery.length >= 1

  const getCardGradient = (status: string) => {
    const gradients = {
      NEW: "from-blue-500 to-blue-600",
      CONTACTED: "from-amber-400 to-yellow-500",
      VISITED: "from-purple-500 to-purple-600",
      PROPOSAL_SENT: "from-orange-500 to-orange-600",
      NEGOTIATING: "from-pink-500 to-pink-600",
      WON: "from-emerald-500 to-emerald-600",
      LOST: "from-red-500 to-red-600",
    }
    return gradients[status as keyof typeof gradients] || gradients.NEW
  }

  const getStatusColor = (status: string) => {
    const colors = {
      NEW: "bg-blue-100 text-blue-800 border-blue-300",
      CONTACTED: "bg-amber-100 text-amber-800 border-amber-300",
      VISITED: "bg-purple-100 text-purple-800 border-purple-300",
      PROPOSAL_SENT: "bg-orange-100 text-orange-800 border-orange-300",
      NEGOTIATING: "bg-pink-100 text-pink-800 border-pink-300",
      WON: "bg-emerald-100 text-emerald-800 border-emerald-300",
      LOST: "bg-red-100 text-red-800 border-red-300",
    }
    return colors[status as keyof typeof colors] || colors.NEW
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      NEW: "Yeni",
      CONTACTED: "İletişim",
      VISITED: "Ziyaret",
      PROPOSAL_SENT: "Teklif",
      NEGOTIATING: "Görüşme",
      WON: "Kazanıldı",
      LOST: "Kayıp",
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

  return (
    <>
      <div ref={searchRef} className="sticky top-0 z-20 -mx-4 px-4 pb-3 bg-gray-50/95 backdrop-blur-sm">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Kurum ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-11 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-9 gap-2 rounded-xl ${showFilters ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-white"}`}
            >
              <Filter className="w-4 h-4" />
              Filtrele
            </Button>
            {(statusFilter !== "ALL" || neighborhoodFilter !== "ALL") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStatusFilter("ALL")
                  setNeighborhoodFilter("ALL")
                }}
                className="h-9 text-xs text-gray-600 hover:text-gray-900"
              >
                Filtreleri Temizle
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 gap-2 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Durum</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-9 text-sm rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Tümü</SelectItem>
                    <SelectItem value="NEW">Yeni</SelectItem>
                    <SelectItem value="CONTACTED">İletişim</SelectItem>
                    <SelectItem value="VISITED">Ziyaret</SelectItem>
                    <SelectItem value="PROPOSAL_SENT">Teklif</SelectItem>
                    <SelectItem value="NEGOTIATING">Görüşme</SelectItem>
                    <SelectItem value="WON">Kazanıldı</SelectItem>
                    <SelectItem value="LOST">Kayıp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Semt</label>
                <Select value={neighborhoodFilter} onValueChange={setNeighborhoodFilter}>
                  <SelectTrigger className="h-9 text-sm rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Tümü</SelectItem>
                    {neighborhoods.map((neighborhood) => (
                      <SelectItem key={neighborhood} value={neighborhood}>
                        {neighborhood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {(isSearching || statusFilter !== "ALL" || neighborhoodFilter !== "ALL") && (
            <p className="text-xs text-gray-500">{filteredSchools.length} sonuç bulundu</p>
          )}
        </div>
      </div>

      <div
        className={`relative ${isSearching ? "before:absolute before:inset-0 before:bg-white/40 before:backdrop-blur-[2px] before:z-10 before:pointer-events-none before:rounded-2xl" : ""}`}
      >
        <div className="grid grid-cols-2 gap-3 pb-20">
          {filteredSchools.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-gray-900 mb-1">Sonuç bulunamadı</h3>
              <p className="text-xs text-gray-500">Farklı bir arama terimi deneyin</p>
            </div>
          ) : (
            filteredSchools.map((school) => (
              <Card
                key={school.id}
                className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div
                  className={`bg-gradient-to-r ${getCardGradient(school.status)} -mx-4 -mt-4 mb-3 px-4 py-2.5 rounded-t-2xl`}
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`${getStatusColor(school.status)} text-xs px-2.5 py-1 font-bold border shadow-sm`}
                    >
                      {getStatusLabel(school.status)}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-3 leading-tight line-clamp-2">{school.name}</h3>

                <div className="space-y-2 mb-4">
                  {school.neighborhood && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm truncate">{school.neighborhood}</span>
                    </div>
                  )}
                  {school.manager_name && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{school.manager_name}</span>
                    </div>
                  )}
                  {school.student_count && (
                    <div className="text-sm text-gray-600">
                      <span className="font-bold text-gray-900">{school.student_count}</span> öğrenci
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5 text-xs h-9 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl"
                    onClick={() => handleEdit(school)}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-red-600 hover:bg-red-50 text-xs h-9 w-10 p-0 border-red-200 bg-white rounded-xl font-semibold"
                    onClick={() => handleDelete(school.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {selectedSchool && <EditSchoolDialog school={selectedSchool} open={editOpen} onOpenChange={setEditOpen} />}
    </>
  )
}
