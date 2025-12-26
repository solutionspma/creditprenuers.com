/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY || 'pk_test_dummy_key',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.modcrm.local',
    NEXT_PUBLIC_BUSINESS_ID: 'BC_CREDITPREN_STAGING',
  },
}

module.exports = nextConfig
