import React, { useState } from 'react';
import HeroSection from '../../components/home/HeroSection';
import StatsBanner from '../../components/home/StatsBanner';
import CategoriesGrid from '../../components/home/CategoriesGrid';
import HowItWorks from '../../components/home/HowItWorks';
import LatestProjects from '../../components/home/LatestProjects';
import PublicAnnouncements from '../../components/home/PublicAnnouncements';
import AreaMapPreview from '../../components/home/AreaMapPreview';
import EmergencyBanner from '../../components/home/EmergencyBanner';
import AIChatbotWidget from '../../components/home/AIChatbotWidget';
import { Bot, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [aiChatOpen, setAiChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <EmergencyBanner />
      <HeroSection onOpenAIChat={() => setAiChatOpen(true)} />
      <StatsBanner />
      <CategoriesGrid />
      <HowItWorks />
      <AreaMapPreview />
      <LatestProjects />
      <PublicAnnouncements />

      {/* Floating AI Assistant Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAiChatOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-4 py-3 rounded-full shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all border border-blue-400/30 group"
          title="Open JANSEVA AI Multilingual Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <span className="text-sm font-semibold tracking-wide pr-1">Ask Janseva AI</span>
          <Sparkles className="w-4 h-4 text-sky-200 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* AI Chatbot Dialog */}
      <AIChatbotWidget isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </div>
  );
}
