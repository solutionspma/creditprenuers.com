/**
 * ══════════════════════════════════════════════════════════════
 * CREDTEGY - CONTACTS ROUTES
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../../../shared/middleware/auth');
const { validateContact } = require('../../../shared/middleware/validation');
const logger = require('../../../shared/utils/logger');

const prisma = new PrismaClient();
const BUSINESS_ID = 'credtegy';

// ─────────────────────────────────────────────────────────────
// GET /api/credtegy/contacts - List all contacts
// ─────────────────────────────────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      tag, 
      pipeline_stage,
      sort = 'created_at',
      order = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {
      business_id: BUSINESS_ID,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search } },
        ],
      }),
      ...(tag && { tags: { has: tag } }),
      ...(pipeline_stage && { pipeline_stage }),
    };

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { [sort]: order },
        include: {
          documents: { select: { id: true, doc_type: true } },
          funding_records: { select: { id: true, amount: true, status: true } },
        },
      }),
      prisma.contact.count({ where }),
    ]);

    res.json({
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    logger.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/credtegy/contacts/:id - Get single contact
// ─────────────────────────────────────────────────────────────
router.get('/:id', authenticate, async (req, res) => {
  try {
    const contact = await prisma.contact.findFirst({
      where: {
        id: parseInt(req.params.id),
        business_id: BUSINESS_ID,
      },
      include: {
        documents: true,
        funding_records: true,
        activities: {
          orderBy: { created_at: 'desc' },
          take: 50,
        },
        tasks: {
          where: { completed: false },
          orderBy: { due_date: 'asc' },
        },
      },
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    logger.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/credtegy/contacts - Create contact
// ─────────────────────────────────────────────────────────────
router.post('/', authenticate, validateContact, async (req, res) => {
  try {
    const { name, email, phone, tags, notes, source, pipeline_stage } = req.body;

    // Check for duplicate email
    const existing = await prisma.contact.findFirst({
      where: { email, business_id: BUSINESS_ID },
    });

    if (existing) {
      return res.status(409).json({ error: 'Contact with this email already exists' });
    }

    const contact = await prisma.contact.create({
      data: {
        business_id: BUSINESS_ID,
        name,
        email,
        phone,
        tags: tags || [],
        notes,
        source: source || 'manual',
        pipeline_stage: pipeline_stage || 'new_lead',
        created_by: req.user.id,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id: contact.id,
        type: 'contact_created',
        description: `Contact created by ${req.user.name}`,
        user_id: req.user.id,
      },
    });

    logger.info(`Contact created: ${contact.id}`, { businessId: BUSINESS_ID });
    res.status(201).json(contact);
  } catch (error) {
    logger.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/credtegy/contacts/:id - Update contact
// ─────────────────────────────────────────────────────────────
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { name, email, phone, tags, notes, pipeline_stage, assigned_to } = req.body;

    const contact = await prisma.contact.findFirst({
      where: {
        id: parseInt(req.params.id),
        business_id: BUSINESS_ID,
      },
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Track pipeline stage change
    const stageChanged = pipeline_stage && pipeline_stage !== contact.pipeline_stage;

    const updated = await prisma.contact.update({
      where: { id: contact.id },
      data: {
        name,
        email,
        phone,
        tags,
        notes,
        pipeline_stage,
        assigned_to,
        updated_at: new Date(),
      },
    });

    // Log stage change
    if (stageChanged) {
      await prisma.activity.create({
        data: {
          business_id: BUSINESS_ID,
          contact_id: contact.id,
          type: 'pipeline_stage_changed',
          description: `Pipeline stage changed from ${contact.pipeline_stage} to ${pipeline_stage}`,
          user_id: req.user.id,
          metadata: {
            from: contact.pipeline_stage,
            to: pipeline_stage,
          },
        },
      });
    }

    res.json(updated);
  } catch (error) {
    logger.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/credtegy/contacts/:id - Delete contact
// ─────────────────────────────────────────────────────────────
router.delete('/:id', authenticate, authorize(['owner', 'admin']), async (req, res) => {
  try {
    const contact = await prisma.contact.findFirst({
      where: {
        id: parseInt(req.params.id),
        business_id: BUSINESS_ID,
      },
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await prisma.contact.delete({ where: { id: contact.id } });
    
    logger.info(`Contact deleted: ${contact.id}`, { businessId: BUSINESS_ID });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    logger.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/credtegy/contacts/:id/tags - Add tags
// ─────────────────────────────────────────────────────────────
router.post('/:id/tags', authenticate, async (req, res) => {
  try {
    const { tags } = req.body;
    
    const contact = await prisma.contact.findFirst({
      where: {
        id: parseInt(req.params.id),
        business_id: BUSINESS_ID,
      },
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const newTags = [...new Set([...contact.tags, ...tags])];
    
    const updated = await prisma.contact.update({
      where: { id: contact.id },
      data: { tags: newTags },
    });

    res.json(updated);
  } catch (error) {
    logger.error('Error adding tags:', error);
    res.status(500).json({ error: 'Failed to add tags' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/credtegy/contacts/:id/timeline - Activity timeline
// ─────────────────────────────────────────────────────────────
router.get('/:id/timeline', authenticate, async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      where: {
        contact_id: parseInt(req.params.id),
        business_id: BUSINESS_ID,
      },
      orderBy: { created_at: 'desc' },
      take: 100,
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    res.json(activities);
  } catch (error) {
    logger.error('Error fetching timeline:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
});

module.exports = router;
