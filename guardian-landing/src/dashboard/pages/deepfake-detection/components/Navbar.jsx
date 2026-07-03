import React from 'react';
import { Shield, Bell, User, Settings, LayoutDashboard, Activity, ChevronDown, LogOut, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full bg-white/70 border-b border-slate-200 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center">
          <img src="/Logo_transparent.png" alt="Guardian AI Logo" className="w-[180px] h-auto object-contain drop-shadow-md mix-blend-multiply" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Identity & Synth Suite</h1>
          <p className="text-sm font-bold text-fraud-cyan uppercase tracking-widest mt-0.5">Guardian AI</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="flex items-center gap-2 text-slate-900 font-medium hover:text-fraud-cyan transition-colors">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 text-slate-500 font-medium hover:text-fraud-cyan transition-colors">
          <Activity className="w-4 h-4" />
          Analytics
        </a>
        <a href="#" className="flex items-center gap-2 text-slate-500 font-medium hover:text-fraud-cyan transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </a>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors relative shadow-sm border border-slate-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-fraud-cyan rounded-full animate-pulse"></span>
        </button>
        
        {/* Profile Dropdown Trigger */}
        <button className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
          <div className="w-9 h-9 bg-fraud-cyan/10 border border-fraud-cyan/30 rounded-full flex items-center justify-center relative shadow-sm overflow-hidden">
             <span className="text-sm font-bold text-fraud-cyan">AU</span>
          </div>
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-sm font-bold text-slate-900 leading-tight">Admin User</span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Enterprise</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </button>
      </div>
    </nav>
  );
}
