"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { addVisit } from "@/app/crm/visits/actions"
import { toast } from "sonner"

interface School {
  id: string
  name: string
}

interface User {
  id: string
  name: string
}

export function AddVisitDialog({ schools, users }: { schools: School[]; users: User[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [schoolId, setSchoolId] = useState("")
  const [visitorId, setVisitorId] = useState("")
  const [visitType, setVisitType] = useState("")
  const [status, setStatus] = useState("PLANNED")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("school_id", schoolId)
      formData.set("visitor_id", visitorId)
      formData.set("visit_type", visitType)
      formData.set("status", status)

      await addVisit(formData)
      toast.success("Ziyaret başarıyla eklendi")
      setOpen(false)
      setSchoolId("")
      setVisitorId("")
      setVisitType("")
      setStatus("PLANNED")
    } catch (error) {
      toast.error("Ziyaret eklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 bg-black hover:bg-gray-800 text-white shadow-xl w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          Yeni Ziyaret Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-2 border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-black drop-shadow-md">Yeni Ziyaret Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school_id" className="text-black font-extrabold drop-shadow-md text-base">
                Kurum *
              </Label>
              <Select name="school_id" required value={schoolId} onValueChange={setSchoolId}>
                <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium">
                  <SelectValue placeholder="Kurum seçin" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id} className="text-black font-medium">
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitor_id" className="text-black font-extrabold drop-shadow-md text-base">
                Ziyaretçi *
              </Label>
              <Select name="visitor_id" required value={visitorId} onValueChange={setVisitorId}>
                <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium">
                  <SelectValue placeholder="Ziyaretçi seçin" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id} className="text-black font-medium">
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visit_date" className="text-black font-extrabold drop-shadow-md text-base">
                Ziyaret Tarihi *
              </Label>
              <Input
                type="date"
                name="visit_date"
                required
                className="bg-white border-gray-300 shadow-sm text-black font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit_type" className="text-black font-extrabold drop-shadow-md text-base">
                Ziyaret Tipi *
              </Label>
              <Select name="visit_type" required value={visitType} onValueChange={setVisitType}>
                <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium">
                  <SelectValue placeholder="Tip seçin" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="FIRST_CONTACT" className="text-black font-medium">
                    İlk Görüşme
                  </SelectItem>
                  <SelectItem value="PRESENTATION" className="text-black font-medium">
                    Sunum
                  </SelectItem>
                  <SelectItem value="DEMO" className="text-black font-medium">
                    Demo
                  </SelectItem>
                  <SelectItem value="NEGOTIATION" className="text-black font-medium">
                    Görüşme
                  </SelectItem>
                  <SelectItem value="FOLLOWUP" className="text-black font-medium">
                    Takip
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-black font-extrabold drop-shadow-md text-base">
              Durum *
            </Label>
            <Select name="status" required value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="PLANNED" className="text-black font-medium">
                  Planlandı
                </SelectItem>
                <SelectItem value="COMPLETED" className="text-black font-medium">
                  Tamamlandı
                </SelectItem>
                <SelectItem value="CANCELLED" className="text-black font-medium">
                  İptal
                </SelectItem>
                <SelectItem value="POSTPONED" className="text-black font-medium">
                  Ertelendi
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants" className="text-black font-extrabold drop-shadow-md text-base">
              Katılımcılar
            </Label>
            <Input
              name="participants"
              placeholder="Virgülle ayırın: Ahmet, Mehmet, Ayşe"
              className="bg-white border-gray-300 shadow-sm text-black font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" className="text-black font-extrabold drop-shadow-md text-base">
              Özet
            </Label>
            <Textarea
              name="summary"
              placeholder="Ziyaret özeti..."
              rows={3}
              className="bg-white border-gray-300 shadow-sm text-black font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="findings" className="text-black font-extrabold drop-shadow-md text-base">
              Bulgular
            </Label>
            <Textarea
              name="findings"
              placeholder="Tespit edilen bulgular..."
              rows={3}
              className="bg-white border-gray-300 shadow-sm text-black font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="action_items" className="text-black font-extrabold drop-shadow-md text-base">
              Aksiyon Maddeleri
            </Label>
            <Textarea
              name="action_items"
              placeholder="Yapılacaklar..."
              rows={2}
              className="bg-white border-gray-300 shadow-sm text-black font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="next_steps" className="text-black font-extrabold drop-shadow-md text-base">
              Sonraki Adımlar
            </Label>
            <Textarea
              name="next_steps"
              placeholder="Sonraki adımlar..."
              rows={2}
              className="bg-white border-gray-300 shadow-sm text-black font-medium"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-2 border-gray-300 text-black font-bold shadow-md"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black hover:bg-gray-800 text-white shadow-xl font-bold"
            >
              {loading ? "Ekleniyor..." : "Ekle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
