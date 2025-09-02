/**
 * Real Medicine Service
 * 
 * This service makes actual HTTP requests to your medicine endpoints.
 * Backend developers: Implement your medicine API to match these method signatures.
 */

import { API_CONFIG, buildApiUrl, getDefaultHeaders } from '../../config/api.js'

export default class RealMedicineService {
  /**
   * Get medicine list with search, filtering, and pagination
   * Backend Implementation: GET /api/medicines?search=...&category=...&page=...
   */
  async getMedicines(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const url = `${buildApiUrl(API_CONFIG.ENDPOINTS.MEDICINES.LIST)}?${queryParams}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getDefaultHeaders()
      })

      return await response.json()
    } catch (error) {
      console.error('Real medicine list error:', error)
      return {
        success: false,
        message: 'Failed to fetch medicines',
        medicines: [],
        pagination: { page: 1, limit: 12, total: 0, pages: 0, has_prev: false, has_next: false }
      }
    }
  }

  /**
   * Get medicine by ID
   * Backend Implementation: GET /api/medicines/:id
   */
  async getMedicineById(medicineId) {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.MEDICINES.DETAIL, { id: medicineId })
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getDefaultHeaders()
      })

      return await response.json()
    } catch (error) {
      console.error('Real medicine detail error:', error)
      return {
        success: false,
        message: 'Failed to fetch medicine details'
      }
    }
  }

  /**
   * Get medicine categories
   * Backend Implementation: GET /api/medicines/categories
   */
  async getCategories() {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.MEDICINES.CATEGORIES), {
        method: 'GET',
        headers: getDefaultHeaders()
      })

      return await response.json()
    } catch (error) {
      console.error('Real categories error:', error)
      return {
        success: false,
        message: 'Failed to fetch categories',
        categories: []
      }
    }
  }

  /**
   * Search medicines
   * Backend Implementation: GET /api/medicines/search?q=...&limit=...
   */
  async searchMedicines(query, limit = 10) {
    try {
      const queryParams = new URLSearchParams({ q: query, limit: limit.toString() })
      const url = `${buildApiUrl(API_CONFIG.ENDPOINTS.MEDICINES.SEARCH)}?${queryParams}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getDefaultHeaders()
      })

      return await response.json()
    } catch (error) {
      console.error('Real search error:', error)
      return {
        success: false,
        message: 'Search failed',
        medicines: []
      }
    }
  }
}