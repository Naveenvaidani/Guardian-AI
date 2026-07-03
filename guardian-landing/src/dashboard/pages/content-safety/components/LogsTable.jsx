import React from 'react';
import { Shield, EyeOff, Ban, AlertTriangle } from 'lucide-react';

export default function LogsTable() {
  const logs = [
    { id: 1, device: 'Child\'s iPhone', action: 'Adult Website Blocked', result: 'Success', time: '2026-05-18 10:00:15', icon: Ban, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 2, device: 'Family Mac', action: 'Inappropriate Image Blurred', result: 'Success', time: '2026-05-18 09:45:22', icon: EyeOff, color: 'text-slate-600', bg: 'bg-slate-100' },
    { id: 3, device: 'Android Tablet', action: 'Restricted App Launch', result: 'Warning Sent', time: '2026-05-18 08:30:00', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 4, device: 'Network Router', action: 'DNS Filter Update', result: 'Synced', time: '2026-05-18 01:00:00', icon: Shield, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 backdrop-blur-xl overflow-hidden mt-8 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200 bg-[#F8FAFC] flex items-center gap-2">
        <Shield className="w-5 h-5 text-fraud-cyan" />
        <h3 className="font-semibold text-slate-900">Enforcement Logs</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-[#F8FAFC] border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider">Timestamp</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Device</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Action Taken</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Result</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr 
                key={log.id} 
                className={`group border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
              >
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{log.time}</td>
                <td className="px-6 py-4 font-bold text-slate-900">{log.device}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${log.bg} border border-slate-200`}>
                      <log.icon className={`w-4 h-4 ${log.color}`} />
                    </div>
                    <span className="font-medium text-slate-700">{log.action}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border
                    ${log.result === 'Success' || log.result === 'Synced' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {log.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
