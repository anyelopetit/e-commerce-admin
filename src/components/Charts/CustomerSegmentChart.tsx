import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerSegmentChart: React.FC = () => {
  const data = {
    labels: ['Returning Customers', 'New Customers', 'VIP Customers', 'Inactive'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default CustomerSegmentChart;