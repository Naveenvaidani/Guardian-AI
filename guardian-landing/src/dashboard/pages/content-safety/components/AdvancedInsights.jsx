import React from 'react';
import { BarChart, Clock, Hash, Download } from 'lucide-react';

export default function AdvancedInsights() {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 border border-slate-200 backdrop-blur-xl h-full flex flex-col shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
        <BarChart className="w-6 h-6 text-fraud-cyan" />
        Insights
      </h2>
      
      <div className="flex flex-col gap-6 flex-grow">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">Model Weights</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-900 mb-1">
                <span className="font-medium">Aura-Sync</span>
                <span className="font-medium text-slate-500">30%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-fraud-cyan h-2 rounded-full shadow-sm" style={{width: '30%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-900 mb-1">
                <span className="font-medium">NeuroPulse</span>
                <span className="font-medium text-slate-500">40%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-fraud-cyan h-2 rounded-full shadow-sm" style={{width: '40%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-900 mb-1">
                <span className="font-medium">Synth-Slayer</span>
                <span className="font-medium text-slate-500">30%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-fraud-cyan h-2 rounded-full shadow-sm" style={{width: '30%'}}></div></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm backdrop-blur-md">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
             <Clock className="w-5 h-5 text-fraud-cyan" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Processing Time</p>
            <p className="text-lg font-bold text-slate-900">1,240 ms</p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm backdrop-blur-md">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
             <Hash className="w-5 h-5 text-fraud-cyan" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Request ID</p>
            <p className="text-sm font-mono font-bold text-slate-900">req_9x2b4p1</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="flex-1 bg-white border border-slate-200 hover:border-fraud-cyan hover:bg-slate-50 text-slate-900 py-2.5 rounded-xl text-sm font-medium transition-all flex justify-center items-center gap-2 shadow-sm hover:shadow-[0_0_15px_rgba(0,191,165,0.1)]">
          <Download className="w-4 h-4" /> PDF
        </button>
        <button className="flex-1 bg-white border border-slate-200 hover:border-fraud-cyan hover:bg-slate-50 text-slate-900 py-2.5 rounded-xl text-sm font-medium transition-all flex justify-center items-center gap-2 shadow-sm hover:shadow-[0_0_15px_rgba(0,191,165,0.1)]">
          <Download className="w-4 h-4" /> JSON
        </button>
      </div>
    </div>
  );
}
