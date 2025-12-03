-- =====================================================
-- FUNNELS MODULE - Marketing Automation System
-- =====================================================

-- Funnels Table
CREATE TABLE IF NOT EXISTS fc_funnels (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR(50) DEFAULT 'funnel',
  title VARCHAR(192) NOT NULL,
  trigger_name VARCHAR(150) NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'archived')),
  conditions TEXT NULL,
  settings TEXT NULL,
  created_by BIGINT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Funnel Sequences Table
CREATE TABLE IF NOT EXISTS fc_funnel_sequences (
  id BIGSERIAL PRIMARY KEY,
  funnel_id BIGINT NULL REFERENCES fc_funnels(id) ON DELETE CASCADE,
  parent_id BIGINT DEFAULT 0,
  action_name VARCHAR(192) NULL,
  condition_type VARCHAR(192) NULL,
  type VARCHAR(50) DEFAULT 'sequence',
  title VARCHAR(192) NULL,
  description VARCHAR(192) NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused')),
  conditions TEXT NULL,
  settings TEXT NULL,
  note TEXT NULL,
  delay INTEGER DEFAULT 0,
  c_delay INTEGER DEFAULT 0,
  sequence INTEGER DEFAULT 0,
  created_by BIGINT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Funnel Subscribers Table
CREATE TABLE IF NOT EXISTS fc_funnel_subscribers (
  id BIGSERIAL PRIMARY KEY,
  funnel_id BIGINT NULL REFERENCES fc_funnels(id) ON DELETE CASCADE,
  starting_sequence_id BIGINT NULL,
  next_sequence BIGINT NULL,
  subscriber_id BIGINT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  last_sequence_id BIGINT NULL,
  next_sequence_id BIGINT NULL,
  last_sequence_status VARCHAR(50) DEFAULT 'pending',
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed', 'paused')),
  type VARCHAR(50) DEFAULT 'funnel',
  last_executed_time TIMESTAMPTZ NULL,
  next_execution_time TIMESTAMPTZ NULL,
  notes TEXT NULL,
  source_trigger_name VARCHAR(192) NULL,
  source_ref_id BIGINT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Funnel Metrics Table
CREATE TABLE IF NOT EXISTS fc_funnel_metrics (
  id BIGSERIAL PRIMARY KEY,
  funnel_id BIGINT NULL REFERENCES fc_funnels(id) ON DELETE CASCADE,
  sequence_id BIGINT NULL REFERENCES fc_funnel_sequences(id) ON DELETE CASCADE,
  subscriber_id BIGINT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  benchmark_value BIGINT DEFAULT 0,
  benchmark_currency VARCHAR(10) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'completed',
  notes TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fc_funnels_status ON fc_funnels(status);
CREATE INDEX IF NOT EXISTS idx_fc_funnel_sequences_funnel ON fc_funnel_sequences(funnel_id);
CREATE INDEX IF NOT EXISTS idx_fc_funnel_subscribers_funnel ON fc_funnel_subscribers(funnel_id);
CREATE INDEX IF NOT EXISTS idx_fc_funnel_subscribers_subscriber ON fc_funnel_subscribers(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_fc_funnel_metrics_funnel ON fc_funnel_metrics(funnel_id);
CREATE INDEX IF NOT EXISTS idx_fc_funnel_metrics_subscriber ON fc_funnel_metrics(subscriber_id);

-- RLS Policies
ALTER TABLE fc_funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_funnel_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_funnel_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_funnel_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access to funnels" ON fc_funnels;
CREATE POLICY "Allow all access to funnels" ON fc_funnels FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to funnel_sequences" ON fc_funnel_sequences;
CREATE POLICY "Allow all access to funnel_sequences" ON fc_funnel_sequences FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to funnel_subscribers" ON fc_funnel_subscribers;
CREATE POLICY "Allow all access to funnel_subscribers" ON fc_funnel_subscribers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to funnel_metrics" ON fc_funnel_metrics;
CREATE POLICY "Allow all access to funnel_metrics" ON fc_funnel_metrics FOR ALL USING (true) WITH CHECK (true);
