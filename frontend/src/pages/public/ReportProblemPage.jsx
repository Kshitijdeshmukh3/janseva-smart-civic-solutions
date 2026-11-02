import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Camera, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Upload, 
  Eye, 
  EyeOff, 
  Bot,
  RefreshCw
} from 'lucide-react';
import AIPhotoVerificationReport from '../../components/ai/AIPhotoVerificationReport';
import SmartAIAssistantModal from '../../components/ai/SmartAIAssistantModal';

const categories = [
  { id: 'safety', name: 'Public Safety & Electrical Hazards', defaultPriority: 'P0_CRITICAL' },
  { id: 'waterlogging', name: 'Waterlogging & Flood', defaultPriority: 'P1_HIGHEST' },
  { id: 'water', name: 'Water Supply & Pipeline Leakage', defaultPriority: 'P2_HIGH' },
  { id: 'drainage', name: 'Drainage & Sewage Overflow', defaultPriority: 'P2_HIGH' },
  { id: 'potholes', name: 'Road Damage & Potholes', defaultPriority: 'P2_HIGH' },
  { id: 'streetlights', name: 'Streetlight Problems', defaultPriority: 'P2_HIGH' },
  { id: 'garbage', name: 'Garbage & Solid Waste Dump', defaultPriority: 'P3_MEDIUM' },
  { id: 'toilets', name: 'Public Toilets & Sanitation', defaultPriority: 'P3_MEDIUM' },
  { id: 'parks', name: 'Public Parks & Tree Maintenance', defaultPriority: 'P4_LOW' },
];

export default function ReportProblemPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'streetlights';

  const [formData, setFormData] = useState({
    title: '',
    category: initialCategory,
    description: '',
    ward: 'Ward 14 (Kothrud North)',
    locality: '',
    latitude: '18.5074',
    longitude: '73.8077',
    visibility: 'PUBLIC_ANONYMOUS',
    affectedCount: '10-50',
    photoUrl: null
  });

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [isPhotoAnalyzing, setIsPhotoAnalyzing] = useState(false);
  const [photoVerificationReport, setPhotoVerificationReport] = useState(null);
  const [submittedId, setSubmittedId] = useState(null);

  const handlePhotoUploadSimulated = (sampleType = 'streetlights') => {
    setIsPhotoAnalyzing(true);
    setPhotoVerificationReport(null);

    setTimeout(async () => {
      try {
        const payload = {
          file_name: `${sampleType}_sample.jpg`,
          file_size_kb: 480,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          selected_category: formData.category
        };

        const res = await fetch('http://127.0.0.1:8000/api/v1/complaints/verify-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          setPhotoVerificationReport(data);
        } else {
          fallbackVerification(sampleType);
        }
      } catch (err) {
        fallbackVerification(sampleType);
      } finally {
        setIsPhotoAnalyzing(false);
      }
    }, 700);
  };

  const fallbackVerification = (sampleType) => {
    setPhotoVerificationReport({
      image_quality: 'GOOD',
      problem_detected: 'YES',
      detected_category: sampleType === 'streetlights' ? 'Streetlights & Electrical' : 'Road Damage & Potholes',
      severity: 'HIGH',
      confidence_score: 91.5,
      duplicate_probability: 4.2,
      location_verification_status: 'VERIFIED',
      ai_description: 'Visual defect matches selected civic category. Clear lighting, high resolution evidence.',
      recommendation: 'AI_VERIFIED'
    });
  };

  const handleApplyAISuggestions = (suggestions) => {
    setFormData(prev => ({
      ...prev,
      title: suggestions.title || prev.title,
      description: suggestions.description || prev.description,
      category: suggestions.category?.toLowerCase().includes('water')
        ? 'water'
        : suggestions.category?.toLowerCase().includes('pothole')
        ? 'potholes'
        : 'streetlights'
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill in title and description.');
      return;
    }
    const newId = `JS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedId(newId);
  };

  return (
    <div className="min-h-screen bg-surface-bg text-content-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header with AI Assistant Button */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-1 text-xs font-bold text-brand-600 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            AI-Assisted Citizen Grievance Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight">
            Report a Civic Grievance
          </h1>
          <p className="mt-2 text-sm text-content-secondary max-w-xl mx-auto">
            Submit with geotagged photograph. Our AI verifies defect severity, extracts visible text, and checks for duplicates.
          </p>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => setAiModalOpen(true)}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-md shadow-brand-600/25 transition-all hover:scale-102"
            >
              <Bot className="w-4 h-4 text-brand-100" />
              Use Multilingual AI Voice/Text Assistant
            </button>
          </div>
        </div>

        {submittedId ? (
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 text-center space-y-6 shadow-card">
            <div className="w-16 h-16 rounded-full bg-status-successBg text-status-success flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-content-main">Complaint Registered & AI Verified!</h2>
              <p className="text-sm text-content-secondary mt-1">
                Your complaint has been queued for municipal field staff dispatch.
              </p>
            </div>

            <div className="bg-surface-bg border border-surface-border rounded-2xl p-4 max-w-sm mx-auto">
              <span className="text-xs text-content-muted block mb-1 font-semibold">Tracking Number:</span>
              <span className="text-2xl font-black font-mono text-brand-600 tracking-wider">
                {submittedId}
              </span>
            </div>

            <p className="text-xs text-status-success font-bold">
              🎁 +20 Civic Reward Points will be credited once verified on-site.
            </p>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => navigate(`/track?id=${submittedId}`)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition"
              >
                Track Live Progress
              </button>
              <button
                onClick={() => {
                  setSubmittedId(null);
                  setPhotoVerificationReport(null);
                }}
                className="bg-surface-bg hover:bg-slate-200 text-content-secondary font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-surface-border transition"
              >
                Submit Another Issue
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-content-main uppercase tracking-wider mb-2">
                Problem Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Broken streetlight pole outside building 4"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-surface-bg border border-surface-border rounded-xl px-4 py-3 text-content-main text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 transition"
              />
            </div>

            {/* Category & Ward */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-content-main uppercase tracking-wider mb-2">
                  Civic Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-surface-bg border border-surface-border rounded-xl px-4 py-3 text-content-main text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 transition"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-main uppercase tracking-wider mb-2">
                  Ward Jurisdiction *
                </label>
                <select
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  className="w-full bg-surface-bg border border-surface-border rounded-xl px-4 py-3 text-content-main text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 transition"
                >
                  <option value="Ward 14 (Kothrud North)">Ward 14 (Kothrud North)</option>
                  <option value="Ward 18 (Bavdhan - Pashan)">Ward 18 (Bavdhan - Pashan)</option>
                  <option value="Ward 22 (Aundh Central)">Ward 22 (Aundh Central)</option>
                  <option value="Ward 10 (Shivajinagar)">Ward 10 (Shivajinagar)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-content-main uppercase tracking-wider mb-2">
                Detailed Description *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe landmark, defect, and any immediate public safety concerns..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-surface-bg border border-surface-border rounded-xl p-4 text-content-main text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 transition"
              />
            </div>

            {/* Photo Upload with AI Computer Vision Verification */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-content-main uppercase tracking-wider">
                Civic Defect Photo (Required for AI Verification & +5 Points)
              </label>

              <div 
                onClick={() => handlePhotoUploadSimulated(formData.category)}
                className="border-2 border-dashed border-surface-border hover:border-brand-600 rounded-2xl p-6 text-center cursor-pointer bg-surface-bg transition-colors group"
              >
                <Camera className="w-8 h-8 text-brand-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-content-main font-bold">
                  Click to capture with Camera or upload photo
                </p>
                <p className="text-[11px] text-content-muted mt-1">
                  AI will automatically verify image quality, defect category, and check for duplicates
                </p>
              </div>

              {/* Live AI Verification Report Component */}
              <AIPhotoVerificationReport 
                report={photoVerificationReport}
                isAnalyzing={isPhotoAnalyzing}
              />
            </div>

            {/* Geolocation & Locality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-content-main uppercase tracking-wider mb-2">
                  Locality / Landmark *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Ganpati Chowk, Paud Road"
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  className="w-full bg-surface-bg border border-surface-border rounded-xl px-4 py-3 text-content-main text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-main uppercase tracking-wider mb-2">
                  GPS Location
                </label>
                <div className="flex items-center gap-2 bg-surface-bg border border-surface-border rounded-xl px-4 py-3 text-xs text-content-secondary">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Lat: {formData.latitude}, Lng: {formData.longitude}</span>
                  <span className="ml-auto text-[10px] text-status-success font-bold bg-status-successBg px-1.5 py-0.5 rounded">
                    Auto-Tagged
                  </span>
                </div>
              </div>
            </div>

            {/* DPDP Act 2023 Privacy Choice */}
            <div className="bg-surface-bg border border-surface-border rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-status-success" />
                <span className="text-xs font-bold text-content-main uppercase tracking-wider">
                  Citizen Privacy Choice (DPDP Act 2023)
                </span>
              </div>
              <p className="text-[11px] text-content-secondary">
                Your phone number and exact residential address are <strong>never</strong> displayed publicly. Choose how this issue appears on the open area map:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <label className={`border rounded-xl p-3 cursor-pointer text-xs flex flex-col justify-between transition-all ${
                  formData.visibility === 'PUBLIC_ANONYMOUS' ? 'border-brand-500 bg-brand-50/50 text-content-main' : 'border-surface-border bg-white text-content-secondary'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">Public Anonymous</span>
                    <EyeOff className="w-3.5 h-3.5 text-brand-600" />
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    value="PUBLIC_ANONYMOUS"
                    checked={formData.visibility === 'PUBLIC_ANONYMOUS'}
                    onChange={() => setFormData({ ...formData, visibility: 'PUBLIC_ANONYMOUS' })}
                    className="sr-only"
                  />
                  <span className="text-[10px] text-content-muted">Visible on area map, citizen name redacted.</span>
                </label>

                <label className={`border rounded-xl p-3 cursor-pointer text-xs flex flex-col justify-between transition-all ${
                  formData.visibility === 'PUBLIC_APPROVED' ? 'border-brand-500 bg-brand-50/50 text-content-main' : 'border-surface-border bg-white text-content-secondary'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">Public Citizen</span>
                    <Eye className="w-3.5 h-3.5 text-brand-600" />
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    value="PUBLIC_APPROVED"
                    checked={formData.visibility === 'PUBLIC_APPROVED'}
                    onChange={() => setFormData({ ...formData, visibility: 'PUBLIC_APPROVED' })}
                    className="sr-only"
                  />
                  <span className="text-[10px] text-content-muted">Shows complainant name on verified list.</span>
                </label>

                <label className={`border rounded-xl p-3 cursor-pointer text-xs flex flex-col justify-between transition-all ${
                  formData.visibility === 'PRIVATE' ? 'border-brand-500 bg-brand-50/50 text-content-main' : 'border-surface-border bg-white text-content-secondary'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">Confidential</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-content-muted" />
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    value="PRIVATE"
                    checked={formData.visibility === 'PRIVATE'}
                    onChange={() => setFormData({ ...formData, visibility: 'PRIVATE' })}
                    className="sr-only"
                  />
                  <span className="text-[10px] text-content-muted">Only visible to assigned municipal engineer.</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-md shadow-brand-600/25 text-base transition-all"
            >
              Submit Complaint & Start SLA Countdown
            </button>
          </form>
        )}
      </div>

      {/* Smart AI Assistant Modal */}
      <SmartAIAssistantModal 
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onApplySuggestions={handleApplyAISuggestions}
      />
    </div>
  );
}
