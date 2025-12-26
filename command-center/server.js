/**
 * ══════════════════════════════════════════════════════════════
 * MBOCC COMMAND CENTER - MAIN SERVER
 * Multi-Business Owner Command Center API
 * ══════════════════════════════════════════════════════════════
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const logger = require('./shared/utils/logger');

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 4000;

// ─────────────────────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────────────────────

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    businessId: req.headers['x-business-id'],
  });
  next();
});

// ─────────────────────────────────────────────────────────────
// BUSINESS CONTAINER MIDDLEWARE
// ─────────────────────────────────────────────────────────────

// Inject business context into request
app.use('/api/:businessId/*', (req, res, next) => {
  const validBusinessIds = ['creditprenuers', 'coyslogistics'];
  const businessId = req.params.businessId?.toLowerCase();
  
  if (!validBusinessIds.includes(businessId)) {
    return res.status(400).json({ error: 'Invalid business container' });
  }
  
  req.businessId = businessId;
  req.businessConfig = require(`./containers/${businessId}/config.json`);
  next();
});

// ─────────────────────────────────────────────────────────────
// API ROUTES
// ─────────────────────────────────────────────────────────────

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || 'v1',
  });
});

// Shared routes (auth, webhooks)
app.use('/api/auth', require('./shared/routes/auth'));
app.use('/api/webhooks', require('./shared/routes/webhooks'));

// CreditPreneurs container routes
app.use('/api/creditprenuers/contacts', require('./containers/creditprenuers/routes/contacts'));
app.use('/api/creditprenuers/pipelines', require('./containers/creditprenuers/routes/pipelines'));
app.use('/api/creditprenuers/documents', require('./containers/creditprenuers/routes/documents'));
app.use('/api/creditprenuers/automation', require('./containers/creditprenuers/routes/automation'));
app.use('/api/creditprenuers/communication', require('./containers/creditprenuers/routes/communication'));
app.use('/api/creditprenuers/billing', require('./containers/creditprenuers/routes/billing'));
app.use('/api/creditprenuers/funding', require('./containers/creditprenuers/routes/funding'));
app.use('/api/creditprenuers/cms', require('./containers/creditprenuers/routes/cms'));
app.use('/api/creditprenuers/analytics', require('./containers/creditprenuers/routes/analytics'));

// Coys Logistics container routes
app.use('/api/coyslogistics/contacts', require('./containers/coyslogistics/routes/contacts'));
app.use('/api/coyslogistics/pipelines', require('./containers/coyslogistics/routes/pipelines'));
app.use('/api/coyslogistics/documents', require('./containers/coyslogistics/routes/documents'));
app.use('/api/coyslogistics/automation', require('./containers/coyslogistics/routes/automation'));
app.use('/api/coyslogistics/communication', require('./containers/coyslogistics/routes/communication'));
app.use('/api/coyslogistics/billing', require('./containers/coyslogistics/routes/billing'));
app.use('/api/coyslogistics/fleet', require('./containers/coyslogistics/routes/fleet'));
app.use('/api/coyslogistics/loads', require('./containers/coyslogistics/routes/loads'));
app.use('/api/coyslogistics/drivers', require('./containers/coyslogistics/routes/drivers'));
app.use('/api/coyslogistics/cms', require('./containers/coyslogistics/routes/cms'));
app.use('/api/coyslogistics/analytics', require('./containers/coyslogistics/routes/analytics'));

// ─────────────────────────────────────────────────────────────
// ERROR HANDLING
// ─────────────────────────────────────────────────────────────

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
  });
});

// ─────────────────────────────────────────────────────────────
// SERVER START
// ─────────────────────────────────────────────────────────────

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('✅ Database connected');

    app.listen(PORT, () => {
      logger.info(`🚀 MBOCC Command Center running on port ${PORT}`);
      logger.info(`📦 Containers: CreditPreneurs, CoysLogistics`);
      logger.info(`🔗 API Base: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

module.exports = app;
