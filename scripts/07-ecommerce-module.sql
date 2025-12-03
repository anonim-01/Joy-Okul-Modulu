-- =====================================================
-- ECOMMERCE MODULE - E-commerce Integration
-- =====================================================

-- Contact Relations Table
CREATE TABLE IF NOT EXISTS fc_contact_relations (
  id BIGSERIAL PRIMARY KEY,
  subscriber_id BIGINT NOT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  provider VARCHAR(100) NOT NULL,
  provider_id BIGINT NULL,
  first_order_date TIMESTAMPTZ NULL,
  last_order_date TIMESTAMPTZ NULL,
  total_order_count INTEGER DEFAULT 0,
  total_order_value DECIMAL(10,2) DEFAULT 0.00,
  status VARCHAR(100) NULL,
  commerce_taxonomies TEXT NULL,
  commerce_coupons TEXT NULL,
  meta_col_1 TEXT NULL,
  meta_col_2 TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(subscriber_id, provider)
);

-- Contact Relation Items Table
CREATE TABLE IF NOT EXISTS fc_contact_relation_items (
  id BIGSERIAL PRIMARY KEY,
  subscriber_id BIGINT NOT NULL REFERENCES fc_contacts(id) ON DELETE CASCADE,
  relation_id BIGINT NOT NULL REFERENCES fc_contact_relations(id) ON DELETE CASCADE,
  provider VARCHAR(100) NOT NULL,
  origin_id BIGINT NULL,
  item_id BIGINT NOT NULL,
  item_sub_id BIGINT NULL,
  item_value DECIMAL(10,2) NULL,
  status VARCHAR(100) NULL,
  item_type VARCHAR(100) NULL,
  meta_col TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fc_contact_relations_subscriber ON fc_contact_relations(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_fc_contact_relations_provider ON fc_contact_relations(provider);
CREATE INDEX IF NOT EXISTS idx_fc_contact_relation_items_subscriber ON fc_contact_relation_items(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_fc_contact_relation_items_relation ON fc_contact_relation_items(relation_id);

-- RLS Policies
ALTER TABLE fc_contact_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_contact_relation_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access to contact_relations" ON fc_contact_relations;
CREATE POLICY "Allow all access to contact_relations" ON fc_contact_relations FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to contact_relation_items" ON fc_contact_relation_items;
CREATE POLICY "Allow all access to contact_relation_items" ON fc_contact_relation_items FOR ALL USING (true) WITH CHECK (true);
