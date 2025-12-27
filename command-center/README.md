# MBOCC Command Center

## Multi-Business Owner Command Center (MBOCC)
Backend CRM system for **Credtegy** (Credit Repair) and **Logademy** (Trucking/Freight)

---

## 🏗️ Architecture

```
command-center/
├── server.js                    # Main Express server
├── package.json                 # Dependencies
├── .env.template                # Environment variables template
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.js                  # Initial seed data
├── middleware/
│   ├── auth.js                  # JWT authentication
│   ├── validation.js            # Request validation (Joi)
│   ├── errorHandler.js          # Error handling
│   └── index.js                 # Middleware exports
├── utils/
│   ├── helpers.js               # Utility functions
│   ├── integrations.js          # Third-party integrations
│   └── index.js                 # Utils exports
└── containers/
    ├── credtegy/          # Credit Repair CRM
    │   ├── config.json          # Business configuration
    │   └── routes/              # API routes
    │       ├── contacts.js
    │       ├── funding.js
    │       ├── pipelines.js
    │       ├── documents.js
    │       ├── automation.js
    │       ├── communication.js
    │       ├── billing.js
    │       └── cms.js
    └── logademy/           # Logistics CRM
        ├── config.json          # Business configuration
        └── routes/              # API routes
            ├── fleet.js
            ├── loads.js
            ├── drivers.js
            ├── contacts.js
            ├── pipelines.js
            ├── documents.js
            ├── automation.js
            ├── communication.js
            ├── billing.js
            └── cms.js
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd command-center
npm install
```

### 2. Configure Environment

```bash
cp .env.template .env
# Edit .env with your credentials
```

### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed initial data
npx prisma db seed
```

### 4. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

---

## 🔐 Authentication

All API routes require JWT authentication (except webhooks).

```javascript
// Login
POST /api/auth/login
{
  "email": "admin@credtegy.com",
  "password": "Admin123!"
}

// Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}

// Use token in headers
Authorization: Bearer <token>
```

---

## 📡 API Endpoints

### Business Container Pattern
All routes follow: `/api/:businessId/:resource`

| Business | Slug |
|----------|------|
| Credtegy | `credtegy` |
| Logademy | `logademy` |

### Credtegy Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/credtegy/contacts` | List contacts |
| POST | `/api/credtegy/contacts` | Create contact |
| GET | `/api/credtegy/contacts/:id` | Get contact |
| PUT | `/api/credtegy/contacts/:id` | Update contact |
| DELETE | `/api/credtegy/contacts/:id` | Delete contact |
| GET | `/api/credtegy/funding` | List funding applications |
| POST | `/api/credtegy/funding` | Create funding application |
| POST | `/api/credtegy/funding/:id/vault` | Add vault item |
| GET | `/api/credtegy/pipelines` | List pipelines |
| POST | `/api/credtegy/documents/upload` | Upload document |
| GET | `/api/credtegy/analytics/dashboard` | Dashboard metrics |

### Logademy Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/logademy/fleet` | List trucks |
| POST | `/api/logademy/fleet` | Add truck |
| GET | `/api/logademy/fleet/:id/location` | Get GPS location |
| GET | `/api/logademy/loads` | List loads |
| POST | `/api/logademy/loads` | Create load |
| PUT | `/api/logademy/loads/:id/status` | Update load status |
| POST | `/api/logademy/loads/:id/bol` | Generate BOL |
| GET | `/api/logademy/drivers` | List drivers |
| POST | `/api/logademy/drivers` | Add driver |
| POST | `/api/logademy/billing/invoice` | Generate invoice |
| GET | `/api/logademy/analytics/dashboard` | Fleet metrics |

---

## 🔌 Integrations

### Stripe (Payments)
- Customer management
- Subscriptions (Monthly Mentorship)
- One-time payments (eBook, Consultation)
- Invoice generation

### TELNYX (SMS/Voice)
- Outbound SMS
- Inbound SMS webhooks
- Voice calls
- Call recording

### DocuSign (E-Signatures)
- Contract signing
- Rate confirmations
- Bill of Lading signatures

### AWS S3 (File Storage)
- Document uploads
- POD images
- Contract storage

### ModuRoute (GPS/Fleet)
- Real-time truck tracking
- ETA calculations
- Geofencing alerts

---

## 🗃️ Database Models

### Core Models (Shared)
- `Business` - Multi-tenant business container
- `User` - Staff accounts with roles
- `Contact` - CRM contacts
- `Pipeline` / `PipelineStage` - Sales pipelines
- `Document` - File management
- `Communication` - SMS/Email logs
- `Invoice` - Billing
- `Automation` - Workflow triggers

### Credtegy Specific
- `FundingApplication` - Credit repair applications
- Vault items (JSON in FundingApplication)

### Logademy Specific
- `Truck` - Fleet vehicles
- `Driver` - CDL drivers
- `Load` - Shipments
- `BillOfLading` - BOL documents
- `CheckCall` - Load tracking updates
- `MaintenanceLog` - Truck maintenance
- `DriverPayment` - Driver settlements
- `RateHistory` - Lane rates

---

## 🔄 Webhooks

### Stripe Webhooks
```
POST /api/webhooks/stripe/credtegy
POST /api/webhooks/stripe/logademy
```

### TELNYX Webhooks
```
POST /api/webhooks/telnyx/credtegy
POST /api/webhooks/telnyx/logademy
```

### DocuSign Webhooks
```
POST /api/webhooks/docusign
```

---

## 📊 Products & Pricing

### Credtegy
| Product | Price | Type |
|---------|-------|------|
| Trucking Business eBook | $27 | One-time |
| Monthly Mentorship | $47/mo | Subscription |
| 1-on-1 Consultation | $150 | One-time |

### Logademy
| Service | Pricing |
|---------|---------|
| Freight Hauling | Per load (flat/per mile) |
| Fuel Surcharge | Variable |
| Accessorials | Tarping $75, Liftgate $50, etc. |

---

## 🛡️ Security

- JWT authentication with refresh tokens
- Role-based access control (RBAC)
- Business isolation (multi-tenant)
- Rate limiting
- Input validation (Joi)
- SQL injection prevention (Prisma)
- CORS configuration

---

## 📝 Environment Variables

See `.env.template` for all required variables:

- Database: `DATABASE_URL`, `DIRECT_URL`
- JWT: `JWT_SECRET`, `JWT_REFRESH_SECRET`
- Stripe: Keys for both businesses
- TELNYX: API key and phone numbers
- AWS S3: Credentials and bucket
- DocuSign: Integration keys
- ModuRoute: API key

---

## 🧪 Development

```bash
# Run tests
npm test

# Lint code
npm run lint

# Database studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

---

## 📄 License

Proprietary - Credtegy x Logademy © 2024

---

## 👤 Author

Built by **Shakur Mac** / Credtegy
