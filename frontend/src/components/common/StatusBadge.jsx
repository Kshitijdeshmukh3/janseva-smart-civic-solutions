import React from 'react';

const statusConfig = {
  SUBMITTED: { label: 'Submitted', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  UNDER_REVIEW: { label: 'Under Review', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  VERIFIED: { label: 'Verified', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  ASSIGNED: { label: 'Staff Assigned', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  WORK_IN_PROGRESS: { label: 'In Progress', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  WORK_COMPLETED_AWAITING_VERIFICATION: { label: 'Awaiting Citizen Verification', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  RESOLVED: { label: 'Resolved & Closed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  REOPENED: { label: 'Disputed / Reopened', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  REJECTED: { label: 'Rejected', color: 'bg-slate-100 text-slate-700 border-slate-300' },
};

export default function StatusBadge({ status }) {
  const conf = statusConfig[status] || { label: status, color: 'bg-slate-100 text-slate-700 border-slate-200' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${conf.color}`}>
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current opacity-75"></span>
      {conf.label}
    </span>
  );
}
