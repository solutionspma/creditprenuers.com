// MBOCC Command Center - Database Seed
// Initial seed data for CreditPreneurs & Coys Logistics

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ==========================================
  // CREATE BUSINESSES
  // ==========================================

  console.log('📦 Creating businesses...');

  const creditprenuers = await prisma.business.upsert({
    where: { slug: 'creditprenuers' },
    update: {},
    create: {
      slug: 'creditprenuers',
      name: 'CreditPreneurs',
      type: 'credit_repair',
      config: {
        apiKey: 'cpk_' + require('crypto').randomBytes(16).toString('hex'),
        features: ['contacts', 'pipelines', 'funding', 'documents', 'automation', 'communication', 'billing', 'cms'],
        branding: {
          primaryColor: '#D4AF37',
          secondaryColor: '#000000',
          logo: '/images/logo.png'
        },
        telnyxPhoneNumber: process.env.TELNYX_CREDITPRENUERS_PHONE || '+18001234567',
        products: [
          { name: 'Trucking Business eBook', price: 27, type: 'one_time' },
          { name: 'Monthly Mentorship', price: 47, type: 'subscription', interval: 'month' },
          { name: '1-on-1 Consultation', price: 150, type: 'one_time' }
        ]
      },
      isActive: true
    }
  });

  const coyslogistics = await prisma.business.upsert({
    where: { slug: 'coyslogistics' },
    update: {},
    create: {
      slug: 'coyslogistics',
      name: 'Coys Logistics',
      type: 'logistics',
      config: {
        apiKey: 'clk_' + require('crypto').randomBytes(16).toString('hex'),
        features: ['fleet', 'loads', 'drivers', 'contacts', 'pipelines', 'documents', 'automation', 'communication', 'billing', 'cms'],
        branding: {
          primaryColor: '#D4AF37',
          secondaryColor: '#000000',
          logo: '/images/coys-logo.png'
        },
        telnyxPhoneNumber: process.env.TELNYX_COYSLOGISTICS_PHONE || '+18009876543',
        accessorials: [
          { code: 'TARP', name: 'Tarping', defaultRate: 75 },
          { code: 'LGATE', name: 'Liftgate', defaultRate: 50 },
          { code: 'DET', name: 'Detention (per hour)', defaultRate: 50 },
          { code: 'LUMPER', name: 'Lumper Fee', defaultRate: 0 },
          { code: 'LAYOVER', name: 'Layover', defaultRate: 200 }
        ]
      },
      isActive: true
    }
  });

  console.log(`  ✅ Created business: ${creditprenuers.name}`);
  console.log(`  ✅ Created business: ${coyslogistics.name}`);

  // ==========================================
  // CREATE USERS
  // ==========================================

  console.log('👤 Creating users...');

  const passwordHash = await bcrypt.hash('Admin123!', 12);

  // CreditPreneurs Admin
  const cpAdmin = await prisma.user.upsert({
    where: { businessId_email: { businessId: creditprenuers.id, email: 'admin@creditprenuers.com' } },
    update: {},
    create: {
      businessId: creditprenuers.id,
      email: 'admin@creditprenuers.com',
      passwordHash,
      firstName: 'Shakur',
      lastName: 'Mac',
      role: 'owner',
      permissions: ['*'],
      phone: '+15551234567',
      isActive: true
    }
  });

  // Coys Logistics Admin
  const clAdmin = await prisma.user.upsert({
    where: { businessId_email: { businessId: coyslogistics.id, email: 'admin@coyslogistics.com' } },
    update: {},
    create: {
      businessId: coyslogistics.id,
      email: 'admin@coyslogistics.com',
      passwordHash,
      firstName: 'Dispatch',
      lastName: 'Admin',
      role: 'owner',
      permissions: ['*'],
      phone: '+15559876543',
      isActive: true
    }
  });

  console.log(`  ✅ Created user: ${cpAdmin.email}`);
  console.log(`  ✅ Created user: ${clAdmin.email}`);

  // ==========================================
  // CREATE PIPELINES - CREDITPRENUERS
  // ==========================================

  console.log('📊 Creating CreditPreneurs pipelines...');

  const cpPipeline = await prisma.pipeline.create({
    data: {
      businessId: creditprenuers.id,
      name: 'Credit Repair Journey',
      description: 'Track clients through credit repair process',
      type: 'onboarding',
      isDefault: true,
      stages: {
        create: [
          { name: 'New Lead', color: '#EF4444', position: 0, probability: 10 },
          { name: 'Consultation Scheduled', color: '#F97316', position: 1, probability: 25 },
          { name: 'Onboarding', color: '#EAB308', position: 2, probability: 50 },
          { name: 'Credit Analysis', color: '#22C55E', position: 3, probability: 65 },
          { name: 'Dispute In Progress', color: '#3B82F6', position: 4, probability: 75 },
          { name: 'Funding Ready', color: '#8B5CF6', position: 5, probability: 90 },
          { name: 'Funded - Graduate', color: '#D4AF37', position: 6, probability: 100, isWon: true },
          { name: 'Lost/Inactive', color: '#6B7280', position: 7, probability: 0, isLost: true }
        ]
      }
    }
  });

  console.log(`  ✅ Created pipeline: ${cpPipeline.name}`);

  // ==========================================
  // CREATE PIPELINES - COYS LOGISTICS
  // ==========================================

  console.log('📊 Creating Coys Logistics pipelines...');

  const clPipeline = await prisma.pipeline.create({
    data: {
      businessId: coyslogistics.id,
      name: 'Load Tracking',
      description: 'Track loads from quote to delivery',
      type: 'load_tracking',
      isDefault: true,
      stages: {
        create: [
          { name: 'Quote Request', color: '#EF4444', position: 0, probability: 10 },
          { name: 'Quoted', color: '#F97316', position: 1, probability: 25 },
          { name: 'Booked', color: '#EAB308', position: 2, probability: 75 },
          { name: 'Dispatched', color: '#22C55E', position: 3, probability: 85 },
          { name: 'In Transit', color: '#3B82F6', position: 4, probability: 90 },
          { name: 'Delivered', color: '#8B5CF6', position: 5, probability: 95 },
          { name: 'POD Received', color: '#EC4899', position: 6, probability: 98 },
          { name: 'Invoiced', color: '#D4AF37', position: 7, probability: 99 },
          { name: 'Paid', color: '#10B981', position: 8, probability: 100, isWon: true },
          { name: 'Cancelled', color: '#6B7280', position: 9, probability: 0, isLost: true }
        ]
      }
    }
  });

  console.log(`  ✅ Created pipeline: ${clPipeline.name}`);

  // ==========================================
  // CREATE SAMPLE CONTACTS - CREDITPRENUERS
  // ==========================================

  console.log('👥 Creating sample contacts...');

  const cpStages = await prisma.pipelineStage.findMany({
    where: { pipelineId: cpPipeline.id },
    orderBy: { position: 'asc' }
  });

  await prisma.contact.createMany({
    data: [
      {
        businessId: creditprenuers.id,
        pipelineId: cpPipeline.id,
        stageId: cpStages[0].id,
        firstName: 'Marcus',
        lastName: 'Johnson',
        email: 'marcus.j@email.com',
        phone: '+15551001001',
        type: 'lead',
        source: 'website',
        tags: ['trucking', 'new-driver']
      },
      {
        businessId: creditprenuers.id,
        pipelineId: cpPipeline.id,
        stageId: cpStages[2].id,
        firstName: 'Keisha',
        lastName: 'Williams',
        email: 'keisha.w@email.com',
        phone: '+15551001002',
        type: 'client',
        source: 'referral',
        tags: ['business-credit', 'owner-operator']
      },
      {
        businessId: creditprenuers.id,
        pipelineId: cpPipeline.id,
        stageId: cpStages[5].id,
        firstName: 'Darnell',
        lastName: 'Brown',
        email: 'darnell.b@email.com',
        phone: '+15551001003',
        type: 'client',
        source: 'social',
        tags: ['fleet-owner', 'funding-ready']
      }
    ]
  });

  console.log('  ✅ Created 3 CreditPreneurs contacts');

  // ==========================================
  // CREATE SAMPLE CONTACTS - COYS LOGISTICS
  // ==========================================

  const clStages = await prisma.pipelineStage.findMany({
    where: { pipelineId: clPipeline.id },
    orderBy: { position: 'asc' }
  });

  await prisma.contact.createMany({
    data: [
      {
        businessId: coyslogistics.id,
        firstName: 'ABC',
        lastName: 'Freight',
        email: 'dispatch@abcfreight.com',
        phone: '+15552001001',
        company: 'ABC Freight Brokers',
        type: 'broker',
        source: 'load_board',
        tags: ['high-volume', 'good-payer']
      },
      {
        businessId: coyslogistics.id,
        firstName: 'Global',
        lastName: 'Shipper',
        email: 'logistics@globalship.com',
        phone: '+15552001002',
        company: 'Global Shipping Inc',
        type: 'shipper',
        source: 'referral',
        tags: ['direct-shipper', 'produce']
      },
      {
        businessId: coyslogistics.id,
        firstName: 'Regional',
        lastName: 'Carrier',
        email: 'ops@regionalcarrier.com',
        phone: '+15552001003',
        company: 'Regional Carrier LLC',
        type: 'carrier',
        source: 'website',
        tags: ['partner', 'reefer']
      }
    ]
  });

  console.log('  ✅ Created 3 Coys Logistics contacts');

  // ==========================================
  // CREATE SAMPLE TRUCKS - COYS LOGISTICS
  // ==========================================

  console.log('🚛 Creating sample trucks...');

  await prisma.truck.createMany({
    data: [
      {
        businessId: coyslogistics.id,
        unitNumber: 'TRUCK-001',
        vin: '1HGBH41JXMN109186',
        make: 'Freightliner',
        model: 'Cascadia',
        year: 2022,
        type: 'semi',
        gvwr: 80000,
        payloadCapacity: 45000,
        status: 'active',
        mileage: 125000,
        insuranceExpiry: new Date('2025-06-15'),
        registrationExpiry: new Date('2025-03-01'),
        inspectionExpiry: new Date('2025-01-15')
      },
      {
        businessId: coyslogistics.id,
        unitNumber: 'TRUCK-002',
        vin: '2HGBH41JXMN209287',
        make: 'Peterbilt',
        model: '579',
        year: 2021,
        type: 'semi',
        gvwr: 80000,
        payloadCapacity: 44000,
        status: 'active',
        mileage: 185000,
        insuranceExpiry: new Date('2025-07-20'),
        registrationExpiry: new Date('2025-04-15'),
        inspectionExpiry: new Date('2025-02-28')
      },
      {
        businessId: coyslogistics.id,
        unitNumber: 'TRUCK-003',
        vin: '3HGBH41JXMN309388',
        make: 'Kenworth',
        model: 'T680',
        year: 2023,
        type: 'reefer',
        gvwr: 80000,
        payloadCapacity: 43000,
        status: 'active',
        mileage: 45000,
        insuranceExpiry: new Date('2025-12-01'),
        registrationExpiry: new Date('2025-11-15'),
        inspectionExpiry: new Date('2025-06-30')
      }
    ]
  });

  console.log('  ✅ Created 3 trucks');

  // ==========================================
  // CREATE SAMPLE DRIVERS - COYS LOGISTICS
  // ==========================================

  console.log('👨‍✈️ Creating sample drivers...');

  await prisma.driver.createMany({
    data: [
      {
        businessId: coyslogistics.id,
        firstName: 'James',
        lastName: 'Washington',
        email: 'james.w@coyslogistics.com',
        phone: '+15553001001',
        cdlNumber: 'D1234567',
        cdlState: 'TX',
        cdlClass: 'A',
        cdlExpiry: new Date('2026-08-15'),
        employeeId: 'DRV-001',
        hireDate: new Date('2022-03-01'),
        status: 'active',
        payType: 'per_mile',
        payRate: 0.55,
        medicalCardExpiry: new Date('2025-09-30'),
        emergencyName: 'Mary Washington',
        emergencyPhone: '+15553001010'
      },
      {
        businessId: coyslogistics.id,
        firstName: 'Robert',
        lastName: 'Davis',
        email: 'robert.d@coyslogistics.com',
        phone: '+15553001002',
        cdlNumber: 'D2345678',
        cdlState: 'GA',
        cdlClass: 'A',
        cdlExpiry: new Date('2025-11-20'),
        employeeId: 'DRV-002',
        hireDate: new Date('2021-07-15'),
        status: 'active',
        payType: 'percentage',
        payRate: 28,
        medicalCardExpiry: new Date('2025-06-15'),
        emergencyName: 'Lisa Davis',
        emergencyPhone: '+15553001020'
      }
    ]
  });

  console.log('  ✅ Created 2 drivers');

  // ==========================================
  // CREATE SAMPLE AUTOMATIONS
  // ==========================================

  console.log('⚡ Creating sample automations...');

  // CreditPreneurs automation
  await prisma.automation.create({
    data: {
      businessId: creditprenuers.id,
      name: 'Welcome New Lead',
      description: 'Send welcome SMS when new lead is created',
      trigger: 'contact_created',
      conditions: [
        { field: 'type', operator: 'equals', value: 'lead' }
      ],
      actions: [
        {
          type: 'send_sms',
          config: {
            template: 'Hey {{firstName}}! 👋 Thanks for reaching out to CreditPreneurs. Ready to start your journey to financial freedom? Reply YES to schedule your free consultation with Shakur Mac!'
          }
        },
        {
          type: 'wait',
          config: { duration: 300 } // 5 minutes
        },
        {
          type: 'send_email',
          config: {
            subject: 'Your Credit Repair Journey Starts Here',
            template: 'welcome_lead'
          }
        }
      ],
      isActive: true
    }
  });

  // Coys Logistics automation
  await prisma.automation.create({
    data: {
      businessId: coyslogistics.id,
      name: 'Load Delivered Notification',
      description: 'Notify shipper when load is delivered',
      trigger: 'load_status_changed',
      conditions: [
        { field: 'status', operator: 'equals', value: 'delivered' }
      ],
      actions: [
        {
          type: 'send_sms',
          config: {
            to: '{{shipper.phone}}',
            template: '✅ Load #{{loadNumber}} has been delivered! POD will be sent shortly. Thank you for shipping with Coys Logistics!'
          }
        },
        {
          type: 'create_task',
          config: {
            title: 'Upload POD for Load #{{loadNumber}}',
            assignTo: 'dispatch',
            dueIn: 24 // hours
          }
        }
      ],
      isActive: true
    }
  });

  console.log('  ✅ Created 2 automations');

  // ==========================================
  // DONE
  // ==========================================

  console.log('');
  console.log('🎉 Database seeding completed!');
  console.log('');
  console.log('📋 Summary:');
  console.log('   - 2 Businesses');
  console.log('   - 2 Admin Users');
  console.log('   - 2 Pipelines with stages');
  console.log('   - 6 Sample contacts');
  console.log('   - 3 Trucks');
  console.log('   - 2 Drivers');
  console.log('   - 2 Automations');
  console.log('');
  console.log('🔐 Default login credentials:');
  console.log('   CreditPreneurs: admin@creditprenuers.com / Admin123!');
  console.log('   Coys Logistics: admin@coyslogistics.com / Admin123!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
