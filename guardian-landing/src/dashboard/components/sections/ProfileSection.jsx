import React, { useState } from 'react';
import { Camera, Mail, Building2, Globe, LayoutGrid, List, CheckCircle2, Clock, Languages, Monitor, Maximize2 } from 'lucide-react';

export default function ProfileSection() {
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-guardian-heading mb-2 tracking-tight">Profile & Organization</h1>
        <p className="text-guardian-secondary font-medium">Manage your personal information and organization identity.</p>
      </div>

      {/* Profile Information */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl relative overflow-hidden">
        <h3 className="text-lg font-bold text-guardian-heading mb-8 flex items-center gap-3">
          <span className="w-2 h-2 bg-guardian-blue rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></span>
          Personal Identity
        </h3>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="relative group cursor-pointer">
              <div className="w-40 h-40 rounded-[2rem] bg-guardian-bg flex items-center justify-center overflow-hidden border-2 border-dashed border-guardian-border group-hover:border-dashboard-accent/50 transition-all">
                <Camera size={32} className="text-guardian-secondary group-hover:text-guardian-blue transition-colors" />
              </div>
              <div className="absolute inset-0 bg-guardian-blue/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <span className="text-guardian-heading text-xs font-black uppercase tracking-widest">Update</span>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2.5">
              <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" 
                defaultValue="Admin"
                className="w-full bg-guardian-bg border border-guardian-border rounded-2xl px-6 py-4 text-base font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 focus:ring-4 focus:ring-dashboard-accent/5 transition-all"
              />
            </div>
            <div className="space-y-2.5">
              <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  defaultValue="admin@guardian.ai"
                  className="w-full bg-guardian-bg border border-guardian-border rounded-2xl px-6 py-4 text-base font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 focus:ring-4 focus:ring-dashboard-accent/5 transition-all pr-28"
                />
                <button 
                  onClick={() => setIsVerifying(true)}
                  className="absolute right-2 top-2 px-4 py-2 bg-guardian-blue text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-guardian-blue/80 transition-all"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Details */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
        <h3 className="text-lg font-bold text-guardian-heading mb-8 flex items-center gap-3">
          <span className="w-2 h-2 bg-guardian-blue rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></span>
          Organization Governance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2.5">
            <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">Company Name</label>
            <input 
              type="text" 
              defaultValue="Guardian AI Global"
              className="w-full bg-guardian-bg border border-guardian-border rounded-2xl px-6 py-4 text-base font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 focus:ring-4 focus:ring-dashboard-accent/5 transition-all"
            />
          </div>
          <div className="space-y-2.5">
            <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">Organization Type</label>
            <select className="w-full bg-guardian-bg border border-guardian-border rounded-2xl px-6 py-4 text-base font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 focus:ring-4 focus:ring-dashboard-accent/5 transition-all appearance-none">
              <option>Startup</option>
              <option selected>Enterprise</option>
              <option>Agency</option>
            </select>
          </div>
          <div className="space-y-2.5">
            <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">Organization ID</label>
            <div className="bg-guardian-bg border border-guardian-border rounded-2xl px-6 py-4 text-sm font-mono text-guardian-blue/80 tracking-wider">
              ORG-8842-XLM-2026
            </div>
          </div>
        </div>
      </div>

      {/* Preferences & Appearance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
          <h3 className="text-lg font-bold text-guardian-heading mb-8 flex items-center gap-3">
            <Languages size={20} className="text-guardian-blue" />
            System Preferences
          </h3>
          <div className="space-y-8">
            <div className="space-y-2.5">
              <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">Time Zone</label>
              <select className="w-full bg-guardian-bg border border-guardian-border rounded-2xl px-6 py-4 text-base font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 transition-all appearance-none">
                <option>(GMT+05:30) Mumbai, New Delhi</option>
                <option>(GMT+00:00) London, United Kingdom</option>
              </select>
            </div>
            <div className="space-y-2.5">
              <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">Language</label>
              <select className="w-full bg-guardian-bg border border-guardian-border rounded-2xl px-6 py-4 text-base font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 transition-all appearance-none">
                <option>English (EN)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
          <h3 className="text-lg font-bold text-guardian-heading mb-8 flex items-center gap-3">
            <Monitor size={20} className="text-guardian-blue" />
            Visual Interface
          </h3>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">Theme Mode</label>
              <div className="flex gap-2 p-1.5 bg-guardian-bg rounded-2xl border border-guardian-border">
                {['Light', 'Dark', 'System'].map((mode) => (
                  <button 
                    key={mode}
                    className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                      mode === 'Dark' ? 'bg-guardian-blue text-white shadow-lg' : 'text-guardian-secondary hover:text-guardian-body'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">UI Density</label>
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-guardian-blue/10 border border-dashboard-accent/50 text-guardian-blue font-black text-[10px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2">
                  <Maximize2 size={16} /> Comfortable
                </button>
                <button className="flex-1 py-4 bg-guardian-bg border border-guardian-border text-guardian-secondary font-black text-[10px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-guardian-section transition-all">
                  <List size={16} /> Compact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {isVerifying && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-guardian-bg/80 backdrop-blur-md px-4">
          <div className="bg-guardian-section rounded-[3rem] p-12 max-w-md w-full shadow-2xl border border-guardian-border animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-guardian-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-dashboard-accent/20">
              <Mail className="text-guardian-blue" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-guardian-heading text-center mb-2 tracking-tight">Security Verification</h2>
            <p className="text-guardian-secondary text-center mb-10 font-medium">Verify your email to maintain enterprise-grade security.</p>
            
            <div className="flex justify-center gap-3 mb-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input 
                  key={i}
                  type="text"
                  maxLength="1"
                  className="w-12 h-16 bg-guardian-bg border border-guardian-border rounded-xl text-center text-2xl font-bold text-guardian-heading focus:border-dashboard-accent/50 focus:ring-4 focus:ring-dashboard-accent/5 outline-none transition-all"
                />
              ))}
            </div>

            <button 
              onClick={() => setIsVerifying(false)}
              className="w-full py-5 bg-guardian-blue text-white font-black uppercase tracking-widest rounded-2xl hover:bg-guardian-blue/80 transition-all mb-4 shadow-lg shadow-dashboard-accent/20"
            >
              Confirm Access
            </button>
            <button 
              onClick={() => setIsVerifying(false)}
              className="w-full text-guardian-secondary text-[10px] font-black uppercase tracking-[0.3em] hover:text-guardian-heading transition-colors"
            >
              Abort
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
