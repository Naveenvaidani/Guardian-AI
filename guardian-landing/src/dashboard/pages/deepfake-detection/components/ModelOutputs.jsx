import React, { useState } from 'react';
import { User, Activity, Radio, Target, XCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function ModelOutputs() {
  const [heatmap, setHeatmap] = useState(false);

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* 3 Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Biometric */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col items-center text-center relative overflow-hidden backdrop-blur-md">
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-3 border border-slate-100">
            <User className="w-5 h-5 text-fraud-cyan" />
          </div>
          <h3 className="text-sm font-semibold text-slate-500 mb-1 w-full truncate">Aura-Sync Biometrics</h3>
          <p className="text-lg font-bold text-slate-900 mb-3">Verified</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
            <div className="bg-fraud-cyan h-2 rounded-full shadow-sm" style={{ width: '92%' }}></div>
          </div>
          <p className="text-xs text-slate-500">92% Confidence</p>
        </div>

        {/* Liveness */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col items-center text-center relative backdrop-blur-md">
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-3 relative border border-slate-100">
            <Activity className="w-5 h-5 text-fraud-cyan" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
          <h3 className="text-sm font-semibold text-slate-500 mb-1 w-full truncate">NeuroPulse Anti-Spoof</h3>
          <p className="text-lg font-bold text-red-600 mb-3">Spoof</p>
          <div className="px-4 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-medium whitespace-nowrap">
            Type: Mask
          </div>
        </div>

        {/* Deepfake */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col items-center text-center backdrop-blur-md">
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-3 border border-slate-100">
            <Radio className="w-5 h-5 text-fraud-cyan" />
          </div>
          <h3 className="text-sm font-semibold text-slate-500 mb-1 w-full truncate">Synth-Slayer Engine</h3>
          <p className="text-lg font-bold text-amber-600 mb-3">AI Generated</p>
          <button 
            onClick={() => setHeatmap(!heatmap)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-colors border flex items-center gap-1.5 ${heatmap ? 'bg-fraud-cyan text-white border-fraud-cyan shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-fraud-cyan'}`}
          >
            {heatmap ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {heatmap ? 'Heatmap: ON' : 'Heatmap: OFF'}
          </button>
        </div>
      </div>

      {/* Fusion Engine */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 backdrop-blur-xl p-6 flex-grow flex flex-col shadow-sm relative overflow-hidden">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2 relative z-10">
          <Target className="w-5 h-5 text-fraud-cyan" />
          Nexus Fusion Core
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-around flex-grow gap-6 relative z-10 w-full">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase">Unified Decision</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-slate-500 text-sm">Models</span>
              <ArrowRight className="w-3 h-3 text-fraud-cyan" />
              <span className="text-slate-500 text-sm">Fusion</span>
              <ArrowRight className="w-3 h-3 text-fraud-cyan" />
              <span className="font-medium text-slate-900 text-sm">Verdict</span>
            </div>
          </div>

          <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
             <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="transparent" stroke="#F1F5F9" strokeWidth="12" />
                <circle cx="64" cy="64" r="56" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="351.85" strokeDashoffset={351.85 - (351.85 * 85) / 100} className="transition-all duration-1000" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">85</span>
                <span className="text-xs font-medium text-slate-500">Risk Score</span>
             </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full md:w-auto min-w-[120px]">
            <div className="px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-center shadow-sm backdrop-blur-md flex flex-col justify-center h-full">
              <span className="block text-xs font-semibold text-red-600 uppercase mb-1">Risk Level</span>
              <span className="block text-xl font-bold text-red-700">High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verdict Card */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start md:items-center justify-center gap-4 shadow-sm backdrop-blur-md flex-col md:flex-row text-center md:text-left">
        <XCircle className="w-10 h-10 text-red-500 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-bold text-red-700">Fake / Suspicious</h2>
          <p className="text-red-600 text-sm mt-1">Multiple models indicate synthesis and spoofing attempts.</p>
        </div>
      </div>
    </div>
  );
}
