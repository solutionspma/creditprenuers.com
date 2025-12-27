// MBOCC Command Center - Validation Middleware
// Request validation using Joi schemas

const Joi = require('joi');

/**
 * Generic validation middleware factory
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors
      });
    }

    req[property] = value;
    next();
  };
};

// ==========================================
// COMMON SCHEMAS
// ==========================================

const schemas = {
  // Pagination
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    sortBy: Joi.string().default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
  }),

  // ID parameter
  id: Joi.object({
    id: Joi.string().uuid().required()
  }),

  // ==========================================
  // USER SCHEMAS
  // ==========================================
  
  userCreate: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid('owner', 'admin', 'staff').default('staff'),
    phone: Joi.string().allow('', null),
    permissions: Joi.array().items(Joi.string()).default([])
  }),

  userUpdate: Joi.object({
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string().valid('owner', 'admin', 'staff'),
    phone: Joi.string().allow('', null),
    permissions: Joi.array().items(Joi.string()),
    isActive: Joi.boolean()
  }),

  userLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // ==========================================
  // CONTACT SCHEMAS
  // ==========================================

  contactCreate: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().allow('', null),
    phone: Joi.string().allow('', null),
    company: Joi.string().allow('', null),
    type: Joi.string().valid('lead', 'client', 'partner', 'shipper', 'broker', 'carrier').default('lead'),
    source: Joi.string().allow('', null),
    tags: Joi.array().items(Joi.string()).default([]),
    pipelineId: Joi.string().uuid().allow(null),
    stageId: Joi.string().uuid().allow(null),
    assignedToId: Joi.string().uuid().allow(null),
    customFields: Joi.object().default({}),
    notes: Joi.string().allow('', null)
  }),

  contactUpdate: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().allow('', null),
    phone: Joi.string().allow('', null),
    company: Joi.string().allow('', null),
    type: Joi.string().valid('lead', 'client', 'partner', 'shipper', 'broker', 'carrier'),
    source: Joi.string().allow('', null),
    tags: Joi.array().items(Joi.string()),
    pipelineId: Joi.string().uuid().allow(null),
    stageId: Joi.string().uuid().allow(null),
    assignedToId: Joi.string().uuid().allow(null),
    customFields: Joi.object(),
    notes: Joi.string().allow('', null)
  }),

  // ==========================================
  // PIPELINE SCHEMAS
  // ==========================================

  pipelineCreate: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('', null),
    type: Joi.string().valid('sales', 'onboarding', 'load_tracking').required(),
    stages: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      color: Joi.string().default('#000000'),
      probability: Joi.number().min(0).max(100).allow(null)
    })).default([])
  }),

  pipelineUpdate: Joi.object({
    name: Joi.string(),
    description: Joi.string().allow('', null),
    isActive: Joi.boolean()
  }),

  stageCreate: Joi.object({
    name: Joi.string().required(),
    color: Joi.string().default('#000000'),
    position: Joi.number().integer().min(0),
    probability: Joi.number().min(0).max(100).allow(null),
    isWon: Joi.boolean().default(false),
    isLost: Joi.boolean().default(false)
  }),

  // ==========================================
  // DOCUMENT SCHEMAS
  // ==========================================

  documentUpload: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid('contract', 'id', 'credit_report', 'bol', 'pod', 'invoice', 'other').required(),
    category: Joi.string().allow('', null),
    contactId: Joi.string().uuid().allow(null),
    metadata: Joi.object().default({})
  }),

  // ==========================================
  // AUTOMATION SCHEMAS
  // ==========================================

  automationCreate: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('', null),
    trigger: Joi.string().required(),
    conditions: Joi.array().items(Joi.object({
      field: Joi.string().required(),
      operator: Joi.string().valid('equals', 'not_equals', 'contains', 'gt', 'lt', 'gte', 'lte').required(),
      value: Joi.any().required()
    })).default([]),
    actions: Joi.array().items(Joi.object({
      type: Joi.string().required(),
      config: Joi.object().required()
    })).min(1).required(),
    isActive: Joi.boolean().default(true)
  }),

  // ==========================================
  // COMMUNICATION SCHEMAS
  // ==========================================

  sendSms: Joi.object({
    to: Joi.string().required(),
    message: Joi.string().max(1600).required(),
    contactId: Joi.string().uuid().allow(null)
  }),

  sendEmail: Joi.object({
    to: Joi.string().email().required(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
    contactId: Joi.string().uuid().allow(null)
  }),

  // ==========================================
  // BILLING SCHEMAS
  // ==========================================

  invoiceCreate: Joi.object({
    contactId: Joi.string().uuid().allow(null),
    items: Joi.array().items(Joi.object({
      description: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      unitPrice: Joi.number().min(0).required()
    })).min(1).required(),
    dueDate: Joi.date().required(),
    taxRate: Joi.number().min(0).max(100).default(0),
    notes: Joi.string().allow('', null),
    terms: Joi.string().allow('', null)
  }),

  // ==========================================
  // CREDTEGY SPECIFIC
  // ==========================================

  fundingApplicationCreate: Joi.object({
    contactId: Joi.string().uuid().required(),
    currentScore: Joi.number().min(300).max(850).allow(null),
    targetScore: Joi.number().min(300).max(850).allow(null),
    fundingType: Joi.string().valid('credit_card', 'business_loan', 'line_of_credit').allow(null),
    requestedAmount: Joi.number().min(0).allow(null),
    notes: Joi.string().allow('', null)
  }),

  vaultItemAdd: Joi.object({
    type: Joi.string().valid('credit_card', 'loan', 'line_of_credit').required(),
    name: Joi.string().required(),
    limit: Joi.number().min(0).allow(null),
    balance: Joi.number().min(0).allow(null),
    apr: Joi.number().min(0).max(100).allow(null),
    openDate: Joi.date().allow(null)
  }),

  // ==========================================
  // LOGADEMY SPECIFIC
  // ==========================================

  truckCreate: Joi.object({
    unitNumber: Joi.string().required(),
    vin: Joi.string().allow('', null),
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
    type: Joi.string().valid('semi', 'box_truck', 'flatbed', 'reefer').required(),
    gvwr: Joi.number().allow(null),
    payloadCapacity: Joi.number().allow(null),
    mileage: Joi.number().allow(null),
    insuranceExpiry: Joi.date().allow(null),
    registrationExpiry: Joi.date().allow(null),
    inspectionExpiry: Joi.date().allow(null)
  }),

  driverCreate: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().allow('', null),
    phone: Joi.string().required(),
    cdlNumber: Joi.string().required(),
    cdlState: Joi.string().length(2).uppercase().required(),
    cdlClass: Joi.string().valid('A', 'B', 'C').required(),
    cdlExpiry: Joi.date().required(),
    employeeId: Joi.string().allow('', null),
    hireDate: Joi.date().allow(null),
    payType: Joi.string().valid('per_mile', 'percentage', 'hourly', 'salary').allow(null),
    payRate: Joi.number().min(0).allow(null),
    medicalCardExpiry: Joi.date().allow(null),
    emergencyName: Joi.string().allow('', null),
    emergencyPhone: Joi.string().allow('', null)
  }),

  loadCreate: Joi.object({
    loadNumber: Joi.string().allow('', null), // Auto-generated if not provided
    referenceNumber: Joi.string().allow('', null),
    shipperId: Joi.string().uuid().allow(null),
    truckId: Joi.string().uuid().allow(null),
    driverId: Joi.string().uuid().allow(null),
    
    commodity: Joi.string().allow('', null),
    weight: Joi.number().allow(null),
    pieces: Joi.number().allow(null),
    hazmat: Joi.boolean().default(false),
    temperature: Joi.object({
      min: Joi.number(),
      max: Joi.number()
    }).allow(null),
    
    pickupAddress: Joi.string().required(),
    pickupCity: Joi.string().required(),
    pickupState: Joi.string().length(2).uppercase().required(),
    pickupZip: Joi.string().required(),
    pickupDate: Joi.date().required(),
    pickupTime: Joi.string().allow('', null),
    pickupNotes: Joi.string().allow('', null),
    
    deliveryAddress: Joi.string().required(),
    deliveryCity: Joi.string().required(),
    deliveryState: Joi.string().length(2).uppercase().required(),
    deliveryZip: Joi.string().required(),
    deliveryDate: Joi.date().required(),
    deliveryTime: Joi.string().allow('', null),
    deliveryNotes: Joi.string().allow('', null),
    
    stops: Joi.array().items(Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().length(2).uppercase().required(),
      zip: Joi.string().required(),
      type: Joi.string().valid('pickup', 'delivery').required(),
      date: Joi.date().required(),
      time: Joi.string().allow('', null),
      notes: Joi.string().allow('', null)
    })).default([]),
    
    rate: Joi.number().min(0).required(),
    rateType: Joi.string().valid('flat', 'per_mile').default('flat'),
    miles: Joi.number().allow(null),
    fuelSurcharge: Joi.number().min(0).default(0),
    accessorials: Joi.array().items(Joi.object({
      type: Joi.string().required(),
      amount: Joi.number().required(),
      description: Joi.string().allow('', null)
    })).default([])
  }),

  bolCreate: Joi.object({
    loadId: Joi.string().uuid().required(),
    bolNumber: Joi.string().allow('', null), // Auto-generated if not provided
    proNumber: Joi.string().allow('', null),
    shipperName: Joi.string().required(),
    shipperAddress: Joi.string().required(),
    consigneeName: Joi.string().required(),
    consigneeAddress: Joi.string().required(),
    description: Joi.string().required(),
    weight: Joi.number().required(),
    pieces: Joi.number().required(),
    freightClass: Joi.string().allow('', null),
    nmfcCode: Joi.string().allow('', null),
    specialInstructions: Joi.string().allow('', null)
  }),

  checkCallCreate: Joi.object({
    loadId: Joi.string().uuid().required(),
    location: Joi.string().required(),
    city: Joi.string().allow('', null),
    state: Joi.string().length(2).uppercase().allow('', null),
    lat: Joi.number().allow(null),
    lng: Joi.number().allow(null),
    status: Joi.string().valid('in_transit', 'stopped', 'at_pickup', 'at_delivery', 'delayed').required(),
    notes: Joi.string().allow('', null)
  }),

  maintenanceLogCreate: Joi.object({
    truckId: Joi.string().uuid().required(),
    serviceType: Joi.string().valid('oil_change', 'tire_rotation', 'brake_service', 'inspection', 'repair', 'other').required(),
    description: Joi.string().required(),
    laborCost: Joi.number().min(0).default(0),
    partsCost: Joi.number().min(0).default(0),
    mileage: Joi.number().allow(null),
    vendor: Joi.string().allow('', null),
    invoiceNumber: Joi.string().allow('', null),
    serviceDate: Joi.date().required(),
    nextServiceDate: Joi.date().allow(null),
    notes: Joi.string().allow('', null)
  }),

  driverPaymentCreate: Joi.object({
    driverId: Joi.string().uuid().required(),
    payPeriodStart: Joi.date().required(),
    payPeriodEnd: Joi.date().required(),
    loads: Joi.array().items(Joi.object({
      loadId: Joi.string().uuid(),
      loadNumber: Joi.string(),
      amount: Joi.number().required()
    })).default([]),
    totalMiles: Joi.number().allow(null),
    totalLoads: Joi.number().allow(null),
    grossPay: Joi.number().required(),
    deductions: Joi.array().items(Joi.object({
      type: Joi.string().required(),
      description: Joi.string().allow('', null),
      amount: Joi.number().required()
    })).default([]),
    notes: Joi.string().allow('', null)
  })
};

module.exports = {
  validate,
  schemas
};
