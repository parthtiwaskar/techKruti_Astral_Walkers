-- PlaceBridge Database Schema

-- Disable foreign key checks for clean teardown (optional)
-- SET session_replication_role = 'replica';

DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- SET session_replication_role = 'origin';

-- 1. Users table (Students)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  branch TEXT,
  year INTEGER,
  cgpa NUMERIC(3,2),
  skills TEXT[],
  profile_pic_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Companies & Job Roles
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  role TEXT NOT NULL,
  location TEXT,
  package_lpa NUMERIC(5,2),
  stipend_monthly NUMERIC(8,2),
  deadline DATE,
  job_type TEXT CHECK (job_type IN ('Full-Time', 'Intern', 'Contract')),
  description TEXT,
  required_skills TEXT[],
  min_cgpa NUMERIC(3,2),
  degree_required TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Job Applications
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id),
  status TEXT CHECK (status IN ('Applied', 'Reviewing', 'Shortlisted', 'Interviewing', 'Selected', 'Rejected')) DEFAULT 'Applied',
  applied_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. System Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- info, success, warning, error
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Seed initial data
INSERT INTO companies (name, role, location, package_lpa, deadline, job_type, required_skills, min_cgpa)
VALUES 
('Nvidia Corp', 'Software Engineering Intern', 'Santa Clara, CA', 45.0, '2026-10-12', 'Intern', ARRAY['Python', 'C++', 'Graphics'], 8.5),
('Stripe', 'Product Designer', 'Dublin, Ireland', 35.0, '2026-10-10', 'Full-Time', ARRAY['Figma', 'React'], 8.0),
('CloudStrata Inc.', 'DevOps Associate', 'Remote', 28.0, '2026-10-15', 'Full-Time', ARRAY['AWS', 'Docker', 'Kubernetes'], 7.5);
