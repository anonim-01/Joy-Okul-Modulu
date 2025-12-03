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
import { addProposal } from "@/app/crm/proposals/actions"
import { toast } from "sonner"

interface School {
  id: string
  name: string
}

interface Brand {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  brand: string
  sku: string
}

export function AddProposalDialog({
  schools,
  brands,
  products,
}: { schools: School[]; brands: Brand[]; products: Product[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<string>("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      await addProposal(formData)
      toast.success("Teklif başarıyla oluşturuldu")
      setOpen(false)
    } catch (error) {
      toast.error("Teklif oluşturulurken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = selectedBrand ? products.filter((p) => p.brand === selectedBrand) : products

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          Yeni Teklif Oluştur
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-black">Yeni Teklif Oluştur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school_id" className="text-black font-bold drop-shadow-sm">
              Kurum *
            </Label>
            <Select name="school_id" required>
              <SelectTrigger>
                <SelectValue placeholder="Kurum seçin" />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-black font-bold drop-shadow-sm">
                Teklif Başlığı *
              </Label>
              <Input name="title" placeholder="Teklif başlığı" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code" className="text-black font-bold drop-shadow-sm">
                Teklif Kodu *
              </Label>
              <Input name="code" placeholder="TKL-2024-001" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand" className="text-black font-bold drop-shadow-sm">
                Marka
              </Label>
              <Select name="brand" value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Marka seçin" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product" className="text-black font-bold drop-shadow-sm">
                Ürün
              </Label>
              <Select name="product" disabled={!selectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder={selectedBrand ? "Ürün seçin" : "Önce marka seçin"} />
                </SelectTrigger>
                <SelectContent>
                  {filteredProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} ({product.sku})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-black font-bold drop-shadow-sm">
                Tutar
              </Label>
              <Input type="number" step="0.01" name="amount" placeholder="0.00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="text-black font-bold drop-shadow-sm">
                Para Birimi
              </Label>
              <Select name="currency" defaultValue="TRY">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TRY">TRY</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-black font-bold drop-shadow-sm">
              Durum *
            </Label>
            <Select name="status" required defaultValue="DRAFT">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Taslak</SelectItem>
                <SelectItem value="SENT">Gönderildi</SelectItem>
                <SelectItem value="APPROVED">Onaylandı</SelectItem>
                <SelectItem value="REJECTED">Reddedildi</SelectItem>
                <SelectItem value="REVISED">Revize</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validity_date" className="text-black font-bold drop-shadow-sm">
                Geçerlilik Tarihi
              </Label>
              <Input type="date" name="validity_date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date" className="text-black font-bold drop-shadow-sm">
                Başlangıç
              </Label>
              <Input type="date" name="start_date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date" className="text-black font-bold drop-shadow-sm">
                Bitiş
              </Label>
              <Input type="date" name="end_date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_terms" className="text-black font-bold drop-shadow-sm">
              Ödeme Koşulları
            </Label>
            <Textarea name="payment_terms" placeholder="Ödeme koşulları..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="warranty" className="text-black font-bold drop-shadow-sm">
              Garanti
            </Label>
            <Input name="warranty" placeholder="2 yıl garanti" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              İptal
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {loading ? "Oluşturuluyor..." : "Oluştur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
