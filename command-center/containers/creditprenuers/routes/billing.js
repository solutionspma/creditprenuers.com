/**
 * ══════════════════════════════════════════════════════════════
 * CREDITPRENUERS - BILLING ROUTES
 * Stripe Integration for eBook, Mentorship, Consultations
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const Stripe = require('stripe');
const { authenticate } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const BUSINESS_ID = 'creditprenuers';

// ─────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────
router.get('/products', authenticate, async (req, res) => {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });
    
    // Filter by business metadata
    const businessProducts = products.data.filter(
      p => p.metadata?.business_id === BUSINESS_ID
    );
    
    res.json(businessProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ─────────────────────────────────────────────────────────────
// CHECKOUT SESSIONS
// ─────────────────────────────────────────────────────────────
router.post('/checkout', async (req, res) => {
  try {
    const { product_id, customer_email, success_url, cancel_url, metadata } = req.body;
    
    const config = require('../config.json');
    const product = config.products[product_id];
    
    if (!product) {
      return res.status(400).json({ error: 'Invalid product' });
    }

    const sessionParams = {
      mode: product.type === 'recurring' ? 'subscription' : 'payment',
      customer_email,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            metadata: { business_id: BUSINESS_ID, product_id },
          },
          unit_amount: product.price,
          ...(product.type === 'recurring' && {
            recurring: { interval: product.interval },
          }),
        },
        quantity: 1,
      }],
      success_url: success_url || `${config.urls.frontend}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${config.urls.frontend}/checkout-cancelled`,
      metadata: {
        business_id: BUSINESS_ID,
        product_id,
        ...metadata,
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);
    res.json({ url: session.url, session_id: session.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// ─────────────────────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────────────────────
router.get('/subscriptions', authenticate, async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { business_id: BUSINESS_ID },
      include: { contact: { select: { id: true, name: true, email: true } } },
      orderBy: { created_at: 'desc' },
    });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

router.post('/subscriptions/:id/cancel', authenticate, async (req, res) => {
  try {
    const sub = await prisma.subscription.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
    });
    
    if (!sub) return res.status(404).json({ error: 'Subscription not found' });
    
    await stripe.subscriptions.cancel(sub.stripe_subscription_id);
    
    const updated = await prisma.subscription.update({
      where: { id: sub.id },
      data: { status: 'cancelled', cancelled_at: new Date() },
    });
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// ─────────────────────────────────────────────────────────────
// INVOICES
// ─────────────────────────────────────────────────────────────
router.get('/invoices', authenticate, async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { business_id: BUSINESS_ID },
      include: { contact: { select: { id: true, name: true } } },
      orderBy: { created_at: 'desc' },
      take: 100,
    });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// ─────────────────────────────────────────────────────────────
// REVENUE STATS
// ─────────────────────────────────────────────────────────────
router.get('/stats', authenticate, async (req, res) => {
  try {
    const [totalRevenue, monthlyRevenue, activeSubscriptions, recentSales] = await Promise.all([
      prisma.invoice.aggregate({
        where: { business_id: BUSINESS_ID, status: 'paid' },
        _sum: { amount: true },
      }),
      prisma.invoice.aggregate({
        where: {
          business_id: BUSINESS_ID,
          status: 'paid',
          created_at: { gte: new Date(new Date().setDate(1)) },
        },
        _sum: { amount: true },
      }),
      prisma.subscription.count({
        where: { business_id: BUSINESS_ID, status: 'active' },
      }),
      prisma.invoice.findMany({
        where: { business_id: BUSINESS_ID, status: 'paid' },
        orderBy: { created_at: 'desc' },
        take: 10,
        include: { contact: { select: { name: true } } },
      }),
    ]);

    res.json({
      totalRevenue: totalRevenue._sum.amount || 0,
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
      activeSubscriptions,
      recentSales,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch billing stats' });
  }
});

module.exports = router;
