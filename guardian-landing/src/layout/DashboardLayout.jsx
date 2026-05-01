import React, { useState } from 'react';
import Sidebar from '../dashboard/components/Sidebar';

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-guardian-bg text-guardian-heading font-sans selection:bg-guardian-blue/30 overflow-x-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? 'pl-[80px]' : 'pl-[280px]'
        }`}
      >
        {/* Page Content */}
        <main className="p-4 md:p-8 lg:p-10 min-h-screen">
          {children}
        </main>
        
        {/* Sub-footer Versioning */}
        <div className="fixed bottom-6 right-8 pointer-events-none opacity-10">
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-guardian-secondary">Guardian AI // Operational Intelligence Suite</p>
        </div>
      </div>
    </div>
  );
}
