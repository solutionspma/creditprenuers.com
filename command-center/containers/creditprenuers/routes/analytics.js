/**
 * ══════════════════════════════════════════════════════════════
 * CREDTEGY - ANALYTICS ROUTES
 * Dashboard Analytics & Reporting
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const BUSINESS_ID = 'credtegy';

router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    const [
      totalContacts,
      newContactsThisMonth,
      totalFunded,
      activeMembers,
      ebookSales,
      pipelineStats,
    ] = await Promise.all([
      prisma.contact.count({ where: { business_id: BUSINESS_ID } }),
      prisma.contact.count({
        where: { business_id: BUSINESS_ID, created_at: { gte: thisMonth } },
      }),
      prisma.funding_record.aggregate({
        where: { business_id: BUSINESS_ID, status: 'funded' },
        _sum: { amount: true },
      }),
      prisma.subscription.count({
        where: { business_id: BUSINESS_ID, status: 'active' },
      }),
      prisma.invoice.count({
        where: { business_id: BUSINESS_ID, product_id: 'ebook_trucking_27', status: 'paid' },
      }),
      prisma.contact.groupBy({
        by: ['pipeline_stage'],
        where: { business_id: BUSINESS_ID },
        _count: { id: true },
      }),
    ]);

    res.json({
      overview: {
        totalContacts,
        newContactsThisMonth,
        totalFunded: totalFunded._sum.amount || 0,
        activeMembers,
        ebookSales,
      },
      pipelineStats,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

router.get('/revenue', authenticate, async (req, res) => {
  try {
    const { period = '12m' } = req.query;
    
    const revenue = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        SUM(amount) as total,
        COUNT(*) as transactions
      FROM invoices
      WHERE business_id = ${BUSINESS_ID}
        AND status = 'paid'
        AND created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month DESC
    `;
    
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch revenue data' });
  }
});

router.get('/funnel', authenticate, async (req, res) => {
  try {
    const stages = ['new_lead', 'contacted', 'qualified', 'ebook_purchased', 'mentorship_active', 'funding_ready', 'funded'];
    
    const counts = await Promise.all(
      stages.map(stage =>
        prisma.contact.count({
          where: { business_id: BUSINESS_ID, pipeline_stage: stage },
        })
      )
    );
    
    const funnel = stages.map((stage, i) => ({
      stage,
      count: counts[i],
      conversionRate: i > 0 && counts[i - 1] > 0
        ? ((counts[i] / counts[i - 1]) * 100).toFixed(1)
        : null,
    }));
    
    res.json(funnel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch funnel data' });
  }
});

module.exports = router;
