import React, { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './sections/Dashboard';
import Products from './sections/Products';
import Orders from './sections/Orders';
import Customers from './sections/Customers';
import Analytics from './sections/Analytics';
import Settings from './sections/Settings';
import InstallPrompt from './components/PWA/InstallPrompt';
import { offlineStorage } from './services/offlineStorage';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Initialize offline storage
    offlineStorage.init();

    // PWA Installation detection
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  if (confirm('A new version is available. Would you like to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard': return 'Dashboard Overview';
      case 'products': return 'Product Management';
      case 'orders': return 'Order Management';
      case 'customers': return 'Customer Management';
      case 'analytics': return 'Advanced Analytics';
      case 'settings': return 'System Settings';
      default: return 'Dashboard Overview';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <Products />;
      case 'orders': return <Orders />;
      case 'customers': return <Customers />;
      case 'analytics': return <Analytics />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getSectionTitle()} />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <InstallPrompt
          onInstall={() => setShowInstallPrompt(false)}
          onDismiss={() => setShowInstallPrompt(false)}
        />
      )}
    </div>
  );
}

export default App;