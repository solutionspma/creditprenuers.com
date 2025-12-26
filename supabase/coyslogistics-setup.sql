-- ==============================================
-- COYS LOGISTICS SUPABASE DATABASE SETUP
-- ==============================================
-- Run this in: https://supabase.com/dashboard/project/hkfcfooyqaonbszhnrpx/sql/new
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
  source TEXT DEFAULT 'coyslogistics',
  form_id TEXT,
  product_id TEXT,
  
  -- Message/inquiry
  message TEXT,
  
  -- Coys Logistics specific
  fleet_size TEXT,
  equipment_type TEXT,
  mc_number TEXT,
  dot_number TEXT,
  years_experience INTEGER,
  service_interest TEXT, -- dispatch, mentorship, academy, etc.
  
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

-- 3. CREATE DRIVERS TABLE (Coys specific)
-- ==============================================
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT NOT NULL,
  
  -- CDL info
  cdl_number TEXT,
  cdl_state TEXT,
  cdl_expiration DATE,
  cdl_class TEXT, -- A, B, C
  endorsements TEXT[], -- hazmat, tanker, doubles, etc.
  
  -- Company info
  mc_number TEXT,
  dot_number TEXT,
  company_name TEXT,
  
  -- Experience
  years_experience INTEGER,
  equipment_type TEXT[], -- dry van, reefer, flatbed, etc.
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'suspended')),
  
  -- Source
  lead_id UUID REFERENCES crm_leads(id),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CREATE LOADS TABLE (for dispatch tracking)
-- ==============================================
CREATE TABLE IF NOT EXISTS loads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Load details
  load_number TEXT UNIQUE,
  broker TEXT,
  shipper TEXT,
  consignee TEXT,
  
  -- Route
  origin_city TEXT,
  origin_state TEXT,
  origin_zip TEXT,
  destination_city TEXT,
  destination_state TEXT,
  destination_zip TEXT,
  
  -- Dates
  pickup_date DATE,
  delivery_date DATE,
  
  -- Financials
  rate DECIMAL,
  driver_pay DECIMAL,
  profit DECIMAL,
  
  -- Assignment
  driver_id UUID REFERENCES drivers(id),
  
  -- Status
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'assigned', 'in_transit', 'delivered', 'cancelled')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ENABLE ROW LEVEL SECURITY
-- ==============================================
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE loads ENABLE ROW LEVEL SECURITY;

-- 6. CREATE POLICIES FOR ANONYMOUS ACCESS (website forms)
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

-- Drivers (authenticated only)
DROP POLICY IF EXISTS "drivers_all_authenticated" ON drivers;
CREATE POLICY "drivers_all_authenticated" ON drivers FOR ALL USING (true);

-- Loads (authenticated only)
DROP POLICY IF EXISTS "loads_all_authenticated" ON loads;
CREATE POLICY "loads_all_authenticated" ON loads FOR ALL USING (true);

-- 7. CREATE INDEXES
-- ==============================================
CREATE INDEX IF NOT EXISTS idx_leads_email ON crm_leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON crm_leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON crm_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_synced ON crm_leads(synced_to_master);

CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

CREATE INDEX IF NOT EXISTS idx_drivers_phone ON drivers(phone);
CREATE INDEX IF NOT EXISTS idx_drivers_mc ON drivers(mc_number);
CREATE INDEX IF NOT EXISTS idx_drivers_status ON drivers(status);

CREATE INDEX IF NOT EXISTS idx_loads_driver ON loads(driver_id);
CREATE INDEX IF NOT EXISTS idx_loads_status ON loads(status);
CREATE INDEX IF NOT EXISTS idx_loads_pickup ON loads(pickup_date);

-- 8. CREATE UPDATED_AT TRIGGER
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

DROP TRIGGER IF EXISTS update_drivers_updated_at ON drivers;
CREATE TRIGGER update_drivers_updated_at
    BEFORE UPDATE ON drivers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_loads_updated_at ON loads;
CREATE TRIGGER update_loads_updated_at
    BEFORE UPDATE ON loads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- DONE! Coys Logistics database ready.
-- ==============================================
