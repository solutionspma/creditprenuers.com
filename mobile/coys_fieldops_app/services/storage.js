import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: '@CoysFieldOps:user',
  TOKEN: '@CoysFieldOps:token',
  SETTINGS: '@CoysFieldOps:settings',
  CACHED_JOBS: '@CoysFieldOps:jobs',
  OFFLINE_QUEUE: '@CoysFieldOps:offlineQueue',
  LAST_LOCATION: '@CoysFieldOps:lastLocation',
};

class StorageService {
  /**
   * Store user data
   */
  async setUser(user) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error storing user:', error);
      return false;
    }
  }

  async getUser() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  /**
   * Store auth token
   */
  async setToken(token) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
      return true;
    } catch (error) {
      console.error('Error storing token:', error);
      return false;
    }
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  /**
   * App settings
   */
  async getSettings() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : this.getDefaultSettings();
    } catch (error) {
      console.error('Error getting settings:', error);
      return this.getDefaultSettings();
    }
  }

  async updateSettings(settings) {
    try {
      const current = await this.getSettings();
      const updated = { ...current, ...settings };
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error updating settings:', error);
      return null;
    }
  }

  getDefaultSettings() {
    return {
      notifications: true,
      locationTracking: true,
      autoUpdates: true,
      darkMode: false,
      distanceUnit: 'miles',
      language: 'en',
      defaultMap: 'google',
    };
  }

  /**
   * Cache jobs for offline access
   */
  async cacheJobs(jobs) {
    try {
      const data = {
        jobs,
        cachedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.CACHED_JOBS, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error caching jobs:', error);
      return false;
    }
  }

  async getCachedJobs() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_JOBS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting cached jobs:', error);
      return null;
    }
  }

  /**
   * Offline action queue (for syncing when back online)
   */
  async addToOfflineQueue(action) {
    try {
      const queue = await this.getOfflineQueue();
      queue.push({
        ...action,
        id: Date.now().toString(),
        queuedAt: new Date().toISOString(),
      });
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
      return true;
    } catch (error) {
      console.error('Error adding to offline queue:', error);
      return false;
    }
  }

  async getOfflineQueue() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting offline queue:', error);
      return [];
    }
  }

  async clearOfflineQueue() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.OFFLINE_QUEUE);
      return true;
    } catch (error) {
      console.error('Error clearing offline queue:', error);
      return false;
    }
  }

  async removeFromOfflineQueue(actionId) {
    try {
      const queue = await this.getOfflineQueue();
      const filtered = queue.filter(item => item.id !== actionId);
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error removing from offline queue:', error);
      return false;
    }
  }

  /**
   * Last known location
   */
  async setLastLocation(location) {
    try {
      const data = {
        ...location,
        timestamp: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error storing location:', error);
      return false;
    }
  }

  async getLastLocation() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  /**
   * Clear all app data (for logout)
   */
  async clearAll() {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Get storage stats (for debugging)
   */
  async getStorageStats() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      const stats = {};

      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        const size = value ? value.length : 0;
        stats[key] = { size, bytes: size };
        totalSize += size;
      }

      return { keys: keys.length, totalSize, stats };
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return null;
    }
  }
}

export const storage = new StorageService();
