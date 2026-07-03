import React, { useState } from 'react';
import { Zap, Smartphone, Globe, MessageCircle, Cloud, CheckCircle2, ShieldAlert, Key, RefreshCcw } from 'lucide-react';

export default function IntegrationsHub() {
  const [enabled, setEnabled] = useState({
    android: true,
    ios: false,
    chrome: true,
    dns: false,
    insta: true,
    tiktok: false,
    rest: true,
  });

  const toggle = (key) => setEnabled(prev => ({ ...prev, [key]: !prev[key] }));

  const IntegrationCard = ({ icon: Icon, title, desc, connected, onToggle }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-fraud-cyan transition-colors group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
            <Icon className="w-5 h-5 text-slate-700 group-hover:text-fraud-cyan transition-colors" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
            <div className="flex items-center gap-1 mt-0.5">
              {connected ? (
                <><CheckCircle2 className="w-3 h-3 text-green-500" /><span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Connected</span></>
              ) : (
                <><ShieldAlert className="w-3 h-3 text-slate-400" /><span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Not Connected</span></>
              )}
            </div>
          </div>
        </div>
        
        {/* Toggle */}
        <button 
          onClick={onToggle}
          className={`w-10 h-5 rounded-full relative transition-colors ${connected ? 'bg-fraud-cyan' : 'bg-slate-200'}`}
        >
          <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${connected ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>
      
      <p className="text-xs text-slate-500 mb-4 h-8">{desc}</p>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <button className="text-[10px] font-semibold text-slate-600 uppercase flex items-center gap-1 hover:text-slate-900">
          <Key className="w-3 h-3" /> Permissions
        </button>
        <button className="text-[10px] font-semibold text-fraud-cyan uppercase flex items-center gap-1 hover:text-fraud-cyan-dark">
          <RefreshCcw className="w-3 h-3" /> Sync
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 backdrop-blur-xl p-8 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-fraud-cyan" /> Integrations Hub
          </h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Deep system-level connectivity across devices, OS, networks, and platforms.</p>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 transition-all">
          <ShieldAlert className="w-4 h-4" /> One-Click Secure Setup
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 1. Device & OS */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-4 flex items-center gap-2">
            <Smartphone className="w-4 h-4" /> Device & OS
          </h3>
          <IntegrationCard icon={Smartphone} title="Android System" desc="Real-time file & screen scanning via MDM." connected={enabled.android} onToggle={() => toggle('android')} />
          <IntegrationCard icon={Smartphone} title="iOS Profile" desc="Screen Time & VPN config monitoring." connected={enabled.ios} onToggle={() => toggle('ios')} />
        </div>

        {/* 2. Browser & Network */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Browser & Network
          </h3>
          <IntegrationCard icon={Globe} title="Chrome Extension" desc="Real-time web content scanning." connected={enabled.chrome} onToggle={() => toggle('chrome')} />
          <IntegrationCard icon={Globe} title="DNS Filtering" desc="Router-level adult site blocking." connected={enabled.dns} onToggle={() => toggle('dns')} />
        </div>

        {/* 3. App & Platform */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-4 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> App & Platform
          </h3>
          <IntegrationCard icon={MessageCircle} title="Instagram Monitor" desc="Media analysis & auto-blur." connected={enabled.insta} onToggle={() => toggle('insta')} />
          <IntegrationCard icon={MessageCircle} title="TikTok Detect" desc="Unsafe content auto-block." connected={enabled.tiktok} onToggle={() => toggle('tiktok')} />
        </div>

        {/* 4. Cloud & API */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-4 flex items-center gap-2">
            <Cloud className="w-4 h-4" /> Cloud & API
          </h3>
          <IntegrationCard icon={Cloud} title="REST API" desc="Third-party app connectivity." connected={enabled.rest} onToggle={() => toggle('rest')} />
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center h-40 cursor-pointer hover:bg-slate-100 transition-colors">
            <span className="text-2xl text-slate-400 mb-2">+</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Add Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
