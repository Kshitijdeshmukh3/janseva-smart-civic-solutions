import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import BeforeAfterComparisonSlider from '../../components/ai/BeforeAfterComparisonSlider';
import { 
  Search, 
  Clock, 
  MapPin, 
  User, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  ShieldCheck,
  ThumbsUp,
  RotateCcw,
  Sparkles
} from 'lucide-react';

const mockComplaints = {
  'JS-2026-00125': {
    id: 'JS-2026-00125',
    title: 'Severe Streetlight Outage at Mayur Colony 5th Cross',
    category: 'Streetlights & Electrical',
    priority: 'P1_HIGHEST',
    status: 'WORK_COMPLETED_AWAITING_VERIFICATION',
    ward: 'Ward 14 (Kothrud North)',
    locality: 'Mayur Colony, Opp. Joggers Park',
    reportedAt: '01 Nov 2026, 10:15 AM',
    slaTargetHours: 24,
    slaRemainingHours: 4,
    isOverdue: false,
    assignedStaff: 'Ramesh Sonawane (Junior Electrical Engineer)',
    department: 'Electrical Maintenance Division',
    description: 'Entire street pole 14/B is dark since yesterday. Live sparking noticed earlier.',
    beforePhoto: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
    aiResolutionMatch: 92.5,
    timeline: [
      { status: 'SUBMITTED', date: '01 Nov, 10:15 AM', note: 'Complaint logged via Web Portal.' },
      { status: 'VERIFIED', date: '01 Nov, 11:00 AM', note: 'AI Vision & Ward Officer triaged as P1 Highest priority.' },
      { status: 'ASSIGNED', date: '01 Nov, 11:30 AM', note: 'Assigned to Electrical Engineer Ramesh Sonawane.' },
      { status: 'WORK_IN_PROGRESS', date: '01 Nov, 03:00 PM', note: 'Field technician deployed on site.' },
      { status: 'WORK_COMPLETED_AWAITING_VERIFICATION', date: '02 Nov, 09:30 AM', note: 'New LED fitting installed and verified operational. Awaiting citizen confirmation.' },
    ]
  },
  'JS-2026-00204': {
    id: 'JS-2026-00204',
    title: 'Deep Pothole Causing Skidding near Paud Phata',
    category: 'Roads & Potholes',
    priority: 'P2_HIGH',
    status: 'WORK_IN_PROGRESS',
    ward: 'Ward 14 (Kothrud North)',
    locality: 'Paud Phata Chowk',
    reportedAt: '02 Nov 2026, 08:30 AM',
    slaTargetHours: 48,
    slaRemainingHours: 36,
    isOverdue: false,
    assignedStaff: 'Sunil Patil (Road Maintenance Section)',
    department: 'Road Infrastructure Dept',
    description: 'Dangerous pothole approx 2 feet wide right after flyover descent.',
    beforePhoto: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    afterPhoto: null,
    aiResolutionMatch: 0,
    timeline: [
      { status: 'SUBMITTED', date: '02 Nov, 08:30 AM', note: 'Complaint submitted with GPS coordinates.' },
      { status: 'VERIFIED', date: '02 Nov, 09:15 AM', note: 'Verified by Ward 14 Road Inspector.' },
      { status: 'WORK_IN_PROGRESS', date: '02 Nov, 01:00 PM', note: 'Asphalt batching and road roller scheduled.' }
    ]
  }
};

export default function TrackComplaintPage() {
  const [searchParams] = useSearchParams();
  const [searchId, setSearchId] = useState(searchParams.get('id') || 'JS-2026-00125');
  const [complaint, setComplaint] = useState(mockComplaints['JS-2026-00125']);
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && mockComplaints[id]) {
      setSearchId(id);
      setComplaint(mockComplaints[id]);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = mockComplaints[searchId.trim()];
    if (found) {
      setComplaint(found);
      setActionMessage(null);
    } else {
      alert(`No complaint record found for ID: ${searchId}`);
    }
  };

  const handleCitizenConfirm = () => {
    setComplaint(prev => ({
      ...prev,
      status: 'RESOLVED',
      timeline: [
        ...prev.timeline,
        { status: 'RESOLVED', date: 'Just now', note: 'Work verified and approved by citizen. +20 Civic Reward Points awarded!' }
      ]
    }));
    setActionMessage('Thank you! You have confirmed satisfactory completion. +20 Reward Points have been credited.');
  };

  const handleCitizenDispute = () => {
    setComplaint(prev => ({
      ...prev,
      status: 'REOPENED',
      timeline: [
        ...prev.timeline,
        { status: 'REOPENED', date: 'Just now', note: 'Citizen disputed resolution quality. Escalated to Ward Head for review.' }
      ]
    }));
    setActionMessage('Complaint has been marked as Disputed and escalated to the Senior Executive Engineer.');
  };

  return (
    <div className="min-h-screen bg-surface-bg text-content-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Search Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200 text-brand-600 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            AI Computer Vision & SLA Audit Trail
          </div>
          <h1 className="text-3xl font-extrabold text-content-main tracking-tight">
            Track Civic Grievance
          </h1>
          <p className="mt-2 text-sm text-content-secondary">
            Real-time municipal SLA tracker, staff assignments, and interactive before/after photo comparison.
          </p>

          <form onSubmit={handleSearch} className="mt-6 flex items-center shadow-card hover:shadow-card-hover transition rounded-2xl overflow-hidden border border-surface-border bg-white">
            <Search className="w-5 h-5 text-content-muted ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Enter Complaint Token (e.g. JS-2026-00125)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full py-3.5 px-3 bg-transparent text-content-main placeholder-content-muted text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-5 py-3.5 transition-colors shrink-0 shadow-xs"
            >
              Search Status
            </button>
          </form>
        </div>

        {complaint && (
          <div className="bg-white border border-surface-border rounded-3xl p-6 sm:p-8 space-y-8 shadow-card">
            
            {/* Top Details Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-border gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-base font-extrabold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded">
                    {complaint.id}
                  </span>
                  <StatusBadge status={complaint.status} />
                  <PriorityBadge priority={complaint.priority} />
                </div>
                <h2 className="text-xl font-bold text-content-main leading-snug">
                  {complaint.title}
                </h2>
                <p className="text-xs text-content-muted mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-600" />
                  {complaint.locality} • {complaint.ward}
                </p>
              </div>

              {/* SLA Clock Box */}
              <div className="bg-surface-bg border border-surface-border rounded-2xl p-4 shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-content-muted uppercase tracking-wider block font-semibold">
                    SLA Clock Remaining
                  </span>
                  <span className="text-lg font-black text-content-main font-mono">
                    {complaint.slaRemainingHours} Hours
                  </span>
                  <span className="text-[10px] text-content-secondary block">
                    Target: {complaint.slaTargetHours}h SLA
                  </span>
                </div>
              </div>
            </div>

            {actionMessage && (
              <div className="p-4 bg-brand-50 border border-brand-200 text-brand-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                <span>{actionMessage}</span>
              </div>
            )}

            {/* Before and After Image Comparison Slider */}
            {complaint.afterPhoto ? (
              <BeforeAfterComparisonSlider 
                beforeImage={complaint.beforePhoto}
                afterImage={complaint.afterPhoto}
                onConfirmResolution={handleCitizenConfirm}
                onDisputeReopen={handleCitizenDispute}
                userRole="CITIZEN"
              />
            ) : (
              <div className="bg-surface-bg border border-surface-border rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-content-main uppercase tracking-wider flex items-center gap-2">
                  <Camera className="w-4 h-4 text-brand-600" />
                  Initial Reported Evidence Photo
                </h3>
                <div className="h-64 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img src={complaint.beforePhoto} alt="Initial Defect" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-content-secondary">
                  Work is currently in progress. The field technician will upload the after-repair photo upon completion.
                </p>
              </div>
            )}

            {/* Staff & Department Accountability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-bg border border-surface-border text-xs">
              <div>
                <span className="text-content-muted block text-[10px] font-semibold">Responsible Department:</span>
                <span className="font-bold text-content-main">{complaint.department}</span>
              </div>
              <div>
                <span className="text-content-muted block text-[10px] font-semibold">Assigned Officer / Staff:</span>
                <span className="font-bold text-brand-600">{complaint.assignedStaff}</span>
              </div>
            </div>

            {/* Visual SLA Timeline */}
            <div>
              <h3 className="text-sm font-bold text-content-main uppercase tracking-wider mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                Audit Trail & Activity Timeline
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-border">
                {complaint.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-brand-600 ring-4 ring-white"></span>
                    <div className="flex flex-wrap items-center justify-between text-xs mb-1">
                      <span className="font-bold text-content-main">
                        {step.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-content-muted font-mono text-[11px]">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs text-content-secondary">{step.note}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
