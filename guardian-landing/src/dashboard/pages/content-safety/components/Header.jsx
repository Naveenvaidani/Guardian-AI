import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Porn Ban & Restriction System</h1>
        <p className="text-slate-500 font-medium">Device + Platform + Cloud-level enforcement</p>
      </div>
      <button className="mt-4 md:mt-0 bg-fraud-cyan hover:bg-fraud-cyan-dark text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2">
        <ShieldCheck className="w-5 h-5" />
        Force Global Sync
      </button>
    </div>
  );
}
