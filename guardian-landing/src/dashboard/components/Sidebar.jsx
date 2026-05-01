import React from 'react';
import { 
  LayoutDashboard, Shield, AlertTriangle, BarChart3, Settings, 
  ChevronLeft, ChevronRight, LogOut, User, Sparkles, ShieldCheck, History
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'moderation', label: 'Moderation', icon: Shield, path: '/dashboard/moderation' },
    { id: 'threats', label: 'Threat Detection', icon: AlertTriangle, path: '/dashboard/threats' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 z-50 h-screen bg-guardian-bg border-r border-guardian-border transition-all duration-300 ease-in-out flex flex-col ${
        isCollapsed ? 'w-[80px]' : 'w-[280px]'
      }`}
    >
      {/* Branding Section */}
      <div className="h-28 flex items-center px-6 border-b border-guardian-border">
        <div className="flex items-center overflow-hidden w-full">
          {isCollapsed ? (
            <div className="w-10 h-10 bg-guardian-blue rounded-xl flex items-center justify-center shrink-0 shadow-glow mx-auto">
              <ShieldCheck className="text-white" size={24} />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex items-center w-full"
            >
              <img src="/Logo_transparent.png" alt="Guardian AI Logo" className="h-24 w-auto object-contain scale-[1.5] origin-left ml-3" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-guardian-blue/10 text-guardian-blue shadow-[0_0_20px_rgba(59,130,246,0.05)]' 
                  : 'text-guardian-secondary hover:bg-guardian-section/50 hover:text-guardian-blue'
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-colors duration-200 ${
                  isActive ? 'text-guardian-blue' : 'text-guardian-secondary group-hover:text-guardian-blue'
                }`} 
              />
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="font-bold text-sm tracking-tight"
                >
                  {item.label}
                </motion.span>
              )}
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 w-1 h-6 bg-guardian-blue rounded-r-full"
                />
              )}
            </Link>
          );
        })}

        {/* Recent Activity Label */}
        {!isCollapsed && (
          <div className="mt-8 px-4">
            <p className="text-[10px] font-black text-guardian-secondary uppercase tracking-widest mb-4">Recent Intelligence</p>
            <div className="space-y-1">
              {[
                'Scan A-102', 'Policy EU-8', 'Threat LOG_3', 'Audit Export'
              ].map((history, i) => (
                <button key={i} className="w-full flex items-center justify-between py-2 text-xs text-guardian-secondary hover:text-guardian-blue hover:bg-guardian-section/50 rounded-lg transition-all text-left truncate group">
                  <span className="truncate">{history}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-guardian-border bg-guardian-bg">
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-guardian-section transition-all duration-200 cursor-pointer group ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-lg bg-guardian-border flex items-center justify-center shrink-0 border border-guardian-border group-hover:border-guardian-blue/50 transition-colors">
            <User size={18} className="text-guardian-secondary group-hover:text-guardian-blue" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-guardian-heading truncate leading-none">Sarah Chen</p>
              <p className="text-[10px] text-guardian-secondary font-medium truncate mt-1">Admin</p>
            </div>
          )}
          {!isCollapsed && <LogOut size={14} className="text-guardian-secondary group-hover:text-red-500 transition-colors" />}
        </div>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-4 w-full flex items-center justify-center p-2 rounded-lg hover:bg-guardian-section text-guardian-secondary hover:text-guardian-blue transition-all border border-transparent hover:border-guardian-border"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
}
