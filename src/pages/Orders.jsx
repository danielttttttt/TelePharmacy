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
      <div className="w-full px-4 py-6 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-xs sm:text-sm text-gray-600">Track and manage your pharmacy orders</p>
            </div>
          </div>
          <Button onClick={fetchOrders} disabled={loading} className="h-10 px-3 text-sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-5 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders, medicines, or pharmacies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 text-sm"
                />
              </div>
              <div>
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
        <div className="space-y-4">
          {loading ? (
            // Loading State
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            // Empty State
            <Card className="text-center py-8 sm:py-16">
              <CardContent>
                <Package className="h-16 w-16 sm:h-24 sm:w-24 text-gray-300 mx-auto mb-4 sm:mb-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {searchQuery || statusFilter !== 'all' ? 'No matching orders found' : 'No orders yet'}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Start shopping to see your orders here. We\'ll help you track everything from purchase to delivery.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link to="/catalogue">
                    <Button size="default" className="px-4 sm:px-8 h-10 text-sm sm:text-base">
                      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Browse Medicines
                    </Button>
                  </Link>
                  <Link to="/pharmacies">
                    <Button variant="outline" size="default" className="px-4 sm:px-8 h-10 text-sm sm:text-base">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
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
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4">
                    {/* Order Info */}
                    <div className="flex items-start gap-3">
                      {getStatusIcon(order.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                            Order #{order.order_number}
                          </h3>
                          <Badge className={`${getStatusColor(order.status)} text-xs`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {new Date(order.order_date).toLocaleDateString()} • {order.pharmacy.name}
                        </p>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item) => (
                        <p key={item.id} className="text-xs sm:text-sm text-gray-600">
                          {item.quantity}x {item.medicine.name}
                        </p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{order.items.length - 2} more items
                        </p>
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Total:</span>
                        <span className="text-gray-900 font-semibold">${order.total_amount.toFixed(2)}</span>
                      </div>
                      {order.tracking_number && (
                        <div className="flex items-center gap-1">
                          <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="truncate">Tracking: {order.tracking_number}</span>
                        </div>
                      )}
                      {order.estimated_delivery && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span>Est. delivery: {new Date(order.estimated_delivery).toLocaleDateString()}</span>
                        </div>
                      )}
                      {order.delivery_date && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                          <span>Delivered: {new Date(order.delivery_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Prescription Alert */}
                    {order.items.some(item => item.medicine.prescription_required) && !order.prescription_verified && (
                      <Alert className="py-2 px-3">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          Prescription verification required. Please upload your prescription.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-1.5 h-8 px-2.5 text-xs sm:text-sm"
                      >
                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="hidden xs:block">View Details</span>
                        <span className="xs:hidden">Details</span>
                      </Button>
                      
                      {order.status === 'delivered' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleReorder(order.id)}
                            className="flex items-center gap-1.5 h-8 px-2.5 text-xs sm:text-sm"
                          >
                            <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="hidden xs:block">Reorder</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1.5 h-8 px-2.5 text-xs sm:text-sm"
                          >
                            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="hidden xs:block">Receipt</span>
                          </Button>
                        </>
                      )}
                      
                      {order.status === 'processing' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                          className="flex items-center gap-1.5 h-8 px-2.5 text-xs sm:text-sm"
                        >
                          <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="hidden xs:block">Cancel</span>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-4 sm:p-6 flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                  Order #{selectedOrder.order_number}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 sm:p-2 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <XCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>

              <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                {/* Order Status */}
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedOrder.status)}
                  <div>
                    <p className="text-base sm:text-lg font-semibold">
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Order placed on {new Date(selectedOrder.order_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:gap-6">
                  {/* Order Items */}
                  <Card>
                    <CardHeader className="py-3 sm:py-4 px-4 sm:px-6">
                      <CardTitle className="text-base sm:text-lg">Order Items</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3 sm:py-4 px-4 sm:px-6 space-y-3 sm:space-y-4">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm sm:text-base truncate">{item.medicine.name}</p>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                              {item.medicine.brand} • {item.medicine.category}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right ml-2">
                            <p className="font-medium text-sm sm:text-base">${item.total_price.toFixed(2)}</p>
                            <p className="text-xs sm:text-sm text-gray-600">${item.unit_price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Pharmacy & Delivery */}
                  <div className="space-y-4 sm:space-y-5">
                    <Card>
                      <CardHeader className="py-3 sm:py-4 px-4 sm:px-6">
                        <CardTitle className="text-base sm:text-lg">Pharmacy</CardTitle>
                      </CardHeader>
                      <CardContent className="py-3 sm:py-4 px-4 sm:px-6">
                        <div className="space-y-2">
                          <p className="font-medium text-sm sm:text-base">{selectedOrder.pharmacy.name}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{selectedOrder.pharmacy.address}</p>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            {selectedOrder.pharmacy.phone}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-3 sm:py-4 px-4 sm:px-6">
                        <CardTitle className="text-base sm:text-lg">Delivery Address</CardTitle>
                      </CardHeader>
                      <CardContent className="py-3 sm:py-4 px-4 sm:px-6">
                        <div className="space-y-1 text-xs sm:text-sm">
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
                  <CardHeader className="py-3 sm:py-4 px-4 sm:px-6">
                    <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Subtotal</span>
                        <span>${(selectedOrder.total_amount - selectedOrder.shipping_fee - selectedOrder.tax_amount + selectedOrder.discount_amount).toFixed(2)}</span>
                      </div>
                      {selectedOrder.discount_amount > 0 && (
                        <div className="flex justify-between text-xs sm:text-sm text-green-600">
                          <span>Discount</span>
                          <span>-${selectedOrder.discount_amount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Shipping</span>
                        <span>${selectedOrder.shipping_fee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Tax</span>
                        <span>${selectedOrder.tax_amount.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold text-base sm:text-lg">
                        <span>Total</span>
                        <span>${selectedOrder.total_amount.toFixed(2)}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-2">
                        Paid via {selectedOrder.payment_method}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 border-t">
                  {selectedOrder.status === 'delivered' && (
                    <>
                      <Button onClick={() => handleReorder(selectedOrder.id)} className="h-9 px-3 text-xs sm:text-sm">
                        <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        <span className="hidden xs:block">Reorder Items</span>
                        <span className="xs:hidden">Reorder</span>
                      </Button>
                      <Button variant="outline" className="h-9 px-3 text-xs sm:text-sm">
                        <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        <span className="hidden xs:block">Download Receipt</span>
                        <span className="xs:hidden">Receipt</span>
                      </Button>
                      <Button variant="outline" className="h-9 px-3 text-xs sm:text-sm">
                        <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        <span className="hidden xs:block">Rate Order</span>
                        <span className="xs:hidden">Rate</span>
                      </Button>
                    </>
                  )}
                  {selectedOrder.tracking_number && (
                    <Button variant="outline" className="h-9 px-3 text-xs sm:text-sm">
                      <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      <span className="hidden xs:block">Track Package</span>
                      <span className="xs:hidden">Track</span>
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

