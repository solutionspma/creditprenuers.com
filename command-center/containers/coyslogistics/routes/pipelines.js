/**
 * COYS LOGISTICS - PIPELINES ROUTES
 */
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const BUSINESS_ID = 'coyslogistics';

router.get('/', authenticate, async (req, res) => {
  try {
    const pipelines = await prisma.pipeline.findMany({
      where: { business_id: BUSINESS_ID, is_active: true },
      orderBy: { order_index: 'asc' },
    });
    res.json(pipelines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pipelines' });
  }
});

router.get('/loads', authenticate, async (req, res) => {
  try {
    const loadsByStage = await prisma.load.groupBy({
      by: ['status'],
      where: { business_id: BUSINESS_ID },
      _count: { id: true },
    });
    res.json(loadsByStage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch load pipeline' });
  }
});

router.get('/drivers', authenticate, async (req, res) => {
  try {
    const driversByStage = await prisma.driver.groupBy({
      by: ['status'],
      where: { business_id: BUSINESS_ID },
      _count: { id: true },
    });
    res.json(driversByStage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch driver pipeline' });
  }
});

module.exports = router;
