import React, { useState, useEffect } from 'react';
import { Search, Plus, Mail, Phone, Calendar } from 'lucide-react';
import { Customer } from '../../types';
import { mockCustomers } from '../../utils/mockData';
import { db } from '../../utils/database';

export const CustomersManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const localCustomers = await db.customers.toArray();
      if (localCustomers.length > 0) {
        setCustomers(localCustomers);
      } else {
        await db.customers.bulkPut(mockCustomers);
        setCustomers(mockCustomers);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
      setCustomers(mockCustomers);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
          <p className="text-gray-600 mt-1">Administra la base de datos de clientes</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Nuevo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar clientes por nombre o email..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Mail size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{customer.email}</span>
                </div>
                {customer.phone && (
                  <div className="flex items-center gap-1 mt-1">
                    <Phone size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{customer.phone}</span>
                  </div>
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {customer.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Pedidos:</span>
                <span className="text-sm font-medium text-gray-900">{customer.total_orders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Gastado:</span>
                <span className="text-sm font-medium text-gray-900">${customer.total_spent.toLocaleString()}</span>
              </div>
              {customer.last_order_date && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Último Pedido:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(customer.last_order_date).toLocaleDateString('es-ES')}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Eye size={16} />
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};