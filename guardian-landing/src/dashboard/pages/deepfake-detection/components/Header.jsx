import React from 'react';
import { Upload } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Identity & Synth Suite</h1>
        <p className="text-slate-500">Multi-modal neural verification powered by Aura-Sync, NeuroPulse, and Synth-Slayer engines.</p>
      </div>
      <button className="mt-4 md:mt-0 bg-fraud-cyan hover:bg-fraud-cyan-dark text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(0,191,165,0.3)] hover:shadow-[0_0_25px_rgba(0,191,165,0.5)] flex items-center gap-2">
        <Upload className="w-5 h-5" />
        Upload File
      </button>
    </div>
  );
}
