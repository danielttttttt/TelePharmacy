import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  AlertCircle,
  CreditCard,
  Truck,
  Shield,
  Clock,
  Tag
} from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const Cart = () => {
  const { 
    cartItems, 
    loading, 
    updateCartItem, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    addToCart
  } = useCart()
  const { isAuthenticated, user, token } = useAuth()
  const navigate = useNavigate()
  const [updating, setUpdating] = useState({})
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } })
      return
    }
    // Load cart data when component mounts
    if (cartItems.length === 0) {
      // Only show mock data if no real cart data is available
      console.log('Loading cart data...')
    }
  }, [isAuthenticated, navigate, cartItems])

  // Mock cart data for demonstration - will be replaced with API calls
  const mockCartItems = [
    {
      id: 1,
      medicine: {
        id: 101,
        name: "Pain Relief Tablets",
        brand: "HealthCorp",
        category: "Pain Relief",
        price: 12.99,
        prescription_required: false,
        image_url: "/api/placeholder/80/80"
      },
      quantity: 2,
      added_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      medicine: {
        id: 102,
        name: "Blood Pressure Monitor",
        brand: "MedTech",
        category: "Medical Devices",
        price: 45.00,
        prescription_required: false,
        image_url: "/api/placeholder/80/80"
      },
      quantity: 1,
      added_at: "2024-01-15T11:00:00Z"
    },
    {
      id: 3,
      medicine: {
        id: 103,
        name: "Antibiotic Prescription",
        brand: "PharmaCorp",
        category: "Antibiotics",
        price: 28.50,
        prescription_required: true,
        image_url: "/api/placeholder/80/80"
      },
      quantity: 1,
      added_at: "2024-01-15T12:00:00Z"
    }
  ]

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return
    
    console.log('Updating cart item:', cartItemId, 'to quantity:', newQuantity)
    setUpdating(prev => ({ ...prev, [cartItemId]: true }))
    
    try {
      const result = await updateCartItem(cartItemId, newQuantity)
      console.log('Update result:', result)
      
      if (!result.success) {
        alert(result.message || 'Failed to update quantity')
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
      alert('Failed to update quantity')
    } finally {
      setUpdating(prev => ({ ...prev, [cartItemId]: false }))
    }
  }

  const handleRemoveItem = async (cartItemId) => {
    if (confirm('Remove this item from your cart?')) {
      console.log('Removing cart item:', cartItemId)
      const result = await removeFromCart(cartItemId)
      console.log('Remove result:', result)
      
      if (!result.success) {
        alert(result.message || 'Failed to remove item')
      }
    }
  }

  const handleClearCart = async () => {
    if (confirm('Clear your entire cart?')) {
      console.log('Clearing cart')
      const result = await clearCart()
      console.log('Clear cart result:', result)
      
      if (!result.success) {
        alert(result.message || 'Failed to clear cart')
      }
    }
  }

  const handleApplyPromo = () => {
    // Simulate promo code validation - replace with API call
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(0.10) // 10% discount
      alert('Promo code applied! 10% discount')
    } else if (promoCode.toLowerCase() === 'welcome5') {
      setDiscount(0.05) // 5% discount
      alert('Welcome discount applied! 5% off')
    } else {
      alert('Invalid promo code')
    }
  }

  // Debug: Log cart state
  console.log('Cart Debug Info:', {
    isAuthenticated,
    user: user?.first_name,
    cartItemsLength: cartItems.length,
    loading,
    token: !!token
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 w-full">
        <div className="w-full px-6 py-8">
          <div className="max-w-[1400px] mx-auto text-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
            <Link to="/login">
              <Button>Login to Continue</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Show actual cart items if available, otherwise show demo items for testing
  const displayCartItems = cartItems.length > 0 ? cartItems : (
    isAuthenticated ? mockCartItems : []
  )
  const subtotal = displayCartItems.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0)
  const discountAmount = subtotal * discount
  const shippingFee = subtotal > 50 ? 0 : 5.99
  const total = subtotal - discountAmount + shippingFee

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 w-full">
        <div className="w-full px-6 py-8">
          <div className="animate-pulse space-y-6 max-w-[1400px] mx-auto">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full px-4 py-6 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link to="/catalogue">
              <Button variant="ghost" className="h-10 px-3 text-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden xs:block">Continue Shopping</span>
                <span className="xs:hidden">Shop</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 text-xs sm:text-sm">
                    {displayCartItems.length} items
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          {displayCartItems.length > 0 && (
            <Button variant="outline" onClick={handleClearCart} className="text-red-600 h-10 px-3 text-sm">
              <Trash2 className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:block">Clear Cart</span>
              <span className="xs:hidden">Clear</span>
            </Button>
          )}
        </div>

        {displayCartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="max-w-[1400px] mx-auto">
            <Card className="text-center py-8 sm:py-16">
              <CardContent>
                <ShoppingCart className="h-16 w-16 sm:h-24 sm:w-24 text-gray-300 mx-auto mb-4 sm:mb-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Your cart is empty</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                  Start browsing our wide selection of medicines and health products to add them to your cart.
                </p>
                
                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                  <Link to="/catalogue">
                    <Button size="default" className="px-4 sm:px-8 h-10 text-sm sm:text-base">
                      Browse Medicines
                    </Button>
                  </Link>
                  <Link to="/pharmacies">
                    <Button variant="outline" size="default" className="px-4 sm:px-8 h-10 text-sm sm:text-base">
                      Find Pharmacies
                    </Button>
                  </Link>
                </div>
                
                {/* How to Use Guide */}
                <div className="bg-blue-50 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
                  <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">How to add items to your cart:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-blue-800">
                    <div className="text-center">
                      <div className="bg-blue-200 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mx-auto mb-2">
                        <span className="font-bold text-xs sm:text-sm">1</span>
                      </div>
                      <p>Browse medicines in the <strong>Catalogue</strong> page</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-200 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mx-auto mb-2">
                        <span className="font-bold text-xs sm:text-sm">2</span>
                      </div>
                      <p>Click <strong>"Add to Cart"</strong> on any medicine</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-200 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mx-auto mb-2">
                        <span className="font-bold text-xs sm:text-sm">3</span>
                      </div>
                      <p>Return here to <strong>review and checkout</strong></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {displayCartItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img 
                          src={item.medicine.image_url} 
                          alt={item.medicine.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="hidden w-full h-full bg-gray-200 rounded-lg items-center justify-center text-gray-500 text-[0.6rem] sm:text-xs">
                          No Image
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                              {item.medicine.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                              {item.medicine.brand} • {item.medicine.category}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              {item.medicine.prescription_required && (
                                <Badge variant="destructive" className="text-[0.6rem] sm:text-xs px-1.5 py-0.5">
                                  Prescription Required
                                </Badge>
                              )}
                              <span className="text-base sm:text-lg font-bold text-blue-600">
                                ${item.medicine.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:bg-red-50 h-8 w-8 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity and Total */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-xs sm:text-sm font-medium text-gray-700">Qty:</span>
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || updating[item.id]}
                                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 sm:w-12 text-center text-xs sm:text-sm font-medium">
                                {updating[item.id] ? '...' : item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={updating[item.id]}
                                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg sm:text-xl font-bold text-gray-900">
                              ${(item.medicine.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">
                              ${item.medicine.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-5 sm:space-y-6">
                {/* Summary Card */}
                <Card>
                  <CardHeader className="py-4 px-4 sm:px-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 py-4 px-4 sm:px-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Subtotal ({displayCartItems.length} items)</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-xs sm:text-sm text-green-600">
                          <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Shipping</span>
                        <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                          {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                        </span>
                      </div>
                      {shippingFee > 0 && (
                        <p className="text-[0.6rem] sm:text-xs text-gray-500">
                          Free shipping on orders over $50
                        </p>
                      )}
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-semibold">Total</span>
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700">Promo Code</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 h-10 text-sm"
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleApplyPromo}
                          disabled={!promoCode.trim()}
                          className="h-10 px-3 text-sm"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>

                    {/* Prescription Alert */}
                    {displayCartItems.some(item => item.medicine.prescription_required) && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <div className="flex gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                          <div className="text-xs sm:text-sm text-amber-800">
                            <p className="font-medium mb-1">Prescription Required</p>
                            <p>You'll need to provide a valid prescription during checkout.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Link to="/checkout">
                      <Button size="default" className="w-full h-10 text-sm sm:text-base">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Benefits Card */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-gray-900 text-sm sm:text-base">Why shop with us?</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-green-600" />
                        <span className="text-xs sm:text-sm text-gray-700">Free delivery over $50</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-xs sm:text-sm text-gray-700">Licensed pharmacy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="text-xs sm:text-sm text-gray-700">24/7 customer support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-orange-600" />
                        <span className="text-xs sm:text-sm text-gray-700">Best price guarantee</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        
        {/* Test Section for Debugging */}
        {isAuthenticated && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6 max-w-[1400px] mx-auto mt-6 sm:mt-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
              <h3 className="text-base sm:text-lg font-semibold text-yellow-800">Cart Testing & Debug</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-medium text-yellow-800 text-sm sm:text-base">Cart Status:</h4>
                <ul className="text-xs sm:text-sm text-yellow-700 space-y-1">
                  <li>• Authentication: {isAuthenticated ? '✅ Logged in' : '❌ Not logged in'}</li>
                  <li>• User: {user?.first_name || 'Unknown'}</li>
                  <li>• Cart Items: {cartItems.length} items</li>
                  <li>• Mock Items: {mockCartItems.length} items</li>
                  <li>• Token Available: {token ? '✅ Yes' : '❌ No'}</li>
                  <li>• Loading: {loading ? '⏳ Yes' : '✅ No'}</li>
                </ul>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-medium text-yellow-800 text-sm sm:text-base">Test Actions:</h4>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={async () => {
                      console.log('Testing add to cart...')
                      const result = await addToCart(101, 1) // Pain Relief Tablets
                      console.log('Add to cart result:', result)
                      alert(`Add to cart result: ${result.success ? 'Success!' : result.message}`)
                    }}
                    className="text-xs h-8 px-2"
                  >
                    🧪 Test Add Item to Cart
                  </Button>
                  <Link to="/catalogue">
                    <Button variant="outline" size="sm" className="w-full text-xs h-8 px-2">
                      🛒 Go to Catalogue to Add Items
                    </Button>
                  </Link>
                  <Link to="/product/101">
                    <Button variant="outline" size="sm" className="w-full text-xs h-8 px-2">
                      👁️ View Product Details (ID: 101)
                    </Button>
                  </Link>
                  <div className="mt-2 sm:mt-3 p-2 bg-yellow-100 rounded text-xs">
                    <p className="font-medium text-yellow-800 mb-1">Test Login Credentials:</p>
                    <p className="text-yellow-700">
                      Email: <strong>john.doe@example.com</strong><br/>
                      Password: <strong>password123</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

