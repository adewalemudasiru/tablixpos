import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCcw, Download } from 'lucide-react';
import { useOfflineSync } from '../hooks/useOfflineSync';

export function PwaStatusBanner() {
  const { isOnline, isSyncing, queueLength } = useOfflineSync();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (isOnline && queueLength === 0 && !isInstallable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[999] flex flex-col gap-2 pointer-events-none">
      {!isOnline && (
        <div className="bg-amber-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 pointer-events-auto transition-transform">
          <WifiOff className="w-5 h-5 animate-pulse" />
          <div>
            <p className="font-semibold text-sm">You are offline</p>
            <p className="text-xs opacity-90">Changes will be synced when you reconnect.</p>
          </div>
        </div>
      )}

      {isSyncing && (
        <div className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 pointer-events-auto transition-transform">
          <RefreshCcw className="w-5 h-5 animate-spin" />
          <div>
            <p className="font-semibold text-sm">Syncing Data...</p>
            <p className="text-xs opacity-90">{queueLength} items left</p>
          </div>
        </div>
      )}

      {isOnline && !isSyncing && queueLength > 0 && (
        <div className="bg-amber-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 pointer-events-auto transition-transform">
          <RefreshCcw className="w-5 h-5" />
          <div>
            <p className="font-semibold text-sm">Pending Sync</p>
            <p className="text-xs opacity-90">{queueLength} actions queued.</p>
          </div>
        </div>
      )}

      {isInstallable && (
        <div className="bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-lg shadow-2xl flex items-center justify-between gap-4 pointer-events-auto transition-transform">
          <div className="flex items-center gap-3">
            <div className="bg-[#E91835] text-white p-2 rounded-lg">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Install Tablix POS</p>
              <p className="text-xs text-gray-500">Install app for a better offline experience</p>
            </div>
          </div>
          <button 
            onClick={handleInstallClick}
            className="bg-[#E91835] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#c9122c] transition-colors"
          >
            Install
          </button>
        </div>
      )}
    </div>
  );
}
