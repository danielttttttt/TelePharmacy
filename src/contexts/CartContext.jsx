import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { CartService } from '../services/index.js'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { token, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart()
    } else {
      setCartItems([])
    }
  }, [isAuthenticated, token])

  const fetchCart = async () => {
    if (!token) return

    setLoading(true)
    try {
      const result = await CartService.getCart(token)
      
      if (result.success) {
        setCartItems(result.cart_items || [])
      } else {
        console.error('Failed to fetch cart:', result.message)
        setCartItems([])
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (medicineId, quantity = 1) => {
    if (!token) {
      return { success: false, message: 'Please login to add items to cart' }
    }

    try {
      const result = await CartService.addToCart(token, medicineId, quantity)
      
      if (result.success) {
        await fetchCart() // Refresh cart
      }
      
      return result
    } catch (error) {
      console.error('Error adding to cart:', error)
      return { success: false, message: 'Failed to add item to cart' }
    }
  }

  const updateCartItem = async (cartItemId, quantity) => {
    if (!token) return { success: false, message: 'Please login first' }

    try {
      const result = await CartService.updateCartItem(token, cartItemId, quantity)
      
      if (result.success) {
        await fetchCart() // Refresh cart
      }
      
      return result
    } catch (error) {
      console.error('Error updating cart item:', error)
      return { success: false, message: 'Failed to update cart item' }
    }
  }

  const removeFromCart = async (cartItemId) => {
    if (!token) return { success: false, message: 'Please login first' }

    try {
      const result = await CartService.removeFromCart(token, cartItemId)
      
      if (result.success) {
        await fetchCart() // Refresh cart
      }
      
      return result
    } catch (error) {
      console.error('Error removing from cart:', error)
      return { success: false, message: 'Failed to remove item from cart' }
    }
  }

  const clearCart = async () => {
    if (!token) return { success: false, message: 'Please login first' }

    try {
      const result = await CartService.clearCart(token)
      
      if (result.success) {
        setCartItems([])
      }
      
      return result
    } catch (error) {
      console.error('Error clearing cart:', error)
      return { success: false, message: 'Failed to clear cart' }
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.medicine?.price || 0) * item.quantity
    }, 0)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartTotal,
    getCartItemCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

