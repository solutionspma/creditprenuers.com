/**
 * ══════════════════════════════════════════════════════════════
 * CREDTEGY - COMMUNICATION ROUTES
 * SMS/Voice via TELNYX, Email via SMTP
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../../../shared/middleware/auth');
const TelnyxService = require('../../../shared/services/TelnyxService');
const EmailService = require('../../../shared/services/EmailService');

const prisma = new PrismaClient();
const BUSINESS_ID = 'credtegy';

// ─────────────────────────────────────────────────────────────
// SMS
// ─────────────────────────────────────────────────────────────
router.post('/sms/send', authenticate, async (req, res) => {
  try {
    const { contact_id, to, message, template } = req.body;
    
    let finalMessage = message;
    if (template) {
      const contact = await prisma.contact.findUnique({ where: { id: contact_id } });
      finalMessage = TelnyxService.renderTemplate(template, contact);
    }
    
    const result = await TelnyxService.sendSMS(to, finalMessage);
    
    await prisma.communication_log.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id,
        type: 'sms',
        direction: 'outbound',
        to,
        content: finalMessage,
        status: result.success ? 'sent' : 'failed',
        external_id: result.messageId,
        sent_by: req.user.id,
      },
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

router.get('/sms/history/:contactId', authenticate, async (req, res) => {
  try {
    const messages = await prisma.communication_log.findMany({
      where: { 
        business_id: BUSINESS_ID, 
        contact_id: parseInt(req.params.contactId),
        type: 'sms',
      },
      orderBy: { created_at: 'desc' },
      take: 50,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch SMS history' });
  }
});

// ─────────────────────────────────────────────────────────────
// EMAIL
// ─────────────────────────────────────────────────────────────
router.post('/email/send', authenticate, async (req, res) => {
  try {
    const { contact_id, to, subject, body, template } = req.body;
    
    let finalBody = body;
    if (template) {
      const contact = await prisma.contact.findUnique({ where: { id: contact_id } });
      finalBody = EmailService.renderTemplate(template, contact);
    }
    
    const result = await EmailService.send({
      to,
      subject,
      html: finalBody,
      from: 'Credtegy <support@credtegy.com>',
    });
    
    await prisma.communication_log.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id,
        type: 'email',
        direction: 'outbound',
        to,
        subject,
        content: finalBody,
        status: result.success ? 'sent' : 'failed',
        sent_by: req.user.id,
      },
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// ─────────────────────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────────────────────
router.get('/templates', authenticate, async (req, res) => {
  try {
    const templates = await prisma.message_template.findMany({
      where: { business_id: BUSINESS_ID },
      orderBy: { name: 'asc' },
    });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

router.post('/templates', authenticate, async (req, res) => {
  try {
    const { name, type, subject, content } = req.body;
    
    const template = await prisma.message_template.create({
      data: {
        business_id: BUSINESS_ID,
        name,
        type, // 'sms' or 'email'
        subject,
        content,
        created_by: req.user.id,
      },
    });
    
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create template' });
  }
});

module.exports = router;
