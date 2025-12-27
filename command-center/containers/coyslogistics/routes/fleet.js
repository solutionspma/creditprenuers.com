/**
 * ══════════════════════════════════════════════════════════════
 * LOGADEMY - FLEET MANAGEMENT ROUTES
 * Truck & Vehicle Management System
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
// GET /api/logademy/fleet - List all trucks
// ─────────────────────────────────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, search } = req.query;
    
    const trucks = await prisma.truck.findMany({
      where: {
        business_id: BUSINESS_ID,
        ...(status && { status }),
        ...(search && {
          OR: [
            { truck_number: { contains: search, mode: 'insensitive' } },
            { vin: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        current_driver: { select: { id: true, name: true, phone: true } },
        current_load: { select: { id: true, pickup_location: true, delivery_location: true } },
      },
      orderBy: { truck_number: 'asc' },
    });
    
    res.json(trucks);
  } catch (error) {
    logger.error('Error fetching fleet:', error);
    res.status(500).json({ error: 'Failed to fetch fleet' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/logademy/fleet/:id - Get single truck
// ─────────────────────────────────────────────────────────────
router.get('/:id', authenticate, async (req, res) => {
  try {
    const truck = await prisma.truck.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
      include: {
        current_driver: true,
        current_load: true,
        maintenance_logs: { orderBy: { date: 'desc' }, take: 10 },
        documents: { orderBy: { created_at: 'desc' } },
        gps_events: { orderBy: { timestamp: 'desc' }, take: 50 },
      },
    });
    
    if (!truck) return res.status(404).json({ error: 'Truck not found' });
    res.json(truck);
  } catch (error) {
    logger.error('Error fetching truck:', error);
    res.status(500).json({ error: 'Failed to fetch truck' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/logademy/fleet - Add new truck
// ─────────────────────────────────────────────────────────────
router.post('/', authenticate, authorize(['owner', 'admin']), async (req, res) => {
  try {
    const {
      truck_number,
      vin,
      make,
      model,
      year,
      truck_type,
      registration_state,
      registration_expiry,
      insurance_policy,
      insurance_expiry,
      gps_device_id,
    } = req.body;

    const truck = await prisma.truck.create({
      data: {
        business_id: BUSINESS_ID,
        truck_number,
        vin,
        make,
        model,
        year,
        truck_type: truck_type || '26ft_box',
        registration_state,
        registration_expiry: registration_expiry ? new Date(registration_expiry) : null,
        insurance_policy,
        insurance_expiry: insurance_expiry ? new Date(insurance_expiry) : null,
        gps_device_id,
        status: 'available',
        created_by: req.user.id,
      },
    });

    logger.info(`Truck added: ${truck.truck_number}`, { businessId: BUSINESS_ID });
    res.status(201).json(truck);
  } catch (error) {
    logger.error('Error adding truck:', error);
    res.status(500).json({ error: 'Failed to add truck' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/logademy/fleet/:id - Update truck
// ─────────────────────────────────────────────────────────────
router.put('/:id', authenticate, async (req, res) => {
  try {
    const truck = await prisma.truck.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
    });
    
    if (!truck) return res.status(404).json({ error: 'Truck not found' });

    const updated = await prisma.truck.update({
      where: { id: truck.id },
      data: { ...req.body, updated_at: new Date() },
    });

    res.json(updated);
  } catch (error) {
    logger.error('Error updating truck:', error);
    res.status(500).json({ error: 'Failed to update truck' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/logademy/fleet/:id/status - Update truck status
// ─────────────────────────────────────────────────────────────
router.put('/:id/status', authenticate, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['available', 'on_load', 'maintenance', 'out_of_service', 'reserved'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const truck = await prisma.truck.update({
      where: { id: parseInt(req.params.id) },
      data: { status, status_notes: notes, updated_at: new Date() },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        business_id: BUSINESS_ID,
        entity_type: 'truck',
        entity_id: truck.id,
        type: 'status_changed',
        description: `Truck ${truck.truck_number} status changed to ${status}`,
        user_id: req.user.id,
      },
    });

    res.json(truck);
  } catch (error) {
    logger.error('Error updating truck status:', error);
    res.status(500).json({ error: 'Failed to update truck status' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/logademy/fleet/:id/maintenance - Log maintenance
// ─────────────────────────────────────────────────────────────
router.post('/:id/maintenance', authenticate, async (req, res) => {
  try {
    const {
      maintenance_type,
      description,
      cost,
      odometer,
      vendor,
      date,
      next_due_date,
      next_due_miles,
    } = req.body;

    const log = await prisma.maintenance_log.create({
      data: {
        truck_id: parseInt(req.params.id),
        business_id: BUSINESS_ID,
        maintenance_type,
        description,
        cost,
        odometer,
        vendor,
        date: date ? new Date(date) : new Date(),
        next_due_date: next_due_date ? new Date(next_due_date) : null,
        next_due_miles,
        logged_by: req.user.id,
      },
    });

    res.status(201).json(log);
  } catch (error) {
    logger.error('Error logging maintenance:', error);
    res.status(500).json({ error: 'Failed to log maintenance' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/logademy/fleet/dashboard - Fleet dashboard
// ─────────────────────────────────────────────────────────────
router.get('/stats/dashboard', authenticate, async (req, res) => {
  try {
    const [
      totalTrucks,
      byStatus,
      expiringDocs,
      maintenanceDue,
    ] = await Promise.all([
      prisma.truck.count({ where: { business_id: BUSINESS_ID } }),
      
      prisma.truck.groupBy({
        by: ['status'],
        where: { business_id: BUSINESS_ID },
        _count: { id: true },
      }),
      
      // Documents expiring in 30 days
      prisma.truck.count({
        where: {
          business_id: BUSINESS_ID,
          OR: [
            { registration_expiry: { lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } },
            { insurance_expiry: { lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } },
          ],
        },
      }),
      
      // Maintenance due
      prisma.maintenance_log.count({
        where: {
          business_id: BUSINESS_ID,
          next_due_date: { lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    res.json({
      totalTrucks,
      byStatus: byStatus.reduce((acc, s) => ({ ...acc, [s.status]: s._count.id }), {}),
      expiringDocs,
      maintenanceDue,
    });
  } catch (error) {
    logger.error('Error fetching fleet dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch fleet dashboard' });
  }
});

module.exports = router;
