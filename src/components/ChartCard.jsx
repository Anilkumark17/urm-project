import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ChartCard = ({ title, children, className }) => {
  return (
    <div className={cn(
      "glass-effect p-6 rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col card-hover",
      "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
      className
    )}>
      <h3 className="text-xl font-bold mb-5 text-white tracking-tight">{title}</h3>
      <div className="flex-1 min-h-[320px] relative">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
