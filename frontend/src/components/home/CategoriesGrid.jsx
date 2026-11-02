import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Lightbulb, 
  Construction, 
  Droplet, 
  Waves, 
  Trash2, 
  Trees, 
  Bath, 
  CloudRain, 
  Zap, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

const categories = [
  {
    id: 'safety',
    title: 'Public Safety & Electrical Hazards',
    icon: Zap,
    color: 'text-status-danger bg-status-dangerBg border-red-200',
    sla: '2 Hours (P0)',
    urgent: true,
  },
  {
    id: 'waterlogging',
    title: 'Waterlogging & Monsoon Drainage',
    icon: CloudRain,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    sla: '6 Hours (P1)',
    urgent: true,
  },
  {
    id: 'water',
    title: 'Drinking Water Pipeline Leaks',
    icon: Droplet,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    sla: '12 Hours (P2)',
  },
  {
    id: 'garbage',
    title: 'Garbage & Solid Waste Dumping',
    icon: Trash2,
    color: 'text-status-success bg-status-successBg border-emerald-200',
    sla: '12 Hours (P3)',
  },
  {
    id: 'drainage',
    title: 'Sewage Overflow & Silt Trap Blockage',
    icon: Waves,
    color: 'text-brand-600 bg-brand-50 border-brand-200',
    sla: '24 Hours (P2)',
  },
  {
    id: 'streetlights',
    title: 'Streetlights & Electrical Outages',
    icon: Lightbulb,
    color: 'text-amber-500 bg-amber-50 border-amber-200',
    sla: '24 Hours (P2)',
  },
  {
    id: 'potholes',
    title: 'Road Potholes & Damaged Asphalt',
    icon: Construction,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    sla: '48 Hours (P2)',
  },
  {
    id: 'toilets',
    title: 'Public Sanitation & Community Toilets',
    icon: Bath,
    color: 'text-teal-600 bg-teal-50 border-teal-200',
    sla: '24 Hours (P3)',
  },
  {
    id: 'parks',
    title: 'Public Gardens, Open Gyms & Trees',
    icon: Trees,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    sla: '72 Hours (P4)',
  },
];

export default function CategoriesGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-surface-bg border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3 border border-brand-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guaranteed Service Level Agreements (SLAs)</span>
          </div>
          <h2 className="text-3xl font-extrabold text-content-main tracking-tight">
            Municipal Complaint Categories
          </h2>
          <p className="mt-2 text-sm text-content-secondary">
            Select a category to report an issue. Tickets are automatically categorized, verified by AI, and routed directly to the assigned ward engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/report?category=${cat.id}`)}
                className="group relative bg-white border border-surface-border hover:border-brand-500 rounded-2xl p-5 hover:shadow-card-hover transition-all cursor-pointer shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${cat.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {cat.urgent ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-status-dangerBg text-status-danger border border-red-200 uppercase">
                        Emergency SLA
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-content-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-600" />
                        Target: {cat.sla}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-content-main group-hover:text-brand-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-content-secondary leading-relaxed">
                    Automated GPS routing to assigned municipal field technician with real-time escalation.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-surface-border flex items-center justify-between text-xs font-semibold text-content-muted group-hover:text-brand-600 transition-colors">
                  <span>Submit issue in this category</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
