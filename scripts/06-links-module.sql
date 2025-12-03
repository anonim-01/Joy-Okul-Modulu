-- =====================================================
-- LINKS MODULE - URL Tracking & Smart Links
-- =====================================================

-- URL Stores Table
CREATE TABLE IF NOT EXISTS fc_url_stores (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  short VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Smart Links Table
CREATE TABLE IF NOT EXISTS fc_smart_links (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(192) NULL,
  short VARCHAR(192) NULL UNIQUE,
  target_url TEXT NULL,
  actions TEXT NULL,
  notes TEXT NULL,
  contact_clicks INTEGER DEFAULT 0,
  all_clicks INTEGER DEFAULT 0,
  created_by BIGINT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fc_url_stores_short ON fc_url_stores(short);
CREATE INDEX IF NOT EXISTS idx_fc_smart_links_short ON fc_smart_links(short);

-- RLS Policies
ALTER TABLE fc_url_stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_smart_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access to url_stores" ON fc_url_stores;
CREATE POLICY "Allow all access to url_stores" ON fc_url_stores FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to smart_links" ON fc_smart_links;
CREATE POLICY "Allow all access to smart_links" ON fc_smart_links FOR ALL USING (true) WITH CHECK (true);
