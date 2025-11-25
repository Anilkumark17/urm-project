import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../ChartCard';
import { Chart as ChartJS } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels);

const DemographicsChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Respondents',
        data: Object.values(data),
        backgroundColor: ['#3b82f6', '#8b5cf6'],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'top',
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1) + '%';
          return `${value} (${percentage})`;
        },
        font: { weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <ChartCard title="1. Demographics (PG vs UG)">
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
};

export default DemographicsChart;
