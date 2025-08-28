import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { createLineChart } from '../../utils/chartConfigs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const SalesChart: React.FC = () => {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [12000, 15000, 8000, 22000, 18000, 25000, 16000];
  
  const config = createLineChart(labels, data, 'Daily Sales ($)');

  return <Line {...config} />;
};

export default SalesChart;