import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesChannelChart: React.FC = () => {
  const data = {
    labels: ['Website', 'Mobile App', 'Marketplace', 'Social Media', 'Direct Sales'],
    datasets: [
      {
        data: [42, 28, 18, 8, 4],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#8B5CF6',
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
        position: 'bottom' as const,
      }
    }
  };

  return <Pie data={data} options={options} />;
};

export default SalesChannelChart;