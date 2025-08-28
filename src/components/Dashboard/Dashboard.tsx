import React from 'react';
import { StatsCards } from './StatsCards';
import { SalesChart } from './Charts/SalesChart';
import { ProductsChart } from './Charts/ProductsChart';
import { OrdersStatusChart } from './Charts/OrdersStatusChart';
import { CustomersChart } from './Charts/CustomersChart';
import { ConversionChart } from './Charts/ConversionChart';
import { RevenueChart } from './Charts/RevenueChart';
import { CategoryChart } from './Charts/CategoryChart';
import { GeolocationChart } from './Charts/GeolocationChart';
import { PromotionsChart } from './Charts/PromotionsChart';
import { mockDashboardStats, mockSalesData, mockProducts, mockOrders } from '../../utils/mockData';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Analítico</h1>
        <p className="text-gray-600">Resumen ejecutivo y métricas clave de tu e-commerce</p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={mockDashboardStats} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
          <SalesChart data={mockSalesData} type="line" />
        </div>
        
        <ProductsChart products={mockProducts} />
        <OrdersStatusChart orders={mockOrders} />
        
        <CustomersChart />
        <ConversionChart />
        
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        
        <CategoryChart />
        <GeolocationChart />
        
        <div className="lg:col-span-2">
          <PromotionsChart />
        </div>
      </div>

      {/* Additional Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Variantes</h3>
          <div className="space-y-3">
            {mockProducts.map(product => 
              product.variants.slice(0, 3).map(variant => (
                <div key={variant.id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{variant.name}</span>
                  <span className="text-sm font-medium text-gray-900">{variant.stock} unidades</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos Bajo Stock</h3>
          <div className="space-y-3">
            {mockProducts.filter(p => p.variants.some(v => v.stock < 30)).map(product => (
              <div key={product.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{product.name}</span>
                <span className="text-sm font-medium text-red-600">
                  {Math.min(...product.variants.map(v => v.stock))} restantes
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas Clave</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Carritos Abandonados</span>
              <span className="text-sm font-medium text-orange-600">23.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tiempo Promedio Compra</span>
              <span className="text-sm font-medium text-gray-900">8.5 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Retorno de Inversión</span>
              <span className="text-sm font-medium text-green-600">284%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};