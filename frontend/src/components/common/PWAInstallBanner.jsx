import React, { useState, useEffect } from 'react';
import { Download, Monitor, Smartphone, Apple, CheckCircle2, X, RefreshCw, Info, ChevronRight } from 'lucide-react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [appUpdateAvailable, setAppUpdateAvailable] = useState(false);
  const [clientPlatform, setClientPlatform] = useState('desktop'); // 'ios', 'android', 'windows', 'macos', 'desktop'

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isRunningStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsStandalone(isRunningStandalone);

    // Detect Platform
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setClientPlatform('ios');
    } else if (/android/.test(ua)) {
      setClientPlatform('android');
    } else if (/win/.test(ua)) {
      setClientPlatform('windows');
    } else if (/mac/.test(ua)) {
      setClientPlatform('macos');
    } else {
      setClientPlatform('desktop');
    }

    // Capture PWA install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Capture app update event from service worker
    const handleAppUpdate = () => {
      setAppUpdateAvailable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('janseva-app-update-available', handleAppUpdate);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('janseva-app-update-available', handleAppUpdate);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Open installation instructions modal tailored to platform
      setShowGuideModal(true);
    }
  };

  const handleReloadApp = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg && reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  };

  // If running in standalone and no update, no banner needed
  if (isStandalone && !appUpdateAvailable) return null;
  if (isDismissed && !appUpdateAvailable) return null;

  return (
    <>
      {/* 1. App Update Available Alert */}
      {appUpdateAvailable && (
        <div className="bg-brand-600 text-white px-4 py-3 sticky top-0 z-50 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3 text-sm font-medium">
            <RefreshCw className="w-4 h-4 animate-spin text-purple-200" />
            <span>A new updated version of JANSEVA is available!</span>
          </div>
          <button
            onClick={handleReloadApp}
            className="px-3 py-1 bg-white text-brand-600 font-semibold text-xs rounded-lg hover:bg-brand-50 transition shadow"
          >
            Update & Refresh
          </button>
        </div>
      )}

      {/* 2. Install App Pill / Floating Banner */}
      {!isStandalone && !isDismissed && (
        <div className="bg-white border border-surface-border shadow-card rounded-2xl p-4 mx-4 my-2 lg:my-0 lg:mx-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 font-bold shrink-0">
              <Download className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-content-main flex items-center gap-2">
                Install JANSEVA App
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-status-successBg text-status-success">
                  Offline Ready
                </span>
              </h4>
              <p className="text-xs text-content-secondary">
                Install on your {clientPlatform === 'ios' ? 'iPhone / iPad' : clientPlatform === 'android' ? 'Android Device' : 'Computer'} for fast 1-tap access and instant civic updates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium text-xs rounded-xl shadow transition flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              {deferredPrompt ? 'Install App' : 'How to Install'}
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-2 text-content-muted hover:text-content-main rounded-lg"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Comprehensive Multi-Platform Installation Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-modal border border-surface-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-surface-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-content-main">Install JANSEVA Application</h3>
                  <p className="text-xs text-content-secondary">Platform-specific step-by-step instructions</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-content-muted hover:text-content-main p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* iPhone / iPad */}
              <div className={`p-4 rounded-xl border ${clientPlatform === 'ios' ? 'border-brand-500 bg-brand-50/40' : 'border-surface-border bg-surface-bg'}`}>
                <div className="flex items-center gap-2 font-bold text-sm text-content-main mb-2">
                  <Apple className="w-4 h-4 text-brand-600" />
                  <span>Apple iPhone / iPad (Safari)</span>
                  {clientPlatform === 'ios' && (
                    <span className="text-[10px] bg-brand-600 text-white px-2 py-0.5 rounded-full ml-auto">Detected Device</span>
                  )}
                </div>
                <ol className="text-xs text-content-secondary space-y-1.5 list-decimal list-inside ml-1">
                  <li>Open <span className="font-semibold text-content-main">Safari</span> browser on your iOS device.</li>
                  <li>Tap the <span className="font-semibold text-content-main">Share button</span> (square icon with an arrow pointing up at the bottom).</li>
                  <li>Scroll down and tap <span className="font-semibold text-content-main">"Add to Home Screen"</span>.</li>
                  <li>Tap <span className="font-semibold text-brand-600">"Add"</span> at the top right to install JANSEVA icon.</li>
                </ol>
              </div>

              {/* Android */}
              <div className={`p-4 rounded-xl border ${clientPlatform === 'android' ? 'border-brand-500 bg-brand-50/40' : 'border-surface-border bg-surface-bg'}`}>
                <div className="flex items-center gap-2 font-bold text-sm text-content-main mb-2">
                  <Smartphone className="w-4 h-4 text-brand-600" />
                  <span>Android (Chrome & Samsung Internet)</span>
                  {clientPlatform === 'android' && (
                    <span className="text-[10px] bg-brand-600 text-white px-2 py-0.5 rounded-full ml-auto">Detected Device</span>
                  )}
                </div>
                <ol className="text-xs text-content-secondary space-y-1.5 list-decimal list-inside ml-1">
                  <li>Tap the <span className="font-semibold text-content-main">three dots (⋮)</span> at the top-right corner of Chrome.</li>
                  <li>Select <span className="font-semibold text-content-main">"Install App"</span> or <span className="font-semibold text-content-main">"Add to Home screen"</span>.</li>
                  <li>Confirm by tapping <span className="font-semibold text-brand-600">"Install"</span>.</li>
                </ol>
              </div>

              {/* Windows PC */}
              <div className={`p-4 rounded-xl border ${clientPlatform === 'windows' ? 'border-brand-500 bg-brand-50/40' : 'border-surface-border bg-surface-bg'}`}>
                <div className="flex items-center gap-2 font-bold text-sm text-content-main mb-2">
                  <Monitor className="w-4 h-4 text-brand-600" />
                  <span>Windows PC (Chrome & Edge)</span>
                  {clientPlatform === 'windows' && (
                    <span className="text-[10px] bg-brand-600 text-white px-2 py-0.5 rounded-full ml-auto">Detected Device</span>
                  )}
                </div>
                <ol className="text-xs text-content-secondary space-y-1.5 list-decimal list-inside ml-1">
                  <li>Look at the right side of the browser address bar for the <span className="font-semibold text-content-main">Install icon (computer with down arrow)</span>.</li>
                  <li>Click <span className="font-semibold text-brand-600">"Install JANSEVA"</span>.</li>
                  <li>A desktop shortcut and standalone window will be created automatically.</li>
                </ol>
              </div>

              {/* macOS */}
              <div className={`p-4 rounded-xl border ${clientPlatform === 'macos' ? 'border-brand-500 bg-brand-50/40' : 'border-surface-border bg-surface-bg'}`}>
                <div className="flex items-center gap-2 font-bold text-sm text-content-main mb-2">
                  <Monitor className="w-4 h-4 text-brand-600" />
                  <span>Apple macOS (Safari & Chrome)</span>
                  {clientPlatform === 'macos' && (
                    <span className="text-[10px] bg-brand-600 text-white px-2 py-0.5 rounded-full ml-auto">Detected Device</span>
                  )}
                </div>
                <ol className="text-xs text-content-secondary space-y-1.5 list-decimal list-inside ml-1">
                  <li>In Safari (macOS Sonoma+): Click <span className="font-semibold text-content-main">File &rarr; Add to Dock</span>.</li>
                  <li>In Chrome: Click the <span className="font-semibold text-content-main">Install icon</span> in the address bar.</li>
                </ol>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition"
              >
                Understood, Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
