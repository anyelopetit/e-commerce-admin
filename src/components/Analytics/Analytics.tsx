import React from 'react';
import { SalesChart } from '../Dashboard/Charts/SalesChart';
import { ProductsChart } from '../Dashboard/Charts/ProductsChart';
import { OrdersStatusChart } from '../Dashboard/Charts/OrdersStatusChart';
import { CustomersChart } from '../Dashboard/Charts/CustomersChart';
import { ConversionChart } from '../Dashboard/Charts/ConversionChart';
import { RevenueChart } from '../Dashboard/Charts/RevenueChart';
import { CategoryChart } from '../Dashboard/Charts/CategoryChart';
import { GeolocationChart } from '../Dashboard/Charts/GeolocationChart';
import { PromotionsChart } from '../Dashboard/Charts/PromotionsChart';
import { mockSalesData, mockProducts, mockOrders } from '../../utils/mockData';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analíticas Avanzadas</h1>
        <p className="text-gray-600">Análisis detallado de rendimiento y métricas comerciales</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
          <SalesChart data={mockSalesData} type="bar" />
        </div>
        
        <RevenueChart />
        <ConversionChart />
        
        <ProductsChart products={mockProducts} />
        <OrdersStatusChart orders={mockOrders} />
        
        <CustomersChart />
        <CategoryChart />
        
        <div className="lg:col-span-2">
          <GeolocationChart />
        </div>
        
        <div className="lg:col-span-2">
          <PromotionsChart />
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Rendimiento</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Página de Producto Vista</span>
              <span className="text-sm font-medium text-gray-900">2.3 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tiempo en Checkout</span>
              <span className="text-sm font-medium text-gray-900">4.1 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Abandono Carrito</span>
              <span className="text-sm font-medium text-red-600">68.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Canal de Ventas</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sitio Web</span>
              <span className="text-sm font-medium text-gray-900">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Móvil App</span>
              <span className="text-sm font-medium text-gray-900">18%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Market Place</span>
              <span className="text-sm font-medium text-gray-900">4%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Variantes Top</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">iPhone 15 Pro 128GB</span>
              <span className="text-sm font-medium text-green-600">89 ventas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">MacBook Air M3</span>
              <span className="text-sm font-medium text-green-600">67 ventas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Galaxy S24</span>
              <span className="text-sm font-medium text-green-600">45 ventas</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rotación Inventario</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rotación Promedio</span>
              <span className="text-sm font-medium text-gray-900">6.2x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Días Promedio Venta</span>
              <span className="text-sm font-medium text-gray-900">12 días</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Stock Muerto</span>
              <span className="text-sm font-medium text-red-600">3.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};