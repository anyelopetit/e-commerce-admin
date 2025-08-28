import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoryChart: React.FC = () => {
  const data = {
    labels: ['Electrónicos', 'Ropa', 'Hogar', 'Deportes', 'Libros', 'Otros'],
    datasets: [
      {
        label: 'Productos por Categoría',
        data: [45, 25, 15, 8, 4, 3],
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#f59e0b',
          '#ef4444',
          '#059669',
          '#6b7280'
        ],
        borderColor: [
          '#2563eb',
          '#7c3aed',
          '#d97706',
          '#dc2626',
          '#047857',
          '#4b5563'
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
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Distribución por Categorías'
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="h-80">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};