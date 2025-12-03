"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { updateSchool } from "@/app/crm/schools/actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { School } from "@/lib/types/database"

const PENDIK_NEIGHBORHOODS = [
  "Bahçelievler",
  "Dumlupınar",
  "Esenyalı",
  "Fevzi Çakmak",
  "Göçbeyli",
  "Güllübağlar",
  "Güzelyalı",
  "Kavakpınar",
  "Kaynarca",
  "Kurtköy",
  "Orhantekin",
  "Ramazanoğlu",
  "Sapanbağları",
  "Velibaba",
  "Yeşilbağlar",
]

interface EditSchoolDialogProps {
  school: School
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditSchoolDialog({ school, open, onOpenChange }: EditSchoolDialogProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      await updateSchool(Number(school.id), formData)
      onOpenChange(false)
      router.refresh()
      toast.success("Okul başarıyla güncellendi!")
    } catch (error) {
      toast.error("Okul güncellenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-900">Okul Düzenle</DialogTitle>
          <DialogDescription className="text-gray-600">Okul bilgilerini güncelleyin</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-900 font-semibold">
                Okul Adı *
              </Label>
              <Input id="name" name="name" defaultValue={school.name} required className="bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="neighborhood" className="text-gray-900 font-semibold">
                  Mahalle *
                </Label>
                <Select name="neighborhood" defaultValue={school.neighborhood} required>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PENDIK_NEIGHBORHOODS.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type" className="text-gray-900 font-semibold">
                  Tür *
                </Label>
                <Select name="type" defaultValue={school.type} required>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Devlet">Devlet</SelectItem>
                    <SelectItem value="Özel">Özel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-gray-900 font-semibold">
                  Durum
                </Label>
                <Select name="status" defaultValue={school.status}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Yeni</SelectItem>
                    <SelectItem value="contacted">İletişimde</SelectItem>
                    <SelectItem value="needs_analysis">Analiz Gerekli</SelectItem>
                    <SelectItem value="proposal_sent">Teklif Gönderildi</SelectItem>
                    <SelectItem value="won">Kazanıldı</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="visit_status" className="text-gray-900 font-semibold">
                  Ziyaret Durumu
                </Label>
                <Select name="visit_status" defaultValue={school.visit_status}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Ziyaret Edilmedi</SelectItem>
                    <SelectItem value="manager">Müdürle Görüşüldü</SelectItem>
                    <SelectItem value="technical">Teknik Personel</SelectItem>
                    <SelectItem value="failed">Yetkili Bulunamadı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="manager" className="text-gray-900 font-semibold">
                Müdür Adı
              </Label>
              <Input id="manager" name="manager" defaultValue={school.manager || ""} className="bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-gray-900 font-semibold">
                  Telefon
                </Label>
                <Input id="phone" name="phone" defaultValue={school.phone || ""} className="bg-white" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-900 font-semibold">
                  E-posta
                </Label>
                <Input id="email" name="email" type="email" defaultValue={school.email || ""} className="bg-white" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address" className="text-gray-900 font-semibold">
                Adres
              </Label>
              <Input id="address" name="address" defaultValue={school.address || ""} className="bg-white" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes" className="text-gray-900 font-semibold">
                Notlar
              </Label>
              <Textarea id="notes" name="notes" defaultValue={school.notes || ""} className="bg-white" rows={3} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deficiencies" className="text-gray-900 font-semibold">
                Eksiklikler
              </Label>
              <Textarea
                id="deficiencies"
                name="deficiencies"
                defaultValue={school.deficiencies || ""}
                className="bg-white"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              İptal
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Güncelleniyor...
                </>
              ) : (
                "Güncelle"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
