import React, { useState } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  MoveHorizontal, 
  ThumbsUp, 
  Camera 
} from 'lucide-react';

export default function BeforeAfterComparisonSlider({
  beforeImage,
  afterImage,
  aiAnalysis,
  onConfirmResolution,
  onDisputeReopen,
  userRole = 'CITIZEN'
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const percent = Math.max(0, Math.min((touchX / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const defaultBefore = beforeImage || "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80";
  const defaultAfter = afterImage || "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80";

  const aiResult = aiAnalysis || {
    status: 'PROBLEM_RESOLVED_CONFIRMED',
    change_percentage: 92.5,
    description: 'AI Vision confirmed significant structural repair: defective luminaire replaced, illumination signature restored, and work verified in consistent geographic context.',
    confidence: 91.0
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            Before & After Photographic Audit Verification
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Drag the interactive slider horizontally to inspect physical repair work.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-850 px-3 py-1.5 rounded-xl border border-slate-700">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-300 font-medium">AI Resolution Match:</span>
          <span className="text-sm font-black text-emerald-400 font-mono">
            {aiResult.change_percentage}%
          </span>
        </div>
      </div>

      {/* Interactive Split Image Slider */}
      <div 
        className="relative h-72 sm:h-96 rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-700 shadow-inner"
        onMouseMove={handleSliderMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background layer) */}
        <img
          src={defaultAfter}
          alt="After Completion"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
          AFTER (Completed Repair)
        </div>

        {/* Before Image (Clipped layer) */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={defaultBefore}
            alt="Before Repair"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
            BEFORE (Reported Defect)
          </div>
        </div>

        {/* Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center shadow-lg">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* AI Completion Verification Report Card */}
      <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            AI Verification Verdict:
          </span>
          <span className="font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase text-[10px]">
            {aiResult.status.replace(/_/g, ' ')}
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {aiResult.description}
        </p>
      </div>

      {/* Citizen Action Bar */}
      {userRole === 'CITIZEN' && (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Does the physical repair on-site match the photograph? Please confirm to finalize closing.
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onConfirmResolution}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              Confirm & Close (+20 Points)
            </button>
            <button
              onClick={onDisputeReopen}
              className="flex items-center gap-2 bg-rose-900/40 hover:bg-rose-900 text-rose-300 border border-rose-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Dispute / Reopen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
