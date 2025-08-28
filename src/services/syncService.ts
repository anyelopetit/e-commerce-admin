import { offlineStorage } from './offlineStorage';

export interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  table: string;
  data: any;
  timestamp: number;
}

class SyncService {
  private isOnline: boolean = navigator.onLine;
  private isSyncing: boolean = false;
  private syncListeners: (() => void)[] = [];

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.notifySyncListeners();
      this.performSync();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.notifySyncListeners();
    });
  }

  addSyncListener(callback: () => void) {
    this.syncListeners.push(callback);
  }

  removeSyncListener(callback: () => void) {
    this.syncListeners = this.syncListeners.filter(listener => listener !== callback);
  }

  private notifySyncListeners() {
    this.syncListeners.forEach(listener => listener());
  }

  async saveWithSync(table: string, data: any, operation: 'create' | 'update' | 'delete' = 'create') {
    // Always save to local storage first
    await offlineStorage.saveData(table as any, data);

    if (this.isOnline) {
      try {
        // Attempt to sync to server immediately
        await this.syncToServer(table, data, operation);
      } catch (error) {
        console.warn('Failed to sync to server, queuing for later:', error);
        // Queue for later sync
        await offlineStorage.addPendingSync({ type: operation, table, data });
      }
    } else {
      // Queue for later sync when online
      await offlineStorage.addPendingSync({ type: operation, table, data });
    }
  }

  async performSync(): Promise<boolean> {
    if (!this.isOnline || this.isSyncing) {
      return false;
    }

    this.isSyncing = true;
    this.notifySyncListeners();

    try {
      const pendingOperations = await offlineStorage.getPendingSync();
      console.log(`Syncing ${pendingOperations.length} pending operations...`);

      for (const operation of pendingOperations) {
        try {
          await this.syncToServer(operation.table, operation.data, operation.type);
          await offlineStorage.clearPendingSync(operation.id);
        } catch (error) {
          console.error(`Failed to sync operation ${operation.id}:`, error);
          // Continue with other operations
        }
      }

      // Sync server data to local storage
      await this.syncFromServer();

      console.log('Sync completed successfully');
      return true;
    } catch (error) {
      console.error('Sync failed:', error);
      return false;
    } finally {
      this.isSyncing = false;
      this.notifySyncListeners();
    }
  }

  private async syncToServer(table: string, data: any, operation: 'create' | 'update' | 'delete') {
    // Mock API endpoint - replace with your actual API
    const apiUrl = '/api';
    
    let endpoint = `${apiUrl}/${table}`;
    let method = 'POST';

    switch (operation) {
      case 'create':
        method = 'POST';
        break;
      case 'update':
        method = 'PUT';
        endpoint = `${apiUrl}/${table}/${data.id}`;
        break;
      case 'delete':
        method = 'DELETE';
        endpoint = `${apiUrl}/${table}/${data.id}`;
        break;
    }

    // Mock successful response for demo purposes
    console.log(`Would sync to ${endpoint} with method ${method}:`, data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Simulate occasional failures for testing
    if (Math.random() < 0.1) {
      throw new Error('Simulated network error');
    }

    return { success: true, data };
  }

  private async syncFromServer() {
    const tables = ['products', 'orders', 'customers'];
    
    for (const table of tables) {
      try {
        // Mock server response
        console.log(`Would fetch latest ${table} from server`);
        
        // For demo purposes, we'll just log this
        // In a real app, this would fetch from your API and update local storage
      } catch (error) {
        console.error(`Failed to sync ${table} from server:`, error);
      }
    }
  }

  getStatus() {
    return {
      isOnline: this.isOnline,
      isSyncing: this.isSyncing
    };
  }

  async getPendingChangesCount(): Promise<number> {
    const pending = await offlineStorage.getPendingSync();
    return pending.length;
  }
}

export const syncService = new SyncService();