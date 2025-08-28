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

export const GeolocationChart: React.FC = () => {
  const data = {
    labels: ['California', 'Texas', 'Nueva York', 'Florida', 'Illinois', 'Pensilvania'],
    datasets: [
      {
        label: 'Ventas por Estado',
        data: [234, 189, 167, 145, 123, 98],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderColor: 'rgb(37, 99, 235)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ventas por Ubicación Geográfica'
      }
    },
    scales: {
      x: {
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