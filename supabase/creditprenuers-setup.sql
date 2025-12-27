-- ==============================================
-- CREDITPRENUERS / CREDTEGY SUPABASE DATABASE SETUP
-- ==============================================
-- Run this in: https://supabase.com/dashboard/project/cxbgwvlimlcljttvkdjn/sql/new
-- ==============================================

-- 1. CREATE CRM_LEADS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS crm_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  
  -- Source tracking
  source TEXT DEFAULT 'creditprenuers',
  form_id TEXT,
  product_id TEXT,
  
  -- Message/inquiry
  message TEXT,
  
  -- CreditPreneurs specific
  credit_score INTEGER,
  funding_amount DECIMAL,
  business_type TEXT,
  years_in_business INTEGER,
  annual_revenue DECIMAL,
  
  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  landing_page TEXT,
  
  -- Sync fields (for upline sync)
  synced_to_agency BOOLEAN DEFAULT FALSE,
  synced_to_master BOOLEAN DEFAULT FALSE,
  synced_at TIMESTAMPTZ,
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  assigned_to UUID,
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREATE BOOKINGS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Client info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Booking details
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  notes TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
  cancellation_reason TEXT,
  
  -- Sync fields
  synced_to_agency BOOLEAN DEFAULT FALSE,
  synced_to_master BOOLEAN DEFAULT FALSE,
  synced_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE CONTACTS TABLE (for CRM)
-- ==============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic info
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  company TEXT,
  
  -- Address
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  
  -- Credit profile
  credit_score INTEGER,
  credit_goal TEXT,
  
  -- Source
  lead_id UUID REFERENCES crm_leads(id),
  source TEXT DEFAULT 'creditprenuers',
  
  -- Status
  status TEXT DEFAULT 'active',
  tags TEXT[],
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CREATE DISPUTES TABLE (Credtegy Dispute Center)
-- ==============================================
CREATE TABLE IF NOT EXISTS disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Client reference
  client_id UUID REFERENCES contacts(id),
  
  -- Dispute details
  bureau TEXT NOT NULL CHECK (bureau IN ('Equifax', 'Experian', 'TransUnion')),
  creditor TEXT NOT NULL,
  account_number TEXT,
  amount DECIMAL,
  reason TEXT NOT NULL,
  
  -- Letter info
  letter_type TEXT NOT NULL,
  letter_url TEXT,
  letter_sent_date DATE,
  tracking_number TEXT,
  
  -- Response tracking
  response_received BOOLEAN DEFAULT FALSE,
  response_date DATE,
  response_notes TEXT,
  
  -- Status workflow
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Sent', 'Replied', 'Deleted', 'Won', 'Lost')),
  
  -- Follow-up
  follow_up_date DATE,
  round INTEGER DEFAULT 1,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CREATE DISPUTE_DOCUMENTS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS dispute_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID REFERENCES disputes(id) ON DELETE CASCADE,
  
  -- Document info
  name TEXT NOT NULL,
  type TEXT, -- letter, response, evidence, etc.
  url TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CREATE CREDIT_REPORTS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS credit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES contacts(id),
  
  -- Scores
  equifax_score INTEGER,
  experian_score INTEGER,
  transunion_score INTEGER,
  
  -- Report date
  report_date DATE NOT NULL,
  report_url TEXT,
  
  -- Notes
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ENABLE ROW LEVEL SECURITY
-- ==============================================
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispute_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_reports ENABLE ROW LEVEL SECURITY;

-- 5. CREATE POLICIES FOR ANONYMOUS ACCESS (website forms)
-- ==============================================
-- Leads
DROP POLICY IF EXISTS "leads_insert_public" ON crm_leads;
CREATE POLICY "leads_insert_public" ON crm_leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "leads_select_authenticated" ON crm_leads;
CREATE POLICY "leads_select_authenticated" ON crm_leads FOR SELECT USING (true);

-- Bookings
DROP POLICY IF EXISTS "bookings_insert_public" ON bookings;
CREATE POLICY "bookings_insert_public" ON bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "bookings_select_public" ON bookings;
CREATE POLICY "bookings_select_public" ON bookings FOR SELECT USING (true);

DROP POLICY IF EXISTS "bookings_update_public" ON bookings;
CREATE POLICY "bookings_update_public" ON bookings FOR UPDATE USING (true);

-- Contacts
DROP POLICY IF EXISTS "contacts_all_authenticated" ON contacts;
CREATE POLICY "contacts_all_authenticated" ON contacts FOR ALL USING (true);

-- Disputes
DROP POLICY IF EXISTS "disputes_all_public" ON disputes;
CREATE POLICY "disputes_all_public" ON disputes FOR ALL USING (true);

-- Dispute Documents
DROP POLICY IF EXISTS "dispute_docs_all_public" ON dispute_documents;
CREATE POLICY "dispute_docs_all_public" ON dispute_documents FOR ALL USING (true);

-- Credit Reports
DROP POLICY IF EXISTS "credit_reports_all_public" ON credit_reports;
CREATE POLICY "credit_reports_all_public" ON credit_reports FOR ALL USING (true);

-- 6. CREATE INDEXES
-- ==============================================
CREATE INDEX IF NOT EXISTS idx_leads_email ON crm_leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON crm_leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON crm_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_synced ON crm_leads(synced_to_master);

CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

CREATE INDEX IF NOT EXISTS idx_disputes_client ON disputes(client_id);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);
CREATE INDEX IF NOT EXISTS idx_disputes_bureau ON disputes(bureau);
CREATE INDEX IF NOT EXISTS idx_disputes_created ON disputes(created_at);

CREATE INDEX IF NOT EXISTS idx_credit_reports_client ON credit_reports(client_id);
CREATE INDEX IF NOT EXISTS idx_credit_reports_date ON credit_reports(report_date);

-- 7. CREATE UPDATED_AT TRIGGER
-- ==============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_crm_leads_updated_at ON crm_leads;
CREATE TRIGGER update_crm_leads_updated_at
    BEFORE UPDATE ON crm_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_disputes_updated_at ON disputes;
CREATE TRIGGER update_disputes_updated_at
    BEFORE UPDATE ON disputes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- DONE! CreditPreneurs / Credtegy database ready.
-- Tables: crm_leads, bookings, contacts, disputes, 
--         dispute_documents, credit_reports
-- ==============================================
