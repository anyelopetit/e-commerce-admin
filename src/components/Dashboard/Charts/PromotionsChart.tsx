import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PromotionsChart: React.FC = () => {
  const data = {
    labels: ['Sin Descuento', '5% Off', '10% Off', '15% Off', '20% Off', '25% Off+'],
    datasets: [
      {
        label: 'Conversión (%)',
        data: [2.1, 3.5, 5.8, 7.2, 8.9, 6.4],
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
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
        text: 'Efectividad de Promociones y Descuentos'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};