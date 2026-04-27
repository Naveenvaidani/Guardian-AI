import React, { useState } from 'react';
import { Camera, Mail, Building2, Globe, LayoutGrid, List, CheckCircle2 } from 'lucide-react';

export default function ProfileSection() {
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-guardian-navy mb-2">Profile & Organization</h1>
        <p className="text-guardian-secondary">Manage your personal information and organization details.</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <h3 className="text-lg font-bold text-guardian-navy mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-guardian-blue rounded-full"></span>
          Profile Information
        </h3>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-2xl bg-guardian-card flex items-center justify-center overflow-hidden border-2 border-dashed border-guardian-border group-hover:border-guardian-blue transition-all">
                <Camera size={32} className="text-guardian-secondary group-hover:text-guardian-blue" />
              </div>
              <div className="absolute inset-0 bg-guardian-navy/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-bold">Upload New</span>
              </div>
            </div>
            <p className="text-xs text-guardian-secondary font-medium uppercase tracking-wider">Profile Picture</p>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-guardian-navy">Full Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-guardian-border focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-guardian-navy">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-guardian-border focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all pr-24"
                />
                <button 
                  onClick={() => setIsVerifying(true)}
                  className="absolute right-2 top-1.5 px-3 py-1.5 bg-guardian-blue/10 text-guardian-blue text-xs font-bold rounded-lg hover:bg-guardian-blue/20 transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Details */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <h3 className="text-lg font-bold text-guardian-navy mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-guardian-blue rounded-full"></span>
          Organization Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-guardian-navy">Company Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-guardian-border focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-guardian-navy">Organization Type</label>
            <select className="w-full px-4 py-3 rounded-xl border border-guardian-border focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all bg-white">
              <option>Startup</option>
              <option>Enterprise</option>
              <option>Agency</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-guardian-navy">Organization ID</label>
            <div className="px-4 py-3 rounded-xl border border-guardian-border bg-guardian-section text-guardian-secondary font-mono text-sm">
              ORG-8842-XLM-2026
            </div>
          </div>
        </div>
      </div>

      {/* Preferences & Appearance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
          <h3 className="text-lg font-bold text-guardian-navy mb-6">Preferences</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-guardian-navy">Time Zone</label>
              <select className="w-full px-4 py-3 rounded-xl border border-guardian-border focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all bg-white">
                <option>(GMT+05:30) Mumbai, New Delhi</option>
                <option>(GMT+00:00) London</option>
                <option>(GMT-08:00) Pacific Time</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-guardian-navy">Language</label>
              <select className="w-full px-4 py-3 rounded-xl border border-guardian-border focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all bg-white">
                <option>English (EN)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
          <h3 className="text-lg font-bold text-guardian-navy mb-6">Appearance</h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-guardian-navy">Theme Mode</label>
              <div className="flex gap-2 p-1 bg-guardian-section rounded-xl border border-guardian-border">
                {['Light', 'Dark', 'System'].map((mode) => (
                  <button 
                    key={mode}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      mode === 'Light' ? 'bg-white shadow-sm text-guardian-blue' : 'text-guardian-secondary'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-guardian-navy">UI Density</label>
              <div className="flex gap-2">
                <button className="flex-1 py-3 px-4 rounded-xl border border-guardian-blue bg-guardian-blue/5 text-guardian-blue font-bold text-sm flex items-center justify-center gap-2">
                  <LayoutGrid size={16} /> Comfortable
                </button>
                <button className="flex-1 py-3 px-4 rounded-xl border border-guardian-border text-guardian-secondary font-bold text-sm flex items-center justify-center gap-2">
                  <List size={16} /> Compact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Preferences */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-guardian-navy">Dashboard Customization</h3>
          <button className="px-6 py-2.5 bg-guardian-navy text-white text-sm font-bold rounded-xl hover:scale-105 active:scale-95 transition-all">
            Save Layout
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video rounded-xl border-2 border-dashed border-guardian-border flex items-center justify-center text-guardian-secondary bg-guardian-section cursor-move hover:bg-guardian-card transition-colors">
              <p className="text-xs font-bold uppercase">Widget {i}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OTP Verification Modal Placeholder */}
      {isVerifying && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-guardian-navy/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-guardian-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="text-guardian-blue" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-guardian-navy text-center mb-2">Verify Email</h2>
            <p className="text-guardian-secondary text-center mb-8">We've sent a 6-digit code to <span className="text-guardian-navy font-bold">alex@guardian.ai</span></p>
            
            <div className="flex justify-center gap-3 mb-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input 
                  key={i}
                  type="text"
                  maxLength="1"
                  className="w-12 h-14 bg-guardian-section border border-guardian-border rounded-xl text-center text-xl font-bold text-guardian-navy focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all"
                />
              ))}
            </div>

            <button 
              onClick={() => setIsVerifying(false)}
              className="w-full py-4 bg-guardian-navy text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all mb-4"
            >
              Verify Code
            </button>
            <button 
              onClick={() => setIsVerifying(false)}
              className="w-full text-guardian-secondary text-sm font-bold hover:text-guardian-navy transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
