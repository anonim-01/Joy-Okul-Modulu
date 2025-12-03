-- =====================================================
-- META & NOTES MODULE - Additional Data Storage
-- =====================================================

-- Subscriber Meta Table
CREATE TABLE IF NOT EXISTS fc_subscriber_meta (
  id BIGSERIAL PRIMARY KEY,
  subscriber_id BIGINT NOT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  created_by BIGINT NULL,
  object_type VARCHAR(50) DEFAULT 'option',
  key VARCHAR(192) NOT NULL,
  value TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(subscriber_id, key)
);

-- Subscriber Notes Table
CREATE TABLE IF NOT EXISTS fc_subscriber_notes (
  id BIGSERIAL PRIMARY KEY,
  subscriber_id BIGINT NOT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  parent_id BIGINT NULL REFERENCES fc_subscriber_notes(id) ON DELETE CASCADE,
  created_by BIGINT NULL,
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived')),
  type VARCHAR(50) DEFAULT 'note' CHECK (type IN ('note', 'call', 'email', 'meeting', 'task')),
  is_private BOOLEAN DEFAULT TRUE,
  title VARCHAR(192) NULL,
  description TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- System Meta Table
CREATE TABLE IF NOT EXISTS fc_meta (
  id BIGSERIAL PRIMARY KEY,
  object_type VARCHAR(50) NOT NULL,
  object_id BIGINT NULL,
  key VARCHAR(192) NOT NULL,
  value TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fc_subscriber_meta_subscriber ON fc_subscriber_meta(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_fc_subscriber_meta_key ON fc_subscriber_meta(key);
CREATE INDEX IF NOT EXISTS idx_fc_subscriber_notes_subscriber ON fc_subscriber_notes(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_fc_subscriber_notes_status ON fc_subscriber_notes(status);
CREATE INDEX IF NOT EXISTS idx_fc_meta_object ON fc_meta(object_type, object_id);
CREATE INDEX IF NOT EXISTS idx_fc_meta_key ON fc_meta(key);

-- RLS Policies
ALTER TABLE fc_subscriber_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_subscriber_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_meta ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access to subscriber_meta" ON fc_subscriber_meta;
CREATE POLICY "Allow all access to subscriber_meta" ON fc_subscriber_meta FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to subscriber_notes" ON fc_subscriber_notes;
CREATE POLICY "Allow all access to subscriber_notes" ON fc_subscriber_notes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to meta" ON fc_meta;
CREATE POLICY "Allow all access to meta" ON fc_meta FOR ALL USING (true) WITH CHECK (true);
