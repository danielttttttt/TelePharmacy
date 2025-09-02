/**
 * Mock Medicine Service
 * 
 * This service simulates medicine/catalog API calls using mock data.
 * When the backend is ready, replace this with RealMedicineService that
 * makes actual HTTP requests to your medicine endpoints.
 * 
 * Backend developers: This service demonstrates the expected API interface.
 * Your medicine endpoints should match these method signatures and response formats.
 */

import { MOCK_MEDICINES, MEDICINE_CATEGORIES } from './mockData.js'
import { 
  simulateApiDelay,
  createPaginatedResponse
} from '../../utils/storage.js'

export default class MockMedicineService {
  constructor() {
    this.medicines = [...MOCK_MEDICINES]
  }

  /**
   * Get medicine list with search, filtering, and pagination
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Medicine list response
   * 
   * Expected API Response Format:
   * {
   *   success: boolean,
   *   medicines: Array,
   *   pagination: {
   *     page: number,
   *     limit: number,
   *     total: number,
   *     pages: number,
   *     has_prev: boolean,
   *     has_next: boolean
   *   }
   * }
   */
  async getMedicines(params = {}) {
    await simulateApiDelay()

    try {
      const {
        search = '',
        category = '',
        min_price = '',
        max_price = '',
        prescription_required = '',
        availability_status = '',
        page = 1,
        limit = 12
      } = params

      let filteredMedicines = [...this.medicines]

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        filteredMedicines = filteredMedicines.filter(medicine =>
          medicine.name.toLowerCase().includes(searchLower) ||
          medicine.brand.toLowerCase().includes(searchLower) ||
          medicine.description.toLowerCase().includes(searchLower) ||
          medicine.category.toLowerCase().includes(searchLower) ||
          medicine.active_ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchLower)
          )
        )
      }

      // Category filter
      if (category) {
        filteredMedicines = filteredMedicines.filter(medicine =>
          medicine.category === category
        )
      }

      // Price range filter
      if (min_price) {
        const minPrice = parseFloat(min_price)
        if (!isNaN(minPrice)) {
          filteredMedicines = filteredMedicines.filter(medicine =>
            medicine.price >= minPrice
          )
        }
      }

      if (max_price) {
        const maxPrice = parseFloat(max_price)
        if (!isNaN(maxPrice)) {
          filteredMedicines = filteredMedicines.filter(medicine =>
            medicine.price <= maxPrice
          )
        }
      }

      // Prescription filter
      if (prescription_required !== '') {
        const requiresPrescription = prescription_required === 'true'
        filteredMedicines = filteredMedicines.filter(medicine =>
          medicine.prescription_required === requiresPrescription
        )
      }

      // Availability filter
      if (availability_status) {
        filteredMedicines = filteredMedicines.filter(medicine =>
          medicine.availability_status === availability_status
        )
      }

      // Sort by name (default)
      filteredMedicines.sort((a, b) => a.name.localeCompare(b.name))

      // Create paginated response
      const paginatedResult = createPaginatedResponse(
        filteredMedicines,
        parseInt(page),
        parseInt(limit)
      )

      return {
        success: true,
        medicines: paginatedResult.data,
        pagination: paginatedResult.pagination
      }
    } catch (error) {
      console.error('Mock medicine list error:', error)
      return {
        success: false,
        message: 'Failed to fetch medicines',
        medicines: [],
        pagination: {
          page: 1,
          limit: 12,
          total: 0,
          pages: 0,
          has_prev: false,
          has_next: false
        }
      }
    }
  }

  /**
   * Get medicine by ID
   * @param {string} medicineId - Medicine ID
   * @returns {Promise<Object>} Medicine detail response
   * 
   * Expected API Response Format:
   * {
   *   success: boolean,
   *   medicine?: Object,
   *   message?: string
   * }
   */
  async getMedicineById(medicineId) {
    await simulateApiDelay()

    try {
      const medicine = this.medicines.find(m => m.id === medicineId)

      if (!medicine) {
        return {
          success: false,
          message: 'Medicine not found'
        }
      }

      return {
        success: true,
        medicine: medicine
      }
    } catch (error) {
      console.error('Mock medicine detail error:', error)
      return {
        success: false,
        message: 'Failed to fetch medicine details'
      }
    }
  }

  /**
   * Get medicine categories
   * @returns {Promise<Object>} Categories response
   * 
   * Expected API Response Format:
   * {
   *   success: boolean,
   *   categories: Array<string>
   * }
   */
  async getCategories() {
    await simulateApiDelay(200) // Quick response for categories

    try {
      return {
        success: true,
        categories: MEDICINE_CATEGORIES
      }
    } catch (error) {
      console.error('Mock categories error:', error)
      return {
        success: false,
        message: 'Failed to fetch categories',
        categories: []
      }
    }
  }

  /**
   * Search medicines (alternative search endpoint)
   * @param {string} query - Search query
   * @param {number} limit - Result limit
   * @returns {Promise<Object>} Search response
   */
  async searchMedicines(query, limit = 10) {
    await simulateApiDelay(300)

    try {
      if (!query || query.trim().length < 2) {
        return {
          success: true,
          medicines: [],
          message: 'Query too short'
        }
      }

      const searchLower = query.toLowerCase()
      const searchResults = this.medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchLower) ||
        medicine.brand.toLowerCase().includes(searchLower) ||
        medicine.description.toLowerCase().includes(searchLower)
      )

      // Limit results
      const limitedResults = searchResults.slice(0, limit)

      return {
        success: true,
        medicines: limitedResults,
        total_found: searchResults.length
      }
    } catch (error) {
      console.error('Mock search error:', error)
      return {
        success: false,
        message: 'Search failed',
        medicines: []
      }
    }
  }

  /**
   * Get featured/popular medicines
   * @param {number} limit - Number of medicines to return
   * @returns {Promise<Object>} Featured medicines response
   */
  async getFeaturedMedicines(limit = 6) {
    await simulateApiDelay(200)

    try {
      // Get available medicines, prioritize non-prescription ones for featuring
      const availableMedicines = this.medicines.filter(m => 
        m.availability_status === 'available'
      )

      // Sort by price (ascending) and take first few as "featured"
      const featuredMedicines = availableMedicines
        .sort((a, b) => a.price - b.price)
        .slice(0, limit)

      return {
        success: true,
        medicines: featuredMedicines
      }
    } catch (error) {
      console.error('Mock featured medicines error:', error)
      return {
        success: false,
        message: 'Failed to fetch featured medicines',
        medicines: []
      }
    }
  }

  /**
   * Get medicines by category
   * @param {string} category - Category name
   * @param {number} limit - Result limit
   * @returns {Promise<Object>} Category medicines response
   */
  async getMedicinesByCategory(category, limit = 12) {
    await simulateApiDelay()

    try {
      const categoryMedicines = this.medicines.filter(medicine =>
        medicine.category === category && medicine.availability_status === 'available'
      )

      return {
        success: true,
        medicines: categoryMedicines.slice(0, limit),
        category: category,
        total_in_category: categoryMedicines.length
      }
    } catch (error) {
      console.error('Mock category medicines error:', error)
      return {
        success: false,
        message: 'Failed to fetch medicines for category',
        medicines: []
      }
    }
  }

  /**
   * Check medicine availability
   * @param {string} medicineId - Medicine ID
   * @param {number} quantity - Requested quantity
   * @returns {Promise<Object>} Availability response
   */
  async checkAvailability(medicineId, quantity = 1) {
    await simulateApiDelay(200)

    try {
      const medicine = this.medicines.find(m => m.id === medicineId)

      if (!medicine) {
        return {
          success: false,
          message: 'Medicine not found'
        }
      }

      const isAvailable = medicine.availability_status === 'available' && 
                         medicine.stock_quantity >= quantity

      return {
        success: true,
        available: isAvailable,
        stock_quantity: medicine.stock_quantity,
        medicine_name: medicine.name,
        requested_quantity: quantity
      }
    } catch (error) {
      console.error('Mock availability check error:', error)
      return {
        success: false,
        message: 'Failed to check availability'
      }
    }
  }

  /**
   * Update medicine stock (for internal use by CartService)
   * This would typically be handled internally by the backend
   * @param {string} medicineId - Medicine ID
   * @param {number} quantityChange - Quantity to add/subtract (negative to subtract)
   * @returns {boolean} Success status
   */
  updateStock(medicineId, quantityChange) {
    try {
      const medicineIndex = this.medicines.findIndex(m => m.id === medicineId)
      if (medicineIndex === -1) return false

      const medicine = this.medicines[medicineIndex]
      const newQuantity = medicine.stock_quantity + quantityChange

      if (newQuantity < 0) return false

      this.medicines[medicineIndex] = {
        ...medicine,
        stock_quantity: newQuantity,
        availability_status: newQuantity > 0 ? 'available' : 'out_of_stock',
        updated_at: new Date().toISOString()
      }

      return true
    } catch (error) {
      console.error('Mock stock update error:', error)
      return false
    }
  }
}