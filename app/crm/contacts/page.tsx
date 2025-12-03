"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Filter, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createBrowserClient } from "@supabase/ssr"
import type { Contact } from "@/lib/types/crm-database"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    try {
      const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error("[v0] Error fetching contacts:", error)
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
      subscribed: "bg-green-100 text-green-800",
      unsubscribed: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      bounced: "bg-gray-100 text-gray-800",
    }
    return colors[status]
  }

  const getTypeColor = (type: Contact["contact_type"]) => {
    const colors = {
      lead: "bg-blue-100 text-blue-800",
      customer: "bg-purple-100 text-purple-800",
      partner: "bg-indigo-100 text-indigo-800",
      subscriber: "bg-cyan-100 text-cyan-800",
    }
    return colors[type]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 drop-shadow-md">İletişim Yönetimi</h1>
          <p className="text-gray-600 mt-1">Tüm müşteri ve potansiyel müşterileri yönetin</p>
        </div>
        <Button className="gap-2 shadow-lg" size="lg">
          <Plus className="h-5 w-5" />
          Yeni İletişim Ekle
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="İsim, email veya telefon ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 shadow-sm"
          />
        </div>
        <Button variant="outline" className="gap-2 shadow-sm bg-transparent">
          <Filter className="h-5 w-5" />
          Filtrele
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : filteredContacts.length === 0 ? (
          <p className="text-gray-500">Henüz iletişim eklenmemiş</p>
        ) : (
          filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                        {contact.first_name[0]}
                        {contact.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-gray-900 drop-shadow-sm">
                        {contact.first_name} {contact.last_name}
                      </CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge className={getStatusColor(contact.status)} variant="secondary">
                          {contact.status}
                        </Badge>
                        <Badge className={getTypeColor(contact.contact_type)} variant="secondary">
                          {contact.contact_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${contact.email}`} className="hover:text-blue-600 truncate">
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.city && (
                  <div className="text-sm text-gray-600">
                    📍 {contact.city}, {contact.country}
                  </div>
                )}
                <div className="pt-3 border-t flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    LTV: <span className="font-bold text-green-600">${contact.life_time_value}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Puan: <span className="font-bold text-blue-600">{contact.total_points}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
