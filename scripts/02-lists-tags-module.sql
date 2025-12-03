-- =====================================================
-- LISTS & TAGS MODULE - Segmentation System
-- =====================================================

-- Tags Table
CREATE TABLE IF NOT EXISTS fc_tags (
  id SERIAL PRIMARY KEY,
  title VARCHAR(192) NOT NULL,
  slug VARCHAR(192) NOT NULL UNIQUE,
  description TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lists Table
CREATE TABLE IF NOT EXISTS fc_lists (
  id SERIAL PRIMARY KEY,
  title VARCHAR(192) NOT NULL,
  slug VARCHAR(192) NOT NULL UNIQUE,
  description TEXT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriber Pivot Table (for tags and lists)
CREATE TABLE IF NOT EXISTS fc_subscriber_pivot (
  id BIGSERIAL PRIMARY KEY,
  subscriber_id BIGINT NOT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  object_id BIGINT NOT NULL,
  object_type VARCHAR(50) NOT NULL CHECK (object_type IN ('tag', 'list')),
  status VARCHAR(50) NULL,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(subscriber_id, object_id, object_type)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fc_tags_slug ON fc_tags(slug);
CREATE INDEX IF NOT EXISTS idx_fc_lists_slug ON fc_lists(slug);
CREATE INDEX IF NOT EXISTS idx_fc_subscriber_pivot_subscriber ON fc_subscriber_pivot(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_fc_subscriber_pivot_object ON fc_subscriber_pivot(object_id, object_type);

-- RLS Policies
ALTER TABLE fc_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_subscriber_pivot ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access to tags" ON fc_tags;
CREATE POLICY "Allow all access to tags" ON fc_tags FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to lists" ON fc_lists;
CREATE POLICY "Allow all access to lists" ON fc_lists FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to subscriber_pivot" ON fc_subscriber_pivot;
CREATE POLICY "Allow all access to subscriber_pivot" ON fc_subscriber_pivot FOR ALL USING (true) WITH CHECK (true);
