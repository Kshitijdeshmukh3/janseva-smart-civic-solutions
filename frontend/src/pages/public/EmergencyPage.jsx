import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, LifeBuoy, Flame, Zap, Droplets } from 'lucide-react';

export default function EmergencyPage() {
  const hotlines = [
    { title: 'National Emergency Helpline (All Services)', number: '112', desc: 'Police, Fire, Ambulance integrated single-number SOS.' },
    { title: 'Municipal 24x7 Disaster Cell', number: '1800-CIVIC-SOS', desc: 'Dedicated line for open electrical wires, active floods, tree falls.' },
    { title: 'Electricity Board Hazard Line (MSEDCL / BEST)', number: '1912', desc: 'High tension line sparks, transformer blasts, live pole electrocution hazard.' },
    { title: 'Ambulance & Trauma Medical Emergency', number: '108', desc: 'Government emergency ambulance response.' },
    { title: 'Fire Brigade & Rescue Operations', number: '101', desc: 'Immediate fire, structural collapse, gas leaks.' },
    { title: 'Water Supply Emergency Control Room', number: '020-25501000', desc: 'Major main line bursts, contamination, critical flooding.' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Emergency Contacts & Disaster Directory
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            JANSEVA is designed for municipal grievance management. For active threats to life, property, or fire, contact the official emergency channels immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {hotlines.map((h, i) => (
            <div
              key={i}
              className="bg-slate-850 border border-slate-800 hover:border-red-500/40 rounded-2xl p-5 flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  {h.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  {h.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xl font-extrabold text-red-400">
                  {h.number}
                </span>
                <a
                  href={`tel:${h.number}`}
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Call Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
