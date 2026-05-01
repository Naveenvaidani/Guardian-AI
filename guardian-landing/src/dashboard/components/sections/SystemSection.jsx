import React, { useState } from 'react';
import { 
  Key, RefreshCw, Copy, Check, Globe, ShieldCheck, 
  Database, Trash2, FileOutput, Server, Zap, Lock
} from 'lucide-react';

export default function SystemSection() {
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey || 'gai_live_8842_xml_2026_pk_7721');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateKey = () => {
    setApiKey('gai_live_' + Math.random().toString(36).substring(2, 10).toUpperCase());
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-guardian-heading mb-2 tracking-tight">System Infrastructure</h1>
        <p className="text-guardian-secondary font-medium">Manage core integrations, API security, and data sovereignty.</p>
      </div>

      {/* API Key Management */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
          <h3 className="text-lg font-bold text-guardian-heading flex items-center gap-3">
            <Key className="text-guardian-blue" size={20} />
            Secret Management
          </h3>
          <button className="px-8 py-3.5 bg-guardian-blue text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-guardian-blue/80 transition-all shadow-lg shadow-dashboard-accent/20">
            Rotate Master Key
          </button>
        </div>
        
        <div className="p-8 bg-guardian-bg rounded-[2rem] border border-guardian-border border-dashed relative overflow-hidden">
          <label className="text-[10px] font-black text-guardian-secondary uppercase tracking-widest block mb-4">Production API Key</label>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 font-mono text-sm bg-guardian-bg px-6 py-4 rounded-xl border border-guardian-border overflow-hidden text-ellipsis whitespace-nowrap text-guardian-blue/80 tracking-wider w-full">
              {apiKey || 'gai_live_8842_xml_2026_pk_7721'}
            </div>
            <div className="flex gap-3 shrink-0">
              <button 
                onClick={handleCopy}
                className={`p-4 rounded-xl border transition-all ${copied ? 'bg-guardian-success border-guardian-success text-guardian-heading' : 'bg-guardian-section border-guardian-border text-guardian-body hover:text-guardian-heading hover:border-dashboard-accent'}`}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
              <button 
                onClick={regenerateKey}
                className="p-4 bg-guardian-section border border-guardian-border text-guardian-body rounded-xl hover:text-guardian-heading hover:border-dashboard-accent transition-all group"
              >
                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-guardian-blue/5 rounded-2xl border border-dashboard-accent/10">
            <p className="text-[10px] font-black text-guardian-blue uppercase tracking-widest mb-3 flex items-center gap-2">
              <Lock size={12} /> Active Policy Scopes
            </p>
            <div className="flex flex-wrap gap-3">
              {['Intel:Write', 'Audit:Read', 'Sys:Admin'].map(scope => (
                <span key={scope} className="px-3 py-1 bg-guardian-bg border border-guardian-border rounded-lg text-[9px] font-black text-guardian-secondary uppercase tracking-widest">{scope}</span>
              ))}
              <button className="text-[9px] font-black text-guardian-blue uppercase tracking-widest hover:text-guardian-heading transition-colors ml-2">Edit</button>
            </div>
          </div>
        </div>
      </div>

      {/* Region & Sovereignty */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
          <h3 className="text-lg font-bold text-guardian-heading mb-8 flex items-center gap-3 tracking-tight">
            <Globe className="text-guardian-blue" size={20} />
            Data Sovereignty
          </h3>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-guardian-secondary uppercase tracking-widest ml-1">Core Processing Region</label>
              <div className="grid grid-cols-3 gap-3">
                {['India', 'EU-West', 'US-East'].map(region => (
                  <button 
                    key={region}
                    className={`py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${region === 'India' ? 'border-dashboard-accent bg-guardian-blue/10 text-guardian-blue' : 'border-guardian-border text-guardian-secondary hover:text-guardian-secondary'}`}
                  >
                    {region}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-guardian-secondary font-medium mt-3 italic">Autonomous processing via Mumbai Cluster (ap-south-1).</p>
            </div>
            
            <div className="pt-8 border-t border-guardian-border">
              <h4 className="text-[10px] font-black text-guardian-secondary uppercase tracking-widest mb-6">Compliance Frameworks</h4>
              <div className="space-y-5">
                {[
                  { name: 'GDPR / Privacy Shield', active: true },
                  { name: 'India IT Act 2021', active: true },
                  { name: 'SOC2 Type II', active: false },
                ].map(c => (
                  <div key={c.name} className="flex items-center justify-between group">
                    <span className="text-xs font-bold text-guardian-body group-hover:text-guardian-heading transition-colors">{c.name}</span>
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${c.active ? 'bg-guardian-blue' : 'bg-guardian-bg'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${c.active ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
          <h3 className="text-lg font-bold text-guardian-heading mb-8 flex items-center gap-3 tracking-tight">
            <Database className="text-guardian-blue" size={20} />
            Intelligence Retention
          </h3>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-guardian-secondary uppercase tracking-widest ml-1">Archive Delta</label>
              <div className="grid grid-cols-2 gap-3">
                {['7 Days', '30 Days', '90 Days', 'Infinite'].map(period => (
                  <button 
                    key={period}
                    className={`py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${period === '30 Days' ? 'border-dashboard-accent bg-guardian-blue/10 text-guardian-blue' : 'border-guardian-border text-guardian-secondary hover:text-guardian-secondary'}`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-guardian-border space-y-4">
              <button className="w-full flex items-center justify-between p-5 rounded-2xl border border-guardian-border bg-guardian-bg/30 hover:bg-guardian-bg transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-guardian-section rounded-lg text-guardian-secondary group-hover:bg-guardian-blue group-hover:text-guardian-heading transition-all shadow-inner">
                    <FileOutput size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-guardian-secondary group-hover:text-guardian-heading">Export Dataset</span>
                </div>
                <ArrowUpRight size={18} className="text-slate-700 group-hover:text-guardian-blue transition-colors" />
              </button>
              
              <button className="w-full flex items-center justify-between p-5 rounded-2xl border border-guardian-danger/10 bg-guardian-danger/5 hover:bg-guardian-danger/10 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-guardian-danger/10 rounded-lg text-guardian-danger group-hover:bg-rose-600 group-hover:text-guardian-heading transition-all shadow-inner">
                    <Trash2 size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-guardian-danger/60 group-hover:text-guardian-danger">Purge Infrastructure</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Status */}
      <div className="bg-guardian-bg rounded-[2.5rem] p-10 border border-guardian-border relative overflow-hidden group shadow-2xl">
        <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity">
          <Server size={200} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-guardian-success rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.6)]"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-guardian-success">Core Engine Pulse: Stable</span>
          </div>
          <h3 className="text-2xl font-black text-guardian-heading mb-3 tracking-tight uppercase tracking-[0.1em]">Cluster Health</h3>
          <p className="text-guardian-secondary text-sm font-medium max-w-lg mb-8 leading-relaxed">External ingestors (Slack, Discord) are operational. Global load balancer latency is currently &lt; 38ms.</p>
          <div className="flex gap-6">
            <div className="px-6 py-3 bg-guardian-section rounded-xl border border-guardian-border text-[10px] font-black uppercase tracking-widest text-guardian-secondary shadow-inner">Latency: 34ms</div>
            <div className="px-6 py-3 bg-guardian-section rounded-xl border border-guardian-border text-[10px] font-black uppercase tracking-widest text-guardian-secondary shadow-inner">Ingest: 1.2M/min</div>
          </div>
        </div>
      </div>
    </div>
  );
}
