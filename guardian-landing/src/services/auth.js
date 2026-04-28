import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/auth';

// Configure axios to send credentials (cookies)
axios.defaults.withCredentials = true;

// Add a response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying and not the refresh request itself
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/refresh')) {
      originalRequest._retry = true;
      
      // Attempt to refresh token
      const success = await authService.refreshToken();
      if (success) {
        // Retry the original request
        return axios(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * Authentication Service
 * Handles Google, Apple, and session management via Backend API.
 */

export const authService = {
  /**
   * Google Sign-In Callback
   */
  async googleCallback(code, codeVerifier) {
    try {
      const response = await axios.post(`${API_URL}/google/callback`, { code, codeVerifier });
      return { success: true, user: response.data.user };
    } catch (error) {
      console.error('Google callback error:', error);
      return { success: false, error: error.response?.data?.error || 'Google authentication failed' };
    }
  },

  /**
   * Apple Sign-In Callback
   */
  async appleCallback(authData) {
    try {
      const response = await axios.post(`${API_URL}/apple/callback`, authData);
      return { success: true, user: response.data.user };
    } catch (error) {
      console.error('Apple callback error:', error);
      return { success: false, error: error.response?.data?.error || 'Apple authentication failed' };
    }
  },

  /**
   * Get Current Session
   */
  async getSession() {
    try {
      const response = await axios.get(`${API_URL}/session`);
      return { success: true, user: response.data.user };
    } catch (error) {
      return { success: false, error: 'No active session' };
    }
  },

  /**
   * Refresh Token
   */
  async refreshToken() {
    try {
      await axios.post(`${API_URL}/refresh`);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },

  /**
   * Logout
   */
  async logout() {
    try {
      await axios.post(`${API_URL}/logout`);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false };
    }
  },

  /**
   * PKCE Helper: Generate Code Verifier and Challenge
   */
  async generatePKCE() {
    const encoder = new TextEncoder();
    const data = crypto.getRandomValues(new Uint8Array(32));
    const codeVerifier = btoa(String.fromCharCode(...data))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(codeVerifier));
    const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    return { codeVerifier, codeChallenge };
  },

  /**
   * CSRF Helper: Generate State
   */
  generateState() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
};
