/**
 * Notification Utilities
 * 
 * This module provides a simple notification system for user feedback.
 * It can be easily replaced with a more sophisticated notification library
 * like react-hot-toast or sonner when needed.
 */

/**
 * Show a success notification
 * @param {string} message - Success message to display
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
export const showSuccess = (message, duration = 3000) => {
  if (typeof window !== 'undefined') {
    // Simple browser notification for now
    // In a real app, you'd use a toast library
    console.log(`✅ Success: ${message}`)
    
    // You can replace this with your preferred notification library
    // Example: toast.success(message, { duration })
    
    // Simple alert for now (can be replaced)
    if (window.confirm) {
      // Non-blocking notification simulation
      setTimeout(() => {
        console.log(`Success notification shown: ${message}`)
      }, 100)
    }
  }
}

/**
 * Show an error notification
 * @param {string} message - Error message to display
 * @param {number} duration - Duration in milliseconds (default: 5000)
 */
export const showError = (message, duration = 5000) => {
  if (typeof window !== 'undefined') {
    console.error(`❌ Error: ${message}`)
    
    // You can replace this with your preferred notification library
    // Example: toast.error(message, { duration })
    
    // Simple alert for critical errors
    if (message.toLowerCase().includes('network') || message.toLowerCase().includes('failed')) {
      console.error(`Error notification shown: ${message}`)
    }
  }
}

/**
 * Show an info notification
 * @param {string} message - Info message to display
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
export const showInfo = (message, duration = 3000) => {
  if (typeof window !== 'undefined') {
    console.log(`ℹ️ Info: ${message}`)
    
    // You can replace this with your preferred notification library
    // Example: toast.info(message, { duration })
  }
}

/**
 * Show a warning notification
 * @param {string} message - Warning message to display
 * @param {number} duration - Duration in milliseconds (default: 4000)
 */
export const showWarning = (message, duration = 4000) => {
  if (typeof window !== 'undefined') {
    console.warn(`⚠️ Warning: ${message}`)
    
    // You can replace this with your preferred notification library
    // Example: toast.warning(message, { duration })
  }
}

/**
 * Show a loading notification
 * @param {string} message - Loading message to display
 * @returns {Function} Function to dismiss the loading notification
 */
export const showLoading = (message) => {
  if (typeof window !== 'undefined') {
    console.log(`⏳ Loading: ${message}`)
    
    // You can replace this with your preferred notification library
    // Example: const toastId = toast.loading(message)
    // return () => toast.dismiss(toastId)
    
    return () => {
      console.log(`Loading dismissed: ${message}`)
    }
  }
  
  return () => {}
}

/**
 * Confirm action with user
 * @param {string} message - Confirmation message
 * @param {string} title - Confirmation title (optional)
 * @returns {Promise<boolean>} User's confirmation choice
 */
export const confirmAction = async (message, title = 'Confirm Action') => {
  if (typeof window !== 'undefined') {
    // Simple browser confirm for now
    // In a real app, you'd use a modal or dialog component
    return window.confirm(`${title}\n\n${message}`)
  }
  return false
}

/**
 * Network error handler
 * @param {Error} error - Network error object
 * @param {string} operation - Operation that failed (optional)
 */
export const handleNetworkError = (error, operation = 'operation') => {
  console.error(`Network error during ${operation}:`, error)
  
  let message = `Network error occurred during ${operation}.`
  
  if (!navigator.onLine) {
    message = 'You appear to be offline. Please check your internet connection.'
  } else if (error.name === 'AbortError') {
    message = 'Request was cancelled.'
  } else if (error.message.includes('fetch')) {
    message = 'Unable to connect to the server. Please try again later.'
  }
  
  showError(message)
}

/**
 * Validation error handler
 * @param {Object} errors - Validation errors object
 * @param {string} context - Context where validation failed (optional)
 */
export const handleValidationErrors = (errors, context = 'form') => {
  if (errors && typeof errors === 'object') {
    Object.entries(errors).forEach(([field, message]) => {
      showError(`${field}: ${message}`)
    })
  } else if (errors) {
    showError(`Validation error in ${context}: ${errors}`)
  }
}

/**
 * Generic success action handler
 * @param {string} action - Action that succeeded
 * @param {string} details - Additional details (optional)
 */
export const handleSuccess = (action, details = '') => {
  const message = details ? `${action} ${details}` : action
  showSuccess(message)
}

/**
 * Authentication error handler
 * @param {string} message - Error message
 * @param {Function} logout - Logout function (optional)
 */
export const handleAuthError = (message, logout = null) => {
  if (message.toLowerCase().includes('unauthorized') || 
      message.toLowerCase().includes('token') ||
      message.toLowerCase().includes('expired')) {
    showError('Your session has expired. Please log in again.')
    if (logout && typeof logout === 'function') {
      setTimeout(() => logout(), 2000)
    }
  } else {
    showError(message)
  }
}

/**
 * Cart action feedback
 * @param {string} action - Cart action performed
 * @param {string} itemName - Name of the item (optional)
 */
export const handleCartAction = (action, itemName = 'item') => {
  const messages = {
    added: `${itemName} added to cart successfully!`,
    updated: `Cart updated successfully!`,
    removed: `${itemName} removed from cart.`,
    cleared: 'Cart cleared successfully.',
    error: `Failed to update cart. Please try again.`
  }
  
  const message = messages[action] || `Cart ${action} completed.`
  
  if (action === 'error') {
    showError(message)
  } else {
    showSuccess(message)
  }
}

/**
 * Order action feedback
 * @param {string} action - Order action performed
 * @param {string} orderId - Order ID (optional)
 */
export const handleOrderAction = (action, orderId = '') => {
  const messages = {
    created: `Order ${orderId} created successfully!`,
    cancelled: `Order ${orderId} cancelled successfully.`,
    updated: `Order ${orderId} updated successfully.`,
    error: 'Failed to process order. Please try again.'
  }
  
  const message = messages[action] || `Order ${action} completed.`
  
  if (action === 'error') {
    showError(message)
  } else {
    showSuccess(message)
  }
}

// Export all notification functions
export default {
  showSuccess,
  showError,
  showInfo,
  showWarning,
  showLoading,
  confirmAction,
  handleNetworkError,
  handleValidationErrors,
  handleSuccess,
  handleAuthError,
  handleCartAction,
  handleOrderAction
}