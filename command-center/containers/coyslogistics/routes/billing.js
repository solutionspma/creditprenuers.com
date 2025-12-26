/**
 * COYS LOGISTICS - BILLING ROUTES
 */
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const Stripe = require('stripe');
const { authenticate } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const BUSINESS_ID = 'coyslogistics';

router.get('/invoices', authenticate, async (req, res) => {
  try {
    const { status, load_id } = req.query;
    const invoices = await prisma.invoice.findMany({
      where: { 
        business_id: BUSINESS_ID,
        ...(status && { status }),
        ...(load_id && { load_id: parseInt(load_id) }),
      },
      include: { load: { select: { reference_number: true } } },
      orderBy: { created_at: 'desc' },
    });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

router.post('/invoices', authenticate, async (req, res) => {
  try {
    const { load_id, contact_id, amount, due_date, notes } = req.body;
    
    const load = await prisma.load.findUnique({ where: { id: load_id } });
    
    const invoice = await prisma.invoice.create({
      data: {
        business_id: BUSINESS_ID,
        load_id,
        contact_id,
        invoice_number: `INV-${Date.now()}`,
        amount: amount || load?.rate || 0,
        due_date: due_date ? new Date(due_date) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'pending',
        notes,
        created_by: req.user.id,
      },
    });

    // Update load status
    if (load_id) {
      await prisma.load.update({
        where: { id: load_id },
        data: { status: 'invoiced' },
      });
    }

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

router.put('/invoices/:id/status', authenticate, async (req, res) => {
  try {
    const { status, payment_date, payment_method, notes } = req.body;
    
    const invoice = await prisma.invoice.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status,
        ...(status === 'paid' && { 
          paid_date: payment_date ? new Date(payment_date) : new Date(),
          payment_method,
        }),
        notes,
      },
    });

    // Update load status if paid
    if (status === 'paid' && invoice.load_id) {
      await prisma.load.update({
        where: { id: invoice.load_id },
        data: { status: 'paid' },
      });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});

router.get('/stats', authenticate, async (req, res) => {
  try {
    const thisMonth = new Date(new Date().setDate(1));
    
    const [totalRevenue, monthlyRevenue, pendingInvoices, overdueInvoices] = await Promise.all([
      prisma.invoice.aggregate({
        where: { business_id: BUSINESS_ID, status: 'paid' },
        _sum: { amount: true },
      }),
      prisma.invoice.aggregate({
        where: { business_id: BUSINESS_ID, status: 'paid', paid_date: { gte: thisMonth } },
        _sum: { amount: true },
      }),
      prisma.invoice.aggregate({
        where: { business_id: BUSINESS_ID, status: 'pending' },
        _sum: { amount: true },
        _count: { id: true },
      }),
      prisma.invoice.aggregate({
        where: { business_id: BUSINESS_ID, status: 'pending', due_date: { lt: new Date() } },
        _sum: { amount: true },
        _count: { id: true },
      }),
    ]);

    res.json({
      totalRevenue: totalRevenue._sum.amount || 0,
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
      pendingAmount: pendingInvoices._sum.amount || 0,
      pendingCount: pendingInvoices._count.id || 0,
      overdueAmount: overdueInvoices._sum.amount || 0,
      overdueCount: overdueInvoices._count.id || 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch billing stats' });
  }
});

module.exports = router;
