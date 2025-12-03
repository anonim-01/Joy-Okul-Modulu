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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      await addVisit(formData)
      toast.success("Ziyaret başarıyla eklendi")
      setOpen(false)
    } catch (error) {
      toast.error("Ziyaret eklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          Yeni Ziyaret Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Ziyaret Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school_id">Okul *</Label>
              <Select name="school_id" required>
                <SelectTrigger>
                  <SelectValue placeholder="Okul seçin" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitor_id">Ziyaretçi *</Label>
              <Select name="visitor_id" required>
                <SelectTrigger>
                  <SelectValue placeholder="Ziyaretçi seçin" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visit_date">Ziyaret Tarihi *</Label>
              <Input type="date" name="visit_date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit_type">Ziyaret Tipi *</Label>
              <Select name="visit_type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Tip seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIRST_CONTACT">İlk Görüşme</SelectItem>
                  <SelectItem value="PRESENTATION">Sunum</SelectItem>
                  <SelectItem value="DEMO">Demo</SelectItem>
                  <SelectItem value="NEGOTIATION">Görüşme</SelectItem>
                  <SelectItem value="FOLLOWUP">Takip</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Durum *</Label>
            <Select name="status" required defaultValue="PLANNED">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLANNED">Planlandı</SelectItem>
                <SelectItem value="COMPLETED">Tamamlandı</SelectItem>
                <SelectItem value="CANCELLED">İptal</SelectItem>
                <SelectItem value="POSTPONED">Ertelendi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Katılımcılar</Label>
            <Input name="participants" placeholder="Virgülle ayırın: Ahmet, Mehmet, Ayşe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Özet</Label>
            <Textarea name="summary" placeholder="Ziyaret özeti..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="findings">Bulgular</Label>
            <Textarea name="findings" placeholder="Tespit edilen bulgular..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="action_items">Aksiyon Maddeleri</Label>
            <Textarea name="action_items" placeholder="Yapılacaklar..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="next_steps">Sonraki Adımlar</Label>
            <Textarea name="next_steps" placeholder="Sonraki adımlar..." rows={2} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              İptal
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {loading ? "Ekleniyor..." : "Ekle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
