# CreditPreneurs x Koiz Logistics Platform

A dual-industry CRM-powered platform built on ModCRM, featuring:
- **CreditPreneurs** - Credit repair and funding mentorship (creditprenuers.com)
- **Coys Logistics** - Trucking/dispatch training and fleet management (coyslogistics.com)

## 🏗️ Project Structure

```
├── containers/                 # ModCRM Business Container Configurations
│   ├── creditprenuers/        # CreditPreneurs CRM config
│   │   ├── config.json        # Business settings
│   │   ├── modules.json       # Enabled modules
│   │   ├── pipelines.json     # Sales/funding pipelines
│   │   └── automation.json    # Automation workflows
│   └── coyslogistics/         # Coys Logistics CRM config
│       ├── config.json        # Business settings
│       ├── modules.json       # Enabled modules
│       ├── pipelines.json     # Training/freight pipelines
│       └── automation.json    # Automation workflows
│
├── web/                        # Next.js Web Applications
│   ├── creditprenuers.com/    # CreditPreneurs website
│   │   ├── src/pages/         # Page components
│   │   ├── src/components/    # React components
│   │   └── public/            # Static assets
│   └── coyslogistics.com/     # Coys Logistics website
│       ├── src/pages/         # Page components
│       ├── src/components/    # React components
│       └── public/            # Static assets
│
├── mobile/                     # React Native Mobile App
│   └── coys_fieldops_app/     # Driver/Fleet mobile app
│       ├── screens/           # App screens
│       ├── services/          # API & adapters
│       └── context/           # App state management
│
├── services/                   # Shared Services
│   ├── adapters/              # Third-party integrations
│   │   ├── stripeAdapter.js   # Stripe payments
│   │   └── telnyxAdapter.js   # TELNYX SMS/Voice
│   ├── automation/            # Automation configs
│   │   └── leadflows.json     # Lead routing flows
│   └── leadRouter.js          # Pitch Marketing integration
│
└── scripts/                    # Deployment Scripts
    ├── deploy-web.sh          # Web deployment
    └── deploy-mobile.sh       # Mobile app build/deploy
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (for mobile)
- Git

### Setup

1. **Clone and install:**
```bash
cd creditprenuers.com
cp .env.example .env
# Edit .env with your API keys
```

2. **CreditPreneurs Website:**
```bash
cd web/creditprenuers.com
npm install
npm run dev    # Development
npm run build  # Production build
```

3. **Coys Logistics Website:**
```bash
cd web/coyslogistics.com
npm install
npm run dev    # Development (port 3001)
npm run build  # Production build
```

4. **Mobile App:**
```bash
cd mobile/coys_fieldops_app
npm install
npx expo start  # Development
```

## 💳 Pricing Structure

### CreditPreneurs
| Product | Price |
|---------|-------|
| eBook: "Build Your Credit Empire" | $27 |
| Monthly Membership | $47/mo |
| White Label Course (Basic) | $197 |
| White Label Course (Pro) | $497 |

### Coys Logistics
| Product | Price |
|---------|-------|
| Dispatch Academy - Starter | $197 |
| Dispatch Academy - Pro Bundle | $497 |

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:
- Stripe API keys
- TELNYX credentials
- FTP/SSH deployment credentials
- ModCRM API settings

### Demo Credentials
Mobile app test login:
- Email: `driver@coyslogistics.com`
- Password: `test123`

## 📦 Deployment

### Web Apps (GoDaddy/Ionos)
```bash
# Deploy all sites
./scripts/deploy-web.sh --all

# Deploy specific site
./scripts/deploy-web.sh creditprenuers

# Build only (no deploy)
./scripts/deploy-web.sh -b --all
```

### Mobile App (Expo)
```bash
# Development server
./scripts/deploy-mobile.sh -d

# Build Android
./scripts/deploy-mobile.sh -b --android

# Build iOS
./scripts/deploy-mobile.sh -b --ios

# Publish to Expo
./scripts/deploy-mobile.sh -p
```

## 🔄 Lead Flow Integration

Leads are automatically routed to Pitch Marketing Agency based on:
- Lead score (engagement activities)
- Product interest
- Form submissions

See `services/automation/leadflows.json` for configuration.

## 📱 Mobile App Features

### Coys FieldOps Driver App
- Dashboard with job stats
- Real-time route mapping
- Job/load management
- Dispatch chat
- Document upload
- GPS tracking

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Mobile:** React Native (Expo)
- **Payments:** Stripe
- **Communications:** TELNYX
- **CRM:** ModCRM Platform
- **Maps:** Leaflet (web), React Native Maps (mobile)

## 📝 Business Container IDs

- CreditPreneurs: `BC_CREDITPREN_STAGING`
- Coys Logistics: `BC_COYSLOG_STAGING`

## 👤 Owner

**Shakur "Coy Mac"**  
Pitch Marketing Agency

---

Built with ❤️ for the credit repair and trucking industries.
