import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  KeyRound,
  Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('CITIZEN');
  const [email, setEmail] = useState('citizen@janseva.in');
  const [password, setPassword] = useState('Password123!');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'CITIZEN') {
      setEmail('citizen@janseva.in');
    } else if (selectedRole === 'NAGAR_SEVAK') {
      setEmail('nagarsevak.ward14@pmc.gov.in');
    } else if (selectedRole === 'STAFF') {
      setEmail('staff.electrical@pmc.gov.in');
    } else if (selectedRole === 'ORG_ADMIN') {
      setEmail('admin@pmc.gov.in');
    } else if (selectedRole === 'SUPER_ADMIN') {
      setEmail('superadmin@janseva.in');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockUser = {
      id: Math.floor(100 + Math.random() * 900),
      name:
        role === 'SUPER_ADMIN'
          ? 'Platform Super Admin'
          : role === 'ORG_ADMIN'
          ? 'Shri Rajiv Deshmukh (Municipal Commissioner)'
          : role === 'NAGAR_SEVAK'
          ? 'Smt. Sunita More (Nagar Sevak - Ward 14)'
          : role === 'STAFF'
          ? 'Ramesh Sonawane (Field Engineer)'
          : 'Aarav Sharma (Citizen)',
      email,
      role,
      ward: role === 'NAGAR_SEVAK' ? 'Ward 14 (Kothrud North)' : 'Ward 14',
      organizationId: 1,
      organizationName: 'Pune Municipal Corporation',
    };

    login(mockUser, 'mock_jwt_token_sample_xyz');

    if (role === 'SUPER_ADMIN') navigate('/superadmin');
    else if (role === 'ORG_ADMIN') navigate('/admin');
    else if (role === 'NAGAR_SEVAK') navigate('/nagarsevak');
    else if (role === 'STAFF') navigate('/staff');
    else navigate('/citizen');
  };

  return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-brand-600/30 mx-auto mb-3">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-content-main tracking-tight">
            Sign In to JANSEVA
          </h2>
          <p className="mt-1 text-xs text-content-secondary font-medium">
            Smart Municipal Governance & Citizen SaaS Platform
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-surface-border shadow-card grid grid-cols-3 sm:grid-cols-5 gap-1 text-[11px] font-semibold">
          {[
            { id: 'CITIZEN', label: 'Citizen' },
            { id: 'NAGAR_SEVAK', label: 'Nagar Sevak' },
            { id: 'STAFF', label: 'Field Staff' },
            { id: 'ORG_ADMIN', label: 'MC Admin' },
            { id: 'SUPER_ADMIN', label: 'Super Admin' },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => handleRoleSelect(r.id)}
              className={`py-2 px-1 rounded-xl transition-all text-center ${
                role === r.id
                  ? 'bg-brand-600 text-white shadow-xs font-bold'
                  : 'text-content-secondary hover:text-brand-600 hover:bg-brand-50/50'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-surface-border rounded-3xl p-6 sm:p-8 space-y-5 shadow-card">
          <div>
            <label className="block text-xs font-semibold text-content-main uppercase tracking-wider mb-2">
              Official Email / Mobile *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-content-muted absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-bg border border-surface-border rounded-xl pl-10 pr-4 py-3 text-content-main text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 transition font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-content-main uppercase tracking-wider mb-2">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-content-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-bg border border-surface-border rounded-xl pl-10 pr-4 py-3 text-content-main text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 transition"
              />
            </div>
          </div>

          <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 text-[11px] text-brand-700 flex items-center justify-between">
            <span className="font-medium">Demo Mode: Credentials pre-filled.</span>
            <span className="font-extrabold uppercase">{role.replace(/_/g, ' ')}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-brand-600/25 text-sm transition-all flex items-center justify-center gap-2"
          >
            Authenticate & Open Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-content-secondary">
          New citizen?{' '}
          <Link to="/register" className="text-brand-600 hover:underline font-bold">
            Create a citizen account
          </Link>
        </p>
      </div>
    </div>
  );
}
