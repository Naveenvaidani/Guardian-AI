import React from 'react';
import { 
  Bell, Mail, MessageSquare, ShieldAlert, Zap, 
  Settings, AlertCircle, Slack, Globe, Terminal,
  Plus
} from 'lucide-react';

export default function NotificationSection() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-guardian-heading mb-2 tracking-tight">Intelligence Alerts</h1>
        <p className="text-guardian-secondary font-medium">Configure real-time telemetry and system event dispatchers.</p>
      </div>

      {/* Notification Channels */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
        <h3 className="text-lg font-bold text-guardian-heading mb-10 flex items-center gap-3">
          <Globe className="text-guardian-blue" size={20} />
          Dispatch Channels
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 'email', name: 'Email Dispatch', desc: 'Critical alerts via encrypted email relay.', icon: Mail, enabled: true },
            { id: 'app', name: 'In-App Telemetry', desc: 'Sub-millisecond dashboard notifications.', icon: Bell, enabled: true },
            { id: 'slack', name: 'Slack Integration', desc: 'Sync threat vectors to team channels.', icon: Slack, enabled: false },
            { id: 'webhooks', name: 'Webhooks', desc: 'Push raw JSON to custom API endpoints.', icon: Terminal, enabled: false },
          ].map((channel) => (
            <div key={channel.id} className={`p-8 rounded-[2rem] border transition-all group ${channel.enabled ? 'border-dashboard-accent/30 bg-guardian-blue/5' : 'border-guardian-border hover:bg-guardian-bg'}`}>
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${channel.enabled ? 'bg-guardian-blue text-white shadow-lg' : 'bg-guardian-section text-guardian-secondary'}`}>
                  <channel.icon size={26} />
                </div>
                <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${channel.enabled ? 'bg-guardian-blue' : 'bg-guardian-bg'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${channel.enabled ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
              <h4 className="font-bold text-guardian-heading mb-1">{channel.name}</h4>
              <p className="text-xs text-guardian-secondary font-medium leading-relaxed">{channel.desc}</p>
              {!channel.enabled && (
                <button className="mt-6 text-[10px] font-black text-guardian-blue uppercase tracking-widest hover:text-guardian-heading transition-colors flex items-center gap-2">
                  Configure <Zap size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preferences Table */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border overflow-hidden shadow-xl">
        <div className="p-10 border-b border-guardian-border bg-guardian-bg/30">
          <h3 className="text-lg font-bold text-guardian-heading tracking-tight">Event Sensitivity</h3>
          <p className="text-xs text-guardian-secondary font-medium mt-1">Define thresholds for autonomous alerting.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-guardian-bg/50 border-b border-guardian-border">
                <th className="px-10 py-6 font-black text-[10px] text-guardian-secondary uppercase tracking-[0.2em]">Intelligence Type</th>
                <th className="px-10 py-6 font-black text-[10px] text-guardian-secondary uppercase tracking-[0.2em] text-center">Severity Level</th>
                <th className="px-10 py-6 font-black text-[10px] text-guardian-secondary uppercase tracking-[0.2em] text-center">Dispatch Pulse</th>
                <th className="px-10 py-6 font-black text-[10px] text-guardian-secondary uppercase tracking-[0.2em] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashboard-border/30">
              {[
                { type: 'Moderation Trigger', severity: 'Elite', freq: 'Instant', active: true },
                { type: 'Vector Anomaly', severity: 'Elite', freq: 'Instant', active: true },
                { type: 'API Load Warning', severity: 'Medium', freq: '15m Delta', active: true },
              ].map((alert, i) => (
                <tr key={i} className="hover:bg-guardian-bg/40 transition-colors">
                  <td className="px-10 py-6 font-bold text-guardian-heading text-sm">{alert.type}</td>
                  <td className="px-10 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      alert.severity === 'Elite' ? 'bg-guardian-danger/10 text-guardian-danger border border-guardian-danger/20' : 'bg-guardian-warning/10 text-guardian-warning border border-guardian-warning/20'
                    }`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-center text-[10px] text-guardian-secondary font-black uppercase tracking-widest">{alert.freq}</td>
                  <td className="px-10 py-6 text-right">
                    <div className={`w-10 h-5 rounded-full inline-block relative cursor-pointer transition-colors ${alert.active ? 'bg-guardian-blue' : 'bg-guardian-bg'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${alert.active ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Rules */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
          <h3 className="text-lg font-bold text-guardian-heading tracking-tight">Autonomous Dispatch Rules</h3>
          <button className="flex items-center gap-3 px-8 py-3.5 bg-guardian-blue text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-guardian-blue/80 transition-all shadow-lg shadow-dashboard-accent/20">
            <Plus size={18} /> Deploy Rule
          </button>
        </div>

        <div className="space-y-4">
          {[
            { cond: 'Multi-vector threat identified', trigger: 'Sub-millisecond', chan: 'Slack Core', active: true },
            { cond: 'Node latency > 150ms', trigger: 'Delta scan', chan: 'Email Relay', active: true },
          ].map((rule, i) => (
            <div key={i} className="p-6 rounded-2xl border border-guardian-border bg-guardian-bg/30 flex items-center justify-between group hover:border-dashboard-accent/30 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-guardian-bg rounded-xl border border-guardian-border flex items-center justify-center text-guardian-blue group-hover:bg-guardian-blue group-hover:text-guardian-heading transition-all">
                  <AlertCircle size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-guardian-heading">{rule.cond}</p>
                  <p className="text-[10px] text-guardian-secondary font-black uppercase tracking-widest mt-1">Pulse: {rule.trigger} // Exit: {rule.chan}</p>
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${rule.active ? 'bg-guardian-blue' : 'bg-guardian-bg'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${rule.active ? 'right-0.5' : 'left-0.5'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
