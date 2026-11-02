import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  Building2, 
  AlertTriangle, 
  FileText, 
  Search, 
  BarChart3, 
  Menu, 
  X, 
  User, 
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Download
} from 'lucide-react';

const municipalOrgs = [
  { id: 1, name: 'Pune Municipal Corporation', code: 'PMC' },
  { id: 2, name: 'Brihanmumbai Municipal Corporation', code: 'BMC' },
  { id: 3, name: 'Thane Municipal Corporation', code: 'TMC' },
  { id: 4, name: 'Nagpur Municipal Corporation', code: 'NMC' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const { user, activeOrg, setActiveOrg, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  const navLinks = [
    { name: t('nav_home') || 'Home', path: '/' },
    { name: t('nav_report') || 'Report Problem', path: '/report' },
    { name: t('nav_track') || 'Track Status', path: '/track' },
    { name: 'Ward Projects', path: '/projects' },
    { name: 'Welfare Schemes', path: '/schemes' },
    { name: 'Transparency', path: '/transparency' },
    { name: 'AI Control', path: '/ai-control' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-surface-border shadow-xs">
      {/* Top Organization and Quick Alert Bar */}
      <div className="bg-[#17152B] px-4 py-1.5 text-xs text-slate-300 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-semibold text-brand-300">
              <Building2 className="w-3.5 h-3.5" />
              Jurisdiction:
            </span>
            <div className="relative">
              <button
                onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                className="flex items-center gap-1 text-white bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-lg text-xs font-medium transition"
              >
                {activeOrg.name} ({activeOrg.code})
                <ChevronDown className="w-3 h-3 ml-1 text-brand-200" />
              </button>

              {orgDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-[#17152B] border border-white/10 rounded-xl shadow-2xl z-50 py-1">
                  {municipalOrgs.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => {
                        setActiveOrg(org);
                        setOrgDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        activeOrg.id === org.id ? 'bg-brand-600 text-white font-bold' : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      {org.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
              DPDP Act 2023 Compliant Citizen Privacy
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/emergency"
              className="flex items-center gap-1 text-red-400 hover:text-red-300 font-bold text-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              24/7 SOS: 1800-CIVIC-SOS
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-brand-600/30 group-hover:scale-105 transition-transform">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-content-main">
                  JAN<span className="text-brand-600">SEVA</span>
                </span>
                <span className="bg-brand-50 text-brand-600 border border-brand-200 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                  SaaS 2.0
                </span>
              </div>
              <p className="text-[10px] text-content-muted hidden sm:block tracking-wide">
                Your Area. Your Voice. Our Responsibility.
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 shadow-xs'
                      : 'text-content-secondary hover:text-brand-600 hover:bg-surface-bg'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Auth / Dashboard Controls */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to={
                    user.role === 'SUPER_ADMIN'
                      ? '/superadmin'
                      : user.role === 'ORG_ADMIN'
                      ? '/admin'
                      : user.role === 'NAGAR_SEVAK'
                      ? '/nagarsevak'
                      : user.role === 'STAFF'
                      ? '/staff'
                      : '/citizen'
                  }
                  className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition"
                >
                  <User className="w-4 h-4" />
                  {user.name || 'Dashboard'}
                </Link>
                <button
                  onClick={logout}
                  className="text-content-muted hover:text-content-main text-xs font-medium px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-content-secondary hover:text-content-main px-3 py-2 rounded-xl text-xs font-semibold hover:bg-surface-bg transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm shadow-brand-600/20 transition-all hover:shadow"
                >
                  Register Citizen
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-content-secondary hover:text-content-main p-2 rounded-xl bg-surface-bg border border-surface-border"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-surface-border px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="py-2 border-b border-surface-border">
            <p className="text-xs text-content-muted mb-1">Active Jurisdiction:</p>
            <span className="font-bold text-sm text-brand-600">{activeOrg.name}</span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  location.pathname === link.path
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-content-secondary hover:bg-surface-bg'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-surface-border flex flex-col gap-2">
            <Link
              to="/emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-red-50 text-red-600 border border-red-200 py-2.5 rounded-xl font-bold text-xs"
            >
              🚨 24/7 Civic SOS Emergency
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-brand-600 text-white py-2.5 rounded-xl font-bold text-xs shadow"
            >
              Sign In to JANSEVA
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
