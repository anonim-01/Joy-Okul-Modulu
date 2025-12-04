"use client"

import { CommandGroup } from "@/components/ui/command"

import { CommandEmpty } from "@/components/ui/command"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Search, Building2 } from "lucide-react"
import { addVisit } from "@/app/crm/visits/actions"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Command, CommandList, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AITextInput } from "@/components/ai-text-input"

interface School {
  id: string
  name: string
}

interface User {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  price: number
}

interface KanbanProject {
  id: string
  title: string
}

export function AddVisitDialog({ schools, users }: { schools: School[]; users: User[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [schoolId, setSchoolId] = useState("")
  const [visitorId, setVisitorId] = useState("")
  const [visitType, setVisitType] = useState("")
  const [status, setStatus] = useState("PLANNED")

  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [kanbanProjects, setKanbanProjects] = useState<KanbanProject[]>([])
  const [participants, setParticipants] = useState<string>("")
  const [assignees, setAssignees] = useState<string[]>([])
  const [schoolSearch, setSchoolSearch] = useState("")
  const [showNewSchoolForm, setShowNewSchoolForm] = useState(false)
  const [newSchoolName, setNewSchoolName] = useState("")
  const [schoolSearchOpen, setSchoolSearchOpen] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    loadProducts()
    loadKanbanProjects()
  }, [])

  const loadProducts = async () => {
    const { data } = await supabase.from("products").select("id, name, price").eq("is_active", true)
    if (data) setProducts(data)
  }

  const loadKanbanProjects = async () => {
    const { data } = await supabase.from("schools").select("id, status").neq("status", null)
    if (data) {
      const statuses = [...new Set(data.map((s: any) => s.status))]
      setKanbanProjects(statuses.map((s) => ({ id: s, title: s })))
    }
  }

  const validateParticipants = (text: string) => {
    const names = text
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n)
    const validNames = names.filter((name) => {
      const words = name.split(" ").filter((w) => w)
      return words.length >= 2 && words.length <= 3
    })
    return validNames
  }

  const handleAddNewSchool = async () => {
    if (!newSchoolName.trim()) {
      toast.error("Kurum adı gerekli")
      return
    }

    const { data, error } = await supabase
      .from("schools")
      .insert({ name: newSchoolName.trim(), status: "NEW" })
      .select()
      .single()

    if (error) {
      toast.error("Kurum eklenirken hata oluştu")
      return
    }

    toast.success("Yeni kurum eklendi")
    setSchoolId(data.id)
    setNewSchoolName("")
    setShowNewSchoolForm(false)
    setSchoolSearchOpen(false)
  }

  const filteredSchools =
    schoolSearch.length >= 3
      ? schools.filter((s) => s.name.toLowerCase().includes(schoolSearch.toLowerCase()))
      : schools

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("school_id", schoolId)
      formData.set("visitor_id", visitorId)
      formData.set("visit_type", visitType)
      formData.set("status", status)

      const validParticipants = validateParticipants(participants)
      if (participants && validParticipants.length === 0) {
        toast.error("Katılımcı isimleri 2-3 kelime olmalı (örn: Mert Koray Karakuş)")
        setLoading(false)
        return
      }
      formData.set("participants", validParticipants.join(", "))

      formData.set("products", JSON.stringify(selectedProducts))

      formData.set("assignees", JSON.stringify(assignees))

      await addVisit(formData)
      toast.success("Ziyaret başarıyla eklendi")
      setOpen(false)

      // Reset form
      setSchoolId("")
      setVisitorId("")
      setVisitType("")
      setStatus("PLANNED")
      setSelectedProducts([])
      setParticipants("")
      setAssignees([])
    } catch (error) {
      toast.error("Ziyaret eklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl w-full sm:w-auto rounded-full font-bold"
        >
          <Plus className="w-5 h-5" />
          Yeni Ziyaret Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-2 border-gray-200 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-black text-center">Yeni Ziyaret Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school_id" className="text-black font-extrabold text-base">
                Kurum *
              </Label>
              <Popover open={schoolSearchOpen} onOpenChange={setSchoolSearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between bg-white border-gray-300 shadow-sm text-black font-medium"
                  >
                    {schoolId ? schools.find((s) => s.id === schoolId)?.name : "Kurum seçin veya arayın..."}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="En az 3 harf yazın..."
                      value={schoolSearch}
                      onValueChange={setSchoolSearch}
                    />
                    <CommandList>
                      <CommandEmpty>
                        {schoolSearch.length < 3 ? (
                          <p className="text-sm text-gray-500 p-2">En az 3 harf yazın</p>
                        ) : (
                          <div className="p-2">
                            <p className="text-sm text-gray-500 mb-2">Kurum bulunamadı</p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setShowNewSchoolForm(true)
                                setNewSchoolName(schoolSearch)
                              }}
                              className="w-full"
                            >
                              <Building2 className="w-4 h-4 mr-2" />
                              Yeni Kurum Ekle
                            </Button>
                          </div>
                        )}
                      </CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-auto">
                        {filteredSchools.map((school) => (
                          <CommandItem
                            key={school.id}
                            onSelect={() => {
                              setSchoolId(school.id)
                              setSchoolSearchOpen(false)
                            }}
                          >
                            {school.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitor_id" className="text-black font-extrabold text-base">
                Ziyaretçi *
              </Label>
              <Select name="visitor_id" required value={visitorId} onValueChange={setVisitorId}>
                <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl">
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

          {showNewSchoolForm && (
            <div className="p-4 border-2 border-blue-200 rounded-xl bg-blue-50">
              <Label className="text-black font-bold mb-2">Yeni Kurum Ekle</Label>
              <div className="flex gap-2">
                <Input
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                  placeholder="Kurum adı..."
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddNewSchool} size="sm">
                  Ekle
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowNewSchoolForm(false)}>
                  İptal
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visit_date" className="text-black font-extrabold text-base">
                Ziyaret Tarihi *
              </Label>
              <Input
                type="date"
                name="visit_date"
                required
                className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit_type" className="text-black font-extrabold text-base">
                Ziyaret Tipi *
              </Label>
              <Select name="visit_type" required value={visitType} onValueChange={setVisitType}>
                <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl">
                  <SelectValue placeholder="Tip seçin" />
                </SelectTrigger>
                <SelectContent className="bg-white">
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
            <Label htmlFor="status" className="text-black font-extrabold text-base">
              Durum *
            </Label>
            <Select name="status" required value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {kanbanProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-black font-extrabold text-base">Satılan Ürünler</Label>
            <Select onValueChange={(val) => setSelectedProducts([...selectedProducts, val])}>
              <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl">
                <SelectValue placeholder="Ürün seçin..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - {product.price}₺
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedProducts.map((productId) => {
                const product = products.find((p) => p.id === productId)
                return (
                  <Badge key={productId} variant="secondary" className="gap-1">
                    {product?.name}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSelectedProducts(selectedProducts.filter((p) => p !== productId))}
                    />
                  </Badge>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants" className="text-black font-extrabold text-base">
              Katılımcılar
            </Label>
            <Input
              name="participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="Örn: Mert Koray Karakuş, Ahmet Yılmaz"
              className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl"
            />
            <p className="text-xs text-gray-500">İsimler 2-3 kelime olmalı, virgülle ayırın</p>
          </div>

          <div className="space-y-2">
            <Label className="text-black font-extrabold text-base">Atacak Kişi Ekle</Label>
            <Select onValueChange={(val) => setAssignees([...assignees, val])}>
              <SelectTrigger className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl">
                <SelectValue placeholder="Kişi seçin..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {assignees.map((userId) => {
                const user = users.find((u) => u.id === userId)
                return (
                  <Badge key={userId} variant="secondary" className="gap-1">
                    {user?.name}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setAssignees(assignees.filter((u) => u !== userId))}
                    />
                  </Badge>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" className="text-black font-extrabold text-base">
              Özet
            </Label>
            <AITextInput
              name="summary"
              placeholder="Ziyaret özeti..."
              rows={3}
              className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="findings" className="text-black font-extrabold text-base">
              Bulgular
            </Label>
            <AITextInput
              name="findings"
              placeholder="Tespit edilen bulgular..."
              rows={3}
              className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="action_items" className="text-black font-extrabold text-base">
              Yapılacak İşler
            </Label>
            <AITextInput
              name="action_items"
              placeholder="Yapılacaklar..."
              rows={2}
              className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="next_steps" className="text-black font-extrabold text-base">
              Sonraki Adımlar
            </Label>
            <AITextInput
              name="next_steps"
              placeholder="Sonraki adımlar..."
              rows={2}
              className="bg-white border-gray-300 shadow-sm text-black font-medium rounded-xl"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-2 border-gray-300 text-black font-bold shadow-md rounded-full"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl font-bold rounded-full"
            >
              {loading ? "Ekleniyor..." : "Ekle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
