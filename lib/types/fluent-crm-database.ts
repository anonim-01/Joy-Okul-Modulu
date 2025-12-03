export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      fc_contacts: {
        Row: Contact
        Insert: ContactInsert
        Update: ContactUpdate
      }
      fc_tags: {
        Row: Tag
        Insert: TagInsert
        Update: TagUpdate
      }
      fc_lists: {
        Row: List
        Insert: ListInsert
        Update: ListUpdate
      }
      fc_subscriber_pivot: {
        Row: SubscriberPivot
        Insert: SubscriberPivotInsert
        Update: SubscriberPivotUpdate
      }
      fc_subscriber_meta: {
        Row: SubscriberMeta
        Insert: SubscriberMetaInsert
        Update: SubscriberMetaUpdate
      }
      fc_subscriber_notes: {
        Row: SubscriberNote
        Insert: SubscriberNoteInsert
        Update: SubscriberNoteUpdate
      }
      fc_campaigns: {
        Row: Campaign
        Insert: CampaignInsert
        Update: CampaignUpdate
      }
      fc_campaign_emails: {
        Row: CampaignEmail
        Insert: CampaignEmailInsert
        Update: CampaignEmailUpdate
      }
      fc_campaign_url_metrics: {
        Row: CampaignUrlMetric
        Insert: CampaignUrlMetricInsert
        Update: CampaignUrlMetricUpdate
      }
      fc_sequence_tracker: {
        Row: SequenceTracker
        Insert: SequenceTrackerInsert
        Update: SequenceTrackerUpdate
      }
      fc_funnels: {
        Row: Funnel
        Insert: FunnelInsert
        Update: FunnelUpdate
      }
      fc_funnel_sequences: {
        Row: FunnelSequence
        Insert: FunnelSequenceInsert
        Update: FunnelSequenceUpdate
      }
      fc_funnel_subscribers: {
        Row: FunnelSubscriber
        Insert: FunnelSubscriberInsert
        Update: FunnelSubscriberUpdate
      }
      fc_funnel_metrics: {
        Row: FunnelMetric
        Insert: FunnelMetricInsert
        Update: FunnelMetricUpdate
      }
      fc_contact_relations: {
        Row: ContactRelation
        Insert: ContactRelationInsert
        Update: ContactRelationUpdate
      }
      fc_contact_relation_items: {
        Row: ContactRelationItem
        Insert: ContactRelationItemInsert
        Update: ContactRelationItemUpdate
      }
      fc_smart_links: {
        Row: SmartLink
        Insert: SmartLinkInsert
        Update: SmartLinkUpdate
      }
      fc_url_stores: {
        Row: UrlStore
        Insert: UrlStoreInsert
        Update: UrlStoreUpdate
      }
      fc_meta: {
        Row: Meta
        Insert: MetaInsert
        Update: MetaUpdate
      }
    }
  }
}

// Contact Types
export interface Contact {
  id: number
  user_id: number | null
  hash: string | null
  contact_owner: number | null
  company_id: number | null
  prefix: string | null
  first_name: string | null
  last_name: string | null
  email: string
  timezone: string | null
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
  phone: string | null
  status: "subscribed" | "unsubscribed" | "pending" | "bounced"
  contact_type: "lead" | "customer" | "partner" | "subscriber"
  source: string | null
  avatar: string | null
  date_of_birth: string | null
  created_at: string
  last_activity: string | null
  updated_at: string | null
}

export type ContactInsert = Omit<Contact, "id" | "created_at" | "updated_at"> & {
  id?: number
  created_at?: string
  updated_at?: string
}

export type ContactUpdate = Partial<ContactInsert>

// Tag Types
export interface Tag {
  id: number
  title: string
  slug: string
  description: string | null
  created_at: string
  updated_at: string
}

export type TagInsert = Omit<Tag, "id" | "created_at" | "updated_at">
export type TagUpdate = Partial<TagInsert>

// List Types
export interface List {
  id: number
  title: string
  slug: string
  description: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export type ListInsert = Omit<List, "id" | "created_at" | "updated_at">
export type ListUpdate = Partial<ListInsert>

// Subscriber Pivot Types
export interface SubscriberPivot {
  id: number
  subscriber_id: number
  object_id: number
  object_type: "tag" | "list"
  status: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export type SubscriberPivotInsert = Omit<SubscriberPivot, "id" | "created_at" | "updated_at">
export type SubscriberPivotUpdate = Partial<SubscriberPivotInsert>

// Subscriber Meta Types
export interface SubscriberMeta {
  id: number
  subscriber_id: number
  created_by: number | null
  object_type: string
  key: string
  value: string | null
  created_at: string
  updated_at: string
}

export type SubscriberMetaInsert = Omit<SubscriberMeta, "id" | "created_at" | "updated_at">
export type SubscriberMetaUpdate = Partial<SubscriberMetaInsert>

// Subscriber Note Types
export interface SubscriberNote {
  id: number
  subscriber_id: number
  parent_id: number | null
  created_by: number | null
  status: "open" | "closed" | "archived"
  type: "note" | "call" | "email" | "meeting" | "task"
  is_private: boolean
  title: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export type SubscriberNoteInsert = Omit<SubscriberNote, "id" | "created_at" | "updated_at">
export type SubscriberNoteUpdate = Partial<SubscriberNoteInsert>

// Campaign Types
export interface Campaign {
  id: number
  parent_id: number | null
  type: "campaign" | "sequence" | "automation" | "broadcast"
  title: string
  available_urls: string | null
  slug: string
  status: "draft" | "scheduled" | "active" | "completed" | "paused"
  template_id: number | null
  email_subject: string | null
  email_pre_header: string | null
  email_body: string
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
  settings: Json | null
  created_by: number | null
  created_at: string
  updated_at: string
}

export type CampaignInsert = Omit<Campaign, "id" | "created_at" | "updated_at">
export type CampaignUpdate = Partial<CampaignInsert>

// Campaign Email Types
export interface CampaignEmail {
  id: number
  campaign_id: number | null
  email_type: string
  subscriber_id: number | null
  email_subject_id: number | null
  email_address: string
  email_subject: string | null
  email_body: string | null
  email_headers: string | null
  is_open: boolean
  is_parsed: boolean
  click_counter: number
  status: "draft" | "pending" | "sent" | "failed" | "bounced"
  note: string | null
  scheduled_at: string | null
  email_hash: string | null
  created_at: string
  updated_at: string
}

export type CampaignEmailInsert = Omit<CampaignEmail, "id" | "created_at" | "updated_at">
export type CampaignEmailUpdate = Partial<CampaignEmailInsert>

// Campaign URL Metric Types
export interface CampaignUrlMetric {
  id: number
  url_id: number | null
  campaign_id: number | null
  subscriber_id: number | null
  type: "click" | "open"
  ip_address: string | null
  country: string | null
  city: string | null
  counter: number
  created_at: string
  updated_at: string
}

export type CampaignUrlMetricInsert = Omit<CampaignUrlMetric, "id" | "created_at" | "updated_at">
export type CampaignUrlMetricUpdate = Partial<CampaignUrlMetricInsert>

// Sequence Tracker Types
export interface SequenceTracker {
  id: number
  campaign_id: number | null
  last_sequence_id: number | null
  subscriber_id: number | null
  next_sequence_id: number | null
  status: "active" | "completed" | "paused" | "failed"
  type: string
  last_executed_time: string | null
  next_execution_time: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type SequenceTrackerInsert = Omit<SequenceTracker, "id" | "created_at" | "updated_at">
export type SequenceTrackerUpdate = Partial<SequenceTrackerInsert>

// Funnel Types
export interface Funnel {
  id: number
  type: string
  title: string
  trigger_name: string | null
  status: "draft" | "active" | "paused" | "archived"
  conditions: string | null
  settings: string | null
  created_by: number | null
  created_at: string
  updated_at: string
}

export type FunnelInsert = Omit<Funnel, "id" | "created_at" | "updated_at">
export type FunnelUpdate = Partial<FunnelInsert>

// Funnel Sequence Types
export interface FunnelSequence {
  id: number
  funnel_id: number | null
  parent_id: number
  action_name: string | null
  condition_type: string | null
  type: string
  title: string | null
  description: string | null
  status: "draft" | "active" | "paused"
  conditions: string | null
  settings: string | null
  note: string | null
  delay: number
  c_delay: number
  sequence: number
  created_by: number | null
  created_at: string
  updated_at: string
}

export type FunnelSequenceInsert = Omit<FunnelSequence, "id" | "created_at" | "updated_at">
export type FunnelSequenceUpdate = Partial<FunnelSequenceInsert>

// Funnel Subscriber Types
export interface FunnelSubscriber {
  id: number
  funnel_id: number | null
  starting_sequence_id: number | null
  next_sequence: number | null
  subscriber_id: number | null
  last_sequence_id: number | null
  next_sequence_id: number | null
  last_sequence_status: string
  status: "active" | "completed" | "failed" | "paused"
  type: string
  last_executed_time: string | null
  next_execution_time: string | null
  notes: string | null
  source_trigger_name: string | null
  source_ref_id: number | null
  created_at: string
  updated_at: string
}

export type FunnelSubscriberInsert = Omit<FunnelSubscriber, "id" | "created_at" | "updated_at">
export type FunnelSubscriberUpdate = Partial<FunnelSubscriberInsert>

// Funnel Metric Types
export interface FunnelMetric {
  id: number
  funnel_id: number | null
  sequence_id: number | null
  subscriber_id: number | null
  benchmark_value: number
  benchmark_currency: string
  status: string
  notes: string | null
  created_at: string
  updated_at: string
}

export type FunnelMetricInsert = Omit<FunnelMetric, "id" | "created_at" | "updated_at">
export type FunnelMetricUpdate = Partial<FunnelMetricInsert>

// Contact Relation Types
export interface ContactRelation {
  id: number
  subscriber_id: number
  provider: string
  provider_id: number | null
  first_order_date: string | null
  last_order_date: string | null
  total_order_count: number
  total_order_value: number
  status: string | null
  commerce_taxonomies: string | null
  commerce_coupons: string | null
  meta_col_1: string | null
  meta_col_2: string | null
  created_at: string
  updated_at: string
}

export type ContactRelationInsert = Omit<ContactRelation, "id" | "created_at" | "updated_at">
export type ContactRelationUpdate = Partial<ContactRelationInsert>

// Contact Relation Item Types
export interface ContactRelationItem {
  id: number
  subscriber_id: number
  relation_id: number
  provider: string
  origin_id: number | null
  item_id: number
  item_sub_id: number | null
  item_value: number | null
  status: string | null
  item_type: string | null
  meta_col: string | null
  created_at: string
  updated_at: string
}

export type ContactRelationItemInsert = Omit<ContactRelationItem, "id" | "created_at" | "updated_at">
export type ContactRelationItemUpdate = Partial<ContactRelationItemInsert>

// Smart Link Types
export interface SmartLink {
  id: number
  title: string | null
  short: string | null
  target_url: string | null
  actions: string | null
  notes: string | null
  contact_clicks: number
  all_clicks: number
  created_by: number | null
  created_at: string
  updated_at: string
}

export type SmartLinkInsert = Omit<SmartLink, "id" | "created_at" | "updated_at">
export type SmartLinkUpdate = Partial<SmartLinkInsert>

// URL Store Types
export interface UrlStore {
  id: number
  url: string
  short: string
  created_at: string
  updated_at: string
}

export type UrlStoreInsert = Omit<UrlStore, "id" | "created_at" | "updated_at">
export type UrlStoreUpdate = Partial<UrlStoreInsert>

// Meta Types
export interface Meta {
  id: number
  object_type: string
  object_id: number | null
  key: string
  value: string | null
  created_at: string
  updated_at: string
}

export type MetaInsert = Omit<Meta, "id" | "created_at" | "updated_at">
export type MetaUpdate = Partial<MetaInsert>
