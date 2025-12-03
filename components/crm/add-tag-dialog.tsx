"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tags, Plus } from "lucide-react"
import { createTag } from "@/app/crm/fluent/tags/actions"
import { toast } from "sonner"

export function AddTagDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createTag(formData)

    if (result.error) {
      toast.error("Etiket oluşturulamadı: " + result.error)
    } else {
      toast.success("Etiket başarıyla oluşturuldu!")
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
          Yeni Etiket
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-white shadow-2xl border-2 border-gray-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-black drop-shadow-md flex items-center gap-2">
            <Tags className="w-6 h-6" />
            Yeni Etiket Oluştur
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="text-black font-extrabold drop-shadow-sm">Etiket Adı</Label>
            <Input
              name="title"
              required
              placeholder="Örn: VIP Müşteri"
              className="shadow-md border-2 border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-black font-extrabold drop-shadow-sm">Açıklama</Label>
            <Textarea
              name="description"
              rows={4}
              placeholder="Etiketin kullanım amacını açıklayın..."
              className="shadow-md border-2 border-gray-300"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="shadow-md">
              İptal
            </Button>
            <Button type="submit" disabled={loading} className="bg-black text-white shadow-xl">
              {loading ? "Oluşturuluyor..." : "Etiket Oluştur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
