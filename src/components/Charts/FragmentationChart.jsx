import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../ChartCard';

const FragmentationChart = ({ data }) => {
  // Count occurrences of each score (number of methods)
  const scoreCounts = {};
  data.forEach(score => {
    scoreCounts[score] = (scoreCounts[score] || 0) + 1;
  });

  const labels = Object.keys(scoreCounts).sort((a, b) => a - b);
  const counts = labels.map(l => scoreCounts[l]);
  
  const mean = data.reduce((a, b) => a + b, 0) / data.length;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Users',
        data: counts,
        backgroundColor: '#6366f1', // Indigo 500
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
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: mean - 1, // Adjust for 0-based index if needed, but labels are values here. 
            // Chart.js category scale uses index. Let's approximate or just show in title.
            // For simplicity in this specific setup without complex annotation plugin config, 
            // we'll display the mean in the title or subtitle.
            // To do it properly on the chart with category scale is tricky without mapping values to indices.
            // We will skip the vertical line annotation for now to avoid plugin complexity issues 
            // and just show it in the UI.
            display: false
          }
        }
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
          text: 'Number of Methods Used',
          color: '#94a3b8'
        }
      }
    }
  };

  return (
    <ChartCard title={`5. Fragmentation Score (Mean: ${mean.toFixed(2)})`}>
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
};

export default FragmentationChart;
