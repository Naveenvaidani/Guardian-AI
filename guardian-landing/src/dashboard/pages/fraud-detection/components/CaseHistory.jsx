import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Download, ShieldAlert } from 'lucide-react';

export default function CaseHistory() {
  const cases = [
    { id: '1', timestamp: '2026-04-11 10:00', user: 'user_01', type: 'Phishing', risk: 'High', action: 'View' },
    { id: '2', timestamp: '2026-04-11 10:05', user: 'user_02', type: 'Crypto Scam', risk: 'Medium', action: 'Report' },
    { id: '3', timestamp: '2026-04-11 10:10', user: 'user_03', type: 'Job Fraud', risk: 'Low', action: 'Save' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-guardian-blue/10 border border-guardian-blue/20 flex items-center justify-center text-guardian-blue">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-guardian-heading">Intelligent Case History</h2>
            <p className="text-guardian-secondary text-xs font-medium">Review and manage identified security threats</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-guardian-blue text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 transition-all">
            💾 Save Case
          </button>
          <button className="px-6 py-2.5 bg-guardian-card border border-guardian-border text-guardian-body font-black text-[10px] uppercase tracking-widest rounded-xl hover:border-red-500/50 hover:text-red-500 hover:scale-105 transition-all">
            🚨 Report Fraud
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-[2rem] border border-guardian-border bg-guardian-section/40 backdrop-blur-md">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-guardian-card/50 text-guardian-secondary font-black uppercase tracking-widest border-b border-guardian-border">
              <th className="px-8 py-5">Timestamp</th>
              <th className="px-8 py-5">User Identity</th>
              <th className="px-8 py-5">Classification</th>
              <th className="px-8 py-5">Threat Level</th>
              <th className="px-8 py-5 text-right">System Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-guardian-border/50">
            {cases.map((c, i) => (
              <motion.tr 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                key={c.id} 
                className="hover:bg-guardian-card/30 transition-all cursor-pointer group"
              >
                <td className="px-8 py-5 font-mono text-guardian-secondary group-hover:text-guardian-body transition-colors">{c.timestamp}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-guardian-card border border-guardian-border flex items-center justify-center text-[10px] font-bold text-guardian-blue">
                      {c.user[0].toUpperCase()}
                    </div>
                    <span className="font-bold text-guardian-body">{c.user}</span>
                  </div>
                </td>
                <td className="px-8 py-5 font-medium text-guardian-body">{c.type}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest ${
                    c.risk === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                    c.risk === 'Medium' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                    'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  }`}>
                    {c.risk}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 bg-guardian-card rounded-lg text-guardian-secondary hover:text-guardian-blue hover:border-guardian-blue/50 transition-all border border-transparent">
                      <Eye size={14} />
                    </button>
                    <button className="p-2 bg-guardian-card rounded-lg text-guardian-secondary hover:text-guardian-blue hover:border-guardian-blue/50 transition-all border border-transparent">
                      <Download size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="pt-10 pb-6 text-center space-y-4">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-guardian-blue/30 to-transparent" />
        <p className="text-[10px] font-black text-guardian-secondary uppercase tracking-[0.5em] hover:text-guardian-blue transition-all duration-700 cursor-default">
          24×7 AI Fraud Protection System
        </p>
      </div>
    </div>
  );
}
