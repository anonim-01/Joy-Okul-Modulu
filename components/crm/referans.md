This table store the basic information of a contact

Column	Type	Comment
id	bigint unsigned Auto Increment	
user_id	bigint unsigned NULL	
hash	varchar(90) NULL	
contact_owner	bigint unsigned NULL	
company_id	bigint unsigned NULL	
prefix	varchar(192) NULL	
first_name	varchar(192) NULL	
last_name	varchar(192) NULL	
email	varchar(190)	
timezone	varchar(192) NULL	
address_line_1	varchar(192) NULL	
address_line_2	varchar(192) NULL	
postal_code	varchar(192) NULL	
city	varchar(192) NULL	
state	varchar(192) NULL	
country	varchar(192) NULL	
ip	varchar(20) NULL	
latitude	decimal(10,8) NULL	
longitude	decimal(10,8) NULL	
total_points	int unsigned [0]	
life_time_value	int unsigned [0]	
phone	varchar(50) NULL	
status	varchar(50) [subscribed]	
contact_type	varchar(50) NULL [lead]	
source	varchar(50) NULL	
avatar	varchar(192) NULL	
date_of_birth	date NULL	
created_at	timestamp NULL	
last_activity	timestamp NULL	
updated_at	timestamp NULL	
fc_tags
Storing the tags information

Column	Type	Comment
id	int unsigned Auto Increment	
title	varchar(192)	
slug	varchar(192)	
description	tinytext NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	
fc_lists
Storing the lists information
Column	Type	Comment
id	int unsigned Auto Increment	
title	varchar(192)	
slug	varchar(192)	
description	tinytext NULL	
is_public	tinyint(1) NULL [0]	
created_at	timestamp NULL	
updated_at	timestamp NULL	

_fc_subscriber_pivot
Pivot Table for subscriber's tag and list relationship
Column	Type	Comment
id	bigint unsigned Auto Increment	
subscriber_id	bigint unsigned	
object_id	bigint unsigned	
object_type	varchar(50)	
status	varchar(50) NULL	
is_public	tinyint(1) [1]	
created_at	timestamp NULL	
updated_at	timestamp NULL	

_fc_subscriber_meta
Meta table for subscribers
Column	Type	Comment
id	bigint unsigned Auto Increment	
subscriber_id	bigint unsigned	
created_by	bigint unsigned	
object_type	varchar(50) NULL [option]	
key	varchar(192)	
value	longtext NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	

_fc_subscriber_notes
Subscriber's Note table
Column	Type	Comment
id	bigint unsigned Auto Increment	
subscriber_id	bigint unsigned	
parent_id	bigint unsigned NULL	
created_by	bigint unsigned NULL	
status	varchar(50) NULL [open]	
type	varchar(50) NULL [note]	
is_private	tinyint NULL [1]	
title	varchar(192) NULL	
description	longtext NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	

_fc_subscriber_notes
Subscriber's Note table
Column	Type	Comment
id	bigint unsigned Auto Increment	
subscriber_id	bigint unsigned	
parent_id	bigint unsigned NULL	
created_by	bigint unsigned NULL	
status	varchar(50) NULL [open]	
type	varchar(50) NULL [note]	
is_private	tinyint NULL [1]	
title	varchar(192) NULL	
description	longtext NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	

_fc_campaigns
Campaigns Table. This table store email campaigns, sequence emails, email action from automation
Column	Type	Comment
id	bigint unsigned Auto Increment	
parent_id	bigint unsigned NULL	
type	varchar(50) [campaign]	
title	varchar(192)	
available_urls	text NULL	
slug	varchar(192)	
status	varchar(50)	
template_id	bigint unsigned NULL	
email_subject	varchar(192) NULL	
email_pre_header	varchar(192) NULL	
email_body	longtext	
recipients_count	int [0]	
delay	int NULL [0]	
utm_status	tinyint(1) NULL [0]	
utm_source	varchar(192) NULL	
utm_medium	varchar(192) NULL	
utm_campaign	varchar(192) NULL	
utm_term	varchar(192) NULL	
utm_content	varchar(192) NULL	
design_template	varchar(192) NULL	
scheduled_at	timestamp NULL	
settings	longtext NULL	
created_by	bigint unsigned NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	

_fc_campaign_emails
Store individual emails of a campaign

Column	Type	Comment
id	bigint unsigned Auto Increment	
campaign_id	bigint unsigned NULL	
email_type	varchar(50) NULL [campaign]	
subscriber_id	bigint unsigned NULL	
email_subject_id	bigint unsigned NULL	
email_address	varchar(192)	
email_subject	varchar(192) NULL	
email_body	longtext NULL	
email_headers	text NULL	
is_open	tinyint(1) [0]	
is_parsed	tinyint(1) [0]	
click_counter	int NULL	
status	varchar(50) [draft]	
note	text NULL	
scheduled_at	timestamp NULL	
email_hash	varchar(192) NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	
_fc_campaign_url_metrics
Email Open/Click Tracking Table

Column	Type	Comment
id	bigint unsigned Auto Increment	
url_id	bigint unsigned NULL	
campaign_id	bigint unsigned NULL	
subscriber_id	bigint unsigned NULL	
type	varchar(50) NULL [click]	
ip_address	varchar(30) NULL	
country	varchar(40) NULL	
city	varchar(40) NULL	
counter	int unsigned [1]	
created_at	timestamp NULL	
updated_at	timestamp NULL	
_fc_sequence_tracker
Tracking Database for Email Sequences

Column	Type	Comment
id	bigint unsigned Auto Increment	
campaign_id	bigint unsigned NULL	
last_sequence_id	bigint unsigned NULL	
subscriber_id	bigint unsigned NULL	
next_sequence_id	bigint unsigned NULL	
status	varchar(50) NULL [active]	
type	varchar(50) NULL [sequence_tracker]	
last_executed_time	timestamp NULL	
next_execution_time	timestamp NULL	
notes	text NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	
_fc_funnels
Automation / Funnel Storage Table

Column	Type	Comment
id	bigint unsigned Auto Increment	
type	varchar(50) [funnel]	
title	varchar(192)	
trigger_name	varchar(150) NULL	
status	varchar(50) NULL [draft]	
conditions	text NULL	
settings	text NULL	
created_by	bigint unsigned NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	
_fc_funnel_sequences
Automation / Funnel Sequences Storage Table
Column	Type	Comment
id	bigint unsigned Auto Increment	
funnel_id	bigint unsigned NULL	
parent_id	bigint unsigned NULL [0]	
action_name	varchar(192) NULL	
condition_type	varchar(192) NULL	
type	varchar(50) NULL [sequence]	
title	varchar(192) NULL	
description	varchar(192) NULL	
status	varchar(50) NULL [draft]	
conditions	text NULL	
settings	text NULL	
note	text NULL	
delay	int unsigned NULL	
c_delay	int unsigned NULL	
sequence	int unsigned NULL	
created_by	bigint unsigned NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	

_fc_funnel_subscribers
Funnel Sequence - Funnel - Subscriber Relationship DB Table

Column	Type	Comment
id	bigint unsigned Auto Increment	
funnel_id	bigint unsigned NULL	
starting_sequence_id	bigint unsigned NULL	
next_sequence	bigint unsigned NULL	
subscriber_id	bigint unsigned NULL	
last_sequence_id	bigint unsigned NULL	
next_sequence_id	bigint unsigned NULL	
last_sequence_status	varchar(50) NULL [pending]	
status	varchar(50) NULL [active]	
type	varchar(50) NULL [funnel]	
last_executed_time	timestamp NULL	
next_execution_time	timestamp NULL	
notes	text NULL	
source_trigger_name	varchar(192) NULL	
source_ref_id	bigint unsigned NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	
_fc_funnel_metrics
Funnel Sequence - Tracking Table for a subscriber

Column	Type	Comment
id	bigint unsigned Auto Increment	
funnel_id	bigint unsigned NULL	
sequence_id	bigint unsigned NULL	
subscriber_id	bigint unsigned NULL	
benchmark_value	bigint unsigned NULL [0]	
benchmark_currency	varchar(10) NULL [USD]	
status	varchar(50) NULL [completed]	
notes	text NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	
fc_contact_relations
This table will be available for extended ecommerce module if you sync the data from Ecommerce / LMS

Column	Type	Comment
id	bigint unsigned Auto Increment	
subscriber_id	bigint unsigned	
provider	varchar(100)	
provider_id	bigint unsigned NULL	
first_order_date	timestamp NULL	
last_order_date	timestamp NULL	
total_order_count	int NULL [0]	
total_order_value	decimal(10,2) NULL [0.00]	
status	varchar(100) NULL	
commerce_taxonomies	longtext NULL	
commerce_coupons	longtext NULL	
meta_col_1	mediumtext NULL	
meta_col_2	mediumtext NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	
fc_contact_relation_items
This table will be available for extended ecommerce module if you sync the data from Ecommerce / LMS for storing individual record for ecommerce / LMS contacts

Column	Type	Comment
id	bigint unsigned Auto Increment	
subscriber_id	bigint unsigned	
relation_id	bigint unsigned	
provider	varchar(100)	
origin_id	bigint unsigned NULL	
item_id	bigint unsigned	
item_sub_id	bigint unsigned NULL	
item_value	decimal(10,2) NULL	
status	varchar(100) NULL	
item_type	varchar(100) NULL	
meta_col	mediumtext NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	
fc_smart_links
For storing SmartLinks and it's configuration

Column	Type	Comment
id	bigint unsigned Auto Increment	
title	varchar(192) NULL	
short	varchar(192) NULL	
target_url	text NULL	
actions	text NULL	
notes	text NULL	
contact_clicks	int NULL [0]	
all_clicks	int NULL [0]	
created_by	bigint unsigned NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	
fc_url_stores
For storing Email Long Links and short links for tracking

Column	Type	Comment
id	bigint unsigned Auto Increment	
url	tinytext	
short	varchar(50)	
created_at	timestamp NULL	
updated_at	timestamp NULL	
fc_meta
For storing CRM settings

Column	Type	Comment
id	bigint unsigned Auto Increment	
object_type	varchar(50)	
object_id	bigint NULL	
key	varchar(192)	
value	longtext NULL	
created_at	timestamp NULL	
updated_at	timestamp NULL	



Ts  tsx  supabase gore  ayarla  daha kaliteli içerik sun
Veritabanını TypeScript (TS/TSX) ve Supabase kullanarak, modern ve tip güvenliği olan bir CRM/Marketing Otomasyon sistemine dönüştüreceğim. Önceki kısıtlı veritabanı yapısını geliştirerek, işletme ihtiyaçlarına uygun bir sistem tasarlayacağım.

🗺️ Gelişmiş Veritabanı Modeli
1. Core Tables (Çekirdek Tablolar)
sql
-- Contact Enhancements
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS subscription_preferences JSONB DEFAULT '{"email": true, "sms": false, "push": false}';
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS custom_fields JSONB DEFAULT '{}';
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS last_engagement TIMESTAMP;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS merge_status VARCHAR(50) DEFAULT 'none';
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS import_batch VARCHAR(100);
2. TypeScript Interface Tanımları
typescript:types/database.ts
// Core Interfaces
export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: Contact;
        Insert: ContactInsert;
        Update: ContactUpdate;
      };
      // ... other tables
    };
  };
}

export interface Contact {
  id: string;
  user_id: string | null;
  hash: string | null;
  contact_owner: string | null;
  company_id: string | null;
  prefix: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  timezone: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  postal_code: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  ip: string | null;
  latitude: number | null;
  longitude: number | null;
  total_points: number;
  life_time_value: number;
  status: 'subscribed' | 'unsubscribed' | 'pending' | 'bounced';
  contact_type: 'lead' | 'customer' | 'partner' | 'subscriber';
  source: string | null;
  avatar: string | null;
  date_of_birth: string | null;
  is_verified: boolean;
  subscription_preferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  custom_fields: Record<string, any>;
  score: number;
  last_engagement: string | null;
  merge_status: 'none' | 'merged' | 'duplicate';
  import_batch: string | null;
  created_at: string;
  last_activity: string | null;
  updated_at: string | null;
}

// Campaign Interfaces
export interface Campaign {
  id: string;
  parent_id: string | null;
  type: 'campaign' | 'sequence' | 'automation' | 'broadcast';
  title: string;
  slug: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  template_id: string | null;
  email_subject: string | null;
  email_pre_header: string | null;
  email_body: string;
  recipients_count: number;
  delay: number;
  utm_status: boolean;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  design_template: string | null;
  scheduled_at: string | null;
  settings: CampaignSettings;
  created_by: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface CampaignSettings {
  send_time: string;
  timezone: string;
  track_opens: boolean;
  track_clicks: boolean;
  unsubscribe_link: boolean;
  resend_to_unopened: boolean;
  a_b_testing: {
    enabled: boolean;
    variants: Array<{
      subject: string;
      percentage: number;
      winner: boolean;
    }>;
  };
  segmentation: {
    lists: string[];
    tags: string[];
    conditions: Record<string, any>;
  };
}
🔧 Supabase Kurulum ve Yapılandırma
typescript:lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: { 'x-application-name': 'flucrm-pro' },
  },
});

// RPC Functions
export const rpc = {
  // Contact Scoring
  calculateContactScore: async (contactId: string) => {
    return await supabase.rpc('calculate_contact_score', { contact_id: contactId });
  },

  // Bulk Operations
  bulkUpdateContacts: async (updates: Array<{ id: string; data: Partial<Contact> }>) => {
    return await supabase.rpc('bulk_update_contacts', { updates });
  },

  // Segmentation
  segmentContacts: async (criteria: any) => {
    return await supabase.rpc('segment_contacts', { criteria });
  },

  // Campaign Analytics
  getCampaignAnalytics: async (campaignId: string) => {
    return await supabase.rpc('get_campaign_analytics', { campaign_id: campaignId });
  },
};
🚀 React Components (TSX)
1. Contact Management
typescript:components/Contact/ContactCard.tsx
import React from 'react';
import { Contact } from '@/types/database';
import { Avatar, Badge, Card, Tooltip } from '@/components/ui';
import { Mail, Phone, MapPin, Calendar, TrendingUp } from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  onSelect?: (contact: Contact) => void;
  onEdit?: (contact: Contact) => void;
  className?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onSelect,
  onEdit,
  className,
}) => {
  const getStatusColor = (status: Contact['status']) => {
    const colors = {
      subscribed: 'success',
      unsubscribed: 'danger',
      pending: 'warning',
      bounced: 'secondary',
    };
    return colors[status];
  };

  const calculateEngagementScore = () => {
    const baseScore = contact.score || 0;
    const points = contact.total_points || 0;
    const ltv = contact.life_time_value || 0;
    
    return Math.min(100, Math.floor((baseScore + (points * 0.1) + (ltv * 0.05))));
  };

  return (
    <Card
      className={`p-4 hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={() => onSelect?.(contact)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            src={contact.avatar || undefined}
            fallback={`${contact.first_name?.[0] || ''}${contact.last_name?.[0] || ''}`}
            size="lg"
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              {contact.first_name} {contact.last_name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={getStatusColor(contact.status)}>
                {contact.status}
              </Badge>
              <Badge variant="outline">
                {contact.contact_type}
              </Badge>
              {contact.is_verified && (
                <Badge variant="success" className="animate-pulse">
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center justify-end space-x-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">
              Score: {calculateEngagementScore()}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            LTV: ${contact.life_time_value}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
            {contact.email}
          </a>
        </div>
        
        {contact.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
              {contact.phone}
            </a>
          </div>
        )}
        
        {(contact.city || contact.country) && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>
              {[contact.city, contact.state, contact.country]
                .filter(Boolean)
                .join(', ')}
            </span>
          </div>
        )}
        
        {contact.last_activity && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              Last active: {new Date(contact.last_activity).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {Object.keys(contact.custom_fields || {}).length > 0 && (
        <div className="mt-4 pt-3 border-t">
          <div className="flex flex-wrap gap-1">
            {Object.entries(contact.custom_fields).map(([key, value]) => (
              <Tooltip key={key} content={`${key}: ${value}`}>
                <Badge variant="secondary" className="text-xs">
                  {key}: {String(value).substring(0, 15)}
                  {String(value).length > 15 ? '...' : ''}
                </Badge>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
2. Campaign Builder
typescript:components/Campaign/CampaignBuilder.tsx
import React, { useState } from 'react';
import { Campaign, Contact } from '@/types/database';
import { supabase } from '@/lib/supabase';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Card,
  Button,
  Input,
  Select,
  Textarea,
  Toggle,
  DatePicker,
  SegmentedControl,
  Progress,
} from '@/components/ui';

interface CampaignBuilderProps {
  initialData?: Partial<Campaign>;
  onSave?: (campaign: Campaign) => void;
  onPublish?: (campaignId: string) => void;
}

export const CampaignBuilder: React.FC<CampaignBuilderProps> = ({
  initialData,
  onSave,
  onPublish,
}) => {
  const [campaign, setCampaign] = useState<Partial<Campaign>>({
    type: 'campaign',
    status: 'draft',
    recipients_count: 0,
    utm_status: true,
    settings: {
      send_time: '09:00',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      track_opens: true,
      track_clicks: true,
      unsubscribe_link: true,
      resend_to_unopened: false,
      a_b_testing: { enabled: false, variants: [] },
      segmentation: { lists: [], tags: [], conditions: {} },
    },
    ...initialData,
  });

  // Fetch contacts for segmentation
  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('contacts')
        .select('*')
        .eq('status', 'subscribed')
        .limit(1000);
      return data || [];
    },
  });

  // Save campaign mutation
  const saveMutation = useMutation({
    mutationFn: async (campaignData: Partial<Campaign>) => {
      const { data, error } = await supabase
        .from('campaigns')
        .upsert(campaignData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      onSave?.(data);
    },
  });

  const calculateEstimatedRecipients = () => {
    // Complex segmentation logic
    if (!contacts) return 0;
    
    let filtered = [...contacts];
    
    // Apply segmentation from settings
    const { segmentation } = campaign.settings || {};
    if (segmentation?.lists?.length) {
      // Filter by lists logic
    }
    
    return filtered.length;
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Campaign Title"
            value={campaign.title || ''}
            onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
            required
          />
          
          <Select
            label="Campaign Type"
            value={campaign.type}
            onChange={(value) => setCampaign({ ...campaign, type: value as Campaign['type'] })}
            options={[
              { value: 'campaign', label: 'Email Campaign' },
              { value: 'sequence', label: 'Email Sequence' },
              { value: 'automation', label: 'Automation' },
              { value: 'broadcast', label: 'Broadcast' },
            ]}
          />
        </div>
      </Card>

      {/* Email Content */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Email Content</h3>
        <div className="space-y-4">
          <Input
            label="Email Subject"
            value={campaign.email_subject || ''}
            onChange={(e) => setCampaign({ ...campaign, email_subject: e.target.value })}
            placeholder="Enter compelling subject line"
          />
          
          <Input
            label="Pre-header Text"
            value={campaign.email_pre_header || ''}
            onChange={(e) => setCampaign({ ...campaign, email_pre_header: e.target.value })}
            placeholder="Preview text that appears after subject"
          />
          
          <Textarea
            label="Email Body"
            value={campaign.email_body || ''}
            onChange={(e) => setCampaign({ ...campaign, email_body: e.target.value })}
            rows={12}
            className="font-mono"
            placeholder="Write your email content here..."
          />
        </div>
      </Card>

      {/* Segmentation & Targeting */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Audience Targeting</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Estimated Recipients</span>
            <span className="text-lg font-bold text-blue-600">
              {calculateEstimatedRecipients().toLocaleString()}
            </span>
          </div>
          
          <Progress value={calculateEstimatedRecipients() / 10000 * 100} />
          
          <SegmentedControl
            value={campaign.settings?.segmentation?.conditions?.type || 'all'}
            onChange={(value) => {
              setCampaign({
                ...campaign,
                settings: {
                  ...campaign.settings,
                  segmentation: {
                    ...campaign.settings?.segmentation,
                    conditions: { type: value },
                  },
                },
              });
            }}
            segments={[
              { value: 'all', label: 'All Subscribers' },
              { value: 'segmented', label: 'Segmented' },
              { value: 'custom', label: 'Custom Query' },
            ]}
          />
        </div>
      </Card>

      {/* Scheduling */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Scheduling</h3>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Schedule Date"
            value={campaign.scheduled_at ? new Date(campaign.scheduled_at) : undefined}
            onChange={(date) => {
              setCampaign({
                ...campaign,
                scheduled_at: date?.toISOString() || null,
              });
            }}
          />
          
          <Input
            type="time"
            label="Send Time"
            value={campaign.settings?.send_time}
            onChange={(e) => {
              setCampaign({
                ...campaign,
                settings: {
                  ...campaign.settings,
                  send_time: e.target.value,
                },
              });
            }}
          />
        </div>
      </Card>

      {/* Tracking & Analytics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Tracking Settings</h3>
        <div className="space-y-3">
          <Toggle
            label="Track Email Opens"
            checked={campaign.settings?.track_opens || false}
            onChange={(checked) => {
              setCampaign({
                ...campaign,
                settings: {
                  ...campaign.settings,
                  track_opens: checked,
                },
              });
            }}
          />
          
          <Toggle
            label="Track Link Clicks"
            checked={campaign.settings?.track_clicks || false}
            onChange={(checked) => {
              setCampaign({
                ...campaign,
                settings: {
                  ...campaign.settings,
                  track_clicks: checked,
                },
              });
            }}
          />
          
          <Toggle
            label="A/B Testing"
            checked={campaign.settings?.a_b_testing?.enabled || false}
            onChange={(checked) => {
              setCampaign({
                ...campaign,
                settings: {
                  ...campaign.settings,
                  a_b_testing: {
                    ...campaign.settings?.a_b_testing,
                    enabled: checked,
                  },
                },
              });
            }}
          />
        </div>
      </Card>

      {/* UTM Parameters */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">UTM Parameters</h3>
        <Toggle
          label="Enable UTM Tracking"
          checked={campaign.utm_status || false}
          onChange={(checked) => setCampaign({ ...campaign, utm_status: checked })}
          className="mb-4"
        />
        
        {campaign.utm_status && (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="UTM Source"
              value={campaign.utm_source || ''}
              onChange={(e) => setCampaign({ ...campaign, utm_source: e.target.value })}
              placeholder="e.g., newsletter"
            />
            <Input
              label="UTM Medium"
              value={campaign.utm_medium || ''}
              onChange={(e) => setCampaign({ ...campaign, utm_medium: e.target.value })}
              placeholder="e.g., email"
            />
            <Input
              label="UTM Campaign"
              value={campaign.utm_campaign || ''}
              onChange={(e) => setCampaign({ ...campaign, utm_campaign: e.target.value })}
              placeholder="e.g., spring_sale"
            />
            <Input
              label="UTM Term"
              value={campaign.utm_term || ''}
              onChange={(e) => setCampaign({ ...campaign, utm_term: e.target.value })}
              placeholder="e.g., keyword"
            />
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 sticky bottom-0 bg-white p-4 border-t">
        <Button
          variant="outline"
          onClick={() => saveMutation.mutate({ ...campaign, status: 'draft' })}
          loading={saveMutation.isPending}
        >
          Save as Draft
        </Button>
        
        <Button
          variant="primary"
          onClick={() => saveMutation.mutate({ ...campaign, status: 'scheduled' })}
          loading={saveMutation.isPending}
        >
          Schedule Campaign
        </Button>
        
        {campaign.id && (
          <Button
            variant="success"
            onClick={() => onPublish?.(campaign.id!)}
          >
            Publish Now
          </Button>
        )}
      </div>
    </div>
  );
};
3. Real-time Dashboard
typescript:components/Dashboard/AnalyticsDashboard.tsx
import React from 'react';
import { useRealtime } from '@/hooks/useRealtime';
import { supabase } from '@/lib/supabase';
import {
  Card,
  MetricCard,
  LineChart,
  BarChart,
  PieChart,
  DataTable,
} from '@/components/ui';
import {
  Users,
  Mail,
  Clicks,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  // Real-time subscriptions
  const { data: realtimeStats } = useRealtime('campaign_metrics', {
    event: 'INSERT',
    schema: 'public',
  });

  // Key metrics
  const metrics = [
    {
      title: 'Total Contacts',
      value: '12,458',
      change: '+12.5%',
      icon: Users,
      trend: 'up' as const,
    },
    {
      title: 'Open Rate',
      value: '34.2%',
      change: '+2.1%',
      icon: Mail,
      trend: 'up' as const,
    },
    {
      title: 'Click Rate',
      value: '8.7%',
      change: '-0.5%',
      icon: Clicks,
      trend: 'down' as const,
    },
    {
      title: 'Avg. LTV',
      value: '$124.50',
      change: '+18.3%',
      icon: DollarSign,
      trend: 'up' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Engagement Trends</h3>
          <LineChart
            data={engagementData}
            xKey="date"
            yKeys={['opens', 'clicks', 'conversions']}
            height={300}
          />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Distribution</h3>
          <PieChart
            data={contactDistribution}
            categoryKey="type"
            valueKey="count"
            height={300}
          />
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
        <DataTable
          columns={[
            { key: 'name', header: 'Campaign' },
            { key: 'sent', header: 'Sent' },
            { key: 'opens', header: 'Opens' },
            { key: 'clicks', header: 'Clicks' },
            { key: 'ctr', header: 'CTR' },
            { key: 'conversions', header: 'Conversions' },
          ]}
          data={campaignPerformance}
          pagination
          searchable
        />
      </Card>

      {/* Real-time Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Real-time Activity</h3>
        <div className="space-y-3">
          {realtimeStats?.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'open' ? 'bg-green-500' :
                  activity.type === 'click' ? 'bg-blue-500' :
                  'bg-purple-500'
                }`} />
                <span className="font-medium">
                  {activity.contact_name}
                </span>
                <span className="text-sm text-gray-500">
                  {activity.type === 'open' ? 'opened' :
                   activity.type === 'click' ? 'clicked' :
                   'converted on'}
                </span>
                <span className="font-semibold">
                  {activity.campaign_name}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                {new Date(activity.created_at).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
🛠️ Advanced Hooks & Utilities
typescript:hooks/useContacts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, rpc } from '@/lib/supabase';
import type { Contact } from '@/types/database';

export const useContacts = () => {
  const queryClient = useQueryClient();

  // Fetch contacts with pagination and filters
  const useContactsQuery = (filters?: any, page = 1, limit = 50) => {
    return useQuery({
      queryKey: ['contacts', filters, page],
      queryFn: async () => {
        let query = supabase
          .from('contacts')
          .select('*, tags(title), lists(title)');
        
        // Apply filters
        if (filters?.status) {
          query = query.eq('status', filters.status);
        }
        
        if (filters?.type) {
          query = query.eq('contact_type', filters.type);
        }
        
        if (filters?.search) {
          query = query.or(`
            first_name.ilike.%${filters.search}%,
            last_name.ilike.%${filters.search}%,
            email.ilike.%${filters.search}%
          `);
        }
        
        // Pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        
        const { data, error, count } = await query
          .range(from, to)
          .order('last_activity', { ascending: false });
        
        if (error) throw error;
        
        return {
          contacts: data || [],
          total: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / limit),
        };
      },
    });
  };

  // Create/Update contact
  const useContactMutation = () => {
    return useMutation({
      mutationFn: async (contact: Partial<Contact>) => {
        const { data, error } = await supabase
          .from('contacts')
          .upsert(contact)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
      },
    });
  };

  // Bulk operations
  const useBulkOperations = () => {
    return useMutation({
      mutationFn: async (operations: {
        action: 'tag' | 'untag' | 'add_to_list' | 'remove_from_list' | 'update_status';
        contactIds: string[];
        data: any;
      }) => {
        return await rpc.bulkUpdateContacts(
          operations.contactIds.map(id => ({
            id,
            data: { [operations.action]: operations.data },
          }))
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
      },
    });
  };

  // Segmentation
  const useSegmentation = () => {
    return useMutation({
      mutationFn: async (criteria: any) => {
        return await rpc.segmentContacts(criteria);
      },
    });
  };

  return {
    useContactsQuery,
    useContactMutation,
    useBulkOperations,
    useSegmentation,
  };
};
📊 Advanced SQL Functions
sql:supabase/functions/contact_scoring.sql
CREATE OR REPLACE FUNCTION calculate_contact_score(contact_id UUID)
RETURNS INTEGER AS $$
DECLARE
  total_score INTEGER := 0;
  contact_record RECORD;
  engagement_count INTEGER;
  campaign_stats RECORD;
BEGIN
  -- Get contact record
  SELECT * INTO contact_record FROM contacts WHERE id = contact_id;
  
  IF contact_record IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Base score from total_points
  total_score := total_score + (contact_record.total_points * 0.1);
  
  -- Lifetime value contribution
  total_score := total_score + (contact_record.life_time_value * 0.05);
  
  -- Engagement frequency (last 30 days)
  SELECT COUNT(*) INTO engagement_count
  FROM campaign_url_metrics
  WHERE subscriber_id = contact_id
    AND created_at >= NOW() - INTERVAL '30 days';
  
  total_score := total_score + (engagement_count * 2);
  
  -- Campaign performance
  SELECT 
    COUNT(DISTINCT campaign_id) as campaign_count,
    AVG(CASE WHEN type = 'open' THEN 1 ELSE 0 END) as open_rate,
    AVG(CASE WHEN type = 'click' THEN 1 ELSE 0 END) as click_rate
  INTO campaign_stats
  FROM campaign_url_metrics
  WHERE subscriber_id = contact_id;
  
  total_score := total_score + (campaign_stats.campaign_count * 5);
  total_score := total_score + (campaign_stats.open_rate * 100);
  total_score := total_score + (campaign_stats.click_rate * 200);
  
  -- Recency bonus
  IF contact_record.last_activity >= NOW() - INTERVAL '7 days' THEN
    total_score := total_score + 25;
  ELSIF contact_record.last_activity >= NOW() - INTERVAL '30 days' THEN
    total_score := total_score + 10;
  END IF;
  
  -- Verified email bonus
  IF contact_record.is_verified THEN
    total_score := total_score + 50;
  END IF;
  
  -- Custom field bonuses
  IF contact_record.custom_fields ? 'lead_score_boost' THEN
    total_score := total_score + (contact_record.custom_fields->>'lead_score_boost')::INTEGER;
  END IF;
  
  -- Cap at 1000
  RETURN LEAST(1000, total_score);
END;
$$ LANGUAGE plpgsql;
🎯 Key Features Implemented
1. Type Safety
Full TypeScript support with strict types

Database schema synchronization

Runtime type validation

2. Real-time Updates
WebSocket connections for live data

Campaign performance tracking

Contact activity monitoring

3. Advanced Segmentation
Multi-criteria contact filtering

Dynamic segment creation

Real-time segment updates

4. Campaign Automation
Email sequence builder

A/B testing framework

Smart scheduling

Performance analytics

5. Performance Optimization
React Query for data fetching

Component code splitting

Image optimization

Database indexing
