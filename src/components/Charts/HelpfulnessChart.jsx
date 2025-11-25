import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../ChartCard';

const HelpfulnessChart = ({ data }) => {
  // Ensure 1-5 order
  const labels = ['1', '2', '3', '4', '5'];
  const counts = labels.map(l => data[l] || 0);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Respondents',
        data: counts,
        backgroundColor: '#a855f7', // Purple 500
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
        ticks: { color: '#94a3b8' },
        title: {
          display: true,
          text: 'Rating (1-5)',
          color: '#94a3b8'
        }
      }
    }
  };

  return (
    <ChartCard title="9. Helpfulness Rating">
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
};

export default HelpfulnessChart;
