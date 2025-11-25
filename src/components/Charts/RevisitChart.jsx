import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../ChartCard';

const RevisitChart = ({ data }) => {
  // Define order
  const order = ['Daily', 'Weekly', 'Once a week', 'Monthly', 'Once a month', 'Hardly ever'];
  const sortedEntries = Object.entries(data).sort((a, b) => {
    return order.indexOf(a[0]) - order.indexOf(b[0]);
  });

  const chartData = {
    labels: sortedEntries.map(e => e[0]),
    datasets: [
      {
        label: 'Count',
        data: sortedEntries.map(e => e[1]),
        backgroundColor: '#14b8a6', // Teal 500
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
    <ChartCard title="6. Revisit Frequency">
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
};

export default RevisitChart;
