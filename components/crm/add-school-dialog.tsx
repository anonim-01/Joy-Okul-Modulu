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
  const [neighborhood, setNeighborhood] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.set("neighborhood", neighborhood)
    formData.set("type", type)
    formData.set("category", category)

    try {
      await addSchool(formData)
      setOpen(false)
      router.refresh()
      toast.success("Kurum başarıyla eklendi!")
      setNeighborhood("")
      setType("")
      setCategory("")
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast.error("Kurum eklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl rounded-xl font-bold"
        >
          <Plus className="w-5 h-5" />
          Yeni Kurum Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-2 border-gray-200 rounded-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-black text-gray-900">Yeni Kurum Ekle</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 font-medium">
            Yeni bir kurum eklemek için aşağıdaki formu doldurun.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-900 font-bold text-sm">
                Kurum Adı *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Örn: Pendik Anadolu Lisesi"
                required
                className="bg-white border-gray-300 shadow-sm text-gray-900 font-medium rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="neighborhood" className="text-black font-extrabold drop-shadow-md text-base">
                  Mahalle *
                </Label>
                <Select name="neighborhood" required value={neighborhood} onValueChange={setNeighborhood}>
                  <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium">
                    <SelectValue placeholder="Mahalle seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {PENDIK_NEIGHBORHOODS.map((n) => (
                      <SelectItem key={n} value={n} className="text-black font-medium">
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type" className="text-black font-extrabold drop-shadow-md text-base">
                  Tür *
                </Label>
                <Select name="type" required value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium">
                    <SelectValue placeholder="Tür seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="PUBLIC" className="text-black font-medium">
                      Devlet
                    </SelectItem>
                    <SelectItem value="PRIVATE" className="text-black font-medium">
                      Özel
                    </SelectItem>
                    <SelectItem value="FOUNDATION" className="text-black font-medium">
                      Vakıf
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-black font-extrabold drop-shadow-md text-base">
                  Kategori *
                </Label>
                <Select name="category" required value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="PRIMARY" className="text-black font-medium">
                      İlkokul
                    </SelectItem>
                    <SelectItem value="MIDDLE" className="text-black font-medium">
                      Ortaokul
                    </SelectItem>
                    <SelectItem value="HIGH" className="text-black font-medium">
                      Lise
                    </SelectItem>
                    <SelectItem value="VOCATIONAL" className="text-black font-medium">
                      Meslek Lisesi
                    </SelectItem>
                    <SelectItem value="UNIVERSITY" className="text-black font-medium">
                      Üniversite
                    </SelectItem>
                    <SelectItem value="OTHER" className="text-black font-medium">
                      Diğer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="student_count" className="text-black font-extrabold drop-shadow-md text-base">
                  Öğrenci Sayısı
                </Label>
                <Input
                  id="student_count"
                  name="student_count"
                  type="number"
                  placeholder="0"
                  defaultValue={0}
                  className="bg-white border-gray-300 shadow-sm text-black font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="manager_name" className="text-black font-extrabold drop-shadow-md text-base">
                  Müdür Adı
                </Label>
                <Input
                  id="manager_name"
                  name="manager_name"
                  placeholder="Örn: Ahmet Yılmaz"
                  className="bg-white border-gray-300 shadow-sm text-black font-medium"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="manager_phone" className="text-black font-extrabold drop-shadow-md text-base">
                  Müdür Telefonu
                </Label>
                <Input
                  id="manager_phone"
                  name="manager_phone"
                  placeholder="0532 XXX XX XX"
                  className="bg-white border-gray-300 shadow-sm text-black font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-black font-extrabold drop-shadow-md text-base">
                  Kurum Telefonu
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="0216 XXX XX XX"
                  className="bg-white border-gray-300 shadow-sm text-black font-medium"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-black font-extrabold drop-shadow-md text-base">
                  E-posta
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="kurum@example.com"
                  className="bg-white border-gray-300 shadow-sm text-black font-medium"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address" className="text-black font-extrabold drop-shadow-md text-base">
                Adres
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Tam adres"
                className="bg-white border-gray-300 shadow-sm text-black font-medium"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 font-bold shadow-md rounded-xl hover:bg-gray-50"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white w-full sm:w-auto shadow-xl font-bold rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ekleniyor...
                </>
              ) : (
                "Kurum Ekle"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
