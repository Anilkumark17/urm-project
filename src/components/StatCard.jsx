import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const StatCard = ({ title, stats, interpretation }) => {
  if (!stats) return null;

  return (
    <div className="glass-effect rounded-xl p-5 space-y-3 card-hover border border-slate-700/50">
      <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 tracking-tight">
        <TrendingUp size={18} className="text-blue-400" />
        {title}
      </h4>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="space-y-1.5">
            <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">{key}</span>
            <div className="text-white font-mono text-base font-semibold">
              {typeof value === 'number' ? value.toFixed(3) : value}
            </div>
          </div>
        ))}
      </div>

      {interpretation && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-start gap-2.5">
            {stats.significant || stats.pValue < 0.05 ? (
              <CheckCircle2 size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
            )}
            <p className="text-sm text-slate-300 leading-relaxed">{interpretation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
