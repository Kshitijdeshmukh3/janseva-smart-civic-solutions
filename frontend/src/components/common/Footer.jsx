import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Phone, Mail, MapPin, Heart, ExternalLink, Sparkles } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#17152B] text-slate-400 border-t border-white/5 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-brand-600/30">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                JAN<span className="text-brand-400">SEVA</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Enterprise Smart Municipal Governance, Citizen Engagement, AI Photo Verification, Government Schemes and Area Development SaaS Platform.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-status-success shrink-0" />
                <span>Compliant with Indian <strong>DPDP Act, 2023</strong></span>
              </div>
            </div>
          </div>

          {/* Citizen Services */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              Citizen Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/report" className="hover:text-brand-300 transition-colors">
                  Report a Civic Problem
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-brand-300 transition-colors">
                  Track Complaint by Token
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-300 transition-colors">
                  Ward Development Projects
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-brand-300 transition-colors">
                  Government Welfare Schemes
                </Link>
              </li>
              <li>
                <Link to="/transparency" className="hover:text-brand-300 transition-colors">
                  Public Transparency Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Role Portals */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              Authorized Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/login" className="hover:text-brand-300 transition-colors">
                  Citizen Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-300 transition-colors">
                  Nagar Sevak Monitoring Desk
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-300 transition-colors">
                  Department Field Staff Mode
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-300 transition-colors">
                  Municipal Admin Console
                </Link>
              </li>
              <li>
                <Link to="/ai-control" className="hover:text-brand-300 transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-400" />
                  AI Verification Control Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Grievance & Emergency */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              Support & Grievance
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-200 font-medium">Toll-Free Control Room</p>
                  <p className="text-slate-400">1800-CIVIC-SOS (24x7)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-200 font-medium">Data Grievance Officer</p>
                  <p className="text-slate-400">privacy@janseva.in</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-200 font-medium">Municipal Smart Hub</p>
                  <p className="text-slate-400">Shivajinagar, Pune, MH 411005</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 JANSEVA – Smart Civic Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy (DPDP 2023)
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <span className="text-brand-400 font-medium">Enterprise SaaS v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
