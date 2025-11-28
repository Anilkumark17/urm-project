import React from 'react';
import { Bar } from 'react-chartjs-2';

const Q5WeeklySaved = ({ data }) => {
  if (!data) return null;

  const order = ['0-5', '6-15', '16-30', 'more than 30'];
  const sortedEntries = order.map(label => [label, data.data[label] || 0]).filter(e => e[1] > 0);
  
  // Find the most common range
  const mostCommon = sortedEntries.reduce((max, entry) => 
    entry[1] > max[1] ? entry : max, sortedEntries[0]
  );

  // Calculate total respondents
  const totalRespondents = sortedEntries.reduce((sum, entry) => sum + entry[1], 0);
  
  // Calculate percentages for better insights
  const highIntensity = sortedEntries
    .filter(e => e[0] === '16-30' || e[0] === 'more than 30')
    .reduce((sum, e) => sum + e[1], 0);
  const highIntensityPercent = ((highIntensity / totalRespondents) * 100).toFixed(0);

  const chartData = {
    labels: sortedEntries.map(e => e[0] + ' items'),
    datasets: [
      {
        label: 'Respondents',
        data: sortedEntries.map(e => e[1]),
        backgroundColor: [
          '#10b981', // emerald-500
          '#34d399', // emerald-400
          '#6ee7b7', // emerald-300
          '#a7f3d0', // emerald-200
        ].slice(0, sortedEntries.length),
        borderRadius: 8,
        barThickness: 50,
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
        font: { 
          weight: 'bold',
          size: 13
        },
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1) + '%';
          return `${value} (${percentage})`;
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        padding: 12,
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const percentage = ((context.parsed.y / totalRespondents) * 100).toFixed(1);
            return `${context.parsed.y} respondents (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { 
          color: '#1e293b',
          lineWidth: 1
        },
        ticks: { 
          color: '#94a3b8',
          font: { size: 12 },
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Number of Respondents',
          color: '#cbd5e1',
          font: { size: 13, weight: '600' }
        }
      },
      x: {
        grid: { display: false },
        ticks: { 
          color: '#94a3b8',
          font: { size: 12, weight: '500' }
        },
        title: {
          display: true,
          text: 'Items Saved Per Week',
          color: '#cbd5e1',
          font: { size: 13, weight: '600' }
        }
      }
    }
  };

  const insights = [
    `${mostCommon[0]} items/week is the most common saving rate (${mostCommon[1]} users)`,
    `${highIntensityPercent}% of users are high-intensity savers (16+ items/week)`,
    'Diverse saving patterns indicate varied use cases and storage needs'
  ];

  return (
    <div className="grid grid-1">
      <div className="card">
        <h3 className="card-title">Q5. Weekly Saving Intensity</h3>
        <div className="card-content">
          <Bar data={chartData} options={options} />
        </div>
      </div>
      
      <div className="insight-panel green">
        <div className="insight-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <h4>Saving Intensity Insights</h4>
        </div>
        <ul className="insight-list">
          {insights.map((insight, i) => (
            <li key={i} className="insight-item">
              <span className="arrow">→</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Q5WeeklySaved;
