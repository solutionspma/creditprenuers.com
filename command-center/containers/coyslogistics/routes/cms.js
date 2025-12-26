/**
 * COYS LOGISTICS - CMS ROUTES
 */
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const BUSINESS_ID = 'coyslogistics';

router.get('/pages', authenticate, async (req, res) => {
  try {
    const pages = await prisma.cms_page.findMany({
      where: { business_id: BUSINESS_ID },
      orderBy: { slug: 'asc' },
    });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

router.get('/pages/:slug', authenticate, async (req, res) => {
  try {
    const page = await prisma.cms_page.findFirst({
      where: { business_id: BUSINESS_ID, slug: req.params.slug },
      include: { sections: { orderBy: { order_index: 'asc' } } },
    });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

router.put('/pages/:slug', authenticate, authorize(['owner', 'admin']), async (req, res) => {
  try {
    const { title, meta_description, sections, is_published } = req.body;
    const page = await prisma.cms_page.findFirst({
      where: { business_id: BUSINESS_ID, slug: req.params.slug },
    });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    
    const updated = await prisma.cms_page.update({
      where: { id: page.id },
      data: { title, meta_description, is_published, updated_at: new Date() },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update page' });
  }
});

module.exports = router;
