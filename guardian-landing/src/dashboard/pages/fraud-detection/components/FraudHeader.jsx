import React from 'react';
import { Settings, Moon, Sun, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FraudHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-guardian-heading tracking-tight flex items-center gap-3">
          AI Fraud & Scam Detection Chatbot
          <span className="px-2 py-0.5 rounded-full bg-guardian-blue/10 border border-guardian-blue/20 text-[10px] text-guardian-blue font-bold uppercase tracking-widest">Live</span>
        </h1>
        <p className="text-guardian-body text-sm font-medium mt-1">Real-time fraud analysis powered by multi-model intelligence</p>
      </motion.div>
    </div>
  );
}
