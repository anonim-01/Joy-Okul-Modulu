export type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER" | "SALES"

export type SchoolType = "PUBLIC" | "PRIVATE" | "FOUNDATION"
export type SchoolCategory = "PRIMARY" | "MIDDLE" | "HIGH" | "VOCATIONAL" | "UNIVERSITY" | "OTHER"
export type SchoolStatus =
  | "NEW"
  | "CONTACTED"
  | "NEEDS_ANALYSIS"
  | "PROPOSAL_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST"
  | "ARCHIVED"
export type VisitStatus =
  | "NONE"
  | "PLANNED"
  | "VISITED_MANAGER"
  | "VISITED_VICE"
  | "VISITED_TECHNICAL"
  | "VISITED_PURCHASING"
  | "FAILED_NO_CONTACT"
  | "FOLLOWUP_NEEDED"

export interface User {
  id: string
  email: string
  name: string | null
  role: UserRole
  department: string | null
  phone: string | null
  avatar: string | null
  is_active: boolean
  last_login: string | null
  created_at: string
  updated_at: string
}

export interface School {
  id: string
  name: string
  code: string
  neighborhood: string
  type: SchoolType
  category: SchoolCategory
  status: SchoolStatus
  visit_status: VisitStatus
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
  priority: number
  created_by_id: string
  assigned_to_id: string | null
  last_contact_date: string | null
  next_followup: string | null
  created_at: string
  updated_at: string
}

export interface Proposal {
  id: string
  school_id: string
  code: string
  title: string
  status: string
  amount: number | null
  currency: string
  validity_date: string | null
  payment_terms: string | null
  warranty: string | null
  created_by_id: string
  created_at: string
  updated_at: string
}
