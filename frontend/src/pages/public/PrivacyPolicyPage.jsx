import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Digital Personal Data Protection Act, 2023 Compliance
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Privacy Policy & Data Fiduciary Disclosure
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Effective Date: 01 November 2026 • Policy Version: 2.1 (DPDP-IND-2026)
          </p>
        </div>

        <section className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            1. Identity of the Data Fiduciary
          </h2>
          <p>
            JANSEVA ("Platform", "we", "us") operates as a technical data fiduciary in partnership with the respective Municipal Corporation or Council (the primary civic authority). 
            For any queries or grievance redressal regarding your personal data, contact our designated Grievance Redressal Officer at <strong className="text-blue-400">privacy@janseva.in</strong>.
          </p>
        </section>

        <section className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            2. Data We Collect and Purpose Limitation
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Essential Account Data</strong>: Full name, mobile number, email address for authentication and civic ticketing.</li>
            <li><strong>Civic Grievance Information</strong>: Description of civic defect, photographic/video evidence, GPS coordinates.</li>
            <li><strong>Technical Metadata</strong>: IP address, device telemetry, timestamps for security audit logs and abuse prevention.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            3. Strict Non-Public Redaction Policy
          </h2>
          <p>
            We strictly enforce that personal data such as your mobile phone number, email address, and exact residential address are <strong>never exposed on public dashboards or public maps</strong>. Public records display only anonymized complaint IDs, general ward localities, and verified status.
          </p>
        </section>

        <section className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            4. Your Rights under the DPDP Act 2023
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <strong className="text-white block mb-1">Right to Access & Summary</strong>
              Review all personal information stored about your civic activity via your Citizen Privacy Dashboard.
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <strong className="text-white block mb-1">Right to Correction & Erasure</strong>
              Request correction of inaccurate information or deletion of non-statutory records.
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <strong className="text-white block mb-1">Right to Withdraw Consent</strong>
              Revoke optional geolocation or notification permissions at any time without loss of core services.
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <strong className="text-white block mb-1">Right of Grievance Redressal</strong>
              Submit privacy complaints directly to the Municipal Data Protection Officer with response within 7 days.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
