import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { mockProducts } from '../../utils/mockData';
import { db, addToPendingSync } from '../../utils/database';

export const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // Try to load from IndexedDB first
      const localProducts = await db.products.toArray();
      if (localProducts.length > 0) {
        setProducts(localProducts);
      } else {
        // Load mock data and save to IndexedDB
        await db.products.bulkPut(mockProducts);
        setProducts(mockProducts);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const handleDeleteProduct = async (productId: string) => {
    try {
      await db.products.delete(productId);
      await addToPendingSync('DELETE_PRODUCT', { id: productId });
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="text-gray-600 mt-1">Administra tu inventario y variantes de productos</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas las categorías' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
          const lowStock = totalStock < 50;
          
          return (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' :
                    product.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                    {lowStock && <AlertCircle className="text-orange-500" size={16} />}
                    <Package size={16} className="text-gray-500" />
                    <span className={`text-sm font-medium ${lowStock ? 'text-orange-600' : 'text-gray-600'}`}>
                      {totalStock} unidades
                    </span>
                  </div>
                </div>

                {/* Variants Preview */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">{product.variants.length} variante(s)</p>
                  <div className="space-y-1">
                    {product.variants.slice(0, 2).map(variant => (
                      <div key={variant.id} className="flex justify-between text-xs">
                        <span className="text-gray-600">{variant.name}</span>
                        <span className="text-gray-900">{variant.stock} stock</span>
                      </div>
                    ))}
                    {product.variants.length > 2 && (
                      <p className="text-xs text-blue-600">+{product.variants.length - 2} más</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                    <Edit size={16} />
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No hay productos</h3>
          <p className="mt-2 text-gray-500">Comienza agregando tu primer producto.</p>
        </div>
      )}
    </div>
  );
};