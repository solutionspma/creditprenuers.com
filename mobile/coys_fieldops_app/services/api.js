import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'https://api.modcrm.local';
const BUSINESS_ID = Constants.expoConfig?.extra?.businessId || 'BC_COYSLOG_STAGING';

// Demo credentials for testing
const DEMO_USERS = {
  'driver@logademy.com': {
    password: 'test123',
    user: {
      id: 'usr_demo_001',
      name: 'Demo Driver',
      email: 'driver@logademy.com',
      phone: '+15551234567',
      role: 'driver',
      driverId: 'DRV-2024-001',
      truckId: 'TRK-001',
      status: 'active',
    },
    token: 'demo_token_abc123',
  },
};

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'X-Business-ID': BUSINESS_ID,
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      response => response.data,
      error => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            // Handle unauthorized
            console.error('Unauthorized access');
          }
          throw new Error(data.message || 'An error occurred');
        }
        throw new Error('Network error');
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  // Authentication
  async login(email, password) {
    // Demo mode - check local credentials
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      return { user: demoUser.user, token: demoUser.token };
    }
    
    // Production mode - call API
    try {
      return await this.client.post('/auth/login', { email, password });
    } catch (error) {
      // Fallback to demo if API unavailable
      if (demoUser && demoUser.password === password) {
        return { user: demoUser.user, token: demoUser.token };
      }
      throw error;
    }
  }

  async updateProfile(data) {
    return this.client.put('/driver/profile', data);
  }

  // Dashboard
  async getDashboard() {
    return this.client.get('/driver/dashboard');
  }

  // Jobs/Loads
  async getJobs(status = 'all') {
    return this.client.get('/driver/jobs', { params: { status } });
  }

  async getJobDetails(jobId) {
    return this.client.get(`/driver/jobs/${jobId}`);
  }

  async updateJobStatus(jobId, status, data = {}) {
    return this.client.put(`/driver/jobs/${jobId}/status`, { status, ...data });
  }

  async uploadJobDocument(jobId, documentType, file) {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', documentType);
    
    return this.client.post(`/driver/jobs/${jobId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // Location
  async updateLocation(latitude, longitude) {
    return this.client.post('/driver/location', {
      latitude,
      longitude,
      timestamp: new Date().toISOString(),
    });
  }

  // Messages
  async getMessages(since = null) {
    return this.client.get('/driver/messages', { params: { since } });
  }

  async sendMessage(text, attachments = []) {
    return this.client.post('/driver/messages', { text, attachments });
  }

  // Documents
  async getDocuments() {
    return this.client.get('/driver/documents');
  }

  async uploadDocument(type, file) {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type);
    
    return this.client.post('/driver/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // Earnings
  async getEarnings(period = 'week') {
    return this.client.get('/driver/earnings', { params: { period } });
  }

  // Route
  async getRoute(origin, destination) {
    return this.client.get('/routing/directions', {
      params: { origin, destination },
    });
  }

  // Notifications
  async registerPushToken(token) {
    return this.client.post('/driver/push-token', { token });
  }

  async getNotifications() {
    return this.client.get('/driver/notifications');
  }

  async markNotificationRead(notificationId) {
    return this.client.put(`/driver/notifications/${notificationId}/read`);
  }
}

export const api = new ApiService();
