import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  FileText, 
  PlusCircle, 
  MapPin, 
  User, 
  Wrench, 
  Building2, 
  ShieldCheck,
  Sparkles,
  Layers
} from 'lucide-react';

export default function MobileBottomNav() {
  const { user } = useAuth();
  const location = useLocation();

  const role = user?.role || 'CITIZEN';

  let navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'My Issues', icon: FileText, path: '/citizen' },
    { label: 'Report', icon: PlusCircle, path: '/report', highlight: true },
    { label: 'Schemes', icon: Sparkles, path: '/schemes' },
    { label: 'Projects', icon: Layers, path: '/projects' },
  ];

  if (role === 'STAFF') {
    navItems = [
      { label: 'Tasks', icon: Wrench, path: '/staff' },
      { label: 'Complete', icon: PlusCircle, path: '/staff', highlight: true },
      { label: 'Track', icon: FileText, path: '/track' },
      { label: 'Profile', icon: User, path: '/staff' },
    ];
  } else if (role === 'NAGAR_SEVAK') {
    navItems = [
      { label: 'Ward', icon: Building2, path: '/nagarsevak' },
      { label: 'Critical', icon: FileText, path: '/nagarsevak' },
      { label: 'Projects', icon: Layers, path: '/projects', highlight: true },
      { label: 'Schemes', icon: Sparkles, path: '/schemes' },
      { label: 'Profile', icon: User, path: '/nagarsevak' },
    ];
  } else if (role === 'ORG_ADMIN' || role === 'SUPER_ADMIN') {
    navItems = [
      { label: 'Overview', icon: Building2, path: role === 'SUPER_ADMIN' ? '/superadmin' : '/admin' },
      { label: 'Queue', icon: FileText, path: '/admin' },
      { label: 'AI Center', icon: ShieldCheck, path: '/ai-control', highlight: true },
      { label: 'Projects', icon: Layers, path: '/projects' },
      { label: 'Profile', icon: User, path: role === 'SUPER_ADMIN' ? '/superadmin' : '/admin' },
    ];
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                item.highlight
                  ? 'text-white'
                  : isActive
                  ? 'text-brand-600 font-bold'
                  : 'text-content-secondary hover:text-brand-600'
              }`}
            >
              {item.highlight ? (
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-600/40 -mt-6 border-2 border-white">
                  <Icon className="w-5 h-5" />
                </div>
              ) : (
                <Icon className="w-5 h-5 mb-0.5" />
              )}
              <span className={`text-[10px] ${item.highlight ? 'font-bold mt-1 text-brand-600' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
