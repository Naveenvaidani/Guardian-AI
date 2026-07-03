import React from 'react';
import { Smartphone, Globe, Cloud, ScanSearch, Monitor, Cpu, ShieldBan, AppWindow, BrainCircuit, Network } from 'lucide-react';

export default function SystemLayers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Device-Level Monitoring */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Smartphone className="w-24 h-24 text-fraud-cyan" />
        </div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
            <Smartphone className="w-6 h-6 text-fraud-cyan" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Device-Level<br/>Monitoring</h2>
        </div>
        <ul className="space-y-3 relative z-10">
          <li className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <ScanSearch className="w-4 h-4 text-fraud-cyan" /> File scanning
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <Monitor className="w-4 h-4 text-fraud-cyan" /> Screenshot detection
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <Cpu className="w-4 h-4 text-fraud-cyan" /> Background agent
          </li>
        </ul>
      </div>

      {/* Platform-Level Control */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Globe className="w-24 h-24 text-blue-500" />
        </div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
            <Globe className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Platform-Level<br/>Control</h2>
        </div>
        <ul className="space-y-3 relative z-10">
          <li className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <ShieldBan className="w-4 h-4 text-blue-500" /> Browser blocking
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <AppWindow className="w-4 h-4 text-blue-500" /> App monitoring
          </li>
        </ul>
      </div>

      {/* Cloud AI Intelligence */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Cloud className="w-24 h-24 text-indigo-500" />
        </div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
            <Cloud className="w-6 h-6 text-indigo-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Cloud AI<br/>Intelligence</h2>
        </div>
        <ul className="space-y-3 relative z-10">
          <li className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <BrainCircuit className="w-4 h-4 text-indigo-500" /> Multi-modal detection
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <Network className="w-4 h-4 text-indigo-500" /> Central control
          </li>
        </ul>
      </div>
    </div>
  );
}
