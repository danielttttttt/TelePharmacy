/**
 * Real Cart Service
 * 
 * This service makes actual HTTP requests to your cart endpoints.
 * Backend developers: Implement your cart API to match these method signatures.
 */

import { API_CONFIG, buildApiUrl, getDefaultHeaders } from '../../config/api.js'

export default class RealCartService {
  /**
   * Get user's cart items
   * Backend Implementation: GET /api/cart
   * Headers: { Authorization: "Bearer {token}" }
   */
  async getCart(token) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CART.GET), {
        method: 'GET',
        headers: getDefaultHeaders(token)
      })

      return await response.json()
    } catch (error) {
      console.error('Real get cart error:', error)
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
   * Backend Implementation: POST /api/cart
   * Headers: { Authorization: "Bearer {token}" }
   * Request Body: { medicine_id: string, quantity: number }
   */
  async addToCart(token, medicineId, quantity = 1) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CART.ADD), {
        method: 'POST',
        headers: getDefaultHeaders(token),
        body: JSON.stringify({
          medicine_id: medicineId,
          quantity: quantity
        })
      })

      return await response.json()
    } catch (error) {
      console.error('Real add to cart error:', error)
      return {
        success: false,
        message: 'Failed to add item to cart'
      }
    }
  }

  /**
   * Update cart item quantity
   * Backend Implementation: PUT /api/cart/:id
   * Headers: { Authorization: "Bearer {token}" }
   * Request Body: { quantity: number }
   */
  async updateCartItem(token, cartItemId, quantity) {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CART.UPDATE, { id: cartItemId })
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: getDefaultHeaders(token),
        body: JSON.stringify({ quantity })
      })

      return await response.json()
    } catch (error) {
      console.error('Real update cart item error:', error)
      return {
        success: false,
        message: 'Failed to update cart item'
      }
    }
  }

  /**
   * Remove item from cart
   * Backend Implementation: DELETE /api/cart/:id
   * Headers: { Authorization: "Bearer {token}" }
   */
  async removeFromCart(token, cartItemId) {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CART.REMOVE, { id: cartItemId })
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: getDefaultHeaders(token)
      })

      return await response.json()
    } catch (error) {
      console.error('Real remove from cart error:', error)
      return {
        success: false,
        message: 'Failed to remove item from cart'
      }
    }
  }

  /**
   * Clear entire cart
   * Backend Implementation: DELETE /api/cart
   * Headers: { Authorization: "Bearer {token}" }
   */
  async clearCart(token) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CART.CLEAR), {
        method: 'DELETE',
        headers: getDefaultHeaders(token)
      })

      return await response.json()
    } catch (error) {
      console.error('Real clear cart error:', error)
      return {
        success: false,
        message: 'Failed to clear cart'
      }
    }
  }

  /**
   * Get cart summary (item count and total)
   * Backend Implementation: GET /api/cart/summary
   * Headers: { Authorization: "Bearer {token}" }
   */
  async getCartSummary(token) {
    try {
      const response = await fetch(`${buildApiUrl(API_CONFIG.ENDPOINTS.CART.GET)}/summary`, {
        method: 'GET',
        headers: getDefaultHeaders(token)
      })

      return await response.json()
    } catch (error) {
      console.error('Real cart summary error:', error)
      return {
        success: false,
        message: 'Failed to get cart summary',
        total_items: 0,
        total_amount: 0
      }
    }
  }
}