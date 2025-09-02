import { createContext, useContext, useState, useEffect } from 'react'
import { AuthService } from '../services/index.js'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('pharmacy_auth_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      fetchUserProfile()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUserProfile = async () => {
    try {
      const result = await AuthService.getProfile(token)
      
      if (result.success && result.user) {
        setUser(result.user)
      } else {
        // Token is invalid, remove it
        logout()
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const result = await AuthService.login(email, password)
      
      if (result.success && result.token && result.user) {
        setToken(result.token)
        setUser(result.user)
        // Token is already stored by AuthService
      }
      
      return result
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  const register = async (userData) => {
    try {
      const result = await AuthService.register(userData)
      
      if (result.success && result.token && result.user) {
        setToken(result.token)
        setUser(result.user)
        // Token is already stored by AuthService
      }
      
      return result
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, message: 'Registration failed. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout(token)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setToken(null)
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const result = await AuthService.updateProfile(token, profileData)
      
      if (result.success && result.user) {
        setUser(result.user)
      }
      
      return result
    } catch (error) {
      console.error('Profile update error:', error)
      return { success: false, message: 'Profile update failed. Please try again.' }
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

