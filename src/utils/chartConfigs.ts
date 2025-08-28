import { ChartConfiguration } from 'chart.js';

export const createLineChart = (labels: string[], data: number[], label: string): ChartConfiguration => ({
  type: 'line',
  data: {
    labels,
    datasets: [{
      label,
      data,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

export const createBarChart = (labels: string[], data: number[], label: string): ChartConfiguration => ({
  type: 'bar',
  data: {
    labels,
    datasets: [{
      label,
      data,
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ],
      borderColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

export const createDoughnutChart = (labels: string[], data: number[]): ChartConfiguration => ({
  type: 'doughnut',
  data: {
    labels,
    datasets: [{
      data,
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
        '#06B6D4'
      ]
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      }
    }
  }
});

export const createAreaChart = (labels: string[], datasets: any[]): ChartConfiguration => ({
  type: 'line',
  data: {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      fill: true,
      backgroundColor: `rgba(${59 + index * 40}, ${130 - index * 20}, ${246 - index * 30}, 0.2)`,
      borderColor: `rgba(${59 + index * 40}, ${130 - index * 20}, ${246 - index * 30}, 1)`
    }))
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true
      }
    }
  }
});