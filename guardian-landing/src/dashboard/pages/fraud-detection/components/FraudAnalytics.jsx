import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Bell, Radio } from 'lucide-react';

export default function FraudAnalytics() {
  const [apiEnabled, setApiEnabled] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
      {/* API Toggle Card */}
      <div className="bg-guardian-section rounded-3xl border border-guardian-border p-6 backdrop-blur-md flex flex-col justify-between">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${apiEnabled ? 'bg-guardian-blue/20 text-guardian-blue' : 'bg-guardian-card text-guardian-secondary'}`}>
              <Zap size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-guardian-body">External API Sync</h4>
              <p className="text-[10px] text-guardian-secondary font-medium uppercase tracking-widest">Global Intelligence</p>
            </div>
          </div>
          <button 
            onClick={() => setApiEnabled(!apiEnabled)}
            className={`w-12 h-6 rounded-full p-1 transition-all ${apiEnabled ? 'bg-guardian-blue' : 'bg-guardian-border'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-all ${apiEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
        <p className="text-[11px] text-guardian-secondary leading-relaxed">
          Enable or disable real-time synchronization with external fraud intelligence databases and global blacklists.
        </p>
      </div>

      {/* Real-time Alerts Card */}
      <div className="bg-guardian-section rounded-3xl border border-guardian-border p-6 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center">
              <Bell size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-guardian-body">Critical Alerts</h4>
              <p className="text-[10px] text-guardian-secondary font-medium uppercase tracking-widest">High Risk Only</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-red-500/5 border border-red-500/10">
            <Radio size={12} className="text-red-500" />
            <p className="text-[10px] font-bold text-red-500 truncate">New phishing cluster detected in node #4</p>
          </div>
        </div>
      </div>

      {/* Fraud Trend Graph (Custom SVG) */}
      <div className="bg-guardian-section rounded-3xl border border-guardian-border p-6 backdrop-blur-md relative overflow-hidden group">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-guardian-blue/10 text-guardian-blue border border-guardian-blue/20 flex items-center justify-center">
              <Activity size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-guardian-body">Fraud Frequency</h4>
              <p className="text-[10px] text-guardian-secondary font-medium uppercase tracking-widest">Last 24 Hours</p>
            </div>
          </div>
        </div>
        
        <div className="h-24 w-full relative pt-4">
          <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,50 Q20,20 40,40 T80,10 T120,45 T160,25 T200,35" 
              fill="none" 
              stroke="#2563EB" 
              strokeWidth="2"
              className="group-hover:stroke-guardian-blue transition-all"
            />
            <path 
              d="M0,50 Q20,20 40,40 T80,10 T120,45 T160,25 T200,35 L200,60 L0,60 Z" 
              fill="url(#blueGradient)"
            />
          </svg>
          <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-10">
            {[...Array(7)].map((_, i) => <div key={i} className="border-r border-guardian-heading h-full" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
