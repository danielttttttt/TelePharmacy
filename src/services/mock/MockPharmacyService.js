/**
 * Mock Pharmacy Service
 * 
 * This service simulates pharmacy location API calls using mock data.
 * Backend developers: This demonstrates the expected pharmacy API interface.
 */

import { MOCK_PHARMACIES } from './mockData.js'
import { simulateApiDelay } from '../../utils/storage.js'

export default class MockPharmacyService {
  constructor() {
    this.pharmacies = [...MOCK_PHARMACIES]
  }

  /**
   * Get pharmacy list
   * @param {Object} params - Query parameters (city, state, services)
   * @returns {Promise<Object>} Pharmacies response
   */
  async getPharmacies(params = {}) {
    await simulateApiDelay()

    try {
      let filteredPharmacies = [...this.pharmacies]

      // Filter by city
      if (params.city) {
        filteredPharmacies = filteredPharmacies.filter(pharmacy =>
          pharmacy.address.city.toLowerCase().includes(params.city.toLowerCase())
        )
      }

      // Filter by state
      if (params.state) {
        filteredPharmacies = filteredPharmacies.filter(pharmacy =>
          pharmacy.address.state.toLowerCase() === params.state.toLowerCase()
        )
      }

      // Filter by services
      if (params.service) {
        filteredPharmacies = filteredPharmacies.filter(pharmacy =>
          pharmacy.services.some(service => 
            service.toLowerCase().includes(params.service.toLowerCase())
          )
        )
      }

      // Filter by partner status
      if (params.partner_only === 'true') {
        filteredPharmacies = filteredPharmacies.filter(pharmacy => pharmacy.is_partner)
      }

      // Sort by rating (highest first)
      filteredPharmacies.sort((a, b) => b.rating - a.rating)

      return {
        success: true,
        pharmacies: filteredPharmacies,
        total: filteredPharmacies.length
      }
    } catch (error) {
      console.error('Mock get pharmacies error:', error)
      return {
        success: false,
        message: 'Failed to fetch pharmacies',
        pharmacies: []
      }
    }
  }

  /**
   * Get pharmacy by ID
   * @param {string} pharmacyId - Pharmacy ID
   * @returns {Promise<Object>} Pharmacy response
   */
  async getPharmacyById(pharmacyId) {
    await simulateApiDelay()

    try {
      const pharmacy = this.pharmacies.find(p => p.id === pharmacyId)

      if (!pharmacy) {
        return {
          success: false,
          message: 'Pharmacy not found'
        }
      }

      return {
        success: true,
        pharmacy: pharmacy
      }
    } catch (error) {
      console.error('Mock get pharmacy error:', error)
      return {
        success: false,
        message: 'Failed to fetch pharmacy details'
      }
    }
  }

  /**
   * Get nearby pharmacies using coordinates
   * @param {number} latitude - User latitude
   * @param {number} longitude - User longitude
   * @param {number} radius - Search radius in km (default: 10)
   * @returns {Promise<Object>} Nearby pharmacies response
   */
  async getNearbyPharmacies(latitude, longitude, radius = 10) {
    await simulateApiDelay()

    try {
      // Calculate distance using Haversine formula (simplified)
      const pharmaciesWithDistance = this.pharmacies.map(pharmacy => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          pharmacy.coordinates.lat,
          pharmacy.coordinates.lng
        )

        return {
          ...pharmacy,
          distance: parseFloat(distance.toFixed(2))
        }
      })

      // Filter by radius
      const nearbyPharmacies = pharmaciesWithDistance.filter(pharmacy => 
        pharmacy.distance <= radius
      )

      // Sort by distance (closest first)
      nearbyPharmacies.sort((a, b) => a.distance - b.distance)

      return {
        success: true,
        pharmacies: nearbyPharmacies,
        user_location: {
          latitude,
          longitude
        },
        search_radius: radius,
        total_found: nearbyPharmacies.length
      }
    } catch (error) {
      console.error('Mock get nearby pharmacies error:', error)
      return {
        success: false,
        message: 'Failed to fetch nearby pharmacies',
        pharmacies: []
      }
    }
  }

  /**
   * Get pharmacy services
   * @returns {Promise<Object>} Services response
   */
  async getPharmacyServices() {
    await simulateApiDelay(200)

    try {
      // Extract unique services from all pharmacies
      const allServices = this.pharmacies.reduce((services, pharmacy) => {
        pharmacy.services.forEach(service => {
          if (!services.includes(service)) {
            services.push(service)
          }
        })
        return services
      }, [])

      return {
        success: true,
        services: allServices.sort()
      }
    } catch (error) {
      console.error('Mock get services error:', error)
      return {
        success: false,
        message: 'Failed to fetch pharmacy services',
        services: []
      }
    }
  }

  /**
   * Check pharmacy operating hours
   * @param {string} pharmacyId - Pharmacy ID
   * @param {string} date - Date in YYYY-MM-DD format (optional, defaults to today)
   * @returns {Promise<Object>} Hours response
   */
  async getPharmacyHours(pharmacyId, date = null) {
    await simulateApiDelay(200)

    try {
      const pharmacy = this.pharmacies.find(p => p.id === pharmacyId)

      if (!pharmacy) {
        return {
          success: false,
          message: 'Pharmacy not found'
        }
      }

      const targetDate = date ? new Date(date) : new Date()
      const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
      
      const hours = pharmacy.hours[dayName] || 'Closed'
      const isOpen = this.isPharmacyCurrentlyOpen(pharmacy, targetDate)

      return {
        success: true,
        pharmacy_id: pharmacyId,
        pharmacy_name: pharmacy.name,
        date: targetDate.toISOString().split('T')[0],
        day: dayName,
        hours: hours,
        is_open: isOpen,
        all_hours: pharmacy.hours
      }
    } catch (error) {
      console.error('Mock get pharmacy hours error:', error)
      return {
        success: false,
        message: 'Failed to fetch pharmacy hours'
      }
    }
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   * @param {number} lat1 - Latitude 1
   * @param {number} lon1 - Longitude 1
   * @param {number} lat2 - Latitude 2
   * @param {number} lon2 - Longitude 2
   * @returns {number} Distance in kilometers
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  /**
   * Convert degrees to radians
   */
  toRadians(degrees) {
    return degrees * (Math.PI / 180)
  }

  /**
   * Check if pharmacy is currently open
   * @param {Object} pharmacy - Pharmacy object
   * @param {Date} date - Date to check (optional, defaults to now)
   * @returns {boolean} Is open
   */
  isPharmacyCurrentlyOpen(pharmacy, date = new Date()) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const hours = pharmacy.hours[dayName]
    
    if (!hours || hours === 'Closed') {
      return false
    }

    // Simple check - in real implementation you'd parse actual times
    // For demo purposes, assume pharmacies are open during business hours
    const currentHour = date.getHours()
    return currentHour >= 8 && currentHour < 20 // 8 AM to 8 PM
  }
}