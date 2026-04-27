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
        <h1 className="text-3xl font-bold text-guardian-navy mb-2">Billing & Subscription</h1>
        <p className="text-guardian-secondary">Manage your plan, payment methods, and view your billing history.</p>
      </div>

      {/* Current Plan Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-guardian-navy to-[#0F2A4D] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-guardian-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Select Plan</span>
              <span className="text-guardian-blue font-bold flex items-center gap-1 text-sm">
                <Clock size={14} /> --
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-2">$0<span className="text-xl font-normal text-white/60">/month</span></h2>
            <p className="text-white/80 mb-8 max-w-md">You are currently on a trial or no active plan has been selected.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-4 h-4 rounded-full bg-guardian-blue flex items-center justify-center">
                    <Check size={10} strokeWidth={4} />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-white text-guardian-navy font-bold rounded-xl hover:scale-105 active:scale-95 transition-all">
                Upgrade Plan
              </button>
              <button className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                Manage Subscription
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-guardian-border p-8 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-guardian-navy mb-6">Usage Summary</h3>
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-guardian-navy">API Calls</span>
                <span className="text-guardian-secondary">0 / --</span>
              </div>
              <div className="h-2 w-full bg-guardian-section rounded-full overflow-hidden">
                <div className="h-full bg-guardian-blue w-[0%] rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-guardian-navy">Data Storage</span>
                <span className="text-guardian-secondary">0 GB / --</span>
              </div>
              <div className="h-2 w-full bg-guardian-section rounded-full overflow-hidden">
                <div className="h-full bg-guardian-blue w-[0%] rounded-full"></div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 flex gap-3">
              <AlertTriangle className="text-yellow-600 shrink-0" size={18} />
              <p className="text-xs text-yellow-700 leading-relaxed font-medium">
                You've used 80% of your API quota. Overages will be billed at $0.002 per call.
              </p>
            </div>
          </div>
          <button className="mt-8 w-full flex items-center justify-center gap-2 text-guardian-blue font-bold text-sm hover:underline">
            View usage alerts <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-guardian-navy">Payment Methods</h3>
          <button className="flex items-center gap-2 text-guardian-blue font-bold text-sm hover:scale-105 transition-all">
            <Plus size={18} /> Add New Method
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-guardian-secondary italic text-center py-8">No payment methods added.</p>
        </div>

        {/* Region specific payment methods placeholder */}
        <div className="mt-8 pt-8 border-t border-guardian-border">
          <p className="text-xs font-bold text-guardian-secondary uppercase tracking-widest mb-4">Regional Methods (India)</p>
          <div className="flex gap-4">
            {['UPI', 'Net Banking', 'Wallets'].map(m => (
              <div key={m} className="px-4 py-2 bg-guardian-section rounded-xl border border-guardian-border text-xs font-bold text-guardian-navy">
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing Settings & History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
          <h3 className="text-lg font-bold text-guardian-navy mb-6">Billing Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-guardian-navy">Billing Cycle</p>
                <p className="text-xs text-guardian-secondary">Save 20% with yearly billing</p>
              </div>
              <div className="flex p-1 bg-guardian-section rounded-lg border border-guardian-border">
                <button className="px-3 py-1.5 text-xs font-bold bg-white shadow-sm rounded-md text-guardian-blue">Monthly</button>
                <button className="px-3 py-1.5 text-xs font-bold text-guardian-secondary hover:text-guardian-navy">Yearly</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-guardian-navy">Auto-Renew</p>
                <p className="text-xs text-guardian-secondary">Automatically renew your subscription</p>
              </div>
              <div className="w-12 h-6 bg-guardian-blue rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="pt-4 border-t border-guardian-border">
              <label className="text-xs font-bold text-guardian-navy uppercase tracking-widest block mb-3">Promo Code</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 px-4 py-2.5 rounded-xl border border-guardian-border bg-guardian-section focus:bg-white transition-all outline-none text-sm"
                />
                <button className="px-6 py-2.5 bg-guardian-navy text-white text-sm font-bold rounded-xl">Apply</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-guardian-navy">Billing History</h3>
            <button className="text-guardian-blue text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-guardian-secondary italic text-center py-8">No billing history available.</p>
          </div>
        </div>
      </div>

      {/* Advanced Usage Analytics Placeholder */}
      <div className="bg-guardian-section rounded-3xl p-10 border border-guardian-border border-dashed flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-guardian-blue">
          <TrendingUp size={40} />
        </div>
        <h3 className="text-xl font-bold text-guardian-navy mb-2">Usage-Based Billing Insights</h3>
        <p className="text-guardian-secondary max-w-lg mb-8">
          Detailed breakdowns of cost per API call, overage predictions, and custom alerts are available in our advanced analytics dashboard.
        </p>
        <button className="px-10 py-4 bg-guardian-navy text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-lg shadow-guardian-navy/20">
          Explore Advanced Analytics
        </button>
      </div>
    </div>
  );
}
