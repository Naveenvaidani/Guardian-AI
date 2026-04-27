import React, { useState } from 'react';
import { 
  KeyRound, Smartphone, Mail, Download, History, 
  Smartphone as DeviceIcon, Monitor, LogOut, ShieldCheck 
} from 'lucide-react';

export default function SecuritySection() {
  const [passwordStrength, setPasswordStrength] = useState(65);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-guardian-navy mb-2">Security & Access</h1>
        <p className="text-guardian-secondary">Protect your account with advanced security features and access controls.</p>
      </div>

      {/* Authentication */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <h3 className="text-lg font-bold text-guardian-navy mb-6 flex items-center gap-2">
          <KeyRound className="text-guardian-blue" size={20} />
          Change Password
        </h3>
        
        <div className="max-w-xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-guardian-navy">Current Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-guardian-border focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-guardian-navy">New Password</label>
            <input 
              type="password" 
              onChange={(e) => setPasswordStrength(Math.min(e.target.value.length * 10, 100))}
              className="w-full px-4 py-3 rounded-xl border border-guardian-border focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all"
            />
            {/* Password Strength Indicator */}
            <div className="pt-2">
              <div className="h-1.5 w-full bg-guardian-section rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    passwordStrength < 40 ? 'bg-red-500' : passwordStrength < 80 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-1.5 text-guardian-secondary">
                Strength: <span className={passwordStrength < 40 ? 'text-red-500' : passwordStrength < 80 ? 'text-yellow-600' : 'text-green-600'}>
                  {passwordStrength === 0 ? 'None' : passwordStrength < 40 ? 'Weak' : passwordStrength < 80 ? 'Moderate' : 'Strong'}
                </span>
              </p>
            </div>
          </div>
          <button className="px-8 py-3 bg-guardian-navy text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-guardian-navy flex items-center gap-2">
            <ShieldCheck className="text-guardian-blue" size={20} />
            Two-Factor Authentication (2FA)
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-guardian-secondary bg-guardian-section px-3 py-1 rounded-full border border-guardian-border">Disabled</span>
            <button className="text-sm font-bold text-guardian-blue hover:underline">Enable</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-guardian-border bg-guardian-section flex items-start gap-4">
            <div className="p-3 bg-guardian-secondary rounded-xl text-white">
              <Smartphone size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-guardian-navy mb-1">Authenticator App</h4>
              <p className="text-xs text-guardian-secondary mb-4">Use Google Authenticator or similar.</p>
              <button className="text-xs font-bold text-guardian-blue bg-white border border-guardian-blue/20 px-3 py-1.5 rounded-lg hover:bg-guardian-blue hover:text-white transition-all">Configure</button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-guardian-border bg-guardian-section flex items-start gap-4 opacity-75">
            <div className="p-3 bg-guardian-secondary rounded-xl text-white">
              <Mail size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-guardian-navy mb-1">Email OTP</h4>
              <p className="text-xs text-guardian-secondary mb-4">Receive codes via your email.</p>
              <button className="text-xs font-bold text-guardian-secondary bg-white border border-guardian-border px-3 py-1.5 rounded-lg hover:bg-guardian-card transition-all">Enable</button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-guardian-border flex items-center justify-between">
          <div>
            <h4 className="font-bold text-guardian-navy mb-1">Backup Codes</h4>
            <p className="text-xs text-guardian-secondary">Use backup codes if you lose access to your methods.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-guardian-card text-guardian-navy text-sm font-bold rounded-xl hover:bg-guardian-border transition-all">
            <Download size={16} /> Download CSV
          </button>
        </div>
      </div>

      {/* Login Activity & Sessions */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <h3 className="text-lg font-bold text-guardian-navy mb-6 flex items-center gap-2">
          <History className="text-guardian-blue" size={20} />
          Login Activity & Active Sessions
        </h3>
        
        <div className="space-y-4">
          <p className="text-sm text-guardian-secondary italic text-center py-8">No active sessions found.</p>
        </div>
        
        <button className="w-full mt-6 py-3 bg-red-50 text-guardian-danger font-bold text-sm rounded-xl hover:bg-red-100 transition-all">
          Logout from all devices
        </button>
      </div>

      {/* Access Control (Advanced) */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <h3 className="text-lg font-bold text-guardian-navy mb-6">Role-Based Access Control</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-guardian-border">
                <th className="pb-4 font-bold text-sm text-guardian-secondary">Permission</th>
                <th className="pb-4 font-bold text-sm text-guardian-navy text-center">Admin</th>
                <th className="pb-4 font-bold text-sm text-guardian-navy text-center">Analyst</th>
                <th className="pb-4 font-bold text-sm text-guardian-navy text-center">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-guardian-border">
              {[
                { name: 'Manage Team Members', roles: [true, false, false] },
                { name: 'Edit Billing & Subscription', roles: [true, false, false] },
                { name: 'Moderate Content', roles: [true, true, false] },
                { name: 'View Analytics', roles: [true, true, true] },
                { name: 'Generate API Keys', roles: [true, false, false] },
              ].map((perm, i) => (
                <tr key={i} className="hover:bg-guardian-section transition-colors group">
                  <td className="py-4 text-sm font-medium text-guardian-navy">{perm.name}</td>
                  {perm.roles.map((has, j) => (
                    <td key={j} className="py-4 text-center">
                      <div className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${has ? 'bg-guardian-success/10 text-guardian-success' : 'bg-guardian-card text-guardian-border'}`}>
                        <ShieldCheck size={14} className={has ? 'opacity-100' : 'opacity-40'} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
