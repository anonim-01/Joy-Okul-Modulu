-- Simple CRM Schema - Run this first
-- Drop existing tables if needed (be careful in production!)

-- 1. Create schools table first (no dependencies)
CREATE TABLE IF NOT EXISTS schools (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  neighborhood TEXT,
  type TEXT DEFAULT 'Devlet',
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

-- 2. Create brands_models table (no dependencies)
CREATE TABLE IF NOT EXISTS brands_models (
  id BIGSERIAL PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Create settings table (no dependencies)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Create proposal_items table (depends on schools)
CREATE TABLE IF NOT EXISTS proposal_items (
  id BIGSERIAL PRIMARY KEY,
  school_id BIGINT REFERENCES schools(id) ON DELETE CASCADE,
  category TEXT,
  brand TEXT,
  model TEXT,
  qty INTEGER DEFAULT 1,
  unit_price NUMERIC(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Create action_logs table (depends on schools, but nullable)
CREATE TABLE IF NOT EXISTS action_logs (
  id BIGSERIAL PRIMARY KEY,
  time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  message TEXT NOT NULL,
  type TEXT DEFAULT 'view',
  school_id BIGINT,
  user_name TEXT,
  meta JSONB
);

-- Enable RLS on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for all operations
CREATE POLICY IF NOT EXISTS "schools_policy" ON schools FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "proposal_items_policy" ON proposal_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "brands_models_policy" ON brands_models FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "action_logs_policy" ON action_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "settings_policy" ON settings FOR ALL USING (true) WITH CHECK (true);

-- Insert sample data
INSERT INTO schools (name, neighborhood, type, category, phone, status) VALUES
  ('Pendik Anadolu Lisesi', 'Batı', 'Devlet', 'Lise', '0216 354 04 44', 'new'),
  ('Özel Bahçeşehir Koleji', 'Kurtköy', 'Özel', 'Lise', '0216 482 44 44', 'new'),
  ('Esenyalı Atatürk İlkokulu', 'Esenyalı', 'Devlet', 'İlkokul', '0216 392 99 99', 'new')
ON CONFLICT DO NOTHING;
