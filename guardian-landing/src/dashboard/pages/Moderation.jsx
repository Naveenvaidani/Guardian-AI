import React, { useState } from 'react';
import { 
  Shield, Send, AlertCircle, CheckCircle2, Search, Filter, 
  MoreHorizontal, Activity, Lock, Globe, User, MessageSquare, 
  Sparkles, Zap, Brain, ShieldAlert, Play, RefreshCw, Trash2, 
  Check, X, FileText, BarChart2, Radio, Server, Layers, Link2, 
  Sliders, AlertTriangle, HelpCircle, HardDrive, Phone, Mail, 
  Map, Fingerprint, Eye, Award, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Initial Data for recent items
const initialRecentItems = {
  government: [
    { id: 'CASE-7291', type: 'Text Document', risk: 'High', confidence: 94, action: 'Escalated to Cybercrime DB', model: 'Text-NLP', source: 'Region: North-East', time: 'Just now', content: 'Instructional guide on sabotage of local utility grids...' },
    { id: 'CASE-7290', type: 'Image Upload', risk: 'High', confidence: 89, action: 'Flagged / Logged', model: 'Img-YOLO', source: 'Network Feed A', time: '4m ago', content: 'Crowd gathering coordinates at restricted zones' },
    { id: 'CASE-7289', type: 'Audio Stream', risk: 'Medium', confidence: 76, action: 'Under Review', model: 'Audio-Wave', source: 'Telecom Trunk 4', time: '12m ago', content: 'Suspicious transaction negotiation with urgency indicators' },
    { id: 'CASE-7288', type: 'Video Feed', risk: 'Low', confidence: 95, action: 'Allowed', model: 'Video-ResNet', source: 'Border Border-3', time: '1h ago', content: 'Routine border patrol check-in transmission' },
  ],
  enterprise: [
    { id: 'ENT-9012', type: 'User Post', risk: 'High', confidence: 98, action: 'Auto-Blocked', model: 'Text-BERT', source: 'Instagram API', time: '1m ago', content: 'Get rich quick scheme! Send $100 to this BTC address to receive $1000...' },
    { id: 'ENT-9011', type: 'Ad Image', risk: 'Medium', confidence: 82, action: 'Restricted', model: 'Img-Vision', source: 'Internal Platform', time: '8m ago', content: 'Promotional graphic containing non-disclosed sponsorship text' },
    { id: 'ENT-9010', type: 'User Comment', risk: 'Low', confidence: 99, action: 'Allowed', model: 'Text-BERT', source: 'X / Twitter API', time: '30m ago', content: 'I really love the new product features launched this morning.' },
    { id: 'ENT-9009', type: 'Video Upload', risk: 'High', confidence: 91, action: 'Auto-Blocked', model: 'Video-Fusion', source: 'YouTube API Feed', time: '2h ago', content: 'Copyrighted movie clip with overlay advertising watermark' },
  ],
  personal: [
    { id: 'PERS-3112', type: 'Chat Message', risk: 'High', confidence: 92, action: 'Alert User / Blocked', model: 'Text-NLP', source: 'WhatsApp App', time: '3m ago', content: 'URGENT: Your bank account is locked. Click bank-login-auth.com immediately to unlock.' },
    { id: 'PERS-3111', type: 'Email Attachment', risk: 'Medium', confidence: 85, action: 'Isolated / Warning', model: 'Multi-Modal', source: 'Gmail Account', time: '15m ago', content: 'Invoice_7781.exe containing unknown payload macros' },
    { id: 'PERS-3110', type: 'Browser Session', risk: 'Low', confidence: 97, action: 'Allowed', model: 'URL-Filter', source: 'Chrome Extension', time: '45m ago', content: 'Search query: how to verify ssl certificate configurations' },
  ]
};

export default function Moderation() {
  const [activeTab, setActiveTab] = useState('Overview'); // Overview, Live Feed, Analyzer, Policy, Ingestion, Reports
  const [mode, setMode] = useState('enterprise'); // government, enterprise, personal
  const [workspace, setWorkspace] = useState('Production');
  const [recentItems, setRecentItems] = useState(initialRecentItems);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Analyzer Page State
  const [analyzerText, setAnalyzerText] = useState('');
  const [analyzerLoading, setAnalyzerLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Connection Toggles
  const [connections, setConnections] = useState({
    cybercrimeApi: true,
    policeDb: true,
    instagramApi: true,
    internalPlatform: true,
    whatsapp: true,
    gmail: true,
    telegram: false
  });

  const toggleConnection = (key) => {
    setConnections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRunAnalysis = () => {
    if (!analyzerText.trim()) return;
    setAnalyzerLoading(true);
    setAnalysisResult(null);

    setTimeout(() => {
      // Generate detailed multi-modal results based on the analysis text input
      const text = analyzerText.toLowerCase();
      let riskScore = 45;
      let riskLevel = 'Medium';
      let detectedItems = ['Spam'];
      let keywords = [];

      if (text.includes('scam') || text.includes('returns') || text.includes('key') || text.includes('money')) {
        riskScore = 78;
        riskLevel = 'High';
        detectedItems = ['Financial Scam', 'Phishing', 'Spam'];
        keywords = ['guaranteed returns', 'private keys', 'money transfer'];
      } else if (text.includes('kill') || text.includes('sabotage') || text.includes('weapon')) {
        riskScore = 92;
        riskLevel = 'High';
        detectedItems = ['National Threat', 'Violence', 'Dangerous Content'];
        keywords = ['sabotage', 'weapon access'];
      } else if (text.includes('test') || text.includes('hello')) {
        riskScore = 12;
        riskLevel = 'Low';
        detectedItems = ['Safe Content'];
      }

      setAnalysisResult({
        score: riskScore,
        risk: riskLevel,
        decision: riskScore > 70 ? 'BLOCK' : riskScore > 30 ? 'RESTRICT' : 'ALLOW',
        reason: riskScore > 70 
          ? "Fraud / safety indicators in text + matching threat signature detected" 
          : riskScore > 30 ? "Potential policy violation; auto-routing to manual moderator queue" : "No safety risks identified",
        textAnalysis: {
          risk: riskLevel,
          score: riskScore,
          confidence: 92,
          detected: detectedItems,
          keywords: keywords.length > 0 ? keywords : ['none']
        },
        imageAnalysis: {
          risk: riskScore > 50 ? 'Medium' : 'Low',
          score: riskScore > 50 ? 58 : 22,
          objects: riskScore > 50 ? ['QR Code', 'Suspicious URL Overlay'] : ['Standard UI Screen'],
          nsfw: 'No',
          manipulation: riskScore > 50 ? 'Possible' : 'Unlikely'
        },
        videoAnalysis: {
          risk: riskScore > 70 ? 'Medium' : 'Low',
          score: riskScore > 70 ? 42 : 18,
          scenesAnalyzed: 24,
          flags: riskScore > 70 ? ['Suspect watermark', 'Urgency text frame'] : ['No flags detected']
        },
        audioAnalysis: {
          risk: riskScore > 50 ? 'Medium' : 'Low',
          score: riskScore > 50 ? 61 : 15,
          transcript: analyzerText.slice(0, 80) + '...',
          detected: riskScore > 50 ? ['Urgent tone', 'High-pressure pitch'] : ['Standard dialogue tone']
        }
      });
      setAnalyzerLoading(false);
    }, 1200);
  };

  const handleQuickAction = (actionName) => {
    alert(`Action Triggered: ${actionName} under ${mode.toUpperCase()} mode.`);
  };

  return (
    <div className="w-full flex flex-col bg-guardian-bg text-guardian-body min-h-screen">
      
      {/* Dark Navy Header Banner - Matches design exactly & stretches edge-to-edge */}
      <div className="bg-[#0A192F] text-white p-6 md:p-8 lg:px-12 rounded-none -mx-4 md:-mx-8 lg:-mx-10 -mt-4 md:-mt-8 lg:-mt-10 border-b border-[#112240] flex flex-col items-start gap-6 shadow-xl relative overflow-hidden w-auto animate-[fadeIn_0.2s_ease-out] shrink-0">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">OPERATING MODE:</span>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
              mode === 'government' ? 'bg-[#1D4ED8] text-white border border-[#3B82F6]/30' :
              mode === 'enterprise' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
            }`}>
              {mode.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-nowrap whitespace-nowrap">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Content Moderation Dashboard
            </h1>
            <span className="px-2 py-0.5 border border-red-500/30 bg-red-500/10 text-red-400 text-[9px] font-bold tracking-widest uppercase rounded">
              LIVE PIPELINE
            </span>
          </div>
        </div>

        {/* Mode Selector Pill inside Banner - Repositioned below dashboard name */}
        <div className="relative z-10 shrink-0 bg-[#020C1B]/80 p-1.5 rounded-full border border-[#1E2D3D] flex items-center gap-1.5">
          <button 
            onClick={() => setMode('personal')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
              mode === 'personal' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User size={13} /> Personal Mode
          </button>
          
          <button 
            onClick={() => setMode('enterprise')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
              mode === 'enterprise' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield size={13} /> Standard Mode
          </button>
          
          <button 
            onClick={() => setMode('government')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
              mode === 'government' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe size={13} /> Government Mode
          </button>
        </div>
      </div>

      {/* Main content wrapped inside the dashboard container */}
      <div className="dashboard-container py-8 space-y-8 w-full flex-grow">
        {/* Spaced Pill Navigation Buttons below the banner */}
        <div className="flex flex-wrap gap-3">
        {[
          { id: 'Overview', label: 'Overview', icon: BarChart2 },
          { id: 'Live Feed', label: 'Ingestion Feed', icon: Radio },
          { id: 'Analyzer', label: 'Manual Ingest (Analyzer)', icon: Brain },
          { id: 'Policy', label: 'Policy Engine', icon: Sliders },
          { id: 'Ingestion', label: 'Auto Ingestion', icon: Server },
          { id: 'Reports', label: 'Audit Logs', icon: FileText },
          { id: 'Settings', label: 'Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Workspace Environment row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <Globe className="text-blue-600" size={16} />
          <span className="text-xs font-bold text-slate-700">Workspace Environment:</span>
          <select 
            value={workspace} 
            onChange={(e) => setWorkspace(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs font-bold py-1 px-2.5 rounded-lg focus:outline-none"
          >
            <option value="Production">Production DB</option>
            <option value="Staging">Staging</option>
            <option value="Demo">Demo Sandbox</option>
          </select>
        </div>
        
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Active Node: Node-041-A (Secure)
        </div>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'Overview' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Dynamic Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                {mode === 'government' ? 'Total Content Monitored' : mode === 'enterprise' ? 'Total Content Processed' : 'Content Scanned'}
              </span>
              <span className="text-3xl font-black text-slate-900">
                {mode === 'government' ? '14,892,110' : mode === 'enterprise' ? '2,491,850' : '108,492'}
              </span>
              <span className="text-emerald-600 text-[10px] font-bold block mt-1">↑ 12.4% vs past 24h</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                {mode === 'government' ? 'National Threat Alerts' : mode === 'enterprise' ? 'Policy Violations' : 'Safety Alerts'}
              </span>
              <span className="text-3xl font-black text-orange-600">
                {mode === 'government' ? '41' : mode === 'enterprise' ? '1,284' : '6'}
              </span>
              <span className="text-red-500 text-[10px] font-bold block mt-1">
                {mode === 'government' ? '🚨 3 Critical Incidents' : 'Action Required'}
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                {mode === 'government' ? 'Surveillance Models' : mode === 'enterprise' ? 'Active AI Models' : 'Protection Status'}
              </span>
              <span className="text-3xl font-black text-slate-900">
                {mode === 'government' ? '12 Active' : mode === 'enterprise' ? '8 Pipelines' : 'Fully Active'}
              </span>
              <span className="text-slate-500 text-[10px] font-bold block mt-1">Accuracy Rate: 99.4%</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                {mode === 'government' ? 'Region Risk Index' : mode === 'enterprise' ? 'Brand Safety Score' : 'Device Risk Level'}
              </span>
              <span className={`text-3xl font-black ${
                mode === 'government' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {mode === 'government' ? 'Medium (0.42)' : '98.5%'}
              </span>
              <span className="text-slate-400 text-[10px] font-bold block mt-1">Realtime Evaluation</span>
            </div>
          </div>

          {/* AI Moderation Pipeline */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Live Moderation Pipeline Flow</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-2">1. Input Stream</span>
                <span className="text-xs font-bold text-slate-800">
                  {mode === 'government' ? 'Telecom Trunk' : mode === 'enterprise' ? 'Webhooks / APIs' : 'Local Device'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-2">2. AI Models</span>
                <span className="text-xs font-bold text-slate-800">Text + Img + Audio</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-2">3. Analysis</span>
                <span className="text-xs font-bold text-slate-800">Object/NLP Parser</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-2">4. Risk Engine</span>
                <span className="text-xs font-bold text-slate-800">Fusion Score</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-2">5. Policy Decision</span>
                <span className="text-xs font-bold text-slate-800">Rules engine</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-2">6. Action Output</span>
                <span className="text-xs font-bold text-emerald-600">Auto Block</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Connected Systems & Automation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-3">Integrations Checklist</span>
                  <div className="space-y-2">
                    {mode === 'government' && (
                      <>
                        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-700">
                          <span>Cybercrime API Connection</span>
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">CONNECTED</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-700">
                          <span>Police Network Database</span>
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">CONNECTED</span>
                        </div>
                      </>
                    )}
                    {mode === 'enterprise' && (
                      <>
                        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-700">
                          <span>Instagram API</span>
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">CONNECTED</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-700">
                          <span>Internal Platform Gateway</span>
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">CONNECTED</span>
                        </div>
                      </>
                    )}
                    {mode === 'personal' && (
                      <>
                        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-700">
                          <span>WhatsApp feed connector</span>
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">CONNECTED</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-700">
                          <span>Gmail security layer</span>
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">CONNECTED</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-bold">Auto Moderation:</span>
                      <span className="text-emerald-600 font-black">ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-bold">Connected Pipelines:</span>
                      <span className="text-slate-800 font-black">6 Nodes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-bold">Escalations Logged today:</span>
                      <span className="text-orange-600 font-black">12 events</span>
                    </div>
                  </div>
                  <button onClick={() => alert('Opening engine preferences...')} className="w-full mt-4 py-2.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl">
                    Configure Automation Rules
                  </button>
                </div>
              </div>
            </div>

            <div className="xl:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Risk & Threat Intelligence</h3>
                <div className="space-y-2">
                  {mode === 'government' && (
                    <p className="text-xs text-red-900 bg-red-50 p-3 rounded-lg font-bold">
                      Geo-location anomalies detected in Section A. Elevated threat indices.
                    </p>
                  )}
                  {mode === 'enterprise' && (
                    <p className="text-xs text-blue-950 bg-blue-50 p-3 rounded-lg font-bold">
                      Ad placement sentiment scan active. brand safety compliance: 99.1%.
                    </p>
                  )}
                  {mode === 'personal' && (
                    <p className="text-xs text-purple-950 bg-purple-50 p-3 rounded-lg font-bold">
                      Phishing keywords filtered from Gmail connector. 0 active leaks.
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status Overview</span>
                <span className="text-xs font-bold text-slate-700">All Nodes Operational</span>
              </div>
            </div>
          </div>

          {/* Recent Analysis Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800">Recent Stream Cases</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50">
                    <th className="px-6 py-3">Case ID</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Risk Level</th>
                    <th className="px-6 py-3">Confidence</th>
                    <th className="px-6 py-3">Model</th>
                    <th className="px-6 py-3">Source</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentItems[mode].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-6 py-3.5 text-xs font-bold text-blue-600">{item.id}</td>
                      <td className="px-6 py-3.5 text-xs font-bold text-slate-700">{item.type}</td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          item.risk === 'High' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {item.risk}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-xs font-bold text-slate-900">{item.confidence}%</td>
                      <td className="px-6 py-3.5 text-xs text-slate-500 font-mono">{item.model}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-700 font-bold">{item.source}</td>
                      <td className="px-6 py-3.5 text-xs font-bold text-slate-900">{item.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Raw Analyzer Tab */}
      {activeTab === 'Analyzer' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Manual Raw Ingestion Feed Analyzer</h3>
            <textarea 
              value={analyzerText}
              onChange={(e) => setAnalyzerText(e.target.value)}
              placeholder="Paste suspicious raw text inputs, email headers, or transaction strings here..."
              className="w-full h-36 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400">MULTIMODAL FUSION PIPELINE ACTIVE</span>
              <div className="flex gap-2">
                <button onClick={() => { setAnalyzerText(''); setAnalysisResult(null); }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-lg">Clear</button>
                <button 
                  onClick={handleRunAnalysis}
                  disabled={analyzerLoading || !analyzerText.trim()}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-lg"
                >
                  {analyzerLoading ? 'Analyzing...' : 'Run Analysis'}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {analysisResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Fusion Card */}
                <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-1">Decision Center</span>
                    <h3 className="text-lg font-black text-slate-900">Result: {analysisResult.decision}</h3>
                    <p className="text-xs text-slate-500 mt-1"><strong>Reason:</strong> {analysisResult.reason}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-2xl font-black text-slate-900">{analysisResult.score}%</span>
                      <span className="text-[8px] font-black text-slate-400 block uppercase tracking-widest">Weighted Risk</span>
                    </div>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: `${analysisResult.score}%` }} />
                    </div>
                  </div>
                </div>

                {/* 4-Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Text Analysis</span>
                    <div className="text-xs font-bold text-slate-700 space-y-1">
                      <p>Risk Score: {analysisResult.textAnalysis.score}%</p>
                      <p>Confidence: {analysisResult.textAnalysis.confidence}%</p>
                      <p>Keywords: {analysisResult.textAnalysis.keywords.join(', ')}</p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Image Analysis</span>
                    <div className="text-xs font-bold text-slate-700 space-y-1">
                      <p>Risk Score: {analysisResult.imageAnalysis.score}%</p>
                      <p>Objects: {analysisResult.imageAnalysis.objects.join(', ')}</p>
                      <p>Manipulated: {analysisResult.imageAnalysis.manipulation}</p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Video Analysis</span>
                    <div className="text-xs font-bold text-slate-700 space-y-1">
                      <p>Risk Score: {analysisResult.videoAnalysis.score}%</p>
                      <p>Scenes: {analysisResult.videoAnalysis.scenesAnalyzed}</p>
                      <p>Deepfake: Negative</p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Audio Analysis</span>
                    <div className="text-xs font-bold text-slate-700 space-y-1">
                      <p>Risk Score: {analysisResult.audioAnalysis.score}%</p>
                      <p>Urgency indicators: {analysisResult.audioAnalysis.detected.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button onClick={() => handleQuickAction('Allow Content')} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg">Allow</button>
                    <button onClick={() => handleQuickAction('Restrict Content')} className="px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-lg">Restrict</button>
                    <button onClick={() => handleQuickAction('Block Content')} className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg">Block</button>
                  </div>
                  <button onClick={handleRunAnalysis} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg">Re-run</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Placeholders for secondary tabs */}
      {activeTab !== 'Overview' && activeTab !== 'Analyzer' && (
        <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Zap size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-800">{activeTab} Section</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">This Trust & Safety feature is fully synchronized with your active session.</p>
        </div>
      )}
      </div>
    </div>
  );
}
