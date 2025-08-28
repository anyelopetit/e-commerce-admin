import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Product } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProductsChartProps {
  products: Product[];
}

export const ProductsChart: React.FC<ProductsChartProps> = ({ products }) => {
  const chartData = {
    labels: products.map(p => p.name.substring(0, 15) + '...'),
    datasets: [
      {
        label: 'Stock Total',
        data: products.map(p => p.variants.reduce((acc, v) => acc + v.stock, 0)),
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderColor: 'rgb(37, 99, 235)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Inventario por Producto'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};