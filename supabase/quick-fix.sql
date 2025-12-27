-- ==============================================
-- QUICK SQL FIX FOR LEADS & BOOKINGS
-- ==============================================
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/uksjnwnvarhldlxyymef/sql/new
-- ==============================================

-- 1. ADD COLUMNS TO CRM_LEADS TABLE
-- ==============================================
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'pitchmarketing';
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS form_id TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS product_id TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS credit_score INTEGER;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS business_type TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS fleet_size TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS utm_term TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS landing_page TEXT;

-- 2. ENABLE ANONYMOUS INSERTS FOR CRM_LEADS
-- ==============================================
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "crm_leads_insert_anon" ON crm_leads;
CREATE POLICY "crm_leads_insert_anon" ON crm_leads FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "crm_leads_select_anon" ON crm_leads;
CREATE POLICY "crm_leads_select_anon" ON crm_leads FOR SELECT USING (true);

-- 3. CREATE BOOKINGS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID,
  client_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ENABLE ANONYMOUS INSERTS FOR BOOKINGS
-- ==============================================
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bookings_insert_public" ON bookings;
CREATE POLICY "bookings_insert_public" ON bookings FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "bookings_select_public" ON bookings;
CREATE POLICY "bookings_select_public" ON bookings FOR SELECT USING (true);
DROP POLICY IF EXISTS "bookings_update_public" ON bookings;
CREATE POLICY "bookings_update_public" ON bookings FOR UPDATE USING (true);

-- 5. CREATE INDEXES
-- ==============================================
CREATE INDEX IF NOT EXISTS idx_crm_leads_source ON crm_leads(source);
CREATE INDEX IF NOT EXISTS idx_crm_leads_email ON crm_leads(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- ==============================================
-- DONE! Tables ready for:
-- - Credtegy leads (source = 'credtegy')
-- - Logademy leads (source = 'logademy')  
-- - Pitch Marketing bookings
-- ==============================================
