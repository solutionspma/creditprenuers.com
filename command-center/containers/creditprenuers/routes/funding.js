/**
 * ══════════════════════════════════════════════════════════════
 * CREDITPRENUERS - FUNDING ROUTES
 * Credit Repair & Funding Tracking System
 * ══════════════════════════════════════════════════════════════
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../../../shared/middleware/auth');
const logger = require('../../../shared/utils/logger');

const prisma = new PrismaClient();
const BUSINESS_ID = 'creditprenuers';

// ─────────────────────────────────────────────────────────────
// GET /api/creditprenuers/funding/dashboard - Funding dashboard stats
// ─────────────────────────────────────────────────────────────
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const [
      totalFunded,
      activeClients,
      avgFundingAmount,
      fundingByStage,
      recentFundings,
      monthlyTrend,
    ] = await Promise.all([
      // Total funded amount
      prisma.funding_record.aggregate({
        where: { business_id: BUSINESS_ID, status: 'funded' },
        _sum: { amount: true },
      }),
      
      // Active funding clients
      prisma.contact.count({
        where: {
          business_id: BUSINESS_ID,
          pipeline_stage: { in: ['funding_0_50k', 'funding_50k_150k', 'funding_150k_plus'] },
        },
      }),
      
      // Average funding amount
      prisma.funding_record.aggregate({
        where: { business_id: BUSINESS_ID, status: 'funded' },
        _avg: { amount: true },
      }),
      
      // Contacts by funding stage
      prisma.contact.groupBy({
        by: ['pipeline_stage'],
        where: { business_id: BUSINESS_ID },
        _count: { id: true },
      }),
      
      // Recent fundings
      prisma.funding_record.findMany({
        where: { business_id: BUSINESS_ID, status: 'funded' },
        orderBy: { funded_date: 'desc' },
        take: 10,
        include: {
          contact: { select: { id: true, name: true } },
        },
      }),
      
      // Monthly funding trend (last 12 months)
      prisma.$queryRaw`
        SELECT 
          DATE_TRUNC('month', funded_date) as month,
          SUM(amount) as total,
          COUNT(*) as count
        FROM funding_records
        WHERE business_id = ${BUSINESS_ID}
          AND status = 'funded'
          AND funded_date >= NOW() - INTERVAL '12 months'
        GROUP BY DATE_TRUNC('month', funded_date)
        ORDER BY month DESC
      `,
    ]);

    res.json({
      totalFunded: totalFunded._sum.amount || 0,
      activeClients,
      avgFundingAmount: avgFundingAmount._avg.amount || 0,
      fundingByStage,
      recentFundings,
      monthlyTrend,
    });
  } catch (error) {
    logger.error('Error fetching funding dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch funding dashboard' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/creditprenuers/funding/contacts/:contactId - Contact funding profile
// ─────────────────────────────────────────────────────────────
router.get('/contacts/:contactId', authenticate, async (req, res) => {
  try {
    const contactId = parseInt(req.params.contactId);
    
    const [contact, fundingRecords, creditScores, disputes] = await Promise.all([
      prisma.contact.findFirst({
        where: { id: contactId, business_id: BUSINESS_ID },
      }),
      
      prisma.funding_record.findMany({
        where: { contact_id: contactId, business_id: BUSINESS_ID },
        orderBy: { created_at: 'desc' },
      }),
      
      prisma.credit_score.findMany({
        where: { contact_id: contactId, business_id: BUSINESS_ID },
        orderBy: { recorded_at: 'desc' },
        take: 12,
      }),
      
      prisma.dispute.findMany({
        where: { contact_id: contactId, business_id: BUSINESS_ID },
        orderBy: { created_at: 'desc' },
      }),
    ]);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({
      contact,
      fundingRecords,
      creditScores,
      disputes,
      totalFunded: fundingRecords
        .filter(r => r.status === 'funded')
        .reduce((sum, r) => sum + r.amount, 0),
      currentCreditScore: creditScores[0] || null,
    });
  } catch (error) {
    logger.error('Error fetching funding profile:', error);
    res.status(500).json({ error: 'Failed to fetch funding profile' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/creditprenuers/funding/records - Create funding record
// ─────────────────────────────────────────────────────────────
router.post('/records', authenticate, async (req, res) => {
  try {
    const {
      contact_id,
      funding_type,
      lender,
      amount,
      interest_rate,
      term_months,
      status,
      notes,
    } = req.body;

    const record = await prisma.funding_record.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id,
        funding_type,
        lender,
        amount,
        interest_rate,
        term_months,
        status: status || 'pending',
        notes,
        created_by: req.user.id,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id,
        type: 'funding_record_created',
        description: `Funding record created: ${funding_type} - $${amount.toLocaleString()} from ${lender}`,
        user_id: req.user.id,
      },
    });

    // Update contact pipeline if funded
    if (status === 'funded') {
      await prisma.contact.update({
        where: { id: contact_id },
        data: { pipeline_stage: 'funded_complete' },
      });
    }

    res.status(201).json(record);
  } catch (error) {
    logger.error('Error creating funding record:', error);
    res.status(500).json({ error: 'Failed to create funding record' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/creditprenuers/funding/credit-scores - Record credit score
// ─────────────────────────────────────────────────────────────
router.post('/credit-scores', authenticate, async (req, res) => {
  try {
    const {
      contact_id,
      bureau,
      score,
      score_type,
      notes,
    } = req.body;

    const creditScore = await prisma.credit_score.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id,
        bureau, // 'experian', 'equifax', 'transunion'
        score,
        score_type: score_type || 'fico8',
        notes,
        recorded_by: req.user.id,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id,
        type: 'credit_score_recorded',
        description: `${bureau} score recorded: ${score}`,
        user_id: req.user.id,
      },
    });

    res.status(201).json(creditScore);
  } catch (error) {
    logger.error('Error recording credit score:', error);
    res.status(500).json({ error: 'Failed to record credit score' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/creditprenuers/funding/disputes - Create dispute record
// ─────────────────────────────────────────────────────────────
router.post('/disputes', authenticate, async (req, res) => {
  try {
    const {
      contact_id,
      bureau,
      creditor,
      account_number,
      dispute_reason,
      dispute_type,
      amount,
    } = req.body;

    const dispute = await prisma.dispute.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id,
        bureau,
        creditor,
        account_number,
        dispute_reason,
        dispute_type,
        amount,
        status: 'pending',
        created_by: req.user.id,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id,
        type: 'dispute_created',
        description: `Dispute filed with ${bureau} for ${creditor}`,
        user_id: req.user.id,
      },
    });

    res.status(201).json(dispute);
  } catch (error) {
    logger.error('Error creating dispute:', error);
    res.status(500).json({ error: 'Failed to create dispute' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/creditprenuers/funding/disputes/:id - Update dispute status
// ─────────────────────────────────────────────────────────────
router.put('/disputes/:id', authenticate, async (req, res) => {
  try {
    const { status, result, notes } = req.body;

    const dispute = await prisma.dispute.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status,
        result,
        notes,
        resolved_at: ['resolved', 'deleted', 'verified'].includes(status) ? new Date() : null,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        business_id: BUSINESS_ID,
        contact_id: dispute.contact_id,
        type: 'dispute_updated',
        description: `Dispute ${dispute.id} status updated to ${status}`,
        user_id: req.user.id,
      },
    });

    res.json(dispute);
  } catch (error) {
    logger.error('Error updating dispute:', error);
    res.status(500).json({ error: 'Failed to update dispute' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/creditprenuers/funding/goals - Funding goal tracker
// ─────────────────────────────────────────────────────────────
router.get('/goals', authenticate, async (req, res) => {
  try {
    const goals = await prisma.funding_goal.findMany({
      where: { business_id: BUSINESS_ID },
      include: {
        contact: { select: { id: true, name: true, email: true } },
      },
    });

    // Calculate progress for each goal
    const goalsWithProgress = await Promise.all(
      goals.map(async (goal) => {
        const funded = await prisma.funding_record.aggregate({
          where: {
            contact_id: goal.contact_id,
            status: 'funded',
          },
          _sum: { amount: true },
        });

        return {
          ...goal,
          funded: funded._sum.amount || 0,
          progress: Math.min(100, ((funded._sum.amount || 0) / goal.target_amount) * 100),
        };
      })
    );

    res.json(goalsWithProgress);
  } catch (error) {
    logger.error('Error fetching funding goals:', error);
    res.status(500).json({ error: 'Failed to fetch funding goals' });
  }
});

module.exports = router;
