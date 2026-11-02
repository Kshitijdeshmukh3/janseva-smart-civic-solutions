import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ReportProblemPage from './pages/public/ReportProblemPage';
import TrackComplaintPage from './pages/public/TrackComplaintPage';
import PublicTransparencyDashboard from './pages/public/PublicTransparencyDashboard';
import DevelopmentProjectsPage from './pages/public/DevelopmentProjectsPage';
import GovernmentSchemesPage from './pages/public/GovernmentSchemesPage';
import EmergencyPage from './pages/public/EmergencyPage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Role Dashboards & AI Control Center
import CitizenDashboardPage from './pages/citizen/CitizenDashboardPage';
import NagarSevakDashboardPage from './pages/nagarsevak/NagarSevakDashboardPage';
import StaffDashboardPage from './pages/staff/StaffDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import SuperAdminDashboardPage from './pages/superadmin/SuperAdminDashboardPage';
import AIControlCenterPage from './pages/admin/AIControlCenterPage';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Layout Wrapping Navigation & Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/report" element={<ReportProblemPage />} />
              <Route path="/track" element={<TrackComplaintPage />} />
              <Route path="/projects" element={<DevelopmentProjectsPage />} />
              <Route path="/schemes" element={<GovernmentSchemesPage />} />
              <Route path="/transparency" element={<PublicTransparencyDashboard />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<PrivacyPolicyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Standalone Route for AI Admin Control Center */}
              <Route path="/ai-control" element={<AIControlCenterPage />} />
              
              {/* Role Dashboards with standard public navigation header for seamless accessibility */}
              <Route path="/citizen" element={<CitizenDashboardPage />} />
              <Route path="/nagarsevak" element={<NagarSevakDashboardPage />} />
              <Route path="/staff" element={<StaffDashboardPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/superadmin" element={<SuperAdminDashboardPage />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
