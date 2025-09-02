# 🚀 Backend Integration Guide for Pharmacy Frontend

This document provides complete instructions for backend developers to implement the API that this frontend expects.

## 📋 Quick Start for Backend Integration

### 1. **Switch to Real API Mode**
```javascript
// In src/config/api.js
export const API_CONFIG = {
  USE_MOCK_SERVICES: false,  // Change this to false
  BASE_URL: 'https://your-api-domain.com',  // Update this URL
  // ... rest of config
}
```

### 2. **Environment Variables**
Create a `.env` file in the frontend root:
```bash
VITE_API_BASE_URL=https://your-api-domain.com
```

## 🎯 API Requirements Overview

The frontend expects a RESTful API with the following characteristics:
- **Authentication**: JWT Bearer token-based
- **Response Format**: JSON with consistent error handling
- **CORS**: Must allow requests from your frontend domain
- **HTTPS**: Required for production

## 🔐 Authentication API Endpoints

### **POST** `/api/auth/login`
**Purpose**: User login with email and password

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1-555-0123",
    "date_of_birth": "1990-01-01",
    "address": {
      "street": "123 Main St",
      "city": "Springfield",
      "state": "IL",
      "zip_code": "62701",
      "country": "USA"
    },
    "insurance_info": {
      "provider": "Blue Cross",
      "policy_number": "BC123456789",
      "group_number": "GRP001"
    },
    "email_verified": true
  }
}
```

**Error Response (400/401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### **POST** `/api/auth/register`
**Purpose**: User registration

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "+1-555-0456"  // Optional
}
```

**Response Format**: Same as login

### **GET** `/api/auth/profile`
**Purpose**: Get current user profile
**Headers**: `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    // Same user object as login
  }
}
```

### **PUT** `/api/auth/profile`
**Purpose**: Update user profile
**Headers**: `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "first_name": "Updated Name",
  "phone": "+1-555-9999",
  "address": {
    "street": "456 New St",
    "city": "Springfield",
    "state": "IL",
    "zip_code": "62702",
    "country": "USA"
  }
}
```

### **POST** `/api/auth/logout`
**Purpose**: User logout (optional - for token blacklisting)
**Headers**: `Authorization: Bearer {token}`

## 💊 Medicine API Endpoints

### **GET** `/api/medicines`
**Purpose**: Get medicine list with filtering and pagination

**Query Parameters:**
- `search` (string): Search in name, brand, description
- `category` (string): Filter by category
- `min_price` (number): Minimum price filter
- `max_price` (number): Maximum price filter
- `prescription_required` (boolean): Filter by prescription requirement
- `availability_status` (string): 'available' | 'out_of_stock'
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)

**Success Response (200):**
```json
{
  "success": true,
  "medicines": [
    {
      "id": "med_001",
      "name": "Acetaminophen 500mg",
      "brand": "Tylenol",
      "category": "Pain Relief",
      "description": "Fast-acting pain reliever and fever reducer",
      "price": 12.99,
      "stock_quantity": 150,
      "prescription_required": false,
      "availability_status": "available",
      "dosage_form": "Tablet",
      "active_ingredients": ["Acetaminophen 500mg"],
      "warnings": ["Do not exceed 8 tablets in 24 hours"],
      "image_url": "https://your-cdn.com/medicine-images/med_001.jpg",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 150,
    "pages": 13,
    "has_prev": false,
    "has_next": true
  }
}
```

### **GET** `/api/medicines/{id}`
**Purpose**: Get medicine details by ID

**Success Response (200):**
```json
{
  "success": true,
  "medicine": {
    // Same medicine object as above
  }
}
```

### **GET** `/api/medicines/categories`
**Purpose**: Get all medicine categories

**Success Response (200):**
```json
{
  "success": true,
  "categories": [
    "Pain Relief",
    "Antibiotics",
    "Vitamins & Supplements",
    "Digestive Health"
  ]
}
```

## 🛒 Cart API Endpoints

### **GET** `/api/cart`
**Purpose**: Get user's cart items
**Headers**: `Authorization: Bearer {token}`

**Success Response (200):**
```json
{
  "success": true,
  "cart_items": [
    {
      "id": "cart_item_123",
      "medicine_id": "med_001",
      "quantity": 2,
      "medicine": {
        // Full medicine object
      },
      "added_at": "2024-01-15T14:30:00Z",
      "updated_at": "2024-01-15T14:30:00Z"
    }
  ],
  "total_items": 2,
  "total_amount": 25.98
}
```

### **POST** `/api/cart`
**Purpose**: Add item to cart
**Headers**: `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "medicine_id": "med_001",
  "quantity": 1
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Item added to cart successfully",
  "cart_item": {
    // Cart item object
  }
}
```

### **PUT** `/api/cart/{cart_item_id}`
**Purpose**: Update cart item quantity
**Headers**: `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "quantity": 3
}
```

### **DELETE** `/api/cart/{cart_item_id}`
**Purpose**: Remove item from cart
**Headers**: `Authorization: Bearer {token}`

### **DELETE** `/api/cart`
**Purpose**: Clear entire cart
**Headers**: `Authorization: Bearer {token}`

## 📦 Order API Endpoints

### **GET** `/api/orders`
**Purpose**: Get user's orders
**Headers**: `Authorization: Bearer {token}`

**Query Parameters:**
- `status` (string): Filter by order status
- `page` (number): Page number
- `limit` (number): Items per page

**Success Response (200):**
```json
{
  "success": true,
  "orders": [
    {
      "id": "order_123",
      "user_id": "user_123",
      "status": "pending",
      "items": [
        {
          "medicine_id": "med_001",
          "quantity": 2,
          "unit_price": 12.99,
          "total_price": 25.98,
          "medicine": {
            // Medicine details
          }
        }
      ],
      "total_amount": 25.98,
      "delivery_address": {
        "street": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zip_code": "62701"
      },
      "payment_method": "credit_card",
      "created_at": "2024-01-15T10:00:00Z",
      "estimated_delivery": "2024-01-17T10:00:00Z"
    }
  ]
}
```

### **POST** `/api/orders`
**Purpose**: Create new order
**Headers**: `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "delivery_address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zip_code": "62701"
  },
  "payment_method": "credit_card",
  "notes": "Please call before delivery"
}
```

### **GET** `/api/orders/{order_id}`
**Purpose**: Get order details
**Headers**: `Authorization: Bearer {token}`

### **POST** `/api/orders/{order_id}/cancel`
**Purpose**: Cancel order
**Headers**: `Authorization: Bearer {token}`

## 🏥 Pharmacy API Endpoints

### **GET** `/api/pharmacies`
**Purpose**: Get pharmacy locations

**Query Parameters:**
- `city` (string): Filter by city
- `state` (string): Filter by state
- `service` (string): Filter by services offered

**Success Response (200):**
```json
{
  "success": true,
  "pharmacies": [
    {
      "id": "pharmacy_001",
      "name": "Springfield Community Pharmacy",
      "address": {
        "street": "789 Health Blvd",
        "city": "Springfield",
        "state": "IL",
        "zip_code": "62703",
        "country": "USA"
      },
      "phone": "+1-555-HEALTH",
      "email": "info@springfieldpharmacy.com",
      "hours": {
        "monday": "8:00 AM - 8:00 PM",
        "tuesday": "8:00 AM - 8:00 PM",
        "wednesday": "8:00 AM - 8:00 PM",
        "thursday": "8:00 AM - 8:00 PM",
        "friday": "8:00 AM - 8:00 PM",
        "saturday": "9:00 AM - 6:00 PM",
        "sunday": "10:00 AM - 4:00 PM"
      },
      "services": [
        "Prescription Filling",
        "Vaccinations",
        "Health Screenings"
      ],
      "coordinates": {
        "lat": 39.7817,
        "lng": -89.6501
      },
      "rating": 4.5,
      "is_partner": true
    }
  ]
}
```

### **GET** `/api/pharmacies/nearby`
**Purpose**: Get nearby pharmacies based on coordinates

**Query Parameters:**
- `lat` (number): Latitude
- `lng` (number): Longitude
- `radius` (number): Search radius in kilometers

## ⚠️ Error Handling

### Standard Error Response Format:
```json
{
  "success": false,
  "message": "Human-readable error message",
  "error_code": "INVALID_CREDENTIALS", // Optional
  "details": {
    // Optional additional error details
  }
}
```

### HTTP Status Codes:
- **200**: Success
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid/expired token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **422**: Unprocessable Entity (business logic errors)
- **500**: Internal Server Error

## 🔒 Security Requirements

### JWT Token Requirements:
- **Algorithm**: HS256 or RS256
- **Expiration**: Recommended 24 hours
- **Payload**: Should include user_id, email, and expiration time

### Request Headers:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### CORS Configuration:
Allow requests from your frontend domain with these headers:
- `Authorization`
- `Content-Type`
- Methods: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`

## 🚀 Database Schema Suggestions

### Users Table:
```sql
CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  address JSON,
  insurance_info JSON,
  email_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Medicines Table:
```sql
CREATE TABLE medicines (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  category VARCHAR(100),
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  prescription_required BOOLEAN DEFAULT FALSE,
  availability_status ENUM('available', 'out_of_stock') DEFAULT 'available',
  dosage_form VARCHAR(50),
  active_ingredients JSON,
  warnings JSON,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Cart Items Table:
```sql
CREATE TABLE cart_items (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  medicine_id VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE
);
```

## 🧪 Testing Your API

### Test User Credentials (for testing):
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Sample API Test Sequence:
1. **Register/Login** → Get JWT token
2. **Get Categories** → Verify medicine categories endpoint
3. **Get Medicines** → Test filtering and pagination
4. **Add to Cart** → Test cart functionality
5. **Create Order** → Test order creation
6. **Get Orders** → Verify order history

## 📝 Additional Notes

### Image Handling:
- The frontend expects `image_url` field for medicine images
- You can use a CDN or serve images from your backend
- Images should be optimized for web (JPEG/PNG, max 500KB)

### Real-time Updates:
- Consider implementing WebSocket connections for real-time cart updates
- Push notifications for order status changes

### Performance:
- Implement database indexing on commonly queried fields
- Consider caching for medicine categories and frequently accessed data
- Use pagination for all list endpoints

## 🆘 Support

If you have questions about the API requirements:
1. Check the mock services in `src/services/mock/` for expected behavior
2. Review the service interfaces in `src/services/api/`
3. Test with mock data first, then switch to your real API

The frontend is designed to work seamlessly with either mock or real services - just update the configuration and your API will be integrated!