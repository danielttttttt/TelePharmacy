/**
 * API Configuration
 * 
 * This file controls whether the app uses mock services (for frontend-only development)
 * or real API services (when backend is available).
 * 
 * Backend developers: Set USE_MOCK_SERVICES to false and update BASE_URL
 * to point to your backend API endpoint.
 */

// Environment configuration
export const API_CONFIG = {
  // Set to false when backend is ready
  USE_MOCK_SERVICES: true,
  
  // Backend API base URL (update this when backend is deployed)
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  
  // API endpoints (these should match your backend routes)
  ENDPOINTS: {
    // Authentication endpoints
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      PROFILE: '/api/auth/profile',
      LOGOUT: '/api/auth/logout'
    },
    
    // Medicine endpoints
    MEDICINES: {
      LIST: '/api/medicines',
      DETAIL: '/api/medicines/:id',
      CATEGORIES: '/api/medicines/categories',
      SEARCH: '/api/medicines/search'
    },
    
    // Cart endpoints
    CART: {
      GET: '/api/cart',
      ADD: '/api/cart',
      UPDATE: '/api/cart/:id',
      REMOVE: '/api/cart/:id',
      CLEAR: '/api/cart'
    },
    
    // Order endpoints
    ORDERS: {
      LIST: '/api/orders',
      DETAIL: '/api/orders/:id',
      CREATE: '/api/orders',
      CANCEL: '/api/orders/:id/cancel'
    },
    
    // Pharmacy endpoints
    PHARMACIES: {
      LIST: '/api/pharmacies',
      DETAIL: '/api/pharmacies/:id',
      NEARBY: '/api/pharmacies/nearby'
    }
  }
}

/**
 * Helper function to build full API URLs
 * @param {string} endpoint - Endpoint path
 * @param {object} params - URL parameters to replace
 * @returns {string} Full API URL
 */
export const buildApiUrl = (endpoint, params = {}) => {
  let url = endpoint
  
  // Replace URL parameters (e.g., :id with actual id)
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value)
  })
  
  return API_CONFIG.USE_MOCK_SERVICES ? url : `${API_CONFIG.BASE_URL}${url}`
}

/**
 * Default headers for API requests
 * Backend developers: Ensure your API accepts these headers
 */
export const getDefaultHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}