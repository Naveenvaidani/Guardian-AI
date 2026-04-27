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
        <h1 className="text-3xl font-bold text-guardian-navy mb-2">Notifications & Alerts</h1>
        <p className="text-guardian-secondary">Configure how and when you want to be notified about system events.</p>
      </div>

      {/* Notification Channels */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <h3 className="text-lg font-bold text-guardian-navy mb-8 flex items-center gap-2">
          <Globe className="text-guardian-blue" size={20} />
          Notification Channels
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 'email', name: 'Email Notifications', desc: 'Receive summaries and critical alerts via email.', icon: Mail, enabled: true },
            { id: 'app', name: 'In-App Alerts', desc: 'Real-time notifications within the dashboard.', icon: Bell, enabled: true },
            { id: 'slack', name: 'Slack Integration', desc: 'Sync alerts to your team channels.', icon: Slack, enabled: false },
            { id: 'webhooks', name: 'Webhooks', desc: 'Push events to your custom endpoints.', icon: Terminal, enabled: false },
          ].map((channel) => (
            <div key={channel.id} className={`p-6 rounded-2xl border transition-all ${channel.enabled ? 'border-guardian-blue bg-guardian-blue/5' : 'border-guardian-border hover:bg-guardian-section'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${channel.enabled ? 'bg-guardian-blue text-white shadow-lg' : 'bg-guardian-card text-guardian-secondary'}`}>
                  <channel.icon size={24} />
                </div>
                <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${channel.enabled ? 'bg-guardian-blue' : 'bg-guardian-border'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${channel.enabled ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
              <h4 className="font-bold text-guardian-navy mb-1">{channel.name}</h4>
              <p className="text-xs text-guardian-secondary leading-relaxed">{channel.desc}</p>
              {!channel.enabled && (
                <button className="mt-4 text-xs font-bold text-guardian-blue hover:underline flex items-center gap-1">
                  Configure <Zap size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Alert Types & Severity */}
      <div className="bg-white rounded-2xl border border-guardian-border overflow-hidden shadow-sm">
        <div className="p-8 border-b border-guardian-border">
          <h3 className="text-lg font-bold text-guardian-navy">Alert Preferences</h3>
          <p className="text-sm text-guardian-secondary mt-1">Set severity and frequency for different event types.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-guardian-section/50 border-b border-guardian-border">
                <th className="px-8 py-4 font-bold text-xs text-guardian-secondary uppercase tracking-widest">Alert Type</th>
                <th className="px-8 py-4 font-bold text-xs text-guardian-secondary uppercase tracking-widest text-center">Severity</th>
                <th className="px-8 py-4 font-bold text-xs text-guardian-secondary uppercase tracking-widest text-center">Frequency</th>
                <th className="px-8 py-4 font-bold text-xs text-guardian-secondary uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-guardian-border">
              {[
                { type: 'Moderation Alerts', severity: 'High', freq: 'Real-time', active: true },
                { type: 'Security Alerts', severity: 'High', freq: 'Real-time', active: true },
                { type: 'API Usage Alerts', severity: 'Medium', freq: 'Daily Summary', active: true },
                { type: 'System Errors', severity: 'High', freq: 'Real-time', active: false },
                { type: 'General Updates', severity: 'Low', freq: 'Weekly Summary', active: true },
              ].map((alert, i) => (
                <tr key={i} className="hover:bg-guardian-section transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-bold text-guardian-navy text-sm">{alert.type}</p>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      alert.severity === 'High' ? 'bg-red-50 text-red-600 border border-red-100' :
                      alert.severity === 'Medium' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                      'bg-blue-50 text-guardian-blue border border-blue-100'
                    }`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <select className="bg-transparent text-sm font-medium text-guardian-navy border-none focus:ring-0 outline-none cursor-pointer">
                      <option>{alert.freq}</option>
                      <option>Real-time</option>
                      <option>Daily summary</option>
                      <option>Weekly summary</option>
                    </select>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className={`w-10 h-5 rounded-full inline-block relative cursor-pointer transition-colors ${alert.active ? 'bg-guardian-blue' : 'bg-guardian-border'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${alert.active ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Alerts */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-guardian-navy">Custom Alert Rules</h3>
            <p className="text-sm text-guardian-secondary mt-1">Define specific conditions to trigger notifications.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-guardian-navy text-white text-xs font-bold rounded-xl hover:scale-105 transition-all">
            <Plus size={16} /> New Rule
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-guardian-secondary italic text-center py-8">No custom alert rules defined.</p>
        </div>
      </div>
    </div>
  );
}
