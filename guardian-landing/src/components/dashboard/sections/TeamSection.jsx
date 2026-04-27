import React from 'react';
import { 
  Users, UserPlus, Mail, Shield, MoreVertical, 
  Search, FileDown, Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function TeamSection() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-guardian-navy mb-2">Team & Collaboration</h1>
          <p className="text-guardian-secondary">Manage your team members, their roles, and track their activity.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-guardian-section border border-guardian-border text-guardian-navy font-bold rounded-xl hover:bg-guardian-card transition-all flex items-center gap-2">
            <FileDown size={18} /> Export CSV
          </button>
          <button className="px-6 py-3 bg-guardian-navy text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-guardian-navy/20 flex items-center gap-2">
            <UserPlus size={18} /> Invite Member
          </button>
        </div>
      </div>

      {/* Invite Members */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <h3 className="text-lg font-bold text-guardian-navy mb-6">Invite New Members</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-3.5 text-guardian-secondary" size={20} />
            <input 
              type="text" 
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-guardian-border focus:border-guardian-blue focus:ring-1 focus:ring-guardian-blue outline-none transition-all"
            />
          </div>
          <select className="px-4 py-3.5 rounded-xl border border-guardian-border focus:border-guardian-blue outline-none transition-all bg-white font-bold text-guardian-navy">
            <option>Analyst</option>
            <option>Viewer</option>
            <option>Admin</option>
          </select>
          <button className="px-10 py-3.5 bg-guardian-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
            Send Invites
          </button>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-2xl border border-guardian-border overflow-hidden shadow-sm">
        <div className="p-6 border-b border-guardian-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-guardian-section/50">
          <h3 className="text-lg font-bold text-guardian-navy flex items-center gap-2">
            Team Members
            <span className="text-xs font-bold bg-guardian-blue/10 text-guardian-blue px-2 py-0.5 rounded-full">12 Members</span>
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-guardian-secondary" size={16} />
            <input 
              type="text" 
              className="pl-10 pr-4 py-2 bg-white border border-guardian-border rounded-lg text-sm outline-none focus:border-guardian-blue transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-guardian-border">
                <th className="px-8 py-4 font-bold text-sm text-guardian-secondary uppercase tracking-wider">Member</th>
                <th className="px-8 py-4 font-bold text-sm text-guardian-secondary uppercase tracking-wider">Role</th>
                <th className="px-8 py-4 font-bold text-sm text-guardian-secondary uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 font-bold text-sm text-guardian-secondary uppercase tracking-wider">Last Active</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-guardian-border">
              <tr>
                <td colSpan="5" className="px-8 py-12 text-center text-guardian-secondary italic text-sm">
                  No team members found. Invite some to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Tracking */}
      <div className="bg-white rounded-2xl border border-guardian-border p-8 shadow-sm">
        <h3 className="text-lg font-bold text-guardian-navy mb-6">Recent Activity Logs</h3>
        <div className="space-y-6">
          <p className="text-sm text-guardian-secondary italic text-center py-4">No recent activity.</p>
          <button className="w-full py-3 text-guardian-blue font-bold text-sm hover:underline">
            View full activity history
          </button>
        </div>
      </div>
    </div>
  );
}
