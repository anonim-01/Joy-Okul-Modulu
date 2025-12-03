// Complete CRM Database Types for Supabase

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          user_id: string | null
          hash: string | null
          contact_owner: string | null
          company_id: string | null
          prefix: string | null
          first_name: string
          last_name: string
          email: string
          phone: string | null
          timezone: string
          address_line_1: string | null
          address_line_2: string | null
          postal_code: string | null
          city: string | null
          state: string | null
          country: string | null
          ip: string | null
          latitude: number | null
          longitude: number | null
          total_points: number
          life_time_value: number
          status: "subscribed" | "unsubscribed" | "pending" | "bounced"
          contact_type: "lead" | "customer" | "partner" | "subscriber"
          source: string | null
          avatar: string | null
          date_of_birth: string | null
          created_at: string
          last_activity: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          hash?: string | null
          contact_owner?: string | null
          company_id?: string | null
          prefix?: string | null
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          timezone?: string
          address_line_1?: string | null
          address_line_2?: string | null
          postal_code?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          ip?: string | null
          latitude?: number | null
          longitude?: number | null
          total_points?: number
          life_time_value?: number
          status?: "subscribed" | "unsubscribed" | "pending" | "bounced"
          contact_type?: "lead" | "customer" | "partner" | "subscriber"
          source?: string | null
          avatar?: string | null
          date_of_birth?: string | null
          created_at?: string
          last_activity?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          hash?: string | null
          contact_owner?: string | null
          company_id?: string | null
          prefix?: string | null
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          timezone?: string
          address_line_1?: string | null
          address_line_2?: string | null
          postal_code?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          ip?: string | null
          latitude?: number | null
          longitude?: number | null
          total_points?: number
          life_time_value?: number
          status?: "subscribed" | "unsubscribed" | "pending" | "bounced"
          contact_type?: "lead" | "customer" | "partner" | "subscriber"
          source?: string | null
          avatar?: string | null
          date_of_birth?: string | null
          created_at?: string
          last_activity?: string | null
          updated_at?: string
        }
      }
      lists: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          is_public: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          is_public?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          parent_id: string | null
          type: "campaign" | "sequence" | "automation" | "broadcast"
          title: string
          slug: string
          status: "draft" | "scheduled" | "active" | "completed" | "paused"
          template_id: string | null
          email_subject: string | null
          email_pre_header: string | null
          email_body: string | null
          recipients_count: number
          delay: number
          utm_status: boolean
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_term: string | null
          utm_content: string | null
          design_template: string | null
          scheduled_at: string | null
          settings: Json
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id?: string | null
          type?: "campaign" | "sequence" | "automation" | "broadcast"
          title: string
          slug: string
          status?: "draft" | "scheduled" | "active" | "completed" | "paused"
          template_id?: string | null
          email_subject?: string | null
          email_pre_header?: string | null
          email_body?: string | null
          recipients_count?: number
          delay?: number
          utm_status?: boolean
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_term?: string | null
          utm_content?: string | null
          design_template?: string | null
          scheduled_at?: string | null
          settings?: Json
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string | null
          type?: "campaign" | "sequence" | "automation" | "broadcast"
          title?: string
          slug?: string
          status?: "draft" | "scheduled" | "active" | "completed" | "paused"
          template_id?: string | null
          email_subject?: string | null
          email_pre_header?: string | null
          email_body?: string | null
          recipients_count?: number
          delay?: number
          utm_status?: boolean
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_term?: string | null
          utm_content?: string | null
          design_template?: string | null
          scheduled_at?: string | null
          settings?: Json
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      funnels: {
        Row: {
          id: string
          type: string
          title: string
          trigger_name: string | null
          status: string
          conditions: string | null
          settings: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: string
          title: string
          trigger_name?: string | null
          status?: string
          conditions?: string | null
          settings?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: string
          title?: string
          trigger_name?: string | null
          status?: string
          conditions?: string | null
          settings?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Helper types
export type Contact = Database["public"]["Tables"]["contacts"]["Row"]
export type ContactInsert = Database["public"]["Tables"]["contacts"]["Insert"]
export type ContactUpdate = Database["public"]["Tables"]["contacts"]["Update"]

export type List = Database["public"]["Tables"]["lists"]["Row"]
export type Tag = Database["public"]["Tables"]["tags"]["Row"]
export type Campaign = Database["public"]["Tables"]["campaigns"]["Row"]
export type Funnel = Database["public"]["Tables"]["funnels"]["Row"]
