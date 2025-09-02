/**
 * Real Order Service
 * 
 * This service makes actual HTTP requests to your order endpoints.
 * Backend developers: Implement your order API to match these method signatures.
 */

import { API_CONFIG, buildApiUrl, getDefaultHeaders } from '../../config/api.js'

export default class RealOrderService {
  /**
   * Get user's orders
   * Backend Implementation: GET /api/orders
   * Headers: { Authorization: "Bearer {token}" }
   */
  async getOrders(token, params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const url = `${buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.LIST)}?${queryParams}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getDefaultHeaders(token)
      })

      return await response.json()
    } catch (error) {
      console.error('Real get orders error:', error)
      return {
        success: false,
        message: 'Failed to fetch orders',
        orders: []
      }
    }
  }

  /**
   * Get order by ID
   * Backend Implementation: GET /api/orders/:id
   * Headers: { Authorization: "Bearer {token}" }
   */
  async getOrderById(token, orderId) {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.DETAIL, { id: orderId })
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getDefaultHeaders(token)
      })

      return await response.json()
    } catch (error) {
      console.error('Real get order error:', error)
      return {
        success: false,
        message: 'Failed to fetch order details'
      }
    }
  }

  /**
   * Create new order
   * Backend Implementation: POST /api/orders
   * Headers: { Authorization: "Bearer {token}" }
   * Request Body: { items, delivery_address, payment_method, etc. }
   */
  async createOrder(token, orderData) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.CREATE), {
        method: 'POST',
        headers: getDefaultHeaders(token),
        body: JSON.stringify(orderData)
      })

      return await response.json()
    } catch (error) {
      console.error('Real create order error:', error)
      return {
        success: false,
        message: 'Failed to create order'
      }
    }
  }

  /**
   * Cancel order
   * Backend Implementation: POST /api/orders/:id/cancel
   * Headers: { Authorization: "Bearer {token}" }
   */
  async cancelOrder(token, orderId) {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.CANCEL, { id: orderId })
      
      const response = await fetch(url, {
        method: 'POST',
        headers: getDefaultHeaders(token)
      })

      return await response.json()
    } catch (error) {
      console.error('Real cancel order error:', error)
      return {
        success: false,
        message: 'Failed to cancel order'
      }
    }
  }
}