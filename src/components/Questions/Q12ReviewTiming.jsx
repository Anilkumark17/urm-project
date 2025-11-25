import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Q12ReviewTiming = ({ data }) => {
  if (!data) return null;

  const sortedEntries = Object.entries(data.data).sort((a, b) => b[1] - a[1]);
  
  const chartData = {
    labels: sortedEntries.map(e => e[0]),
    datasets: [
      {
        data: sortedEntries.map(e => e[1]),
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#f59e0b',
          '#10b981',
          '#06b6d4'
        ],
        borderWidth: 2,
        borderColor: '#1e293b',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#cbd5e1',
          padding: 10,
          font: { size: 11 }
        }
      },
      datalabels: {
        color: '#fff',
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1) + '%';
          return percentage;
        },
        font: { weight: 'bold', size: 10 }
      }
    }
  };

  return <Doughnut data={chartData} options={options} />;
};

export default Q12ReviewTiming;
