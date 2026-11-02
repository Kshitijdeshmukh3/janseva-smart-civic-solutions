import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { 
  Building2, 
  ShieldCheck, 
  Server, 
  Activity, 
  Database, 
  PlusCircle, 
  AlertCircle,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

const tenants = [
  { id: 1, name: 'Pune Municipal Corporation', type: 'MUNICIPAL_CORP', state: 'Maharashtra', wards: 14, citizens: 38200, status: 'ACTIVE' },
  { id: 2, name: 'Brihanmumbai Municipal Corporation', type: 'MUNICIPAL_CORP', state: 'Maharashtra', wards: 24, citizens: 94000, status: 'ACTIVE' },
  { id: 3, name: 'Thane Municipal Corporation', type: 'MUNICIPAL_CORP', state: 'Maharashtra', wards: 10, citizens: 18500, status: 'ACTIVE' },
  { id: 4, name: 'Nagpur Municipal Corporation', type: 'MUNICIPAL_CORP', state: 'Maharashtra', wards: 12, citizens: 22100, status: 'ACTIVE' },
];

export default function SuperAdminDashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-border gap-4 bg-white p-6 rounded-3xl shadow-card">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-brand-600 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full uppercase">
                Platform Multi-Tenant Console
              </span>
              <span className="text-xs text-content-secondary">
                JANSEVA Cloud Infrastructure
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              Super Admin Multi-Tenant Governance
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/ai-control"
              className="flex items-center gap-2 bg-brand-50 text-brand-600 hover:bg-brand-100 font-bold text-xs px-4 py-2.5 rounded-xl border border-brand-200 transition"
            >
              <Cpu className="w-4 h-4 text-brand-600" />
              Global AI Control Center
            </Link>
            <button 
              onClick={() => alert('Opening Tenant Onboarding Wizard...')}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <PlusCircle className="w-4 h-4" />
              Provision New Tenant
            </button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <span className="text-xs text-content-secondary block mb-1 font-semibold">Active Municipal Tenants</span>
            <span className="text-3xl font-black text-content-main">4</span>
            <span className="text-[11px] text-status-success font-semibold block mt-1">100% operational</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <span className="text-xs text-content-secondary block mb-1 font-semibold">Total Platform Citizens</span>
            <span className="text-3xl font-black text-brand-600">172,800</span>
            <span className="text-[11px] text-content-muted block mt-1">Across 60 total wards</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <span className="text-xs text-content-secondary block mb-1 font-semibold">Database Cluster Health</span>
            <span className="text-3xl font-black text-status-success">99.98%</span>
            <span className="text-[11px] text-content-muted block mt-1">Managed MySQL RDS</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <span className="text-xs text-content-secondary block mb-1 font-semibold">Platform Security Incidents</span>
            <span className="text-3xl font-black text-content-main">0</span>
            <span className="text-[11px] text-status-success font-semibold block mt-1">Zero breaches detected</span>
          </div>
        </div>

        {/* Tenants Table */}
        <div className="bg-white rounded-3xl border border-surface-border p-6 shadow-card space-y-4">
          <h2 className="text-base font-bold text-content-main">
            Provisioned Organizations & Civic Tenants
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-content-main">
              <thead className="bg-surface-bg text-content-secondary uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Organization Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Active Wards</th>
                  <th className="py-3 px-4">Registered Citizens</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {tenants.map(t => (
                  <tr key={t.id} className="hover:bg-brand-50/40 transition">
                    <td className="py-3.5 px-4 font-bold text-content-main">{t.name}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">{t.type}</td>
                    <td className="py-3.5 px-4">{t.state}</td>
                    <td className="py-3.5 px-4 font-mono">{t.wards} Wards</td>
                    <td className="py-3.5 px-4 font-mono font-bold">{t.citizens.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-status-successBg text-status-success font-bold px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button className="text-brand-600 hover:text-brand-700 font-bold">
                        Configure Modules →
                      </button>
                    </td>
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
