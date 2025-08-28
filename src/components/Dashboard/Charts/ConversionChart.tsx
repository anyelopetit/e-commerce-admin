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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ConversionChart: React.FC = () => {
  const data = {
    labels: ['Visitas', 'Carritos Creados', 'Checkout Iniciado', 'Compras Completadas'],
    datasets: [
      {
        label: 'Usuarios',
        data: [1000, 320, 180, 120],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(5, 150, 105, 0.8)'
        ],
        borderColor: [
          'rgb(37, 99, 235)',
          'rgb(245, 158, 11)',
          'rgb(220, 38, 38)',
          'rgb(5, 150, 105)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Embudo de Conversión'
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};