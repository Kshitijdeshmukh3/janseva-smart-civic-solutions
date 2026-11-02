import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Sparkles, 
  Camera, 
  ShieldCheck, 
  FileText, 
  Layers,
  HelpCircle,
  Copy
} from 'lucide-react';

export default function AIPhotoVerificationReport({ report, isAnalyzing }) {
  if (isAnalyzing) {
    return (
      <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-5 text-center space-y-3 animate-pulse">
        <div className="flex items-center justify-center gap-2 text-blue-400 font-bold text-sm">
          <Sparkles className="w-5 h-5 animate-spin" />
          <span>AI Computer Vision Analysis in Progress...</span>
        </div>
        <p className="text-xs text-slate-400">
          Checking image quality, defect patterns, duplicate perceptual hashing, and municipal SLA priority.
        </p>
        <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
          <div className="w-1/2 h-full bg-blue-500 rounded-full animate-progress"></div>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const isVerified = report.recommendation === 'AI_VERIFIED';
  const isRejected = report.recommendation === 'IMAGE_REJECTED_UPLOAD_AGAIN';
  const isManualReview = report.recommendation === 'MANUAL_REVIEW_REQUIRED';

  return (
    <div className={`rounded-2xl border p-5 space-y-4 shadow-xl transition-all ${
      isVerified
        ? 'bg-emerald-950/30 border-emerald-500/40'
        : isRejected
        ? 'bg-rose-950/30 border-rose-500/40'
        : 'bg-amber-950/30 border-amber-500/40'
    }`}>
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          {isVerified ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : isRejected ? (
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          )}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              AI Photo Verification Report
            </span>
            <span className={`block text-[11px] font-semibold ${
              isVerified ? 'text-emerald-400' : isRejected ? 'text-rose-400' : 'text-amber-400'
            }`}>
              {report.recommendation.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        {/* Confidence Score Pill */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
          <span className="text-[10px] text-slate-400">AI Confidence:</span>
          <span className="text-sm font-black text-white font-mono">
            {report.confidence_score}%
          </span>
        </div>
      </div>

      {/* Grid of Key Diagnostic Parameters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Metric 1: Quality */}
        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
          <span className="text-[10px] text-slate-400 block mb-0.5">Image Quality</span>
          <span className={`font-bold ${report.image_quality === 'GOOD' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {report.image_quality === 'GOOD' ? 'Good (Sharp)' : report.image_quality.replace('POOR_', 'Poor: ')}
          </span>
        </div>

        {/* Metric 2: Problem Detected */}
        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
          <span className="text-[10px] text-slate-400 block mb-0.5">Problem Detected</span>
          <span className={`font-bold ${report.problem_detected === 'YES' ? 'text-white' : 'text-amber-400'}`}>
            {report.problem_detected}
          </span>
        </div>

        {/* Metric 3: Severity */}
        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
          <span className="text-[10px] text-slate-400 block mb-0.5">Assessed Severity</span>
          <span className={`font-bold uppercase ${
            report.severity === 'CRITICAL' ? 'text-red-400' : report.severity === 'HIGH' ? 'text-orange-400' : 'text-blue-400'
          }`}>
            {report.severity}
          </span>
        </div>

        {/* Metric 4: Duplicate Risk */}
        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
          <span className="text-[10px] text-slate-400 block mb-0.5">Duplicate Risk</span>
          <span className={`font-bold ${report.duplicate_probability > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {report.duplicate_probability}% Prob.
          </span>
        </div>
      </div>

      {/* Detected Category & OCR */}
      <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5">
        <div className="flex flex-wrap justify-between items-center">
          <span className="text-slate-400">Classified Issue:</span>
          <span className="font-bold text-white">{report.detected_category}</span>
        </div>
        {report.extracted_ocr_text && (
          <div className="flex flex-wrap justify-between items-center pt-1 border-t border-slate-800">
            <span className="text-slate-400 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              OCR Signboard / Asset Text:
            </span>
            <span className="font-mono text-blue-300 font-bold">{report.extracted_ocr_text}</span>
          </div>
        )}
      </div>

      {/* AI Description & Transparency Notice */}
      <div className="text-xs text-slate-300 bg-slate-900/60 rounded-xl p-3 border border-slate-800/80 leading-relaxed">
        <p className="font-medium">
          <span className="text-blue-400 font-bold">AI Observation: </span>
          {report.ai_description}
        </p>
        <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          DPDPA 2023 Safety Rule: AI assists triaging and never automatically rejects genuine citizen grievances without municipal review.
        </p>
      </div>
    </div>
  );
}
