"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Plus } from "lucide-react"
import { createCampaign } from "@/app/crm/fluent/campaigns/actions"
import { toast } from "sonner"

export function AddCampaignDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState("email")
  const [status, setStatus] = useState("draft")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.set("type", type)
    formData.set("status", status)

    const result = await createCampaign(formData)

    if (result.error) {
      toast.error("Kampanya oluşturulamadı: " + result.error)
    } else {
      toast.success("Kampanya başarıyla oluşturuldu!")
      setOpen(false)
      e.currentTarget.reset()
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-800 shadow-xl border-2 border-gray-300">
          <Plus className="w-5 h-5 mr-2" />
          Yeni Kampanya
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-2 border-gray-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-black drop-shadow-md flex items-center gap-2">
            <Mail className="w-6 h-6" />
            Yeni Kampanya Oluştur
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="text-black font-extrabold drop-shadow-sm">Kampanya Başlığı</Label>
            <Input name="title" required className="shadow-md border-2 border-gray-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-black font-extrabold drop-shadow-sm">Tip</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger className="shadow-md border-2 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">E-posta</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="notification">Bildirim</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-black font-extrabold drop-shadow-sm">Durum</Label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger className="shadow-md border-2 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="scheduled">Planlanmış</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-black font-extrabold drop-shadow-sm">E-posta Konusu</Label>
            <Input name="emailSubject" required className="shadow-md border-2 border-gray-300" />
          </div>

          <div className="space-y-2">
            <Label className="text-black font-extrabold drop-shadow-sm">Ön Başlık</Label>
            <Input name="emailPreHeader" className="shadow-md border-2 border-gray-300" />
          </div>

          <div className="space-y-2">
            <Label className="text-black font-extrabold drop-shadow-sm">E-posta İçeriği</Label>
            <Textarea name="emailBody" rows={6} className="shadow-md border-2 border-gray-300" />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="shadow-md">
              İptal
            </Button>
            <Button type="submit" disabled={loading} className="bg-black text-white shadow-xl">
              {loading ? "Oluşturuluyor..." : "Kampanya Oluştur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
