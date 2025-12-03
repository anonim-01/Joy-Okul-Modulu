-- Complete CRM Schema - Simplified and Working
-- This script creates the essential tables for the CRM system

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Schools table
CREATE TABLE IF NOT EXISTS schools (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  neighborhood TEXT,
  type TEXT,
  category TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  manager TEXT,
  student_count INTEGER,
  visit_status TEXT DEFAULT 'none',
  visited BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'new',
  notes TEXT,
  deficiencies TEXT,
  last_contact_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Proposal items table
CREATE TABLE IF NOT EXISTS proposal_items (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  category TEXT,
  brand TEXT,
  model TEXT,
  qty INTEGER DEFAULT 1,
  unit_price NUMERIC(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Brands and models table
CREATE TABLE IF NOT EXISTS brands_models (
  id BIGSERIAL PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(brand, model)
);

-- Action logs table
CREATE TABLE IF NOT EXISTS action_logs (
  id BIGSERIAL PRIMARY KEY,
  time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  message TEXT NOT NULL,
  type TEXT DEFAULT 'view',
  school_id BIGINT REFERENCES schools(id),
  user_name TEXT,
  meta JSONB
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_schools_name ON schools(name);
CREATE INDEX IF NOT EXISTS idx_schools_status ON schools(status);
CREATE INDEX IF NOT EXISTS idx_proposal_items_school_id ON proposal_items(school_id);
CREATE INDEX IF NOT EXISTS idx_brands_models_brand ON brands_models(brand);
CREATE INDEX IF NOT EXISTS idx_action_logs_school_id ON action_logs(school_id);
CREATE INDEX IF NOT EXISTS idx_action_logs_time ON action_logs(time DESC);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_updated_at_schools ON schools;
CREATE TRIGGER trg_set_updated_at_schools
  BEFORE UPDATE ON schools
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_set_updated_at_proposal ON proposal_items;
CREATE TRIGGER trg_set_updated_at_proposal
  BEFORE UPDATE ON proposal_items
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Enable RLS
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all for now - you can customize later)
DROP POLICY IF EXISTS "Allow all access" ON schools;
CREATE POLICY "Allow all access" ON schools FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all access" ON proposal_items;
CREATE POLICY "Allow all access" ON proposal_items FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all access" ON brands_models;
CREATE POLICY "Allow all access" ON brands_models FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all access" ON action_logs;
CREATE POLICY "Allow all access" ON action_logs FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all access" ON settings;
CREATE POLICY "Allow all access" ON settings FOR ALL USING (true);
