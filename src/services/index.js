/**
 * Service Factory
 * 
 * This file exports the appropriate services based on configuration.
 * It automatically switches between mock services (for frontend-only development)
 * and real API services (when backend is available).
 * 
 * Backend developers: When your API is ready, simply set USE_MOCK_SERVICES to false
 * in config/api.js and all services will automatically use your real API endpoints.
 */

import { API_CONFIG } from '../config/api.js'

// Mock services (for frontend-only development)
import MockAuthService from './mock/MockAuthService.js'
import MockMedicineService from './mock/MockMedicineService.js'
import MockCartService from './mock/MockCartService.js'
import MockOrderService from './mock/MockOrderService.js'
import MockPharmacyService from './mock/MockPharmacyService.js'

// Real API services (for when backend is ready)
import RealAuthService from './api/AuthService.js'
import RealMedicineService from './api/MedicineService.js'
import RealCartService from './api/CartService.js'
import RealOrderService from './api/OrderService.js'
import RealPharmacyService from './api/PharmacyService.js'

/**
 * Service instances
 * Automatically chooses between mock and real services based on configuration
 */
export const AuthService = API_CONFIG.USE_MOCK_SERVICES 
  ? new MockAuthService() 
  : new RealAuthService()

export const MedicineService = API_CONFIG.USE_MOCK_SERVICES 
  ? new MockMedicineService() 
  : new RealMedicineService()

export const CartService = API_CONFIG.USE_MOCK_SERVICES 
  ? new MockCartService() 
  : new RealCartService()

export const OrderService = API_CONFIG.USE_MOCK_SERVICES 
  ? new MockOrderService() 
  : new RealOrderService()

export const PharmacyService = API_CONFIG.USE_MOCK_SERVICES 
  ? new MockPharmacyService() 
  : new RealPharmacyService()

/**
 * Service status for debugging
 */
export const getServiceStatus = () => ({
  usingMockServices: API_CONFIG.USE_MOCK_SERVICES,
  baseUrl: API_CONFIG.BASE_URL,
  services: {
    auth: API_CONFIG.USE_MOCK_SERVICES ? 'Mock' : 'Real',
    medicine: API_CONFIG.USE_MOCK_SERVICES ? 'Mock' : 'Real',
    cart: API_CONFIG.USE_MOCK_SERVICES ? 'Mock' : 'Real',
    order: API_CONFIG.USE_MOCK_SERVICES ? 'Mock' : 'Real',
    pharmacy: API_CONFIG.USE_MOCK_SERVICES ? 'Mock' : 'Real'
  }
})

// Log service status in development
if (import.meta.env.DEV) {
  console.log('🔧 Service Configuration:', getServiceStatus())
}