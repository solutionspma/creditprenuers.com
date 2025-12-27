/**
 * Run Leads Schema SQL against Supabase
 * This creates the leads and lead_activities tables
 * in the Pitch Marketing Agency Supabase project
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase credentials (Pitch Marketing Agency project)
const SUPABASE_URL = 'https://uksjnwnvarhldlxyymef.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc2pud252YXJobGRseHl5bWVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjAwNjE5NCwiZXhwIjoyMDc3NTgyMTk0fQ.PLACEHOLDER_NEED_REAL_KEY';

async function runSchema() {
  console.log('🚀 Setting up Leads tables in Supabase...\n');
  
  // Note: For schema changes, you need to run SQL directly in Supabase SQL Editor
  // This script is for reference - copy the SQL from supabase/leads-schema.sql
  // and run it in your Supabase dashboard at:
  // https://supabase.com/dashboard/project/uksjnwnvarhldlxyymef/sql
  
  console.log('📋 Instructions:');
  console.log('================');
  console.log('1. Go to: https://supabase.com/dashboard/project/uksjnwnvarhldlxyymef/sql');
  console.log('2. Copy the contents of: supabase/leads-schema.sql');
  console.log('3. Paste and run the SQL in the SQL Editor');
  console.log('4. The leads table will be created and ready for use\n');
  
  console.log('📁 SQL file location:');
  console.log(path.resolve(__dirname, '../supabase/leads-schema.sql'));
  console.log('\n');
  
  // Read and display the SQL for convenience
  const sqlPath = path.resolve(__dirname, '../supabase/leads-schema.sql');
  if (fs.existsSync(sqlPath)) {
    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log('📝 SQL Preview (first 50 lines):');
    console.log('================================');
    const lines = sql.split('\n').slice(0, 50);
    console.log(lines.join('\n'));
    console.log('\n... (truncated) ...\n');
  }
  
  console.log('✅ After running the SQL, the following tables will be created:');
  console.log('   - leads (stores all leads from Credtegy, Logademy, and PitchMarketing)');
  console.log('   - lead_activities (tracks all lead interactions)');
  console.log('\n');
  console.log('🔗 All leads will be visible in your Pitch Marketing Agency dashboard!');
}

runSchema().catch(console.error);
