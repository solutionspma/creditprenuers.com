// MBOCC Command Center - Integration Services
// Wrappers for third-party integrations

const Stripe = require('stripe');
const telnyx = require('telnyx');
const docusign = require('docusign-esign');
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

// ==========================================
// STRIPE INTEGRATION
// ==========================================

class StripeService {
  constructor(secretKey) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16'
    });
  }

  // Customer Management
  async createCustomer({ email, name, phone, metadata = {} }) {
    return this.stripe.customers.create({
      email,
      name,
      phone,
      metadata
    });
  }

  async getCustomer(customerId) {
    return this.stripe.customers.retrieve(customerId);
  }

  async updateCustomer(customerId, data) {
    return this.stripe.customers.update(customerId, data);
  }

  // Payment Intents
  async createPaymentIntent({ amount, currency = 'usd', customerId, metadata = {} }) {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      customer: customerId,
      metadata,
      automatic_payment_methods: { enabled: true }
    });
  }

  // Subscriptions
  async createSubscription({ customerId, priceId, metadata = {} }) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata
    });
  }

  async cancelSubscription(subscriptionId) {
    return this.stripe.subscriptions.cancel(subscriptionId);
  }

  async getSubscription(subscriptionId) {
    return this.stripe.subscriptions.retrieve(subscriptionId);
  }

  // Invoices
  async createInvoice({ customerId, items, dueDate, metadata = {} }) {
    const invoice = await this.stripe.invoices.create({
      customer: customerId,
      collection_method: 'send_invoice',
      due_date: Math.floor(new Date(dueDate).getTime() / 1000),
      metadata
    });

    // Add line items
    for (const item of items) {
      await this.stripe.invoiceItems.create({
        customer: customerId,
        invoice: invoice.id,
        description: item.description,
        amount: Math.round(item.amount * 100),
        currency: 'usd'
      });
    }

    return this.stripe.invoices.finalizeInvoice(invoice.id);
  }

  async sendInvoice(invoiceId) {
    return this.stripe.invoices.sendInvoice(invoiceId);
  }

  // Products & Prices
  async createProduct({ name, description, metadata = {} }) {
    return this.stripe.products.create({
      name,
      description,
      metadata
    });
  }

  async createPrice({ productId, amount, interval = null }) {
    const priceData = {
      product: productId,
      unit_amount: Math.round(amount * 100),
      currency: 'usd'
    };

    if (interval) {
      priceData.recurring = { interval };
    }

    return this.stripe.prices.create(priceData);
  }

  // Webhook verification
  verifyWebhook(payload, signature, webhookSecret) {
    return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }
}

// ==========================================
// TELNYX INTEGRATION (SMS & Voice)
// ==========================================

class TelnyxService {
  constructor(apiKey) {
    this.telnyx = telnyx(apiKey);
  }

  // SMS
  async sendSms({ from, to, text }) {
    const message = await this.telnyx.messages.create({
      from,
      to,
      text
    });
    return message;
  }

  async sendMms({ from, to, text, mediaUrls }) {
    const message = await this.telnyx.messages.create({
      from,
      to,
      text,
      media_urls: mediaUrls
    });
    return message;
  }

  // Voice Calls
  async makeCall({ from, to, answerUrl }) {
    const call = await this.telnyx.calls.create({
      connection_id: process.env.TELNYX_CONNECTION_ID,
      from,
      to,
      webhook_url: answerUrl
    });
    return call;
  }

  // Phone Number Management
  async listPhoneNumbers() {
    return this.telnyx.phoneNumbers.list();
  }

  async searchPhoneNumbers({ city, state, areaCode }) {
    return this.telnyx.availablePhoneNumbers.list({
      filter: {
        country_code: 'US',
        administrative_area: state,
        locality: city,
        national_destination_code: areaCode
      }
    });
  }

  // Webhook verification
  verifyWebhook(payload, signature, publicKey) {
    // TELNYX webhook verification logic
    return true; // Simplified for this example
  }
}

// ==========================================
// DOCUSIGN INTEGRATION
// ==========================================

class DocuSignService {
  constructor(integrationKey, userId, accountId, rsaPrivateKey) {
    this.integrationKey = integrationKey;
    this.userId = userId;
    this.accountId = accountId;
    this.rsaPrivateKey = rsaPrivateKey;
    this.baseUrl = process.env.DOCUSIGN_BASE_URL || 'https://na4.docusign.net';
  }

  async getAccessToken() {
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(this.baseUrl);
    
    const results = await apiClient.requestJWTUserToken(
      this.integrationKey,
      this.userId,
      ['signature', 'impersonation'],
      this.rsaPrivateKey,
      3600
    );
    
    return results.body.access_token;
  }

  async createEnvelope({ signerEmail, signerName, documentBase64, documentName, subject }) {
    const accessToken = await this.getAccessToken();
    
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(this.baseUrl);
    apiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);

    const envelopesApi = new docusign.EnvelopesApi(apiClient);

    const envelope = {
      emailSubject: subject,
      documents: [{
        documentBase64,
        name: documentName,
        fileExtension: 'pdf',
        documentId: '1'
      }],
      recipients: {
        signers: [{
          email: signerEmail,
          name: signerName,
          recipientId: '1',
          routingOrder: '1',
          tabs: {
            signHereTabs: [{
              anchorString: '/sn1/',
              anchorUnits: 'pixels',
              anchorXOffset: '20',
              anchorYOffset: '10'
            }],
            dateSignedTabs: [{
              anchorString: '/ds1/',
              anchorUnits: 'pixels',
              anchorXOffset: '20',
              anchorYOffset: '10'
            }]
          }
        }]
      },
      status: 'sent'
    };

    const results = await envelopesApi.createEnvelope(this.accountId, { envelopeDefinition: envelope });
    return results;
  }

  async getEnvelopeStatus(envelopeId) {
    const accessToken = await this.getAccessToken();
    
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(this.baseUrl);
    apiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);

    const envelopesApi = new docusign.EnvelopesApi(apiClient);
    return envelopesApi.getEnvelope(this.accountId, envelopeId);
  }

  async downloadDocument(envelopeId, documentId = 'combined') {
    const accessToken = await this.getAccessToken();
    
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(this.baseUrl);
    apiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);

    const envelopesApi = new docusign.EnvelopesApi(apiClient);
    return envelopesApi.getDocument(this.accountId, envelopeId, documentId);
  }
}

// ==========================================
// AWS S3 INTEGRATION
// ==========================================

class S3Service {
  constructor(accessKeyId, secretAccessKey, region, bucket) {
    this.s3 = new AWS.S3({
      accessKeyId,
      secretAccessKey,
      region
    });
    this.bucket = bucket;
  }

  async upload({ key, body, contentType, acl = 'private' }) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      ACL: acl
    };

    const result = await this.s3.upload(params).promise();
    return result;
  }

  async download(key) {
    const params = {
      Bucket: this.bucket,
      Key: key
    };

    return this.s3.getObject(params).promise();
  }

  async delete(key) {
    const params = {
      Bucket: this.bucket,
      Key: key
    };

    return this.s3.deleteObject(params).promise();
  }

  async getSignedUrl(key, expiresIn = 3600) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Expires: expiresIn
    };

    return this.s3.getSignedUrlPromise('getObject', params);
  }

  async listObjects(prefix) {
    const params = {
      Bucket: this.bucket,
      Prefix: prefix
    };

    return this.s3.listObjectsV2(params).promise();
  }
}

// ==========================================
// EMAIL SERVICE (NODEMAILER)
// ==========================================

class EmailService {
  constructor(config) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });
    this.from = config.from;
  }

  async send({ to, subject, text, html, attachments = [] }) {
    const mailOptions = {
      from: this.from,
      to,
      subject,
      text,
      html,
      attachments
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendTemplate({ to, subject, template, data }) {
    // Simple template replacement
    let html = template;
    for (const [key, value] of Object.entries(data)) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return this.send({ to, subject, html, text: html.replace(/<[^>]*>/g, '') });
  }

  async verify() {
    return this.transporter.verify();
  }
}

// ==========================================
// MODUROUTE GPS INTEGRATION
// ==========================================

class ModuRouteService {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || 'https://api.moduroute.com/v1';
  }

  async makeRequest(endpoint, method = 'GET', body = null) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      ...(body && { body: JSON.stringify(body) })
    });

    if (!response.ok) {
      throw new Error(`ModuRoute API error: ${response.status}`);
    }

    return response.json();
  }

  async getVehicles() {
    return this.makeRequest('/vehicles');
  }

  async getVehicle(vehicleId) {
    return this.makeRequest(`/vehicles/${vehicleId}`);
  }

  async getVehicleLocation(vehicleId) {
    return this.makeRequest(`/vehicles/${vehicleId}/location`);
  }

  async getVehicleHistory(vehicleId, startDate, endDate) {
    const params = new URLSearchParams({
      start: startDate.toISOString(),
      end: endDate.toISOString()
    });
    return this.makeRequest(`/vehicles/${vehicleId}/history?${params}`);
  }

  async createGeofence({ name, lat, lng, radius }) {
    return this.makeRequest('/geofences', 'POST', {
      name,
      center: { lat, lng },
      radius
    });
  }

  async getAlerts() {
    return this.makeRequest('/alerts');
  }
}

// ==========================================
// SERVICE FACTORY
// ==========================================

const createServices = (config) => {
  const services = {};

  if (config.stripe?.secretKey) {
    services.stripe = new StripeService(config.stripe.secretKey);
  }

  if (config.telnyx?.apiKey) {
    services.telnyx = new TelnyxService(config.telnyx.apiKey);
  }

  if (config.docusign?.integrationKey) {
    services.docusign = new DocuSignService(
      config.docusign.integrationKey,
      config.docusign.userId,
      config.docusign.accountId,
      config.docusign.rsaPrivateKey
    );
  }

  if (config.aws?.accessKeyId) {
    services.s3 = new S3Service(
      config.aws.accessKeyId,
      config.aws.secretAccessKey,
      config.aws.region,
      config.aws.bucket
    );
  }

  if (config.email?.host) {
    services.email = new EmailService(config.email);
  }

  if (config.moduroute?.apiKey) {
    services.moduroute = new ModuRouteService(
      config.moduroute.apiKey,
      config.moduroute.baseUrl
    );
  }

  return services;
};

module.exports = {
  StripeService,
  TelnyxService,
  DocuSignService,
  S3Service,
  EmailService,
  ModuRouteService,
  createServices
};
