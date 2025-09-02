/**
 * Mock Authentication Service
 * 
 * This service simulates authentication API calls using localStorage.
 * When the backend is ready, replace this with RealAuthService that
 * makes actual HTTP requests to your authentication endpoints.
 * 
 * Backend developers: This service demonstrates the expected API interface.
 * Your authentication endpoints should match these method signatures and response formats.
 */

import { MOCK_USERS } from './mockData.js'
import { 
  getStorageItem, 
  setStorageItem, 
  removeStorageItem, 
  STORAGE_KEYS,
  simulateApiDelay,
  generateId,
  isValidEmail
} from '../../utils/storage.js'

export default class MockAuthService {
  constructor() {
    this.initializeMockUsers()
  }

  /**
   * Initialize mock users in localStorage if they don't exist
   */
  initializeMockUsers() {
    const existingUsers = getStorageItem(STORAGE_KEYS.MOCK_USERS, [])
    if (existingUsers.length === 0) {
      setStorageItem(STORAGE_KEYS.MOCK_USERS, MOCK_USERS)
    }
  }

  /**
   * User Login
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Login response
   * 
   * Expected API Response Format:
   * {
   *   success: boolean,
   *   message: string,
   *   token?: string,
   *   user?: Object
   * }
   */
  async login(email, password) {
    await simulateApiDelay()

    try {
      if (!email || !password) {
        return {
          success: false,
          message: 'Email and password are required'
        }
      }

      if (!isValidEmail(email)) {
        return {
          success: false,
          message: 'Please enter a valid email address'
        }
      }

      const users = getStorageItem(STORAGE_KEYS.MOCK_USERS, [])
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

      if (!user) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      if (user.password !== password) {
        return {
          success: false,
          message: 'Invalid password'
        }
      }

      if (!user.is_active) {
        return {
          success: false,
          message: 'Account is deactivated. Please contact support.'
        }
      }

      // Generate mock JWT token
      const token = this.generateMockToken(user)
      
      // Store auth data
      setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token)
      setStorageItem(STORAGE_KEYS.USER_DATA, {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        date_of_birth: user.date_of_birth,
        address: user.address,
        insurance_info: user.insurance_info,
        email_verified: user.email_verified
      })

      return {
        success: true,
        message: 'Login successful',
        token: token,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          date_of_birth: user.date_of_birth,
          address: user.address,
          insurance_info: user.insurance_info,
          email_verified: user.email_verified
        }
      }
    } catch (error) {
      console.error('Mock login error:', error)
      return {
        success: false,
        message: 'Login failed. Please try again.'
      }
    }
  }

  /**
   * User Registration
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration response
   */
  async register(userData) {
    await simulateApiDelay()

    try {
      const { email, password, first_name, last_name, phone } = userData

      // Validation
      if (!email || !password || !first_name || !last_name) {
        return {
          success: false,
          message: 'Email, password, first name, and last name are required'
        }
      }

      if (!isValidEmail(email)) {
        return {
          success: false,
          message: 'Please enter a valid email address'
        }
      }

      if (password.length < 6) {
        return {
          success: false,
          message: 'Password must be at least 6 characters long'
        }
      }

      const users = getStorageItem(STORAGE_KEYS.MOCK_USERS, [])
      
      // Check if user already exists
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return {
          success: false,
          message: 'An account with this email already exists'
        }
      }

      // Create new user
      const newUser = {
        id: generateId(),
        email: email.toLowerCase(),
        password: password, // In real app, this would be hashed
        first_name,
        last_name,
        phone: phone || null,
        date_of_birth: null,
        address: null,
        insurance_info: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true,
        email_verified: true // In real app, would require email verification
      }

      // Add to users
      users.push(newUser)
      setStorageItem(STORAGE_KEYS.MOCK_USERS, users)

      // Generate token and login user
      const token = this.generateMockToken(newUser)
      
      setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token)
      setStorageItem(STORAGE_KEYS.USER_DATA, {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        phone: newUser.phone,
        date_of_birth: newUser.date_of_birth,
        address: newUser.address,
        insurance_info: newUser.insurance_info,
        email_verified: newUser.email_verified
      })

      return {
        success: true,
        message: 'Account created successfully',
        token: token,
        user: {
          id: newUser.id,
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          phone: newUser.phone,
          date_of_birth: newUser.date_of_birth,
          address: newUser.address,
          insurance_info: newUser.insurance_info,
          email_verified: newUser.email_verified
        }
      }
    } catch (error) {
      console.error('Mock registration error:', error)
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      }
    }
  }

  /**
   * Get User Profile
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Profile response
   */
  async getProfile(token) {
    await simulateApiDelay(200) // Shorter delay for profile fetch

    try {
      if (!token || !this.isValidToken(token)) {
        return {
          success: false,
          message: 'Invalid or expired token'
        }
      }

      const userData = getStorageItem(STORAGE_KEYS.USER_DATA)
      if (!userData) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      return {
        success: true,
        user: userData
      }
    } catch (error) {
      console.error('Mock profile fetch error:', error)
      return {
        success: false,
        message: 'Failed to fetch profile'
      }
    }
  }

  /**
   * Update User Profile
   * @param {string} token - Authentication token
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Update response
   */
  async updateProfile(token, profileData) {
    await simulateApiDelay()

    try {
      if (!token || !this.isValidToken(token)) {
        return {
          success: false,
          message: 'Invalid or expired token'
        }
      }

      const currentUser = getStorageItem(STORAGE_KEYS.USER_DATA)
      if (!currentUser) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      // Update user data
      const updatedUser = {
        ...currentUser,
        ...profileData,
        updated_at: new Date().toISOString()
      }

      // Update in localStorage
      setStorageItem(STORAGE_KEYS.USER_DATA, updatedUser)

      // Update in mock users database
      const users = getStorageItem(STORAGE_KEYS.MOCK_USERS, [])
      const userIndex = users.findIndex(u => u.id === currentUser.id)
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...profileData, updated_at: new Date().toISOString() }
        setStorageItem(STORAGE_KEYS.MOCK_USERS, users)
      }

      return {
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser
      }
    } catch (error) {
      console.error('Mock profile update error:', error)
      return {
        success: false,
        message: 'Failed to update profile'
      }
    }
  }

  /**
   * User Logout
   * @returns {Promise<Object>} Logout response
   */
  async logout() {
    await simulateApiDelay(100) // Quick logout

    try {
      removeStorageItem(STORAGE_KEYS.AUTH_TOKEN)
      removeStorageItem(STORAGE_KEYS.USER_DATA)
      removeStorageItem(STORAGE_KEYS.CART_ITEMS)

      return {
        success: true,
        message: 'Logged out successfully'
      }
    } catch (error) {
      console.error('Mock logout error:', error)
      return {
        success: false,
        message: 'Logout failed'
      }
    }
  }

  /**
   * Generate mock JWT token
   * @param {Object} user - User object
   * @returns {string} Mock token
   */
  generateMockToken(user) {
    const payload = {
      user_id: user.id,
      email: user.email,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }
    return btoa(JSON.stringify(payload)) // Simple base64 encoding for mock
  }

  /**
   * Validate mock token
   * @param {string} token - Token to validate
   * @returns {boolean} Is valid
   */
  isValidToken(token) {
    try {
      const payload = JSON.parse(atob(token))
      return payload.exp > Date.now()
    } catch (error) {
      return false
    }
  }

  /**
   * Get current user from token
   * @param {string} token - Authentication token
   * @returns {Object|null} User data or null
   */
  getCurrentUser(token) {
    if (!token || !this.isValidToken(token)) {
      return null
    }
    return getStorageItem(STORAGE_KEYS.USER_DATA)
  }
}