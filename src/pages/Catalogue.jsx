import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Eye, 
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Star,
  Heart,
  AlertCircle,
  SortDesc,
  Package,
  Pill
} from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { MedicineService } from '../services/index.js'

const Catalogue = () => {
  const [medicines, setMedicines] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [pagination, setPagination] = useState({})
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('name')
  const [wishlist, setWishlist] = useState(new Set())

  // Filter states
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    prescription_required: searchParams.get('prescription_required') || '',
    sort_by: searchParams.get('sort_by') || 'name',
    page: parseInt(searchParams.get('page')) || 1
  })

  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  // Mock data for immediate display - will be replaced with API calls
  const mockCategories = [
    'Pain Relief', 'Antibiotics', 'Vitamins & Supplements', 'Heart Health',
    'Diabetes Care', 'Allergy & Sinus', 'Digestive Health', 'Eye Care',
    'Skin Care', 'Women\'s Health', 'Men\'s Health', 'Baby & Child Care',
    'Medical Devices', 'First Aid', 'Mental Health'
  ]

  const mockMedicines = [
    {
      id: 101,
      name: 'Advanced Pain Relief Tablets',
      brand: 'HealthCorp',
      category: 'Pain Relief',
      description: 'Fast-acting pain relief for headaches, muscle aches, and joint pain. Non-drowsy formula.',
      price: 12.99,
      original_price: 15.99,
      prescription_required: false,
      availability_status: 'available',
      stock_quantity: 150,
      rating: 4.5,
      review_count: 128,
      image_url: '/api/placeholder/200/200',
      manufacturer: 'HealthCorp Pharmaceuticals',
      dosage_form: 'Tablets',
      strength: '500mg',
      pack_size: '20 tablets',
      active_ingredients: ['Acetaminophen', 'Ibuprofen'],
      is_featured: true,
      discount_percentage: 19
    },
    {
      id: 102,
      name: 'Blood Pressure Monitor Pro',
      brand: 'MedTech',
      category: 'Medical Devices',
      description: 'Digital blood pressure monitor with large display and memory storage for 99 readings.',
      price: 79.99,
      original_price: 99.99,
      prescription_required: false,
      availability_status: 'available',
      stock_quantity: 45,
      rating: 4.8,
      review_count: 89,
      image_url: '/api/placeholder/200/200',
      manufacturer: 'MedTech Solutions',
      warranty: '2 years',
      is_featured: true,
      discount_percentage: 20
    },
    {
      id: 103,
      name: 'Antibiotic Complex Prescription',
      brand: 'PharmaCorp',
      category: 'Antibiotics',
      description: 'Broad-spectrum antibiotic for bacterial infections. Prescription required.',
      price: 28.50,
      original_price: 28.50,
      prescription_required: true,
      availability_status: 'available',
      stock_quantity: 30,
      rating: 4.3,
      review_count: 45,
      image_url: '/api/placeholder/200/200',
      manufacturer: 'PharmaCorp Labs',
      dosage_form: 'Capsules',
      strength: '250mg',
      pack_size: '14 capsules'
    },
    {
      id: 104,
      name: 'Vitamin D3 High Potency',
      brand: 'WellnessPlus',
      category: 'Vitamins & Supplements',
      description: 'High potency Vitamin D3 supplements for bone health and immune support.',
      price: 24.99,
      original_price: 29.99,
      prescription_required: false,
      availability_status: 'available',
      stock_quantity: 200,
      rating: 4.6,
      review_count: 267,
      image_url: '/api/placeholder/200/200',
      manufacturer: 'WellnessPlus Nutrition',
      dosage_form: 'Softgels',
      strength: '5000 IU',
      pack_size: '120 softgels',
      discount_percentage: 17
    },
    {
      id: 105,
      name: 'Allergy Relief Nasal Spray',
      brand: 'AllerFree',
      category: 'Allergy & Sinus',
      description: 'Fast-acting nasal spray for seasonal allergies and congestion relief.',
      price: 15.33,
      original_price: 18.99,
      prescription_required: false,
      availability_status: 'low_stock',
      stock_quantity: 8,
      rating: 4.2,
      review_count: 73,
      image_url: '/api/placeholder/200/200',
      manufacturer: 'AllerFree Healthcare',
      dosage_form: 'Nasal Spray',
      pack_size: '120 sprays',
      discount_percentage: 19
    },
    {
      id: 106,
      name: 'Heart Health Omega-3',
      brand: 'CardioVita',
      category: 'Heart Health',
      description: 'Premium omega-3 fish oil supplements for cardiovascular health.',
      price: 32.99,
      original_price: 39.99,
      prescription_required: false,
      availability_status: 'available',
      stock_quantity: 95,
      rating: 4.7,
      review_count: 156,
      image_url: '/api/placeholder/200/200',
      manufacturer: 'CardioVita Supplements',
      dosage_form: 'Softgels',
      pack_size: '90 softgels',
      discount_percentage: 18
    }
  ]

  useEffect(() => {
    fetchCategories()
    // Initialize with mock data immediately for better UX
    setCategories(mockCategories)
    setMedicines(mockMedicines)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMedicines()
  }, [filters])

  const fetchCategories = async () => {
    try {
      const result = await MedicineService.getCategories()
      if (result.success) {
        setCategories(result.categories || mockCategories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      // Fallback to mock data
      setCategories(mockCategories)
    }
  }

  const fetchMedicines = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await MedicineService.getMedicines(filters)
      
      if (result.success) {
        let fetchedMedicines = result.medicines || mockMedicines
        
        // Apply local filtering and sorting for demo
        fetchedMedicines = filterAndSortMedicines(fetchedMedicines)
        
        setMedicines(fetchedMedicines)
        setPagination(result.pagination || {
          page: 1,
          pages: 1,
          total: fetchedMedicines.length,
          has_prev: false,
          has_next: false
        })
      } else {
        setError(result.message || 'Failed to fetch medicines')
        // Fallback to filtered mock data
        const filteredMedicines = filterAndSortMedicines(mockMedicines)
        setMedicines(filteredMedicines)
      }
    } catch (error) {
      console.error('Error fetching medicines:', error)
      setError('Failed to fetch medicines')
      // Fallback to filtered mock data
      const filteredMedicines = filterAndSortMedicines(mockMedicines)
      setMedicines(filteredMedicines)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortMedicines = (medicineList) => {
    let filtered = [...medicineList]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(med => 
        med.name.toLowerCase().includes(searchLower) ||
        med.brand.toLowerCase().includes(searchLower) ||
        med.category.toLowerCase().includes(searchLower) ||
        med.description.toLowerCase().includes(searchLower)
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(med => med.category === filters.category)
    }

    // Price range filter
    if (filters.min_price) {
      filtered = filtered.filter(med => med.price >= parseFloat(filters.min_price))
    }
    if (filters.max_price) {
      filtered = filtered.filter(med => med.price <= parseFloat(filters.max_price))
    }

    // Prescription filter
    if (filters.prescription_required !== '') {
      const requiresPrescription = filters.prescription_required === 'true'
      filtered = filtered.filter(med => med.prescription_required === requiresPrescription)
    }

    // Sorting
    const sortBy = filters.sort_by || sortBy
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price
        case 'price_high':
          return b.price - a.price
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'popularity':
          return (b.review_count || 0) - (a.review_count || 0)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 }
    setFilters(newFilters)
    
    // Update URL params
    const newParams = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newParams.set(k, v)
    })
    setSearchParams(newParams)
  }

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue)
    handleFilterChange('sort_by', sortValue)
  }

  const handlePageChange = (page) => {
    const newFilters = { ...filters, page }
    setFilters(newFilters)
    
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page)
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    const newFilters = {
      search: '',
      category: '',
      min_price: '',
      max_price: '',
      prescription_required: '',
      sort_by: 'name',
      page: 1
    }
    setFilters(newFilters)
    setSortBy('name')
    setSearchParams({})
  }

  const handleAddToCart = async (medicineId) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart')
      return
    }

    const result = await addToCart(medicineId, 1)
    if (result.success) {
      alert('Item added to cart successfully!')
    } else {
      alert(result.message)
    }
  }

  const toggleWishlist = (medicineId) => {
    if (!isAuthenticated) {
      alert('Please login to manage your wishlist')
      return
    }

    const newWishlist = new Set(wishlist)
    if (newWishlist.has(medicineId)) {
      newWishlist.delete(medicineId)
    } else {
      newWishlist.add(medicineId)
    }
    setWishlist(newWishlist)
  }

  const getStockStatus = (medicine) => {
    if (medicine.availability_status === 'out_of_stock') {
      return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' }
    } else if (medicine.availability_status === 'low_stock') {
      return { text: 'Low Stock', color: 'bg-orange-100 text-orange-800' }
    }
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' }
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <Pill className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Medicine Catalogue</h1>
                <p className="text-gray-600 mt-1">
                  Browse our wide selection of medicines and health products
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SortDesc className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm font-medium">Search Medicines</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by name, brand..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                  <select
                    id="category"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Price Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input
                        placeholder="Min ($)"
                        type="number"
                        min="0"
                        step="0.01"
                        value={filters.min_price}
                        onChange={(e) => handleFilterChange('min_price', e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Max ($)"
                        type="number"
                        min="0"
                        step="0.01"
                        value={filters.max_price}
                        onChange={(e) => handleFilterChange('max_price', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['10', '25', '50', '100'].map(price => (
                      <Button
                        key={price}
                        variant="outline"
                        size="sm"
                        onClick={() => handleFilterChange('max_price', price)}
                        className="text-xs"
                      >
                        Under ${price}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Prescription Required */}
                <div className="space-y-2">
                  <Label htmlFor="prescription" className="text-sm font-medium">Prescription</Label>
                  <select
                    id="prescription"
                    value={filters.prescription_required}
                    onChange={(e) => handleFilterChange('prescription_required', e.target.value)}
                    className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">All Medicines</option>
                    <option value="false">Over-the-Counter</option>
                    <option value="true">Prescription Required</option>
                  </select>
                </div>

                {/* Quick Filter Chips */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quick Filters</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange('category', 'Pain Relief')}
                      className="text-xs"
                    >
                      Pain Relief
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange('category', 'Vitamins & Supplements')}
                      className="text-xs"
                    >
                      Vitamins
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange('prescription_required', 'false')}
                      className="text-xs"
                    >
                      OTC Only
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Results Section */}
          <div className="lg:col-span-3 space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-48 bg-gray-200 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-600">
                      Showing <span className="font-medium">{medicines.length}</span> of{' '}
                      <span className="font-medium">{pagination.total || medicines.length}</span> medicines
                    </p>
                    {(filters.search || filters.category || filters.min_price || filters.max_price) && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Filter className="h-3 w-3" />
                        Filtered
                      </Badge>
                    )}
                  </div>
                  {pagination.pages > 1 && (
                    <p className="text-sm text-gray-600">
                      Page <span className="font-medium">{pagination.page}</span> of{' '}
                      <span className="font-medium">{pagination.pages}</span>
                    </p>
                  )}
                </div>

                {/* Medicine Grid/List */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {medicines.map((medicine) => {
                    const stockStatus = getStockStatus(medicine)
                    const isInWishlist = wishlist.has(medicine.id)
                    
                    return (
                      <Card key={medicine.id} className={`group hover:shadow-lg transition-all duration-200 ${
                        viewMode === 'list' ? 'flex' : ''
                      } ${medicine.availability_status === 'out_of_stock' ? 'opacity-75' : ''}`}>
                        <CardContent className={`p-0 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                          {/* Product Image */}
                          <div className={`relative bg-gray-50 flex items-center justify-center ${
                            viewMode === 'list' ? 'w-48 h-48' : 'h-48'
                          } ${medicine.availability_status === 'out_of_stock' ? 'grayscale' : ''}`}>
                            <img 
                              src={medicine.image_url} 
                              alt={medicine.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                            <div className="hidden w-full h-full bg-gray-100 items-center justify-center text-gray-400">
                              <Package className="h-12 w-12" />
                            </div>
                            
                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              {medicine.is_featured && (
                                <Badge className="bg-blue-500 text-white text-xs">Featured</Badge>
                              )}
                              {medicine.discount_percentage > 0 && (
                                <Badge className="bg-red-500 text-white text-xs">
                                  {medicine.discount_percentage}% OFF
                                </Badge>
                              )}
                            </div>
                            
                            {/* Wishlist Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleWishlist(medicine.id)}
                              className={`absolute top-2 right-2 p-2 rounded-full ${
                                isInWishlist ? 'text-red-500 bg-white' : 'text-gray-400 bg-white/80'
                              } hover:bg-white`}
                            >
                              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
                            </Button>
                            
                            {medicine.availability_status === 'out_of_stock' && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Badge variant="destructive">Out of Stock</Badge>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                            <div className={`space-y-3 ${viewMode === 'list' ? 'flex flex-col justify-between h-full' : ''}`}>
                              <div>
                                {/* Title and Prescription Badge */}
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h3 className="font-semibold text-lg leading-tight group-hover:text-blue-600 transition-colors">
                                    {medicine.name}
                                  </h3>
                                  {medicine.prescription_required && (
                                    <Badge variant="destructive" className="text-xs flex-shrink-0">
                                      Rx
                                    </Badge>
                                  )}
                                </div>

                                {/* Brand and Category */}
                                <p className="text-sm text-gray-600 mb-2">
                                  <span className="font-medium">{medicine.brand}</span> • {medicine.category}
                                </p>

                                {/* Description */}
                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                  {medicine.description}
                                </p>

                                {/* Rating and Reviews */}
                                {medicine.rating && (
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < Math.floor(medicine.rating)
                                              ? 'text-yellow-400 fill-current'
                                              : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm font-medium">{medicine.rating}</span>
                                    <span className="text-sm text-gray-500">({medicine.review_count})</span>
                                  </div>
                                )}
                              </div>

                              {/* Price and Stock */}
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-gray-900">
                                      ${medicine.price.toFixed(2)}
                                    </span>
                                    {medicine.original_price && medicine.original_price > medicine.price && (
                                      <span className="text-sm text-gray-500 line-through">
                                        ${medicine.original_price.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                  <Badge className={stockStatus.color} variant="secondary">
                                    {stockStatus.text}
                                  </Badge>
                                </div>

                                {/* Medicine Details */}
                                {(medicine.dosage_form || medicine.strength || medicine.pack_size) && (
                                  <div className="text-xs text-gray-500 space-y-1">
                                    {medicine.dosage_form && <div>Form: {medicine.dosage_form}</div>}
                                    {medicine.strength && <div>Strength: {medicine.strength}</div>}
                                    {medicine.pack_size && <div>Pack: {medicine.pack_size}</div>}
                                  </div>
                                )}

                                {/* Action Buttons */}
                                <div className={`flex gap-2 pt-2 ${
                                  viewMode === 'list' ? 'flex-row' : 'flex-col'
                                }`}>
                                  <Link to={`/product/${medicine.id}`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full">
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </Button>
                                  </Link>
                                  <Button
                                    size="sm"
                                    onClick={() => handleAddToCart(medicine.id)}
                                    disabled={medicine.availability_status === 'out_of_stock'}
                                    className="flex-1"
                                  >
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {medicine.availability_status === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {medicines.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <div className="mb-6">
                      <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">No medicines found</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {filters.search || filters.category || filters.min_price || filters.max_price
                          ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                          : 'It looks like our medicine catalog is currently empty. Please check back later.'}
                      </p>
                    </div>
                    
                    {(filters.search || filters.category || filters.min_price || filters.max_price) && (
                      <div className="space-y-4">
                        <Button onClick={clearFilters} variant="outline">
                          Clear All Filters
                        </Button>
                        <div className="text-sm text-gray-500">
                          <p>Suggestions:</p>
                          <ul className="mt-2 space-y-1">
                            <li>• Check your spelling</li>
                            <li>• Try more general terms</li>
                            <li>• Browse by category</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Enhanced Pagination */}
                {pagination.pages > 1 && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Showing {((pagination.page - 1) * 12) + 1} to{' '}
                          {Math.min(pagination.page * 12, pagination.total)} of{' '}
                          {pagination.total} results
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(pagination.page - 1)}
                          disabled={!pagination.has_prev}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                            const pageNum = i + 1
                            return (
                              <Button
                                key={pageNum}
                                variant={pageNum === pagination.page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                className="w-10 h-10"
                              >
                                {pageNum}
                              </Button>
                            )
                          })}
                          
                          {pagination.pages > 5 && (
                            <>
                              <span className="text-gray-400 px-2">...</span>
                              <Button
                                variant={pagination.pages === pagination.page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handlePageChange(pagination.pages)}
                                className="w-10 h-10"
                              >
                                {pagination.pages}
                              </Button>
                            </>
                          )}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(pagination.page + 1)}
                          disabled={!pagination.has_next}
                          className="flex items-center gap-1"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalogue