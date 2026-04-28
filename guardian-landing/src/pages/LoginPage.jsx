import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/ui/AuthModal';

export default function LoginPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-guardian-navy flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-guardian-blue/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-guardian-blue/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white/5 rounded-3xl border border-white/10 mb-6 backdrop-blur-xl shadow-2xl cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Shield className="h-10 w-10 text-guardian-blue" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Guardian AI</h1>
          <p className="text-guardian-secondary text-sm font-medium tracking-wide uppercase">Elite Defense Intelligence</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-guardian-border">
          <AuthModal 
            isOpen={true} 
            onClose={() => navigate('/')} 
            onLogin={(user) => {
              console.log('Login success:', user);
              navigate('/dashboard');
            }}
          />
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-8 flex items-center gap-2 text-guardian-secondary hover:text-white transition-colors mx-auto font-bold text-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Homepage
        </button>
      </motion.div>
    </div>
  );
}
