import React, { useState } from 'react';
import { 
  KeyRound, Smartphone, Mail, Download, History, 
  Smartphone as DeviceIcon, Monitor, LogOut, ShieldCheck, ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SecuritySection() {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculateStrength = (pass) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 6) score += 20;
    if (pass.length > 10) score += 20;
    if (/[A-Z]/.test(pass)) score += 20;
    if (/[0-9]/.test(pass)) score += 20;
    if (/[^A-Za-z0-9]/.test(pass)) score += 20;
    return score;
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-guardian-heading mb-2 tracking-tight">Security & Access</h1>
        <p className="text-guardian-secondary font-medium">Protect your account with enterprise-grade security protocols.</p>
      </div>

      {/* Authentication */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
        <h3 className="text-lg font-bold text-guardian-heading mb-10 flex items-center gap-3">
          <KeyRound className="text-guardian-blue" size={20} />
          Authentication Core
        </h3>
        
        <div className="max-w-xl space-y-8">
          <div className="space-y-2.5">
            <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">Current Password</label>
            <input 
              type="password" 
              className="w-full bg-guardian-bg border border-guardian-border rounded-2xl px-6 py-4 text-base font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 transition-all"
            />
          </div>
          <div className="space-y-2.5">
            <label className="text-xs font-black text-guardian-secondary uppercase tracking-widest ml-1">New Password</label>
            <input 
              type="password" 
              onChange={(e) => setPasswordStrength(calculateStrength(e.target.value))}
              className="w-full bg-guardian-bg border border-guardian-border rounded-2xl px-6 py-4 text-base font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 transition-all"
              placeholder="••••••••••••"
            />
            {/* Strength Indicator */}
            <div className="pt-4">
              <div className="h-1.5 w-full bg-guardian-bg rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ${
                    passwordStrength < 40 ? 'bg-guardian-danger' : passwordStrength < 80 ? 'bg-guardian-warning' : 'bg-guardian-success'
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-guardian-secondary">
                  Password Entropy
                </p>
                <p className={`text-[10px] font-black uppercase tracking-widest ${
                  passwordStrength < 40 ? 'text-guardian-danger' : passwordStrength < 80 ? 'text-guardian-warning' : 'text-guardian-success'
                }`}>
                  {passwordStrength === 0 ? 'None' : passwordStrength < 40 ? 'Weak' : passwordStrength < 80 ? 'Moderate' : 'Elite'}
                </p>
              </div>
            </div>
          </div>
          <button className="px-10 py-4 bg-guardian-blue text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-guardian-blue/80 transition-all shadow-lg shadow-dashboard-accent/20">
            Rotate Credentials
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
          <h3 className="text-lg font-bold text-guardian-heading flex items-center gap-3">
            <ShieldCheck className="text-guardian-blue" size={20} />
            Multi-Factor Auth (MFA)
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-guardian-secondary uppercase tracking-widest bg-guardian-bg px-4 py-1.5 rounded-full border border-guardian-border">Status: Disabled</span>
            <button className="text-[10px] font-black text-guardian-blue uppercase tracking-widest hover:text-guardian-heading transition-colors">Enable Core</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[2rem] border border-guardian-border bg-guardian-bg flex items-start gap-5 group hover:border-dashboard-accent/30 transition-all cursor-pointer">
            <div className="p-4 bg-guardian-blue/10 text-guardian-blue rounded-2xl group-hover:bg-guardian-blue group-hover:text-guardian-heading transition-all">
              <Smartphone size={28} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-guardian-heading mb-1">Authenticator App</h4>
              <p className="text-xs text-guardian-secondary font-medium mb-5">Enterprise-grade TOTP logic.</p>
              <button className="text-[10px] font-black text-guardian-blue uppercase tracking-widest hover:text-guardian-heading transition-colors">Configure</button>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] border border-guardian-border bg-guardian-bg flex items-start gap-5 opacity-40 group hover:border-guardian-border transition-all cursor-not-allowed">
            <div className="p-4 bg-guardian-section text-guardian-secondary rounded-2xl">
              <Mail size={28} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-guardian-secondary mb-1">Email OTP</h4>
              <p className="text-xs text-guardian-secondary font-medium mb-5">Legacy verification protocol.</p>
              <button className="text-[10px] font-black text-guardian-secondary uppercase tracking-widest cursor-not-allowed">Inactive</button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
          <h3 className="text-lg font-bold text-guardian-heading mb-10 flex items-center gap-3">
            <History className="text-guardian-blue" size={20} />
            Active Intelligence Sessions
          </h3>
          
          <div className="space-y-4">
            {[
              { device: 'MacBook Pro 16"', browser: 'Chrome 124.0.0', ip: '192.168.1.1', location: 'Mumbai, IN', time: 'Just now', current: true },
              { device: 'iPhone 15 Pro', browser: 'Safari iOS', ip: '192.168.1.45', location: 'Mumbai, IN', time: '2h ago', current: false },
            ].map((session, i) => (
              <div key={i} className={`p-6 rounded-2xl border transition-all flex items-center justify-between ${session.current ? 'border-dashboard-accent/50 bg-guardian-blue/5 shadow-inner' : 'border-guardian-border hover:bg-guardian-bg'}`}>
                <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-xl ${session.current ? 'bg-guardian-blue text-white' : 'bg-guardian-bg text-guardian-secondary'}`}>
                    {session.device.includes('Mac') ? <Monitor size={22} /> : <DeviceIcon size={22} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-guardian-heading text-sm">{session.device}</h4>
                      {session.current && <span className="px-2.5 py-0.5 bg-guardian-success text-guardian-heading text-[9px] font-black rounded-full uppercase tracking-widest">Active</span>}
                    </div>
                    <p className="text-xs text-guardian-secondary font-medium mt-1">{session.browser} • {session.ip}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-guardian-heading uppercase tracking-widest">{session.time}</p>
                  {!session.current && <button className="text-[9px] font-black text-guardian-danger uppercase tracking-widest mt-2 hover:text-rose-400">Revoke</button>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl flex flex-col">
          <h3 className="text-lg font-bold text-guardian-heading mb-8 tracking-tight">Access Log Telemetry</h3>
          <div className="space-y-6 flex-1">
            <div className="p-6 bg-guardian-bg rounded-2xl border border-guardian-border">
              <p className="text-[9px] font-black text-guardian-secondary uppercase tracking-widest mb-2">Last Elite Login</p>
              <p className="text-sm font-bold text-guardian-heading">May 01, 2026 - 15:30</p>
              <p className="text-xs text-guardian-blue/60 font-medium mt-1 font-mono">192.168.1.1 (Mumbai)</p>
            </div>
            <div className="p-6 bg-guardian-danger/5 rounded-2xl border border-guardian-danger/20">
              <p className="text-[9px] font-black text-guardian-danger uppercase tracking-widest mb-2">Failed Authorization</p>
              <p className="text-sm font-bold text-rose-400">April 28, 2026 - 09:12</p>
              <p className="text-xs text-guardian-danger/60 font-medium mt-1 font-mono">103.44.12.9 (Singapore)</p>
            </div>
          </div>
          <button className="mt-10 w-full text-[10px] font-black text-guardian-blue uppercase tracking-widest hover:text-guardian-heading transition-all flex items-center justify-center gap-2">
            View All Security Events <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
