/**
 * TELNYX/ModCellular Communication Adapter
 * Handles SMS, Voice, and messaging for both CreditPreneurs and Coys Logistics
 * 
 * Phone Numbers:
 * - CreditPreneurs: +10000000000 (placeholder)
 * - Coys Logistics: +10000000001 (placeholder)
 */

// TELNYX Configuration - Replace with actual credentials in production
const TELNYX_CONFIG = {
  apiKey: 'KEY01234567890_DUMMY',
  apiSecret: 'SECRET_DUMMY_REPLACE',
  apiUrl: 'https://api.telnyx.com/v2',
  
  businesses: {
    creditprenuers: {
      businessId: 'BC_CREDITPREN_STAGING',
      phoneNumber: '+10000000000',
      messagingProfileId: 'MSG_PROFILE_CREDITPREN',
      displayName: 'CreditPreneurs',
    },
    coyslogistics: {
      businessId: 'BC_COYSLOG_STAGING',
      phoneNumber: '+10000000001',
      messagingProfileId: 'MSG_PROFILE_COYSLOG',
      displayName: 'Coys Logistics',
    },
  },
  
  webhookUrl: 'https://api.modcrm.local/webhooks/telnyx',
};

// Message templates
const MESSAGE_TEMPLATES = {
  creditprenuers: {
    welcome: 'Welcome to CreditPreneurs! 🎉 Your journey to financial freedom starts now. Check your email for your eBook download link.',
    ebookDelivery: 'Your "Build Your Credit Empire" eBook is ready! Download here: {{download_link}}',
    membershipWelcome: 'Welcome to the CreditPreneurs inner circle! 💎 Access your member dashboard here: {{dashboard_link}}',
    mentorshipReminder: 'Hey {{name}}, don\'t forget! Your mentorship call with Coy Mac is scheduled for {{date}} at {{time}}. Join here: {{zoom_link}}',
    fundingUpdate: 'Great news, {{name}}! Your funding application has been moved to: {{stage}}. Next steps: {{action}}',
  },
  coyslogistics: {
    welcome: 'Welcome to Coys Logistics Academy! 🚛 Your dispatch training begins now.',
    loadAlert: '🔔 New load available! {{origin}} → {{destination}} | Rate: {{rate}} | Miles: {{miles}}',
    dispatchUpdate: 'Load {{load_id}} update: {{status}}. Contact dispatch if you have questions.',
    driverETA: 'ETA notification: Driver arriving at {{location}} in approximately {{eta}} minutes.',
    complianceReminder: '⚠️ Reminder: Your {{document}} expires on {{date}}. Please update immediately.',
  },
};

class TelnyxModCellularAdapter {
  constructor() {
    this.config = TELNYX_CONFIG;
    this.templates = MESSAGE_TEMPLATES;
    this.initialized = false;
  }

  /**
   * Initialize the adapter
   */
  async initialize() {
    try {
      // In production, verify API connectivity
      console.log('TELNYX/ModCellular adapter initialized');
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('TELNYX initialization failed:', error);
      return false;
    }
  }

  /**
   * Get business configuration
   */
  getBusinessConfig(business) {
    const config = this.config.businesses[business];
    if (!config) {
      throw new Error(`Unknown business: ${business}`);
    }
    return config;
  }

  /**
   * Send SMS message
   */
  async sendSMS(business, to, message, options = {}) {
    const config = this.getBusinessConfig(business);
    
    const payload = {
      from: config.phoneNumber,
      to: this.formatPhoneNumber(to),
      text: message,
      messaging_profile_id: config.messagingProfileId,
      webhook_url: this.config.webhookUrl,
      ...options,
    };

    console.log(`[${config.displayName}] Sending SMS to ${to}:`, message.substring(0, 50) + '...');
    
    // In production, call TELNYX API
    // const response = await fetch(`${this.config.apiUrl}/messages`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${this.config.apiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    return {
      success: true,
      messageId: `msg_${Date.now()}`,
      from: config.phoneNumber,
      to: payload.to,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Send templated message
   */
  async sendTemplatedMessage(business, to, templateKey, variables = {}) {
    const templateGroup = this.templates[business];
    if (!templateGroup) {
      throw new Error(`No templates for business: ${business}`);
    }

    let template = templateGroup[templateKey];
    if (!template) {
      throw new Error(`Unknown template: ${templateKey}`);
    }

    // Replace variables in template
    Object.entries(variables).forEach(([key, value]) => {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    return this.sendSMS(business, to, template);
  }

  /**
   * Send bulk SMS
   */
  async sendBulkSMS(business, recipients, message) {
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const result = await this.sendSMS(business, recipient, message);
        results.push({ ...result, recipient, status: 'sent' });
      } catch (error) {
        results.push({ recipient, status: 'failed', error: error.message });
      }
    }

    return {
      total: recipients.length,
      sent: results.filter(r => r.status === 'sent').length,
      failed: results.filter(r => r.status === 'failed').length,
      results,
    };
  }

  /**
   * Initiate voice call
   */
  async initiateCall(business, to, options = {}) {
    const config = this.getBusinessConfig(business);
    
    const payload = {
      from: config.phoneNumber,
      to: this.formatPhoneNumber(to),
      connection_id: config.messagingProfileId,
      ...options,
    };

    console.log(`[${config.displayName}] Initiating call to ${to}`);

    return {
      success: true,
      callId: `call_${Date.now()}`,
      from: config.phoneNumber,
      to: payload.to,
      status: 'initiated',
    };
  }

  /**
   * Handle incoming webhook
   */
  handleWebhook(event) {
    const { event_type, data, payload } = event;

    console.log('TELNYX webhook received:', event_type);

    switch (event_type) {
      case 'message.received':
        return this.handleIncomingMessage(payload);
      case 'message.sent':
        return this.handleMessageSent(payload);
      case 'message.finalized':
        return this.handleMessageFinalized(payload);
      case 'call.initiated':
        return this.handleCallInitiated(payload);
      case 'call.answered':
        return this.handleCallAnswered(payload);
      case 'call.hangup':
        return this.handleCallHangup(payload);
      default:
        console.log('Unhandled TELNYX event:', event_type);
        return { handled: false, event_type };
    }
  }

  handleIncomingMessage(payload) {
    console.log('Incoming message from:', payload.from);
    return {
      type: 'incoming_message',
      from: payload.from.phone_number,
      to: payload.to[0]?.phone_number,
      text: payload.text,
      timestamp: payload.received_at,
    };
  }

  handleMessageSent(payload) {
    console.log('Message sent:', payload.id);
    return { type: 'message_sent', messageId: payload.id };
  }

  handleMessageFinalized(payload) {
    console.log('Message finalized:', payload.id, 'Status:', payload.to[0]?.status);
    return {
      type: 'message_finalized',
      messageId: payload.id,
      status: payload.to[0]?.status,
    };
  }

  handleCallInitiated(payload) {
    console.log('Call initiated:', payload.call_control_id);
    return { type: 'call_initiated', callId: payload.call_control_id };
  }

  handleCallAnswered(payload) {
    console.log('Call answered:', payload.call_control_id);
    return { type: 'call_answered', callId: payload.call_control_id };
  }

  handleCallHangup(payload) {
    console.log('Call ended:', payload.call_control_id);
    return {
      type: 'call_hangup',
      callId: payload.call_control_id,
      duration: payload.call_duration_secs,
      reason: payload.hangup_cause,
    };
  }

  /**
   * Format phone number to E.164
   */
  formatPhoneNumber(phone) {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');
    
    // Add country code if missing
    if (cleaned.length === 10) {
      cleaned = '1' + cleaned;
    }
    
    return '+' + cleaned;
  }

  /**
   * Get available templates
   */
  getTemplates(business) {
    return Object.keys(this.templates[business] || {});
  }

  /**
   * Get template preview
   */
  getTemplatePreview(business, templateKey, variables = {}) {
    const templateGroup = this.templates[business];
    if (!templateGroup || !templateGroup[templateKey]) {
      return null;
    }

    let preview = templateGroup[templateKey];
    Object.entries(variables).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    return preview;
  }
}

// Export singleton instance
export const telnyxAdapter = new TelnyxModCellularAdapter();

// Also export class for custom instances
export { TelnyxModCellularAdapter };
