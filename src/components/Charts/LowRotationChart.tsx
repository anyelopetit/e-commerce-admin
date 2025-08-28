import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LowRotationChart: React.FC = () => {
  const data = {
    labels: ['Vintage Watch', 'Desktop PC', 'Camera Lens', 'Art Supplies', 'Board Games'],
    datasets: [
      {
        label: 'Days Since Last Sale',
        data: [45, 38, 29, 52, 67],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: '#EF4444',
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
          text: 'Days Since Last Sale'
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default LowRotationChart;