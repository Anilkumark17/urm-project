import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../ChartCard';
import StatCard from '../StatCard';
import InsightPanel from '../InsightPanel';

const Q5WeeklySaved = ({ data }) => {
  if (!data) return null;

  const order = ['0-5', '6-15', '16-30', 'more than 30'];
  const sortedEntries = order.map(label => [label, data.data[label] || 0]).filter(e => e[1] > 0);
  
  const chartData = {
    labels: sortedEntries.map(e => e[0]),
    datasets: [
      {
        label: 'Respondents',
        data: sortedEntries.map(e => e[1]),
        backgroundColor: '#f59e0b',
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

  const insights = [
    `Most users save ${sortedEntries[0][0]} items per week`,
    'Saving intensity varies significantly across users',
    'Understanding volume helps size storage solutions'
  ];

  return (
    <div className="space-y-4">
      <ChartCard title="Q5. Weekly Saved Items">
        <Bar data={chartData} options={options} />
      </ChartCard>
      
      <InsightPanel 
        title="Saving Intensity"
        insights={insights}
        color="orange"
      />
    </div>
  );
};

export default Q5WeeklySaved;
