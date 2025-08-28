import React from 'react';
import { Menu, Bell, User, Wifi, WifiOff, RotateCw } from 'lucide-react';
import { useOfflineSync } from '../../hooks/useOfflineSync';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { isOnline, isSyncing } = useOfflineSync();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Panel Administrativo</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            {isOnline ? (
              <div className="flex items-center gap-1 text-green-600">
                <Wifi size={16} />
                <span className="text-sm font-medium">Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <WifiOff size={16} />
                <span className="text-sm font-medium">Offline</span>
              </div>
            )}
            
            {isSyncing && (
              <div className="flex items-center gap-1 text-blue-600">
                <RotateCw size={16} className="animate-spin" />
                <span className="text-sm">Sincronizando...</span>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-md hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.role}</div>
            </div>
            <button 
              onClick={logout}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <User size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};