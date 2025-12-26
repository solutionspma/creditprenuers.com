/**
 * ══════════════════════════════════════════════════════════════
 * CREDITPRENUERS - PIPELINES ROUTES
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const BUSINESS_ID = 'creditprenuers';

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

router.get('/:pipelineId/contacts', authenticate, async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      where: { 
        business_id: BUSINESS_ID, 
        pipeline_id: req.params.pipelineId 
      },
      orderBy: { updated_at: 'desc' },
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pipeline contacts' });
  }
});

router.put('/:pipelineId/stages/:stageId/move', authenticate, async (req, res) => {
  try {
    const { contact_id, new_stage } = req.body;
    
    const updated = await prisma.contact.update({
      where: { id: contact_id },
      data: { pipeline_stage: new_stage, updated_at: new Date() },
    });
    
    await prisma.activity.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id,
        type: 'pipeline_move',
        description: `Moved to stage: ${new_stage}`,
        user_id: req.user.id,
      },
    });
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to move contact' });
  }
});

module.exports = router;
