/**
 * ==============================================
 * SUPABASE MULTI-DATABASE SYNC SERVICE
 * ==============================================
 * 
 * Architecture:
 * - CreditPreneurs DB → syncs to → Pitch Marketing Agency → syncs to → Pitch Modular Spaces
 * - Coys Logistics DB → syncs to → Pitch Marketing Agency → syncs to → Pitch Modular Spaces
 * 
 * Each child database writes locally first, then syncs upline.
 */

const { createClient } = require('@supabase/supabase-js');

// ==============================================
// DATABASE CONFIGURATION
// ==============================================
const DATABASES = {
  // Master database (final destination)
  pitchModularSpaces: {
    name: 'Pitch Modular Spaces',
    url: 'https://uksjnwnvarhldlxyymef.supabase.co',
    // Service role key needed for cross-database writes
    serviceKey: process.env.PITCH_MODULAR_SERVICE_KEY,
    anonKey: process.env.PITCH_MODULAR_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc2pud252YXJobGRseHl5bWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2OTU0MjgsImV4cCI6MjA0MDI3MTQyOH0.Ej8Ej8Ej8Ej8Ej8',
    isMaster: true,
    syncTo: null // This is the top level
  },
  
  // Pitch Marketing Agency (aggregator)
  pitchMarketingAgency: {
    name: 'Pitch Marketing Agency',
    url: 'https://bwycunbaajaemhcgufiz.supabase.co',
    serviceKey: process.env.PITCH_AGENCY_SERVICE_KEY,
    anonKey: process.env.PITCH_AGENCY_ANON_KEY,
    isMaster: false,
    syncTo: 'pitchModularSpaces'
  },
  
  // CreditPreneurs (child)
  creditprenuers: {
    name: 'CreditPreneurs',
    url: process.env.CREDITPRENUERS_SUPABASE_URL,
    serviceKey: process.env.CREDITPRENUERS_SERVICE_KEY,
    anonKey: process.env.CREDITPRENUERS_ANON_KEY,
    isMaster: false,
    syncTo: 'pitchMarketingAgency'
  },
  
  // Coys Logistics (child)
  coyslogistics: {
    name: 'Coys Logistics',
    url: process.env.COYSLOGISTICS_SUPABASE_URL,
    serviceKey: process.env.COYSLOGISTICS_SERVICE_KEY,
    anonKey: process.env.COYSLOGISTICS_ANON_KEY,
    isMaster: false,
    syncTo: 'pitchMarketingAgency'
  }
};

// ==============================================
// CREATE SUPABASE CLIENTS
// ==============================================
function getClient(dbKey, useServiceRole = false) {
  const db = DATABASES[dbKey];
  if (!db || !db.url) {
    console.warn(`Database ${dbKey} not configured`);
    return null;
  }
  
  const key = useServiceRole ? db.serviceKey : db.anonKey;
  if (!key) {
    console.warn(`No ${useServiceRole ? 'service' : 'anon'} key for ${dbKey}`);
    return null;
  }
  
  return createClient(db.url, key);
}

// ==============================================
// SYNC FUNCTIONS
// ==============================================

/**
 * Sync a lead from child database to parent databases
 * @param {Object} lead - The lead data
 * @param {string} sourceDb - The source database key
 */
async function syncLeadUpline(lead, sourceDb) {
  const results = {
    success: [],
    failed: []
  };
  
  let currentDb = sourceDb;
  
  // Walk up the chain and sync to each parent
  while (DATABASES[currentDb]?.syncTo) {
    const parentDbKey = DATABASES[currentDb].syncTo;
    const parentClient = getClient(parentDbKey, true); // Use service role for writes
    
    if (!parentClient) {
      results.failed.push({
        db: parentDbKey,
        error: 'Client not configured'
      });
      break; // Can't continue chain if parent fails
    }
    
    try {
      // Add sync metadata
      const syncedLead = {
        ...lead,
        synced_from: sourceDb,
        synced_at: new Date().toISOString(),
        original_id: lead.id,
        source: lead.source || sourceDb
      };
      
      // Remove the original ID so parent generates new one
      delete syncedLead.id;
      
      const { data, error } = await parentClient
        .from('crm_leads')
        .upsert(syncedLead, {
          onConflict: 'original_id,synced_from',
          ignoreDuplicates: false
        })
        .select();
      
      if (error) throw error;
      
      results.success.push({
        db: parentDbKey,
        data
      });
      
      console.log(`✓ Synced lead to ${DATABASES[parentDbKey].name}`);
      
      // Move up the chain
      currentDb = parentDbKey;
      
    } catch (error) {
      results.failed.push({
        db: parentDbKey,
        error: error.message
      });
      console.error(`✗ Failed to sync to ${DATABASES[parentDbKey].name}:`, error.message);
      break; // Stop chain on failure
    }
  }
  
  return results;
}

/**
 * Sync a booking from child database to parent databases
 */
async function syncBookingUpline(booking, sourceDb) {
  const results = {
    success: [],
    failed: []
  };
  
  let currentDb = sourceDb;
  
  while (DATABASES[currentDb]?.syncTo) {
    const parentDbKey = DATABASES[currentDb].syncTo;
    const parentClient = getClient(parentDbKey, true);
    
    if (!parentClient) {
      results.failed.push({ db: parentDbKey, error: 'Client not configured' });
      break;
    }
    
    try {
      const syncedBooking = {
        ...booking,
        synced_from: sourceDb,
        synced_at: new Date().toISOString(),
        original_id: booking.id
      };
      
      delete syncedBooking.id;
      
      const { data, error } = await parentClient
        .from('bookings')
        .upsert(syncedBooking, {
          onConflict: 'original_id,synced_from',
          ignoreDuplicates: false
        })
        .select();
      
      if (error) throw error;
      
      results.success.push({ db: parentDbKey, data });
      console.log(`✓ Synced booking to ${DATABASES[parentDbKey].name}`);
      
      currentDb = parentDbKey;
      
    } catch (error) {
      results.failed.push({ db: parentDbKey, error: error.message });
      console.error(`✗ Failed to sync booking to ${DATABASES[parentDbKey].name}:`, error.message);
      break;
    }
  }
  
  return results;
}

/**
 * Capture lead and sync upline
 * This is the main function child databases should use
 */
async function captureAndSyncLead(leadData, sourceDb) {
  const client = getClient(sourceDb);
  
  if (!client) {
    throw new Error(`Source database ${sourceDb} not configured`);
  }
  
  // 1. Insert into local database first
  const { data: localLead, error: localError } = await client
    .from('crm_leads')
    .insert({
      ...leadData,
      source: sourceDb,
      created_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (localError) {
    throw new Error(`Local insert failed: ${localError.message}`);
  }
  
  console.log(`✓ Lead saved locally to ${DATABASES[sourceDb].name}`);
  
  // 2. Sync upline (async, don't block response)
  syncLeadUpline(localLead, sourceDb)
    .then(results => {
      if (results.failed.length > 0) {
        console.warn('Some sync operations failed:', results.failed);
        // TODO: Queue for retry
      }
    })
    .catch(err => {
      console.error('Upline sync failed:', err);
      // TODO: Queue for retry
    });
  
  return localLead;
}

/**
 * Capture booking and sync upline
 */
async function captureAndSyncBooking(bookingData, sourceDb) {
  const client = getClient(sourceDb);
  
  if (!client) {
    throw new Error(`Source database ${sourceDb} not configured`);
  }
  
  const { data: localBooking, error: localError } = await client
    .from('bookings')
    .insert({
      ...bookingData,
      created_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (localError) {
    throw new Error(`Local insert failed: ${localError.message}`);
  }
  
  console.log(`✓ Booking saved locally to ${DATABASES[sourceDb].name}`);
  
  syncBookingUpline(localBooking, sourceDb)
    .then(results => {
      if (results.failed.length > 0) {
        console.warn('Some sync operations failed:', results.failed);
      }
    })
    .catch(err => {
      console.error('Upline sync failed:', err);
    });
  
  return localBooking;
}

// ==============================================
// BATCH SYNC (for initial migration or recovery)
// ==============================================

/**
 * Sync all leads from a child database to all parents
 */
async function batchSyncLeads(sourceDb, options = {}) {
  const { since, limit = 1000 } = options;
  const client = getClient(sourceDb);
  
  if (!client) {
    throw new Error(`Source database ${sourceDb} not configured`);
  }
  
  let query = client
    .from('crm_leads')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(limit);
  
  if (since) {
    query = query.gte('created_at', since);
  }
  
  const { data: leads, error } = await query;
  
  if (error) {
    throw new Error(`Failed to fetch leads: ${error.message}`);
  }
  
  console.log(`Found ${leads.length} leads to sync from ${sourceDb}`);
  
  const results = {
    total: leads.length,
    synced: 0,
    failed: 0,
    errors: []
  };
  
  for (const lead of leads) {
    try {
      await syncLeadUpline(lead, sourceDb);
      results.synced++;
    } catch (err) {
      results.failed++;
      results.errors.push({ leadId: lead.id, error: err.message });
    }
  }
  
  return results;
}

// ==============================================
// EXPORTS
// ==============================================
module.exports = {
  DATABASES,
  getClient,
  syncLeadUpline,
  syncBookingUpline,
  captureAndSyncLead,
  captureAndSyncBooking,
  batchSyncLeads
};
