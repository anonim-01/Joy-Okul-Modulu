"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Filter, Mail, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase/client"
import type { Contact } from "@/lib/types/crm-database"
import { useRouter } from "next/navigation"

export const dynamic = "force-dynamic"

export default function ContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    try {
      const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error("Error fetching contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: Contact["status"]) => {
    const colors = {
      subscribed: "bg-green-100 text-green-700 border border-green-200",
      unsubscribed: "bg-rose-100 text-rose-700 border border-rose-200",
      pending: "bg-amber-100 text-amber-700 border border-amber-200",
      bounced: "bg-slate-100 text-slate-700 border border-slate-200",
    }
    return colors[status]
  }

  const getTypeColor = (type: Contact["contact_type"]) => {
    const colors = {
      lead: "bg-sky-100 text-sky-700 border border-sky-200",
      customer: "bg-violet-100 text-violet-700 border border-violet-200",
      partner: "bg-indigo-100 text-indigo-700 border border-indigo-200",
      subscriber: "bg-teal-100 text-teal-700 border border-teal-200",
    }
    return colors[type]
  }

  const getStatusText = (status: Contact["status"]) => {
    const texts = {
      subscribed: "Abone",
      unsubscribed: "Abonelikten Çıkmış",
      pending: "Beklemede",
      bounced: "Geri Döndü",
    }
    return texts[status]
  }

  const getTypeText = (type: Contact["contact_type"]) => {
    const texts = {
      lead: "Potansiyel",
      customer: "Müşteri",
      partner: "Partner",
      subscriber: "Abone",
    }
    return texts[type]
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/crm/dashboard")}
          className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/100 transition-all"
        >
          <X className="h-5 w-5 text-gray-700" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-col justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              İletişim Yönetimi
            </h1>
            <p className="text-gray-600 mt-1">Tüm müşteri ve potansiyel müşterileri yönetin</p>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg w-full rounded-2xl h-12">
            <Plus className="h-5 w-5" />
            Yeni İletişim Ekle
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="İsim, email veya telefon ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-2xl bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm h-12"
            />
          </div>
          <Button variant="outline" className="gap-2 rounded-2xl bg-white/80 backdrop-blur-sm border-gray-200 h-12">
            <Filter className="h-5 w-5" />
            Filtrele
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <p className="text-gray-500 text-center py-8">Yükleniyor...</p>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Henüz iletişim eklenmemiş</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className="hover:shadow-xl transition-all cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-md rounded-2xl overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                        <AvatarImage src={contact.avatar || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-white font-bold text-lg">
                          {contact.first_name[0]}
                          {contact.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg text-gray-900 font-bold">
                          {contact.first_name} {contact.last_name}
                        </CardTitle>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <Badge
                            className={`${getStatusColor(contact.status)} rounded-full px-3 py-1 text-xs font-medium`}
                          >
                            {getStatusText(contact.status)}
                          </Badge>
                          <Badge
                            className={`${getTypeColor(contact.contact_type)} rounded-full px-3 py-1 text-xs font-medium`}
                          >
                            {getTypeText(contact.contact_type)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50/50 p-2 rounded-lg">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <a href={`mailto:${contact.email}`} className="hover:text-blue-600 truncate font-medium">
                      {contact.email}
                    </a>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-green-50/50 p-2 rounded-lg">
                      <Phone className="h-4 w-4 text-green-500" />
                      <a href={`tel:${contact.phone}`} className="hover:text-green-600 font-medium">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                  {contact.city && (
                    <div className="text-sm text-gray-600 bg-purple-50/50 p-2 rounded-lg">
                      📍 {contact.city}, {contact.country}
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-xs text-gray-600 bg-green-50 px-3 py-1.5 rounded-full">
                      Yaşam Boyu Değer: <span className="font-bold text-green-700">${contact.life_time_value}</span>
                    </div>
                    <div className="text-xs text-gray-600 bg-blue-50 px-3 py-1.5 rounded-full">
                      Puan: <span className="font-bold text-blue-700">{contact.total_points}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
