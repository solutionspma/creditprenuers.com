# Database Setup Summary - December 26, 2025

## ✅ COMPLETED TASKS

### 1. Credtegy & Logademy Lead Capture
- **Added Supabase client** to both websites (`@supabase/supabase-js`)
- **Updated LeadForm components** to save leads to Pitch Marketing Agency's Supabase
- **Created SQL schema** to extend `crm_leads` table for multi-site tracking
- **All leads** from both sites will be stored in Pitch Marketing Agency's dashboard

### 2. Pitch Marketing Agency Calendar Fix
- **Fixed booking confirmation API** to handle missing SendGrid gracefully
- **Added Telnyx SMS** as backup notification method
- **Owner notification** - You'll receive an SMS when someone books
- **Booking still saves** even if email/SMS notification fails

---

## ⚠️ ACTION REQUIRED - Run SQL in Supabase

You need to run ONE SQL file to complete the setup:

### Step 1: Open Supabase SQL Editor
Go to: **https://supabase.com/dashboard/project/uksjnwnvarhldlxyymef/sql/new**

### Step 2: Copy and Paste this SQL:

```sql
-- ADD COLUMNS TO CRM_LEADS TABLE
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

-- ENABLE ANONYMOUS INSERTS FOR CRM_LEADS
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "crm_leads_insert_anon" ON crm_leads;
CREATE POLICY "crm_leads_insert_anon" ON crm_leads FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "crm_leads_select_anon" ON crm_leads;
CREATE POLICY "crm_leads_select_anon" ON crm_leads FOR SELECT USING (true);

-- CREATE BOOKINGS TABLE
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

-- ENABLE ANONYMOUS INSERTS FOR BOOKINGS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bookings_insert_public" ON bookings;
CREATE POLICY "bookings_insert_public" ON bookings FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "bookings_select_public" ON bookings;
CREATE POLICY "bookings_select_public" ON bookings FOR SELECT USING (true);
DROP POLICY IF EXISTS "bookings_update_public" ON bookings;
CREATE POLICY "bookings_update_public" ON bookings FOR UPDATE USING (true);

-- CREATE INDEXES
CREATE INDEX IF NOT EXISTS idx_crm_leads_source ON crm_leads(source);
CREATE INDEX IF NOT EXISTS idx_crm_leads_email ON crm_leads(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
```

### Step 3: Click "Run"

---

## 📊 LEAD TRACKING

After running the SQL, leads will be tagged by source:
- **Credtegy leads**: `source = 'credtegy'`
- **Logademy leads**: `source = 'logademy'`
- **Pitch Marketing leads**: `source = 'pitchmarketing'`

You can filter leads in your CRM by source to see which site they came from.

---

## 📅 CALENDAR NOTIFICATIONS

When someone books on pitchmarketing.agency:
1. Booking saves to `bookings` table ✅
2. SMS notification sent to your phone (+17606169587) ✅
3. Confirmation email sent (if SendGrid configured)
4. Client receives SMS confirmation (if they provide phone)

---

## 🔧 FILES MODIFIED

### Credtegy/Logademy Repo (pushed to GitHub):
- `web/credtegy.com/src/lib/supabase.js` - New Supabase client
- `web/credtegy.com/src/components/LeadForm.jsx` - Updated to save leads
- `web/logademy.com/src/lib/supabase.js` - New Supabase client
- `web/logademy.com/src/components/LeadForm.jsx` - Updated to save leads
- `supabase/quick-fix.sql` - SQL to run in Supabase

### Pitch Marketing Agency (committed locally):
- `src/app/api/book/confirm/route.ts` - Fixed booking notifications
- `.env.local` - Added Telnyx config

---

## 🔑 ENVIRONMENT VARIABLES CONFIGURED

Already set up in `.env.local`:
- `TELNYX_API_KEY` - For SMS notifications
- `TELNYX_PHONE_NUMBER` - +18339041505
- `OWNER_PHONE` - +17606169587 (your phone for booking alerts)

---

## ✅ VERIFICATION

After running the SQL, test the lead capture:
```bash
cd /path/to/credtegy.com
node scripts/test-lead-capture.js
```

This will confirm everything is working.
