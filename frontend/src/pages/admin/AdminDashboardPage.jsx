import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import PriorityBadge from '../../components/common/PriorityBadge';
import StatusBadge from '../../components/common/StatusBadge';
import { 
  Building2, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  IndianRupee, 
  BarChart3,
  Cpu,
  Filter,
  Download,
  Sparkles,
  Layers
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, activeOrg } = useAuth();

  const [selectedWard, setSelectedWard] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const complaintsData = [
    { id: 'JS-2026-00125', title: 'Severe Streetlight Outage', ward: 'Ward 14 (Kothrud North)', dept: 'Electrical', priority: 'P1_HIGHEST', status: 'WORK_COMPLETED_AWAITING_VERIFICATION', staff: 'Ramesh Sonawane', slaLeft: '4h' },
    { id: 'JS-2026-00204', title: 'Deep Pothole Causing Skidding', ward: 'Ward 14 (Kothrud North)', dept: 'Roads', priority: 'P2_HIGH', status: 'WORK_IN_PROGRESS', staff: 'Sunil Patil', slaLeft: '36h' },
    { id: 'JS-2026-00319', title: 'Broken Chamber Cover on Footpath', ward: 'Ward 18 (Bavdhan)', dept: 'Drainage', priority: 'P1_HIGHEST', status: 'ASSIGNED', staff: 'Mahesh Gaikwad', slaLeft: '18h' },
    { id: 'JS-2026-00401', title: 'Open Live Wire Hazard Sparking', ward: 'Ward 22 (Aundh)', dept: 'Electrical', priority: 'P0_CRITICAL', status: 'ASSIGNED', staff: 'Disaster Cell Team A', slaLeft: '1h 20m' },
  ];

  const filtered = complaintsData.filter(item => {
    if (selectedPriority !== 'ALL' && !item.priority.includes(selectedPriority)) return false;
    if (selectedStatus !== 'ALL' && item.status !== selectedStatus) return false;
    if (selectedWard !== 'ALL' && !item.ward.includes(selectedWard)) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-border gap-4 bg-white p-6 rounded-3xl shadow-card">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-brand-600 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full uppercase">
                Municipal Corporation Admin
              </span>
              <span className="text-xs text-content-secondary">
                {activeOrg?.name || 'Pune Municipal Corporation'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              Civic Operations & Command Center
            </h1>
            <p className="text-xs text-content-secondary mt-1">
              Real-time multi-ward dispatch, priority routing, budget monitoring, and DPDPA compliance logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/ai-control"
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all"
            >
              <Cpu className="w-4 h-4 text-brand-200" />
              AI Admin Control Center
            </Link>
          </div>
        </div>

        {/* Top Operational Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <div className="flex justify-between items-center text-xs text-content-secondary mb-2">
              <span className="font-semibold">Active Field Technicians</span>
              <Users className="w-4 h-4 text-brand-600" />
            </div>
            <span className="text-3xl font-black text-content-main">128</span>
            <span className="text-[11px] text-status-success font-semibold block mt-1">94% attendance rate</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <div className="flex justify-between items-center text-xs text-content-secondary mb-2">
              <span className="font-semibold">Average Resolution SLA</span>
              <Clock className="w-4 h-4 text-brand-600" />
            </div>
            <span className="text-3xl font-black text-brand-600">24.2h</span>
            <span className="text-[11px] text-content-muted block mt-1">Target: &lt; 36.0h</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <div className="flex justify-between items-center text-xs text-content-secondary mb-2">
              <span className="font-semibold">Pending Verification</span>
              <CheckCircle className="w-4 h-4 text-status-warning" />
            </div>
            <span className="text-3xl font-black text-status-warning">42</span>
            <span className="text-[11px] text-content-muted block mt-1">Awaiting citizen sign-off</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <div className="flex justify-between items-center text-xs text-content-secondary mb-2">
              <span className="font-semibold">DPDPA Privacy Requests</span>
              <ShieldCheck className="w-4 h-4 text-status-success" />
            </div>
            <span className="text-3xl font-black text-status-success">0 Overdue</span>
            <span className="text-[11px] text-content-muted block mt-1">3 completed this week</span>
          </div>
        </div>

        {/* Priority Dispatch Queue with Multi-Filter */}
        <div className="bg-white rounded-3xl border border-surface-border p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-surface-border gap-3">
            <div>
              <h2 className="text-base font-bold text-content-main">
                Live Priority Dispatch Queue (P0 - P4)
              </h2>
              <p className="text-xs text-content-secondary">
                Sorted by risk-weighted SLA countdown
              </p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="bg-surface-bg border border-surface-border text-xs text-content-main rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-600"
              >
                <option value="ALL">All Wards</option>
                <option value="Ward 14">Ward 14</option>
                <option value="Ward 18">Ward 18</option>
                <option value="Ward 22">Ward 22</option>
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="bg-surface-bg border border-surface-border text-xs text-content-main rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-600"
              >
                <option value="ALL">All Priorities</option>
                <option value="P0">P0 Critical</option>
                <option value="P1">P1 Highest</option>
                <option value="P2">P2 High</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-surface-bg border border-surface-border text-xs text-content-main rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-600"
              >
                <option value="ALL">All Statuses</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="WORK_IN_PROGRESS">In Progress</option>
                <option value="WORK_COMPLETED_AWAITING_VERIFICATION">Awaiting Verification</option>
              </select>

              <button
                onClick={() => alert('Exporting Official Municipal Audit Report (PDF/Excel)...')}
                className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition"
              >
                <Download className="w-3.5 h-3.5" />
                Export Audit PDF
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-content-main">
              <thead className="bg-surface-bg text-content-secondary uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">ID</th>
                  <th className="py-3 px-4">Title & Ward</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assigned Dept / Staff</th>
                  <th className="py-3 px-4 rounded-r-xl">SLA Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-brand-50/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-600">{item.id}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-content-main">{item.title}</p>
                      <p className="text-[11px] text-content-muted">{item.ward}</p>
                    </td>
                    <td className="py-3.5 px-4">{item.dept}</td>
                    <td className="py-3.5 px-4"><PriorityBadge priority={item.priority} /></td>
                    <td className="py-3.5 px-4"><StatusBadge status={item.status} /></td>
                    <td className="py-3.5 px-4 font-semibold text-content-main">{item.staff}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-status-success">{item.slaLeft}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
