import { createClient } from '@supabase/supabase-js'

/**
 * ==============================================
 * CREDITPRENUERS MULTI-DATABASE SUPABASE CLIENT
 * ==============================================
 * 
 * Architecture:
 * 1. LOCAL: CreditPreneurs own Supabase (cxbgwvlimlcljttvkdjn)
 * 2. SYNC → Pitch Marketing Agency (bwycunbaajaemhcgufiz) 
 * 3. SYNC → Pitch Modular Spaces MASTER (uksjnwnvarhldlxyymef)
 */

// ==============================================
// DATABASE CONFIGURATION
// ==============================================

// LOCAL: CreditPreneurs own database (PRIMARY)
const LOCAL_URL = 'https://cxbgwvlimlcljttvkdjn.supabase.co'
const LOCAL_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Ymd3dmxpbWxjbGp0dHZrZGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MTg3MTYsImV4cCI6MjA4MjI5NDcxNn0.a20a1yT0jlEtF4Ofl-u8mOFlSHuS5qM3iHsUNCqw_wc'

// SYNC TARGET 1: Pitch Marketing Agency
const AGENCY_URL = 'https://bwycunbaajaemhcgufiz.supabase.co'
const AGENCY_ANON_KEY = process.env.NEXT_PUBLIC_PITCH_AGENCY_ANON_KEY || null

// SYNC TARGET 2: Pitch Modular Spaces (MASTER)
const MASTER_URL = 'https://uksjnwnvarhldlxyymef.supabase.co'
const MASTER_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc2pud252YXJobGRseHl5bWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDYxOTQsImV4cCI6MjA3NzU4MjE5NH0.A9CE2oq6gF09N-QYG6P8EMrwsW9bhLMkODjRhi_O4W4'

// ==============================================
// SUPABASE CLIENTS
// ==============================================

// Local database (CreditPreneurs own DB - PRIMARY)
export const localSupabase = createClient(LOCAL_URL, LOCAL_ANON_KEY)

// Pitch Marketing Agency (sync target)
export const agencySupabase = AGENCY_ANON_KEY 
  ? createClient(AGENCY_URL, AGENCY_ANON_KEY) 
  : null

// Master database (Pitch Modular Spaces - FINAL SYNC)
export const masterSupabase = createClient(MASTER_URL, MASTER_ANON_KEY)

// Default export for backward compatibility
export const supabase = localSupabase

// ==============================================
// LEAD CAPTURE WITH UPLINE SYNC
// ==============================================

/**
 * Capture a lead and sync to all upstream databases
 * 
 * Flow:
 * 1. Save to CreditPreneurs DB (local - always)
 * 2. Sync to Pitch Marketing Agency (if configured)  
 * 3. Sync to Pitch Modular Spaces (master - always)
 */
export async function captureLead(leadData) {
  const results = {
    local: null,
    agency: null,
    master: null,
    errors: []
  }
  
  // Build lead object
  const lead = {
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone || null,
    company: leadData.company || null,
    message: leadData.message || null,
    source: 'creditprenuers',
    form_id: leadData.form_id || 'website-lead-form',
    product_id: leadData.product_id || null,
    
    // Credit-specific fields
    credit_score: leadData.credit_score || null,
    funding_amount: leadData.funding_amount || null,
    business_type: leadData.business_type || null,
    
    // UTM tracking
    utm_source: leadData.utm_source || null,
    utm_medium: leadData.utm_medium || null,
    utm_campaign: leadData.utm_campaign || null,
    utm_term: leadData.utm_term || null,
    utm_content: leadData.utm_content || null,
    referrer: typeof window !== 'undefined' ? document.referrer : null,
    landing_page: typeof window !== 'undefined' ? window.location.href : null,
    
    status: 'new',
    created_at: new Date().toISOString()
  }
  
  // ==============================================
  // 1. SAVE TO LOCAL DATABASE (CreditPreneurs)
  // ==============================================
  try {
    const { data, error } = await localSupabase
      .from('crm_leads')
      .insert(lead)
      .select()
      .single()
    
    if (error) throw error
    results.local = data
    console.log('✓ Lead saved to CreditPreneurs DB')
  } catch (err) {
    results.errors.push({ db: 'local', error: err.message })
    console.error('✗ Failed to save to CreditPreneurs DB:', err.message)
  }
  
  // ==============================================
  // 2. SYNC TO PITCH MARKETING AGENCY (if configured)
  // ==============================================
  if (agencySupabase) {
    try {
      const agencyLead = {
        ...lead,
        synced_from: 'creditprenuers',
        original_id: results.local?.id || null
      }
      
      const { data, error } = await agencySupabase
        .from('crm_leads')
        .insert(agencyLead)
        .select()
        .single()
      
      if (error) throw error
      results.agency = data
      console.log('✓ Lead synced to Pitch Marketing Agency')
    } catch (err) {
      results.errors.push({ db: 'agency', error: err.message })
      console.error('✗ Failed to sync to Agency:', err.message)
    }
  }
  
  // ==============================================
  // 3. SYNC TO MASTER (Pitch Modular Spaces)
  // ==============================================
  try {
    const masterLead = {
      ...lead,
      synced_from: 'creditprenuers',
      original_id: results.local?.id || null
    }
    
    const { data, error } = await masterSupabase
      .from('crm_leads')
      .insert(masterLead)
      .select()
      .single()
    
    if (error) throw error
    results.master = data
    console.log('✓ Lead synced to Pitch Modular Spaces (Master)')
    
    // Update local record to mark as synced
    if (results.local?.id) {
      await localSupabase
        .from('crm_leads')
        .update({ synced_to_master: true, synced_at: new Date().toISOString() })
        .eq('id', results.local.id)
    }
  } catch (err) {
    results.errors.push({ db: 'master', error: err.message })
    console.error('✗ Failed to sync to Master:', err.message)
  }
  
  // Return success if local save worked (sync failures are non-blocking)
  if (results.local) {
    return {
      success: true,
      leadId: results.local.id,
      synced: {
        local: true,
        agency: !!results.agency,
        master: !!results.master
      }
    }
  }
  
  // If local failed but master worked, still success
  if (results.master) {
    return {
      success: true,
      leadId: results.master.id,
      synced: {
        local: false,
        agency: !!results.agency,
        master: true
      },
      warning: 'Local save failed but synced to master'
    }
  }
  
  // All critical databases failed
  throw new Error(`Lead capture failed: ${results.errors.map(e => e.error).join(', ')}`)
}

/**
 * Capture a booking and sync upline
 */
export async function captureBooking(bookingData) {
  const booking = {
    name: bookingData.name,
    email: bookingData.email,
    phone: bookingData.phone || null,
    service: bookingData.service || 'consultation',
    date: bookingData.date,
    time: bookingData.time,
    notes: bookingData.notes || null,
    status: 'pending',
    created_at: new Date().toISOString()
  }
  
  // Save locally first
  const { data: localBooking, error: localError } = await localSupabase
    .from('bookings')
    .insert(booking)
    .select()
    .single()
  
  if (localError) {
    console.error('Local booking save failed:', localError)
  }
  
  // Sync to master
  const { data: masterBooking, error: masterError } = await masterSupabase
    .from('bookings')
    .insert({
      ...booking,
      synced_from: 'creditprenuers',
      original_id: localBooking?.id
    })
    .select()
    .single()
  
  if (masterError) {
    console.error('Master booking sync failed:', masterError)
  }
  
  return {
    success: !!(localBooking || masterBooking),
    bookingId: localBooking?.id || masterBooking?.id,
    synced: {
      local: !!localBooking,
      master: !!masterBooking
    }
  }
}

export default supabase
