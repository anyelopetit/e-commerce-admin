import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GeolocationChart: React.FC = () => {
  const data = {
    labels: ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania'],
    datasets: [
      {
        label: 'Sales Volume ($)',
        data: [45000, 38000, 32000, 28000, 22000, 18000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(6, 182, 212, 0.8)'
        ],
        borderColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#8B5CF6',
          '#EF4444',
          '#06B6D4'
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
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales ($)'
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default GeolocationChart;