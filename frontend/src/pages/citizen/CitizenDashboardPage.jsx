import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import SmartAIAssistantModal from '../../components/ai/SmartAIAssistantModal';
import { 
  PlusCircle, 
  Award, 
  Clock, 
  CheckCircle, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  MapPin,
  Bot,
  Zap,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  FileCheck2,
  Layers
} from 'lucide-react';

export default function CitizenDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const handleApplyAISuggestions = (suggestions) => {
    navigate(`/report?title=${encodeURIComponent(suggestions.title)}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome & Quick Action Hero */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 text-white rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-900 bg-white/90 px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Ward Resident Portal
                </span>
                <span className="text-xs text-brand-100 font-medium">
                  {user?.ward || 'Ward 14 (Kothrud North)'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {user?.name || 'Aarav Sharma'}
              </h1>
              <p className="text-xs text-brand-100 max-w-xl leading-relaxed">
                Empower your neighborhood. File verified civic issues, track departmental SLA progress, inspect ward projects, and earn municipal tax rebate points.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setAiAssistantOpen(true)}
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all backdrop-blur-md"
              >
                <Bot className="w-4 h-4 text-brand-200" />
                Ask Janseva AI
              </button>

              <Link
                to="/report"
                className="flex items-center gap-2 bg-white hover:bg-brand-50 text-brand-700 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md shadow-black/10 hover:scale-102 transition-all"
              >
                <PlusCircle className="w-5 h-5 text-brand-600" />
                Report Civic Grievance
              </Link>
            </div>
          </div>
        </div>

        {/* 5 Core Status KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-card">
            <span className="text-[11px] text-content-muted block mb-1 font-semibold">Total Submitted</span>
            <span className="text-2xl font-black text-content-main">4</span>
            <span className="text-[10px] text-content-muted block mt-1">Lifetime reports</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-card">
            <span className="text-[11px] text-brand-600 font-semibold block mb-1">In Progress</span>
            <span className="text-2xl font-black text-brand-600">1</span>
            <span className="text-[10px] text-content-muted block mt-1">Road Pothole (SLA: 36h)</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-card">
            <span className="text-[11px] text-teal-600 font-semibold block mb-1">Awaiting Review</span>
            <span className="text-2xl font-black text-teal-600">1</span>
            <span className="text-[10px] text-content-muted block mt-1">Streetlight repair</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-card">
            <span className="text-[11px] text-status-success font-semibold block mb-1">Resolved & Closed</span>
            <span className="text-2xl font-black text-status-success">2</span>
            <span className="text-[10px] text-content-muted block mt-1">Verified on-site</span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-2xl border border-surface-border shadow-card">
            <span className="text-[11px] text-status-warning font-semibold block mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Civic Rewards
            </span>
            <span className="text-2xl font-black text-status-warning">110 pts</span>
            <span className="text-[10px] text-content-muted block mt-1">Bronze Guardian Tier</span>
          </div>
        </div>

        {/* Active Grievances & Real-Time Tracking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-content-main flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                My Active Grievances & SLA Timelines
              </h2>
              <Link to="/report" className="text-xs text-brand-600 hover:underline font-bold">
                + Report New Issue
              </Link>
            </div>

            {/* Complaint Item 1 (Awaiting Verification) */}
            <div className="bg-white border border-teal-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">JS-2026-00125</span>
                    <StatusBadge status="WORK_COMPLETED_AWAITING_VERIFICATION" />
                    <PriorityBadge priority="P1_HIGHEST" />
                  </div>
                  <h3 className="text-base font-bold text-content-main">
                    Severe Streetlight Outage at Mayur Colony 5th Cross
                  </h3>
                  <p className="text-xs text-content-muted mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-600" />
                    Mayur Colony, Opp. Joggers Park • Ward 14
                  </p>
                </div>

                <Link
                  to="/track?id=JS-2026-00125"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm shrink-0 text-center"
                >
                  Inspect Photos & Verify (+20 pts)
                </Link>
              </div>

              <div className="p-3 bg-surface-bg rounded-2xl border border-surface-border text-xs text-content-secondary flex items-center justify-between">
                <span>Field Engineer: <strong className="text-content-main">Ramesh Sonawane</strong></span>
                <span className="text-status-success font-bold flex items-center gap-1">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  Before & After Photos Uploaded
                </span>
              </div>
            </div>

            {/* Complaint Item 2 (In Progress) */}
            <div className="bg-white border border-surface-border rounded-3xl p-5 sm:p-6 space-y-4 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">JS-2026-00204</span>
                    <StatusBadge status="WORK_IN_PROGRESS" />
                    <PriorityBadge priority="P2_HIGH" />
                  </div>
                  <h3 className="text-base font-bold text-content-main">
                    Deep Pothole Causing Skidding near Paud Phata
                  </h3>
                  <p className="text-xs text-content-muted mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-600" />
                    Paud Phata Chowk • Ward 14
                  </p>
                </div>

                <Link
                  to="/track?id=JS-2026-00204"
                  className="bg-surface-bg hover:bg-brand-50 text-brand-600 font-bold text-xs px-4 py-2.5 rounded-xl border border-surface-border transition shrink-0 text-center"
                >
                  Track Live Progress
                </Link>
              </div>

              <div className="p-3 bg-surface-bg rounded-2xl border border-surface-border text-xs text-content-secondary flex items-center justify-between">
                <span>Department: <strong className="text-content-main">Road Infrastructure Dept</strong></span>
                <span className="font-mono text-brand-600 font-bold">36h SLA Remaining</span>
              </div>
            </div>
          </div>

          {/* Right Column: Rewards & DPDP Privacy Capsule */}
          <div className="space-y-6">
            {/* Civic Rewards Box */}
            <div className="bg-white border border-surface-border rounded-3xl p-6 space-y-4 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-content-main flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-status-warning" />
                  Civic Engagement Rewards
                </span>
                <span className="text-xs font-mono font-black text-status-warning bg-amber-50 px-2.5 py-1 rounded-lg">
                  110 Points
                </span>
              </div>

              <div className="p-3.5 bg-surface-bg rounded-2xl border border-surface-border text-xs space-y-2">
                <div className="flex justify-between text-content-muted text-[11px] font-semibold">
                  <span>Next Tier: Silver Champion</span>
                  <span>110 / 200 pts</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-status-warning rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-bg border border-surface-border">
                  <span className="text-content-secondary">Verified Photo Upload</span>
                  <span className="text-status-success font-bold font-mono">+5 pts</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-bg border border-surface-border">
                  <span className="text-content-secondary">Completion Verification</span>
                  <span className="text-status-success font-bold font-mono">+20 pts</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-bg border border-surface-border">
                  <span className="text-content-secondary">Welcome Onboarding Bonus</span>
                  <span className="text-status-success font-bold font-mono">+50 pts</span>
                </div>
              </div>
            </div>

            {/* DPDPA 2023 Privacy Quick Card */}
            <div className="bg-white border border-surface-border rounded-3xl p-6 space-y-3 shadow-card">
              <div className="flex items-center gap-2 text-xs font-bold text-content-main">
                <ShieldCheck className="w-4 h-4 text-status-success" />
                DPDP Act 2023 Privacy Controls
              </div>
              <p className="text-xs text-content-secondary leading-relaxed">
                You have active control over your personal data. Your mobile number and residential details are shielded from public view.
              </p>
              <Link
                to="/privacy"
                className="inline-flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 font-bold"
              >
                Review Consents & Data Requests →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Smart AI Assistant Modal */}
      <SmartAIAssistantModal 
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onApplySuggestions={handleApplyAISuggestions}
      />
    </DashboardLayout>
  );
}
