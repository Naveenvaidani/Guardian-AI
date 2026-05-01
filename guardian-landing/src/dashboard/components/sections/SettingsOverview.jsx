import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Shield, CreditCard, Users, Bell, 
  Settings as SettingsIcon, History, ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { 
    id: 'profile', 
    label: 'Profile & Organization', 
    desc: 'Manage your personal details and company identity.', 
    icon: User, 
    path: '/dashboard/settings/profile' 
  },
  { 
    id: 'security', 
    label: 'Security & Access', 
    desc: 'Protect your account with 2FA and advanced access controls.', 
    icon: Shield, 
    path: '/dashboard/settings/security' 
  },
  { 
    id: 'billing', 
    label: 'Billing & Subscription', 
    desc: 'Manage your plan, payment methods, and invoices.', 
    icon: CreditCard, 
    path: '/dashboard/settings/billing' 
  },
  { 
    id: 'team', 
    label: 'Team & Collaboration', 
    desc: 'Invite members and manage role-based permissions.', 
    icon: Users, 
    path: '/dashboard/settings/team' 
  },
  { 
    id: 'notifications', 
    label: 'Notifications & Alerts', 
    desc: 'Configure system alerts and communication channels.', 
    icon: Bell, 
    path: '/dashboard/settings/notifications' 
  },
  { 
    id: 'system', 
    label: 'System & Integrations', 
    desc: 'API keys, regions, and compliance standards.', 
    icon: SettingsIcon, 
    path: '/dashboard/settings/system' 
  },
];

export default function SettingsOverview({ onOpenAuditLogs }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-guardian-heading mb-2 tracking-tight">Settings Overview</h1>
        <p className="text-guardian-secondary font-medium">Select a category to manage your platform configuration.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={itemVariants}>
            <Link 
              to={cat.path}
              className="group block h-full p-8 bg-guardian-section rounded-[2rem] border border-guardian-border hover:border-dashboard-accent/50 hover:shadow-2xl hover:shadow-dashboard-accent/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity rotate-12">
                <cat.icon size={120} />
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-guardian-bg/50 rounded-2xl flex items-center justify-center text-guardian-blue mb-6 group-hover:scale-110 group-hover:bg-guardian-blue group-hover:text-white transition-all duration-300">
                  <cat.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-guardian-heading mb-2 flex items-center gap-2">
                  {cat.label}
                  <ChevronRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-guardian-blue" />
                </h3>
                <p className="text-sm text-guardian-secondary leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Audit Logs Card */}
        <motion.div variants={itemVariants}>
          <button 
            onClick={onOpenAuditLogs}
            className="group block w-full h-full p-8 bg-guardian-blue rounded-[2rem] border border-transparent hover:shadow-xl hover:shadow-dashboard-accent/20 transition-all duration-300 text-left relative overflow-hidden shadow-lg shadow-dashboard-accent/10"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
              <History size={120} className="text-white" />
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-all duration-300">
                <History size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                System Audit Logs
                <ChevronRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                Track every administrative action and security event across the platform.
              </p>
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* Quick Help Footer */}
      <div className="mt-12 p-8 bg-guardian-section rounded-[2rem] border border-guardian-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-guardian-bg rounded-2xl flex items-center justify-center shadow-sm text-guardian-blue border border-guardian-border">
            <span className="text-2xl">🆘</span>
          </div>
          <div className="text-left">
            <h4 className="font-bold text-guardian-heading">Need help with configuration?</h4>
            <p className="text-xs text-guardian-secondary font-medium mt-1">Contact our technical support for enterprise assistance.</p>
          </div>
        </div>
        <button className="px-8 py-3.5 bg-guardian-blue text-white text-xs font-bold rounded-xl hover:bg-guardian-blue/80 transition-all shadow-lg shadow-dashboard-accent/20 uppercase tracking-widest">
          Contact Support
        </button>
      </div>
    </div>
  );
}
