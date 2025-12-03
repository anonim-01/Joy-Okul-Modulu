import { createClient } from "@/lib/supabase/server"
import { TransitionLink } from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Settings } from "lucide-react"
import { AddUserDialog } from "@/components/crm/add-user-dialog"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: users } = await supabase.from("users").select("*").order("created_at", { ascending: false })

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      SUPER_ADMIN: "bg-red-100 text-red-700",
      ADMIN: "bg-orange-100 text-orange-700",
      EDITOR: "bg-blue-100 text-blue-700",
      VIEWER: "bg-gray-100 text-gray-700",
      SALES: "bg-green-100 text-green-700",
    }
    return colors[role] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <TransitionLink href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Button>
            </TransitionLink>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-md mb-2">Sistem Yönetimi</h1>
          <p className="text-gray-700 drop-shadow-sm">Kullanıcılar, roller ve sistem ayarları</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-slate-700" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 drop-shadow-sm">Kullanıcılar</h2>
                </div>
                <AddUserDialog />
              </div>

              <div className="space-y-3">
                {users && users.length > 0 ? (
                  users.map((user: any) => (
                    <div
                      key={user.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {user.name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 drop-shadow-sm">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge className={getRoleBadge(user.role)}>{user.role}</Badge>
                        {user.is_active ? (
                          <Badge className="bg-green-100 text-green-700">Aktif</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700">Pasif</Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-600">Henüz kullanıcı bulunmuyor</div>
                )}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-slate-700" />
                <h2 className="text-xl font-bold text-gray-900 drop-shadow-sm">Ayarlar</h2>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-blue-50 transition-colors bg-transparent"
                  size="lg"
                >
                  Sistem Ayarları
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-blue-50 transition-colors bg-transparent"
                  size="lg"
                >
                  Email Şablonları
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-blue-50 transition-colors bg-transparent"
                  size="lg"
                >
                  Yedekleme
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-blue-50 transition-colors bg-transparent"
                  size="lg"
                >
                  İşlem Logları
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
