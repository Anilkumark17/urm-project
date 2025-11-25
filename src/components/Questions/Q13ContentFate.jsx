import React from 'react';
import { Bar } from 'react-chartjs-2';

const Q13ContentFate = ({ data }) => {
  if (!data) return null;

  const sortedEntries = Object.entries(data.data).sort((a, b) => b[1] - a[1]);
  
  // Highlight negative outcomes
  const negativeOutcomes = ['It stays unused', 'I forget about it'];
  const backgroundColors = sortedEntries.map(e => 
    negativeOutcomes.includes(e[0]) ? '#ef4444' : '#10b981'
  );

  const chartData = {
    labels: sortedEntries.map(e => e[0]),
    datasets: [
      {
        label: 'Respondents',
        data: sortedEntries.map(e => e[1]),
        backgroundColor: backgroundColors,
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

  return <Bar data={chartData} options={options} />;
};

export default Q13ContentFate;
