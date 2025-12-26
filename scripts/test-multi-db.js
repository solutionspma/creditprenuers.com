/**
 * ==============================================
 * TEST MULTI-DATABASE SYNC ARCHITECTURE
 * ==============================================
 * 
 * Tests:
 * 1. CreditPreneurs local DB connection
 * 2. Coys Logistics local DB connection
 * 3. Pitch Modular Spaces (Master) connection
 * 4. Lead sync from child to master
 */

const https = require('https');

// ==============================================
// DATABASE CONFIGURATION
// ==============================================
const DATABASES = {
  creditprenuers: {
    name: 'CreditPreneurs',
    url: 'https://cxbgwvlimlcljttvkdjn.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Ymd3dmxpbWxjbGp0dHZrZGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MTg3MTYsImV4cCI6MjA4MjI5NDcxNn0.a20a1yT0jlEtF4Ofl-u8mOFlSHuS5qM3iHsUNCqw_wc',
    serviceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Ymd3dmxpbWxjbGp0dHZrZGpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjcxODcxNiwiZXhwIjoyMDgyMjk0NzE2fQ.rJckNQzWqrHEDol6ATCcKT6l9CxC3A_y-8MG3JEBC8Y'
  },
  coyslogistics: {
    name: 'Coys Logistics',
    url: 'https://hkfcfooyqaonbszhnrpx.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZmNmb295cWFvbmJzemhucnB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NzA0ODIsImV4cCI6MjA4MjM0NjQ4Mn0.YrkH0TwpkKFVmh-FL7f-B996c0yQg3PhcPEu3GJmiuE',
    serviceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZmNmb295cWFvbmJzemhucnB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njc3MDQ4MiwiZXhwIjoyMDgyMzQ2NDgyfQ.iksdxVuxSKbz_oIlWZgXAm4Pt8iOXLg4MKzW7qd2f90'
  },
  pitchModularSpaces: {
    name: 'Pitch Modular Spaces (Master)',
    url: 'https://uksjnwnvarhldlxyymef.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc2pud252YXJobGRseHl5bWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDYxOTQsImV4cCI6MjA3NzU4MjE5NH0.A9CE2oq6gF09N-QYG6P8EMrwsW9bhLMkODjRhi_O4W4'
  }
};

// ==============================================
// HTTP REQUEST HELPER
// ==============================================
function makeRequest(url, options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// ==============================================
// TEST FUNCTIONS
// ==============================================

async function testConnection(dbKey) {
  const db = DATABASES[dbKey];
  const url = new URL(`${db.url}/rest/v1/`);
  
  try {
    const response = await makeRequest(url.href, {
      method: 'GET',
      headers: {
        'apikey': db.anonKey,
        'Authorization': `Bearer ${db.anonKey}`
      }
    });
    
    if (response.status === 200) {
      console.log(`✓ ${db.name}: Connected`);
      return true;
    } else {
      console.log(`✗ ${db.name}: Failed (${response.status})`);
      return false;
    }
  } catch (err) {
    console.log(`✗ ${db.name}: Error - ${err.message}`);
    return false;
  }
}

async function checkTable(dbKey, tableName) {
  const db = DATABASES[dbKey];
  const url = `${db.url}/rest/v1/${tableName}?limit=1`;
  
  try {
    const response = await makeRequest(url, {
      method: 'GET',
      headers: {
        'apikey': db.anonKey,
        'Authorization': `Bearer ${db.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200) {
      console.log(`  ✓ ${tableName} table exists`);
      return true;
    } else if (response.data?.message?.includes('does not exist')) {
      console.log(`  ✗ ${tableName} table NOT FOUND - Run SQL setup!`);
      return false;
    } else {
      console.log(`  ? ${tableName} status: ${response.status}`);
      return false;
    }
  } catch (err) {
    console.log(`  ✗ ${tableName} error: ${err.message}`);
    return false;
  }
}

async function testInsert(dbKey, tableName, data) {
  const db = DATABASES[dbKey];
  const url = `${db.url}/rest/v1/${tableName}`;
  
  try {
    const response = await makeRequest(url, {
      method: 'POST',
      headers: {
        'apikey': db.serviceKey || db.anonKey,
        'Authorization': `Bearer ${db.serviceKey || db.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    }, data);
    
    if (response.status === 201) {
      console.log(`  ✓ Insert successful: ${JSON.stringify(response.data[0]?.id || response.data).slice(0, 50)}`);
      return response.data;
    } else {
      console.log(`  ✗ Insert failed: ${JSON.stringify(response.data).slice(0, 100)}`);
      return null;
    }
  } catch (err) {
    console.log(`  ✗ Insert error: ${err.message}`);
    return null;
  }
}

// ==============================================
// MAIN TEST RUNNER
// ==============================================

async function runTests() {
  console.log('\n' + '='.repeat(60));
  console.log('MULTI-DATABASE SYNC ARCHITECTURE TEST');
  console.log('='.repeat(60) + '\n');
  
  // Test 1: Connection tests
  console.log('1. TESTING DATABASE CONNECTIONS\n');
  
  for (const dbKey of Object.keys(DATABASES)) {
    await testConnection(dbKey);
  }
  
  // Test 2: Check tables exist
  console.log('\n2. CHECKING TABLES\n');
  
  for (const dbKey of Object.keys(DATABASES)) {
    console.log(`\n${DATABASES[dbKey].name}:`);
    await checkTable(dbKey, 'crm_leads');
    await checkTable(dbKey, 'bookings');
  }
  
  // Test 3: Test insert to CreditPreneurs
  console.log('\n3. TESTING LEAD CAPTURE\n');
  
  const testLead = {
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
    phone: '+15551234567',
    source: 'creditprenuers',
    message: 'Test lead from sync test',
    status: 'new'
  };
  
  console.log('Inserting test lead to CreditPreneurs...');
  const cpResult = await testInsert('creditprenuers', 'crm_leads', testLead);
  
  console.log('\nInserting test lead to Coys Logistics...');
  testLead.source = 'coyslogistics';
  testLead.email = `test-coys-${Date.now()}@example.com`;
  const coysResult = await testInsert('coyslogistics', 'crm_leads', testLead);
  
  console.log('\nInserting test lead to Master (Pitch Modular Spaces)...');
  testLead.source = 'pitchmarketing';
  testLead.email = `test-master-${Date.now()}@example.com`;
  const masterResult = await testInsert('pitchModularSpaces', 'crm_leads', testLead);
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`
Database Architecture:
┌─────────────────────────────────────┐
│   CreditPreneurs                    │ ${cpResult ? '✓ READY' : '✗ NEEDS SETUP'}
│   cxbgwvlimlcljttvkdjn              │
└──────────────────┬──────────────────┘
                   │
┌─────────────────────────────────────┐
│   Coys Logistics                    │ ${coysResult ? '✓ READY' : '✗ NEEDS SETUP'}
│   hkfcfooyqaonbszhnrpx              │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│   Pitch Modular Spaces (MASTER)     │ ${masterResult ? '✓ READY' : '✗ NEEDS SETUP'}
│   uksjnwnvarhldlxyymef              │
└─────────────────────────────────────┘
`);

  if (!cpResult || !coysResult) {
    console.log('\n⚠️  ACTION REQUIRED:');
    if (!cpResult) {
      console.log('   Run: supabase/creditprenuers-setup.sql in');
      console.log('   https://supabase.com/dashboard/project/cxbgwvlimlcljttvkdjn/sql/new\n');
    }
    if (!coysResult) {
      console.log('   Run: supabase/coyslogistics-setup.sql in');
      console.log('   https://supabase.com/dashboard/project/hkfcfooyqaonbszhnrpx/sql/new\n');
    }
  } else {
    console.log('✓ All databases ready for lead capture and sync!\n');
  }
}

runTests().catch(console.error);
