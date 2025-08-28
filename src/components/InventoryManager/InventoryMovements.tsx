import React, { useState } from 'react';
import { Package, Plus, ArrowUp, ArrowDown, RotateCw } from 'lucide-react';
import { mockInventoryMovements, mockProducts } from '../../services/mockData';
import { InventoryMovement } from '../../types';
import { format } from 'date-fns';

const InventoryMovements: React.FC = () => {
  const [movements, setMovements] = useState(mockInventoryMovements);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMovement, setNewMovement] = useState({
    productId: '',
    type: 'in' as 'in' | 'out' | 'adjustment',
    quantity: 0,
    reason: ''
  });

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'in': return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'out': return <ArrowDown className="h-4 w-4 text-red-600" />;
      case 'adjustment': return <RotateCw className="h-4 w-4 text-blue-600" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case 'in': return 'bg-green-100 text-green-800';
      case 'out': return 'bg-red-100 text-red-800';
      case 'adjustment': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMovement = () => {
    if (!newMovement.productId || !newMovement.quantity || !newMovement.reason) return;

    const movement: InventoryMovement = {
      id: `MOV-${Date.now()}`,
      productId: newMovement.productId,
      type: newMovement.type,
      quantity: newMovement.quantity,
      reason: newMovement.reason,
      createdAt: new Date()
    };

    setMovements([movement, ...movements]);
    setNewMovement({ productId: '', type: 'in', quantity: 0, reason: '' });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Inventory Movements</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Movement</span>
        </button>
      </div>

      {/* Add Movement Form */}
      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Add Inventory Movement</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
              <select
                value={newMovement.productId}
                onChange={(e) => setNewMovement({ ...newMovement, productId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select product</option>
                {mockProducts.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={newMovement.type}
                onChange={(e) => setNewMovement({ ...newMovement, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="in">Stock In</option>
                <option value="out">Stock Out</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={newMovement.quantity}
                onChange={(e) => setNewMovement({ ...newMovement, quantity: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <input
                type="text"
                value={newMovement.reason}
                onChange={(e) => setNewMovement({ ...newMovement, reason: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Restock, Sale, Damage"
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleAddMovement}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Movement
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Movements List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {movements.map(movement => {
                const product = mockProducts.find(p => p.id === movement.productId);
                return (
                  <tr key={movement.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product?.name || 'Unknown Product'}</div>
                      {movement.variantId && (
                        <div className="text-xs text-gray-500">Variant: {movement.variantId}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getMovementColor(movement.type)}`}>
                        {getMovementIcon(movement.type)}
                        <span>{movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {movement.type === 'out' ? '-' : '+'}
                      {movement.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movement.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(movement.createdAt, 'MMM dd, yyyy HH:mm')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryMovements;