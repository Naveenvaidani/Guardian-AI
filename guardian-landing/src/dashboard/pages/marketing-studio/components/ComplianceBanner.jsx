import React from 'react';
import { AlertTriangle, RotateCcw, AlertOctagon, HelpCircle } from 'lucide-react';

export default function ComplianceBanner({ issues, onResolve, onProceed }) {
  if (!issues || issues.length === 0) return null;

  return (
    <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 my-3 backdrop-blur-md animate-pulse-glow shadow-[0_0_15px_rgba(239,68,68,0.05)]">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-1.5">
            Compliance Warning
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold uppercase tracking-wider">
              Failed Audit
            </span>
          </h4>
          <ul className="mt-1.5 space-y-1">
            {issues.map((issue, idx) => (
              <li key={idx} className="text-xs text-rose-300/95 leading-relaxed flex items-start gap-1">
                <span className="text-rose-400 font-bold">•</span>
                {issue}
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap items-center gap-3 mt-3.5 pt-3 border-t border-rose-500/15">
            <button
              onClick={() => onResolve('regenerate')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 transition-colors border border-rose-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Fix & Regenerate
            </button>
            <button
              onClick={() => onProceed()}
              className="text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors"
            >
              Ignore & Force Approve
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => onResolve('review')}
              className="flex items-center gap-1 px-1 py-0.5 text-xs text-gray-400 hover:text-gray-200 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Request Manual Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
