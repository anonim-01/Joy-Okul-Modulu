import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  data?: Record<string, any>
  is_read: boolean
  created_at: string
}

export class NotificationService {
  private supabase = createClient()

  async getUnreadCount(userId: string): Promise<number> {
    const { count } = await this.supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_read", false)

    return count || 0
  }

  async getNotifications(userId: string, limit = 20): Promise<Notification[]> {
    const { data } = await this.supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    return data || []
  }

  async markAsRead(notificationId: string): Promise<void> {
    await this.supabase.from("notifications").update({ is_read: true }).eq("id", notificationId)
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.supabase.from("notifications").update({ is_read: true }).eq("user_id", userId)
  }

  async createNotification(data: {
    userId: string
    type: string
    title: string
    message: string
    data?: Record<string, any>
  }): Promise<void> {
    await this.supabase.from("notifications").insert({
      user_id: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      data: data.data || {},
      is_read: false,
    })

    toast.success(data.title, { description: data.message })
  }

  subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    return this.supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as Notification)
        },
      )
      .subscribe()
  }
}

export const notificationService = new NotificationService()
