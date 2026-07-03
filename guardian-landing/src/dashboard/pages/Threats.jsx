import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Activity, Cpu, Database, Network, Globe, AlertTriangle, 
  Upload, CheckCircle, Radio, Terminal, Settings, MessageSquare, Play, 
  ShieldAlert, Layers, Wifi, TrendingUp, Users, Lock, RefreshCw, Send, AlertCircle,
  Menu, Search, Bell, User, LogOut, ChevronLeft, ChevronRight, Sliders, FileText, Building2, UserCheck
} from 'lucide-react';

const INITIAL_ANOMALIES = [
  { time: '14:40:02', event: 'Mass login attempt cluster - Western Border', score: 92, status: 'Active' },
  { time: '14:38:15', event: 'Coordinated bot posting surge - Twitter/X API', score: 85, status: 'Mitigated' },
  { time: '14:31:50', event: 'Encrypted transfer deviation - Defense Network TAP', score: 97, status: 'Investigating' },
  { time: '14:28:11', event: 'Sudden financial transaction spike - District 3', score: 78, status: 'Allowed' }
];

const STANDARD_METRICS = [
  { label: 'Safety Index', value: '98.4%', desc: 'Platform-wide safety health', color: 'text-emerald-605', trend: '+0.4%' },
  { label: 'Content Flags', value: '1,482', desc: 'Auto-flagged today', color: 'text-amber-500', trend: 'Watch' },
  { label: 'Active Filters', value: '12 / 12', desc: 'Rules & policy engine active', color: 'text-blue-500', trend: 'Enforced' },
  { label: 'Inference Delay', value: '42ms', desc: 'Average model runtime', color: 'text-purple-500', trend: 'Optimal' }
];

const GOV_METRICS = [
  { label: 'System Integrity', value: '99.98%', desc: 'NITRS Core Status', color: 'text-emerald-500', trend: 'Active' },
  { label: 'Threat Alerts', value: '18 Active', desc: 'Escalated warnings', color: 'text-rose-500', trend: 'High Alert' },
  { label: 'Data Ingestion Rate', value: '4.8 GB/s', desc: 'Kafka streams intake', color: 'text-cyan-500', trend: '+12.4%' },
  { label: 'Vector DB Size', value: '12.4M', desc: 'FAISS stored embeddings', color: 'text-purple-500', trend: 'Syncing' }
];

export default function Threats() {
  const [govMode, setGovMode] = useState(true); 
  const [activeTab, setActiveTab] = useState('overview');

  const [anomalyScore, setAnomalyScore] = useState(64);
  const [deviationPercent, setDeviationPercent] = useState(14.8);
  const [spikeFrequency, setSpikeFrequency] = useState(5);
  const [activityHistory, setActivityHistory] = useState([30, 45, 38, 64, 52, 70, 85, 60, 68, 72, 94, 61]);
  const [anomalyList, setAnomalyList] = useState(INITIAL_ANOMALIES);
  
  // Phase 1: Intake Upload State
  const [uploadText, setUploadText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [intakeLog, setIntakeLog] = useState('');
  const [intakeFeed, setIntakeFeed] = useState([
    { source: 'Telecom Gateway', type: 'IP Logs', size: '128 KB', status: 'Ingested', time: 'Just now' },
    { source: 'CCTV West Gate', type: 'Video Stream', size: '2.4 MB', status: 'Ingested', time: '2m ago' },
    { source: 'X (formerly Twitter) API', type: 'Social Feeds', size: '14 KB', status: 'Processing', time: '3m ago' }
  ]);

  // Phase 3: Threat Detection Levels
  const [threatScores, setThreatScores] = useState({
    hate: 42,
    scam: 55,
    fraud: 78,
    attack: 92
  });

  // Phase 6: RAG Intelligence Engine Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'system', text: 'RAG Intelligence Engine (Model 6) online. Operational context is loaded.' },
    { sender: 'user', text: 'Run intelligence analysis on the recent Western Border login spike.' },
    { sender: 'ai', text: 'Analysis completed. Isolation Forest flagged 142 incoming requests from IP range 185.220.101.xx. Signature matches botnet activity trying to bypass L2 firewalls. Recommend activating Cyber Lockdown playbook.' }
  ]);
  const [chatTyping, setChatTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Playbook execution states
  const [executingPlaybook, setExecutingPlaybook] = useState(null);
  const [playbookLogs, setPlaybookLogs] = useState([]);

  // Auto Scroll Chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatTyping]);

  // Simulate real-time metric fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setAnomalyScore(prev => {
        const next = prev + Math.floor(Math.random() * 9) - 4;
        return Math.min(Math.max(next, 20), 100);
      });
      setDeviationPercent(prev => {
        const next = prev + (Math.random() * 2 - 1);
        return parseFloat(Math.min(Math.max(next, 5), 50).toFixed(1));
      });
      setActivityHistory(prev => {
        const next = [...prev.slice(1)];
        const newVal = Math.floor(Math.random() * 50) + 35;
        next.push(newVal);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleIntakeSubmit = (e) => {
    e.preventDefault();
    if (!uploadText.trim()) return;
    
    setUploading(true);
    setIntakeLog('Routing to NLP (BERT) tokenizer & generating embeddings...');
    
    setTimeout(() => {
      setIntakeLog('Multi-modal fusion: Storing unified embedding vector in FAISS DB...');
      setTimeout(() => {
        setUploading(false);
        setIntakeLog('');
        
        setIntakeFeed(prev => [
          {
            source: 'Manual Console Ingest',
            type: 'Text/Logs',
            size: `${(uploadText.length / 1024).toFixed(2)} KB`,
            status: 'Ingested',
            time: 'Just now'
          },
          ...prev
        ]);
        
        if (uploadText.toLowerCase().includes('attack') || uploadText.toLowerCase().includes('breach')) {
          setAnomalyList(prev => [
            { time: new Date().toLocaleTimeString(), event: 'Manual trigger threat signature detected', score: 99, status: 'Active' },
            ...prev
          ]);
          setThreatScores(prev => ({ ...prev, attack: 99 }));
        }

        setUploadText('');
      }, 1000);
    }, 1200);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setChatTyping(true);

    setTimeout(() => {
      setChatTyping(false);
      let response = '';
      const text = userMsg.toLowerCase();
      if (text.includes('status')) {
        response = 'All monitoring nodes are green. Threat Detection level average is 66/100. System is operational.';
      } else if (text.includes('playbook') || text.includes('crisis')) {
        response = 'Available automated playbooks: Cyber Lockdown, Telemetry Intercept, Threat Isolation. You can initiate them via the Automated response playbooks panel.';
      } else if (text.includes('anomaly')) {
        response = `Current anomaly score is ${anomalyScore}% with a deviation of ${deviationPercent}% from the 24h baseline. High risk activities are marked red in Surveillance panel.`;
      } else {
        response = 'Understood. Accessing FAISS vector space for context... Cross-referencing active threat feeds. Alert Level is monitored. Let me know if you want to initiate a response playbook.';
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: response }]);
    }, 1500);
  };

  const runPlaybook = (playbookName) => {
    if (executingPlaybook) return;
    setExecutingPlaybook(playbookName);
    setPlaybookLogs([`[0.0s] Initializing playbook: ${playbookName}`]);

    const steps = [
      `[1.2s] authenticating command signatures...`,
      `[2.5s] redirecting system network streams...`,
      `[4.0s] applying rules via automated API gateways...`,
      `[5.2s] playbook successfully enforced. Telemetry synchronized.`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setPlaybookLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setExecutingPlaybook(null);
      }
    }, 1300);
  };

  const currentMetrics = govMode ? GOV_METRICS : STANDARD_METRICS;

  return (
    <div className="w-full flex flex-col bg-guardian-bg text-guardian-body min-h-screen">
      
      {/* 1. Sub-mode Selector Header - Matches design exactly */}
      <section className="bg-[#0A192F] text-white p-6 md:p-8 lg:px-12 rounded-none -mx-4 md:-mx-8 lg:-mx-10 -mt-4 md:-mt-8 lg:-mt-10 border-b border-[#112240] flex flex-col items-start gap-6 shadow-xl relative overflow-hidden w-auto animate-[fadeIn_0.2s_ease-out] shrink-0">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-start text-left space-y-3">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
            Operating Mode: <span className="text-white bg-blue-600/30 px-2.5 py-0.5 rounded border border-blue-500/30 font-black tracking-widest">{govMode ? 'GOVERNMENT' : 'STANDARD'}</span>
          </p>
          <div className="flex items-center gap-3 flex-nowrap whitespace-nowrap">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Threat & Crisis Response Dashboard
            </h2>
            <span className="text-[9px] bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest animate-pulse">
              Live Pipeline
            </span>
          </div>
        </div>

        {/* Dynamic Mode Switcher - Placed below heading */}
        <div className="relative z-10 flex items-center bg-[#070e1b]/60 border border-slate-700 rounded-full p-1.5 shrink-0">
          <button
            onClick={() => setGovMode(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
              !govMode 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck size={13} className={!govMode ? 'text-white' : 'text-slate-400'} />
            Standard Mode
          </button>
          <button
            onClick={() => setGovMode(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
              govMode 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe size={13} className={govMode ? 'text-white' : 'text-slate-400'} />
            Government Mode
          </button>
        </div>
      </section>

      {/* Main content wrapped inside the dashboard container */}
      <div className="dashboard-container py-8 space-y-8 w-full flex-grow">
        {/* Tab Selector Links */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'overview', label: 'Overview', icon: Globe },
          { id: 'analyzer', label: 'Manual Ingest (Analyzer)', icon: Sliders },
          { id: 'feed', label: 'Ingestion Feed', icon: Activity },
          { id: 'model-status', label: 'Model Performance', icon: Cpu },
          { id: 'policies', label: 'Crisis Playbooks', icon: Lock },
          { id: 'audit', label: 'Audit Logs', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-600 border-blue-200 font-bold' 
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <item.icon size={13} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Dynamic Warning Notification Banner */}
      {govMode && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm text-left">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-650 animate-bounce shrink-0" size={20} />
            <div>
              <p className="text-sm font-bold text-red-800">🚨 National Threat Advisory (Alert Level HIGH)</p>
              <p className="text-xs text-slate-600 mt-0.5">
                Multi-agency channels synchronized. AI security clearance escalated to Level 4. Threat detection engine is running fusion models.
              </p>
            </div>
          </div>
          <button 
            onClick={() => runPlaybook('Cyber Lockdown')}
            className="px-4 py-1.5 bg-red-650 hover:bg-red-750 text-white text-[10px] font-black uppercase tracking-wider rounded-lg transition-all shadow-sm shrink-0"
          >
            Initiate Crisis Protocol
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentMetrics.map((card, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all relative overflow-hidden group shadow-sm text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all pointer-events-none" />
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{card.label}</p>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 ${
                card.trend.includes('+') || card.trend.includes('Active') || card.trend.includes('Enforced') || card.trend.includes('Optimal')
                  ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
                  : 'text-red-650 bg-rose-50 border-rose-100'
              }`}>
                {card.trend}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold mt-2">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Dynamic Tab Renderers */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Anomaly surveillance Panel */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col text-left">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="text-blue-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">
                    {govMode ? 'National Anomaly Surveillance' : 'Anomaly Intelligence Engine'}
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-600 rounded-sm" /> Baseline</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-500 rounded-sm" /> Anomalies</span>
                </div>
              </div>

              {/* Line Chart */}
              <div className="h-64 w-full bg-slate-50 rounded-xl relative overflow-hidden flex items-end p-2 border border-slate-200">
                <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path
                    d={`M 0 100 ${activityHistory.map((val, idx) => `L ${(idx / (activityHistory.length - 1)) * 100} ${100 - val}`).join(' ')} L 100 100 Z`}
                    fill="url(#chartGlow)"
                  />
                  <path
                    d={activityHistory.map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${(idx / (activityHistory.length - 1)) * 100} ${100 - val}`).join(' ')}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                  />
                  {activityHistory.map((val, idx) => {
                    if (val > 75) {
                      return (
                        <g key={idx}>
                          <circle cx={(idx / (activityHistory.length - 1)) * 100} cy={100 - val} r="3" fill="#EF4444" className="animate-ping" />
                          <circle cx={(idx / (activityHistory.length - 1)) * 100} cy={100 - val} r="2.5" fill="#EF4444" />
                        </g>
                      );
                    }
                    return null;
                  })}
                </svg>
                <div className="absolute top-2 left-2 text-[10px] bg-white border border-slate-200 rounded px-2 py-1 font-mono text-slate-500 font-bold shadow-sm">
                  Live Signal Telemetry Model: Autoencoder L4
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Anomaly Score</span>
                  <span className="text-lg font-black text-red-600">{anomalyScore} / 100</span>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Deviation Baseline</span>
                  <span className="text-lg font-black text-amber-600">+{deviationPercent}%</span>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Spike Frequency</span>
                  <span className="text-lg font-black text-blue-600">{spikeFrequency} / min</span>
                </div>
              </div>
            </div>

            {/* Data Intake Panel */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col text-left">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="text-blue-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">
                    {govMode ? 'National Data Intake Grid' : 'Multi-Modal Intelligence Input'}
                  </h3>
                </div>
              </div>

              <form onSubmit={handleIntakeSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                    Upload text/logs for cross-modal embedding
                  </label>
                  <textarea
                    value={uploadText}
                    onChange={(e) => setUploadText(e.target.value)}
                    placeholder="Paste suspicious logs, social media text, or packet headers..."
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white text-xs font-black uppercase tracking-wider py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="animate-spin" size={14} /> Processing Model Fusion...
                    </>
                  ) : (
                    <>
                      <Upload size={14} /> Ingest into FAISS Vector DB
                    </>
                  )}
                </button>
              </form>

              {intakeLog && (
                <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-mono text-cyan-600 flex items-center gap-2">
                  <Terminal size={12} className="shrink-0" />
                  <span>{intakeLog}</span>
                </div>
              )}

              <div className="mt-6 space-y-3 flex-1 overflow-y-auto">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Stream Ingestion</p>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {intakeFeed.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-700">{item.source}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{item.type} • {item.size}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          item.status === 'Ingested' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'
                        }`}>
                          {item.status}
                        </span>
                        <p className="text-[9px] text-slate-400 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Threat Engine */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col text-left">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="text-purple-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">Threat Detection Engine</h3>
                </div>
              </div>
              <div className="space-y-4">
                {Object.entries(threatScores).map(([name, val]) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs font-bold mb-1 uppercase">
                      <span>{name} Threat</span>
                      <span>{val}%</span>
                    </div>
                    <div className="h-2 bg-slate-150 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RAG chat */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col text-left">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-blue-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">RAG Intelligence Engine</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
                <div className="md:col-span-7 flex flex-col bg-slate-50 rounded-xl p-3 border border-slate-200 h-80">
                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-left">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`p-2.5 rounded-lg text-xs max-w-[85%] ${
                        msg.sender === 'ai' ? 'bg-white border border-slate-200 text-slate-700 self-start font-medium' :
                        msg.sender === 'system' ? 'bg-slate-100 border border-dashed border-slate-250 text-blue-600 text-center font-mono w-full font-bold' :
                        'bg-blue-600 text-white ml-auto self-end font-bold'
                      }`}>
                        {msg.text}
                      </div>
                    ))}
                    {chatTyping && <div className="text-slate-400 animate-pulse text-xs">Analyzing...</div>}
                    <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask RAG..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-755 p-2 rounded-xl text-white">Send</button>
                  </form>
                </div>
                <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Response Playbooks</span>
                    <button onClick={() => runPlaybook('Cyber Lockdown')} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-left text-xs transition-all flex items-center justify-between">
                      <span>🔒 Cyber Lockdown</span>
                      <Play size={12} className="text-red-500" />
                    </button>
                    <button onClick={() => runPlaybook('Telemetry Intercept')} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-left text-xs transition-all flex items-center justify-between">
                      <span>📡 Telemetry Intercept</span>
                      <Play size={12} className="text-blue-500" />
                    </button>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-[9px] text-cyan-455 h-28 overflow-y-auto">
                    {playbookLogs.map((log, idx) => <div key={idx}>{log}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analyzer' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sliders className="text-blue-600" size={18} />
              Manual Threat Analyzer Console
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <form onSubmit={handleIntakeSubmit} className="space-y-4">
                <textarea
                  value={uploadText}
                  onChange={(e) => setUploadText(e.target.value)}
                  placeholder="Paste raw data headers..."
                  rows="8"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs"
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl text-xs uppercase font-bold">
                  Execute Analysis
                </button>
              </form>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border p-4 rounded-xl h-full font-mono text-xs">
                {intakeLog || "Ready to receive intake signals..."}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feed' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Activity className="text-blue-600" size={18} />
              Live Stream Telemetry Ingestion Feed
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-2">
              {intakeFeed.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border p-3 rounded-xl flex justify-between text-xs">
                  <span>{item.source} • {item.type}</span>
                  <span className="font-bold text-emerald-600">{item.status}</span>
                </div>
              ))}
            </div>
            <div className="lg:col-span-6 bg-slate-900 text-cyan-400 p-4 rounded-xl font-mono text-xs h-80 overflow-y-auto">
              {anomalyList.map((item, idx) => (
                <div key={idx} className="mb-2">[{item.time}] {item.event} - Score {item.score}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'model-status' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Cpu className="text-blue-600" size={18} />
              AI Model Performance &amp; Fusion Matrix
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['CLIP Vision Fusion (28ms)', 'BERT Sequence Classifier (14ms)', 'Isolation Forest Node (8ms)', 'RAG Llama 3 (1.2s)'].map((name, idx) => (
              <div key={idx} className="bg-slate-50 border p-4 rounded-xl">
                <span className="font-bold text-slate-800 text-xs block">{name}</span>
                <span className="text-[10px] text-slate-400 block mt-1">Status: Operational</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Lock className="text-blue-600" size={18} />
              Automated Security playbooks &amp; Policies
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Cyber Lockdown', 'Telemetry Intercept', 'Threat Isolation'].map((name) => (
              <div key={name} className="bg-slate-50 border p-4 rounded-xl">
                <h4 className="font-bold text-slate-800 text-xs">{name}</h4>
                <button onClick={() => runPlaybook(name)} className="mt-4 bg-slate-900 hover:bg-slate-800 text-white text-[10px] py-1.5 px-3 rounded-lg font-bold">
                  Run Policy Action
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <FileText className="text-blue-600" size={18} />
              Audit Logs &amp; Incident Case History
            </h3>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">Event</th>
                <th className="pb-2">AI Score</th>
              </tr>
            </thead>
            <tbody>
              {anomalyList.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 font-mono text-slate-400">{item.time}</td>
                  <td className="py-2 font-bold text-slate-800">{item.event}</td>
                  <td className="py-2 text-red-500 font-bold">{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Settings className="text-blue-600" size={18} />
              System Configuration &amp; API Keys
            </h3>
          </div>
          <div className="bg-slate-50 border p-4 rounded-xl text-xs font-mono">
            API Key: sk_live_guard_ai_74e2d...
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
