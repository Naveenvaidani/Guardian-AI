import React from 'react';
import { Activity, Image as ImageIcon, Video, FileText, AlertTriangle } from 'lucide-react';

export default function ActivityPanel() {
  const activities = [
    { id: 1, type: 'video', name: 'tiktok_cache_v4.mp4', risk: 'Critical', time: 'Just now', icon: Video },
    { id: 2, type: 'image', name: 'whatsapp_media_12.jpg', risk: 'High', time: '2m ago', icon: ImageIcon },
    { id: 3, type: 'text', name: 'discord_chat_log', risk: 'Medium', time: '15m ago', icon: FileText },
    { id: 4, type: 'image', name: 'insta_story_temp.png', risk: 'Low', time: '1h ago', icon: ImageIcon },
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'High': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Low': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-fraud-cyan" /> Real-Time Activity
        </h3>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fraud-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-fraud-cyan"></span>
        </span>
      </div>

      <div className="flex flex-col gap-4 flex-grow overflow-y-auto pr-2">
        {activities.map(act => (
          <div key={act.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${getRiskColor(act.risk)}`}>
              <act.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{act.name}</p>
              <p className="text-xs font-semibold text-slate-500">{act.time}</p>
            </div>
            <div className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${getRiskColor(act.risk)}`}>
              {act.risk}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
