import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Building2, IndianRupee, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

const sampleProjects = [
  {
    id: 1,
    code: 'PMC-DEV-2026-08',
    title: 'Ward 14 Smart Stormwater Drainage & Culvert Widening',
    category: 'Drainage & Flood Mitigation',
    ward: 'Ward 14 (Kothrud North)',
    approvedBudget: 4500000,
    expenditure: 3150000,
    progress: 72,
    contractor: 'Shree Infra Projects Ltd.',
    completionDate: '30 May 2026',
    status: 'IN_PROGRESS',
  },
  {
    id: 2,
    code: 'PMC-DEV-2026-15',
    title: 'High-Efficiency LED Street Lighting Retrofit (140 Poles)',
    category: 'Electrical & Energy Saving',
    ward: 'Ward 18 (Bavdhan - Pashan)',
    approvedBudget: 1850000,
    expenditure: 1850000,
    progress: 100,
    contractor: 'Urja Green Solutions',
    completionDate: '15 Jan 2026',
    status: 'COMPLETED',
  },
  {
    id: 3,
    code: 'PMC-DEV-2026-21',
    title: 'Model Public Park Development & Rainwater Harvesting Pit',
    category: 'Public Parks & Ecology',
    ward: 'Ward 22 (Aundh Central)',
    approvedBudget: 3200000,
    expenditure: 1280000,
    progress: 40,
    contractor: 'Apex Civic Civil Works',
    completionDate: '15 Aug 2026',
    status: 'IN_PROGRESS',
  },
];

export default function LatestProjects() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-full">
              Financial & Physical Progress
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-3">
              {t('projects_title')}
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              {t('projects_subtitle')}
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all 48 projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {proj.code}
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                      proj.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}
                  >
                    {proj.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white line-clamp-2 mb-2">
                  {proj.title}
                </h3>
                <p className="text-xs text-blue-400 mb-4">{proj.ward}</p>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex justify-between text-xs text-slate-300 font-medium">
                    <span>Physical Execution</span>
                    <span className="font-bold text-white">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        proj.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${proj.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Sanctioned Budget</span>
                    <span className="font-bold text-white flex items-center">
                      <IndianRupee className="w-3 h-3 text-slate-400" />
                      {(proj.approvedBudget / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Recorded Spent</span>
                    <span className="font-bold text-emerald-400 flex items-center">
                      <IndianRupee className="w-3 h-3 text-slate-400" />
                      {(proj.expenditure / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Target: {proj.completionDate}
                </span>
                <Link
                  to={`/projects?id=${proj.id}`}
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  Audit Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
