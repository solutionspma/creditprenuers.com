/**
 * Stripe Payment Adapter
 * Handles all payment processing for Credtegy and Logademy
 * 
 * Products/Pricing:
 * Credtegy:
 *   - eBook: $27 one-time
 *   - Membership: $47/month
 *   - White Label Course: $197 or $497
 * 
 * Logademy:
 *   - Dispatch Academy Starter: $197
 *   - Dispatch Academy Pro: $497
 */

// Stripe Configuration - Replace with actual keys in production
const STRIPE_CONFIG = {
  publishableKey: 'pk_test_dummy_key_replace_in_production',
  // Secret key should ONLY be used server-side
  businessConfigs: {
    credtegy: {
      businessId: 'BC_CREDITPREN_STAGING',
      products: {
        ebook: {
          priceId: 'price_ebook_27',
          amount: 2700, // cents
          name: 'Build Your Credit Empire eBook',
          type: 'one_time',
        },
        membership: {
          priceId: 'price_membership_47',
          amount: 4700,
          name: 'Credtegy Monthly Membership',
          type: 'recurring',
          interval: 'month',
        },
        whiteLabelBasic: {
          priceId: 'price_whitelabel_197',
          amount: 19700,
          name: 'White Label Credit Repair Business (Basic)',
          type: 'one_time',
        },
        whiteLabelPro: {
          priceId: 'price_whitelabel_497',
          amount: 49700,
          name: 'White Label Credit Repair Business (Pro)',
          type: 'one_time',
        },
      },
    },
    logademy: {
      businessId: 'BC_COYSLOG_STAGING',
      products: {
        dispatchStarter: {
          priceId: 'price_dispatch_197',
          amount: 19700,
          name: 'Dispatch Academy - Starter',
          type: 'one_time',
        },
        dispatchPro: {
          priceId: 'price_dispatch_497',
          amount: 49700,
          name: 'Dispatch Academy - Pro Bundle',
          type: 'one_time',
        },
      },
    },
  },
};

class StripeAdapter {
  constructor() {
    this.publishableKey = STRIPE_CONFIG.publishableKey;
    this.initialized = false;
  }

  /**
   * Initialize Stripe (client-side)
   */
  async initialize() {
    try {
      // In production, load Stripe.js
      console.log('Stripe adapter initialized');
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Stripe initialization failed:', error);
      return false;
    }
  }

  /**
   * Get product info
   */
  getProduct(business, productKey) {
    const config = STRIPE_CONFIG.businessConfigs[business];
    if (!config) {
      throw new Error(`Unknown business: ${business}`);
    }
    
    const product = config.products[productKey];
    if (!product) {
      throw new Error(`Unknown product: ${productKey}`);
    }
    
    return {
      ...product,
      businessId: config.businessId,
      displayPrice: `$${(product.amount / 100).toFixed(0)}`,
    };
  }

  /**
   * Get all products for a business
   */
  getProducts(business) {
    const config = STRIPE_CONFIG.businessConfigs[business];
    if (!config) {
      throw new Error(`Unknown business: ${business}`);
    }
    
    return Object.entries(config.products).map(([key, product]) => ({
      key,
      ...product,
      businessId: config.businessId,
      displayPrice: `$${(product.amount / 100).toFixed(0)}`,
    }));
  }

  /**
   * Create checkout session (client-side initiation)
   */
  async createCheckoutSession(business, productKey, customerInfo) {
    const product = this.getProduct(business, productKey);
    
    // In production, this would call your backend API
    // which then creates the Stripe checkout session
    const requestBody = {
      priceId: product.priceId,
      businessId: product.businessId,
      mode: product.type === 'recurring' ? 'subscription' : 'payment',
      customerEmail: customerInfo.email,
      customerName: customerInfo.name,
      successUrl: customerInfo.successUrl || `${window.location.origin}/success`,
      cancelUrl: customerInfo.cancelUrl || `${window.location.origin}/cancel`,
      metadata: {
        businessId: product.businessId,
        productKey,
        source: customerInfo.source || 'website',
      },
    };

    console.log('Creating checkout session:', requestBody);
    
    // Return mock session for demo
    return {
      sessionId: `cs_demo_${Date.now()}`,
      url: `https://checkout.stripe.com/demo/${Date.now()}`,
    };
  }

  /**
   * Create subscription
   */
  async createSubscription(business, productKey, customerInfo) {
    const product = this.getProduct(business, productKey);
    
    if (product.type !== 'recurring') {
      throw new Error('Product is not a subscription');
    }

    return this.createCheckoutSession(business, productKey, customerInfo);
  }

  /**
   * Get customer portal URL (for managing subscriptions)
   */
  async getCustomerPortalUrl(customerId, returnUrl) {
    // In production, call backend to create portal session
    console.log('Creating customer portal session for:', customerId);
    
    return {
      url: `https://billing.stripe.com/demo/portal/${customerId}`,
    };
  }

  /**
   * Handle webhook events (server-side only)
   */
  handleWebhookEvent(event) {
    const { type, data } = event;
    
    switch (type) {
      case 'checkout.session.completed':
        return this.handleCheckoutComplete(data.object);
      case 'invoice.paid':
        return this.handleInvoicePaid(data.object);
      case 'invoice.payment_failed':
        return this.handlePaymentFailed(data.object);
      case 'customer.subscription.deleted':
        return this.handleSubscriptionCanceled(data.object);
      default:
        console.log('Unhandled webhook event:', type);
    }
  }

  handleCheckoutComplete(session) {
    console.log('Checkout completed:', session.id);
    // Trigger fulfillment, send email, update CRM, etc.
    return {
      action: 'fulfill_order',
      sessionId: session.id,
      customerId: session.customer,
      metadata: session.metadata,
    };
  }

  handleInvoicePaid(invoice) {
    console.log('Invoice paid:', invoice.id);
    return {
      action: 'extend_access',
      invoiceId: invoice.id,
      customerId: invoice.customer,
      subscriptionId: invoice.subscription,
    };
  }

  handlePaymentFailed(invoice) {
    console.log('Payment failed:', invoice.id);
    return {
      action: 'notify_customer',
      invoiceId: invoice.id,
      customerId: invoice.customer,
      nextPaymentAttempt: invoice.next_payment_attempt,
    };
  }

  handleSubscriptionCanceled(subscription) {
    console.log('Subscription canceled:', subscription.id);
    return {
      action: 'revoke_access',
      subscriptionId: subscription.id,
      customerId: subscription.customer,
    };
  }
}

// Export singleton instance
export const stripeAdapter = new StripeAdapter();

// Also export class for custom instances
export { StripeAdapter };
