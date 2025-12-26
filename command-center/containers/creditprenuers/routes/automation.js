/**
 * ══════════════════════════════════════════════════════════════
 * CREDITPRENUERS - AUTOMATION ROUTES
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../../../shared/middleware/auth');
const AutomationEngine = require('../../../shared/services/AutomationEngine');

const prisma = new PrismaClient();
const BUSINESS_ID = 'creditprenuers';

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
    const { name, trigger, conditions, actions, is_active } = req.body;
    
    const automation = await prisma.automation.create({
      data: {
        business_id: BUSINESS_ID,
        name,
        trigger,
        conditions,
        actions,
        is_active: is_active ?? true,
        created_by: req.user.id,
      },
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

router.post('/:id/trigger', authenticate, async (req, res) => {
  try {
    const { contact_id, data } = req.body;
    
    const automation = await prisma.automation.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID, is_active: true },
    });
    
    if (!automation) return res.status(404).json({ error: 'Automation not found or inactive' });
    
    const result = await AutomationEngine.execute(automation, { contact_id, data, businessId: BUSINESS_ID });
    
    await prisma.automation_log.create({
      data: {
        automation_id: automation.id,
        contact_id,
        status: result.success ? 'success' : 'failed',
        result: result,
      },
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to trigger automation' });
  }
});

router.get('/logs', authenticate, async (req, res) => {
  try {
    const logs = await prisma.automation_log.findMany({
      where: { automation: { business_id: BUSINESS_ID } },
      orderBy: { created_at: 'desc' },
      take: 100,
      include: {
        automation: { select: { name: true } },
        contact: { select: { name: true } },
      },
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch automation logs' });
  }
});

module.exports = router;
