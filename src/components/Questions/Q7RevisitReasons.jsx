import React from 'react';
import { Bar } from 'react-chartjs-2';

const Q7RevisitReasons = ({ data, totalRespondents }) => {
  if (!data) return null;

  const sortedEntries = Object.entries(data.data).sort((a, b) => b[1] - a[1]);
  
  const chartData = {
    labels: sortedEntries.map(e => e[0]),
    datasets: [
      {
        label: 'Respondents',
        data: sortedEntries.map(e => e[1]),
        backgroundColor: '#14b8a6',
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
        formatter: (value) => {
          const percentage = ((value / totalRespondents) * 100).toFixed(1) + '%';
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

  const insights = [
    `Top reason: "${sortedEntries[0][0]}"`,
    'Understanding motivations helps design better retrieval UX',
    'Multiple reasons indicate diverse use cases'
  ];

  return (
    <div className="grid grid-1">
      <div className="card">
        <h3 className="card-title">Q7. Revisit Reasons</h3>
        <div className="card-content">
          <Bar data={chartData} options={options} />
        </div>
      </div>
      
      <div className="insight-panel green">
        <div className="insight-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <h4>UX Insights</h4>
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

export default Q7RevisitReasons;
