import React, { useState } from 'react';
import Sidebar from '../dashboard/components/Sidebar';

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-guardian-bg text-guardian-heading font-sans selection:bg-guardian-blue/30 overflow-x-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div 
        className={`transition-all duration-300 ease-in-out min-h-screen flex flex-col ${
          isCollapsed ? 'pl-[80px]' : 'pl-[280px]'
        }`}
      >
        {/* Page Content */}
        <main className="p-4 md:p-8 lg:p-10 flex-1">
          {children}
        </main>
        
        {/* Sub-footer Versioning */}
        <div className="w-full pb-6 text-center pointer-events-none opacity-20">
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-guardian-secondary">Guardian AI // Operational Intelligence Suite</p>
        </div>
      </div>
    </div>
  );
}
