/**
 * Mock Order Service
 * 
 * This service simulates order API calls using localStorage.
 * Backend developers: This demonstrates the expected order API interface.
 */

import { 
  getStorageItem, 
  setStorageItem, 
  STORAGE_KEYS,
  simulateApiDelay,
  generateId
} from '../../utils/storage.js'
import { ORDER_STATUSES, PAYMENT_METHODS } from './mockData.js'

export default class MockOrderService {
  constructor() {
    this.initializeMockOrders()
  }

  initializeMockOrders() {
    const existingOrders = getStorageItem(STORAGE_KEYS.MOCK_ORDERS, [])
    if (existingOrders.length === 0) {
      setStorageItem(STORAGE_KEYS.MOCK_ORDERS, [])
    }
  }

  /**
   * Get user's orders
   * @param {string} token - Authentication token
   * @param {Object} params - Query parameters (page, limit, status)
   * @returns {Promise<Object>} Orders response
   */
  async getOrders(token, params = {}) {
    await simulateApiDelay()

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      const currentUser = this.getCurrentUser(token)
      if (!currentUser) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      const allOrders = getStorageItem(STORAGE_KEYS.MOCK_ORDERS, [])
      const userOrders = allOrders.filter(order => order.user_id === currentUser.id)

      // Apply status filter if provided
      let filteredOrders = userOrders
      if (params.status) {
        filteredOrders = userOrders.filter(order => order.status === params.status)
      }

      // Sort by created date (newest first)
      filteredOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      return {
        success: true,
        orders: filteredOrders,
        total: filteredOrders.length
      }
    } catch (error) {
      console.error('Mock get orders error:', error)
      return {
        success: false,
        message: 'Failed to fetch orders',
        orders: []
      }
    }
  }

  /**
   * Get order by ID
   * @param {string} token - Authentication token
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} Order response
   */
  async getOrderById(token, orderId) {
    await simulateApiDelay()

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      const currentUser = this.getCurrentUser(token)
      if (!currentUser) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      const allOrders = getStorageItem(STORAGE_KEYS.MOCK_ORDERS, [])
      const order = allOrders.find(order => 
        order.id === orderId && order.user_id === currentUser.id
      )

      if (!order) {
        return {
          success: false,
          message: 'Order not found'
        }
      }

      return {
        success: true,
        order: order
      }
    } catch (error) {
      console.error('Mock get order error:', error)
      return {
        success: false,
        message: 'Failed to fetch order details'
      }
    }
  }

  /**
   * Create new order from cart
   * @param {string} token - Authentication token
   * @param {Object} orderData - Order data
   * @returns {Promise<Object>} Create order response
   */
  async createOrder(token, orderData) {
    await simulateApiDelay(1000) // Longer delay for order creation

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      const currentUser = this.getCurrentUser(token)
      if (!currentUser) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      // Get current cart items
      const cartItems = getStorageItem(STORAGE_KEYS.CART_ITEMS, [])
      if (cartItems.length === 0) {
        return {
          success: false,
          message: 'Cart is empty'
        }
      }

      // Calculate total
      let totalAmount = 0
      const orderItems = cartItems.map(item => {
        // In real implementation, you would fetch current medicine prices
        const price = 25.99 // Mock price
        totalAmount += price * item.quantity
        return {
          medicine_id: item.medicine_id,
          quantity: item.quantity,
          unit_price: price,
          total_price: price * item.quantity
        }
      })

      // Create new order
      const newOrder = {
        id: `order_${generateId()}`,
        user_id: currentUser.id,
        status: ORDER_STATUSES.PENDING,
        items: orderItems,
        total_amount: parseFloat(totalAmount.toFixed(2)),
        delivery_address: orderData.delivery_address || currentUser.address,
        payment_method: orderData.payment_method || PAYMENT_METHODS.CREDIT_CARD,
        notes: orderData.notes || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        estimated_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
      }

      // Save order
      const allOrders = getStorageItem(STORAGE_KEYS.MOCK_ORDERS, [])
      allOrders.push(newOrder)
      setStorageItem(STORAGE_KEYS.MOCK_ORDERS, allOrders)

      // Clear cart after successful order
      setStorageItem(STORAGE_KEYS.CART_ITEMS, [])

      return {
        success: true,
        message: 'Order created successfully',
        order: newOrder
      }
    } catch (error) {
      console.error('Mock create order error:', error)
      return {
        success: false,
        message: 'Failed to create order'
      }
    }
  }

  /**
   * Cancel order
   * @param {string} token - Authentication token
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} Cancel response
   */
  async cancelOrder(token, orderId) {
    await simulateApiDelay()

    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          message: 'Authentication required'
        }
      }

      const currentUser = this.getCurrentUser(token)
      if (!currentUser) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      const allOrders = getStorageItem(STORAGE_KEYS.MOCK_ORDERS, [])
      const orderIndex = allOrders.findIndex(order => 
        order.id === orderId && order.user_id === currentUser.id
      )

      if (orderIndex === -1) {
        return {
          success: false,
          message: 'Order not found'
        }
      }

      const order = allOrders[orderIndex]

      // Check if order can be cancelled
      if (order.status === ORDER_STATUSES.DELIVERED || order.status === ORDER_STATUSES.CANCELLED) {
        return {
          success: false,
          message: 'Order cannot be cancelled'
        }
      }

      // Update order status
      allOrders[orderIndex] = {
        ...order,
        status: ORDER_STATUSES.CANCELLED,
        updated_at: new Date().toISOString()
      }

      setStorageItem(STORAGE_KEYS.MOCK_ORDERS, allOrders)

      return {
        success: true,
        message: 'Order cancelled successfully',
        order: allOrders[orderIndex]
      }
    } catch (error) {
      console.error('Mock cancel order error:', error)
      return {
        success: false,
        message: 'Failed to cancel order'
      }
    }
  }

  /**
   * Validate mock token (simplified for demo)
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

  /**
   * Get current user from token
   */
  getCurrentUser(token) {
    if (!token || !this.isValidToken(token)) {
      return null
    }
    return getStorageItem(STORAGE_KEYS.USER_DATA)
  }
}