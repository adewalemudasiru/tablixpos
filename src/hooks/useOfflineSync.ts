import { useEffect, useState, useCallback } from 'react';
import { idbDrainSyncQueue, idbRemoveSyncQueueItem, idbSyncQueueLength } from '../services/idb';
import { toast } from 'sonner';

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [queueLength, setQueueLength] = useState(0);

  const checkQueueLength = useCallback(async () => {
    try {
      const len = await idbSyncQueueLength();
      setQueueLength(len);
    } catch (e) {
      console.error("Failed to check queue length", e);
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkQueueLength();
    
    // Polling fallback just in case
    const interval = setInterval(checkQueueLength, 10000);
    return () => clearInterval(interval);
  }, [checkQueueLength]);

  const syncQueue = useCallback(async () => {
    if (!navigator.onLine || isSyncing) return;
    
    setIsSyncing(true);
    try {
      const queue = await idbDrainSyncQueue();
      if (queue.length === 0) {
        setIsSyncing(false);
        return;
      }

      toast.info(`Syncing ${queue.length} offline actions...`);
      let successCount = 0;

      for (const item of queue) {
        try {
          const token = localStorage.getItem("tablixpos_access_token");
          const headers: any = { "Content-Type": "application/json" };
          if (token) headers.Authorization = `Bearer ${token}`;

          const res = await fetch(import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/v1" + item.endpoint, {
            method: item.method,
            headers,
            body: item.body ? JSON.stringify(item.body) : undefined
          });

          if (res.ok || res.status >= 400) {
            // Either success, or a hard failure (like 400 Bad Request) that shouldn't be retried
            if (item.id !== undefined) {
              await idbRemoveSyncQueueItem(item.id);
            }
            if (res.ok) successCount++;
          }
        } catch (err) {
          console.error(`Failed to sync item ${item.id}`, err);
          // If network fails again, we leave it in the queue for next time
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully synced ${successCount} actions!`);
      }
    } finally {
      setIsSyncing(false);
      checkQueueLength();
    }
  }, [isSyncing, checkQueueLength]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You are back online!");
      syncQueue();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("You are offline. Changes will be saved locally.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (navigator.onLine) {
      syncQueue();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncQueue]);

  return { isOnline, isSyncing, queueLength, syncQueue };
}
