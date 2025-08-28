import { Product, Order, Customer, SalesData, DashboardStats } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced features',
    category: 'Electronics',
    price: 999,
    variants: [
      { id: '1a', product_id: '1', name: '128GB Space Black', sku: 'IP15P-128-SB', price: 999, stock: 50, attributes: { storage: '128GB', color: 'Space Black' } },
      { id: '1b', product_id: '1', name: '256GB Space Black', sku: 'IP15P-256-SB', price: 1199, stock: 30, attributes: { storage: '256GB', color: 'Space Black' } }
    ],
    images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    description: 'Powerful laptop for professionals',
    category: 'Electronics',
    price: 1299,
    variants: [
      { id: '2a', product_id: '2', name: '8GB/256GB Silver', sku: 'MBA-8-256-SL', price: 1299, stock: 25, attributes: { ram: '8GB', storage: '256GB', color: 'Silver' } }
    ],
    images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'],
    status: 'active',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24',
    description: 'Android smartphone with AI features',
    category: 'Electronics',
    price: 899,
    variants: [
      { id: '3a', product_id: '3', name: '128GB Phantom Black', sku: 'SGS24-128-PB', price: 899, stock: 40, attributes: { storage: '128GB', color: 'Phantom Black' } }
    ],
    images: ['https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'],
    status: 'active',
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer_id: '1',
    total: 999,
    status: 'delivered',
    items: [
      { id: '1', product_id: '1', variant_id: '1a', quantity: 1, price: 999, product_name: 'iPhone 15 Pro 128GB' }
    ],
    shipping_address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'US'
    },
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-22T10:00:00Z'
  },
  {
    id: 'ORD-002',
    customer_id: '2',
    total: 1299,
    status: 'shipped',
    items: [
      { id: '2', product_id: '2', variant_id: '2a', quantity: 1, price: 1299, product_name: 'MacBook Air M3' }
    ],
    shipping_address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      postal_code: '90210',
      country: 'US'
    },
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 'ORD-003',
    customer_id: '3',
    total: 899,
    status: 'processing',
    items: [
      { id: '3', product_id: '3', variant_id: '3a', quantity: 1, price: 899, product_name: 'Samsung Galaxy S24' }
    ],
    shipping_address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      postal_code: '60601',
      country: 'US'
    },
    created_at: '2024-01-22T10:00:00Z',
    updated_at: '2024-01-22T10:00:00Z'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0123',
    total_orders: 3,
    total_spent: 2997,
    last_order_date: '2024-01-20T10:00:00Z',
    status: 'active',
    created_at: '2023-12-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1-555-0456',
    total_orders: 2,
    total_spent: 1598,
    last_order_date: '2024-01-18T10:00:00Z',
    status: 'active',
    created_at: '2023-11-15T10:00:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    total_orders: 1,
    total_spent: 899,
    last_order_date: '2024-01-22T10:00:00Z',
    status: 'active',
    created_at: '2024-01-01T10:00:00Z'
  }
];

export const mockSalesData: SalesData[] = [
  { date: '2024-01-15', sales: 15, orders: 12, revenue: 14850 },
  { date: '2024-01-16', sales: 22, orders: 18, revenue: 21450 },
  { date: '2024-01-17', sales: 18, orders: 14, revenue: 17280 },
  { date: '2024-01-18', sales: 25, orders: 20, revenue: 24750 },
  { date: '2024-01-19', sales: 30, orders: 25, revenue: 29700 },
  { date: '2024-01-20', sales: 28, orders: 22, revenue: 27720 },
  { date: '2024-01-21', sales: 32, orders: 28, revenue: 31680 },
  { date: '2024-01-22', sales: 20, orders: 16, revenue: 19800 }
];

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 187230,
  totalOrders: 155,
  totalProducts: 3,
  totalCustomers: 3,
  conversionRate: 3.2,
  averageOrderValue: 1208
};