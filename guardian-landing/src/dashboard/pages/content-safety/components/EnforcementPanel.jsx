import React, { useState } from 'react';
import { Shield, AlertCircle, EyeOff, Ban, Lock, Baby } from 'lucide-react';

export default function EnforcementPanel() {
  const [childSafety, setChildSafety] = useState(true);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5 text-fraud-cyan" /> Enforcement Actions
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-6 flex-grow">
        <button className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-colors group">
          <AlertCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Warning</span>
        </button>
        <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-colors group">
          <EyeOff className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Blur Content</span>
        </button>
        <button className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-colors group">
          <Ban className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Block Access</span>
        </button>
        <button className="bg-slate-900 hover:bg-slate-800 border border-slate-900 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-colors shadow-sm group">
          <Lock className="w-6 h-6 text-fraud-cyan group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Admin Lock</span>
        </button>
      </div>

      {/* Child Safety Mode Toggle */}
      <div className={`rounded-xl p-4 border transition-colors flex items-center justify-between ${childSafety ? 'bg-fraud-cyan/10 border-fraud-cyan/30' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shadow-sm ${childSafety ? 'bg-white border-fraud-cyan/30' : 'bg-white border-slate-200'}`}>
             <Baby className={`w-5 h-5 ${childSafety ? 'text-fraud-cyan' : 'text-slate-400'}`} />
          </div>
          <div>
            <h4 className={`font-bold text-sm ${childSafety ? 'text-slate-900' : 'text-slate-500'}`}>Child Safety Mode</h4>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Strict filtering enabled</p>
          </div>
        </div>
        
        <button 
          onClick={() => setChildSafety(!childSafety)}
          className={`w-12 h-6 rounded-full relative transition-colors ${childSafety ? 'bg-fraud-cyan' : 'bg-slate-300'}`}
        >
          <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${childSafety ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>
    </div>
  );
}
