// MBOCC Command Center - Helper Utilities

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Generate a random ID
 */
const generateId = (prefix = '') => {
  const id = crypto.randomUUID();
  return prefix ? `${prefix}_${id}` : id;
};

/**
 * Generate a sequential number (for load numbers, invoice numbers, etc.)
 */
const generateSequentialNumber = async (prisma, businessId, type) => {
  const prefix = {
    load: 'LD',
    invoice: 'INV',
    bol: 'BOL',
    driver_payment: 'PAY'
  }[type] || type.toUpperCase().slice(0, 3);

  // Get count for this business and type
  const count = await prisma.$queryRaw`
    SELECT COUNT(*) as count FROM (
      SELECT id FROM loads WHERE "businessId" = ${businessId}
      UNION ALL
      SELECT id FROM invoices WHERE "businessId" = ${businessId}
    ) as combined
  `;

  const number = parseInt(count[0]?.count || 0) + 1;
  const paddedNumber = number.toString().padStart(6, '0');
  
  return `${prefix}-${paddedNumber}`;
};

/**
 * Hash a password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

/**
 * Compare password with hash
 */
const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

/**
 * Generate JWT token
 */
const generateToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Generate refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId, type: 'refresh' }, process.env.JWT_REFRESH_SECRET, { 
    expiresIn: '30d' 
  });
};

/**
 * Verify refresh token
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

/**
 * Format currency
 */
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

/**
 * Format phone number
 */
const formatPhone = (phone) => {
  if (!phone) return null;
  
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Add +1 if US number
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  return `+${digits}`;
};

/**
 * Parse phone to E.164 format for TELNYX
 */
const parsePhoneE164 = (phone) => {
  if (!phone) return null;
  const formatted = formatPhone(phone);
  return formatted;
};

/**
 * Slugify a string
 */
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Calculate pagination
 */
const paginate = (page = 1, limit = 20) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);
  return { skip, take };
};

/**
 * Build pagination response
 */
const paginatedResponse = (data, total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      hasMore: page < totalPages
    }
  };
};

/**
 * Filter null/undefined values from object
 */
const filterNullish = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null)
  );
};

/**
 * Deep merge objects
 */
const deepMerge = (target, source) => {
  const result = { ...target };
  
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
};

/**
 * Sleep/delay function
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry function with exponential backoff
 */
const retry = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const delay = baseDelay * Math.pow(2, i);
      await sleep(delay);
    }
  }
  
  throw lastError;
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

const toRad = (deg) => deg * (Math.PI / 180);

/**
 * Generate random string
 */
const randomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};

/**
 * Mask sensitive data
 */
const maskData = (data, fieldsToMask = ['password', 'ssn', 'creditCardNumber']) => {
  if (!data || typeof data !== 'object') return data;
  
  const masked = { ...data };
  
  for (const field of fieldsToMask) {
    if (masked[field]) {
      masked[field] = '***MASKED***';
    }
  }
  
  return masked;
};

/**
 * Parse date range
 */
const parseDateRange = (startDate, endDate) => {
  const start = startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1));
  const end = endDate ? new Date(endDate) : new Date();
  
  // Set end to end of day
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
};

/**
 * Calculate business metrics
 */
const calculateMetrics = {
  // Conversion rate
  conversionRate: (converted, total) => {
    if (!total) return 0;
    return ((converted / total) * 100).toFixed(2);
  },
  
  // Average
  average: (values) => {
    if (!values.length) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  },
  
  // Growth rate
  growthRate: (current, previous) => {
    if (!previous) return current > 0 ? 100 : 0;
    return (((current - previous) / previous) * 100).toFixed(2);
  }
};

module.exports = {
  generateId,
  generateSequentialNumber,
  hashPassword,
  comparePassword,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
  formatCurrency,
  formatPhone,
  parsePhoneE164,
  slugify,
  paginate,
  paginatedResponse,
  filterNullish,
  deepMerge,
  sleep,
  retry,
  calculateDistance,
  randomString,
  maskData,
  parseDateRange,
  calculateMetrics
};
