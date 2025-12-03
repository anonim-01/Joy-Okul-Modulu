"use client"

import { useState } from "react"
import { TransitionLink } from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, Settings, Database, Mail, Activity } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users")

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
          <h1 className="text-3xl md:text-4xl font-extrabold text-black drop-shadow-lg mb-2">Sistem Yönetimi</h1>
          <p className="text-gray-800 drop-shadow-sm font-medium">Kullanıcılar, roller ve sistem ayarları</p>
        </div>

        <Card className="bg-white shadow-xl border-2 border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex overflow-x-auto scrollbar-hide p-1 bg-gray-100 gap-1">
              <TabsTrigger value="users" className="flex-shrink-0 text-[10px] sm:text-xs px-2 py-1.5 gap-1">
                <Users className="w-3 h-3" />
                <span>Kullanıcılar</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex-shrink-0 text-[10px] sm:text-xs px-2 py-1.5 gap-1">
                <Settings className="w-3 h-3" />
                <span>Ayarlar</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex-shrink-0 text-[10px] sm:text-xs px-2 py-1.5 gap-1">
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="backup" className="flex-shrink-0 text-[10px] sm:text-xs px-2 py-1.5 gap-1">
                <Database className="w-3 h-3" />
                <span>Yedek</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex-shrink-0 text-[10px] sm:text-xs px-2 py-1.5 gap-1">
                <Activity className="w-3 h-3" />
                <span>Loglar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="p-6">
              <h2 className="text-2xl font-bold text-black drop-shadow-md mb-4">Kullanıcı Yönetimi</h2>
              <p className="text-gray-700 mb-6">
                Sistem kullanıcılarını yönetin, roller atayın ve yetkilendirme yapın.
              </p>
              <div className="space-y-4">
                <Card className="p-4 bg-gray-50 shadow-md">
                  <h3 className="font-bold text-black mb-2">Toplam Kullanıcılar</h3>
                  <p className="text-3xl font-extrabold text-blue-600">12</p>
                </Card>
              </div>
              <Button size="sm" className="mt-3 text-xs h-8 bg-blue-600">
                + Kullanıcı Ekle
              </Button>
            </TabsContent>

            <TabsContent value="system" className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-black drop-shadow-md mb-4">Sistem Ayarları</h2>
              <p className="text-gray-700 mb-6">Genel sistem ayarlarını yapılandırın.</p>
              <div className="space-y-4">
                <Card className="p-4 bg-gray-50 shadow-md">
                  <h3 className="font-bold text-black mb-2">Şirket Bilgileri</h3>
                  <p className="text-gray-600">Şirket adı, logo ve iletişim bilgilerini güncelleyin.</p>
                </Card>
                <Card className="p-4 bg-gray-50 shadow-md">
                  <h3 className="font-bold text-black mb-2">Genel Ayarlar</h3>
                  <p className="text-gray-600">Dil, zaman dilimi ve para birimi ayarları.</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="email" className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-black drop-shadow-md mb-4">Email Şablonları</h2>
              <p className="text-gray-700 mb-6">Otomatik email şablonlarını düzenleyin.</p>
              <div className="space-y-4">
                <Card className="p-4 bg-gray-50 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-bold text-black mb-2">Hoş Geldiniz Email</h3>
                  <p className="text-gray-600">Yeni kullanıcılar için hoş geldiniz mesajı.</p>
                </Card>
                <Card className="p-4 bg-gray-50 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-bold text-black mb-2">Teklif Onayı</h3>
                  <p className="text-gray-600">Teklif onaylandığında gönderilen email.</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="backup" className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-black drop-shadow-md mb-4">Yedekleme</h2>
              <p className="text-gray-700 mb-6">Veritabanı yedekleme ve geri yükleme işlemleri.</p>
              <div className="space-y-4">
                <Card className="p-4 bg-gray-50 shadow-md">
                  <h3 className="font-bold text-black mb-2">Otomatik Yedekleme</h3>
                  <p className="text-gray-600 mb-4">Son yedekleme: 2 gün önce</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">Şimdi Yedekle</Button>
                </Card>
                <Card className="p-4 bg-gray-50 shadow-md">
                  <h3 className="font-bold text-black mb-2">Yedekleri Geri Yükle</h3>
                  <p className="text-gray-600 mb-4">Önceki yedeklemelerden birini geri yükleyin.</p>
                  <Button variant="outline" className="shadow-md bg-transparent">
                    Yedekleri Görüntüle
                  </Button>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="p-6 space-y-3">
              <h2 className="text-2xl font-bold text-black drop-shadow-md mb-4">İşlem Logları</h2>
              <p className="text-gray-700 mb-6">Sistem aktivitelerini ve kullanıcı işlemlerini görüntüleyin.</p>
              <div className="space-y-3">
                <Card className="p-4 bg-gray-50 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-black">Yeni kurum eklendi</p>
                      <p className="text-sm text-gray-600">Kullanıcı: Admin • 5 dakika önce</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      Başarılı
                    </span>
                  </div>
                </Card>
                <Card className="p-4 bg-gray-50 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-black">Teklif güncellendi</p>
                      <p className="text-sm text-gray-600">Kullanıcı: Satış Ekibi • 1 saat önce</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      Güncelleme
                    </span>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-black drop-shadow-md mb-4">Sistem Raporları</h2>
              <p className="text-gray-700 mb-6">Detaylı sistem ve kullanım raporlarını görüntüleyin.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-gray-50 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-bold text-black mb-2">Aylık Özet</h3>
                  <p className="text-gray-600">Bu ayki toplam aktiviteler ve istatistikler.</p>
                </Card>
                <Card className="p-4 bg-gray-50 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-bold text-black mb-2">Kullanıcı Aktiviteleri</h3>
                  <p className="text-gray-600">Kullanıcı bazlı işlem raporları.</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
