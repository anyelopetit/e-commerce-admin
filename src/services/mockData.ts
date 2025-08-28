import { Product, Order, Customer, DashboardMetrics, InventoryMovement } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Galaxy Pro',
    description: 'Latest smartphone with advanced features',
    category: 'Electronics',
    price: 899,
    stock: 45,
    variants: [
      { id: 'v1', productId: '1', name: '128GB Black', sku: 'SGP-128-BLK', price: 899, stock: 15, attributes: { storage: '128GB', color: 'Black' } },
      { id: 'v2', productId: '1', name: '256GB White', sku: 'SGP-256-WHT', price: 999, stock: 30, attributes: { storage: '256GB', color: 'White' } }
    ],
    images: ['https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones',
    category: 'Audio',
    price: 299,
    stock: 78,
    variants: [],
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: '3',
    name: 'Gaming Laptop',
    description: 'High-performance gaming laptop',
    category: 'Computers',
    price: 1299,
    stock: 23,
    variants: [],
    images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-12-01')
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    status: 'delivered',
    items: [
      { id: 'item1', productId: '1', variantId: 'v1', quantity: 1, price: 899 }
    ],
    total: 899,
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    status: 'processing',
    items: [
      { id: 'item2', productId: '2', quantity: 2, price: 299 }
    ],
    total: 598,
    createdAt: new Date('2024-11-30'),
    updatedAt: new Date('2024-12-01')
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, State',
    totalOrders: 5,
    totalSpent: 2450,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'CUST-002',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+0987654321',
    address: '456 Oak Ave, City, State',
    totalOrders: 3,
    totalSpent: 1200,
    createdAt: new Date('2024-02-15')
  }
];

export const mockMetrics: DashboardMetrics = {
  totalRevenue: 125840,
  totalOrders: 342,
  totalProducts: 156,
  totalCustomers: 89,
  conversionRate: 3.2,
  averageOrderValue: 368
};

export const mockInventoryMovements: InventoryMovement[] = [
  {
    id: 'MOV-001',
    productId: '1',
    variantId: 'v1',
    type: 'out',
    quantity: 5,
    reason: 'Sale',
    createdAt: new Date('2024-11-30')
  },
  {
    id: 'MOV-002',
    productId: '2',
    type: 'in',
    quantity: 20,
    reason: 'Restock',
    createdAt: new Date('2024-11-29')
  }
];