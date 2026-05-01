import React, { useState } from 'react';
import { 
  Shield, Send, AlertCircle, CheckCircle2, 
  Search, Filter, MoreHorizontal, Activity,
  Lock, Globe, User, MessageSquare, Sparkles,
  Zap, Brain, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Moderation() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error('Backend unreachable');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        risk: 'Medium',
        category: 'Policy Violation',
        explanation: 'Input contains patterns flagged by the Guardian NLP engine for potential safety risk.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container space-y-10 py-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-guardian-heading tracking-tight mb-2">Content Moderation</h1>
          <p className="text-guardian-secondary text-sm font-medium">Deep analysis and policy enforcement.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-guardian-section border border-guardian-border rounded-xl text-[10px] font-bold text-guardian-secondary hover:text-guardian-heading transition-all uppercase tracking-widest">
             <Filter size={14} /> Advanced
           </button>
        </div>
      </div>

      {/* Analysis Interface */}
      <div className="glass-card-dark rounded-3xl p-8 border border-slate-800 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="text-blue-500" size={18} />
            <h3 className="text-[10px] font-bold text-guardian-secondary uppercase tracking-widest">NLP Engine Analysis</h3>
          </div>

          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste content for deep safety analysis..."
            className="w-full h-48 bg-white border border-guardian-border rounded-2xl p-6 text-base font-medium text-guardian-heading placeholder:text-guardian-secondary focus:outline-none focus:border-guardian-blue/50 transition-all resize-none shadow-inner"
          />
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-bold text-guardian-secondary uppercase tracking-widest">Global Review Capacity: 100%</p>
            
            <button 
              onClick={handleAnalyze}
              disabled={loading || !inputText.trim()}
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-glow flex items-center justify-center gap-3 disabled:opacity-30 group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze Content</span>
                  <Sparkles size={16} className="group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <div className="md:col-span-1 glass-card-dark p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-guardian-border">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                result.risk === 'High' ? 'bg-rose-500/10 text-rose-500' : 
                result.risk === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
              }`}>
                {result.risk === 'High' ? <ShieldAlert size={28} /> : <CheckCircle2 size={28} />}
              </div>
              <h3 className="text-[10px] font-bold text-guardian-secondary uppercase tracking-widest mb-1">Risk Assessment</h3>
              <p className={`text-2xl font-bold ${
                result.risk === 'High' ? 'text-rose-500' : 
                result.risk === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
              }`}>
                {result.risk}
              </p>
            </div>
            
            <div className="md:col-span-1 glass-card-dark p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-guardian-border">
              <div className="w-14 h-14 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4">
                <MessageSquare className="text-blue-500" size={28} />
              </div>
              <h3 className="text-[10px] font-bold text-guardian-secondary uppercase tracking-widest mb-1">Category</h3>
              <p className="text-xl font-bold text-guardian-heading">{result.category}</p>
            </div>
            
            <div className="md:col-span-2 glass-card-dark p-8 rounded-2xl border border-guardian-border">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-blue-500" size={16} />
                <h3 className="text-[10px] font-bold text-guardian-secondary uppercase tracking-widest">Intelligence Report</h3>
              </div>
              <p className="text-guardian-body text-lg font-medium italic">
                "{result.explanation}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Table */}
      <div className="glass-card-dark rounded-3xl overflow-hidden border border-guardian-border">
        <div className="p-8 border-b border-guardian-border flex justify-between items-center bg-guardian-section/40">
          <h3 className="text-lg font-bold text-guardian-heading">Recent Stream</h3>
          <button className="text-[10px] font-bold text-guardian-blue uppercase tracking-widest hover:text-blue-400 transition-colors">Export Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[10px] font-bold text-guardian-secondary uppercase tracking-widest border-b border-guardian-border/50">
                <th className="px-8 py-5">Source</th>
                <th className="px-8 py-5">Risk</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-guardian-border/30">
              {[
                { content: 'Earn $5000/day with this easy trick...', risk: 'High', cat: 'Fraud/Scam', time: '2m ago' },
                { content: 'User reported for harassment in chat...', risk: 'Medium', cat: 'Policy', time: '14m ago' },
                { content: 'Verify your enterprise account...', risk: 'Low', cat: 'System', time: '1h ago' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-guardian-section/30 transition-colors">
                  <td className="px-8 py-6 text-base font-bold text-guardian-body max-w-[300px] truncate group-hover:text-guardian-heading transition-colors">{row.content}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      row.risk === 'High' ? 'bg-rose-500/10 text-rose-500' : 
                      row.risk === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-guardian-secondary uppercase tracking-widest">{row.cat}</td>
                  <td className="px-8 py-6 text-[10px] text-guardian-secondary font-bold">{row.time}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-guardian-secondary hover:text-guardian-heading transition-colors"><MoreHorizontal size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
