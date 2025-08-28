import React, { useState } from 'react';
import { Save, User, Bell, Shield, Globe, Download, Upload } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Admin User',
      email: 'admin@ecommerce.com',
      phone: '+1-555-0123',
      role: 'admin'
    },
    notifications: {
      orderAlerts: true,
      lowStockAlerts: true,
      customerAlerts: false,
      emailNotifications: true,
      pushNotifications: true
    },
    system: {
      language: 'es',
      timezone: 'America/Mexico_City',
      currency: 'USD',
      dateFormat: 'DD/MM/YYYY'
    }
  });

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'system', label: 'Sistema', icon: Globe }
  ];

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Here you would save to IndexedDB and add to pending sync
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-1">Administra las configuraciones del sistema y tu perfil</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Información del Perfil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => setSettings({...settings, profile: {...settings.profile, name: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => setSettings({...settings, profile: {...settings.profile, email: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => setSettings({...settings, profile: {...settings.profile, phone: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select
                    value={settings.profile.role}
                    onChange={(e) => setSettings({...settings, profile: {...settings.profile, role: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="admin">Administrador</option>
                    <option value="manager">Gerente</option>
                    <option value="viewer">Visualizador</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Preferencias de Notificaciones</h3>
              <div className="space-y-4">
                {Object.entries({
                  orderAlerts: 'Alertas de nuevos pedidos',
                  lowStockAlerts: 'Alertas de stock bajo',
                  customerAlerts: 'Alertas de nuevos clientes',
                  emailNotifications: 'Notificaciones por email',
                  pushNotifications: 'Notificaciones push'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications[key as keyof typeof settings.notifications]}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Configuración del Sistema</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                  <select
                    value={settings.system.language}
                    onChange={(e) => setSettings({...settings, system: {...settings.system, language: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zona Horaria</label>
                  <select
                    value={settings.system.timezone}
                    onChange={(e) => setSettings({...settings, system: {...settings.system, timezone: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="America/Mexico_City">México (GMT-6)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="Europe/Madrid">Madrid (GMT+1)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                  <select
                    value={settings.system.currency}
                    onChange={(e) => setSettings({...settings, system: {...settings.system, currency: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="MXN">MXN ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Formato de Fecha</label>
                  <select
                    value={settings.system.dateFormat}
                    onChange={(e) => setSettings({...settings, system: {...settings.system, dateFormat: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={20} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};