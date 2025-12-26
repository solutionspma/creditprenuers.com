/**
 * COYS LOGISTICS - COMMUNICATION ROUTES
 */
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../../../shared/middleware/auth');
const TelnyxService = require('../../../shared/services/TelnyxService');
const EmailService = require('../../../shared/services/EmailService');

const prisma = new PrismaClient();
const BUSINESS_ID = 'coyslogistics';

router.post('/sms/send', authenticate, async (req, res) => {
  try {
    const { to, message, driver_id } = req.body;
    const result = await TelnyxService.sendSMS(to, message);
    
    await prisma.communication_log.create({
      data: {
        business_id: BUSINESS_ID,
        entity_type: driver_id ? 'driver' : 'contact',
        entity_id: driver_id || null,
        type: 'sms',
        direction: 'outbound',
        to,
        content: message,
        status: result.success ? 'sent' : 'failed',
        sent_by: req.user.id,
      },
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

router.post('/sms/dispatch', authenticate, async (req, res) => {
  try {
    const { driver_id, load_id, message_type } = req.body;
    
    const driver = await prisma.driver.findUnique({ where: { id: driver_id } });
    const load = await prisma.load.findUnique({ where: { id: load_id } });
    
    if (!driver || !load) return res.status(404).json({ error: 'Driver or load not found' });

    const templates = {
      assignment: `🚚 New Load: ${load.reference_number}\n📍 Pickup: ${load.pickup_location}\n🎯 Delivery: ${load.delivery_location}\n📅 ${load.pickup_date.toLocaleDateString()}`,
      reminder: `⏰ Reminder: Load ${load.reference_number} pickup today at ${load.pickup_time || 'TBD'}`,
      update: `📋 Load ${load.reference_number} update requested. Please check in.`,
    };

    const message = templates[message_type] || req.body.custom_message;
    const result = await TelnyxService.sendSMS(driver.phone, message);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send dispatch SMS' });
  }
});

router.post('/email/send', authenticate, async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const result = await EmailService.send({
      to,
      subject,
      html: body,
      from: 'Coys Logistics <dispatch@coyslogistics.com>',
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

router.get('/history/:entityType/:entityId', authenticate, async (req, res) => {
  try {
    const logs = await prisma.communication_log.findMany({
      where: {
        business_id: BUSINESS_ID,
        entity_type: req.params.entityType,
        entity_id: parseInt(req.params.entityId),
      },
      orderBy: { created_at: 'desc' },
      take: 50,
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch communication history' });
  }
});

module.exports = router;
