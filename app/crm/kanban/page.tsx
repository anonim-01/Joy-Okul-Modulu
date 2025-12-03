"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  GripVertical,
  School,
  User,
  Search,
  TrendingUp,
  Building2,
  Target,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Phone,
  Users,
  FileText,
  MessageCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface SchoolCard {
  id: string
  name: string
  neighborhood?: string
  manager_name?: string
  student_count?: number
  status?: string
}

const defaultColumns = [
  {
    id: "NEW",
    title: "Yeni",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    textColor: "text-white",
    icon: Sparkles,
    badgeBg: "bg-blue-700",
  },
  {
    id: "CONTACTED",
    title: "İletişim",
    color: "bg-gradient-to-br from-amber-400 to-amber-500",
    textColor: "text-amber-900",
    icon: Phone,
    badgeBg: "bg-amber-600",
  },
  {
    id: "VISITED",
    title: "Ziyaret",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    textColor: "text-white",
    icon: Users,
    badgeBg: "bg-purple-700",
  },
  {
    id: "PROPOSAL_SENT",
    title: "Teklif",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    textColor: "text-white",
    icon: FileText,
    badgeBg: "bg-orange-700",
  },
  {
    id: "NEGOTIATING",
    title: "Görüşme",
    color: "bg-gradient-to-br from-pink-500 to-pink-600",
    textColor: "text-white",
    icon: MessageCircle,
    badgeBg: "bg-pink-700",
  },
  {
    id: "WON",
    title: "Kazanıldı",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    textColor: "text-white",
    icon: CheckCircle2,
    badgeBg: "bg-emerald-700",
  },
  {
    id: "LOST",
    title: "Kayıp",
    color: "bg-gradient-to-br from-red-500 to-red-600",
    textColor: "text-white",
    icon: XCircle,
    badgeBg: "bg-red-700",
  },
]

export default function KanbanPage() {
  const [schools, setSchools] = useState<Record<string, SchoolCard[]>>({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [draggedCard, setDraggedCard] = useState<string | null>(null)
  const [columns, setColumns] = useState(defaultColumns)
  const [draggedColumn, setDraggedColumn] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadSchools()
  }, [filterType])

  const loadSchools = async () => {
    const supabase = createClient()
    let query = supabase.from("schools").select("*").order("created_at", { ascending: false })
    if (filterType !== "all") query = query.eq("type", filterType)
    const { data } = await query
    if (data) {
      const grouped = columns.reduce(
        (acc, col) => {
          acc[col.id] = data.filter((school: any) => school.status === col.id)
          return acc
        },
        {} as Record<string, SchoolCard[]>,
      )
      setSchools(grouped)
    }
    setLoading(false)
  }

  const moveCard = async (schoolId: string, toStatus: string) => {
    const supabase = createClient()
    const { error } = await supabase.from("schools").update({ status: toStatus }).eq("id", schoolId)
    if (error) toast.error("Hata!")
    else {
      toast.success("Güncellendi")
      loadSchools()
    }
  }

  const handleDragStart = (e: React.DragEvent, schoolId: string) => {
    setDraggedCard(schoolId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault()
    if (draggedCard) {
      moveCard(draggedCard, targetStatus)
      setDraggedCard(null)
    }
  }

  const handleColumnDragStart = (e: React.DragEvent, index: number) => {
    setDraggedColumn(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleColumnDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (draggedColumn !== null && draggedColumn !== targetIndex) {
      const newColumns = [...columns]
      const [removed] = newColumns.splice(draggedColumn, 1)
      newColumns.splice(targetIndex, 0, removed)
      setColumns(newColumns)
    }
    setDraggedColumn(null)
  }

  const scroll = (dir: number) => {
    scrollContainerRef.current?.scrollBy({ left: dir * 250, behavior: "smooth" })
  }

  const filteredSchools = Object.keys(schools).reduce(
    (acc, status) => {
      acc[status] = schools[status]?.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase())) || []
      return acc
    },
    {} as Record<string, SchoolCard[]>,
  )

  const totalSchools = Object.values(schools).reduce((sum, arr) => sum + (arr?.length || 0), 0)
  const wonCount = schools["WON"]?.length || 0
  const lostCount = schools["LOST"]?.length || 0
  const winRate = wonCount + lostCount > 0 ? ((wonCount / (wonCount + lostCount)) * 100).toFixed(0) : "0"

  if (loading)
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-sm font-bold animate-pulse">Yükleniyor...</div>
      </div>
    )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="page-title">Kanban Board</h1>
        <p className="page-subtitle">Satış sürecinizi yönetin</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="stat-card bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label text-[9px] sm:text-[10px] font-medium opacity-90">Toplam</p>
              <p className="stat-value text-lg sm:text-xl font-black">{totalSchools}</p>
            </div>
            <Building2 className="w-8 h-8 opacity-50" />
          </div>
        </Card>
        <Card className="stat-card bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label text-[9px] sm:text-[10px] font-medium opacity-90">Kazanıldı</p>
              <p className="stat-value text-lg sm:text-xl font-black">{wonCount}</p>
            </div>
            <TrendingUp className="w-8 h-8 opacity-50" />
          </div>
        </Card>
        <Card className="stat-card bg-gradient-to-br from-red-500 to-red-600 text-white p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label text-[9px] sm:text-[10px] font-medium opacity-90">Kaybedildi</p>
              <p className="stat-value text-lg sm:text-xl font-black">{lostCount}</p>
            </div>
            <X className="w-8 h-8 opacity-50" />
          </div>
        </Card>
        <Card className="stat-card bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label text-[9px] sm:text-[10px] font-medium opacity-90">Başarı</p>
              <p className="stat-value text-lg sm:text-xl font-black">{winRate}%</p>
            </div>
            <Target className="w-8 h-8 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-9 text-xs border-gray-200 bg-white rounded-lg shadow-sm"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-24 h-9 text-xs border-gray-200 bg-white rounded-lg shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="PUBLIC">Devlet</SelectItem>
            <SelectItem value="PRIVATE">Özel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Scroll Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => scroll(-1)}
          className="h-10 px-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl font-bold"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="text-base sm:text-lg font-black text-gray-800 px-3">← Kaydır →</span>
        <Button
          variant="default"
          size="sm"
          onClick={() => scroll(1)}
          className="h-10 px-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl font-bold"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Kanban Columns */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {columns.map((column, index) => {
          const IconComponent = column.icon
          return (
            <div
              key={column.id}
              draggable
              onDragStart={(e) => handleColumnDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => {
                if (draggedColumn !== null) handleColumnDrop(e, index)
                else handleDrop(e, column.id)
              }}
              className={`flex-shrink-0 snap-start w-[200px] sm:w-[240px] ${draggedColumn === index ? "opacity-50 scale-95" : ""} transition-all`}
            >
              <Card className="overflow-hidden rounded-xl shadow-xl border-0">
                <div className={`px-3 py-2.5 ${column.color} cursor-move`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <IconComponent className={`w-4 h-4 ${column.textColor}`} />
                      <span className={`font-bold text-xs ${column.textColor}`}>{column.title}</span>
                    </div>
                    <Badge className={`${column.badgeBg} text-white text-[10px] px-1.5 py-0`}>
                      {filteredSchools[column.id]?.length || 0}
                    </Badge>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="p-2 space-y-2 min-h-[150px] max-h-[300px] overflow-y-auto bg-gray-50">
                  {filteredSchools[column.id]?.map((school) => (
                    <Card
                      key={school.id}
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation()
                        handleDragStart(e, school.id)
                      }}
                      className="p-2.5 bg-white shadow-md hover:shadow-lg transition-all cursor-move border-0 rounded-lg active:scale-[0.98]"
                    >
                      <div className="flex items-start gap-1.5">
                        <GripVertical className="w-3 h-3 text-gray-300 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-black text-xs mb-1 line-clamp-2">{school.name}</h3>
                          {school.neighborhood && (
                            <div className="flex items-center gap-1 text-gray-500 text-[10px] mb-1">
                              <School className="w-2.5 h-2.5" />
                              <span className="truncate">{school.neighborhood}</span>
                            </div>
                          )}
                          {school.manager_name && (
                            <div className="flex items-center gap-1 text-gray-500 text-[10px] mb-1.5">
                              <User className="w-2.5 h-2.5" />
                              <span className="truncate">{school.manager_name}</span>
                            </div>
                          )}
                          {column.id !== "WON" && column.id !== "LOST" && (
                            <Button
                              size="sm"
                              className="w-full h-7 text-[10px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-md font-semibold shadow"
                              onClick={() => {
                                const nextIdx = columns.findIndex((c) => c.id === column.id) + 1
                                if (nextIdx < columns.length) moveCard(school.id, columns[nextIdx].id)
                              }}
                            >
                              İlerlet →
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                  {(!filteredSchools[column.id] || filteredSchools[column.id].length === 0) && (
                    <div className="text-center py-6 text-gray-400 text-xs">
                      <IconComponent className="w-6 h-6 mx-auto mb-1.5 opacity-30" />
                      <p>Boş</p>
                    </div>
                  )}
                </div>

                {/* Add Button */}
                <div className="p-1.5 border-t border-gray-100 bg-white">
                  <Button variant="ghost" className="w-full text-gray-500 hover:text-black text-xs h-7 rounded-md">
                    <Plus className="w-3 h-3 mr-1" /> Ekle
                  </Button>
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
