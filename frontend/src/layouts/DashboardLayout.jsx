import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import MobileBottomNav from '../components/navigation/MobileBottomNav';
import { 
  Building2, 
  Home, 
  FileText, 
  PlusCircle, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Wrench, 
  ShieldCheck, 
  Cpu, 
  BarChart3, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Award,
  Lock,
  Layers,
  Sparkles,
  Download,
  X,
  ExternalLink
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const { user, activeOrg, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const role = user?.role || 'CITIZEN';

  // Navigation Items
  let navItems = [];

  if (role === 'CITIZEN') {
    navItems = [
      { name: 'My Citizen Dashboard', path: '/citizen', icon: Home },
      { name: 'Report New Grievance', path: '/report', icon: PlusCircle, badge: 'AI Vision' },
      { name: 'Track My Grievance', path: '/track', icon: FileText },
      { name: 'Government Schemes', path: '/schemes', icon: Sparkles, badge: 'Direct Benefit' },
      { name: 'Ward Projects & Budget', path: '/projects', icon: Layers },
      { name: 'Civic Rewards (110 pts)', path: '/citizen', icon: Award },
      { name: 'Ward Map & Transparency', path: '/transparency', icon: MapPin },
      { name: 'Privacy & DPDP Consent', path: '/privacy', icon: ShieldCheck },
    ];
  } else if (role === 'NAGAR_SEVAK') {
    navItems = [
      { name: 'Constituency Overview', path: '/nagarsevak', icon: Building2 },
      { name: 'Critical P0 Outages', path: '/nagarsevak', icon: FileText, count: '1' },
      { name: 'Ward Development Projects', path: '/projects', icon: Layers },
      { name: 'Welfare Schemes Monitor', path: '/schemes', icon: Sparkles },
      { name: 'Public Transparency Map', path: '/transparency', icon: BarChart3 },
      { name: '24/7 Civic SOS Directory', path: '/emergency', icon: ShieldCheck },
    ];
  } else if (role === 'STAFF') {
    navItems = [
      { name: 'Field Dispatch Queue', path: '/staff', icon: Wrench, count: '2' },
      { name: 'Before/After Evidence', path: '/track', icon: FileText },
      { name: 'Ward Infrastructure Assets', path: '/projects', icon: Layers },
      { name: 'Ward GIS Map', path: '/transparency', icon: MapPin },
    ];
  } else if (role === 'ORG_ADMIN') {
    navItems = [
      { name: 'Municipal Command Center', path: '/admin', icon: Building2 },
      { name: 'AI Vision Control Center', path: '/ai-control', icon: Cpu, badge: 'Live AI' },
      { name: 'All Civic Grievances', path: '/track', icon: FileText },
      { name: 'Development Works', path: '/projects', icon: Layers },
      { name: 'Welfare Schemes', path: '/schemes', icon: Sparkles },
      { name: 'Citywide SLA Analytics', path: '/transparency', icon: BarChart3 },
    ];
  } else if (role === 'SUPER_ADMIN') {
    navItems = [
      { name: 'Multi-Tenant Platform', path: '/superadmin', icon: Building2 },
      { name: 'AI Vision Control Center', path: '/ai-control', icon: Cpu },
      { name: 'Government Schemes CMS', path: '/schemes', icon: Sparkles },
      { name: 'Development Projects Master', path: '/projects', icon: Layers },
      { name: 'Statewide Analytics', path: '/transparency', icon: BarChart3 },
      { name: 'Global Audit & Privacy', path: '/privacy', icon: ShieldCheck },
    ];
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/track?id=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg text-content-main flex flex-col md:flex-row pb-16 md:pb-0">
      
      {/* Desktop & Tablet Sleek Sidebar (XINTRA #17152B Aesthetic) */}
      <aside className={`hidden md:flex flex-col bg-surface-sidebar border-r border-white/5 transition-all duration-300 relative z-30 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Brand Banner */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-md shadow-brand-600/30">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">
                  JAN<span className="text-brand-400">SEVA</span>
                </span>
                <span className="text-[10px] text-brand-200 uppercase tracking-wider block font-semibold">
                  {role.replace(/_/g, ' ')}
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {!sidebarCollapsed && (
            <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Navigation Menu
            </div>
          )}
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 shrink-0 group-hover:scale-105 transition-transform" />
                {!sidebarCollapsed && (
                  <span className="flex-1 truncate">{item.name}</span>
                )}
                {!sidebarCollapsed && item.count && (
                  <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {item.count}
                  </span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <span className="bg-brand-500/30 text-brand-200 border border-brand-400/30 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer Role Notice & Sign Out */}
        <div className="p-3 border-t border-white/5 space-y-2">
          {role === 'NAGAR_SEVAK' && !sidebarCollapsed && (
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[10px] text-amber-300 flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Read-Only Oversight Mode</span>
            </div>
          )}

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navigation Bar - Light Theme */}
        <header className="h-16 bg-white border-b border-surface-border px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          {/* Left: Jurisdiction info */}
          <div className="flex items-center gap-3">
            <Link to="/" className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-extrabold text-sm">
                JS
              </div>
            </Link>
            <div className="hidden sm:flex items-center gap-2 bg-surface-bg px-3 py-1.5 rounded-xl border border-surface-border text-xs">
              <Building2 className="w-3.5 h-3.5 text-brand-600" />
              <span className="font-bold text-content-main">{activeOrg?.name || 'Pune Municipal Corporation'}</span>
              <span className="text-[10px] text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded font-mono font-bold">
                {activeOrg?.code || 'PMC'}
              </span>
            </div>
          </div>

          {/* Center: Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center max-w-sm w-full relative">
            <Search className="w-4 h-4 text-content-muted absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search token (e.g. JS-2026-00125)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-bg border border-surface-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-content-main placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-brand-600 transition"
            />
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl bg-surface-bg hover:bg-brand-50 text-content-secondary hover:text-brand-600 transition relative border border-surface-border"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
              </button>

              {/* Notification Drawer Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-surface-border rounded-2xl shadow-modal z-50 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                    <span className="text-xs font-bold text-content-main uppercase tracking-wider">
                      Municipal Alerts
                    </span>
                    <button onClick={() => setNotificationsOpen(false)} className="text-content-muted hover:text-content-main text-xs">
                      ✕
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-surface-bg rounded-xl border border-surface-border">
                      <p className="font-bold text-content-main">Resolution Evidence Uploaded</p>
                      <p className="text-[11px] text-content-secondary mt-0.5">Streetlight JS-2026-00125 has completed photo verification evidence.</p>
                      <span className="text-[10px] text-brand-600 font-mono mt-1 block font-semibold">10 mins ago</span>
                    </div>

                    <div className="p-2.5 bg-brand-50/60 rounded-xl border border-brand-100">
                      <p className="font-bold text-status-success">+20 Civic Rewards Credited</p>
                      <p className="text-[11px] text-content-secondary mt-0.5">Your on-site feedback was verified by Ward 14 engineer.</p>
                      <span className="text-[10px] text-brand-600 font-mono mt-1 block font-semibold">2 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Capsule */}
            <div className="flex items-center gap-2 pl-2 border-l border-surface-border">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                {user?.name ? user.name[0] : 'U'}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <span className="font-bold text-content-main block truncate max-w-[130px]">
                  {user?.name || 'Citizen'}
                </span>
                <span className="text-[10px] text-brand-600 uppercase font-semibold block">
                  {role.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Persistent Mobile Bottom Navigation for Smartphones */}
      <MobileBottomNav />
    </div>
  );
}
