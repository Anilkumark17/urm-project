import React from 'react';
import { Bar } from 'react-chartjs-2';

const Q11EmotionalReaction = ({ data }) => {
  if (!data) return null;

  const sortedEntries = Object.entries(data.data).sort((a, b) => b[1] - a[1]);
  
  // Categorize as positive/negative
  const positiveReactions = ['I find useful things to check again'];
  const negativeReactions = ['I rarely open it', 'I feel like I have too many items'];
  
  const backgroundColors = sortedEntries.map(e => 
    positiveReactions.includes(e[0]) ? '#10b981' : 
    negativeReactions.includes(e[0]) ? '#ef4444' : '#94a3b8'
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
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'right',
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1) + '%';
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

  return <Bar data={chartData} options={options} />;
};

export default Q11EmotionalReaction;
