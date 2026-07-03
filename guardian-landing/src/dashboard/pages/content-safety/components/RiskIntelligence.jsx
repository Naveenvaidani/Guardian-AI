import React from 'react';
import { ShieldAlert, TrendingUp, Cpu, Flame, Smartphone, Globe } from 'lucide-react';

export default function RiskIntelligence() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 backdrop-blur-xl p-6 h-full flex flex-col shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-fraud-cyan" />
        Risk Intelligence
      </h2>

      {/* Global Risk Score */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center mb-6 shadow-sm">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Network Risk Level</h3>
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center mb-2">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" fill="transparent" stroke="#E2E8F0" strokeWidth="12" />
            <circle cx="64" cy="64" r="56" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="351.85" strokeDashoffset={351.85 - (351.85 * 78) / 100} strokeLinecap="round" className="transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-900">78</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">/100</span>
          </div>
        </div>
        <p className="text-lg font-bold text-red-600">Elevated Threat</p>
      </div>

      {/* Per Device Risk */}
      <h3 className="text-sm font-bold text-slate-900 mb-4">Device Risk</h3>
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-white shadow-sm hover:border-slate-200 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Child's iPhone</p>
              <p className="text-[10px] font-semibold text-slate-500">3 blocks today</p>
            </div>
          </div>
          <span className="text-red-600 font-black text-sm">82/100</span>
        </div>
        <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-white shadow-sm hover:border-slate-200 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Family Mac</p>
              <p className="text-[10px] font-semibold text-slate-500">1 warning</p>
            </div>
          </div>
          <span className="text-orange-600 font-black text-sm">45/100</span>
        </div>
      </div>

      {/* Predictive Alerts */}
      <h3 className="text-sm font-bold text-slate-900 mb-4">Predictive AI Alerts</h3>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-sm flex-grow">
        <Cpu className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-red-700 mb-1">Behavioral Anomaly</h4>
          <p className="text-xs text-red-600/90 font-medium leading-relaxed">
            AI detects a 400% increase in adult keyword searches during late-night hours on <span className="font-bold">Child's iPhone</span>. Recommend enforcing Strict Schedule lock.
          </p>
        </div>
      </div>
    </div>
  );
}
