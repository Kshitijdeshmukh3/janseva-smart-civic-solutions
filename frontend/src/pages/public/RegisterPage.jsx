import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight 
} from 'lucide-react';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    ward: 'Ward 14 (Kothrud North)',
    locality: '',
    consentEssential: true,
    consentGeo: true,
    consentNotifications: true,
    consentPrivacyPolicy: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consentPrivacyPolicy) {
      alert('Please accept the Privacy Policy and Terms under the DPDP Act 2023 to register.');
      return;
    }

    const newUser = {
      id: Math.floor(1000 + Math.random() * 9000),
      name: formData.fullName,
      email: formData.email,
      role: 'CITIZEN',
      ward: formData.ward,
      rewardPoints: 50, // Welcome bonus
      organizationId: 1,
      organizationName: 'Pune Municipal Corporation',
    };

    login(newUser, 'mock_registered_citizen_token');
    alert('Registration successful! +50 Civic Reward points awarded as welcome bonus.');
    navigate('/citizen');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl mx-auto mb-3">
            JS
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Citizen Registration
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Join your municipal ward portal and earn civic reward points.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="aarav@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="9876543210"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Municipal Ward *
              </label>
              <select
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Ward 14 (Kothrud North)">Ward 14 (Kothrud North)</option>
                <option value="Ward 18 (Bavdhan - Pashan)">Ward 18 (Bavdhan - Pashan)</option>
                <option value="Ward 22 (Aundh Central)">Ward 22 (Aundh Central)</option>
                <option value="Ward 10 (Shivajinagar)">Ward 10 (Shivajinagar)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Locality / Area
              </label>
              <input
                type="text"
                placeholder="e.g. Mayur Colony"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* DPDPA 2023 Consent Section */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              DPDP Act 2023 Explicit Consents
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consentEssential}
                disabled
                className="mt-0.5 rounded text-blue-600 focus:ring-0"
              />
              <span>
                <strong>Essential Processing (Mandatory)</strong>: Account authentication and municipal ticket routing.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consentGeo}
                onChange={(e) => setFormData({ ...formData, consentGeo: e.target.checked })}
                className="mt-0.5 rounded text-blue-600 focus:ring-0"
              />
              <span>
                <strong>GPS Geolocation</strong>: Allow capturing precise coordinates for civic problem reporting.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consentNotifications}
                onChange={(e) => setFormData({ ...formData, consentNotifications: e.target.checked })}
                className="mt-0.5 rounded text-blue-600 focus:ring-0"
              />
              <span>
                <strong>Civic Alerts & Notifications</strong>: Receive SLA status updates and municipal notices.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-blue-300 cursor-pointer pt-2 border-t border-slate-800">
              <input
                type="checkbox"
                required
                checked={formData.consentPrivacyPolicy}
                onChange={(e) => setFormData({ ...formData, consentPrivacyPolicy: e.target.checked })}
                className="mt-0.5 rounded text-blue-600 focus:ring-0"
              />
              <span>
                I agree to the <Link to="/privacy" className="underline text-white font-semibold">Privacy Policy</Link> and <Link to="/terms" className="underline text-white font-semibold">Terms of Service</Link>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 text-sm transition-all flex items-center justify-center gap-2"
          >
            Create Citizen Account & Claim +50 Points
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="text-blue-400 hover:underline font-semibold">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
