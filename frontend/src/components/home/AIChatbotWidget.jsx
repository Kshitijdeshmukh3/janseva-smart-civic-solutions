import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Mic, 
  CornerDownLeft, 
  ShieldCheck, 
  User, 
  Paperclip,
  CheckCircle2
} from 'lucide-react';

export default function AIChatbotWidget({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'mr' 
        ? 'नमस्कार! मी जनसेवा AI सहाय्यक आहे. मी आपल्याला तक्रार नोंदवण्यात, कामाची स्थिती ट्रॅक करण्यात किंवा सरकारी योजनांची माहिती देण्यात मदत करू शकतो. मी कशी मदत करू?'
        : lang === 'hi'
        ? 'नमस्ते! मैं जनसेवा AI सहायक हूँ। मैं शिकायत दर्ज करने, स्थिति ट्रैक करने या नगर निगम सेवाओं की जानकारी देने में आपकी सहायता कर सकता हूँ। बताएं मैं क्या मदद करूँ?'
        : 'Hello! I am your JANSEVA AI Assistant. I can help you file a complaint in simple words, track complaint status, or check area development works. How may I assist you today?',
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputValue.trim(),
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Context-aware simulated assistant response
    setTimeout(() => {
      let reply = '';
      const lower = userMsg.text.toLowerCase();

      if (lower.includes('pothole') || lower.includes('खड्डा') || lower.includes('गड्ढा') || lower.includes('road')) {
        reply = lang === 'mr'
          ? 'मी रस्त्यावरील खड्ड्याची तक्रार ओळखली आहे. कृपया आपला प्रभाग किंवा परिसराचे नाव सांगा (उदा. कोथरूड डीपी रोड) जेणेकरून मी त्वरित मसुदा तयार करू शकेन.'
          : lang === 'hi'
          ? 'मैंने सड़क के गड्ढे की समस्या पहचानी है। कृपया अपना वार्ड या क्षेत्र बताएं (जैसे कोथरुड मेन रोड) ताकि मैं तुरंत शिकायत ड्राफ्ट कर सकूँ।'
          : 'I detected a road pothole problem! Would you like me to draft a complaint for the Roads Department? Please specify your ward or landmark.';
      } else if (lower.includes('water') || lower.includes('पाणी') || lower.includes('पानी')) {
        reply = lang === 'mr'
          ? 'पाणीपुरवठा विभागाकडे नोंद करण्यासाठी: गळती आहे की पाणी आले नाही? आपण फोटो असल्यास अपलोड करू शकता.'
          : 'For Water Supply: Is there a pipeline leakage or low pressure? You can also upload a photo for priority verification.';
      } else if (lower.includes('track') || lower.includes('status') || lower.includes('ट्रॅक') || lower.includes('स्थिती')) {
        reply = 'Please enter your Complaint Tracking Number (e.g. JS-2026-00125) to see real-time staff progress and SLA deadline.';
      } else {
        reply = lang === 'mr'
          ? 'धन्यवाद! आपली माहिती नोंदवून घेतली आहे. अधिकृत कारवाईसाठी नगर निगम कर्मचाऱ्यांद्वारे पडताळणी केली जाईल.'
          : 'Thank you! I have understood your concern. In JANSEVA, all AI triaged records are routed to authorized municipal personnel for SLA-governed action.';
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        time: 'Just now'
      }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 p-0 bg-slate-950/60 backdrop-blur-sm">
      <div className="w-full sm:max-w-md h-[90vh] sm:h-[600px] bg-slate-900 border border-slate-700 sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 text-white flex items-center justify-between border-b border-blue-600/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Bot className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-wide">JANSEVA AI Assistant</h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                  Multilingual
                </span>
              </div>
              <p className="text-[11px] text-blue-200">Smart Municipal Guidance & Triaging</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DPDP Safeguard Banner */}
        <div className="bg-slate-850 px-3 py-1.5 border-b border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            DPDPA 2023 Compliant • No PII shared with public AI models
          </span>
          <span className="text-slate-500 uppercase font-mono">{lang}</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-sky-400 border border-slate-700'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                <span className="block mt-1 text-[9px] opacity-60 text-right">
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 pl-9">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75"></span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-150"></span>
              <span className="text-[10px]">Analyzing civic issue...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 bg-slate-950 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <button
            onClick={() => setInputValue('Report a broken streetlight')}
            className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700"
          >
            💡 Broken Streetlight
          </button>
          <button
            onClick={() => setInputValue('Report pothole on main road')}
            className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700"
          >
            🚧 Road Pothole
          </button>
          <button
            onClick={() => setInputValue('Check water cut schedule')}
            className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700"
          >
            💧 Water Schedule
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <button
            type="button"
            title="Attach image or photo"
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-850 border border-slate-800"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Voice input in Marathi, Hindi, English"
            className="p-2 text-blue-400 hover:text-blue-300 rounded-lg bg-blue-500/10 border border-blue-500/20"
          >
            <Mic className="w-4 h-4" />
          </button>
          <input
            type="text"
            placeholder={
              lang === 'mr'
                ? 'मराठीत किंवा इंग्रजीत संदेश टाईप करा...'
                : lang === 'hi'
                ? 'यहाँ अपनी समस्या लिखें...'
                : 'Type your message or civic concern...'
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-slate-850 text-white placeholder-slate-400 text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
