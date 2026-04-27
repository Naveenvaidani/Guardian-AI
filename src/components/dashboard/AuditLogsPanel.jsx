import React from 'react';
import { motion } from 'framer-motion';
import { X, Filter, Download, User, Shield, Terminal, Settings as SettingsIcon, Search, FileJson, FileText } from 'lucide-react';

export default function AuditLogsPanel({ onClose }) {
  const logs = [];

  return (
    <>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-guardian-navy/40 backdrop-blur-sm z-[60]"
      />
      
      {/* Panel */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-[70] flex flex-col"
      >
        <div className="p-8 border-b border-guardian-border flex items-center justify-between bg-guardian-section/30">
          <div>
            <h2 className="text-2xl font-bold text-guardian-navy">Audit Logs</h2>
            <p className="text-sm text-guardian-secondary mt-1">Track all system events and user actions.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-guardian-card rounded-2xl transition-colors text-guardian-secondary"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-6 border-b border-guardian-border space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-guardian-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search logs by user or action..."
              className="w-full pl-12 pr-4 py-2.5 bg-guardian-section border border-guardian-border rounded-xl text-sm outline-none focus:bg-white focus:border-guardian-blue transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'User Activity', 'Security', 'API Usage', 'System'].map((f) => (
              <button 
                key={f}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
                  f === 'All' ? 'bg-guardian-navy text-white border-guardian-navy' : 'bg-white text-guardian-secondary border-guardian-border hover:bg-guardian-card'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Logs List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 relative group">
              <div className="shrink-0 relative z-10">
                <div className={`p-2 rounded-lg ${
                  log.type === 'user' ? 'bg-blue-50 text-guardian-blue' :
                  log.type === 'security' ? 'bg-red-50 text-red-600' :
                  log.type === 'api' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  {log.type === 'user' && <User size={18} />}
                  {log.type === 'security' && <Shield size={18} />}
                  {log.type === 'api' && <Terminal size={18} />}
                  {log.type === 'system' && <SettingsIcon size={18} />}
                </div>
              </div>
              
              <div className="flex-1 pb-6 border-b border-guardian-border last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-guardian-navy leading-snug">{log.action}</h4>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    log.severity === 'high' ? 'bg-red-100 text-red-700' :
                    log.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {log.severity}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-guardian-secondary">
                  <span className="font-bold text-guardian-navy/70">{log.user}</span>
                  <span>•</span>
                  <span>{log.date}, {log.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-guardian-border bg-guardian-section/30">
          <p className="text-xs font-bold text-guardian-secondary uppercase tracking-widest mb-4">Export Log History</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-white border border-guardian-border rounded-xl text-sm font-bold text-guardian-navy hover:bg-guardian-card transition-all">
              <FileText size={18} className="text-guardian-secondary" /> CSV
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-white border border-guardian-border rounded-xl text-sm font-bold text-guardian-navy hover:bg-guardian-card transition-all">
              <FileJson size={18} className="text-guardian-secondary" /> JSON
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
