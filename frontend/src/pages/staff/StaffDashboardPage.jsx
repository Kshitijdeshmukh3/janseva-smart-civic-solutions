import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import AIPhotoVerificationReport from '../../components/ai/AIPhotoVerificationReport';
import { 
  Wrench, 
  Clock, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Upload,
  ArrowRight,
  Play,
  CheckSquare,
  Sparkles,
  X
} from 'lucide-react';

export default function StaffDashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([
    {
      id: 'JS-2026-00204',
      title: 'Deep Pothole Causing Skidding near Paud Phata',
      category: 'Roads & Potholes',
      priority: 'P2_HIGH',
      ward: 'Ward 14 (Kothrud North)',
      locality: 'Paud Phata Chowk',
      status: 'WORK_IN_PROGRESS',
      slaRemaining: '36h',
      deadline: '04 Nov 2026, 08:30 AM',
      before_photo: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'JS-2026-00319',
      title: 'Broken Chamber Cover on Footpath',
      category: 'Drainage',
      priority: 'P1_HIGHEST',
      ward: 'Ward 14 (Kothrud North)',
      locality: 'Vanaz Corner, Near Metro Pillar 12',
      status: 'ASSIGNED',
      slaRemaining: '18h',
      deadline: '03 Nov 2026, 06:00 PM',
      before_photo: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=400&q=80'
    }
  ]);

  const [activeTaskModal, setActiveTaskModal] = useState(null);
  const [completionNote, setCompletionNote] = useState('');
  const [isAnalyzingCompletion, setIsAnalyzingCompletion] = useState(false);
  const [completionAIReport, setCompletionAIReport] = useState(null);

  const handleStartWork = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'WORK_IN_PROGRESS' } : t));
    alert(`Task ${taskId} status changed to WORK IN PROGRESS.`);
  };

  const handleSimulateAfterPhotoUpload = () => {
    setIsAnalyzingCompletion(true);
    setCompletionAIReport(null);

    setTimeout(() => {
      setIsAnalyzingCompletion(false);
      setCompletionAIReport({
        image_quality: 'GOOD',
        problem_detected: 'YES',
        detected_category: 'Road Damage & Potholes',
        severity: 'LOW',
        confidence_score: 93.0,
        duplicate_probability: 0.0,
        location_verification_status: 'VERIFIED',
        ai_description: 'AI Vision verified completion photograph: Asphalt compaction complete, road surface leveled, work matches reported geographic coordinates.',
        recommendation: 'AI_VERIFIED'
      });
    }, 700);
  };

  const handleMarkCompleted = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'WORK_COMPLETED_AWAITING_VERIFICATION' };
      }
      return t;
    }));
    setActiveTaskModal(null);
    setCompletionAIReport(null);
    alert(`Task ${taskId} submitted! Status is now WORK COMPLETED – AWAITING CITIZEN VERIFICATION.`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-border gap-4 bg-white p-6 rounded-3xl shadow-card">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase">
                Field Staff Mode
              </span>
              <span className="text-xs text-content-secondary">
                Roads & Electrical Maintenance Wing • {user?.name || 'Ramesh Sonawane'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              Field Technician Task Queue
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-surface-bg px-4 py-2 rounded-2xl border border-surface-border text-xs text-content-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse"></span>
            <span>GPS Attendance Active: <strong className="text-content-main">On-Duty (Ward 14)</strong></span>
          </div>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-surface-border hover:border-brand-500 rounded-3xl p-6 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded">{task.id}</span>
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={task.priority} />
                    <StatusBadge status={task.status} />
                  </div>
                </div>

                <h3 className="text-base font-bold text-content-main mb-2 leading-snug">
                  {task.title}
                </h3>
                <p className="text-xs text-content-muted flex items-center gap-1 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-brand-600" />
                  {task.locality} • {task.ward}
                </p>

                <div className="p-3.5 bg-surface-bg rounded-2xl border border-surface-border text-xs space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span className="text-content-muted">SLA Countdown:</span>
                    <span className="font-bold text-content-main font-mono">{task.slaRemaining} remaining</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-content-muted">Statutory Deadline:</span>
                    <span className="text-content-secondary font-mono">{task.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Accept / Start Work / Complete */}
              <div className="pt-4 border-t border-surface-border flex flex-wrap items-center gap-2">
                {task.status === 'ASSIGNED' ? (
                  <button
                    onClick={() => handleStartWork(task.id)}
                    className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Start Work On-Site
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTaskModal(task)}
                    className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Upload After-Photo & Complete Task
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Completion Evidence Modal */}
        {activeTaskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white border border-surface-border rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-modal max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <h3 className="text-base font-bold text-content-main">
                  Submit Work Completion Evidence
                </h3>
                <button
                  onClick={() => {
                    setActiveTaskModal(null);
                    setCompletionAIReport(null);
                  }}
                  className="text-content-muted hover:text-content-main p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-content-secondary">
                Task ID: <strong className="text-brand-600 font-mono">{activeTaskModal.id}</strong> — {activeTaskModal.title}
              </p>

              <div>
                <label className="block text-xs font-semibold text-content-main mb-2">
                  After-Repair Proof Photograph *
                </label>
                <div 
                  onClick={handleSimulateAfterPhotoUpload}
                  className="border-2 border-dashed border-surface-border hover:border-brand-600 rounded-2xl p-6 text-center bg-surface-bg cursor-pointer transition-colors"
                >
                  <Camera className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                  <p className="text-xs text-content-main font-bold">Click to capture completion photo</p>
                  <p className="text-[11px] text-content-muted mt-1">Geo-stamp and structural change will be verified by AI</p>
                </div>

                <div className="mt-3">
                  <AIPhotoVerificationReport report={completionAIReport} isAnalyzing={isAnalyzingCompletion} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-main mb-2">
                  Field Technician Completion Remarks
                </label>
                <textarea
                  rows={3}
                  value={completionNote}
                  onChange={(e) => setCompletionNote(e.target.value)}
                  placeholder="e.g. Repaired road cavity with hot asphalt mix. Roller passed 4 times. Surface restored."
                  className="w-full bg-surface-bg border border-surface-border rounded-xl p-3 text-xs text-content-main focus:outline-none focus:ring-2 focus:ring-brand-600 transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleMarkCompleted(activeTaskModal.id)}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition"
                >
                  Submit for Citizen Verification
                </button>
                <button
                  onClick={() => {
                    setActiveTaskModal(null);
                    setCompletionAIReport(null);
                  }}
                  className="bg-surface-bg hover:bg-slate-200 text-content-secondary font-medium text-xs px-4 py-3 rounded-xl border border-surface-border"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
