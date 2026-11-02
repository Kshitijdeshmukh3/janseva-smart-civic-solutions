import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  AlertCircle, 
  Search, 
  MapPin, 
  Camera, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Flame,
  Award,
  ShieldCheck,
  Building2,
  FileCheck2
} from 'lucide-react';

export default function HeroSection({ onOpenAIChat }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/track?id=${encodeURIComponent(trackingId.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden light-grid-pattern pt-16 pb-20 border-b border-surface-border">
      {/* Decorative subtle violet glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-1.5 text-xs font-bold text-brand-600 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span>AI-Powered Smart Municipal Governance 2.0</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-content-main tracking-tight leading-tight">
            Smart Civic Solutions for Modern Governance
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-content-secondary leading-relaxed font-normal">
            Empowering citizens to report civic issues with instant AI photo verification, track real-time resolution SLAs, and inspect public ward development budgets.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/report')}
              className="flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-brand-600/25 hover:shadow-xl hover:scale-102 transition-all text-sm sm:text-base"
            >
              <Camera className="w-5 h-5 text-brand-100" />
              <span>Report Civic Grievance</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenAIChat}
              className="flex items-center gap-2 bg-white hover:bg-brand-50 text-brand-600 border border-brand-200 hover:border-brand-400 font-bold px-6 py-3.5 rounded-2xl shadow-xs transition-all text-sm sm:text-base"
            >
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>AI Complaint Assistant</span>
            </button>
          </div>

          {/* Quick Tracking Search Bar */}
          <div className="pt-6 max-w-xl mx-auto">
            <form onSubmit={handleTrackSubmit} className="relative flex items-center shadow-card hover:shadow-card-hover transition rounded-2xl overflow-hidden border border-surface-border bg-white">
              <Search className="w-5 h-5 text-content-muted ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Enter Complaint Token (e.g. JS-2026-00125)..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full py-4 px-3 bg-transparent text-content-main placeholder-content-muted text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-5 py-3 mr-1.5 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                Track Now
              </button>
            </form>
            <p className="text-[11px] text-content-secondary mt-2.5 text-center">
              Sample live tickets: <span className="font-mono text-brand-600 font-semibold cursor-pointer hover:underline" onClick={() => setTrackingId('JS-2026-00125')}>JS-2026-00125</span> or <span className="font-mono text-brand-600 font-semibold cursor-pointer hover:underline" onClick={() => setTrackingId('JS-2026-00204')}>JS-2026-00204</span>
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          <div className="bg-white border border-surface-border shadow-card rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-content-muted font-medium">Precision GIS</p>
              <p className="text-sm font-bold text-content-main">Geotagged Issues</p>
            </div>
          </div>

          <div className="bg-white border border-surface-border shadow-card rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-status-dangerBg text-status-danger">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-content-muted font-medium">Automated Triage</p>
              <p className="text-sm font-bold text-content-main">P0–P4 SLA Engine</p>
            </div>
          </div>

          <div className="bg-white border border-surface-border shadow-card rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-status-successBg text-status-success">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-content-muted font-medium">AI Verification</p>
              <p className="text-sm font-bold text-content-main">Photo & Duplicate Hash</p>
            </div>
          </div>

          <div className="bg-white border border-surface-border shadow-card rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-status-warningBg text-status-warning">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-content-muted font-medium">Civic Rewards</p>
              <p className="text-sm font-bold text-content-main">Points & Tax Rebates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
