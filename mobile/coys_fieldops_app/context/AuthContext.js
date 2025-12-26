import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  async function loadStoredAuth() {
    try {
      const storedUser = await AsyncStorage.getItem('@CoysFieldOps:user');
      const storedToken = await AsyncStorage.getItem('@CoysFieldOps:token');
      
      if (storedUser && storedToken) {
        api.setAuthToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email, password) {
    try {
      // In production, this would call the ModCRM API
      const response = await api.login(email, password);
      
      const { user, token } = response;
      
      await AsyncStorage.setItem('@CoysFieldOps:user', JSON.stringify(user));
      await AsyncStorage.setItem('@CoysFieldOps:token', token);
      
      api.setAuthToken(token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem('@CoysFieldOps:user');
      await AsyncStorage.removeItem('@CoysFieldOps:token');
      api.setAuthToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async function updateProfile(data) {
    try {
      const response = await api.updateProfile(data);
      const updatedUser = { ...user, ...response };
      
      await AsyncStorage.setItem('@CoysFieldOps:user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
