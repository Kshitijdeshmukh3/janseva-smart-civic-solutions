import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  ThumbsUp, 
  ThumbsDown,
  RefreshCw,
  BarChart3,
  Layers,
  FileText
} from 'lucide-react';

export default function AIControlCenterPage() {
  const [stats, setStats] = useState({
    total_images_analyzed: 2840,
    ai_verified_percentage: 84.6,
    manual_review_percentage: 11.8,
    rejected_poor_quality_percentage: 3.6,
    average_confidence_score: 89.2,
    duplicate_detection_rate: 6.4,
    ocr_success_rate: 78.5,
    model_version: 'JANSEVA-Vision-v2.4-DPDP',
    service_status: 'OPERATIONAL'
  });

  const [threshold, setThreshold] = useState(80);
  const [duplicateThreshold, setDuplicateThreshold] = useState(12);

  const [reviewQueue, setReviewQueue] = useState([
    {
      id: 101,
      complaint_number: 'JS-2026-00412',
      detected_category: 'Water Supply & Leakage',
      selected_category: 'Road Damage & Potholes',
      confidence_score: 68.5,
      duplicate_probability: 14.0,
      image_quality: 'GOOD',
      ocr_text: 'PMC VALVE 14-NORTH',
      reason: 'Category mismatch: Citizen selected Road Damage but AI detected pipeline water accumulation.',
      sample_img: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 102,
      complaint_number: 'JS-2026-00455',
      detected_category: 'Garbage & Solid Waste Dump',
      selected_category: 'Garbage & Solid Waste',
      confidence_score: 72.0,
      duplicate_probability: 88.0,
      image_quality: 'GOOD',
      ocr_text: 'SWACHH PUNE BIN',
      reason: 'High duplicate probability (88% match with complaint JS-2026-00388 filed 3 hours ago).',
      sample_img: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80'
    }
  ]);

  const [decisionFeedback, setDecisionFeedback] = useState(null);

  const handleDecision = (id, action) => {
    setReviewQueue(prev => prev.filter(item => item.id !== id));
    setDecisionFeedback(`Decision '${action}' successfully audited and recorded for item #${id}.`);
    setTimeout(() => setDecisionFeedback(null), 4000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-border gap-4 bg-white p-6 rounded-3xl shadow-card">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-brand-600 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                AI Control Center
              </span>
              <span className="text-xs text-status-success font-bold bg-status-successBg border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Model: {stats.model_version}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              AI Vision & Diagnostic Control Center
            </h1>
            <p className="text-xs text-content-secondary mt-1">
              Configure confidence thresholds, monitor OCR & duplicate detection, and adjudicate human review queues.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-status-success font-bold bg-status-successBg border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
              Inference Service: {stats.service_status}
            </span>
          </div>
        </div>

        {decisionFeedback && (
          <div className="p-4 bg-status-successBg border border-emerald-200 text-status-success rounded-2xl text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
            <span>{decisionFeedback}</span>
          </div>
        )}

        {/* 4 Core AI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <span className="text-xs text-content-secondary block mb-1 font-semibold">Total Photos Analyzed</span>
            <span className="text-3xl font-black text-content-main">{stats.total_images_analyzed.toLocaleString()}</span>
            <span className="text-[11px] text-brand-600 block mt-1 font-semibold">Avg Confidence: {stats.average_confidence_score}%</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <span className="text-xs text-status-success block mb-1 font-semibold">Auto-Verified by AI</span>
            <span className="text-3xl font-black text-status-success">{stats.ai_verified_percentage}%</span>
            <span className="text-[11px] text-content-muted block mt-1">High confidence & quality</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <span className="text-xs text-status-warning block mb-1 font-semibold">Flagged for Human Review</span>
            <span className="text-3xl font-black text-status-warning">{stats.manual_review_percentage}%</span>
            <span className="text-[11px] text-content-muted block mt-1">{reviewQueue.length} pending in queue</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-card">
            <span className="text-xs text-content-secondary block mb-1 font-semibold">Duplicate Catch Rate</span>
            <span className="text-3xl font-black text-content-main">{stats.duplicate_detection_rate}%</span>
            <span className="text-[11px] text-content-muted block mt-1">Perceptual hash matching</span>
          </div>
        </div>

        {/* AI Threshold Configuration Controls */}
        <div className="bg-white rounded-3xl border border-surface-border p-6 space-y-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-content-main">
                Dynamic Inference Threshold Controls
              </h2>
            </div>
            <span className="text-xs text-content-muted font-medium">Non-autonomous oversight mode</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Confidence Slider */}
            <div className="p-5 bg-surface-bg rounded-2xl border border-surface-border space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-content-main">Auto-Verification Confidence Threshold</span>
                <span className="font-mono text-sm font-bold text-brand-600 bg-white px-2 py-0.5 rounded border border-surface-border">{threshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <p className="text-[11px] text-content-secondary">
                Submissions with AI confidence below {threshold}% are automatically routed to municipal officers for human review.
              </p>
            </div>

            {/* Duplicate Slider */}
            <div className="p-5 bg-surface-bg rounded-2xl border border-surface-border space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-content-main">Perceptual Hash Hamming Distance Threshold</span>
                <span className="font-mono text-sm font-bold text-brand-600 bg-white px-2 py-0.5 rounded border border-surface-border">{duplicateThreshold}</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={duplicateThreshold}
                onChange={(e) => setDuplicateThreshold(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <p className="text-[11px] text-content-secondary">
                Difference hash distance &lt;= {duplicateThreshold} flags potential duplicate uploads from nearby coordinates.
              </p>
            </div>
          </div>
        </div>

        {/* Human Adjudication Queue */}
        <div className="bg-white rounded-3xl border border-surface-border p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div>
              <h2 className="text-base font-bold text-content-main">
                Human-in-the-Loop Review Queue
              </h2>
              <p className="text-xs text-content-secondary">
                Manual adjudication required before department ticket dispatch
              </p>
            </div>
            <span className="text-xs bg-amber-50 text-status-warning border border-amber-200 font-bold px-2.5 py-1 rounded-full">
              {reviewQueue.length} Pending
            </span>
          </div>

          {reviewQueue.length === 0 ? (
            <div className="p-8 text-center text-xs text-content-muted">
              <CheckCircle2 className="w-10 h-10 text-status-success mx-auto mb-2" />
              <p className="font-bold text-content-main">Review queue is empty!</p>
              <p>All AI flagged grievances have been processed.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviewQueue.map((item) => (
                <div key={item.id} className="p-4 bg-surface-bg rounded-2xl border border-surface-border flex flex-col sm:flex-row gap-4 items-start justify-between">
                  <div className="flex gap-4">
                    <img 
                      src={item.sample_img} 
                      alt="Review evidence" 
                      className="w-24 h-24 object-cover rounded-xl border border-surface-border shrink-0" 
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brand-600">{item.complaint_number}</span>
                        <span className="text-[10px] font-bold bg-white text-content-main border border-surface-border px-2 py-0.5 rounded">
                          AI Conf: {item.confidence_score}%
                        </span>
                        {item.ocr_text && (
                          <span className="text-[10px] font-mono bg-brand-50 text-brand-600 px-2 py-0.5 rounded">
                            OCR: "{item.ocr_text}"
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-content-secondary font-medium">
                        Selected: <strong className="text-content-main">{item.selected_category}</strong> → Detected: <strong className="text-brand-600">{item.detected_category}</strong>
                      </p>
                      <p className="text-xs text-content-muted leading-relaxed">
                        Reason: {item.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => handleDecision(item.id, 'APPROVED_OVERRIDE')}
                      className="flex-1 sm:flex-none px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                    >
                      Approve & Dispatch
                    </button>
                    <button
                      onClick={() => handleDecision(item.id, 'REASSIGN_CATEGORY')}
                      className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-slate-50 text-content-main font-semibold text-xs rounded-xl border border-surface-border transition"
                    >
                      Switch Category
                    </button>
                    <button
                      onClick={() => handleDecision(item.id, 'REJECT_DUPLICATE')}
                      className="flex-1 sm:flex-none px-4 py-2 bg-status-dangerBg hover:bg-red-100 text-status-danger font-semibold text-xs rounded-xl transition"
                    >
                      Merge Duplicate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
