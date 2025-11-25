import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../ChartCard';

const OutcomeChart = ({ data }) => {
  const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  // Highlight unused/forgotten
  const negativeOutcomes = ['I forget about it', 'It gets lost', 'I delete it later', 'It clutters my phone'];
  
  const backgroundColors = sortedEntries.map(e => 
    negativeOutcomes.includes(e[0]) ? '#ef4444' : '#22c55e' // Red 500 vs Green 500
  );

  const chartData = {
    labels: sortedEntries.map(e => e[0]),
    datasets: [
      {
        label: 'Count',
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

  return (
    <ChartCard title="8. Outcome Over Time">
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
};

export default OutcomeChart;
