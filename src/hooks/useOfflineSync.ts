import { useState, useEffect } from 'react';
import { syncService } from '../services/syncService';

export interface SyncStatus {
  isOnline: boolean;
  isSyncing: boolean;
  lastSync: Date | null;
  pendingChanges: number;
}

export const useOfflineSync = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    isSyncing: false,
    lastSync: null,
    pendingChanges: 0
  });

  useEffect(() => {
    const updateSyncStatus = async () => {
      const status = syncService.getStatus();
      const pendingCount = await syncService.getPendingChangesCount();
      
      setSyncStatus(prev => ({
        ...prev,
        isOnline: status.isOnline,
        isSyncing: status.isSyncing,
        pendingChanges: pendingCount
      }));
    };

    // Initial status update
    updateSyncStatus();

    // Add listener for sync status changes
    syncService.addSyncListener(updateSyncStatus);

    const handleOnline = async () => {
      const success = await syncService.performSync();
      if (success) {
        setSyncStatus(prev => ({ ...prev, lastSync: new Date() }));
      }
    };

    window.addEventListener('online', handleOnline);

    // Cleanup
    return () => {
      syncService.removeSyncListener(updateSyncStatus);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const performManualSync = async () => {
    if (!syncStatus.isOnline) return false;
    
    const success = await syncService.performSync();
    if (success) {
      setSyncStatus(prev => ({ ...prev, lastSync: new Date() }));
    }
    return success;
  };

  return { 
    syncStatus, 
    syncPendingChanges: performManualSync
  };
};