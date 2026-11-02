import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Layers, Filter, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

const mockPins = [
  { id: 1, title: 'Open Live Wire Hazard', category: 'Electrical', priority: 'P0_CRITICAL', lat: 55, lng: 35, status: 'WORK_IN_PROGRESS', ward: 'Ward 14' },
  { id: 2, title: 'Major Waterline Burst', category: 'Water Supply', priority: 'P1_HIGHEST', lat: 40, lng: 60, status: 'ASSIGNED', ward: 'Ward 18' },
  { id: 3, title: 'Deep Pothole at Main Chowk', category: 'Roads', priority: 'P2_HIGH', lat: 70, lng: 50, status: 'WORK_COMPLETED_AWAITING_VERIFICATION', ward: 'Ward 14' },
  { id: 4, title: 'Garbage Dump Overflow', category: 'Solid Waste', priority: 'P3_MEDIUM', lat: 30, lng: 25, status: 'RESOLVED', ward: 'Ward 22' },
  { id: 5, title: 'Drainage Backflow', category: 'Drainage', priority: 'P2_HIGH', lat: 60, lng: 75, status: 'UNDER_REVIEW', ward: 'Ward 12' },
];

export default function AreaMapPreview() {
  const { t } = useLanguage();
  const [selectedPin, setSelectedPin] = useState(mockPins[0]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredPins = activeFilter === 'ALL' 
    ? mockPins 
    : mockPins.filter(p => p.priority.startsWith(activeFilter));

  return (
    <section className="py-16 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-full">
              Geographic Intelligence
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-3">
              {t('map_title')}
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              {t('map_subtitle')}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {['ALL', 'P0', 'P1', 'P2'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeFilter === f
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {f === 'ALL' ? 'All Issues' : `${f} Priority`}
              </button>
            ))}
          </div>
        </div>

        {/* Simulated GIS Interface Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-3">
          {/* Map Canvas / Simulated GIS Layer */}
          <div className="lg:col-span-2 relative h-[380px] bg-slate-900 overflow-hidden flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-slate-800">
            {/* GIS Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px), radial-gradient(#1e3a8a 1px, #0f172a 1px)',
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 20px 20px'
            }}></div>

            {/* Simulated Road Contours */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-800/80 fill-none stroke-[2] pointer-events-none">
              <path d="M 0 100 Q 250 80 400 220 T 800 200" />
              <path d="M 150 0 Q 220 180 350 400" />
              <path d="M 500 0 Q 480 200 650 400" />
              <circle cx="350" cy="220" r="140" strokeDasharray="4 4" className="stroke-blue-500/20" />
            </svg>

            {/* Geospatial Pins */}
            {filteredPins.map((pin) => {
              const isSelected = selectedPin.id === pin.id;
              const isP0 = pin.priority === 'P0_CRITICAL';
              return (
                <button
                  key={pin.id}
                  onClick={() => setSelectedPin(pin)}
                  style={{ top: `${pin.lat}%`, left: `${pin.lng}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-all ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  } ${
                    isP0
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/50 animate-bounce'
                      : pin.priority === 'P1_HIGHEST'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-blue-600 text-white shadow-md'
                  }`}
                  title={pin.title}
                >
                  <MapPin className="w-4 h-4" />
                </button>
              );
            })}

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 text-[11px] text-slate-300 backdrop-blur-md flex items-center gap-3">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> P0 Safety Hazard
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> P1 Infrastructure
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> P2 Routine
              </span>
            </div>
          </div>

          {/* Selected Pin Details Inspector */}
          <div className="p-6 flex flex-col justify-between bg-slate-950">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {selectedPin.ward}
                </span>
                <span className="text-emerald-400 font-semibold text-[11px]">
                  Real-Time Verified
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                {selectedPin.title}
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Category: <strong className="text-slate-200">{selectedPin.category}</strong>
              </p>

              <div className="space-y-3 bg-slate-900/90 rounded-xl p-4 border border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Priority:</span>
                  <span className={`font-bold ${selectedPin.priority === 'P0_CRITICAL' ? 'text-red-400' : 'text-blue-400'}`}>
                    {selectedPin.priority.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Workflow Status:</span>
                  <span className="text-amber-400 font-semibold">
                    {selectedPin.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Dept:</span>
                  <span className="text-slate-200">Electrical & Safety Wing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SLA Remaining:</span>
                  <span className="text-white font-mono font-bold">1h 42m</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => alert(`Tracking issue #${selectedPin.id}`)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors shadow"
              >
                Inspect Public Evidence & Timeline
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
