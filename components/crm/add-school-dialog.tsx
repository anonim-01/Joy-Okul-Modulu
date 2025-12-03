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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"
import { addSchool } from "@/app/crm/schools/actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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

export function AddSchoolDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      await addSchool(formData)
      setOpen(false)
      router.refresh()
      toast.success("Okul başarıyla eklendi!")
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast.error("Okul eklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg">
          <Plus className="w-5 h-5" />
          Yeni Okul Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-900">Yeni Okul Ekle</DialogTitle>
          <DialogDescription className="text-gray-600">
            Yeni bir okul eklemek için aşağıdaki formu doldurun.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-900 font-semibold">
                Okul Adı *
              </Label>
              <Input id="name" name="name" placeholder="Örn: Pendik Anadolu Lisesi" required className="bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="neighborhood" className="text-gray-900 font-semibold">
                  Mahalle *
                </Label>
                <Select name="neighborhood" required>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Mahalle seçin" />
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
                <Select name="type" required>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Tür seçin" />
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
                <Label htmlFor="category" className="text-gray-900 font-semibold">
                  Kategori *
                </Label>
                <Select name="category" required>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Temel Eğitim</SelectItem>
                    <SelectItem value="high">Ortaöğretim</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="student_count" className="text-gray-900 font-semibold">
                  Öğrenci Sayısı
                </Label>
                <Input
                  id="student_count"
                  name="student_count"
                  type="number"
                  placeholder="0"
                  defaultValue={0}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="manager" className="text-gray-900 font-semibold">
                Müdür Adı
              </Label>
              <Input id="manager" name="manager" placeholder="Örn: Ahmet Yılmaz" className="bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-gray-900 font-semibold">
                  Telefon
                </Label>
                <Input id="phone" name="phone" placeholder="0216 XXX XX XX" className="bg-white" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-900 font-semibold">
                  E-posta
                </Label>
                <Input id="email" name="email" type="email" placeholder="okul@example.com" className="bg-white" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address" className="text-gray-900 font-semibold">
                Adres
              </Label>
              <Input id="address" name="address" placeholder="Tam adres" className="bg-white" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              İptal
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ekleniyor...
                </>
              ) : (
                "Okul Ekle"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
