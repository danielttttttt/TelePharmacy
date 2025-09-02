/**
 * Local Storage Utilities
 * 
 * These utilities simulate database persistence using localStorage.
 * They provide a consistent interface for storing and retrieving data
 * that mimics what a real backend database would provide.
 */

/**
 * Storage keys used throughout the application
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'pharmacy_auth_token',
  USER_DATA: 'pharmacy_user_data',
  CART_ITEMS: 'pharmacy_cart_items',
  USER_ORDERS: 'pharmacy_user_orders',
  USER_PREFERENCES: 'pharmacy_user_preferences',
  MOCK_USERS: 'pharmacy_mock_users',
  MOCK_MEDICINES: 'pharmacy_mock_medicines',
  MOCK_ORDERS: 'pharmacy_mock_orders'
}

/**
 * Safely get data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Parsed data or default value
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn(`Error reading from localStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * Safely set data in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} Success status
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`Error writing to localStorage (${key}):`, error)
    return false
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.warn(`Error removing from localStorage (${key}):`, error)
    return false
  }
}

/**
 * Clear all pharmacy-related data from localStorage
 * @returns {boolean} Success status
 */
export const clearAllStorageData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.warn('Error clearing localStorage:', error)
    return false
  }
}

/**
 * Check if localStorage is available
 * @returns {boolean} Availability status
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Generate unique ID for mock data
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Simulate API delay for realistic mock behavior
 * @param {number} ms - Delay in milliseconds (default: 300-800ms)
 * @returns {Promise} Promise that resolves after delay
 */
export const simulateApiDelay = (ms = null) => {
  const delay = ms || Math.floor(Math.random() * 500) + 300 // 300-800ms
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * Create a paginated response structure
 * @param {Array} data - Full data array
 * @param {number} page - Current page (1-based)
 * @param {number} limit - Items per page
 * @returns {Object} Paginated response
 */
export const createPaginatedResponse = (data, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = data.slice(startIndex, endIndex)
  
  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: data.length,
      pages: Math.ceil(data.length / limit),
      has_prev: page > 1,
      has_next: endIndex < data.length
    }
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}