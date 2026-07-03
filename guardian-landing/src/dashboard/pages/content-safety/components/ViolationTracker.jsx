import React from 'react';
import { AlertOctagon, TrendingUp, Filter } from 'lucide-react';

export default function ViolationTracker() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-red-500" /> Violation Tracker
        </h3>
        <button className="text-slate-400 hover:text-slate-900 transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        {/* Mock Timeline Visualization */}
        <div className="relative h-32 w-full flex items-end justify-between px-2 gap-2">
          {/* Background grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between border-y border-slate-100 pointer-events-none">
            <div className="w-full border-t border-slate-100 border-dashed h-0" />
            <div className="w-full border-t border-slate-100 border-dashed h-0" />
            <div className="w-full border-t border-slate-100 border-dashed h-0" />
          </div>

          {/* Bars */}
          <div className="w-full bg-blue-100 rounded-t-sm h-[30%] relative z-10 hover:bg-blue-200 transition-colors cursor-pointer group">
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Image: 12</div>
          </div>
          <div className="w-full bg-red-200 rounded-t-sm h-[70%] relative z-10 hover:bg-red-300 transition-colors cursor-pointer group">
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Video: 28</div>
          </div>
          <div className="w-full bg-blue-100 rounded-t-sm h-[40%] relative z-10 hover:bg-blue-200 transition-colors cursor-pointer group">
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Image: 16</div>
          </div>
          <div className="w-full bg-red-500 rounded-t-sm h-[90%] relative z-10 hover:bg-red-600 transition-colors cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.3)] group">
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Website: 45</div>
          </div>
          <div className="w-full bg-red-200 rounded-t-sm h-[50%] relative z-10 hover:bg-red-300 transition-colors cursor-pointer group">
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Video: 20</div>
          </div>
          <div className="w-full bg-blue-100 rounded-t-sm h-[20%] relative z-10 hover:bg-blue-200 transition-colors cursor-pointer group">
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Image: 8</div>
          </div>
          <div className="w-full bg-red-200 rounded-t-sm h-[60%] relative z-10 hover:bg-red-300 transition-colors cursor-pointer group">
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Video: 24</div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-slate-400 mt-2 font-semibold">
          <span>9AM</span>
          <span>12PM</span>
          <span>3PM</span>
          <span>Now</span>
        </div>
      </div>

      <div className="mt-6 flex justify-around border-t border-slate-100 pt-4">
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image</p>
          <p className="text-lg font-black text-slate-900">36</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Video</p>
          <p className="text-lg font-black text-slate-900">72</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Website</p>
          <p className="text-lg font-black text-red-500">45</p>
        </div>
      </div>
    </div>
  );
}
