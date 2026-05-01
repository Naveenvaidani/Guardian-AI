import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  User, Shield, CreditCard, Users, Bell, Settings as SettingsIcon, 
  Search, LogOut, ChevronRight, Menu, X, History 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileSection from './sections/ProfileSection';
import SecuritySection from './sections/SecuritySection';
import BillingSection from './sections/BillingSection';
import TeamSection from './sections/TeamSection';
import NotificationSection from './sections/NotificationSection';
import SystemSection from './sections/SystemSection';
import SettingsOverview from './sections/SettingsOverview';

const menuItems = [
  { id: 'profile', label: 'Profile & Organization', icon: User, path: '/dashboard/settings/profile' },
  { id: 'security', label: 'Security & Access', icon: Shield, path: '/dashboard/settings/security' },
  { id: 'billing', label: 'Billing & Subscription', icon: CreditCard, path: '/dashboard/settings/billing' },
  { id: 'team', label: 'Team & Collaboration', icon: Users, path: '/dashboard/settings/team' },
  { id: 'notifications', label: 'Notifications & Alerts', icon: Bell, path: '/dashboard/settings/notifications' },
  { id: 'system', label: 'System & Integrations', icon: SettingsIcon, path: '/dashboard/settings/system' },
];

export default function Settings({ isAuditPanelOpenExternal, setAuditPanelOpenExternal }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const setAuditPanelOpen = setAuditPanelOpenExternal || (() => {});

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#020617] text-slate-200 font-sans rounded-[3rem] overflow-hidden border border-slate-800">
      {/* Sidebar */}
      <aside className={`bg-[#0f172a] border-r border-slate-800 transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-20'}`}>
        <div className="flex flex-col h-full py-8">
          <div className="px-6 mb-10 flex items-center justify-between">
            {isSidebarOpen && <h2 className="text-xl font-bold text-white tracking-tight">Settings</h2>}
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} />
                  {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 mt-auto space-y-1">
            <button 
              onClick={() => setAuditPanelOpen(true)}
              className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded-xl transition-all group"
            >
              <History size={20} className="text-slate-500 group-hover:text-blue-400" />
              {isSidebarOpen && <span className="font-bold text-sm">Audit Logs</span>}
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3.5 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all group">
              <LogOut size={20} />
              {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 relative overflow-y-auto bg-gradient-to-br from-transparent to-blue-500/5">
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route index element={<SettingsOverview onOpenAuditLogs={() => setAuditPanelOpen(true)} />} />
            <Route path="profile" element={<ProfileSection />} />
            <Route path="security" element={<SecuritySection />} />
            <Route path="billing" element={<BillingSection />} />
            <Route path="team" element={<TeamSection />} />
            <Route path="notifications" element={<NotificationSection />} />
            <Route path="system" element={<SystemSection />} />
          </Routes>

          {/* Support Footer */}
          <footer className="mt-20 pt-12 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 pb-8">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                Support & Help Center
              </h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-medium">
                Our global support team is available 24/7 for <span className="text-blue-500 font-bold">Business & Enterprise</span> users.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {['Help Center', 'Contact', 'Status'].map((item) => (
                <button key={item} className="text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors uppercase tracking-widest">
                  {item}
                </button>
              ))}
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
