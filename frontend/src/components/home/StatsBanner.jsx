import React from 'react';
import { FileCheck, Activity, CheckCircle, Clock, Users, Building, ShieldCheck } from 'lucide-react';

export default function StatsBanner({ stats }) {
  const data = stats || {
    totalComplaints: 14820,
    resolvedComplaints: 13410,
    resolutionRate: '90.5%',
    activeProjects: 48,
    participatingCitizens: 38200,
    avgResolutionHours: 24,
  };

  return (
    <section className="bg-white border-b border-surface-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Stat 1 */}
          <div className="bg-surface-bg p-5 rounded-2xl border border-surface-border flex items-center gap-4 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-content-main">
                {data.totalComplaints.toLocaleString()}
              </p>
              <p className="text-xs text-content-secondary font-medium">
                Complaints Handled
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-surface-bg p-5 rounded-2xl border border-surface-border flex items-center gap-4 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-status-successBg text-status-success flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-status-success">
                {data.resolvedComplaints.toLocaleString()}
              </p>
              <p className="text-xs text-content-secondary font-medium">
                Resolved & Verified
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-surface-bg p-5 rounded-2xl border border-surface-border flex items-center gap-4 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-content-main">
                {data.resolutionRate}
              </p>
              <p className="text-xs text-content-secondary font-medium">
                SLA Compliance Rate
              </p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-surface-bg p-5 rounded-2xl border border-surface-border flex items-center gap-4 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-content-main">
                {data.avgResolutionHours}h
              </p>
              <p className="text-xs text-content-secondary font-medium">
                Avg Resolution Time
              </p>
            </div>
          </div>

          {/* Stat 5 */}
          <div className="bg-surface-bg p-5 rounded-2xl border border-surface-border flex items-center gap-4 shadow-card hover:shadow-card-hover transition-all col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-content-main">
                {data.participatingCitizens.toLocaleString()}
              </p>
              <p className="text-xs text-content-secondary font-medium">
                Active Citizens
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
