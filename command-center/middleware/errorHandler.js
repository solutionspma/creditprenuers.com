// MBOCC Command Center - Error Handler Middleware

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, errors = null) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static conflict(message = 'Resource already exists') {
    return new ApiError(409, message);
  }

  static tooManyRequests(message = 'Too many requests') {
    return new ApiError(429, message);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message);
  }
}

/**
 * Not found handler - 404 for unmatched routes
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`
  });
};

/**
 * Global error handler
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    user: req.user?.id
  });

  // Handle ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.errors && { errors: err.errors })
    });
  }

  // Handle Prisma errors
  if (err.code) {
    switch (err.code) {
      case 'P2002':
        // Unique constraint violation
        return res.status(409).json({
          success: false,
          error: 'A record with this value already exists',
          field: err.meta?.target?.[0]
        });
      
      case 'P2003':
        // Foreign key constraint violation
        return res.status(400).json({
          success: false,
          error: 'Related record not found'
        });
      
      case 'P2025':
        // Record not found
        return res.status(404).json({
          success: false,
          error: 'Record not found'
        });
      
      default:
        // Other Prisma errors
        return res.status(500).json({
          success: false,
          error: 'Database error'
        });
    }
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expired'
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      errors: err.details
    });
  }

  // Handle Stripe errors
  if (err.type?.startsWith('Stripe')) {
    return res.status(400).json({
      success: false,
      error: err.message || 'Payment processing error'
    });
  }

  // Default to 500 server error
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
};

/**
 * Async handler wrapper to catch errors in async route handlers
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  ApiError,
  notFoundHandler,
  errorHandler,
  asyncHandler
};
