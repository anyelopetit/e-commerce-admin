export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  variants: ProductVariant[];
  images: string[];
  status: 'active' | 'inactive' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

export interface Order {
  id: string;
  customer_id: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shipping_address: Address;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  price: number;
  product_name: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  total_orders: number;
  total_spent: number;
  last_order_date?: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface InventoryMovement {
  id: string;
  product_id: string;
  variant_id?: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  created_at: string;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
  revenue: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  conversionRate: number;
  averageOrderValue: number;
}