/**
 * COYS LOGISTICS - AUTOMATION ROUTES
 */
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const BUSINESS_ID = 'coyslogistics';

router.get('/', authenticate, async (req, res) => {
  try {
    const automations = await prisma.automation.findMany({
      where: { business_id: BUSINESS_ID },
      orderBy: { created_at: 'desc' },
    });
    res.json(automations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch automations' });
  }
});

router.post('/', authenticate, authorize(['owner', 'admin']), async (req, res) => {
  try {
    const automation = await prisma.automation.create({
      data: { business_id: BUSINESS_ID, ...req.body, created_by: req.user.id },
    });
    res.status(201).json(automation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create automation' });
  }
});

router.put('/:id/toggle', authenticate, authorize(['owner', 'admin']), async (req, res) => {
  try {
    const automation = await prisma.automation.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
    });
    if (!automation) return res.status(404).json({ error: 'Automation not found' });
    
    const updated = await prisma.automation.update({
      where: { id: automation.id },
      data: { is_active: !automation.is_active },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle automation' });
  }
});

module.exports = router;
