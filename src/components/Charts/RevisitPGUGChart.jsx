import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../ChartCard';

const RevisitPGUGChart = ({ data }) => {
  const chartData = {
    labels: ['PG', 'UG'],
    datasets: [
      {
        label: 'Mean Revisit Score',
        data: [data.PG, data.UG],
        backgroundColor: ['#8b5cf6', '#3b82f6'],
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
        formatter: (value) => value.toFixed(2),
        font: { weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5, // Score is 1-5
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
    <ChartCard title="7. PG vs UG Revisit Mean Score">
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
};

export default RevisitPGUGChart;
