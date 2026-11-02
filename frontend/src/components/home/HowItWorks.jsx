import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Camera, Cpu, Wrench, Award, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      icon: Camera,
      title: t('step1_title'),
      desc: t('step1_desc'),
      badge: 'Multilingual Voice/Photo',
      color: 'from-blue-600 to-sky-500',
    },
    {
      step: '02',
      icon: Cpu,
      title: t('step2_title'),
      desc: t('step2_desc'),
      badge: 'Automated Routing',
      color: 'from-sky-500 to-indigo-600',
    },
    {
      step: '03',
      icon: Wrench,
      title: t('step3_title'),
      desc: t('step3_desc'),
      badge: 'Geo-tracked Proof',
      color: 'from-indigo-600 to-purple-600',
    },
    {
      step: '04',
      icon: Award,
      title: t('step4_title'),
      desc: t('step4_desc'),
      badge: 'Civic Rewards',
      color: 'from-purple-600 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-full">
            Transparent Municipal Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            {t('how_it_works_title')}
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            {t('how_it_works_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-700 group-hover:text-blue-400 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>SLA Accountability</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
