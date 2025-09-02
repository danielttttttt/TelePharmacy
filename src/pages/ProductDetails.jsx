import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  ShoppingCart, 
  AlertCircle,
  Package,
  Shield,
  Truck
} from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { MedicineService } from '../services/index.js'

const ProductDetails = () => {
  const { id } = useParams()
  const [medicine, setMedicine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchMedicine()
  }, [id])

  const fetchMedicine = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await MedicineService.getMedicineById(id)
      
      if (result.success && result.medicine) {
        setMedicine(result.medicine)
      } else {
        setError(result.message || 'Medicine not found')
      }
    } catch (error) {
      console.error('Error fetching medicine:', error)
      setError('Failed to load medicine details')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart')
      return
    }

    const result = await addToCart(medicine.id, quantity)
    if (result.success) {
      alert('Item added to cart successfully!')
    } else {
      alert(result.message)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !medicine) {
    return (
      <div className="space-y-6">
        <Link to="/catalogue">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Catalogue
          </Button>
        </Link>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Medicine not found'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full px-6 py-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Back Button */}
      <Link to="/catalogue">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalogue
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{medicine.name}</h1>
              {medicine.prescription_required && (
                <Badge variant="destructive">
                  Prescription Required
                </Badge>
              )}
            </div>
            <p className="text-lg text-gray-600">{medicine.brand}</p>
            <p className="text-sm text-gray-500">{medicine.category}</p>
          </div>

          <div className="text-3xl font-bold text-primary">
            ${medicine.price}
          </div>

          {medicine.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{medicine.description}</p>
            </div>
          )}

          {/* Availability */}
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-500" />
            <span className="text-sm">
              Status: 
              <Badge 
                variant={medicine.availability_status === 'available' ? 'default' : 'secondary'}
                className="ml-2"
              >
                {medicine.availability_status}
              </Badge>
            </span>
          </div>

          {medicine.stock_quantity > 0 && (
            <p className="text-sm text-gray-600">
              {medicine.stock_quantity} units in stock
            </p>
          )}

          {/* Prescription Warning */}
          {medicine.prescription_required && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                This medicine requires a valid prescription. You'll need to provide it during checkout.
              </AlertDescription>
            </Alert>
          )}

          {/* Add to Cart */}
          {medicine.availability_status === 'available' && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor="quantity" className="text-sm font-medium">
                      Quantity:
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="border border-gray-300 rounded px-3 py-1 text-sm"
                    >
                      {[...Array(Math.min(10, medicine.stock_quantity))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Free Delivery</p>
                <p className="text-xs text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Verified Quality</p>
                <p className="text-xs text-gray-600">Licensed pharmacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

