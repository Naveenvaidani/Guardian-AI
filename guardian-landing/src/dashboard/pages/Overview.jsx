import React from 'react';
import { 
  Shield, AlertTriangle, Activity, Users, 
  ArrowUpRight, ArrowDownRight, Globe, Lock,
  Zap, CheckCircle2, Search, Bell,
  ChevronRight, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <motion.div 
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ duration: 0.2 }}
    className="bg-guardian-section/50 backdrop-blur-xl p-8 rounded-2xl relative overflow-hidden group border border-guardian-border"
  >
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-xl transition-all duration-300 ${
        color === 'dashboard-accent' 
          ? 'bg-guardian-blue/10 text-guardian-blue border border-dashboard-accent/20 group-hover:bg-guardian-blue group-hover:text-guardian-heading' 
          : 'bg-guardian-success/10 text-guardian-success border border-guardian-success/20 group-hover:bg-guardian-success group-hover:text-guardian-heading'
      }`}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-guardian-success' : 'text-guardian-danger'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <h3 className="text-guardian-secondary text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-guardian-heading tracking-tight">{value}</span>
    </div>
  </motion.div>
);

export default function Overview() {
  return (
    <div className="dashboard-container space-y-10 py-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-guardian-heading tracking-tight mb-2">Dashboard Overview</h1>
          <p className="text-guardian-secondary text-sm font-medium">Global threat telemetry and system health.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-secondary group-focus-within:text-guardian-blue transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search intelligence..." 
              className="bg-guardian-bg border border-guardian-border rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 focus:ring-4 focus:ring-dashboard-accent/5 w-[240px] transition-all"
            />
          </div>
          <button className="p-2.5 bg-guardian-bg border border-guardian-border rounded-xl text-guardian-secondary hover:text-guardian-heading hover:border-dashboard-accent transition-all relative">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-guardian-blue rounded-full ring-2 ring-dashboard-bg" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Threats Prevented" value="2,842,109" change="+12.4%" trend="up" icon={Shield} color="dashboard-accent" />
        <StatCard title="Active Sessions" value="84,210" change="+8.1%" trend="up" icon={Users} color="dashboard-accent" />
        <StatCard title="Detection Accuracy" value="99.98%" change="+0.02%" trend="up" icon={Zap} color="dashboard-accent" />
        <StatCard title="System Risk" value="Minimal" change="-2.4%" trend="down" icon={AlertTriangle} color="emerald" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Analytics Card */}
        <div className="xl:col-span-2 bg-guardian-section/50 backdrop-blur-xl p-8 rounded-3xl border border-guardian-border">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-guardian-heading">Intelligence Telemetry</h3>
              <p className="text-guardian-secondary text-xs font-medium mt-1">Real-time vector analysis</p>
            </div>
            <div className="flex gap-2">
              {['24h', '7d', '30d'].map(p => (
                <button key={p} className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${p === '24h' ? 'bg-guardian-blue border-dashboard-accent text-guardian-heading' : 'bg-guardian-bg border-guardian-border text-guardian-secondary hover:text-guardian-heading'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[300px] flex items-end gap-3 px-2">
            {[45, 60, 35, 80, 55, 90, 70, 85, 40, 65, 75, 50].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  className="w-full bg-guardian-blue/20 rounded-md relative group-hover:bg-guardian-blue/40 transition-all duration-200"
                />
                <span className="text-[10px] font-bold text-guardian-secondary group-hover:text-guardian-secondary transition-colors">{i + 1}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed Card */}
        <div className="bg-guardian-section/50 backdrop-blur-xl p-8 rounded-3xl border border-guardian-border flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-guardian-heading">Activity Log</h3>
            <Activity className="text-guardian-blue" size={18} />
          </div>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-hide">
            {[
              { type: 'scam', msg: 'Crypto scam detected on Node #412', time: 'Just now', severity: 'high' },
              { type: 'bot', msg: 'Bot farm identified in Asia-Pacific', time: '2m ago', severity: 'medium' },
              { type: 'deepfake', msg: 'Deepfake audio filter updated', time: '14m ago', severity: 'low' },
              { type: 'system', msg: 'API Gateway scaled to 12 nodes', time: '21m ago', severity: 'low' },
              { type: 'threat', msg: 'DDoS mitigation active on Endpoint B', time: '45m ago', severity: 'high' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                  log.severity === 'high' ? 'bg-guardian-danger' : 
                  log.severity === 'medium' ? 'bg-guardian-warning' : 'bg-guardian-blue'
                }`} />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-bold text-guardian-body group-hover:text-guardian-heading transition-colors">{log.msg}</p>
                  <p className="text-[10px] text-guardian-secondary font-bold uppercase tracking-widest">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3.5 bg-guardian-bg border border-guardian-border rounded-xl text-[10px] font-bold text-guardian-secondary uppercase tracking-widest hover:text-guardian-heading transition-all flex items-center justify-center gap-2">
            Full Log <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
