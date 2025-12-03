"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { TransitionLink } from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  LayoutDashboard,
  School,
  ClipboardList,
  FileText,
  Settings,
  Home,
  Users,
  Mail,
  GitBranch,
  Tags,
  List,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Calendar,
  Bell,
  Search,
  User,
  LogOut,
  Sun,
  Moon,
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

// Altın oran değeri (φ = 1.618)
const GOLDEN_RATIO = 1.618

interface MenuItem {
  icon: any
  label: string
  href: string
  badge?: number
  color?: string
}

interface MenuCategory {
  title: string
  items: MenuItem[]
  defaultOpen?: boolean
  icon?: any
  color?: string
}

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Temel Modüller", "Genel"])
  const [isMobile, setIsMobile] = useState(false)
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [scrolled, setScrolled] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Altın oran ile hesaplanan boyutlar
  const dimensions = {
    sidebarWidth: isMobile ? "80vw" : `calc(100vw / ${GOLDEN_RATIO + 1})`,
    itemHeight: `${56 / GOLDEN_RATIO}px`,
    iconSize: `${20 / GOLDEN_RATIO}px`,
    borderRadius: `${8 / GOLDEN_RATIO}px`,
    spacing: `${8 * GOLDEN_RATIO}px`,
  }

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      if (width < 640) {
        setIsMobile(true)
        setDeviceType("mobile")
      } else if (width < 1024) {
        setIsMobile(false)
        setDeviceType("tablet")
      } else {
        setIsMobile(false)
        setDeviceType("desktop")
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    checkDeviceType()
    window.addEventListener("resize", checkDeviceType)
    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("resize", checkDeviceType)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarOpen])

  const menuCategories: MenuCategory[] = [
    {
      title: "Genel",
      icon: Home,
      color: "from-blue-500 to-cyan-400",
      defaultOpen: true,
      items: [
        { icon: Home, label: "Ana Sayfa", href: "/", color: "text-blue-600" },
        { icon: LayoutDashboard, label: "Dashboard", href: "/crm/dashboard", color: "text-purple-600", badge: 3 },
      ],
    },
    {
      title: "Temel Modüller",
      icon: Zap,
      color: "from-emerald-500 to-green-400",
      defaultOpen: true,
      items: [
        { icon: GitBranch, label: "Kanban Board", href: "/crm/kanban", color: "text-emerald-600", badge: 5 },
        { icon: School, label: "Kurum Yönetimi", href: "/crm/schools", color: "text-amber-600" },
        { icon: ClipboardList, label: "Ziyaret Takibi", href: "/crm/visits", color: "text-rose-600", badge: 2 },
        { icon: FileText, label: "Teklif Yönetimi", href: "/crm/proposals", color: "text-indigo-600" },
        { icon: Calendar, label: "Takvim", href: "/crm/calendar", color: "text-red-600", badge: 1 },
        { icon: BarChart3, label: "Raporlar", href: "/crm/reports", color: "text-teal-600" },
      ],
    },
    {
      title: "Marketing",
      icon: Sparkles,
      color: "from-violet-500 to-purple-400",
      items: [
        { icon: Users, label: "İletişimler", href: "/crm/fluent/contacts", color: "text-violet-600", badge: 12 },
        { icon: Mail, label: "Kampanyalar", href: "/crm/fluent/campaigns", color: "text-pink-600" },
        { icon: GitBranch, label: "Otomasyonlar", href: "/crm/fluent/funnels", color: "text-orange-600" },
        { icon: Tags, label: "Etiketler", href: "/crm/fluent/tags", color: "text-lime-600" },
        { icon: List, label: "Listeler", href: "/crm/fluent/lists", color: "text-cyan-600" },
      ],
    },
    {
      title: "Sistem",
      icon: Settings,
      color: "from-gray-600 to-gray-400",
      items: [
        { icon: Settings, label: "Ayarlar", href: "/crm/admin", color: "text-gray-600" },
        { icon: Bell, label: "Bildirimler", href: "/crm/notifications", color: "text-yellow-600", badge: 7 },
      ],
    },
  ]

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) =>
      prev.includes(title) ? prev.filter((cat) => cat !== title) : [...prev, title]
    )
  }

  const getDeviceIcon = () => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Button
          variant="default"
          size="icon"
          className={cn(
            "fixed bottom-6 right-6 z-50 rounded-full shadow-2xl h-14 w-14 transition-all duration-300",
            "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
            "shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
          )}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      {/* Main Layout */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={cn(
            "fixed lg:sticky top-0 left-0 h-screen bg-white/95 backdrop-blur-xl z-40",
            "transition-all duration-300 ease-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
            "border-r border-gray-200/50 shadow-2xl shadow-black/5",
            "transform-gpu",
            isMobile ? "w-[80vw]" : `w-[${dimensions.sidebarWidth}]`,
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
          style={{
            width: isMobile ? "80vw" : `min(calc(100vw / ${GOLDEN_RATIO + 1}), 280px)`,
          }}
        >
          {/* Sidebar Header */}
          <div className={cn(
            "sticky top-0 z-10 bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-xl",
            "p-4 border-b border-gray-200/50"
          )}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CRM Pro
                  </h2>
                  <p className="text-xs text-gray-500">Akıllı İş Yönetimi</p>
                </div>
              </div>
              
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => setSidebarOpen(false)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/50 shadow-sm">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">Ahmet Yılmaz</p>
                <p className="text-xs text-gray-500 truncate">Yönetici</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-gray-500 hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-gray-50 border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1">
            {menuCategories.map((category) => {
              const isExpanded = expandedCategories.includes(category.title)
              const isActiveCategory = category.items.some(item => item.href === pathname)

              return (
                <div key={category.title} className="mb-2">
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 text-left font-semibold rounded-xl transition-all duration-200",
                      "hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/50",
                      "group",
                      isActiveCategory && "bg-gradient-to-r from-blue-50/50 to-purple-50/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg bg-gradient-to-r shadow-sm",
                        category.color,
                        "group-hover:shadow-md transition-shadow"
                      )}>
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{category.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-1 ml-4 space-y-0.5 border-l-2 border-gray-200/30 pl-3">
                      {category.items.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <TransitionLink key={item.href} href={item.href}>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start gap-3 transition-all duration-200 h-10 text-sm px-3 rounded-lg",
                                "hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-blue-50/30",
                                "relative group/item",
                                isActive && "bg-gradient-to-r from-blue-50 to-blue-100/50 border-l-4 border-blue-500"
                              )}
                              onClick={() => {
                                if (isMobile) setSidebarOpen(false)
                              }}
                            >
                              <div className={cn(
                                "p-1.5 rounded-md",
                                isActive ? "bg-white shadow-sm" : "bg-gray-100/50 group-hover/item:bg-white"
                              )}>
                                <item.icon className={cn("h-3.5 w-3.5", item.color)} />
                              </div>
                              <span className={cn(
                                "flex-1 text-left truncate",
                                isActive ? "text-blue-700 font-semibold" : "text-gray-700"
                              )}>
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className={cn(
                                  "px-1.5 py-0.5 text-xs rounded-full min-w-[20px] text-center",
                                  isActive 
                                    ? "bg-blue-500 text-white" 
                                    : "bg-gradient-to-r from-gray-200 to-gray-100 text-gray-700"
                                )}>
                                  {item.badge}
                                </span>
                              )}
                              {isActive && (
                                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 h-6 w-1 bg-blue-500 rounded-r-full"></div>
                              )}
                            </Button>
                          </TransitionLink>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 p-4 mt-6">
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center justify-center h-12 rounded-xl gap-1 hover:bg-gray-50"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-500" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-600" />
                )}
                <span className="text-xs">Tema</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center justify-center h-12 rounded-xl gap-1 hover:bg-gray-50"
              >
                <Bell className="h-4 w-4 text-rose-500" />
                <span className="text-xs">Bildirim</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center justify-center h-12 rounded-xl gap-1 hover:bg-gray-50"
              >
                {getDeviceIcon()}
                <span className="text-xs">{deviceType}</span>
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">v2.0.1 • Altın Oran UI</p>
              <div className="flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                <p className="text-xs text-gray-600">Sistem Aktif</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-out min-h-screen",
            "p-4 md:p-6 lg:p-8",
            "ml-0 lg:ml-[min(calc(100vw/2.618),280px)]"
          )}
        >
          {/* Top Bar */}
          <div className={cn(
            "sticky top-0 z-30 mb-6 transition-all duration-300",
            "bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5",
            "border border-gray-200/50",
            scrolled ? "py-3 px-4" : "py-4 px-6"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-10 w-10 rounded-xl"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Merhaba, Ahmet 👋</h1>
                  <p className="text-sm text-gray-500">Bugün {new Date().toLocaleDateString('tr-TR')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-gray-300/50 hover:border-blue-500/50"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Hızlı Eylem
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className={cn(
            "transition-all duration-300",
            "rounded-2xl bg-white/90 backdrop-blur-sm",
            "shadow-xl shadow-black/5",
            "border border-gray-200/50",
            "overflow-hidden"
          )}>
            {children}
          </div>

          {/* Bottom Navigation for Mobile */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
              <div className="flex items-center justify-around p-2">
                {menuCategories.slice(0, 3).map((category) => (
                  <Button
                    key={category.title}
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-xl flex flex-col items-center justify-center"
                    onClick={() => toggleCategory(category.title)}
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="text-[10px] mt-0.5">{category.title.slice(0, 3)}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

// Missing Plus icon component
const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)
