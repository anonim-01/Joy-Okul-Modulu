-- =====================================================
-- CAMPAIGNS MODULE - Email Campaign System
-- =====================================================

-- Campaigns Table
CREATE TABLE IF NOT EXISTS fc_campaigns (
  id BIGSERIAL PRIMARY KEY,
  parent_id BIGINT NULL REFERENCES fc_campaigns(id) ON DELETE SET NULL,
  type VARCHAR(50) DEFAULT 'campaign' CHECK (type IN ('campaign', 'sequence', 'automation', 'broadcast')),
  title VARCHAR(192) NOT NULL,
  available_urls TEXT NULL,
  slug VARCHAR(192) NOT NULL UNIQUE,
  status VARCHAR(50) NOT NULL CHECK (status IN ('draft', 'scheduled', 'active', 'completed', 'paused')),
  template_id BIGINT NULL,
  email_subject VARCHAR(192) NULL,
  email_pre_header VARCHAR(192) NULL,
  email_body TEXT NOT NULL,
  recipients_count INTEGER DEFAULT 0,
  delay INTEGER DEFAULT 0,
  utm_status BOOLEAN DEFAULT FALSE,
  utm_source VARCHAR(192) NULL,
  utm_medium VARCHAR(192) NULL,
  utm_campaign VARCHAR(192) NULL,
  utm_term VARCHAR(192) NULL,
  utm_content VARCHAR(192) NULL,
  design_template VARCHAR(192) NULL,
  scheduled_at TIMESTAMPTZ NULL,
  settings JSONB NULL,
  created_by BIGINT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaign Emails Table
CREATE TABLE IF NOT EXISTS fc_campaign_emails (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT NULL REFERENCES fc_campaigns(id) ON DELETE CASCADE,
  email_type VARCHAR(50) DEFAULT 'campaign',
  subscriber_id BIGINT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  email_subject_id BIGINT NULL,
  email_address VARCHAR(192) NOT NULL,
  email_subject VARCHAR(192) NULL,
  email_body TEXT NULL,
  email_headers TEXT NULL,
  is_open BOOLEAN DEFAULT FALSE,
  is_parsed BOOLEAN DEFAULT FALSE,
  click_counter INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'sent', 'failed', 'bounced')),
  note TEXT NULL,
  scheduled_at TIMESTAMPTZ NULL,
  email_hash VARCHAR(192) NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaign URL Metrics Table
CREATE TABLE IF NOT EXISTS fc_campaign_url_metrics (
  id BIGSERIAL PRIMARY KEY,
  url_id BIGINT NULL,
  campaign_id BIGINT NULL REFERENCES fc_campaigns(id) ON DELETE CASCADE,
  subscriber_id BIGINT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  type VARCHAR(50) DEFAULT 'click' CHECK (type IN ('click', 'open')),
  ip_address VARCHAR(30) NULL,
  country VARCHAR(40) NULL,
  city VARCHAR(40) NULL,
  counter INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sequence Tracker Table
CREATE TABLE IF NOT EXISTS fc_sequence_tracker (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT NULL REFERENCES fc_campaigns(id) ON DELETE CASCADE,
  last_sequence_id BIGINT NULL,
  subscriber_id BIGINT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  next_sequence_id BIGINT NULL,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'failed')),
  type VARCHAR(50) DEFAULT 'sequence_tracker',
  last_executed_time TIMESTAMPTZ NULL,
  next_execution_time TIMESTAMPTZ NULL,
  notes TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fc_campaigns_status ON fc_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_fc_campaigns_type ON fc_campaigns(type);
CREATE INDEX IF NOT EXISTS idx_fc_campaigns_slug ON fc_campaigns(slug);
CREATE INDEX IF NOT EXISTS idx_fc_campaign_emails_campaign ON fc_campaign_emails(campaign_id);
CREATE INDEX IF NOT EXISTS idx_fc_campaign_emails_subscriber ON fc_campaign_emails(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_fc_campaign_emails_status ON fc_campaign_emails(status);
CREATE INDEX IF NOT EXISTS idx_fc_campaign_url_metrics_campaign ON fc_campaign_url_metrics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_fc_campaign_url_metrics_subscriber ON fc_campaign_url_metrics(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_fc_sequence_tracker_campaign ON fc_sequence_tracker(campaign_id);
CREATE INDEX IF NOT EXISTS idx_fc_sequence_tracker_subscriber ON fc_sequence_tracker(subscriber_id);

-- RLS Policies
ALTER TABLE fc_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_campaign_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_campaign_url_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_sequence_tracker ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access to campaigns" ON fc_campaigns;
CREATE POLICY "Allow all access to campaigns" ON fc_campaigns FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to campaign_emails" ON fc_campaign_emails;
CREATE POLICY "Allow all access to campaign_emails" ON fc_campaign_emails FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to campaign_url_metrics" ON fc_campaign_url_metrics;
CREATE POLICY "Allow all access to campaign_url_metrics" ON fc_campaign_url_metrics FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to sequence_tracker" ON fc_sequence_tracker;
CREATE POLICY "Allow all access to sequence_tracker" ON fc_sequence_tracker FOR ALL USING (true) WITH CHECK (true);
