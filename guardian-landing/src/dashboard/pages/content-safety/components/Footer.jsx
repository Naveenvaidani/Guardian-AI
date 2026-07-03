import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 mb-8 py-6 border-t border-slate-200 text-center flex flex-col items-center justify-center text-slate-500">
      <ShieldCheck className="w-6 h-6 text-fraud-cyan mb-2" />
      <p className="font-bold text-sm tracking-widest uppercase">360° AI Safety Enforcement System</p>
      <p className="text-xs mt-1 font-medium">Guardian AI Platform © 2026</p>
    </footer>
  );
}
