/**
 * Lead Router Service
 * Routes qualified leads to Pitch Marketing Agency CRM
 * Handles both CreditPreneurs and Coys Logistics lead flows
 */

// Pitch Marketing Configuration
const PITCH_MARKETING_CONFIG = {
  apiUrl: 'https://api.pitchmarketingagency.com',
  apiKey: 'PITCH_API_KEY_REPLACE',
  webhookSecret: 'WEBHOOK_SECRET_REPLACE',
  
  leadTypes: {
    creditprenuers: {
      highValue: {
        // Leads with high engagement or purchase intent
        minScore: 70,
        tags: ['high-value', 'creditprenuers', 'qualified'],
        assignTo: 'credit-team',
      },
      membership: {
        // Membership subscription leads
        tags: ['membership-interest', 'creditprenuers'],
        assignTo: 'membership-team',
      },
      whiteLabelPartner: {
        // B2B white label partners
        minScore: 80,
        tags: ['white-label', 'b2b-partner', 'creditprenuers'],
        assignTo: 'partnerships-team',
        priority: 'high',
      },
    },
    coyslogistics: {
      dispatchTraining: {
        // Dispatch academy prospects
        tags: ['dispatch-training', 'coyslogistics'],
        assignTo: 'dispatch-team',
      },
      fleetOwner: {
        // Fleet owner/trucking business leads
        minScore: 75,
        tags: ['fleet-owner', 'coyslogistics', 'b2b'],
        assignTo: 'fleet-team',
        priority: 'high',
      },
      driverRecruit: {
        // Individual driver leads
        tags: ['driver', 'coyslogistics'],
        assignTo: 'driver-team',
      },
    },
  },
};

// Lead scoring criteria
const SCORING_CRITERIA = {
  creditprenuers: {
    // Engagement scoring
    ebookDownload: 15,
    videoWatched: 10,
    formSubmit: 20,
    pageVisit: 5,
    emailOpen: 5,
    emailClick: 10,
    
    // Purchase intent scoring
    pricingPageVisit: 15,
    membershipInterest: 25,
    whiteLabelInquiry: 35,
    
    // Demo requests
    callBooked: 30,
    chatInitiated: 10,
  },
  coyslogistics: {
    // Engagement scoring
    academyPageVisit: 10,
    videoWatched: 10,
    formSubmit: 20,
    
    // Purchase intent scoring
    courseInterest: 25,
    fleetInquiry: 35,
    
    // App downloads
    appDownload: 20,
    appActive: 30,
  },
};

class LeadRouterService {
  constructor() {
    this.config = PITCH_MARKETING_CONFIG;
    this.scoring = SCORING_CRITERIA;
  }

  /**
   * Calculate lead score based on activities
   */
  calculateScore(business, activities) {
    const criteria = this.scoring[business];
    if (!criteria) return 0;

    let score = 0;
    activities.forEach(activity => {
      if (criteria[activity.type]) {
        score += criteria[activity.type] * (activity.count || 1);
      }
    });

    return Math.min(score, 100); // Cap at 100
  }

  /**
   * Qualify and categorize lead
   */
  qualifyLead(business, lead, activities) {
    const score = this.calculateScore(business, activities);
    const leadTypes = this.config.leadTypes[business];
    
    // Determine lead type based on score and activities
    let leadType = 'general';
    let matchedConfig = null;

    for (const [type, config] of Object.entries(leadTypes)) {
      if (config.minScore && score >= config.minScore) {
        leadType = type;
        matchedConfig = config;
        break;
      }
      
      // Check for specific activity matches
      const hasMatchingActivity = activities.some(a => 
        config.tags?.some(tag => a.type.toLowerCase().includes(tag.split('-')[0]))
      );
      
      if (hasMatchingActivity) {
        leadType = type;
        matchedConfig = config;
      }
    }

    return {
      ...lead,
      score,
      leadType,
      qualified: score >= 50,
      config: matchedConfig,
      qualifiedAt: new Date().toISOString(),
    };
  }

  /**
   * Route lead to Pitch Marketing CRM
   */
  async routeToPitchMarketing(business, lead, activities) {
    const qualifiedLead = this.qualifyLead(business, lead, activities);
    
    if (!qualifiedLead.qualified) {
      console.log('Lead not qualified for routing:', qualifiedLead.score);
      return { routed: false, reason: 'score_too_low', score: qualifiedLead.score };
    }

    const payload = {
      source: business,
      sourceId: lead.id,
      contact: {
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
      },
      leadData: {
        type: qualifiedLead.leadType,
        score: qualifiedLead.score,
        tags: qualifiedLead.config?.tags || [],
        assignTo: qualifiedLead.config?.assignTo,
        priority: qualifiedLead.config?.priority || 'normal',
      },
      activities: activities,
      metadata: {
        routedAt: new Date().toISOString(),
        routedBy: 'modcrm-lead-router',
        businessId: business === 'creditprenuers' ? 'BC_CREDITPREN_STAGING' : 'BC_COYSLOG_STAGING',
      },
    };

    console.log('Routing lead to Pitch Marketing:', payload);

    // In production, call Pitch Marketing API
    // const response = await fetch(`${this.config.apiUrl}/leads`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${this.config.apiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    return {
      routed: true,
      leadId: `pitch_${Date.now()}`,
      score: qualifiedLead.score,
      type: qualifiedLead.leadType,
      assignedTo: qualifiedLead.config?.assignTo,
    };
  }

  /**
   * Process webhook from ModCRM
   */
  async processModCRMWebhook(event) {
    const { type, business, data } = event;

    switch (type) {
      case 'contact.created':
        return this.handleNewContact(business, data);
      case 'form.submitted':
        return this.handleFormSubmission(business, data);
      case 'payment.completed':
        return this.handlePaymentCompleted(business, data);
      case 'pipeline.stage_changed':
        return this.handleStageChange(business, data);
      default:
        console.log('Unhandled webhook type:', type);
    }
  }

  async handleNewContact(business, contact) {
    // Initial lead with basic activities
    const activities = [{ type: 'formSubmit', count: 1 }];
    
    if (contact.source === 'landing_page') {
      activities.push({ type: 'pageVisit', count: 1 });
    }

    return this.routeToPitchMarketing(business, contact, activities);
  }

  async handleFormSubmission(business, submission) {
    const activities = [
      { type: 'formSubmit', count: 1 },
      { type: submission.formType, count: 1 },
    ];

    // Add specific activities based on form type
    if (submission.formType.includes('membership') || submission.formType.includes('pricing')) {
      activities.push({ type: 'membershipInterest', count: 1 });
    }

    if (submission.formType.includes('white_label') || submission.formType.includes('partner')) {
      activities.push({ type: 'whiteLabelInquiry', count: 1 });
    }

    return this.routeToPitchMarketing(business, submission.contact, activities);
  }

  async handlePaymentCompleted(business, payment) {
    // High-value lead - already converted
    const contact = payment.customer;
    const activities = [
      { type: 'formSubmit', count: 1 },
      { type: 'pricingPageVisit', count: 1 },
      { type: payment.productType, count: 1 },
    ];

    // Automatically qualified
    activities.push({ type: 'callBooked', count: 2 }); // Boost score

    return this.routeToPitchMarketing(business, contact, activities);
  }

  async handleStageChange(business, pipelineData) {
    const { contact, fromStage, toStage, pipeline } = pipelineData;
    
    // Only route on specific stage transitions
    const highValueStages = ['qualified', 'hot_lead', 'ready_to_close'];
    
    if (highValueStages.includes(toStage)) {
      const activities = [
        { type: 'formSubmit', count: 1 },
        { type: 'pricingPageVisit', count: 1 },
        { type: 'membershipInterest', count: 1 },
      ];

      return this.routeToPitchMarketing(business, contact, activities);
    }

    return { routed: false, reason: 'stage_not_qualifying' };
  }

  /**
   * Sync lead status back to ModCRM
   */
  async syncStatusToModCRM(pitchLeadId, status) {
    console.log('Syncing status to ModCRM:', pitchLeadId, status);
    
    // In production, update ModCRM contact/pipeline
    return {
      synced: true,
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const leadRouter = new LeadRouterService();

// Also export class for custom instances
export { LeadRouterService };
