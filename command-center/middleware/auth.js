// MBOCC Command Center - Authentication Middleware
// JWT-based authentication with business isolation

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Authenticate JWT token and attach user to request
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          business: true
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: 'Account is deactivated'
        });
      }

      // Attach user and business to request
      req.user = user;
      req.business = user.business;
      req.businessId = user.businessId;
      
      next();
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'Token expired'
        });
      }
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
};

/**
 * Verify user has required role
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
    }

    next();
  };
};

/**
 * Verify user has specific permission
 */
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    // Owners and admins have all permissions
    if (['owner', 'admin'].includes(req.user.role)) {
      return next();
    }

    const permissions = req.user.permissions || [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        error: `Missing permission: ${permission}`
      });
    }

    next();
  };
};

/**
 * Validate business access (ensure user can only access their business data)
 */
const validateBusinessAccess = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    
    // If businessId in URL doesn't match user's business
    if (businessId && businessId !== req.businessId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this business'
      });
    }

    next();
  } catch (error) {
    console.error('Business access validation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to validate business access'
    });
  }
};

/**
 * Optional authentication - attaches user if token provided, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { business: true }
      });

      if (user && user.isActive) {
        req.user = user;
        req.business = user.business;
        req.businessId = user.businessId;
      }
    } catch {
      // Ignore token errors in optional auth
    }

    next();
  } catch (error) {
    next();
  }
};

/**
 * API Key authentication for webhooks and integrations
 */
const apiKeyAuth = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        error: 'API key required'
      });
    }

    // Validate against business API keys
    const business = await prisma.business.findFirst({
      where: {
        config: {
          path: ['apiKey'],
          equals: apiKey
        }
      }
    });

    if (!business) {
      return res.status(401).json({
        success: false,
        error: 'Invalid API key'
      });
    }

    req.business = business;
    req.businessId = business.id;
    
    next();
  } catch (error) {
    console.error('API key auth error:', error);
    return res.status(500).json({
      success: false,
      error: 'API key authentication failed'
    });
  }
};

/**
 * Rate limiting middleware
 */
const rateLimit = (maxRequests = 100, windowMs = 60000) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    
    // Clean up old entries
    for (const [k, v] of requests.entries()) {
      if (now - v.startTime > windowMs) {
        requests.delete(k);
      }
    }
    
    if (!requests.has(key)) {
      requests.set(key, { count: 1, startTime: now });
      return next();
    }
    
    const record = requests.get(key);
    
    if (now - record.startTime > windowMs) {
      record.count = 1;
      record.startTime = now;
      return next();
    }
    
    record.count++;
    
    if (record.count > maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests',
        retryAfter: Math.ceil((windowMs - (now - record.startTime)) / 1000)
      });
    }
    
    next();
  };
};

module.exports = {
  authenticate,
  requireRole,
  requirePermission,
  validateBusinessAccess,
  optionalAuth,
  apiKeyAuth,
  rateLimit
};
