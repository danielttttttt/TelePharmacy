import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  User, 
  Edit3, 
  MapPin, 
  Lock, 
  Bell, 
  CreditCard,
  Shield,
  Phone,
  Mail,
  Calendar,
  Save,
  Plus,
  Trash2,
  Settings,
  Heart,
  History
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('personal')
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})
  const [addresses, setAddresses] = useState([])
  const [notifications, setNotifications] = useState({})
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/profile' } } })
      return
    }
    loadUserData()
  }, [isAuthenticated, navigate])

  // Mock user data - will be replaced with API calls
  const mockUserData = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    date_of_birth: "1990-05-15",
    gender: "Male",
    emergency_contact: "+1 (555) 987-6543",
    insurance_provider: "HealthInsure Plus",
    insurance_number: "HIP123456789",
    profile_picture: "/api/placeholder/150/150",
    joined_date: "2023-01-15",
    total_orders: 25,
    loyalty_points: 340
  }

  const mockAddresses = [
    {
      id: 1,
      type: "Home",
      address_line_1: "123 Main Street",
      address_line_2: "Apt 4B",
      city: "Downtown",
      state: "NY",
      zip_code: "10001",
      is_default: true
    },
    {
      id: 2,
      type: "Work",
      address_line_1: "456 Business Ave",
      address_line_2: "Suite 200",
      city: "Business District",
      state: "NY",
      zip_code: "10002",
      is_default: false
    }
  ]

  const mockNotificationSettings = {
    email_notifications: true,
    sms_notifications: false,
    order_updates: true,
    promotional_emails: true,
    prescription_reminders: true,
    health_tips: false
  }

  const loadUserData = async () => {
    setLoading(true)
    try {
      // Simulate API calls - replace with actual endpoints
      setFormData(user || mockUserData)
      setAddresses(mockAddresses)
      setNotifications(mockNotificationSettings)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      const result = await updateProfile(formData)
      if (result?.success) {
        setEditMode(false)
        alert('Profile updated successfully!')
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleAddAddress = () => {
    // Navigate to add address form or open modal
    alert('Add new address functionality - will be implemented with backend')
  }

  const handleDeleteAddress = async (addressId) => {
    if (confirm('Delete this address?')) {
      // Simulate API call
      setAddresses(prev => prev.filter(addr => addr.id !== addressId))
      alert('Address deleted successfully')
    }
  }

  const handleNotificationChange = async (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
    // Simulate API call - replace with actual endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      console.log('Notification settings updated:', { [key]: value })
    } catch (error) {
      console.error('Error updating notification settings:', error)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const displayUser = user || mockUserData

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={displayUser.profile_picture} 
                  alt={`${displayUser.first_name} ${displayUser.last_name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hidden w-full h-full bg-gray-300 rounded-full items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
              </div>
              <Button size="sm" className="absolute -bottom-1 -right-1 rounded-full p-2 h-8 w-8">
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {displayUser.first_name} {displayUser.last_name}
              </h1>
              <p className="text-gray-600 mb-4">{displayUser.email}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(displayUser.joined_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <History className="h-4 w-4" />
                  <span>{displayUser.total_orders} Orders</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{displayUser.loyalty_points} Loyalty Points</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{displayUser.total_orders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{displayUser.loyalty_points}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8 max-w-[1400px] mx-auto">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'personal', label: 'Personal Info', icon: User },
                { id: 'addresses', label: 'Addresses', icon: MapPin },
                { id: 'security', label: 'Security', icon: Lock },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'preferences', label: 'Preferences', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-[1400px] mx-auto">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <Button
                  onClick={() => setEditMode(!editMode)}
                  variant={editMode ? "destructive" : "default"}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {editMode ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    {editMode ? (
                      <Input
                        id="first_name"
                        value={formData.first_name || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{displayUser.first_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    {editMode ? (
                      <Input
                        id="last_name"
                        value={formData.last_name || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{displayUser.last_name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    {editMode ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{displayUser.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {editMode ? (
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{displayUser.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    {editMode ? (
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={formData.date_of_birth || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {displayUser.date_of_birth ? new Date(displayUser.date_of_birth).toLocaleDateString() : 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    {editMode ? (
                      <select
                        id="gender"
                        value={formData.gender || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                        className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-gray-900">{displayUser.gender || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="emergency_contact">Emergency Contact</Label>
                    {editMode ? (
                      <Input
                        id="emergency_contact"
                        type="tel"
                        value={formData.emergency_contact || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact: e.target.value }))}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{displayUser.emergency_contact || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="insurance_provider">Insurance Provider</Label>
                    {editMode ? (
                      <Input
                        id="insurance_provider"
                        value={formData.insurance_provider || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, insurance_provider: e.target.value }))}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{displayUser.insurance_provider || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Delivery Addresses</h2>
                <Button onClick={handleAddAddress}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <Card key={address.id} className={`relative ${address.is_default ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          {address.type}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          {address.is_default && (
                            <Badge className="text-xs">Default</Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{address.address_line_1}</p>
                        {address.address_line_2 && <p>{address.address_line_2}</p>}
                        <p>{address.city}, {address.state} {address.zip_code}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        {!address.is_default && (
                          <Button size="sm" className="flex-1">
                            Set Default
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {addresses.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No addresses added yet</p>
                  <p className="text-gray-400 text-sm mb-4">Add your delivery addresses for faster checkout</p>
                  <Button onClick={handleAddAddress}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Address
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Security & Privacy</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Change Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="current_password">Current Password</Label>
                      <Input id="current_password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="new_password">New Password</Label>
                      <Input id="new_password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirm_password">Confirm New Password</Label>
                      <Input id="confirm_password" type="password" />
                    </div>
                    <Button className="w-full">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Two-Factor Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">SMS Authentication</p>
                        <p className="text-sm text-gray-600">Get codes via SMS</p>
                      </div>
                      <Badge variant="secondary">Disabled</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Enable 2FA
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'New York, NY', time: '2 hours ago', current: true },
                      { device: 'Mobile App', location: 'New York, NY', time: '1 day ago', current: false },
                      { device: 'Firefox on MacOS', location: 'Boston, MA', time: '3 days ago', current: false }
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{session.device}</p>
                          <p className="text-sm text-gray-600">{session.location} • {session.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.current && <Badge className="text-xs">Current</Badge>}
                          {!session.current && (
                            <Button variant="outline" size="sm">
                              Revoke
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Communication Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { key: 'email_notifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                      { key: 'sms_notifications', label: 'SMS Notifications', description: 'Receive notifications via text message' },
                      { key: 'order_updates', label: 'Order Updates', description: 'Get notified about order status changes' },
                      { key: 'promotional_emails', label: 'Promotional Emails', description: 'Receive offers and promotions' },
                      { key: 'prescription_reminders', label: 'Prescription Reminders', description: 'Reminders for prescription refills' },
                      { key: 'health_tips', label: 'Health Tips', description: 'Weekly health and wellness tips' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-gray-600">{description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[key] || false}
                            onChange={(e) => handleNotificationChange(key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Account Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Language & Region</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="CST">Central Time (CST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data & Privacy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        Download My Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-orange-600 hover:bg-orange-50">
                        Request Account Deletion
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Privacy Policy
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Terms of Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

