import React, { useState } from 'react';
import { Shield, Globe, User } from 'lucide-react';
import InputPanel from './components/InputPanel';
import ModelOutputs from './components/ModelOutputs';
import AdvancedInsights from './components/AdvancedInsights';
import LogsTable from './components/LogsTable';

export default function DeepfakeDetection() {
  const [mode, setMode] = useState('enterprise'); // government, enterprise, personal

  return (
    <div className="w-full flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500/20">
      
      {/* Dark Navy Header Banner - Matches design exactly & stretches edge-to-edge */}
      <div className="bg-[#0A192F] text-white p-6 md:p-8 lg:px-12 rounded-none -mx-4 md:-mx-8 lg:-mx-10 -mt-4 md:-mt-8 lg:-mt-10 border-b border-[#112240] flex flex-col items-start gap-6 shadow-xl relative overflow-hidden w-auto animate-[fadeIn_0.2s_ease-out] shrink-0">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">OPERATING MODE:</span>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
              mode === 'government' ? 'bg-[#1D4ED8] text-white border border-[#3B82F6]/30' :
              mode === 'enterprise' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
            }`}>
              {mode.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-col gap-8 flex-grow">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Deepfake & Identity Security
            </h1>
            <span className="px-2 py-0.5 border border-red-500/30 bg-red-500/10 text-red-400 text-[9px] font-bold tracking-widest uppercase rounded">LIVE PIPELINE</span>
          </div>
        </div>

        {/* Mode Selector Pill inside Banner - Positioned below dashboard name */}
        <div className="relative z-10 shrink-0 bg-[#020C1B]/80 p-1.5 rounded-full border border-[#1E2D3D] flex items-center gap-1.5">
          <button 
            onClick={() => setMode('personal')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
              mode === 'personal' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User size={13} /> Personal Mode
          </button>
          
          <button 
            onClick={() => setMode('enterprise')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
              mode === 'enterprise' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield size={13} /> Standard Mode
          </button>
          
          <button 
            onClick={() => setMode('government')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
              mode === 'government' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe size={13} /> Government Mode
          </button>
        </div>
      </div>

      {/* Main content wrapped inside the dashboard container */}
      <div className="dashboard-container py-8 space-y-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-3">
            <InputPanel />
          </div>
          
          <div className="lg:col-span-6 mb-4 lg:mb-0">
            <ModelOutputs />
          </div>
          
          <div className="lg:col-span-3 mb-4 lg:mb-0">
            <AdvancedInsights />
          </div>
        </div>

        <LogsTable />
        
        <footer className="mt-12 pt-6 pb-2 text-center text-sm text-slate-500 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full"></div>
          <p className="mt-4 font-medium tracking-wide text-slate-400">Powered by Guardian AI Intelligence Layer</p>
        </footer>
      </div>
    </div>
  );
}