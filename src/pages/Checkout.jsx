import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } })
    }
    if (cartItems.length === 0) {
      navigate('/cart')
    }
  }, [isAuthenticated, cartItems, navigate])

  if (!isAuthenticated || cartItems.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full px-4 py-6 sm:px-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
      </div>

      <Alert>
        <AlertDescription className="text-sm sm:text-base">
          Checkout functionality is coming soon! This is a demo version of the TelePharmacy app.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-5 sm:space-y-6">
          <Card>
            <CardHeader className="py-4 px-4 sm:px-6">
              <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="py-4 px-4 sm:px-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm sm:text-base">
                    <span className="truncate max-w-[60%]">{item.medicine?.name} x {item.quantity}</span>
                    <span>${((item.medicine?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span className="text-primary">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <Card>
            <CardHeader className="py-4 px-4 sm:px-6">
              <CardTitle className="text-base sm:text-lg">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="py-4 px-4 sm:px-6">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                The checkout process will include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600">
                <li>Delivery address selection</li>
                <li>Pharmacy selection</li>
                <li>Payment method selection</li>
                <li>Prescription upload for Rx medicines</li>
                <li>Order confirmation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout