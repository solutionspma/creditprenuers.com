/**
 * LOGADEMY - CONTACTS ROUTES
 * Shared contacts module with logistics-specific extensions
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const BUSINESS_ID = 'logademy';

router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, type } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {
      business_id: BUSINESS_ID,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(type && { contact_type: type }), // shipper, consignee, broker, vendor
    };

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({ where, skip, take: parseInt(limit), orderBy: { name: 'asc' } }),
      prisma.contact.count({ where }),
    ]);

    res.json({ data: contacts, pagination: { page: parseInt(page), limit: parseInt(limit), total } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const contact = await prisma.contact.findFirst({
      where: { id: parseInt(req.params.id), business_id: BUSINESS_ID },
      include: { loads_as_shipper: { take: 10 }, loads_as_consignee: { take: 10 } },
    });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const contact = await prisma.contact.create({
      data: { business_id: BUSINESS_ID, ...req.body, created_by: req.user.id },
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const contact = await prisma.contact.update({
      where: { id: parseInt(req.params.id) },
      data: { ...req.body, updated_at: new Date() },
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

router.delete('/:id', authenticate, authorize(['owner', 'admin']), async (req, res) => {
  try {
    await prisma.contact.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
