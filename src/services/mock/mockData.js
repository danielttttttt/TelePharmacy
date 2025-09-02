/**
 * Mock Data for Pharmacy Application
 * 
 * This file contains realistic mock data that simulates what a real pharmacy
 * backend database would contain. The data structure matches the expected
 * API responses that backend developers should implement.
 */

/**
 * Medicine Categories
 */
export const MEDICINE_CATEGORIES = [
  'Pain Relief',
  'Antibiotics', 
  'Vitamins & Supplements',
  'Digestive Health',
  'Cardiovascular',
  'Respiratory',
  'Skin Care',
  'Mental Health',
  'Diabetes Care',
  'Eye Care',
  'Women\'s Health',
  'Men\'s Health',
  'Children\'s Health',
  'Senior Care',
  'First Aid'
]

/**
 * Mock Medicines Database
 * Structure matches expected API response for /api/medicines
 */
export const MOCK_MEDICINES = [
  // Pain Relief
  {
    id: 'med_001',
    name: 'Acetaminophen 500mg',
    brand: 'Tylenol',
    category: 'Pain Relief',
    description: 'Fast-acting pain reliever and fever reducer. Effective for headaches, muscle aches, and arthritis pain.',
    price: 12.99,
    stock_quantity: 150,
    prescription_required: false,
    availability_status: 'available',
    dosage_form: 'Tablet',
    active_ingredients: ['Acetaminophen 500mg'],
    warnings: ['Do not exceed 8 tablets in 24 hours', 'Consult doctor if pregnant'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'med_002', 
    name: 'Ibuprofen 400mg',
    brand: 'Advil',
    category: 'Pain Relief',
    description: 'Non-steroidal anti-inflammatory drug (NSAID) for pain, inflammation, and fever reduction.',
    price: 15.49,
    stock_quantity: 200,
    prescription_required: false,
    availability_status: 'available',
    dosage_form: 'Tablet',
    active_ingredients: ['Ibuprofen 400mg'],
    warnings: ['Take with food', 'Not suitable for children under 12'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },

  // Antibiotics (Prescription Required)
  {
    id: 'med_003',
    name: 'Amoxicillin 500mg',
    brand: 'Generic',
    category: 'Antibiotics',
    description: 'Broad-spectrum antibiotic for bacterial infections including respiratory tract infections.',
    price: 25.99,
    stock_quantity: 100,
    prescription_required: true,
    availability_status: 'available',
    dosage_form: 'Capsule',
    active_ingredients: ['Amoxicillin 500mg'],
    warnings: ['Complete full course', 'May cause allergic reactions'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'med_004',
    name: 'Azithromycin 250mg',
    brand: 'Z-Pack',
    category: 'Antibiotics', 
    description: 'Macrolide antibiotic for respiratory and skin infections.',
    price: 45.99,
    stock_quantity: 75,
    prescription_required: true,
    availability_status: 'available',
    dosage_form: 'Tablet',
    active_ingredients: ['Azithromycin 250mg'],
    warnings: ['Take on empty stomach', 'Complete full course'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },

  // Vitamins & Supplements
  {
    id: 'med_005',
    name: 'Vitamin D3 2000 IU',
    brand: 'Nature Made',
    category: 'Vitamins & Supplements',
    description: 'Essential vitamin for bone health and immune system support.',
    price: 18.99,
    stock_quantity: 300,
    prescription_required: false,
    availability_status: 'available',
    dosage_form: 'Softgel',
    active_ingredients: ['Vitamin D3 2000 IU'],
    warnings: ['Do not exceed recommended dose'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'med_006',
    name: 'Multivitamin Complete',
    brand: 'Centrum',
    category: 'Vitamins & Supplements', 
    description: 'Complete daily multivitamin with essential vitamins and minerals.',
    price: 24.99,
    stock_quantity: 250,
    prescription_required: false,
    availability_status: 'available',
    dosage_form: 'Tablet',
    active_ingredients: ['Multiple vitamins and minerals'],
    warnings: ['Take with food for best absorption'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },

  // Digestive Health
  {
    id: 'med_007',
    name: 'Omeprazole 20mg',
    brand: 'Prilosec',
    category: 'Digestive Health',
    description: 'Proton pump inhibitor for acid reflux and heartburn relief.',
    price: 22.99,
    stock_quantity: 120,
    prescription_required: false,
    availability_status: 'available',
    dosage_form: 'Capsule',
    active_ingredients: ['Omeprazole 20mg'],
    warnings: ['Take before meals', 'Maximum 14 days without doctor consultation'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'med_008',
    name: 'Probiotics 50 Billion CFU',
    brand: 'Garden of Life',
    category: 'Digestive Health',
    description: 'High-potency probiotic for digestive and immune health support.',
    price: 35.99,
    stock_quantity: 80,
    prescription_required: false,
    availability_status: 'available',
    dosage_form: 'Capsule',
    active_ingredients: ['Multiple probiotic strains'],
    warnings: ['Keep refrigerated after opening'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },

  // Cardiovascular 
  {
    id: 'med_009',
    name: 'Lisinopril 10mg',
    brand: 'Generic',
    category: 'Cardiovascular',
    description: 'ACE inhibitor for high blood pressure and heart failure management.',
    price: 32.99,
    stock_quantity: 90,
    prescription_required: true,
    availability_status: 'available',
    dosage_form: 'Tablet',
    active_ingredients: ['Lisinopril 10mg'],
    warnings: ['Monitor blood pressure regularly', 'May cause dizziness'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'med_010',
    name: 'Atorvastatin 20mg',
    brand: 'Lipitor',
    category: 'Cardiovascular',
    description: 'Statin medication for cholesterol management and heart disease prevention.',
    price: 28.99,
    stock_quantity: 110,
    prescription_required: true,
    availability_status: 'available',
    dosage_form: 'Tablet',
    active_ingredients: ['Atorvastatin 20mg'],
    warnings: ['Take with evening meal', 'Avoid grapefruit juice'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },

  // Respiratory
  {
    id: 'med_011',
    name: 'Albuterol Inhaler',
    brand: 'ProAir',
    category: 'Respiratory',
    description: 'Bronchodilator inhaler for asthma and COPD rescue therapy.',
    price: 65.99,
    stock_quantity: 50,
    prescription_required: true,
    availability_status: 'available',
    dosage_form: 'Inhaler',
    active_ingredients: ['Albuterol sulfate'],
    warnings: ['Prime before first use', 'May cause jitteriness'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'med_012',
    name: 'Dextromethorphan Cough Syrup',
    brand: 'Robitussin',
    category: 'Respiratory',
    description: 'Cough suppressant for dry, non-productive cough relief.',
    price: 14.99,
    stock_quantity: 180,
    prescription_required: false,
    availability_status: 'available',
    dosage_form: 'Syrup',
    active_ingredients: ['Dextromethorphan HBr'],
    warnings: ['Do not exceed recommended dose', 'Not for children under 4'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },

  // Skin Care
  {
    id: 'med_013',
    name: 'Hydrocortisone Cream 1%',
    brand: 'Cortizone-10',
    category: 'Skin Care',
    description: 'Topical anti-inflammatory for eczema, rashes, and itching relief.',
    price: 8.99,
    stock_quantity: 200,
    prescription_required: false,
    availability_status: 'available',
    dosage_form: 'Cream',
    active_ingredients: ['Hydrocortisone 1%'],
    warnings: ['For external use only', 'Do not use on face unless directed'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'med_014',
    name: 'Tretinoin Gel 0.1%',
    brand: 'Retin-A',
    category: 'Skin Care',
    description: 'Prescription retinoid for acne treatment and anti-aging.',
    price: 85.99,
    stock_quantity: 30,
    prescription_required: true,
    availability_status: 'available',
    dosage_form: 'Gel',
    active_ingredients: ['Tretinoin 0.1%'],
    warnings: ['Use sunscreen daily', 'May cause initial irritation'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },

  // Mental Health
  {
    id: 'med_015',
    name: 'Sertraline 50mg',
    brand: 'Zoloft',
    category: 'Mental Health',
    description: 'SSRI antidepressant for depression and anxiety disorders.',
    price: 29.99,
    stock_quantity: 85,
    prescription_required: true,
    availability_status: 'available',
    dosage_form: 'Tablet',
    active_ingredients: ['Sertraline HCl 50mg'],
    warnings: ['May take 4-6 weeks for full effect', 'Do not stop abruptly'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },

  // Some out of stock items
  {
    id: 'med_016',
    name: 'Insulin Rapid Acting',
    brand: 'Humalog',
    category: 'Diabetes Care',
    description: 'Fast-acting insulin for diabetes management.',
    price: 125.99,
    stock_quantity: 0,
    prescription_required: true,
    availability_status: 'out_of_stock',
    dosage_form: 'Injection',
    active_ingredients: ['Insulin lispro'],
    warnings: ['Refrigerate until use', 'Monitor blood glucose'],
    image_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  }
]

/**
 * Mock User Data
 * Structure matches expected API response for user authentication
 */
export const MOCK_USERS = [
  {
    id: 'user_001',
    email: 'john.doe@example.com',
    password: 'password123', // In real app, this would be hashed
    first_name: 'John',
    last_name: 'Doe',
    phone: '+1-555-0123',
    date_of_birth: '1985-06-15',
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip_code: '62701',
      country: 'USA'
    },
    insurance_info: {
      provider: 'Blue Cross Blue Shield',
      policy_number: 'BC123456789',
      group_number: 'GRP001'
    },
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-01-15T14:30:00Z',
    is_active: true,
    email_verified: true
  },
  {
    id: 'user_002',
    email: 'jane.smith@example.com',
    password: 'securepass456',
    first_name: 'Jane',
    last_name: 'Smith',
    phone: '+1-555-0456',
    date_of_birth: '1992-03-22',
    address: {
      street: '456 Oak Ave',
      city: 'Springfield', 
      state: 'IL',
      zip_code: '62702',
      country: 'USA'
    },
    insurance_info: {
      provider: 'Aetna',
      policy_number: 'AET987654321',
      group_number: 'GRP002'
    },
    created_at: '2024-01-12T10:15:00Z',
    updated_at: '2024-01-14T16:45:00Z',
    is_active: true,
    email_verified: true
  }
]

/**
 * Mock Pharmacy Locations
 */
export const MOCK_PHARMACIES = [
  {
    id: 'pharmacy_001',
    name: 'Springfield Community Pharmacy',
    address: {
      street: '789 Health Blvd',
      city: 'Springfield',
      state: 'IL', 
      zip_code: '62703',
      country: 'USA'
    },
    phone: '+1-555-HEALTH',
    email: 'info@springfieldpharmacy.com',
    hours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '10:00 AM - 4:00 PM'
    },
    services: ['Prescription Filling', 'Vaccinations', 'Health Screenings', 'Medication Consultation'],
    coordinates: {
      lat: 39.7817,
      lng: -89.6501
    },
    rating: 4.5,
    is_partner: true
  },
  {
    id: 'pharmacy_002',
    name: 'Downtown Wellness Pharmacy',
    address: {
      street: '321 Center St',
      city: 'Springfield',
      state: 'IL',
      zip_code: '62701',
      country: 'USA'
    },
    phone: '+1-555-WELLNESS',
    email: 'contact@downtownwellness.com',
    hours: {
      monday: '7:00 AM - 9:00 PM',
      tuesday: '7:00 AM - 9:00 PM',
      wednesday: '7:00 AM - 9:00 PM',
      thursday: '7:00 AM - 9:00 PM',
      friday: '7:00 AM - 9:00 PM',
      saturday: '8:00 AM - 7:00 PM',
      sunday: '9:00 AM - 5:00 PM'
    },
    services: ['24/7 Emergency Fills', 'Compound Medications', 'Diabetic Supplies', 'Medical Equipment'],
    coordinates: {
      lat: 39.7990,
      lng: -89.6441
    },
    rating: 4.8,
    is_partner: true
  }
]

/**
 * Order Status Options
 */
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed', 
  PROCESSING: 'processing',
  READY_FOR_PICKUP: 'ready_for_pickup',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

/**
 * Payment Methods
 */
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  INSURANCE: 'insurance',
  CASH: 'cash',
  DIGITAL_WALLET: 'digital_wallet'
}