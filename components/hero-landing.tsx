"use client"

import { motion } from "framer-motion"
import { TransitionLink } from "./transition-link"
import { Building2, Users, FileText, BarChart3, Settings } from "lucide-react"

export function HeroLanding() {
  const modules = [
    {
      title: "Okul Yönetimi",
      description: "Pendik bölgesindeki okulları yönetin, takip edin ve analiz edin",
      icon: Building2,
      href: "/crm/schools",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Ziyaret Takibi",
      description: "Okul ziyaretlerini planlayın ve raporlayın",
      icon: Users,
      href: "/crm/visits",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Teklif Yönetimi",
      description: "Teklifler oluşturun, takip edin ve yönetin",
      icon: FileText,
      href: "/crm/proposals",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Raporlar",
      description: "Detaylı raporlar ve analizler",
      icon: BarChart3,
      href: "/crm/reports",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Sistem Yönetimi",
      description: "Kullanıcılar, roller ve sistem ayarları",
      icon: Settings,
      href: "/crm/admin",
      color: "from-slate-500 to-zinc-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">Ayzio Technology</h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-4">Eğitim Kurumları CRM Sistemi</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Pendik bölgesindeki eğitim kurumlarını yönetin, teklifler hazırlayın ve satış süreçlerinizi takip edin
          </p>
        </motion.div>

        {/* Modules Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <TransitionLink href={module.href}>
                <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <module.icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {module.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">{module.description}</p>
                  </div>
                </div>
              </TransitionLink>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16 text-slate-400"
        >
          <p className="text-sm">Güçlü CRM araçlarıyla satış süreçlerinizi optimize edin</p>
        </motion.div>
      </div>
    </div>
  )
}
