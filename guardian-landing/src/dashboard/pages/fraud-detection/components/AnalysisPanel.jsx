import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Globe, FileCheck, Mic, Search, ChevronRight } from 'lucide-react';

const AnalysisCard = ({ title, status, confidence, insight, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="bg-guardian-section rounded-3xl border border-guardian-border p-6 hover:border-guardian-blue/40 transition-all group relative overflow-hidden flex flex-col justify-between"
  >
    {/* Background Glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-guardian-blue/5 rounded-full blur-3xl group-hover:bg-guardian-blue/10 transition-all pointer-events-none" />
    
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-guardian-card border border-guardian-border flex items-center justify-center text-guardian-blue group-hover:scale-110 group-hover:bg-guardian-blue group-hover:text-white transition-all duration-300">
          <Icon size={24} />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-tighter mb-1">
            {status}
          </span>
          <span className="text-[10px] font-bold text-guardian-secondary uppercase tracking-widest">Conf: {confidence}</span>
        </div>
      </div>

      <h4 className="text-sm font-bold text-guardian-body mb-2 group-hover:text-guardian-blue transition-colors">{title}</h4>
      <p className="text-[11px] text-guardian-secondary font-medium leading-relaxed">
        {insight}
      </p>
    </div>

    <div className="mt-6 pt-4 border-t border-guardian-border/50 flex items-center justify-between">
      <span className="text-[10px] font-black text-guardian-secondary uppercase tracking-widest">Real-time Stream</span>
      <ChevronRight size={14} className="text-guardian-secondary group-hover:text-guardian-blue group-hover:translate-x-1 transition-all" />
    </div>
  </motion.div>
);

export default function AnalysisPanel() {
  const models = [
    { 
      title: "Fraud Classification Model", 
      status: "Active", 
      confidence: "92%", 
      insight: "Detected phishing pattern in message text", 
      icon: Shield 
    },
    { 
      title: "Trust Score Engine", 
      status: "Running", 
      confidence: "88%", 
      insight: "Low trust score due to mismatched sender domain", 
      icon: Target 
    },
    { 
      title: "Global Scam Database Check", 
      status: "Synced", 
      confidence: "95%", 
      insight: "URL found in known scam registry", 
      icon: Globe 
    },
    { 
      title: "Document Authenticity Model", 
      status: "Verified", 
      confidence: "90%", 
      insight: "Metadata mismatch in uploaded document", 
      icon: FileCheck 
    },
    { 
      title: "Deepfake Detection Model", 
      status: "Scanned", 
      confidence: "85%", 
      insight: "Possible synthetic voice detected", 
      icon: Mic 
    },
    { 
      title: "Explanation Engine", 
      status: "Complete", 
      confidence: "97%", 
      insight: "Consolidated reasoning for final verdict", 
      icon: Search 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {models.map((model, i) => (
        <AnalysisCard key={i} {...model} delay={0.1 * i} />
      ))}
    </div>
  );
}
