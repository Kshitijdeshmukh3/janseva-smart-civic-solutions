import React from 'react';

const priorityConfig = {
  P0_CRITICAL: { label: 'P0 Critical (Public Safety)', color: 'bg-red-100 text-red-800 border-red-300' },
  P1_HIGHEST: { label: 'P1 Highest', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  P2_HIGH: { label: 'P2 High', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  P3_MEDIUM: { label: 'P3 Medium', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  P4_LOW: { label: 'P4 Low', color: 'bg-slate-100 text-slate-700 border-slate-300' },
};

export default function PriorityBadge({ priority }) {
  const conf = priorityConfig[priority] || { label: priority, color: 'bg-slate-100 text-slate-700 border-slate-200' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${conf.color}`}>
      {conf.label}
    </span>
  );
}
