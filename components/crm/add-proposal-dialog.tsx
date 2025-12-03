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

export function AddProposalDialog({ schools }: { schools: School[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

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
          <DialogTitle>Yeni Teklif Oluştur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Teklif Başlığı *</Label>
              <Input name="title" placeholder="Teklif başlığı" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Teklif Kodu *</Label>
              <Input name="code" placeholder="TKL-2024-001" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Tutar</Label>
              <Input type="number" step="0.01" name="amount" placeholder="0.00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Para Birimi</Label>
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
            <Label htmlFor="status">Durum *</Label>
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

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validity_date">Geçerlilik Tarihi</Label>
              <Input type="date" name="validity_date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date">Başlangıç</Label>
              <Input type="date" name="start_date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">Bitiş</Label>
              <Input type="date" name="end_date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_terms">Ödeme Koşulları</Label>
            <Textarea name="payment_terms" placeholder="Ödeme koşulları..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="warranty">Garanti</Label>
            <Input name="warranty" placeholder="2 yıl garanti" />
          </div>

          <div className="flex gap-3 pt-4">
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
