import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe, Package, Wifi } from 'lucide-react';
import InventoryMovements from '../components/InventoryManager/InventoryMovements';
import { useOfflineSync } from '../hooks/useOfflineSync';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { syncStatus, syncPendingChanges } = useOfflineSync();

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'users', label: 'Users & Roles', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Sync', icon: Database },
    { id: 'localization', label: 'Localization', icon: Globe }
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-lg shadow-sm border p-4 space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="EcommAdmin Store"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="Professional e-commerce store with advanced features"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>MXN ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>UTC-05:00 (EST)</option>
                      <option>UTC-06:00 (CST)</option>
                      <option>UTC+00:00 (GMT)</option>
                      <option>UTC+01:00 (CET)</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <InventoryMovements />
            </div>
          )}

          {activeTab === 'data' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Data & Synchronization</h3>
              <div className="space-y-6">
                {/* Sync Status */}
                <div className={`p-4 border rounded-lg ${
                  syncStatus.isOnline 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Wifi className={`h-5 w-5 ${syncStatus.isOnline ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`font-medium ${syncStatus.isOnline ? 'text-green-800' : 'text-red-800'}`}>
                      {syncStatus.isOnline ? 'Online - Real-time sync active' : 'Offline - Local storage mode'}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${syncStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                    {syncStatus.isOnline 
                      ? 'All data is being synchronized with the server'
                      : 'Data will sync automatically when connection is restored'
                    }
                  </p>
                  {syncStatus.pendingChanges > 0 && (
                    <div className="mt-2 text-sm text-amber-600">
                      {syncStatus.pendingChanges} changes pending sync
                    </div>
                  )}
                  {syncStatus.lastSync && (
                    <div className="mt-2 text-xs text-gray-500">
                      Last synced: {format(syncStatus.lastSync, 'MMM dd, yyyy HH:mm')}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Auto Sync Interval</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Every 5 minutes</option>
                      <option>Every 15 minutes</option>
                      <option>Every hour</option>
                      <option>Manual only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cache Duration</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>1 week</option>
                      <option>1 month</option>
                      <option>3 months</option>
                      <option>6 months</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={syncPendingChanges}
                    disabled={!syncStatus.isOnline || syncStatus.isSyncing}
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {syncStatus.isSyncing ? 'Syncing...' : 'Force Sync Now'}
                  </button>
                  <button className="w-full md:w-auto px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ml-0 md:ml-3">
                    Clear Local Cache
                  </button>
                </div>

                {/* Data Export/Import */}
                <div className="pt-6 border-t">
                  <h4 className="font-medium text-gray-900 mb-4">Data Management</h4>
                  <div className="space-y-3">
                    <button className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Export All Data
                    </button>
                    <button className="w-full md:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ml-0 md:ml-3">
                      Import Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Management & Roles</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Admin User</p>
                      <p className="text-sm text-gray-600">admin@example.com</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Super Admin</span>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Store Manager</p>
                      <p className="text-sm text-gray-600">manager@example.com</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Manager</span>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sales Rep</p>
                      <p className="text-sm text-gray-600">sales@example.com</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Sales</span>
                </div>
                <div className="pt-4 border-t">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add New User</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'localization' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Localization Settings</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>English (US)</option>
                      <option>Español (ES)</option>
                      <option>Español (MX)</option>
                      <option>Français (FR)</option>
                      <option>Deutsch (DE)</option>
                      <option>Português (BR)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Supported Languages</h4>
                  <div className="space-y-2">
                    {[
                      { code: 'en', name: 'English', enabled: true },
                      { code: 'es', name: 'Español', enabled: true },
                      { code: 'fr', name: 'Français', enabled: false },
                      { code: 'de', name: 'Deutsch', enabled: false },
                      { code: 'pt', name: 'Português', enabled: false }
                    ].map(lang => (
                      <div key={lang.code} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <span className="font-medium text-gray-900">{lang.name}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={lang.enabled}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <InventoryMovements />
          )}

          {/* Other tabs content */}
          {(activeTab === 'notifications' || activeTab === 'security') && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {tabs.find(t => t.id === activeTab)?.label} Settings
              </h3>
              <p className="text-gray-600 mb-6">
                Advanced {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} configuration options will be available here.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Feature coming soon...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;