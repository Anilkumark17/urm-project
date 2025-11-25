import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../ChartCard';

const FeaturesChart = ({ data, totalRespondents }) => {
  const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  const chartData = {
    labels: sortedEntries.map(e => e[0]),
    datasets: [
      {
        label: 'Votes',
        data: sortedEntries.map(e => e[1]),
        backgroundColor: '#06b6d4', // Cyan 500
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'right',
        formatter: (value) => {
          const percentage = ((value / totalRespondents) * 100).toFixed(1) + '%';
          return `${value} (${percentage})`;
        },
        font: { weight: 'bold' }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <ChartCard title="10. Desired Features">
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
};

export default FeaturesChart;
