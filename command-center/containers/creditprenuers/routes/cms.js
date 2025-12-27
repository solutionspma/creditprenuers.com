/**
 * ══════════════════════════════════════════════════════════════
 * CREDTEGY - CMS ROUTES
 * Content Management System for Page Editing
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../../../shared/middleware/auth');

const prisma = new PrismaClient();
const BUSINESS_ID = 'credtegy';

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
    
    // Update page
    const updated = await prisma.cms_page.update({
      where: { id: page.id },
      data: { title, meta_description, is_published, updated_at: new Date() },
    });
    
    // Update sections if provided
    if (sections) {
      await prisma.cms_section.deleteMany({ where: { page_id: page.id } });
      await prisma.cms_section.createMany({
        data: sections.map((s, i) => ({
          page_id: page.id,
          section_type: s.type,
          content: s.content,
          order_index: i,
        })),
      });
    }
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update page' });
  }
});

router.post('/pages', authenticate, authorize(['owner', 'admin']), async (req, res) => {
  try {
    const { slug, title, meta_description, template } = req.body;
    
    const page = await prisma.cms_page.create({
      data: {
        business_id: BUSINESS_ID,
        slug,
        title,
        meta_description,
        template: template || 'default',
        created_by: req.user.id,
      },
    });
    
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create page' });
  }
});

// Media library
router.get('/media', authenticate, async (req, res) => {
  try {
    const media = await prisma.cms_media.findMany({
      where: { business_id: BUSINESS_ID },
      orderBy: { created_at: 'desc' },
    });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

module.exports = router;
