/**
 * Real Pharmacy Service
 * 
 * This service makes actual HTTP requests to your pharmacy endpoints.
 * Backend developers: Implement your pharmacy API to match these method signatures.
 */

import { API_CONFIG, buildApiUrl, getDefaultHeaders } from '../../config/api.js'

export default class RealPharmacyService {
  /**
   * Get pharmacy list
   * Backend Implementation: GET /api/pharmacies
   */
  async getPharmacies(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const url = `${buildApiUrl(API_CONFIG.ENDPOINTS.PHARMACIES.LIST)}?${queryParams}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getDefaultHeaders()
      })

      return await response.json()
    } catch (error) {
      console.error('Real get pharmacies error:', error)
      return {
        success: false,
        message: 'Failed to fetch pharmacies',
        pharmacies: []
      }
    }
  }

  /**
   * Get pharmacy by ID
   * Backend Implementation: GET /api/pharmacies/:id
   */
  async getPharmacyById(pharmacyId) {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PHARMACIES.DETAIL, { id: pharmacyId })
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getDefaultHeaders()
      })

      return await response.json()
    } catch (error) {
      console.error('Real get pharmacy error:', error)
      return {
        success: false,
        message: 'Failed to fetch pharmacy details'
      }
    }
  }

  /**
   * Get nearby pharmacies
   * Backend Implementation: GET /api/pharmacies/nearby?lat=...&lng=...&radius=...
   */
  async getNearbyPharmacies(latitude, longitude, radius = 10) {
    try {
      const queryParams = new URLSearchParams({
        lat: latitude.toString(),
        lng: longitude.toString(),
        radius: radius.toString()
      })
      const url = `${buildApiUrl(API_CONFIG.ENDPOINTS.PHARMACIES.NEARBY)}?${queryParams}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getDefaultHeaders()
      })

      return await response.json()
    } catch (error) {
      console.error('Real get nearby pharmacies error:', error)
      return {
        success: false,
        message: 'Failed to fetch nearby pharmacies',
        pharmacies: []
      }
    }
  }
}