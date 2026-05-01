import React from 'react';
import { 
  CreditCard, Zap, Check, ArrowUpRight, Clock, 
  Download, Plus, Tag, AlertTriangle, ChevronRight,
  TrendingUp, BarChart3
} from 'lucide-react';

export default function BillingSection() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-guardian-heading mb-2 tracking-tight">Billing & Economics</h1>
        <p className="text-guardian-secondary font-medium">Manage your enterprise subscription and financial infrastructure.</p>
      </div>

      {/* Plan Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-dashboard-card to-dashboard-accent/10 rounded-[2.5rem] p-10 text-guardian-heading shadow-2xl border border-guardian-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Zap size={140} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-guardian-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Enterprise Core</span>
              <span className="text-guardian-blue font-black flex items-center gap-2 text-[10px] uppercase tracking-widest bg-guardian-blue/10 px-4 py-1.5 rounded-full border border-dashboard-accent/20">
                <Clock size={14} /> Renews in 12 Days
              </span>
            </div>
            <h2 className="text-5xl font-black mb-4 tracking-tighter">$499<span className="text-lg font-bold text-guardian-secondary ml-2 tracking-widest uppercase">/ month</span></h2>
            <p className="text-guardian-secondary mb-10 max-w-md font-medium leading-relaxed">High-performance AI moderation for global platforms requiring sub-millisecond latency.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
              {[
                'Unlimited API Intelligence',
                'Advanced NLP Vectoring',
                '24/7 Elite Response Team',
                'Global Compliance Stack',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-bold text-guardian-body">
                  <div className="w-5 h-5 rounded-full bg-guardian-blue flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-10 py-4 bg-white text-dashboard-bg font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all shadow-xl shadow-black/5">
                Scale Upward
              </button>
              <button className="px-10 py-4 bg-guardian-section text-guardian-heading font-black text-[10px] uppercase tracking-widest rounded-2xl border border-guardian-border hover:bg-guardian-bg transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl flex flex-col">
          <h3 className="text-lg font-bold text-guardian-heading mb-8 tracking-tight">Resource Utilization</h3>
          <div className="space-y-8 flex-1">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-dashboard-muted">API Telemetry</span>
                <span className="text-guardian-heading">82%</span>
              </div>
              <div className="h-1.5 w-full bg-guardian-bg rounded-full overflow-hidden">
                <div className="h-full bg-guardian-blue w-[82%] rounded-full shadow-[0_0_12px_rgba(37,99,235,0.5)] transition-all duration-1000"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-guardian-secondary">Storage Cluster</span>
                <span className="text-guardian-heading">28%</span>
              </div>
              <div className="h-1.5 w-full bg-guardian-bg rounded-full overflow-hidden">
                <div className="h-full bg-guardian-blue w-[28%] rounded-full transition-all duration-1000"></div>
              </div>
            </div>
            <div className="p-6 bg-guardian-warning/5 rounded-2xl border border-guardian-warning/20 flex gap-4 mt-8">
              <AlertTriangle className="text-guardian-warning shrink-0" size={20} />
              <p className="text-[10px] text-guardian-warning/80 leading-relaxed font-black uppercase tracking-widest">
                Approaching API threshold. Auto-scaling active.
              </p>
            </div>
          </div>
          <button className="mt-10 w-full flex items-center justify-center gap-2 text-[10px] font-black text-guardian-blue uppercase tracking-widest hover:text-guardian-heading transition-all">
            Detailed Metrics <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Payment Infrastructure */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
          <h3 className="text-lg font-bold text-guardian-heading tracking-tight">Payment Infrastructure</h3>
          <button className="flex items-center gap-3 text-guardian-blue font-black text-[10px] uppercase tracking-widest hover:text-guardian-heading transition-all group">
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Link New Method
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-dashboard-accent/50 bg-guardian-blue/5 flex items-center justify-between group shadow-inner">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-guardian-bg rounded-xl border border-guardian-border flex items-center justify-center text-guardian-blue">
                <CreditCard size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-guardian-heading">Visa • 4242</p>
                <p className="text-[10px] text-guardian-secondary font-black uppercase tracking-widest mt-1">Expires 12/28 • Main</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-guardian-blue text-white text-[9px] font-black rounded-lg uppercase tracking-widest">Active</span>
          </div>
          
          <div className="p-6 rounded-2xl border border-guardian-border bg-guardian-bg/30 flex items-center justify-between hover:bg-guardian-bg transition-all cursor-pointer group">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-guardian-bg rounded-xl border border-guardian-border flex items-center justify-center text-guardian-secondary group-hover:text-guardian-body transition-colors">
                <CreditCard size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-guardian-secondary group-hover:text-guardian-heading transition-colors">Mastercard • 8891</p>
                <p className="text-[10px] text-guardian-secondary font-black uppercase tracking-widest mt-1">Expires 05/26</p>
              </div>
            </div>
            <button className="text-[9px] font-black text-guardian-blue uppercase tracking-widest hover:text-guardian-heading transition-colors opacity-0 group-hover:opacity-100">Default</button>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-lg font-bold text-guardian-heading tracking-tight">Statement Ledger</h3>
          <button className="text-[10px] font-black text-guardian-blue uppercase tracking-widest hover:text-guardian-heading transition-colors">Archive</button>
        </div>
        <div className="space-y-4">
          {/* History Item */}
          {[
            { id: 'INV-2026-004', date: 'Apr 01', amount: '$499.00', status: 'Settled' },
            { id: 'INV-2026-003', date: 'Mar 01', amount: '$499.00', status: 'Settled' },
          ].map((inv) => (
            <div key={inv.id} className="flex items-center justify-between p-5 hover:bg-guardian-bg rounded-2xl transition-all border border-transparent hover:border-guardian-border group">
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 rounded-lg bg-guardian-bg flex items-center justify-center text-guardian-secondary group-hover:bg-guardian-blue/10 group-hover:text-guardian-blue transition-all">
                  <Download size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-guardian-heading">{inv.id}</p>
                  <p className="text-[10px] text-guardian-secondary font-black uppercase tracking-widest mt-0.5">{inv.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-guardian-heading">{inv.amount}</p>
                <p className="text-[10px] text-guardian-success font-black uppercase tracking-widest mt-0.5">{inv.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
