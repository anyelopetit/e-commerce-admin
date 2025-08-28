import { openDB, DBSchema } from 'idb';

interface EcommerceDB extends DBSchema {
  products: {
    key: string;
    value: any;
  };
  orders: {
    key: string;
    value: any;
  };
  customers: {
    key: string;
    value: any;
  };
  pendingSync: {
    key: string;
    value: {
      id: string;
      type: 'create' | 'update' | 'delete';
      table: string;
      data: any;
      timestamp: number;
    };
  };
  analytics: {
    key: string;
    value: any;
  };
}

class OfflineStorageService {
  private db: any;

  async init() {
    this.db = await openDB<EcommerceDB>('EcommerceAdmin', 1, {
      upgrade(db) {
        // Products store
        if (!db.objectStoreNames.contains('products')) {
          db.createObjectStore('products', { keyPath: 'id' });
        }
        
        // Orders store
        if (!db.objectStoreNames.contains('orders')) {
          db.createObjectStore('orders', { keyPath: 'id' });
        }
        
        // Customers store
        if (!db.objectStoreNames.contains('customers')) {
          db.createObjectStore('customers', { keyPath: 'id' });
        }
        
        // Pending sync operations
        if (!db.objectStoreNames.contains('pendingSync')) {
          db.createObjectStore('pendingSync', { keyPath: 'id' });
        }
        
        // Analytics cache
        if (!db.objectStoreNames.contains('analytics')) {
          db.createObjectStore('analytics', { keyPath: 'id' });
        }
      },
    });
  }

  async saveData(storeName: keyof EcommerceDB, data: any) {
    if (!this.db) await this.init();
    const tx = this.db.transaction(storeName, 'readwrite');
    await tx.objectStore(storeName).put(data);
    await tx.complete;
  }

  async getData(storeName: keyof EcommerceDB, key?: string) {
    if (!this.db) await this.init();
    const tx = this.db.transaction(storeName, 'readonly');
    
    if (key) {
      return await tx.objectStore(storeName).get(key);
    } else {
      return await tx.objectStore(storeName).getAll();
    }
  }

  async deleteData(storeName: keyof EcommerceDB, key: string) {
    if (!this.db) await this.init();
    const tx = this.db.transaction(storeName, 'readwrite');
    await tx.objectStore(storeName).delete(key);
    await tx.complete;
  }

  async addPendingSync(operation: {
    type: 'create' | 'update' | 'delete';
    table: string;
    data: any;
  }) {
    const pendingItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...operation,
      timestamp: Date.now()
    };

    await this.saveData('pendingSync', pendingItem);
    return pendingItem.id;
  }

  async getPendingSync() {
    return await this.getData('pendingSync');
  }

  async clearPendingSync(id: string) {
    await this.deleteData('pendingSync', id);
  }
}

export const offlineStorage = new OfflineStorageService();