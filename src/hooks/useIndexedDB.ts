import { useState, useEffect } from 'react';

export interface DBStore {
  name: string;
  keyPath: string;
  indexes?: string[];
}

export const useIndexedDB = (dbName: string, stores: DBStore[]) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    const openDB = () => {
      const request = indexedDB.open(dbName, 1);

      request.onerror = () => {
        console.error('Error opening IndexedDB');
      };

      request.onsuccess = () => {
        setDb(request.result);
      };

      request.onupgradeneeded = (event) => {
        const database = (event.target as IDBOpenDBRequest).result;
        
        stores.forEach(store => {
          if (!database.objectStoreNames.contains(store.name)) {
            const objectStore = database.createObjectStore(store.name, {
              keyPath: store.keyPath
            });
            
            if (store.indexes) {
              store.indexes.forEach(index => {
                objectStore.createIndex(index, index, { unique: false });
              });
            }
          }
        });
      };
    };

    openDB();
  }, [dbName, stores]);

  const saveData = async (storeName: string, data: any) => {
    if (!db) return;

    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const getData = async (storeName: string, key?: string) => {
    if (!db) return null;

    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = key ? store.get(key) : store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const deleteData = async (storeName: string, key: string) => {
    if (!db) return;

    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  return { db, saveData, getData, deleteData };
};