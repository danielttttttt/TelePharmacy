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
      <div className="w-full bg-blue-600 text-white py-3 px-4 flex items-center justify-between shadow-lg">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 min-w-0">
          <Pill className="h-7 w-7 text-white flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-xl font-bold truncate">TelePharmacy</h1>
            <p className="text-xs text-blue-100 truncate hidden sm:block">Your Health Partner</p>
          </div>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-blue-200 font-medium flex items-center space-x-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/catalogue" className="text-white hover:text-blue-200 font-medium flex items-center space-x-1">
            <Search className="h-4 w-4" />
            <span>Medicines</span>
          </Link>
          <Link to="/pharmacies" className="text-white hover:text-blue-200 font-medium flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Pharmacies</span>
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className="text-white hover:text-blue-200 font-medium flex items-center space-x-1">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </Link>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Cart Icon */}
          {isAuthenticated && (
            <Link to="/cart" className="relative">
              <Button variant="ghost" className="text-white hover:bg-blue-500 p-2 h-10 w-10">
                <ShoppingCart className="h-5 w-5" />
                {getCartItemCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 h-4 min-w-[16px] flex items-center justify-center">
                    {getCartItemCount()}
                  </Badge>
                )}
              </Button>
            </Link>
          )}

          {/* User Section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link to="/profile">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-medium h-10 px-2 sm:px-3">
                  <User className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:block text-sm">Hi, {user?.first_name || 'User'}!</span>
                  <span className="xs:hidden">Profile</span>
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="text-white hover:bg-blue-500 h-10 w-10 p-2"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-blue-500 border border-white h-10 px-3">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-medium h-10 px-3">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost" 
            className="text-white hover:bg-blue-500 p-2 h-10 w-10 md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 text-white py-2 px-4 space-y-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-3 hover:bg-blue-400 px-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </div>
          </Link>
          <Link to="/catalogue" onClick={() => setIsMenuOpen(false)} className="block py-3 hover:bg-blue-400 px-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <Search className="h-5 w-5" />
              <span>Browse Medicines</span>
            </div>
          </Link>
          <Link to="/pharmacies" onClick={() => setIsMenuOpen(false)} className="block py-3 hover:bg-blue-400 px-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5" />
              <span>Find Pharmacies</span>
            </div>
          </Link>
          {isAuthenticated && (
            <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block py-3 hover:bg-blue-400 px-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5" />
                <span>My Orders</span>
              </div>
            </Link>
          )}
          {/* Mobile Auth Actions */}
          {!isAuthenticated && (
            <div className="flex space-x-2 pt-2 pb-3">
              <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-white hover:bg-blue-400 border border-white py-2 h-auto">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-medium py-2 h-auto">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Header