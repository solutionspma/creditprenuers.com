/**
 * ══════════════════════════════════════════════════════════════
 * LOGADEMY - DRIVERS MANAGEMENT ROUTES
 * Driver Profiles, Compliance & Onboarding
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../../../shared/middleware/auth');
const logger = require('../../../shared/utils/logger');

const prisma = new PrismaClient();
const BUSINESS_ID = 'logademy';

// ─────────────────────────────────────────────────────────────
// GET /api/logademy/drivers - List all drivers
// ─────────────────────────────────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, search } = req.query;

    const drivers = await prisma.driver.findMany({
      where: {
        business_id: BUSINESS_ID,
        ...(status && { status }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search } },
            { cdl_number: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        current_truck: { select: { id: true, truck_number: true } },
        _count: { select: { loads: true } },
      },
      orderBy: { name: 'asc' },
    });

    res.json(drivers);
  } catch (error) {
    logger.error('Error fetching drivers:', error);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/logademy/drivers/:id - Get single driver
// ─────────────────────────────────────────────────────────────
router.get('/:id', authenticate, async (req, res) => {
  try {
    const driver = await prisma.driver.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
      include: {
        current_truck: true,
        documents: { orderBy: { created_at: 'desc' } },
        loads: { orderBy: { created_at: 'desc' }, take: 20 },
        compliance_checks: { orderBy: { check_date: 'desc' }, take: 10 },
      },
    });

    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    logger.error('Error fetching driver:', error);
    res.status(500).json({ error: 'Failed to fetch driver' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/logademy/drivers - Add new driver
// ─────────────────────────────────────────────────────────────
router.post('/', authenticate, authorize(['owner', 'admin']), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      date_of_birth,
      cdl_number,
      cdl_state,
      cdl_class,
      cdl_expiry,
      medical_card_expiry,
      hire_date,
      pay_type,
      pay_rate,
      emergency_contact_name,
      emergency_contact_phone,
    } = req.body;

    const driver = await prisma.driver.create({
      data: {
        business_id: BUSINESS_ID,
        name,
        email,
        phone,
        address,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
        cdl_number,
        cdl_state,
        cdl_class: cdl_class || 'A',
        cdl_expiry: cdl_expiry ? new Date(cdl_expiry) : null,
        medical_card_expiry: medical_card_expiry ? new Date(medical_card_expiry) : null,
        hire_date: hire_date ? new Date(hire_date) : new Date(),
        pay_type: pay_type || 'per_mile',
        pay_rate,
        emergency_contact_name,
        emergency_contact_phone,
        status: 'applicant',
        created_by: req.user.id,
      },
    });

    logger.info(`Driver added: ${driver.name}`, { businessId: BUSINESS_ID });
    res.status(201).json(driver);
  } catch (error) {
    logger.error('Error adding driver:', error);
    res.status(500).json({ error: 'Failed to add driver' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/logademy/drivers/:id - Update driver
// ─────────────────────────────────────────────────────────────
router.put('/:id', authenticate, async (req, res) => {
  try {
    const driver = await prisma.driver.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
    });

    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    const updated = await prisma.driver.update({
      where: { id: driver.id },
      data: { ...req.body, updated_at: new Date() },
    });

    res.json(updated);
  } catch (error) {
    logger.error('Error updating driver:', error);
    res.status(500).json({ error: 'Failed to update driver' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/logademy/drivers/:id/status - Update driver status
// ─────────────────────────────────────────────────────────────
router.put('/:id/status', authenticate, authorize(['owner', 'admin']), async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['applicant', 'documents_pending', 'background_check', 'training', 'active', 'inactive'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const driver = await prisma.driver.update({
      where: { id: parseInt(req.params.id) },
      data: { status, status_notes: notes, updated_at: new Date() },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        business_id: BUSINESS_ID,
        entity_type: 'driver',
        entity_id: driver.id,
        type: 'status_changed',
        description: `Driver ${driver.name} status changed to ${status}`,
        user_id: req.user.id,
      },
    });

    res.json(driver);
  } catch (error) {
    logger.error('Error updating driver status:', error);
    res.status(500).json({ error: 'Failed to update driver status' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/logademy/drivers/:id/compliance - Compliance status
// ─────────────────────────────────────────────────────────────
router.get('/:id/compliance', authenticate, async (req, res) => {
  try {
    const driver = await prisma.driver.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
      include: { documents: true },
    });

    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    const requiredDocs = [
      'cdl_license', 'medical_certificate', 'mvr_report', 
      'drug_test', 'background_check', 'driver_contract'
    ];

    const uploadedDocs = driver.documents.map(d => d.doc_type);
    const missingDocs = requiredDocs.filter(d => !uploadedDocs.includes(d));

    const today = new Date();
    const expiringDocs = [];

    if (driver.cdl_expiry && driver.cdl_expiry <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)) {
      expiringDocs.push({ type: 'cdl_license', expiry: driver.cdl_expiry });
    }
    if (driver.medical_card_expiry && driver.medical_card_expiry <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)) {
      expiringDocs.push({ type: 'medical_certificate', expiry: driver.medical_card_expiry });
    }

    res.json({
      driverId: driver.id,
      driverName: driver.name,
      isCompliant: missingDocs.length === 0 && expiringDocs.length === 0,
      missingDocuments: missingDocs,
      expiringDocuments: expiringDocs,
      documents: driver.documents,
    });
  } catch (error) {
    logger.error('Error fetching compliance:', error);
    res.status(500).json({ error: 'Failed to fetch compliance status' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/logademy/drivers/:id/stats - Driver performance
// ─────────────────────────────────────────────────────────────
router.get('/:id/stats', authenticate, async (req, res) => {
  try {
    const driverId = parseInt(req.params.id);
    const thisMonth = new Date(new Date().setDate(1));

    const [totalLoads, thisMonthLoads, revenue, avgLoadValue] = await Promise.all([
      prisma.load.count({
        where: { driver_id: driverId, status: 'delivered' },
      }),
      prisma.load.count({
        where: { driver_id: driverId, status: 'delivered', created_at: { gte: thisMonth } },
      }),
      prisma.load.aggregate({
        where: { driver_id: driverId, status: { in: ['delivered', 'invoiced', 'paid'] } },
        _sum: { rate: true },
      }),
      prisma.load.aggregate({
        where: { driver_id: driverId, status: 'delivered' },
        _avg: { rate: true },
      }),
    ]);

    res.json({
      totalLoads,
      thisMonthLoads,
      totalRevenue: revenue._sum.rate || 0,
      avgLoadValue: avgLoadValue._avg.rate || 0,
    });
  } catch (error) {
    logger.error('Error fetching driver stats:', error);
    res.status(500).json({ error: 'Failed to fetch driver stats' });
  }
});

module.exports = router;
