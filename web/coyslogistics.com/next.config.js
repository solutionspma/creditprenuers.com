/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uksjnwnvarhldlxyymef.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc2pud252YXJobGRseHl5bWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDYxOTQsImV4cCI6MjA3NzU4MjE5NH0.A9CE2oq6gF09N-QYG6P8EMrwsW9bhLMkODjRhi_O4W4',
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY || 'pk_test_dummy_key',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.logademy.com',
    NEXT_PUBLIC_BUSINESS_ID: 'BC_COYSLOG_PROD',
  },
}

module.exports = nextConfig
