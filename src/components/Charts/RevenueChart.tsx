import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { createAreaChart } from '../../utils/chartConfigs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const RevenueChart: React.FC = () => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const datasets = [
    {
      label: 'Revenue',
      data: [45000, 52000, 48000, 61000, 55000, 67000]
    },
    {
      label: 'Costs',
      data: [28000, 31000, 29000, 38000, 33000, 41000]
    }
  ];
  
  const config = createAreaChart(labels, datasets);

  return <Line {...config} />;
};

export default RevenueChart;