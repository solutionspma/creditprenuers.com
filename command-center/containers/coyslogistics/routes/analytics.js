/**
 * COYS LOGISTICS - ANALYTICS ROUTES
 */
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const BUSINESS_ID = 'coyslogistics';

router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      totalTrucks,
      activeTrucks,
      totalDrivers,
      activeDrivers,
      totalLoads,
      deliveredThisMonth,
      revenueThisMonth,
      pendingInvoices,
    ] = await Promise.all([
      prisma.truck.count({ where: { business_id: BUSINESS_ID } }),
      prisma.truck.count({ where: { business_id: BUSINESS_ID, status: 'on_load' } }),
      prisma.driver.count({ where: { business_id: BUSINESS_ID } }),
      prisma.driver.count({ where: { business_id: BUSINESS_ID, status: 'active' } }),
      prisma.load.count({ where: { business_id: BUSINESS_ID } }),
      prisma.load.count({
        where: { business_id: BUSINESS_ID, status: 'delivered', actual_delivery_date: { gte: thisMonth } },
      }),
      prisma.invoice.aggregate({
        where: { business_id: BUSINESS_ID, status: 'paid', paid_date: { gte: thisMonth } },
        _sum: { amount: true },
      }),
      prisma.invoice.aggregate({
        where: { business_id: BUSINESS_ID, status: 'pending' },
        _sum: { amount: true },
      }),
    ]);

    res.json({
      fleet: { total: totalTrucks, active: activeTrucks, utilization: totalTrucks ? ((activeTrucks / totalTrucks) * 100).toFixed(1) : 0 },
      drivers: { total: totalDrivers, active: activeDrivers },
      loads: { total: totalLoads, deliveredThisMonth },
      revenue: { thisMonth: revenueThisMonth._sum.amount || 0, pending: pendingInvoices._sum.amount || 0 },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
});

router.get('/revenue', authenticate, async (req, res) => {
  try {
    const revenue = await prisma.$queryRaw`
      SELECT DATE_TRUNC('month', paid_date) as month, SUM(amount) as total, COUNT(*) as invoices
      FROM invoices WHERE business_id = ${BUSINESS_ID} AND status = 'paid' AND paid_date >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', paid_date) ORDER BY month DESC
    `;
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch revenue' });
  }
});

router.get('/compliance', authenticate, async (req, res) => {
  try {
    const thirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    
    const [expiringCDL, expiringMedical, expiringRegistration, expiringInsurance] = await Promise.all([
      prisma.driver.count({ where: { business_id: BUSINESS_ID, cdl_expiry: { lte: thirtyDays } } }),
      prisma.driver.count({ where: { business_id: BUSINESS_ID, medical_card_expiry: { lte: thirtyDays } } }),
      prisma.truck.count({ where: { business_id: BUSINESS_ID, registration_expiry: { lte: thirtyDays } } }),
      prisma.truck.count({ where: { business_id: BUSINESS_ID, insurance_expiry: { lte: thirtyDays } } }),
    ]);

    res.json({
      alerts: expiringCDL + expiringMedical + expiringRegistration + expiringInsurance,
      drivers: { expiringCDL, expiringMedical },
      trucks: { expiringRegistration, expiringInsurance },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch compliance' });
  }
});

module.exports = router;
