import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { createBarChart } from '../../utils/chartConfigs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopProductsChart: React.FC = () => {
  const labels = ['Smartphone Galaxy', 'Wireless Headphones', 'Gaming Laptop', 'Smart Watch', 'Tablet Pro'];
  const data = [156, 89, 67, 45, 32];
  
  const config = createBarChart(labels, data, 'Units Sold');

  return <Bar {...config} />;
};

export default TopProductsChart;