import Dexie, { Table } from 'dexie';
import { Product, Order, Customer, InventoryMovement, SalesData } from '../types';

export class OfflineDatabase extends Dexie {
  products!: Table<Product>;
  orders!: Table<Order>;
  customers!: Table<Customer>;
  inventory_movements!: Table<InventoryMovement>;
  sales_data!: Table<SalesData>;
  pending_sync!: Table<{ id?: number; type: string; data: any; timestamp: number }>;

  constructor() {
    super('AdminEcommerceDB');
    
    this.version(1).stores({
      products: 'id, name, category, status, created_at',
      orders: 'id, customer_id, status, created_at, total',
      customers: 'id, email, status, created_at, total_spent',
      inventory_movements: 'id, product_id, variant_id, type, created_at',
      sales_data: 'date, sales, revenue',
      pending_sync: '++id, type, timestamp'
    });
  }
}

export const db = new OfflineDatabase();

// Sync utilities
export const addToPendingSync = async (type: string, data: any) => {
  await db.pending_sync.add({
    type,
    data,
    timestamp: Date.now()
  });
};

export const getPendingSync = async () => {
  return await db.pending_sync.toArray();
};

export const clearSyncedItem = async (id: number) => {
  await db.pending_sync.delete(id);
};

export const isOnline = () => navigator.onLine;

export const syncToServer = async () => {
  if (!isOnline()) return;
  
  const pendingItems = await getPendingSync();
  
  for (const item of pendingItems) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log(`Syncing ${item.type}:`, item.data);
      await clearSyncedItem(item.id!);
    } catch (error) {
      console.error('Sync failed for item:', item, error);
    }
  }
};