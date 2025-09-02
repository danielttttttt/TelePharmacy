import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Search,
  MapPin,
  Phone,
  Clock,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Pill,
  Heart,
  Users,
  Award
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const { isAuthenticated, user } = useAuth()

  // Mock data - will be replaced with API calls
  const featuredProducts = [
    { id: 1, name: "Pain Relief Tablets", price: "$12.99", category: "Pain Relief" },
    { id: 2, name: "Vitamin D3 Supplements", price: "$18.50", category: "Vitamins" },
    { id: 3, name: "Blood Pressure Monitor", price: "$45.00", category: "Medical Devices" },
    { id: 4, name: "First Aid Kit", price: "$25.99", category: "Emergency Care" }
  ]

  const categories = [
    { name: "Pain Relief", count: 45, icon: "💊" },
    { name: "Vitamins", count: 32, icon: "🌿" },
    { name: "First Aid", count: 28, icon: "🩹" },
    { name: "Personal Care", count: 56, icon: "🧴" }
  ]

  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Products Available", value: "5,000+", icon: Pill },
    { label: "Partner Pharmacies", value: "150+", icon: MapPin },
    { label: "Years of Service", value: "15+", icon: Award }
  ]

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Hero Section */}
      <section className="bg-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {isAuthenticated ? (
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome back, {user?.first_name || 'User'}! 👋
              </h1>
              <p className="text-xl text-gray-600">
                Your health is our priority. What can we help you find today?
              </p>
            </div>
          ) : (
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Your Trusted Online Pharmacy
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get your medications delivered safely and quickly. Browse thousands of products from licensed pharmacies.
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogue">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Search className="mr-2 h-5 w-5" />
                Browse Medicines
              </Button>
            </Link>
            <Link to="/pharmacies">
              <Button variant="outline" size="lg" className="px-8 py-3">
                <MapPin className="mr-2 h-5 w-5" />
                Find Pharmacies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-blue-600 text-white w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <IconComponent className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={`/catalogue?category=${category.name}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/catalogue">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Pill className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">{product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TelePharmacy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Get your medications delivered to your doorstep within 24 hours.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Licensed & Safe</h3>
              <p className="text-gray-600">All our partner pharmacies are licensed and follow strict safety protocols.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is available round the clock to help you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!isAuthenticated && (
        <section className="py-16 bg-blue-600 text-white w-full">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of satisfied customers who trust us with their health needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/catalogue">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact Info */}
      <section className="py-12 bg-gray-800 text-white w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">1-800-PHARMACY</p>
              <p className="text-gray-300">(1-800-742-7622)</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Hours</h3>
              <p className="text-gray-300">24/7 Online Ordering</p>
              <p className="text-gray-300">Support: Mon-Fri 8AM-8PM</p>
            </div>
            <div className="text-center">
              <Heart className="h-8 w-8 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Emergency</h3>
              <p className="text-gray-300">24/7 Emergency Hotline</p>
              <p className="text-gray-300">1-800-HELP-NOW</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

