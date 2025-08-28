import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { createDoughnutChart } from '../../utils/chartConfigs';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusChart: React.FC = () => {
  const labels = ['Delivered', 'Processing', 'Shipped', 'Cancelled', 'Pending'];
  const data = [156, 45, 23, 12, 8];
  
  const config = createDoughnutChart(labels, data);

  return <Doughnut {...config} />;
};

export default OrderStatusChart;