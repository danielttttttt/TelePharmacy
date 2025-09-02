import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Package, 
  Search, 
  Filter,
  Eye,
  Download,
  RefreshCw,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Calendar,
  ShoppingCart,
  Star,
  AlertCircle,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Orders = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/orders' } } })
      return
    }
    fetchOrders()
  }, [isAuthenticated, navigate])

  // Mock orders data - will be replaced with API calls
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      order_number: 'PH24001',
      status: 'delivered',
      order_date: '2024-01-15T10:30:00Z',
      delivery_date: '2024-01-17T14:20:00Z',
      total_amount: 67.48,
      pharmacy: {
        id: 1,
        name: 'HealthCare Pharmacy',
        address: '123 Main Street, Downtown',
        phone: '(555) 123-4567'
      },
      delivery_address: {
        address_line_1: '456 Oak Avenue',
        address_line_2: 'Apt 3B',
        city: 'Downtown',
        state: 'NY',
        zip_code: '10001'
      },
      items: [
        {
          id: 1,
          medicine: {
            id: 101,
            name: 'Pain Relief Tablets',
            brand: 'HealthCorp',
            category: 'Pain Relief'
          },
          quantity: 2,
          unit_price: 12.99,
          total_price: 25.98
        },
        {
          id: 2,
          medicine: {
            id: 102,
            name: 'Vitamin D Supplements',
            brand: 'WellnessPlus',
            category: 'Vitamins'
          },
          quantity: 1,
          unit_price: 24.99,
          total_price: 24.99
        }
      ],
      payment_method: 'Credit Card',
      shipping_fee: 5.99,
      tax_amount: 4.52,
      discount_amount: 0,
      tracking_number: 'TRK123456789',
      prescription_verified: true
    },
    {
      id: 'ORD-2024-002',
      order_number: 'PH24002',
      status: 'processing',
      order_date: '2024-01-20T09:15:00Z',
      estimated_delivery: '2024-01-23T16:00:00Z',
      total_amount: 89.97,
      pharmacy: {
        id: 2,
        name: 'MedPoint Pharmacy',
        address: '789 Health Blvd, Medical District',
        phone: '(555) 987-6543'
      },
      delivery_address: {
        address_line_1: '456 Oak Avenue',
        address_line_2: 'Apt 3B',
        city: 'Downtown',
        state: 'NY',
        zip_code: '10001'
      },
      items: [
        {
          id: 3,
          medicine: {
            id: 103,
            name: 'Blood Pressure Monitor',
            brand: 'MedTech',
            category: 'Medical Devices'
          },
          quantity: 1,
          unit_price: 79.99,
          total_price: 79.99
        }
      ],
      payment_method: 'PayPal',
      shipping_fee: 0, // Free shipping
      tax_amount: 6.40,
      discount_amount: 10.00,
      tracking_number: null,
      prescription_verified: false
    },
    {
      id: 'ORD-2024-003',
      order_number: 'PH24003',
      status: 'cancelled',
      order_date: '2024-01-18T14:45:00Z',
      cancelled_date: '2024-01-19T10:30:00Z',
      total_amount: 45.99,
      pharmacy: {
        id: 1,
        name: 'HealthCare Pharmacy',
        address: '123 Main Street, Downtown',
        phone: '(555) 123-4567'
      },
      items: [
        {
          id: 4,
          medicine: {
            id: 104,
            name: 'Allergy Relief Spray',
            brand: 'AllerFree',
            category: 'Allergy'
          },
          quantity: 3,
          unit_price: 15.33,
          total_price: 45.99
        }
      ],
      cancellation_reason: 'Customer requested cancellation',
      refund_amount: 45.99,
      refund_status: 'completed'
    }
  ]

  const fetchOrders = async () => {
    setLoading(true)
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOrders(mockOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-600" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleReorder = async (orderId) => {
    const order = orders.find(o => o.id === orderId)
    if (!order) return

    // Simulate adding items to cart
    alert('Items added to cart! Redirecting to cart...')
    navigate('/cart')
  }

  const handleCancelOrder = async (orderId) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      // Simulate API call
      alert('Order cancellation request submitted. You will receive a confirmation shortly.')
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => 
        item.medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <Package className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">Track and manage your pharmacy orders</p>
            </div>
          </div>
          <Button onClick={fetchOrders} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 max-w-[1400px] mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders, medicines, or pharmacies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Orders List */}
        <div className="space-y-4 max-w-[1400px] mx-auto">
          {loading ? (
            // Loading State
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-32"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            // Empty State
            <Card className="text-center py-16">
              <CardContent>
                <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {searchQuery || statusFilter !== 'all' ? 'No matching orders found' : 'No orders yet'}
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Start shopping to see your orders here. We\'ll help you track everything from purchase to delivery.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/catalogue">
                    <Button size="lg" className="px-8">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Browse Medicines
                    </Button>
                  </Link>
                  <Link to="/pharmacies">
                    <Button variant="outline" size="lg" className="px-8">
                      <MapPin className="h-5 w-5 mr-2" />
                      Find Pharmacies
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Orders List
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.order_number}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.order_date).toLocaleDateString()} • {order.pharmacy.name}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>

                      {/* Order Items Preview */}
                      <div className="space-y-1 mb-3">
                        {order.items.slice(0, 2).map((item) => (
                          <p key={item.id} className="text-sm text-gray-600">
                            {item.quantity}x {item.medicine.name}
                          </p>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-gray-500">
                            +{order.items.length - 2} more items
                          </p>
                        )}
                      </div>

                      {/* Order Details */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Total:</span>
                          <span className="text-gray-900 font-semibold">${order.total_amount.toFixed(2)}</span>
                        </div>
                        {order.tracking_number && (
                          <div className="flex items-center gap-1">
                            <Truck className="h-4 w-4" />
                            <span>Tracking: {order.tracking_number}</span>
                          </div>
                        )}
                        {order.estimated_delivery && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Est. delivery: {new Date(order.estimated_delivery).toLocaleDateString()}</span>
                          </div>
                        )}
                        {order.delivery_date && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Delivered: {new Date(order.delivery_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Prescription Alert */}
                      {order.items.some(item => item.medicine.prescription_required) && !order.prescription_verified && (
                        <Alert className="mt-3">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Prescription verification required. Please upload your prescription.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-40">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                      
                      {order.status === 'delivered' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleReorder(order.id)}
                            className="flex items-center gap-2"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Reorder
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Receipt
                          </Button>
                        </>
                      )}
                      
                      {order.status === 'processing' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                          className="flex items-center gap-2"
                        >
                          <XCircle className="h-4 w-4" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Order Details Modal/Sidebar */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Order #{selectedOrder.order_number}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedOrder(null)}
                  className="p-2"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Status */}
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedOrder.status)}
                  <div>
                    <p className="text-lg font-semibold">
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Order placed on {new Date(selectedOrder.order_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Order Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium">{item.medicine.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.medicine.brand} • {item.medicine.category}
                            </p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${item.total_price.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">${item.unit_price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Pharmacy & Delivery */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Pharmacy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="font-medium">{selectedOrder.pharmacy.name}</p>
                          <p className="text-sm text-gray-600">{selectedOrder.pharmacy.address}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            {selectedOrder.pharmacy.phone}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Delivery Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-sm">
                          <p>{selectedOrder.delivery_address.address_line_1}</p>
                          {selectedOrder.delivery_address.address_line_2 && (
                            <p>{selectedOrder.delivery_address.address_line_2}</p>
                          )}
                          <p>
                            {selectedOrder.delivery_address.city}, {selectedOrder.delivery_address.state} {selectedOrder.delivery_address.zip_code}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${(selectedOrder.total_amount - selectedOrder.shipping_fee - selectedOrder.tax_amount + selectedOrder.discount_amount).toFixed(2)}</span>
                      </div>
                      {selectedOrder.discount_amount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${selectedOrder.discount_amount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${selectedOrder.shipping_fee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${selectedOrder.tax_amount.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${selectedOrder.total_amount.toFixed(2)}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        Paid via {selectedOrder.payment_method}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  {selectedOrder.status === 'delivered' && (
                    <>
                      <Button onClick={() => handleReorder(selectedOrder.id)}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reorder Items
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                      </Button>
                      <Button variant="outline">
                        <Star className="h-4 w-4 mr-2" />
                        Rate Order
                      </Button>
                    </>
                  )}
                  {selectedOrder.tracking_number && (
                    <Button variant="outline">
                      <Truck className="h-4 w-4 mr-2" />
                      Track Package
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders

