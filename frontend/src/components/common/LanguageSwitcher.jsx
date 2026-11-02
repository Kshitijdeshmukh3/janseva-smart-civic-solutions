import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative inline-flex items-center bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-lg px-2.5 py-1 text-xs text-white">
      <Globe className="w-3.5 h-3.5 mr-1.5 opacity-80" />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent font-medium cursor-pointer focus:outline-none appearance-none pr-3"
      >
        <option value="en" className="text-slate-800">English</option>
        <option value="hi" className="text-slate-800">हिन्दी (Hindi)</option>
        <option value="mr" className="text-slate-800">मराठी (Marathi)</option>
      </select>
      <span className="pointer-events-none absolute right-2 text-[10px]">▼</span>
    </div>
  );
}
