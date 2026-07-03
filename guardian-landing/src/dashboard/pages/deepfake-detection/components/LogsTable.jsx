import React from 'react';
import { Eye, Download, Shield } from 'lucide-react';

export default function LogsTable() {
  const logs = [
    { id: 1, time: '2026-04-11 10:00', user: 'user_01', file: 'MP4', result: 'Authentic', action: 'View' },
    { id: 2, time: '2026-04-11 10:05', user: 'user_02', file: 'JPG', result: 'Fake', action: 'Export' },
    { id: 3, time: '2026-04-11 10:10', user: 'user_03', file: 'WAV', result: 'Suspicious', action: 'View' },
  ];

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 backdrop-blur-xl overflow-hidden mt-8 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200 bg-[#F8FAFC] flex items-center gap-2">
        <Shield className="w-5 h-5 text-fraud-cyan" />
        <h3 className="font-semibold text-slate-900">Recent Verification Logs</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-[#F8FAFC] border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider">Timestamp</th>
              <th className="px-6 py-4 font-semibold tracking-wider">User</th>
              <th className="px-6 py-4 font-semibold tracking-wider">File Type</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Result</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr 
                key={log.id} 
                className={`group border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
              >
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{log.time}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{log.user}</td>
                <td className="px-6 py-4 text-slate-500 font-medium">{log.file}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border
                    ${log.result === 'Authentic' ? 'bg-green-50 text-green-700 border-green-200' : 
                      log.result === 'Fake' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {log.result}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-fraud-cyan hover:text-fraud-cyan-dark font-medium text-sm flex items-center justify-end w-full gap-1.5 transition-colors">
                    {log.action === 'View' ? <Eye className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    {log.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
