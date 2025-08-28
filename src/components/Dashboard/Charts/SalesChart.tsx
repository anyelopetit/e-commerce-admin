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
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { SalesData } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesChartProps {
  data: SalesData[];
  type?: 'line' | 'bar';
}

export const SalesChart: React.FC<SalesChartProps> = ({ data, type = 'line' }) => {
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString('es-ES')),
    datasets: [
      {
        label: 'Ventas',
        data: data.map(item => item.sales),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 2,
        fill: type === 'line'
      },
      {
        label: 'Ingresos ($)',
        data: data.map(item => item.revenue / 100), // Scale down for visualization
        borderColor: 'rgb(5, 150, 105)',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        borderWidth: 2,
        fill: type === 'line'
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
        text: 'Tendencia de Ventas e Ingresos'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const ChartComponent = type === 'line' ? Line : Bar;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="h-80">
        <ChartComponent data={chartData} options={options} />
      </div>
    </div>
  );
};