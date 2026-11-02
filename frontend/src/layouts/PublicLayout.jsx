import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PWAInstallBanner from '../components/common/PWAInstallBanner';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-bg text-content-main antialiased selection:bg-brand-600 selection:text-white">
      <PWAInstallBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
