import React from 'react';
import { motion } from 'framer-motion';
import { X, Filter, Download, User, Shield, Terminal, Settings as SettingsIcon, Search, FileJson, FileText, Activity } from 'lucide-react';

export default function AuditLogsPanel({ onClose }) {
  const [activeFilter, setActiveFilter] = React.useState('All');
  
  const allLogs = [
    { type: 'user', action: 'Team member Sarah Chen invited', user: 'Admin (You)', date: 'May 01, 2026', time: '15:42:10', severity: 'low' },
    { type: 'security', action: 'Failed login attempt detected', user: 'System', date: 'May 01, 2026', time: '14:20:05', severity: 'elite' },
    { type: 'api', action: 'API Key regenerated (gai_live_...7721)', user: 'Admin (You)', date: 'Apr 30, 2026', time: '09:15:33', severity: 'medium' },
    { type: 'system', action: 'Data retention policy updated to 30 days', user: 'Admin (You)', date: 'Apr 28, 2026', time: '11:00:12', severity: 'medium' },
    { type: 'security', action: '2FA disabled for account alex@guardian.ai', user: 'Alex (Support)', date: 'Apr 27, 2026', time: '16:45:50', severity: 'elite' },
    { type: 'api', action: 'High volume of moderation requests (>50k)', user: 'API Gateway', date: 'Apr 26, 2026', time: '22:10:00', severity: 'medium' },
  ];

  const filteredLogs = activeFilter === 'All' 
    ? allLogs 
    : allLogs.filter(log => {
        if (activeFilter === 'User Activity') return log.type === 'user';
        if (activeFilter === 'Security') return log.type === 'security';
        if (activeFilter === 'API Usage') return log.type === 'api';
        if (activeFilter === 'System') return log.type === 'system';
        return true;
      });

  return (
    <>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-guardian-bg/80 backdrop-blur-md z-[60]"
      />
      
      {/* Panel */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full max-w-lg bg-guardian-section shadow-2xl z-[70] flex flex-col border-l border-guardian-border"
      >
        <div className="p-10 border-b border-guardian-border flex items-center justify-between bg-guardian-bg/30">
          <div>
            <h2 className="text-2xl font-bold text-guardian-heading tracking-tight flex items-center gap-2">
              <Activity className="text-guardian-blue" size={24} />
              Audit Logs
            </h2>
            <p className="text-xs text-guardian-secondary font-medium mt-1">Operational event stream and security ledger.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-guardian-bg rounded-2xl transition-colors text-guardian-secondary hover:text-guardian-heading"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-8 border-b border-guardian-border space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-guardian-secondary group-focus-within:text-guardian-blue transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter events..."
              className="w-full pl-12 pr-6 py-3.5 bg-guardian-bg border border-guardian-border rounded-2xl text-sm font-medium text-guardian-heading outline-none focus:border-dashboard-accent/50 transition-all shadow-inner"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'User Activity', 'Security', 'API Usage', 'System'].map((f) => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                  activeFilter === f ? 'bg-guardian-blue text-white border-dashboard-accent shadow-lg shadow-dashboard-accent/20' : 'bg-guardian-bg text-guardian-secondary border-guardian-border hover:text-guardian-body hover:bg-guardian-section'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth scrollbar-hide">
          {filteredLogs.length > 0 ? filteredLogs.map((log, i) => (
            <div key={i} className="flex gap-5 relative group animate-in fade-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="shrink-0">
                <div className={`p-3 rounded-xl border ${
                  log.type === 'user' ? 'bg-guardian-blue/10 text-guardian-blue border-dashboard-accent/20' :
                  log.type === 'security' ? 'bg-guardian-danger/10 text-guardian-danger border-guardian-danger/20' :
                  log.type === 'api' ? 'bg-guardian-warning/10 text-guardian-warning border-guardian-warning/20' :
                  'bg-guardian-blue/10 text-guardian-blue border-dashboard-accent/20'
                }`}>
                  {log.type === 'user' && <User size={18} />}
                  {log.type === 'security' && <Shield size={18} />}
                  {log.type === 'api' && <Terminal size={18} />}
                  {log.type === 'system' && <SettingsIcon size={18} />}
                </div>
              </div>
              
              <div className="flex-1 pb-8 border-b border-guardian-border/50 last:border-0">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h4 className="text-sm font-bold text-guardian-heading leading-snug group-hover:text-guardian-blue transition-colors">{log.action}</h4>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md whitespace-nowrap ${
                    log.severity === 'elite' ? 'bg-rose-600 text-guardian-heading shadow-lg shadow-rose-600/20' :
                    log.severity === 'medium' ? 'bg-guardian-warning text-guardian-heading shadow-lg shadow-amber-500/20' :
                    'bg-guardian-success text-guardian-heading shadow-lg shadow-emerald-500/20'
                  }`}>
                    {log.severity}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-guardian-secondary font-bold uppercase tracking-widest">
                  <span className="text-guardian-secondary">{log.user}</span>
                  <span className="opacity-20">•</span>
                  <span>{log.date}</span>
                  <span className="opacity-20">•</span>
                  <span className="text-guardian-blue/60 font-mono tracking-normal">{log.time}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 bg-guardian-bg rounded-2xl flex items-center justify-center text-guardian-secondary mb-6 border border-guardian-border border-dashed">
                <Filter size={24} />
              </div>
              <p className="text-[10px] font-black text-guardian-secondary uppercase tracking-[0.2em]">No Intelligence Found</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-10 border-t border-guardian-border bg-guardian-bg/30">
          <p className="text-[10px] font-black text-guardian-secondary uppercase tracking-widest mb-6">Dispatch Intelligence</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-guardian-bg border border-guardian-border rounded-2xl text-[10px] font-black uppercase tracking-widest text-guardian-secondary hover:text-guardian-heading hover:bg-guardian-section transition-all">
              <FileText size={18} /> CSV Report
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-guardian-bg border border-guardian-border rounded-2xl text-[10px] font-black uppercase tracking-widest text-guardian-secondary hover:text-guardian-heading hover:bg-guardian-section transition-all">
              <FileJson size={18} /> JSON Feed
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
