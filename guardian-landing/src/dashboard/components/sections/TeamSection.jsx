import React, { useState } from 'react';
import { 
  Users, UserPlus, Mail, Shield, MoreVertical, 
  Search, FileDown, Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function TeamSection() {
  const [members, setMembers] = useState([
    { name: 'Sarah Chen', email: 'sarah.c@guardian.ai', role: 'Admin', status: 'Active', lastActive: 'Just now', avatar: 'SC' },
    { name: 'Michael Ross', email: 'm.ross@guardian.ai', role: 'Analyst', status: 'Active', lastActive: '2h ago', avatar: 'MR' },
    { name: 'Emily Watts', email: 'emily.w@guardian.ai', role: 'Viewer', status: 'Inactive', lastActive: '3d ago', avatar: 'EW' },
    { name: 'David Kim', email: 'd.kim@guardian.ai', role: 'Analyst', status: 'Active', lastActive: '12m ago', avatar: 'DK' },
  ]);

  const removeMember = (email) => {
    setMembers(members.filter(m => m.email !== email));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-3xl font-bold text-guardian-heading mb-2 tracking-tight">Team & Collaboration</h1>
          <p className="text-guardian-secondary font-medium">Orchestrate your enterprise moderation team and permissions.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-guardian-bg border border-guardian-border text-guardian-secondary font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-guardian-section transition-all flex items-center gap-2">
            <FileDown size={16} /> Export CSV
          </button>
          <button className="px-6 py-3 bg-guardian-blue text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-guardian-blue/80 transition-all shadow-lg shadow-dashboard-accent/20 flex items-center gap-2">
            <UserPlus size={16} /> Invite Member
          </button>
        </div>
      </div>

      {/* Invite Interface */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border p-10 shadow-xl relative overflow-hidden">
        <h3 className="text-lg font-bold text-guardian-heading mb-8">Onboard New Operators</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-guardian-secondary" size={20} />
            <input 
              type="text" 
              placeholder="operator@organization.ai"
              className="w-full bg-guardian-bg border border-guardian-border rounded-2xl pl-14 pr-6 py-4 text-base font-medium text-guardian-heading focus:outline-none focus:border-dashboard-accent/50 transition-all"
            />
          </div>
          <select className="bg-guardian-bg px-6 py-4 rounded-2xl border border-guardian-border text-guardian-heading font-bold text-sm focus:outline-none focus:border-dashboard-accent/50 appearance-none min-w-[200px]">
            <option>Analyst (L2)</option>
            <option>Supervisor (L3)</option>
            <option>Admin (Full)</option>
          </select>
          <button className="px-10 py-4 bg-guardian-blue text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-guardian-blue/80 transition-all shadow-lg shadow-dashboard-accent/20">
            Dispatch Invites
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-guardian-section rounded-[2.5rem] border border-guardian-border overflow-hidden shadow-xl">
        <div className="p-8 border-b border-guardian-border flex flex-col md:flex-row md:items-center justify-between gap-6 bg-guardian-bg/30">
          <h3 className="text-lg font-bold text-guardian-heading flex items-center gap-3">
            Active Personnel
            <span className="text-[10px] font-black bg-guardian-blue/10 text-guardian-blue px-3 py-1 rounded-full border border-dashboard-accent/20 uppercase tracking-widest">{members.length} Members</span>
          </h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-guardian-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Search directory..."
              className="pl-12 pr-6 py-2.5 bg-guardian-bg border border-guardian-border rounded-xl text-xs font-bold text-guardian-heading outline-none focus:border-dashboard-accent/50 transition-all w-full md:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-guardian-border/50">
                <th className="px-10 py-6 font-black text-[10px] text-guardian-secondary uppercase tracking-[0.2em]">Member Entity</th>
                <th className="px-10 py-6 font-black text-[10px] text-guardian-secondary uppercase tracking-[0.2em]">Clearance</th>
                <th className="px-10 py-6 font-black text-[10px] text-guardian-secondary uppercase tracking-[0.2em]">Vector Status</th>
                <th className="px-10 py-6 font-black text-[10px] text-guardian-secondary uppercase tracking-[0.2em]">Last Pulse</th>
                <th className="px-10 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {members.map((member, i) => (
                <tr key={i} className="hover:bg-white/40 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-guardian-blue/10 text-guardian-blue flex items-center justify-center text-xs font-black border border-dashboard-accent/20 group-hover:bg-guardian-blue group-hover:text-guardian-heading transition-all">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-guardian-heading">{member.name}</p>
                        <p className="text-[10px] text-guardian-secondary font-medium tracking-wide">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-xs font-black text-guardian-body uppercase tracking-widest">{member.role}</span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-guardian-success shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-600'}`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${member.status === 'Active' ? 'text-guardian-success' : 'text-guardian-secondary'}`}>{member.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-[10px] text-guardian-secondary font-black uppercase tracking-widest">
                    {member.lastActive}
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 bg-guardian-bg border border-guardian-border rounded-lg text-guardian-blue hover:bg-guardian-blue hover:text-guardian-heading transition-all">
                        <Shield size={16} />
                      </button>
                      <button 
                        onClick={() => removeMember(member.email)}
                        className="p-2.5 bg-guardian-bg border border-guardian-border rounded-lg text-guardian-danger hover:bg-guardian-danger hover:text-guardian-heading transition-all"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
