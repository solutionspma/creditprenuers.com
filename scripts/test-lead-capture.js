/**
 * Test script to verify lead capture is working
 * Run with: node scripts/test-lead-capture.js
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://uksjnwnvarhldlxyymef.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc2pud252YXJobGRseHl5bWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDYxOTQsImV4cCI6MjA3NzU4MjE5NH0.A9CE2oq6gF09N-QYG6P8EMrwsW9bhLMkODjRhi_O4W4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testLeadCapture() {
  console.log('🧪 Testing lead capture to Supabase...\n');
  
  // Test 1: Check crm_leads table structure
  console.log('1️⃣ Checking crm_leads table...');
  const { data: existingLeads, error: readError } = await supabase
    .from('crm_leads')
    .select('*')
    .limit(1);
  
  if (readError) {
    console.log('   ❌ Error reading crm_leads:', readError.message);
    console.log('   💡 The crm_leads table may need additional columns.');
    console.log('   📋 Run the SQL in supabase/leads-schema.sql to add required columns.\n');
  } else {
    console.log('   ✅ crm_leads table accessible');
    if (existingLeads.length > 0) {
      console.log('   📊 Sample columns:', Object.keys(existingLeads[0]).join(', '));
    }
  }
  
  // Test 2: Try inserting a test lead
  console.log('\n2️⃣ Testing lead insert...');
  const testLead = {
    name: 'Test Lead - DELETE ME',
    email: 'test@example.com',
    phone: '+15551234567',
    source: 'credtegy',
    form_id: 'test_script',
    status: 'new',
    message: 'This is a test lead from the verification script',
    created_at: new Date().toISOString(),
  };
  
  const { data: insertData, error: insertError } = await supabase
    .from('crm_leads')
    .insert([testLead])
    .select();
  
  if (insertError) {
    console.log('   ❌ Insert failed:', insertError.message);
    console.log('   💡 Missing columns. Run the SQL schema to add them.');
    console.log('\n📋 Required SQL (run in Supabase SQL Editor):');
    console.log('   https://supabase.com/dashboard/project/uksjnwnvarhldlxyymef/sql/new\n');
    console.log(`
-- Add these columns to crm_leads if they don't exist:
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'pitchmarketing';
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS form_id TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS credit_score INTEGER;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS business_type TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS fleet_size TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS landing_page TEXT;

-- Enable anonymous inserts
DROP POLICY IF EXISTS "crm_leads_insert_anon" ON crm_leads;
CREATE POLICY "crm_leads_insert_anon" ON crm_leads FOR INSERT WITH CHECK (true);
    `);
  } else {
    console.log('   ✅ Lead inserted successfully!');
    console.log('   📝 Lead ID:', insertData[0].id);
    
    // Clean up test lead
    console.log('\n3️⃣ Cleaning up test lead...');
    await supabase.from('crm_leads').delete().eq('id', insertData[0].id);
    console.log('   ✅ Test lead deleted');
  }
  
  // Test 3: Check bookings table
  console.log('\n4️⃣ Checking bookings table...');
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('*')
    .limit(1);
  
  if (bookingsError) {
    console.log('   ⚠️ Bookings table issue:', bookingsError.message);
    console.log('   💡 Run the schema SQL to create the bookings table.');
  } else {
    console.log('   ✅ Bookings table accessible');
  }
  
  console.log('\n════════════════════════════════════════════');
  console.log('📋 Summary');
  console.log('════════════════════════════════════════════');
  console.log('If any tests failed, run the SQL in:');
  console.log('   supabase/leads-schema.sql');
  console.log('\nGo to:');
  console.log('   https://supabase.com/dashboard/project/uksjnwnvarhldlxyymef/sql/new');
  console.log('\nPaste the SQL and click Run.');
}

testLeadCapture().catch(console.error);
