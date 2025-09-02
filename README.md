# 🏥 TelePharmacy Frontend

A modern, responsive React application for online pharmacy services. This frontend is designed to work both as a standalone application with mock data and seamlessly integrate with a backend API.

## ✨ Features

### 🔐 **Authentication System**
- User registration and login
- JWT token-based authentication
- Profile management
- Secure logout

### 💊 **Medicine Catalog**
- Browse medicines with advanced filtering
- Search by name, brand, or description
- Category-based filtering
- Price range filtering
- Prescription vs. OTC filtering
- Pagination support

### 🛒 **Shopping Cart**
- Add medicines to cart
- Update quantities
- Remove items
- Real-time price calculation
- Prescription warnings

### 📦 **Order Management**
- Create orders from cart
- Order history tracking
- Order status updates
- Order cancellation

### 🏥 **Pharmacy Locator**
- Find nearby pharmacies
- Pharmacy details and hours
- Services offered
- Contact information

### 📱 **Responsive Design**
- Mobile-first design
- Touch-friendly interface
- Accessible UI components
- Cross-browser compatibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm 10.4.1+

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd pharmacy_frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`

### Default Test User
The application comes with a pre-configured test user:
- **Email**: `john.doe@example.com`
- **Password**: `password123`

## 🔧 Configuration Modes

### 🎭 **Frontend-Only Mode (Default)**
Perfect for development, demos, and when backend is not ready:
- Uses mock data and localStorage
- Fully functional UI
- Realistic data simulation
- No backend required

### 🌐 **Backend Integration Mode**
For production use with real API:
```javascript
// In src/config/api.js
export const API_CONFIG = {
  USE_MOCK_SERVICES: false,  // Switch to false
  BASE_URL: 'https://your-api.com',  // Your API URL
}
```

### Environment Variables
Create a `.env` file:
```bash
VITE_API_BASE_URL=https://your-backend-api.com
```

## 🏗️ Architecture

### **Service Layer Architecture**
```
src/
├── services/
│   ├── mock/           # Mock services for frontend-only mode
│   ├── api/            # Real API services for backend integration
│   └── index.js        # Service factory (auto-switches)
├── contexts/           # React Context for state management
├── components/         # Reusable UI components
├── pages/              # Application pages
└── utils/              # Utility functions
```

### **Key Architectural Decisions**
- **Service Abstraction**: Clean separation between UI and data layer
- **Environment-Based Switching**: Automatic service selection
- **Mock Data Persistence**: localStorage simulation of database
- **Consistent API Interface**: Same interface for mock and real services

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **UI Components**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS 4.1.7
- **Routing**: React Router DOM 7.6.1
- **State Management**: React Context API
- **Package Manager**: PNPM 10.4.1
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📚 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm lint             # Run ESLint

# Service Status
# Check which services are active (mock vs real)
# Look for console log: "🔧 Service Configuration"
```

## 🎯 Backend Integration

### For Backend Developers
Complete API documentation and integration guide: **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)**

### Quick Backend Setup
1. Set `USE_MOCK_SERVICES: false` in `src/config/api.js`
2. Update `BASE_URL` to your API endpoint
3. Implement endpoints matching the documented interface
4. Test with the frontend

### API Interface
The frontend expects RESTful endpoints:
- `POST /api/auth/login` - User authentication
- `GET /api/medicines` - Medicine catalog with filtering
- `POST /api/cart` - Cart management
- `POST /api/orders` - Order creation
- `GET /api/pharmacies` - Pharmacy locations

## 🧪 Testing

### Test Data Available
- **Users**: Pre-configured test accounts
- **Medicines**: 15+ realistic medicine entries
- **Categories**: Pain Relief, Antibiotics, Vitamins, etc.
- **Pharmacies**: 2 sample pharmacy locations

### Testing Scenarios
1. **Authentication Flow**: Register → Login → Profile Update
2. **Shopping Flow**: Browse → Search → Filter → Add to Cart → Checkout
3. **Order Management**: Create Order → View History → Cancel Order
4. **Pharmacy Locator**: Find Nearby → View Details

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security Features

- JWT token management
- Secure localStorage handling
- XSS protection via React
- Input validation
- Authentication guards

## 📊 Performance Features

- Lazy loading ready (can be implemented)
- Optimized bundle size with Vite
- Responsive images support
- Efficient re-renders with React 19

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
pnpm build

# The dist/ folder can be deployed to:
# - Vercel, Netlify, AWS S3
# - Any static hosting service
```

### Environment Variables for Production
```bash
VITE_API_BASE_URL=https://your-production-api.com
```

## 🔮 Future Enhancements

### Ready-to-Implement Features
- Real-time notifications
- Progressive Web App (PWA)
- Offline mode
- Push notifications
- Geolocation services
- Payment integration
- Prescription upload
- Video consultations

### Performance Optimizations
- Code splitting
- Image optimization
- Service worker caching
- CDN integration

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- ESLint configuration included
- Prettier formatting recommended
- Follow React hooks best practices
- Use TypeScript-style comments for better documentation

## 📞 Support

### Common Issues
1. **Services not working**: Check console for service configuration
2. **API errors**: Verify BASE_URL and backend connectivity
3. **Build errors**: Ensure Node.js 18+ and pnpm 10.4.1+

### Debug Mode
The application logs service configuration in development:
```
🔧 Service Configuration: {
  usingMockServices: true,
  baseUrl: "http://localhost:5000",
  services: { auth: "Mock", medicine: "Mock", ... }
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Lucide](https://lucide.dev/) for beautiful icons

---

**Built with ❤️ for the healthcare community**