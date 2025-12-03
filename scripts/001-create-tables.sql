-- Kullanıcı Rolleri için Enum
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER', 'SALES');

-- Okul Tipleri
CREATE TYPE school_type AS ENUM ('PUBLIC', 'PRIVATE', 'FOUNDATION');
CREATE TYPE school_category AS ENUM ('PRIMARY', 'MIDDLE', 'HIGH', 'VOCATIONAL', 'UNIVERSITY', 'OTHER');
CREATE TYPE school_status AS ENUM ('NEW', 'CONTACTED', 'NEEDS_ANALYSIS', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST', 'ARCHIVED');
CREATE TYPE visit_status AS ENUM ('NONE', 'PLANNED', 'VISITED_MANAGER', 'VISITED_VICE', 'VISITED_TECHNICAL', 'VISITED_PURCHASING', 'FAILED_NO_CONTACT', 'FOLLOWUP_NEEDED');

-- Ziyaret Tipleri
CREATE TYPE visit_type AS ENUM ('INITIAL', 'FOLLOWUP', 'TECHNICAL', 'PRESENTATION', 'NEGOTIATION');

-- Teklif Durumları
CREATE TYPE proposal_status AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'SENT', 'REVISED', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- Doküman Tipleri
CREATE TYPE document_type AS ENUM ('PROPOSAL', 'CONTRACT', 'REPORT', 'PHOTO', 'CERTIFICATE', 'OTHER');

-- Bildirim Tipleri
CREATE TYPE notification_type AS ENUM ('INFO', 'WARNING', 'SUCCESS', 'ERROR', 'REMINDER', 'ASSIGNMENT');
CREATE TYPE priority_type AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- Rapor Tipleri
CREATE TYPE report_type AS ENUM ('SALES_PIPELINE', 'VISIT_STATS', 'PROPOSAL_STATUS', 'SCHOOL_ANALYSIS', 'USER_ACTIVITY', 'CUSTOM');

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role user_role DEFAULT 'VIEWER',
  department TEXT,
  phone TEXT,
  avatar TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sessions Table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Schools Table
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  neighborhood TEXT NOT NULL,
  type school_type NOT NULL,
  category school_category NOT NULL,
  status school_status DEFAULT 'NEW',
  visit_status visit_status DEFAULT 'NONE',
  
  -- İletişim
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  
  -- Yetkililer
  manager_name TEXT,
  manager_phone TEXT,
  manager_email TEXT,
  manager_title TEXT,
  
  -- Teknik Bilgiler
  student_count INTEGER,
  staff_count INTEGER,
  building_type TEXT,
  campus_area NUMERIC,
  
  -- Notlar
  notes TEXT,
  deficiencies TEXT,
  analysis TEXT,
  priority INTEGER DEFAULT 3,
  
  -- Sistem
  created_by_id UUID REFERENCES users(id),
  assigned_to_id UUID REFERENCES users(id),
  last_contact_date TIMESTAMPTZ,
  next_followup TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Visits Table
CREATE TABLE visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  visit_date TIMESTAMPTZ NOT NULL,
  visit_type visit_type NOT NULL,
  status visit_status NOT NULL,
  
  visitor_id UUID REFERENCES users(id),
  participants TEXT[],
  
  summary TEXT,
  findings TEXT,
  action_items TEXT,
  next_steps TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Proposals Table
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  status proposal_status DEFAULT 'DRAFT',
  
  amount NUMERIC,
  currency TEXT DEFAULT 'TRY',
  validity_date TIMESTAMPTZ,
  payment_terms TEXT,
  warranty TEXT,
  
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  duration_days INTEGER,
  
  created_by_id UUID REFERENCES users(id),
  approved_by_id UUID REFERENCES users(id),
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Proposal Items Table
CREATE TABLE proposal_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  
  category TEXT NOT NULL,
  brand TEXT,
  model TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC,
  total_price NUMERIC,
  
  specs JSONB,
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Brands Table
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo TEXT,
  
  is_active BOOLEAN DEFAULT true,
  created_by_id UUID REFERENCES users(id),
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Models Table
CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  code TEXT,
  description TEXT,
  specs JSONB,
  unit_price NUMERIC,
  
  in_stock BOOLEAN DEFAULT true,
  supplier TEXT,
  lead_time INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(brand_id, name)
);

-- Documents Table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type document_type NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  
  uploaded_by_id UUID REFERENCES users(id),
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Logs Table
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  description TEXT,
  changes JSONB,
  
  ip_address TEXT,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Notifications Table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type NOT NULL,
  is_read BOOLEAN DEFAULT false,
  priority priority_type DEFAULT 'NORMAL',
  
  link TEXT,
  action_text TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  read_at TIMESTAMPTZ
);

-- Reports Table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type report_type NOT NULL,
  filters JSONB,
  data JSONB NOT NULL,
  
  created_by_id UUID REFERENCES users(id),
  schedule TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- System Settings Table
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_schools_neighborhood ON schools(neighborhood);
CREATE INDEX idx_schools_status ON schools(status);
CREATE INDEX idx_schools_created_by ON schools(created_by_id);
CREATE INDEX idx_schools_assigned_to ON schools(assigned_to_id);
CREATE INDEX idx_visits_school ON visits(school_id);
CREATE INDEX idx_visits_date ON visits(visit_date);
CREATE INDEX idx_proposals_school ON proposals(school_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_logs_user ON logs(user_id);
CREATE INDEX idx_logs_entity ON logs(entity_type, entity_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
