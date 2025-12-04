"use client"

import { Card } from "@/components/ui/card"
import { TransitionLink } from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import {
  Users,
  Settings,
  Database,
  Mail,
  Activity,
  Building2,
  FileText,
  Shield,
  Bell,
  Palette,
  Globe,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"

export default function AdminPage() {
  const settingsCategories = [
    {
      title: "Kullanıcı Yönetimi",
      description: "Kullanıcılar, roller ve yetkiler",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      href: "/crm/admin/users",
      count: "12 kullanıcı",
    },
    {
      title: "Sistem Ayarları",
      description: "Genel yapılandırma ve ayarlar",
      icon: Settings,
      color: "from-purple-500 to-purple-600",
      href: "/crm/admin/system",
      count: "8 ayar",
    },
    {
      title: "Veritabanı",
      description: "CSV, XML, SQL yönetimi",
      icon: Database,
      color: "from-emerald-500 to-emerald-600",
      href: "/crm/admin/database",
      count: "Admin",
    },
    {
      title: "Email Şablonları",
      description: "Otomatik email düzenleme",
      icon: Mail,
      color: "from-orange-500 to-orange-600",
      href: "/crm/admin/email",
      count: "6 şablon",
    },
    {
      title: "İşlem Logları",
      description: "Sistem aktiviteleri",
      icon: Activity,
      color: "from-pink-500 to-pink-600",
      href: "/crm/admin/logs",
      count: "Canlı",
    },
    {
      title: "Kurum Ayarları",
      description: "Şirket bilgileri ve logo",
      icon: Building2,
      color: "from-cyan-500 to-cyan-600",
      href: "/crm/admin/company",
      count: "Profil",
    },
    {
      title: "Raporlar",
      description: "Sistem ve kullanım raporları",
      icon: FileText,
      color: "from-indigo-500 to-indigo-600",
      href: "/crm/admin/reports",
      count: "Detaylı",
    },
    {
      title: "Güvenlik",
      description: "Şifre politikaları ve 2FA",
      icon: Shield,
      color: "from-red-500 to-red-600",
      href: "/crm/admin/security",
      count: "Kritik",
    },
    {
      title: "Bildirimler",
      description: "Push ve email bildirimleri",
      icon: Bell,
      color: "from-yellow-500 to-yellow-600",
      href: "/crm/admin/notifications",
      count: "Aktif",
    },
    {
      title: "Tema Ayarları",
      description: "Renk ve görünüm düzenleme",
      icon: Palette,
      color: "from-fuchsia-500 to-fuchsia-600",
      href: "/crm/admin/theme",
      count: "Özelleştir",
    },
    {
      title: "Dil ve Bölge",
      description: "Çoklu dil ve zaman dilimi",
      icon: Globe,
      color: "from-teal-500 to-teal-600",
      href: "/crm/admin/locale",
      count: "3 dil",
    },
  ]

  return (
    <div className="space-y-3 pb-20">
      <div className="flex items-center gap-2">
        <TransitionLink href="/crm/dashboard">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </TransitionLink>
        <div>
          <h1 className="text-base sm:text-lg font-black text-black">Ayarlar</h1>
          <p className="text-[10px] sm:text-xs text-gray-500">Sistem yönetimi ve yapılandırma</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {settingsCategories.map((category) => {
          const Icon = category.icon
          return (
            <TransitionLink key={category.href} href={category.href}>
              <Card
                className={`bg-gradient-to-br ${category.color} text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 h-full`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <Icon className="w-6 h-6 opacity-90" />
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold mb-1 line-clamp-1">{category.title}</h3>
                    <p className="text-[10px] opacity-80 line-clamp-2">{category.description}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <span className="text-[9px] font-medium opacity-90">{category.count}</span>
                  </div>
                </div>
              </Card>
            </TransitionLink>
          )
        })}
      </div>

      <Card className="p-3 rounded-xl shadow-md bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4" />
          <h2 className="text-sm font-bold">Admin Erişimi</h2>
        </div>
        <p className="text-xs opacity-90">
          Bu bölüm yalnızca sistem yöneticileri tarafından erişilebilir. Tüm değişiklikler loglanır.
        </p>
      </Card>
    </div>
  )
}
