/**
 * Real Authentication Service
 * 
 * This service makes actual HTTP requests to your authentication endpoints.
 * Backend developers: Implement your authentication API to match these method signatures.
 * 
 * To use this service:
 * 1. Set USE_MOCK_SERVICES to false in config/api.js
 * 2. Update BASE_URL to point to your backend API
 * 3. Ensure your endpoints match the expected request/response formats
 */

import { API_CONFIG, buildApiUrl, getDefaultHeaders } from '../../config/api.js'

export default class RealAuthService {
  /**
   * User Login
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Login response
   * 
   * Backend Implementation:
   * POST /api/auth/login
   * Request Body: { email: string, password: string }
   * Response: { success: boolean, message: string, token?: string, user?: Object }
   */
  async login(email, password) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        // Store token in localStorage (same as mock service)
        if (data.token) {
          localStorage.setItem('pharmacy_auth_token', data.token)
        }
        if (data.user) {
          localStorage.setItem('pharmacy_user_data', JSON.stringify(data.user))
        }
      }

      return data
    } catch (error) {
      console.error('Real login error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.'
      }
    }
  }

  /**
   * User Registration
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration response
   * 
   * Backend Implementation:
   * POST /api/auth/register
   * Request Body: { email, password, first_name, last_name, phone? }
   * Response: { success: boolean, message: string, token?: string, user?: Object }
   */
  async register(userData) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (response.ok) {
        // Store token in localStorage (same as mock service)
        if (data.token) {
          localStorage.setItem('pharmacy_auth_token', data.token)
        }
        if (data.user) {
          localStorage.setItem('pharmacy_user_data', JSON.stringify(data.user))
        }
      }

      return data
    } catch (error) {
      console.error('Real registration error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.'
      }
    }
  }

  /**
   * Get User Profile
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Profile response
   * 
   * Backend Implementation:
   * GET /api/auth/profile
   * Headers: { Authorization: "Bearer {token}" }
   * Response: { success: boolean, user?: Object, message?: string }
   */
  async getProfile(token) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        method: 'GET',
        headers: getDefaultHeaders(token)
      })

      const data = await response.json()

      if (response.ok && data.user) {
        // Update stored user data
        localStorage.setItem('pharmacy_user_data', JSON.stringify(data.user))
      } else if (response.status === 401) {
        // Token is invalid, clear stored data
        localStorage.removeItem('pharmacy_auth_token')
        localStorage.removeItem('pharmacy_user_data')
      }

      return data
    } catch (error) {
      console.error('Real profile fetch error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.'
      }
    }
  }

  /**
   * Update User Profile
   * @param {string} token - Authentication token
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Update response
   * 
   * Backend Implementation:
   * PUT /api/auth/profile
   * Headers: { Authorization: "Bearer {token}" }
   * Request Body: { first_name?, last_name?, phone?, address?, etc. }
   * Response: { success: boolean, message: string, user?: Object }
   */
  async updateProfile(token, profileData) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        method: 'PUT',
        headers: getDefaultHeaders(token),
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (response.ok && data.user) {
        // Update stored user data
        localStorage.setItem('pharmacy_user_data', JSON.stringify(data.user))
      }

      return data
    } catch (error) {
      console.error('Real profile update error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.'
      }
    }
  }

  /**
   * User Logout
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Logout response
   * 
   * Backend Implementation:
   * POST /api/auth/logout
   * Headers: { Authorization: "Bearer {token}" }
   * Response: { success: boolean, message: string }
   */
  async logout(token) {
    try {
      // Clear local storage immediately
      localStorage.removeItem('pharmacy_auth_token')
      localStorage.removeItem('pharmacy_user_data')
      localStorage.removeItem('pharmacy_cart_items')

      // Optional: Notify backend about logout (for token blacklisting)
      if (token) {
        await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT), {
          method: 'POST',
          headers: getDefaultHeaders(token)
        })
      }

      return {
        success: true,
        message: 'Logged out successfully'
      }
    } catch (error) {
      console.error('Real logout error:', error)
      // Still return success since local data is cleared
      return {
        success: true,
        message: 'Logged out successfully'
      }
    }
  }

  /**
   * Get current user from localStorage
   * @returns {Object|null} User data or null
   */
  getCurrentUser() {
    try {
      const userData = localStorage.getItem('pharmacy_user_data')
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      return null
    }
  }

  /**
   * Get current token from localStorage
   * @returns {string|null} Token or null
   */
  getCurrentToken() {
    return localStorage.getItem('pharmacy_auth_token')
  }
}