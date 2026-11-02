import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Megaphone, AlertCircle, Droplets, Calendar, ShieldAlert } from 'lucide-react';

const announcements = [
  {
    id: 1,
    type: 'WATER_SHUTDOWN',
    badge: 'Urgent Notice',
    title: 'Scheduled Water Supply Interruption for Pipeline Maintenance',
    content: 'Water supply will be suspended on Thursday (06:00 to 22:00) across Ward 12, 14, and 16 due to major interconnection work at Parvati Water Works.',
    date: '03 Nov 2026',
    icon: Droplets,
    color: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
  },
  {
    id: 2,
    type: 'CIVIC_DRIVE',
    badge: 'Community Event',
    title: 'Ward Swachhata & Plastic-Free Drive this Saturday',
    content: 'Participate in the citizen-led cleanliness drive starting from Kothrud D-Mart chowk. Earn 50 Civic Reward points and a verified digital green certificate.',
    date: '07 Nov 2026',
    icon: Megaphone,
    color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
  },
  {
    id: 3,
    type: 'WARD_SABHA',
    badge: 'Elected Rep Hearing',
    title: 'Public Ward Hearing with Nagar Sevak on Road Infrastructure',
    content: 'Open citizen consultation regarding upcoming flyover works and footpath restoration. Direct grievance registration counters will be present.',
    date: '10 Nov 2026',
    icon: Calendar,
    color: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
  },
];

export default function PublicAnnouncements() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t('announcements_title')}
            </h2>
            <p className="text-xs text-slate-400">
              {t('announcements_subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`border rounded-2xl p-5 ${item.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.content}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Pune Municipal Corporation</span>
                  <span className="text-blue-400 font-medium">Read Circular →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
