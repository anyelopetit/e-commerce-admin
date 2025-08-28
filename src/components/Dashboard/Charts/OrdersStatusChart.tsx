import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Order } from '../../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface OrdersStatusChartProps {
  orders: Order[];
}

export const OrdersStatusChart: React.FC<OrdersStatusChartProps> = ({ orders }) => {
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusLabels = {
    pending: 'Pendiente',
    processing: 'Procesando',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado'
  };

  const chartData = {
    labels: Object.keys(statusCounts).map(status => statusLabels[status as keyof typeof statusLabels]),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          '#f59e0b',
          '#3b82f6',
          '#8b5cf6',
          '#059669',
          '#dc2626'
        ],
        borderColor: [
          '#d97706',
          '#2563eb',
          '#7c3aed',
          '#047857',
          '#b91c1c'
        ],
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Pedidos por Estado'
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="h-80">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};