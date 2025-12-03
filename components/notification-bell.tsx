"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { notificationService, type Notification } from "@/lib/services/notification.service"
import { cn } from "@/lib/utils"

export function NotificationBell({ userId }: { userId?: string }) {
  const [count, setCount] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!userId) return

    loadNotifications()
    const channel = notificationService.subscribeToNotifications(userId, (notification) => {
      setNotifications((prev) => [notification, ...prev])
      setCount((prev) => prev + 1)
    })

    return () => {
      channel.unsubscribe()
    }
  }, [userId])

  const loadNotifications = async () => {
    if (!userId) return
    const unreadCount = await notificationService.getUnreadCount(userId)
    const data = await notificationService.getNotifications(userId, 10)
    setCount(unreadCount)
    setNotifications(data)
  }

  const markAsRead = async (id: string) => {
    await notificationService.markAsRead(id)
    setCount((prev) => Math.max(0, prev - 1))
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)))
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg" onClick={() => setOpen(!open)}>
        <Bell className="h-4 w-4" />
        {count > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-[9px]">
            {count > 9 ? "9+" : count}
          </Badge>
        )}
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <Card className="absolute right-0 top-12 z-50 w-80 max-h-96 overflow-y-auto shadow-2xl border border-gray-200">
            <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="font-bold text-sm text-gray-800">Bildirimler</h3>
            </div>
            <div className="divide-y">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-xs">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>Bildirim yok</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => !notif.is_read && markAsRead(notif.id)}
                    className={cn(
                      "p-3 hover:bg-gray-50 cursor-pointer transition-colors",
                      !notif.is_read && "bg-blue-50/50",
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full mt-1.5 flex-shrink-0",
                          notif.is_read ? "bg-gray-300" : "bg-blue-500",
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 mb-0.5">{notif.title}</p>
                        <p className="text-[10px] text-gray-600 line-clamp-2">{notif.message}</p>
                        <p className="text-[9px] text-gray-400 mt-1">
                          {new Date(notif.created_at).toLocaleString("tr-TR")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
