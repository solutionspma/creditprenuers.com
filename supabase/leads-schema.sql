-- ==============================================
-- LEADS SCHEMA FOR CREDTEGY & LOGADEMY
-- ==============================================
-- Run this in Supabase SQL Editor
-- Project: uksjnwnvarhldlxyymef (Pitch Marketing Agency)
-- ==============================================

-- OPTION 1: Add columns to existing crm_leads table (if it exists)
-- ==============================================
DO $$ 
BEGIN
    -- Add source column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'source') THEN
        ALTER TABLE crm_leads ADD COLUMN source TEXT DEFAULT 'pitchmarketing';
    END IF;
    
    -- Add form_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'form_id') THEN
        ALTER TABLE crm_leads ADD COLUMN form_id TEXT;
    END IF;
    
    -- Add product_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'product_id') THEN
        ALTER TABLE crm_leads ADD COLUMN product_id TEXT;
    END IF;
    
    -- Add credit_score column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'credit_score') THEN
        ALTER TABLE crm_leads ADD COLUMN credit_score INTEGER;
    END IF;
    
    -- Add business_type column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'business_type') THEN
        ALTER TABLE crm_leads ADD COLUMN business_type TEXT;
    END IF;
    
    -- Add fleet_size column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'fleet_size') THEN
        ALTER TABLE crm_leads ADD COLUMN fleet_size TEXT;
    END IF;
    
    -- Add UTM tracking columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'utm_source') THEN
        ALTER TABLE crm_leads ADD COLUMN utm_source TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'utm_medium') THEN
        ALTER TABLE crm_leads ADD COLUMN utm_medium TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'utm_campaign') THEN
        ALTER TABLE crm_leads ADD COLUMN utm_campaign TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'utm_term') THEN
        ALTER TABLE crm_leads ADD COLUMN utm_term TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'utm_content') THEN
        ALTER TABLE crm_leads ADD COLUMN utm_content TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'referrer') THEN
        ALTER TABLE crm_leads ADD COLUMN referrer TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'landing_page') THEN
        ALTER TABLE crm_leads ADD COLUMN landing_page TEXT;
    END IF;
END $$;

-- ==============================================
-- OPTION 2: Create bookings table for calendar (if not exists)
-- ==============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id),
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

-- RLS for bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert bookings (for public booking form)
DROP POLICY IF EXISTS "bookings_insert_public" ON bookings;
CREATE POLICY "bookings_insert_public" ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read bookings (for confirmation page)
DROP POLICY IF EXISTS "bookings_read_public" ON bookings;
CREATE POLICY "bookings_read_public" ON bookings
  FOR SELECT
  USING (true);

-- Allow authenticated users to update bookings
DROP POLICY IF EXISTS "bookings_update_auth" ON bookings;
CREATE POLICY "bookings_update_auth" ON bookings
  FOR UPDATE
  USING (true);

-- ==============================================
-- INDEXES FOR PERFORMANCE
-- ==============================================
CREATE INDEX IF NOT EXISTS idx_crm_leads_source ON crm_leads(source);
CREATE INDEX IF NOT EXISTS idx_crm_leads_utm_campaign ON crm_leads(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);

-- ==============================================
-- ENABLE REALTIME
-- ==============================================
DO $$ 
BEGIN
    -- Only add to publication if not already added
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'bookings'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
    END IF;
END $$;

-- ==============================================
-- RLS Policy for crm_leads (allow anonymous inserts)
-- ==============================================
DROP POLICY IF EXISTS "crm_leads_insert_anon" ON crm_leads;
CREATE POLICY "crm_leads_insert_anon" ON crm_leads
  FOR INSERT
  WITH CHECK (true);

-- ==============================================
-- DONE! Tables ready for:
-- - Credtegy leads (source = 'credtegy')
-- - Logademy leads (source = 'logademy')
-- - Pitch Marketing leads (source = 'pitchmarketing')
-- - Calendar bookings
-- ==============================================
