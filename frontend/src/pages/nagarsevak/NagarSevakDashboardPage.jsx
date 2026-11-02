import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import { 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  IndianRupee, 
  Camera, 
  MapPin, 
  Lock,
  Eye,
  Megaphone,
  Layers,
  BarChart3,
  ExternalLink
} from 'lucide-react';

export default function NagarSevakDashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with READ ONLY Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-border gap-4 bg-white p-6 rounded-3xl shadow-card">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full uppercase">
                Elected Representative Portal
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase">
                <Lock className="w-3 h-3" />
                Read-Only Supervisory Mode
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              {user?.name || 'Smt. Sunita More (Nagar Sevak)'}
            </h1>
            <p className="text-xs text-content-secondary mt-1">
              Constituency: <strong className="text-content-main">Ward 14 (Kothrud North)</strong> • Pune Municipal Corporation
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface-bg border border-surface-border px-4 py-2 rounded-2xl text-xs text-content-secondary">
            <Eye className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Supervisory Oversight • Status mutations restricted to field engineers</span>
          </div>
        </div>

        {/* 7 Core Statistical KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-card">
            <span className="text-[11px] text-content-muted block mb-1 font-semibold">Total Ward Issues</span>
            <span className="text-2xl font-black text-content-main">842</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-card">
            <span className="text-[11px] text-status-danger font-bold block mb-1">Critical (P0)</span>
            <span className="text-2xl font-black text-status-danger">1</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-card">
            <span className="text-[11px] text-status-warning font-bold block mb-1">High (P1-P2)</span>
            <span className="text-2xl font-black text-status-warning">14</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-card">
            <span className="text-[11px] text-content-muted block mb-1 font-semibold">Pending Review</span>
            <span className="text-2xl font-black text-content-main">6</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-brand-200 shadow-card">
            <span className="text-[11px] text-brand-600 font-semibold block mb-1">Work in Progress</span>
            <span className="text-2xl font-black text-brand-600">22</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-card">
            <span className="text-[11px] text-status-success font-semibold block mb-1">Completed</span>
            <span className="text-2xl font-black text-status-success">799</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-card">
            <span className="text-[11px] text-status-success font-bold block mb-1">Overdue SLA</span>
            <span className="text-2xl font-black text-status-success">0</span>
          </div>
        </div>

        {/* Ward Development Funds & Projects */}
        <div className="bg-white rounded-3xl border border-surface-border p-6 space-y-4 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div>
              <h2 className="text-base font-bold text-content-main flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-600" />
                Ward Development Projects & Budget Execution
              </h2>
              <p className="text-xs text-content-secondary">
                Authorized financial and physical milestone tracking
              </p>
            </div>
            <Link
              to="/projects"
              className="text-xs text-brand-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>View All Ward Projects</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-surface-bg rounded-2xl border border-surface-border space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-content-main">Stormwater Drainage Culvert Widening</span>
                <span className="text-brand-600 font-bold">72% Executed</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-600 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-content-secondary pt-1">
                <span>Sanctioned: ₹ 45.00 Lakhs</span>
                <span>Contractor: Shree Infra Ltd.</span>
              </div>
            </div>

            <div className="p-4 bg-surface-bg rounded-2xl border border-surface-border space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-content-main">Community Jogging Track & Solar Poles</span>
                <span className="text-status-success font-bold">100% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-status-success rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-content-secondary pt-1">
                <span>Sanctioned: ₹ 22.50 Lakhs</span>
                <span>Contractor: Green Civic Tech</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Ward Grievances Feed */}
        <div className="bg-white rounded-3xl border border-surface-border p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-content-main">
              Live Ward Grievance Feed (Read-Only Monitoring)
            </h2>
            <span className="text-xs text-content-muted">
              Showing active issues in Ward 14
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-content-main">
              <thead className="bg-surface-bg text-content-secondary uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">ID</th>
                  <th className="py-3 px-4">Title & Locality</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Department / Staff</th>
                  <th className="py-3 px-4 rounded-r-xl">SLA Left</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                <tr className="hover:bg-brand-50/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-600">JS-2026-00125</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-content-main">Severe Streetlight Outage</p>
                    <p className="text-[11px] text-content-muted">Mayur Colony 5th Cross</p>
                  </td>
                  <td className="py-3.5 px-4">Streetlights</td>
                  <td className="py-3.5 px-4"><PriorityBadge priority="P1_HIGHEST" /></td>
                  <td className="py-3.5 px-4"><StatusBadge status="WORK_COMPLETED_AWAITING_VERIFICATION" /></td>
                  <td className="py-3.5 px-4 font-medium">Ramesh Sonawane</td>
                  <td className="py-3.5 px-4 font-mono text-status-success font-bold">4h</td>
                </tr>
                <tr className="hover:bg-brand-50/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-600">JS-2026-00204</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-content-main">Deep Pothole Causing Skidding</p>
                    <p className="text-[11px] text-content-muted">Paud Phata Chowk</p>
                  </td>
                  <td className="py-3.5 px-4">Roads & Potholes</td>
                  <td className="py-3.5 px-4"><PriorityBadge priority="P2_HIGH" /></td>
                  <td className="py-3.5 px-4"><StatusBadge status="WORK_IN_PROGRESS" /></td>
                  <td className="py-3.5 px-4 font-medium">Sunil Patil (Roads)</td>
                  <td className="py-3.5 px-4 font-mono text-content-main font-bold">36h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
