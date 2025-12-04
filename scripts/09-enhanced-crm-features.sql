-- Rename products to visit_products_catalog to avoid conflict with existing products table
-- Visit products catalog table (renamed to avoid conflict with existing products table)
CREATE TABLE IF NOT EXISTS visit_products_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  selling_price DECIMAL(10, 2),
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Participants table to track visit participants
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update foreign key to reference visit_products_catalog instead of products
-- Visit products junction table
CREATE TABLE IF NOT EXISTS visit_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
  product_id UUID REFERENCES visit_products_catalog(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Visit participants junction table
CREATE TABLE IF NOT EXISTS visit_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignees table
CREATE TABLE IF NOT EXISTS assignees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert into visit_products_catalog with selling_price instead of price
-- Insert sample products
INSERT INTO visit_products_catalog (name, description, selling_price, category) VALUES
('Okul Yönetim Sistemi', 'Kapsamlı okul yönetim yazılımı', 5000.00, 'Yazılım'),
('Öğrenci Takip Modülü', 'Öğrenci devam ve performans takibi', 2000.00, 'Modül'),
('Veli Bildirimleri', 'Otomatik veli bilgilendirme sistemi', 1500.00, 'Hizmet'),
('Raporlama Paketi', 'Detaylı analiz ve raporlama', 3000.00, 'Yazılım')
ON CONFLICT DO NOTHING;

-- Update RLS policies to reference visit_products_catalog
-- RLS Policies
ALTER TABLE visit_products_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON visit_products_catalog FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON participants FOR SELECT USING (true);
CREATE POLICY "Enable insert access for authenticated users" ON participants FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON visit_products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON visit_participants FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON assignees FOR ALL USING (auth.role() = 'authenticated');
