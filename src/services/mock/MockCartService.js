/**
 * Mock Cart Service
 * 
 * This service simulates shopping cart API calls using localStorage.
 * When the backend is ready, replace this with RealCartService that
 * makes actual HTTP requests to your cart endpoints.
 * 
 * Backend developers: This service demonstrates the expected API interface.
 * Your cart endpoints should match these method signatures and response formats.
 */

import { 
  getStorageItem, 
  setStorageItem, 
  STORAGE_KEYS,
  simulateApiDelay,
  generateId
} from '../../utils/storage.js'
import { MOCK_MEDICINES } from './mockData.js'

export default class MockCartService {
  constructor() {
    this.medicines = [...MOCK_MEDICINES]
  }

  /**
   * Get user's cart items
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Cart response
   * 
   * Expected API Response Format:
   * {
   *   success: boolean,
   *   cart_items: Array<{
   *     id: string,
   *     medicine_id: string,
   *     quantity: number,
   *     medicine: Object,
   *     added_at: string
   *   }>,
   *   total_items: number,
   *   total_amount: number
   * }
   */
  async getCart(token) {
    await simulateApiDelay(200)

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      const cartItems = getStorageItem(STORAGE_KEYS.CART_ITEMS, [])
      
      // Enrich cart items with medicine details
      const enrichedCartItems = cartItems.map(item => {
        const medicine = this.medicines.find(m => m.id === item.medicine_id)
        return {
          ...item,
          medicine: medicine || null
        }
      }).filter(item => item.medicine !== null) // Remove items for medicines that no longer exist

      // Calculate totals
      const totalItems = enrichedCartItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalAmount = enrichedCartItems.reduce((sum, item) => 
        sum + (item.medicine ? item.medicine.price * item.quantity : 0), 0
      )

      return {
        success: true,
        cart_items: enrichedCartItems,
        total_items: totalItems,
        total_amount: parseFloat(totalAmount.toFixed(2))
      }
    } catch (error) {
      console.error('Mock get cart error:', error)
      return {
        success: false,
        message: 'Failed to fetch cart',
        cart_items: [],
        total_items: 0,
        total_amount: 0
      }
    }
  }

  /**
   * Add item to cart
   * @param {string} token - Authentication token
   * @param {string} medicineId - Medicine ID
   * @param {number} quantity - Quantity to add
   * @returns {Promise<Object>} Add to cart response
   * 
   * Expected API Response Format:
   * {
   *   success: boolean,
   *   message: string,
   *   cart_item?: Object
   * }
   */
  async addToCart(token, medicineId, quantity = 1) {
    await simulateApiDelay()

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      if (!medicineId || quantity < 1) {
        return {
          success: false,
          message: 'Invalid medicine ID or quantity'
        }
      }

      // Check if medicine exists and is available
      const medicine = this.medicines.find(m => m.id === medicineId)
      if (!medicine) {
        return {
          success: false,
          message: 'Medicine not found'
        }
      }

      if (medicine.availability_status !== 'available') {
        return {
          success: false,
          message: 'Medicine is currently not available'
        }
      }

      if (medicine.stock_quantity < quantity) {
        return {
          success: false,
          message: `Only ${medicine.stock_quantity} units available in stock`
        }
      }

      const cartItems = getStorageItem(STORAGE_KEYS.CART_ITEMS, [])
      
      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(item => item.medicine_id === medicineId)
      
      if (existingItemIndex !== -1) {
        // Update existing item quantity
        const existingItem = cartItems[existingItemIndex]
        const newQuantity = existingItem.quantity + quantity
        
        if (newQuantity > medicine.stock_quantity) {
          return {
            success: false,
            message: `Cannot add ${quantity} more. Only ${medicine.stock_quantity - existingItem.quantity} additional units available`
          }
        }

        cartItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        }

        setStorageItem(STORAGE_KEYS.CART_ITEMS, cartItems)

        return {
          success: true,
          message: 'Cart updated successfully',
          cart_item: {
            ...cartItems[existingItemIndex],
            medicine: medicine
          }
        }
      } else {
        // Add new item to cart
        const newCartItem = {
          id: generateId(),
          medicine_id: medicineId,
          quantity: quantity,
          added_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        cartItems.push(newCartItem)
        setStorageItem(STORAGE_KEYS.CART_ITEMS, cartItems)

        return {
          success: true,
          message: 'Item added to cart successfully',
          cart_item: {
            ...newCartItem,
            medicine: medicine
          }
        }
      }
    } catch (error) {
      console.error('Mock add to cart error:', error)
      return {
        success: false,
        message: 'Failed to add item to cart'
      }
    }
  }

  /**
   * Update cart item quantity
   * @param {string} token - Authentication token
   * @param {string} cartItemId - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Promise<Object>} Update response
   */
  async updateCartItem(token, cartItemId, quantity) {
    await simulateApiDelay()

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      if (quantity < 1) {
        return {
          success: false,
          message: 'Quantity must be at least 1'
        }
      }

      const cartItems = getStorageItem(STORAGE_KEYS.CART_ITEMS, [])
      const itemIndex = cartItems.findIndex(item => item.id === cartItemId)

      if (itemIndex === -1) {
        return {
          success: false,
          message: 'Cart item not found'
        }
      }

      const cartItem = cartItems[itemIndex]
      const medicine = this.medicines.find(m => m.id === cartItem.medicine_id)

      if (!medicine) {
        return {
          success: false,
          message: 'Medicine not found'
        }
      }

      if (quantity > medicine.stock_quantity) {
        return {
          success: false,
          message: `Only ${medicine.stock_quantity} units available in stock`
        }
      }

      // Update quantity
      cartItems[itemIndex] = {
        ...cartItem,
        quantity: quantity,
        updated_at: new Date().toISOString()
      }

      setStorageItem(STORAGE_KEYS.CART_ITEMS, cartItems)

      return {
        success: true,
        message: 'Cart item updated successfully',
        cart_item: {
          ...cartItems[itemIndex],
          medicine: medicine
        }
      }
    } catch (error) {
      console.error('Mock update cart item error:', error)
      return {
        success: false,
        message: 'Failed to update cart item'
      }
    }
  }

  /**
   * Remove item from cart
   * @param {string} token - Authentication token
   * @param {string} cartItemId - Cart item ID
   * @returns {Promise<Object>} Remove response
   */
  async removeFromCart(token, cartItemId) {
    await simulateApiDelay()

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      const cartItems = getStorageItem(STORAGE_KEYS.CART_ITEMS, [])
      const itemIndex = cartItems.findIndex(item => item.id === cartItemId)

      if (itemIndex === -1) {
        return {
          success: false,
          message: 'Cart item not found'
        }
      }

      // Remove item
      cartItems.splice(itemIndex, 1)
      setStorageItem(STORAGE_KEYS.CART_ITEMS, cartItems)

      return {
        success: true,
        message: 'Item removed from cart successfully'
      }
    } catch (error) {
      console.error('Mock remove from cart error:', error)
      return {
        success: false,
        message: 'Failed to remove item from cart'
      }
    }
  }

  /**
   * Clear entire cart
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Clear response
   */
  async clearCart(token) {
    await simulateApiDelay()

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      setStorageItem(STORAGE_KEYS.CART_ITEMS, [])

      return {
        success: true,
        message: 'Cart cleared successfully'
      }
    } catch (error) {
      console.error('Mock clear cart error:', error)
      return {
        success: false,
        message: 'Failed to clear cart'
      }
    }
  }

  /**
   * Get cart summary (item count and total)
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Cart summary response
   */
  async getCartSummary(token) {
    await simulateApiDelay(100) // Quick response for summary

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      const cartItems = getStorageItem(STORAGE_KEYS.CART_ITEMS, [])
      
      let totalItems = 0
      let totalAmount = 0

      cartItems.forEach(item => {
        const medicine = this.medicines.find(m => m.id === item.medicine_id)
        if (medicine) {
          totalItems += item.quantity
          totalAmount += medicine.price * item.quantity
        }
      })

      return {
        success: true,
        total_items: totalItems,
        total_amount: parseFloat(totalAmount.toFixed(2))
      }
    } catch (error) {
      console.error('Mock cart summary error:', error)
      return {
        success: false,
        message: 'Failed to get cart summary',
        total_items: 0,
        total_amount: 0
      }
    }
  }

  /**
   * Validate mock token (simplified for demo)
   * @param {string} token - Token to validate
   * @returns {boolean} Is valid
   */
  isValidToken(token) {
    if (!token) return false
    
    try {
      const payload = JSON.parse(atob(token))
      return payload.exp > Date.now()
    } catch (error) {
      return false
    }
  }
}