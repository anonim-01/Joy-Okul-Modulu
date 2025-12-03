import { createFluentCRMServerClient } from "@/lib/supabase/fluent-server"
import type { Contact } from "@/lib/types/fluent-crm-database"
import { Building2, Mail, Phone, MapPin, TrendingUp } from "lucide-react"

export default async function FluentContactsPage() {
  const supabase = await createFluentCRMServerClient()

  const { data: contacts, error } = await supabase
    .from("fc_contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    console.error("Error fetching contacts:", error)
  }

  return (
    <div className="min-h-screen bg-[#fef9f6] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black drop-shadow-md">İletişim Yönetimi</h1>
            <p className="text-gray-600 mt-2">Müşteri ve potansiyel müşteri bilgilerini yönetin</p>
          </div>
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg">
            Yeni İletişim Ekle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {contacts &&
            contacts.map((contact: Contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {contact.first_name?.[0] || contact.email[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-black drop-shadow-sm">
                        {contact.first_name} {contact.last_name}
                      </h3>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          contact.status === "subscribed"
                            ? "bg-green-100 text-green-700"
                            : contact.status === "unsubscribed"
                              ? "bg-red-100 text-red-700"
                              : contact.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-black">{contact.total_points || 0}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>

                  {contact.phone && (
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{contact.phone}</span>
                    </div>
                  )}

                  {(contact.city || contact.country) && (
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{[contact.city, contact.country].filter(Boolean).join(", ")}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Tip: <span className="font-medium text-black">{contact.contact_type}</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    LTV: <span className="font-medium text-black">${contact.life_time_value || 0}</span>
                  </span>
                </div>
              </div>
            ))}
        </div>

        {(!contacts || contacts.length === 0) && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">Henüz iletişim eklenmemiş</h3>
            <p className="text-gray-600 mb-6">İlk iletişiminizi eklemek için başlayın</p>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              İletişim Ekle
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
