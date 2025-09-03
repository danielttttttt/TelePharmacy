import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Search, 
  Phone, 
  Clock, 
  Star,
  Navigation,
  Filter,
  ChevronDown,
  Users,
  Pill,
  ShoppingCart,
  ExternalLink
} from 'lucide-react'

const Pharmacies = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [pharmacies, setPharmacies] = useState([])
  const [loading, setLoading] = useState(false)

  // Mock pharmacy data - will be replaced with API calls
  const mockPharmacies = [
    {
      id: 1,
      name: "HealthCare Pharmacy",
      address: "123 Main Street, Downtown",
      phone: "(555) 123-4567",
      rating: 4.8,
      reviews: 245,
      distance: "0.5 miles",
      isOpen: true,
      hours: "8:00 AM - 10:00 PM",
      services: ["Prescription", "Vaccination", "Consultation"],
      specialties: ["Diabetes Care", "Heart Health"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "City Medical Pharmacy",
      address: "456 Oak Avenue, Midtown",
      phone: "(555) 987-6543",
      rating: 4.6,
      reviews: 189,
      distance: "1.2 miles",
      isOpen: true,
      hours: "7:00 AM - 11:00 PM",
      services: ["Prescription", "Emergency", "Delivery"],
      specialties: ["Pediatric Care", "Senior Care"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Family Care Pharmacy",
      address: "789 Pine Road, Westside",
      phone: "(555) 456-7890",
      rating: 4.7,
      reviews: 156,
      distance: "2.1 miles",
      isOpen: false,
      hours: "9:00 AM - 8:00 PM",
      services: ["Prescription", "Consultation"],
      specialties: ["Family Medicine", "Chronic Care"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Express Pharmacy",
      address: "321 Elm Street, Eastside",
      phone: "(555) 654-3210",
      rating: 4.4,
      reviews: 98,
      distance: "3.5 miles",
      isOpen: true,
      hours: "24/7",
      services: ["Prescription", "Emergency", "Drive-through"],
      specialties: ["24/7 Service", "Emergency Care"],
      image: "/api/placeholder/300/200"
    }
  ]

  useEffect(() => {
    // Simulate API call - replace with actual API endpoint
    setLoading(true)
    setTimeout(() => {
      setPharmacies(mockPharmacies)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedFilter === 'all') return matchesSearch
    if (selectedFilter === 'open') return matchesSearch && pharmacy.isOpen
    if (selectedFilter === '24h') return matchesSearch && pharmacy.hours === '24/7'
    if (selectedFilter === 'delivery') return matchesSearch && pharmacy.services.includes('Delivery')
    
    return matchesSearch
  })

  const handleGetDirections = (pharmacy) => {
    // This would integrate with Google Maps or similar service
    console.log('Getting directions to:', pharmacy.name)
    // Example: window.open(`https://maps.google.com/dir/?api=1&destination=${encodeURIComponent(pharmacy.address)}`)
  }

  const handleCallPharmacy = (phone) => {
    window.open(`tel:${phone}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b w-full">
        <div className="max-w-[1400px] mx-auto px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Nearby Pharmacies</h1>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by pharmacy name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 h-12 text-base"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 h-12 text-base border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">All Pharmacies</option>
                <option value="open">Open Now</option>
                <option value="24h">24/7 Service</option>
                <option value="delivery">Delivery Available</option>
              </select>
              
              <Button variant="outline" className="px-4 py-3 h-12 text-base">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full px-4 py-6 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            {loading ? 'Searching...' : `${filteredPharmacies.length} pharmacies found`}
          </h2>
          <Button variant="outline" className="hidden md:flex h-10 px-3 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            View on Map
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

          {/* Pharmacy Cards */}
          {!loading && (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {filteredPharmacies.map((pharmacy) => (
              <Card key={pharmacy.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold">{pharmacy.name}</h3>
                        {pharmacy.isOpen ? (
                          <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm">
                            Open
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs sm:text-sm">
                            Closed
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{pharmacy.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{pharmacy.distance} away</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating and Hours */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-xs sm:text-sm font-medium">{pharmacy.rating}</span>
                      <span className="ml-1 text-xs sm:text-sm text-gray-600">({pharmacy.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{pharmacy.hours}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {pharmacy.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-[0.6rem] sm:text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {pharmacy.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-[0.6rem] sm:text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button 
                      onClick={() => handleGetDirections(pharmacy)}
                      className="h-10 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm"
                    >
                      <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      Get Directions
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleCallPharmacy(pharmacy.phone)}
                      className="h-10 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm"
                    >
                      <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      Call
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-10 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm"
                    >
                      <Pill className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      Check Stock
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredPharmacies.length === 0 && (
          <Card className="text-center py-8 sm:py-12">
            <CardContent>
              <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">No pharmacies found</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 px-4">
                Try adjusting your search criteria or location.
              </p>
              <Button 
                onClick={() => setSearchQuery('')} 
                className="h-10 px-4 text-sm"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
        </div>
      </div>

      {/* Emergency Section */}
      <div className="bg-red-50 border-t border-red-200 py-6 sm:py-8 w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-2">Need Emergency Medication?</h3>
          <p className="text-xs sm:text-sm text-red-700 mb-3 sm:mb-4 px-4">
            For urgent medication needs, call our 24/7 emergency hotline
          </p>
          <Button className="bg-red-600 hover:bg-red-700 h-10 sm:h-11 px-4 sm:px-6 text-xs sm:text-sm">
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            Call Emergency Line: 1-800-EMERGENCY
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pharmacies