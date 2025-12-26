// MBOCC Command Center - Middleware Index
// Export all middleware

const { 
  authenticate, 
  requireRole, 
  requirePermission, 
  validateBusinessAccess, 
  optionalAuth,
  apiKeyAuth,
  rateLimit 
} = require('./auth');

const { validate, schemas } = require('./validation');

const { 
  ApiError, 
  notFoundHandler, 
  errorHandler, 
  asyncHandler 
} = require('./errorHandler');

module.exports = {
  // Authentication
  authenticate,
  requireRole,
  requirePermission,
  validateBusinessAccess,
  optionalAuth,
  apiKeyAuth,
  rateLimit,
  
  // Validation
  validate,
  schemas,
  
  // Error Handling
  ApiError,
  notFoundHandler,
  errorHandler,
  asyncHandler
};
