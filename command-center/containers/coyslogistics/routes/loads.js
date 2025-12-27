/**
 * ══════════════════════════════════════════════════════════════
 * LOGADEMY - LOADS MANAGEMENT ROUTES
 * Load/Shipment Tracking System
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../../../shared/middleware/auth');
const logger = require('../../../shared/utils/logger');
const TelnyxService = require('../../../shared/services/TelnyxService');

const prisma = new PrismaClient();
const BUSINESS_ID = 'logademy';

// ─────────────────────────────────────────────────────────────
// GET /api/logademy/loads - List all loads
// ─────────────────────────────────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, driver_id, date_from, date_to, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      business_id: BUSINESS_ID,
      ...(status && { status }),
      ...(driver_id && { driver_id: parseInt(driver_id) }),
      ...(date_from && { pickup_date: { gte: new Date(date_from) } }),
      ...(date_to && { delivery_date: { lte: new Date(date_to) } }),
    };

    const [loads, total] = await Promise.all([
      prisma.load.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' },
        include: {
          driver: { select: { id: true, name: true, phone: true } },
          truck: { select: { id: true, truck_number: true } },
          shipper: { select: { id: true, name: true } },
        },
      }),
      prisma.load.count({ where }),
    ]);

    res.json({
      data: loads,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (error) {
    logger.error('Error fetching loads:', error);
    res.status(500).json({ error: 'Failed to fetch loads' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/logademy/loads/:id - Get single load
// ─────────────────────────────────────────────────────────────
router.get('/:id', authenticate, async (req, res) => {
  try {
    const load = await prisma.load.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
      include: {
        driver: true,
        truck: true,
        shipper: true,
        consignee: true,
        bill_of_lading: true,
        status_updates: { orderBy: { timestamp: 'desc' } },
        documents: true,
      },
    });

    if (!load) return res.status(404).json({ error: 'Load not found' });
    res.json(load);
  } catch (error) {
    logger.error('Error fetching load:', error);
    res.status(500).json({ error: 'Failed to fetch load' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/logademy/loads - Create new load
// ─────────────────────────────────────────────────────────────
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      reference_number,
      shipper_id,
      consignee_id,
      pickup_location,
      pickup_date,
      pickup_time,
      delivery_location,
      delivery_date,
      delivery_time,
      commodity,
      weight,
      pieces,
      rate,
      rate_type,
      notes,
    } = req.body;

    const load = await prisma.load.create({
      data: {
        business_id: BUSINESS_ID,
        reference_number: reference_number || `LD-${Date.now()}`,
        shipper_id,
        consignee_id,
        pickup_location,
        pickup_date: new Date(pickup_date),
        pickup_time,
        delivery_location,
        delivery_date: new Date(delivery_date),
        delivery_time,
        commodity,
        weight,
        pieces,
        rate,
        rate_type: rate_type || 'flat',
        notes,
        status: 'new_load',
        created_by: req.user.id,
      },
    });

    // Log status
    await prisma.load_status_update.create({
      data: {
        load_id: load.id,
        status: 'new_load',
        notes: 'Load created',
        updated_by: req.user.id,
      },
    });

    logger.info(`Load created: ${load.reference_number}`, { businessId: BUSINESS_ID });
    res.status(201).json(load);
  } catch (error) {
    logger.error('Error creating load:', error);
    res.status(500).json({ error: 'Failed to create load' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/logademy/loads/:id/assign - Assign driver/truck
// ─────────────────────────────────────────────────────────────
router.put('/:id/assign', authenticate, async (req, res) => {
  try {
    const { driver_id, truck_id } = req.body;

    const load = await prisma.load.update({
      where: { id: parseInt(req.params.id) },
      data: {
        driver_id,
        truck_id,
        status: 'assigned',
        updated_at: new Date(),
      },
      include: { driver: true, truck: true },
    });

    // Update truck status
    if (truck_id) {
      await prisma.truck.update({
        where: { id: truck_id },
        data: { status: 'on_load', current_load_id: load.id },
      });
    }

    // Log status
    await prisma.load_status_update.create({
      data: {
        load_id: load.id,
        status: 'assigned',
        notes: `Assigned to driver: ${load.driver?.name}, truck: ${load.truck?.truck_number}`,
        updated_by: req.user.id,
      },
    });

    // Send SMS to driver
    if (load.driver?.phone) {
      await TelnyxService.sendSMS(load.driver.phone, 
        `New load assigned: ${load.reference_number}\nPickup: ${load.pickup_location}\nDelivery: ${load.delivery_location}\nDate: ${load.pickup_date.toLocaleDateString()}`
      );
    }

    res.json(load);
  } catch (error) {
    logger.error('Error assigning load:', error);
    res.status(500).json({ error: 'Failed to assign load' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/logademy/loads/:id/status - Update load status
// ─────────────────────────────────────────────────────────────
router.put('/:id/status', authenticate, async (req, res) => {
  try {
    const { status, notes, location, timestamp } = req.body;

    const validStatuses = [
      'new_load', 'assigned', 'en_route_pickup', 'at_pickup', 
      'loaded', 'in_transit', 'at_delivery', 'delivered', 'invoiced', 'paid'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const load = await prisma.load.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status,
        ...(status === 'delivered' && { actual_delivery_date: new Date() }),
        updated_at: new Date(),
      },
      include: { driver: true, truck: true, shipper: true },
    });

    // Log status update
    await prisma.load_status_update.create({
      data: {
        load_id: load.id,
        status,
        notes,
        location,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        updated_by: req.user.id,
      },
    });

    // Handle delivery completion
    if (status === 'delivered') {
      // Update truck status
      if (load.truck_id) {
        await prisma.truck.update({
          where: { id: load.truck_id },
          data: { status: 'available', current_load_id: null },
        });
      }
    }

    res.json(load);
  } catch (error) {
    logger.error('Error updating load status:', error);
    res.status(500).json({ error: 'Failed to update load status' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/logademy/loads/:id/bol - Generate Bill of Lading
// ─────────────────────────────────────────────────────────────
router.post('/:id/bol', authenticate, async (req, res) => {
  try {
    const load = await prisma.load.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
      include: { shipper: true, consignee: true, driver: true },
    });

    if (!load) return res.status(404).json({ error: 'Load not found' });

    const bol = await prisma.bill_of_lading.create({
      data: {
        load_id: load.id,
        business_id: BUSINESS_ID,
        bol_number: `BOL-${load.reference_number}`,
        shipper_name: load.shipper?.name || req.body.shipper_name,
        shipper_address: req.body.shipper_address,
        consignee_name: load.consignee?.name || req.body.consignee_name,
        consignee_address: req.body.consignee_address,
        origin: load.pickup_location,
        destination: load.delivery_location,
        commodity: load.commodity,
        weight: load.weight,
        pieces: load.pieces,
        special_instructions: req.body.special_instructions,
        freight_charges: load.rate,
        created_by: req.user.id,
      },
    });

    res.status(201).json(bol);
  } catch (error) {
    logger.error('Error generating BOL:', error);
    res.status(500).json({ error: 'Failed to generate BOL' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/logademy/loads/dashboard - Loads dashboard
// ─────────────────────────────────────────────────────────────
router.get('/stats/dashboard', authenticate, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalLoads,
      activeLoads,
      todayPickups,
      todayDeliveries,
      byStatus,
      revenueThisMonth,
    ] = await Promise.all([
      prisma.load.count({ where: { business_id: BUSINESS_ID } }),
      prisma.load.count({
        where: {
          business_id: BUSINESS_ID,
          status: { in: ['assigned', 'en_route_pickup', 'at_pickup', 'loaded', 'in_transit', 'at_delivery'] },
        },
      }),
      prisma.load.count({
        where: { business_id: BUSINESS_ID, pickup_date: { gte: today } },
      }),
      prisma.load.count({
        where: { business_id: BUSINESS_ID, delivery_date: { gte: today } },
      }),
      prisma.load.groupBy({
        by: ['status'],
        where: { business_id: BUSINESS_ID },
        _count: { id: true },
      }),
      prisma.load.aggregate({
        where: {
          business_id: BUSINESS_ID,
          status: { in: ['delivered', 'invoiced', 'paid'] },
          created_at: { gte: new Date(today.getFullYear(), today.getMonth(), 1) },
        },
        _sum: { rate: true },
      }),
    ]);

    res.json({
      totalLoads,
      activeLoads,
      todayPickups,
      todayDeliveries,
      byStatus: byStatus.reduce((acc, s) => ({ ...acc, [s.status]: s._count.id }), {}),
      revenueThisMonth: revenueThisMonth._sum.rate || 0,
    });
  } catch (error) {
    logger.error('Error fetching loads dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch loads dashboard' });
  }
});

module.exports = router;
