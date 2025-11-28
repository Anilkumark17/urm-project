import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../ChartCard';

const RevisitPGUGChart = ({ data }) => {
  // Convert scores to percentages (out of 5.0 max)
  const pgPercentage = (data.PG / 5.0) * 100;
  const ugPercentage = (data.UG / 5.0) * 100;

  const chartData = {
    labels: ['PG', 'UG'],
    datasets: [
      {
        label: 'Revisit Score (%)',
        data: [pgPercentage, ugPercentage],
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
        formatter: (value) => value.toFixed(1) + '%',
        font: { weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Percentage scale
        grid: { color: '#334155' },
        ticks: { 
          color: '#94a3b8',
          callback: function(value) {
            return value + '%';
          }
        }
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
