import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Pill,
  Home,
  Search,
  MapPin,
  Package,
  LogOut
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const { getCartItemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Main Header Bar */}
      <div className="w-full bg-blue-600 text-white py-4 px-6 flex items-center justify-between shadow-lg">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <Pill className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold">TelePharmacy</h1>
            <p className="text-sm text-blue-100">Your Health Partner</p>
          </div>
        </Link>

        {/* Desktop Navigation - Always Visible */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-blue-200 font-medium flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span className="hidden sm:block">Home</span>
          </Link>
          <Link to="/catalogue" className="text-white hover:text-blue-200 font-medium flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span className="hidden sm:block">Medicines</span>
          </Link>
          <Link to="/pharmacies" className="text-white hover:text-blue-200 font-medium flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span className="hidden sm:block">Pharmacies</span>
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className="text-white hover:text-blue-200 font-medium flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span className="hidden sm:block">Orders</span>
            </Link>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          {isAuthenticated && (
            <Link to="/cart" className="relative">
              <Button variant="ghost" className="text-white hover:bg-blue-500 p-2">
                <ShoppingCart className="h-6 w-6" />
                {getCartItemCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5">
                    {getCartItemCount()}
                  </Badge>
                )}
              </Button>
            </Link>
          )}

          {/* User Section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-medium">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:block">Hi, {user?.first_name || 'User'}!</span>
                  <span className="sm:hidden">Profile</span>
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="text-white hover:bg-blue-500"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-blue-500 border border-white">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-medium">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost" 
            className="sm:hidden text-white hover:bg-blue-500 p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-blue-500 text-white p-4 space-y-3">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-blue-400 px-3 rounded">
            <div className="flex items-center space-x-3">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </div>
          </Link>
          <Link to="/catalogue" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-blue-400 px-3 rounded">
            <div className="flex items-center space-x-3">
              <Search className="h-5 w-5" />
              <span>Browse Medicines</span>
            </div>
          </Link>
          <Link to="/pharmacies" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-blue-400 px-3 rounded">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5" />
              <span>Find Pharmacies</span>
            </div>
          </Link>
          {isAuthenticated && (
            <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-blue-400 px-3 rounded">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5" />
                <span>My Orders</span>
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  )
}

export default Header

