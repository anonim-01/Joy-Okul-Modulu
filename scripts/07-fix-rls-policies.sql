-- Fix RLS policies for all main tables
-- Allow all access for development/testing

-- Schools table
DROP POLICY IF EXISTS "Allow all access" ON schools;
CREATE POLICY "Allow all access" ON schools FOR ALL USING (true) WITH CHECK (true);

-- Visits table  
DROP POLICY IF EXISTS "Allow all access" ON visits;
CREATE POLICY "Allow all access" ON visits FOR ALL USING (true) WITH CHECK (true);

-- Proposals table
DROP POLICY IF EXISTS "Allow all access" ON proposals;
CREATE POLICY "Allow all access" ON proposals FOR ALL USING (true) WITH CHECK (true);

-- Proposal items table
DROP POLICY IF EXISTS "Allow all access" ON proposal_items;
CREATE POLICY "Allow all access" ON proposal_items FOR ALL USING (true) WITH CHECK (true);

-- Users table
DROP POLICY IF EXISTS "Allow all access" ON users;
CREATE POLICY "Allow all access" ON users FOR ALL USING (true) WITH CHECK (true);

-- Documents table
DROP POLICY IF EXISTS "Allow all access" ON documents;
CREATE POLICY "Allow all access" ON documents FOR ALL USING (true) WITH CHECK (true);

-- Logs table
DROP POLICY IF EXISTS "Allow all access" ON logs;
CREATE POLICY "Allow all access" ON logs FOR ALL USING (true) WITH CHECK (true);

-- Models table
DROP POLICY IF EXISTS "Allow all access" ON models;
CREATE POLICY "Allow all access" ON models FOR ALL USING (true) WITH CHECK (true);

-- Brands table
DROP POLICY IF EXISTS "Allow all access" ON brands;
CREATE POLICY "Allow all access" ON brands FOR ALL USING (true) WITH CHECK (true);

-- Notifications table
DROP POLICY IF EXISTS "Allow all access" ON notifications;
CREATE POLICY "Allow all access" ON notifications FOR ALL USING (true) WITH CHECK (true);

-- Reports table
DROP POLICY IF EXISTS "Allow all access" ON reports;
CREATE POLICY "Allow all access" ON reports FOR ALL USING (true) WITH CHECK (true);

-- Settings table
DROP POLICY IF EXISTS "Allow all access" ON settings;
CREATE POLICY "Allow all access" ON settings FOR ALL USING (true) WITH CHECK (true);

-- System settings table
DROP POLICY IF EXISTS "Allow all access" ON system_settings;
CREATE POLICY "Allow all access" ON system_settings FOR ALL USING (true) WITH CHECK (true);

-- Sessions table
DROP POLICY IF EXISTS "Allow all access" ON sessions;
CREATE POLICY "Allow all access" ON sessions FOR ALL USING (true) WITH CHECK (true);
