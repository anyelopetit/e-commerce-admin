import React from 'react';
import { TrendingUp, ShoppingCart, Package, Users, DollarSign, Percent } from 'lucide-react';
import { DashboardStats } from '../../types';

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Ingresos Totales',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const,
      color: 'bg-green-500'
    },
    {
      title: 'Pedidos',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      change: '+8.2%',
      changeType: 'positive' as const,
      color: 'bg-blue-500'
    },
    {
      title: 'Productos',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      change: '+2.1%',
      changeType: 'positive' as const,
      color: 'bg-purple-500'
    },
    {
      title: 'Clientes',
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      change: '+15.3%',
      changeType: 'positive' as const,
      color: 'bg-orange-500'
    },
    {
      title: 'Tasa de Conversión',
      value: `${stats.conversionRate}%`,
      icon: Percent,
      change: '+0.8%',
      changeType: 'positive' as const,
      color: 'bg-teal-500'
    },
    {
      title: 'Valor Promedio',
      value: `$${stats.averageOrderValue}`,
      icon: TrendingUp,
      change: '+5.4%',
      changeType: 'positive' as const,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className={`p-3 rounded-full ${card.color}`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};