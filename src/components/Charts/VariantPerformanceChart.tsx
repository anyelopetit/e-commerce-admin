import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VariantPerformanceChart: React.FC = () => {
  const data = {
    labels: ['Galaxy Pro 128GB', 'Galaxy Pro 256GB', 'Galaxy Pro 512GB'],
    datasets: [
      {
        label: 'Units Sold',
        data: [156, 89, 34],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3B82F6',
        borderWidth: 1,
        yAxisID: 'y'
      },
      {
        label: 'Revenue ($)',
        data: [140244, 88311, 33966],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10B981',
        borderWidth: 1,
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default VariantPerformanceChart;