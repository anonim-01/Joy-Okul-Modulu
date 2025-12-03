-- Insert sample admin user
INSERT INTO users (email, name, role, department, is_active) VALUES
('admin@ayzio.com', 'Admin User', 'SUPER_ADMIN', 'Yönetim', true),
('sales@ayzio.com', 'Satış Temsilcisi', 'SALES', 'Satış', true),
('editor@ayzio.com', 'İçerik Editörü', 'EDITOR', 'Teknik', true);

-- Insert sample brands
INSERT INTO brands (name, category, is_active, created_by_id) VALUES
('Epson', 'Projeksiyon', true, (SELECT id FROM users WHERE email = 'admin@ayzio.com')),
('BenQ', 'Projeksiyon', true, (SELECT id FROM users WHERE email = 'admin@ayzio.com')),
('Hitachi', 'Akıllı Tahta', true, (SELECT id FROM users WHERE email = 'admin@ayzio.com')),
('Promethean', 'Akıllı Tahta', true, (SELECT id FROM users WHERE email = 'admin@ayzio.com')),
('Samsung', 'Ekran', true, (SELECT id FROM users WHERE email = 'admin@ayzio.com'));

-- Insert sample schools
INSERT INTO schools (name, code, neighborhood, type, category, status, address, phone, created_by_id) VALUES
('Pendik Anadolu Lisesi', 'OKL-001', 'Pendik', 'PUBLIC', 'HIGH', 'NEW', 'Pendik Merkez', '0216 XXX XXXX', (SELECT id FROM users WHERE email = 'admin@ayzio.com')),
('Kurtköy İlkokulu', 'OKL-002', 'Kurtköy', 'PUBLIC', 'PRIMARY', 'NEW', 'Kurtköy Mah.', '0216 XXX XXXX', (SELECT id FROM users WHERE email = 'admin@ayzio.com')),
('Kavakpınar Ortaokulu', 'OKL-003', 'Kavakpınar', 'PUBLIC', 'MIDDLE', 'CONTACTED', 'Kavakpınar Mah.', '0216 XXX XXXX', (SELECT id FROM users WHERE email = 'admin@ayzio.com'));
