"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TransitionLink } from "@/components/transition-link"
import { ArrowLeft, Users, UserPlus, Shield } from "lucide-react"

export default function UsersManagementPage() {
  const users = [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", role: "Admin", status: "Aktif" },
    { id: 2, name: "Ayşe Kaya", email: "ayse@example.com", role: "Satış", status: "Aktif" },
    { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", role: "Satış", status: "Aktif" },
  ]

  return (
    <div className="space-y-3 pb-20">
      <div className="flex items-center gap-2">
        <TransitionLink href="/crm/admin">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </TransitionLink>
        <div>
          <h1 className="text-base sm:text-lg font-black text-black">Kullanıcı Yönetimi</h1>
          <p className="text-[10px] sm:text-xs text-gray-500">Kullanıcılar, roller ve yetkiler</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl shadow-lg">
          <Users className="w-6 h-6 mb-2 opacity-90" />
          <p className="text-xs font-medium opacity-90">Toplam Kullanıcı</p>
          <p className="text-2xl font-black">{users.length}</p>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-3 rounded-xl shadow-lg">
          <Shield className="w-6 h-6 mb-2 opacity-90" />
          <p className="text-xs font-medium opacity-90">Admin</p>
          <p className="text-2xl font-black">1</p>
        </Card>
      </div>

      <Button size="sm" className="w-full h-9 text-xs bg-blue-600">
        <UserPlus className="w-3.5 h-3.5 mr-2" />
        Yeni Kullanıcı Ekle
      </Button>

      <div className="space-y-2">
        {users.map((user) => (
          <Card key={user.id} className="p-3 rounded-xl shadow-md bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-black truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">
                  {user.role}
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">
                  {user.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
