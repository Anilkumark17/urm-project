import React from 'react';
import { Bar } from 'react-chartjs-2';

const Q14Helpfulness = ({ data }) => {
  if (!data) return null;

  const order = ['Very helpful', 'Somewhat helpful', 'Neutral', 'Not helpful', 'Very unhelpful'];
  const sortedEntries = order.map(label => [label, data.data[label] || 0]).filter(e => e[1] > 0);
  
  const chartData = {
    labels: sortedEntries.map(e => e[0]),
    datasets: [
      {
        label: 'Respondents',
        data: sortedEntries.map(e => e[1]),
        backgroundColor: '#a855f7',
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

  return <Bar data={chartData} options={options} />;
};

export default Q14Helpfulness;
