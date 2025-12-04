-- =====================================================
-- CONTACTS MODULE - Contact Management System
-- =====================================================

-- Contacts Table
CREATE TABLE IF NOT EXISTS fc_contacts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NULL,
  hash VARCHAR(90) NULL UNIQUE,
  contact_owner BIGINT NULL,
  company_id BIGINT NULL,
  prefix VARCHAR(192) NULL,
  first_name VARCHAR(192) NULL,
  last_name VARCHAR(192) NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  timezone VARCHAR(192) NULL DEFAULT 'UTC',
  address_line_1 VARCHAR(192) NULL,
  address_line_2 VARCHAR(192) NULL,
  postal_code VARCHAR(192) NULL,
  city VARCHAR(192) NULL,
  state VARCHAR(192) NULL,
  country VARCHAR(192) NULL DEFAULT 'TR',
  ip VARCHAR(20) NULL,
  latitude DECIMAL(10,8) NULL,
  longitude DECIMAL(10,8) NULL,
  total_points INTEGER DEFAULT 0,
  life_time_value INTEGER DEFAULT 0,
  phone VARCHAR(50) NULL,
  status VARCHAR(50) DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed', 'pending', 'bounced')),
  contact_type VARCHAR(50) DEFAULT 'lead' CHECK (contact_type IN ('lead', 'customer', 'partner', 'subscriber')),
  source VARCHAR(50) NULL,
  avatar VARCHAR(192) NULL,
  date_of_birth DATE NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity TIMESTAMPTZ NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Contacts
CREATE INDEX IF NOT EXISTS idx_fc_contacts_email ON fc_contacts(email);
CREATE INDEX IF NOT EXISTS idx_fc_contacts_status ON fc_contacts(status);
CREATE INDEX IF NOT EXISTS idx_fc_contacts_type ON fc_contacts(contact_type);
CREATE INDEX IF NOT EXISTS idx_fc_contacts_owner ON fc_contacts(contact_owner);
CREATE INDEX IF NOT EXISTS idx_fc_contacts_company ON fc_contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_fc_contacts_created ON fc_contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fc_contacts_last_activity ON fc_contacts(last_activity DESC);

-- RLS Policies
ALTER TABLE fc_contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access to contacts" ON fc_contacts;
CREATE POLICY "Allow all access to contacts" 
  ON fc_contacts FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
    NEW.updated_at = pg_catalog.now();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_fc_contacts_updated_at ON fc_contacts;
CREATE TRIGGER update_fc_contacts_updated_at
    BEFORE UPDATE ON fc_contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
