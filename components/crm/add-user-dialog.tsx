"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { addUser } from "@/app/crm/admin/actions"
import { toast } from "sonner"

export function AddUserDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      await addUser(formData)
      toast.success("Kullanıcı başarıyla eklendi")
      setOpen(false)
    } catch (error) {
      toast.error("Kullanıcı eklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Kullanıcı Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad *</Label>
            <Input name="name" placeholder="Ahmet Yılmaz" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input type="email" name="email" placeholder="ahmet@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input type="tel" name="phone" placeholder="0532 123 45 67" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rol *</Label>
            <Select name="role" required>
              <SelectTrigger>
                <SelectValue placeholder="Rol seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SUPER_ADMIN">Süper Admin</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SALES">Satış</SelectItem>
                <SelectItem value="EDITOR">Editör</SelectItem>
                <SelectItem value="VIEWER">Görüntüleyici</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Departman</Label>
            <Input name="department" placeholder="Satış" />
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
