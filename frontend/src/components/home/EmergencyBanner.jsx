import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <div className="bg-red-950/80 border-y border-red-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-red-200 text-center sm:text-left">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>
            <strong>Immediate Public Hazard?</strong> For exposed live electrical wires, active floods, or structural collapses, call Municipal Disaster Cell immediately.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:18002484276"
            className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1 rounded-lg transition-colors shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            1800-CIVIC-SOS
          </a>
          <span className="text-red-300">National Emergency: <strong>112</strong></span>
        </div>
      </div>
    </div>
  );
}
