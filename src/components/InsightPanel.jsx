import React from 'react';
import { Lightbulb } from 'lucide-react';

const InsightPanel = ({ title, insights, color = 'blue' }) => {
  const colorClasses = {
    blue: 'border-blue-500/30 bg-blue-500/5',
    green: 'border-green-500/30 bg-green-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    orange: 'border-orange-500/30 bg-orange-500/5'
  };

  return (
    <div className={`border-l-4 ${colorClasses[color]} rounded-r-xl p-5 space-y-3 card-hover`}>
      <div className="flex items-center gap-2.5">
        <Lightbulb size={20} className={`text-${color}-400`} />
        <h4 className="font-bold text-slate-100 tracking-tight">{title}</h4>
      </div>
      
      <ul className="space-y-3 text-sm text-slate-300">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-slate-500 mt-1 font-bold">→</span>
            <span className="leading-relaxed">{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsightPanel;
