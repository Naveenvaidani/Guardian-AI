import React, { useState } from 'react';
import { 
  Key, RefreshCw, Copy, Check, Globe, ShieldCheck, 
  Database, Trash2, FileOutput, Server, Zap, Lock
} from 'lucide-react';

export default function SystemSection() {
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-guardian-navy mb-2">System & Integrations</h1>
        <p className="text-guardian-secondary">Manage API keys, infrastructure regions, and compliance standards.</p>
      </div>

      {/* API Management */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-guardian-navy flex items-center gap-2">
            <Key className="text-guardian-blue" size={20} />
            API Management
          </h3>
          <button className="px-6 py-2.5 bg-guardian-navy text-white text-sm font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-guardian-navy/10">
            Generate New Key
          </button>
        </div>
        
        <div className="p-6 bg-guardian-section rounded-2xl border border-guardian-border border-dashed relative">
          <label className="text-xs font-bold text-guardian-secondary uppercase tracking-widest block mb-2">Live API Key</label>
          <div className="flex items-center gap-4">
            <div className="flex-1 font-mono text-sm bg-white px-4 py-3 rounded-xl border border-guardian-border overflow-hidden text-ellipsis whitespace-nowrap">
              {apiKey}
            </div>
            <button 
              onClick={handleCopy}
              className={`p-3 rounded-xl border transition-all ${copied ? 'bg-guardian-success border-guardian-success text-white' : 'bg-white border-guardian-border text-guardian-navy hover:bg-guardian-card'}`}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
            <button className="p-3 rounded-xl bg-white border border-guardian-border text-guardian-navy hover:bg-guardian-card transition-all group">
              <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
          <p className="mt-4 text-xs text-guardian-secondary flex items-center gap-1.5">
            <Lock size={12} /> Scoped access enabled. This key can only perform moderation and analytics requests.
          </p>
        </div>
      </div>

      {/* Region & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
          <h3 className="text-lg font-bold text-guardian-navy mb-6 flex items-center gap-2">
            <Globe className="text-guardian-blue" size={20} />
            Region & Data Sovereignty
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-guardian-navy">Primary Data Region</label>
              <div className="grid grid-cols-3 gap-3">
                {['India', 'Europe', 'USA'].map(region => (
                  <button 
                    key={region}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${region === 'India' ? 'border-guardian-blue bg-guardian-blue/5 text-guardian-blue shadow-sm' : 'border-guardian-border text-guardian-secondary hover:bg-guardian-section'}`}
                  >
                    {region}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-guardian-secondary mt-2">All moderation data is processed and stored in Mumbai (AWS ap-south-1).</p>
            </div>
            
            <div className="pt-6 border-t border-guardian-border">
              <h4 className="text-sm font-bold text-guardian-navy mb-4">Compliance Frameworks</h4>
              <div className="space-y-4">
                {[
                  { name: 'GDPR (Europe)', active: true },
                  { name: 'India IT Rules 2021', active: true },
                  { name: 'CCPA (California)', active: false },
                ].map(c => (
                  <div key={c.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-guardian-navy">{c.name}</span>
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${c.active ? 'bg-guardian-blue' : 'bg-guardian-border'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${c.active ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
          <h3 className="text-lg font-bold text-guardian-navy mb-6 flex items-center gap-2">
            <Database className="text-guardian-blue" size={20} />
            Data Retention & Privacy
          </h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-guardian-navy">Retention Period</label>
              <div className="grid grid-cols-2 gap-3">
                {['7 Days', '30 Days', '90 Days', 'Custom'].map(period => (
                  <button 
                    key={period}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${period === '30 Days' ? 'border-guardian-blue bg-guardian-blue/5 text-guardian-blue shadow-sm' : 'border-guardian-border text-guardian-secondary hover:bg-guardian-section'}`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-guardian-border space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-guardian-border hover:bg-guardian-section transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-guardian-card rounded-lg text-guardian-navy group-hover:bg-guardian-blue group-hover:text-white transition-colors">
                    <FileOutput size={18} />
                  </div>
                  <span className="text-sm font-bold text-guardian-navy text-left">Export All Data</span>
                </div>
                <Check size={16} className="text-guardian-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 hover:bg-red-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-lg text-guardian-danger group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Trash2 size={18} />
                  </div>
                  <span className="text-sm font-bold text-guardian-danger text-left">Delete Account</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Status Placeholder */}
      <div className="bg-[#0B1F3A] rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
          <Server size={140} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-green-400">All Systems Operational</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Integration Health</h3>
          <p className="text-white/60 text-sm max-w-md mb-6">Your current integrations with Slack, Discord and Webhooks are performing optimally with average latency &lt; 45ms.</p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-xs font-bold">Latency: 42ms</div>
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-xs font-bold">Uptime: 99.99%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
