export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          auth_user_id: string | null
          email: string
          name: string | null
          role: Database["public"]["Enums"]["user_role"]
          department: string | null
          phone: string | null
          avatar: string | null
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_user_id?: string | null
          email: string
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          department?: string | null
          phone?: string | null
          avatar?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_user_id?: string | null
          email?: string
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          department?: string | null
          phone?: string | null
          avatar?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      schools: {
        Row: {
          id: string
          name: string
          code: string
          neighborhood: string
          type: Database["public"]["Enums"]["school_type"]
          category: Database["public"]["Enums"]["school_category"]
          status: Database["public"]["Enums"]["school_status"] | null
          visit_status: Database["public"]["Enums"]["visit_status"] | null
          address: string | null
          phone: string | null
          email: string | null
          website: string | null
          manager_name: string | null
          manager_phone: string | null
          manager_email: string | null
          manager_title: string | null
          student_count: number | null
          staff_count: number | null
          building_type: string | null
          campus_area: number | null
          notes: string | null
          deficiencies: string | null
          analysis: string | null
          priority: number | null
          created_by_id: string | null
          assigned_to_id: string | null
          lead_id: string | null
          last_contact_date: string | null
          next_followup: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          neighborhood: string
          type: Database["public"]["Enums"]["school_type"]
          category: Database["public"]["Enums"]["school_category"]
          status?: Database["public"]["Enums"]["school_status"] | null
          visit_status?: Database["public"]["Enums"]["visit_status"] | null
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          manager_email?: string | null
          manager_title?: string | null
          student_count?: number | null
          staff_count?: number | null
          building_type?: string | null
          campus_area?: number | null
          notes?: string | null
          deficiencies?: string | null
          analysis?: string | null
          priority?: number | null
          created_by_id?: string | null
          assigned_to_id?: string | null
          lead_id?: string | null
          last_contact_date?: string | null
          next_followup?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          neighborhood?: string
          type?: Database["public"]["Enums"]["school_type"]
          category?: Database["public"]["Enums"]["school_category"]
          status?: Database["public"]["Enums"]["school_status"] | null
          visit_status?: Database["public"]["Enums"]["visit_status"] | null
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          manager_email?: string | null
          manager_title?: string | null
          student_count?: number | null
          staff_count?: number | null
          building_type?: string | null
          campus_area?: number | null
          notes?: string | null
          deficiencies?: string | null
          analysis?: string | null
          priority?: number | null
          created_by_id?: string | null
          assigned_to_id?: string | null
          lead_id?: string | null
          last_contact_date?: string | null
          next_followup?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      visits: {
        Row: {
          id: string
          school_id: string | null
          visit_date: string
          visit_type: Database["public"]["Enums"]["visit_type"]
          status: Database["public"]["Enums"]["visit_status"]
          visitor_id: string | null
          participants: string[] | null
          summary: string | null
          findings: string | null
          action_items: string | null
          next_steps: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          school_id?: string | null
          visit_date: string
          visit_type: Database["public"]["Enums"]["visit_type"]
          status: Database["public"]["Enums"]["visit_status"]
          visitor_id?: string | null
          participants?: string[] | null
          summary?: string | null
          findings?: string | null
          action_items?: string | null
          next_steps?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          school_id?: string | null
          visit_date?: string
          visit_type?: Database["public"]["Enums"]["visit_type"]
          status?: Database["public"]["Enums"]["visit_status"]
          visitor_id?: string | null
          participants?: string[] | null
          summary?: string | null
          findings?: string | null
          action_items?: string | null
          next_steps?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      proposals: {
        Row: {
          id: string
          school_id: string | null
          code: string
          title: string
          status: Database["public"]["Enums"]["proposal_status"] | null
          amount: number | null
          currency: string | null
          validity_date: string | null
          payment_terms: string | null
          warranty: string | null
          start_date: string | null
          end_date: string | null
          duration_days: number | null
          created_by_id: string | null
          approved_by_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          school_id?: string | null
          code: string
          title: string
          status?: Database["public"]["Enums"]["proposal_status"] | null
          amount?: number | null
          currency?: string | null
          validity_date?: string | null
          payment_terms?: string | null
          warranty?: string | null
          start_date?: string | null
          end_date?: string | null
          duration_days?: number | null
          created_by_id?: string | null
          approved_by_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          school_id?: string | null
          code?: string
          title?: string
          status?: Database["public"]["Enums"]["proposal_status"] | null
          amount?: number | null
          currency?: string | null
          validity_date?: string | null
          payment_terms?: string | null
          warranty?: string | null
          start_date?: string | null
          end_date?: string | null
          duration_days?: number | null
          created_by_id?: string | null
          approved_by_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      proposal_items: {
        Row: {
          id: string
          proposal_id: string | null
          category: string
          brand: string | null
          model: string
          quantity: number | null
          unit_price: number | null
          total_price: number | null
          specs: Json | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          proposal_id?: string | null
          category: string
          brand?: string | null
          model: string
          quantity?: number | null
          unit_price?: number | null
          total_price?: number | null
          specs?: Json | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          proposal_id?: string | null
          category?: string
          brand?: string | null
          model?: string
          quantity?: number | null
          unit_price?: number | null
          total_price?: number | null
          specs?: Json | null
          notes?: string | null
          created_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          website: string | null
          logo: string | null
          is_active: boolean
          created_by_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          website?: string | null
          logo?: string | null
          is_active?: boolean
          created_by_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          website?: string | null
          logo?: string | null
          is_active?: boolean
          created_by_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      models: {
        Row: {
          id: string
          brand_id: string | null
          name: string
          code: string | null
          description: string | null
          specs: Json | null
          unit_price: number | null
          in_stock: boolean
          supplier: string | null
          lead_time: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id?: string | null
          name: string
          code?: string | null
          description?: string | null
          specs?: Json | null
          unit_price?: number | null
          in_stock?: boolean
          supplier?: string | null
          lead_time?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string | null
          name?: string
          code?: string | null
          description?: string | null
          specs?: Json | null
          unit_price?: number | null
          in_stock?: boolean
          supplier?: string | null
          lead_time?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      user_role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER" | "SALES"
      school_type: "PUBLIC" | "PRIVATE" | "FOUNDATION"
      school_category: "PRIMARY" | "MIDDLE" | "HIGH" | "VOCATIONAL" | "UNIVERSITY" | "OTHER"
      school_status:
        | "NEW"
        | "CONTACTED"
        | "NEEDS_ANALYSIS"
        | "PROPOSAL_SENT"
        | "NEGOTIATION"
        | "WON"
        | "LOST"
        | "ARCHIVED"
      visit_status:
        | "NONE"
        | "PLANNED"
        | "VISITED_MANAGER"
        | "VISITED_VICE"
        | "VISITED_TECHNICAL"
        | "VISITED_PURCHASING"
        | "FAILED_NO_CONTACT"
        | "FOLLOWUP_NEEDED"
      visit_type: "INITIAL" | "FOLLOWUP" | "DEMO" | "TECHNICAL" | "CONTRACT" | "OTHER"
      proposal_status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED" | "CANCELLED"
      lead_stage: "NEW" | "QUALIFIED" | "CONTACT" | "DEMO" | "PROPOSAL" | "NEGOTIATION" | "CLOSED_WON" | "CLOSED_LOST"
      enrichment_mode: "NONE" | "AUTOMATIC" | "MANUAL"
      web_capture_mode: "NONE" | "SCREENSHOT" | "FULL_PAGE"
      document_type: "CONTRACT" | "PROPOSAL" | "INVOICE" | "REPORT" | "PHOTO" | "OTHER"
    }
  }
}

// Helper types
export type School = Database["public"]["Tables"]["schools"]["Row"]
export type SchoolInsert = Database["public"]["Tables"]["schools"]["Insert"]
export type SchoolUpdate = Database["public"]["Tables"]["schools"]["Update"]

export type Visit = Database["public"]["Tables"]["visits"]["Row"]
export type VisitInsert = Database["public"]["Tables"]["visits"]["Insert"]
export type VisitUpdate = Database["public"]["Tables"]["visits"]["Update"]

export type Proposal = Database["public"]["Tables"]["proposals"]["Row"]
export type ProposalInsert = Database["public"]["Tables"]["proposals"]["Insert"]
export type ProposalUpdate = Database["public"]["Tables"]["proposals"]["Update"]

export type ProposalItem = Database["public"]["Tables"]["proposal_items"]["Row"]
export type ProposalItemInsert = Database["public"]["Tables"]["proposal_items"]["Insert"]

export type Brand = Database["public"]["Tables"]["brands"]["Row"]
export type Model = Database["public"]["Tables"]["models"]["Row"]

export type User = Database["public"]["Tables"]["users"]["Row"]
