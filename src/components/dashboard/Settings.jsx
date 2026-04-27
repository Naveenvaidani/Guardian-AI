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
import AuditLogsPanel from './AuditLogsPanel';

const menuItems = [
  { id: 'profile', label: 'Profile & Organization', icon: User, path: '/settings' },
  { id: 'security', label: 'Security & Access', icon: Shield, path: '/settings/security' },
  { id: 'billing', label: 'Billing & Subscription', icon: CreditCard, path: '/settings/billing' },
  { id: 'team', label: 'Team & Collaboration', icon: Users, path: '/settings/team' },
  { id: 'notifications', label: 'Notifications & Alerts', icon: Bell, path: '/settings/notifications' },
  { id: 'system', label: 'System & Integrations', icon: SettingsIcon, path: '/settings/system' },
];

export default function Settings() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAuditPanelOpen, setAuditPanelOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen pt-32 bg-guardian-bg font-sans">
      {/* Sidebar */}
      <aside className={`bg-guardian-section border-r border-guardian-border transition-all duration-300 sticky top-0 h-screen ${isSidebarOpen ? 'w-80' : 'w-20'}`}>
        <div className="flex flex-col h-full py-6">
          <div className="px-6 mb-8 flex items-center justify-between">
            {isSidebarOpen && <h2 className="text-xl font-bold text-guardian-navy">Settings</h2>}
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-guardian-card rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.id === 'profile' && location.pathname === '/settings');
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-guardian-navy text-white shadow-lg' 
                      : 'text-guardian-secondary hover:bg-guardian-card hover:text-guardian-navy'
                  }`}
                >
                  <item.icon size={22} className={isActive ? 'text-white' : 'text-guardian-blue'} />
                  {isSidebarOpen && <span className="font-bold">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 mt-auto">
            <button 
              onClick={() => setAuditPanelOpen(true)}
              className="w-full flex items-center gap-4 px-4 py-3 text-guardian-secondary hover:bg-guardian-card hover:text-guardian-navy rounded-xl transition-all"
            >
              <History size={22} className="text-guardian-blue" />
              {isSidebarOpen && <span className="font-bold text-left">Audit Logs</span>}
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 text-guardian-danger hover:bg-red-50 rounded-xl transition-all mt-2">
              <LogOut size={22} />
              {isSidebarOpen && <span className="font-bold">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 relative scroll-smooth bg-white/50">
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route index element={<ProfileSection />} />
            <Route path="security" element={<SecuritySection />} />
            <Route path="billing" element={<BillingSection />} />
            <Route path="team" element={<TeamSection />} />
            <Route path="notifications" element={<NotificationSection />} />
            <Route path="system" element={<SystemSection />} />
          </Routes>

          {/* Support Footer */}
          <footer className="mt-20 pt-12 border-t border-guardian-border flex flex-col md:flex-row items-center justify-between gap-8 pb-12">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <h4 className="text-sm font-bold text-guardian-navy flex items-center gap-2 justify-center md:justify-start">
                <span className="text-lg">🆘</span> Support & Help
              </h4>
              <p className="text-xs text-guardian-secondary">Need help? Our team is available 24/7 for Enterprise users.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                'Help Center', 'Contact Support', 'Submit Ticket', 'System Status'
              ].map((item) => (
                <button key={item} className="text-xs font-bold text-guardian-secondary hover:text-guardian-blue transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </footer>
        </div>
      </main>

      {/* Audit Logs Side Panel */}
      <AnimatePresence>
        {isAuditPanelOpen && (
          <AuditLogsPanel onClose={() => setAuditPanelOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
