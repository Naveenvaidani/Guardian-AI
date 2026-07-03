import React, { useState, useEffect } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, Bell, Search, Settings, 
  Lock, Play, Layers, RefreshCw, Send, HelpCircle, User, LogOut, 
  ChevronLeft, ChevronRight, BarChart2, Radio, Sliders, Server, 
  FileText, Check, Plus, ExternalLink, Download, Share2, Info, 
  Eye, Sparkles, X, PlusCircle, AlertCircle, Phone, Database, 
  Network, Activity, Globe, CheckSquare, Square, EyeOff, Mic, 
  Headphones, Trash2, SlidersHorizontal, Sliders as SlidersIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, BarChart, Bar, LineChart, Line, Legend 
} from 'recharts';

export default function PolicyEnforcement() {
  // Global States
  const [mode, setMode] = useState('enterprise'); // individual, enterprise, government
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modals & Panels States
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Create Policy Wizard Step (1 to 9)
  const [wizardStep, setWizardStep] = useState(1);
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    description: '',
    mode: 'enterprise',
    targets: { text: true, image: true, audio: false, video: false },
    models: { nlp: true, vision: true, speech: false, deepfake: false, offender: false, xgboost: true },
    riskThreshold: 80,
    contentType: 'Spam',
    repeatOffender: 'No',
    contextRisk: 'Medium',
    actions: { flag: true, notify: true, moderator: false, remove: false, shadowban: false, suspend: false, warning: false, visibility: false, agegate: false, tempban: false },
    automation: 'Semi-Automated'
  });

  // Export Modal States
  const [exportDataTypes, setExportDataTypes] = useState({
    policy: true,
    metrics: true,
    logs: true,
    actions: false,
    multimodal: false
  });
  const [exportFormat, setExportFormat] = useState('CSV');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Workflow Checklist State
  const [workflowActions, setWorkflowActions] = useState({
    flag: true,
    notify: true,
    moderator: false,
    suspend: false,
    shadowban: false,
    remove: false,
    warning: false,
    visibility: false,
    agegate: false,
    tempban: false
  });

  // Integrations Panel Tab & Connection States
  const [integrationsTab, setIntegrationsTab] = useState('enterprise'); // individual, enterprise, government
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    instagram: true,
    whatsapp: true,
    telegram: false,
    twitter: true,
    youtube: false
  });
  const [deviceConnections, setDeviceConnections] = useState({
    mobile: true,
    desktop: true,
    browser: true
  });
  const [webhookStatus, setWebhookStatus] = useState({
    flagged: 'Active',
    reported: 'Active',
    detected: 'Inactive'
  });

  // Chat Widget States
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! I am the Guardian AI Enforcement assistant. Ask me anything about real-time compliance policies or auto-actions.', time: 'Just now' }
  ]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Core Policies List State (so users can add policies!)
  const [policies, setPolicies] = useState([
    { id: 1, name: 'No Hate Speech', description: 'Detects hate, abusive, and discriminatory content using AI models', models: ['NLP', 'Multimodal Vision', 'Risk Scoring (XGBoost)'], riskScore: 89, actions: ['Flag Content', 'Send to Moderator'], automation: 'Semi-Automated', lastDecision: '2 hours ago', mode: 'enterprise' },
    { id: 2, name: 'Spam Detection', description: 'Identifies spam, promotional abuse, and bot-generated content', models: ['NLP', 'Repeat Offender (KMeans)', 'Pattern Recognition'], riskScore: 76, actions: ['Flag Content', 'Shadow Ban'], automation: 'Fully Automated', lastDecision: '15 minutes ago', mode: 'enterprise' },
    { id: 3, name: 'Misinformation Control', description: 'Detects false claims, deepfakes, and manipulated media', models: ['Multimodal Vision', 'Fact-Check API', 'Risk Scoring (XGBoost)'], riskScore: 92, actions: ['Flag Content', 'Add Warning Label'], automation: 'Semi-Automated', lastDecision: '1 hour ago', mode: 'enterprise' },
    { id: 4, name: 'Harassment Prevention', description: 'Identifies targeted harassment, bullying, and threatening behavior', models: ['NLP', 'Context Analysis', 'Repeat Offender (KMeans)'], riskScore: 84, actions: ['Flag Content', 'Notify User'], automation: 'Semi-Automated', lastDecision: '3 hours ago', mode: 'individual' },
    { id: 5, name: 'NSFW Content Filter', description: 'Detects adult content, nudity, and inappropriate imagery', models: ['Multimodal Vision', 'Image Classification', 'Risk Scoring (XGBoost)'], riskScore: 95, actions: ['Flag Content', 'Age-Gate'], automation: 'Fully Automated', lastDecision: '30 minutes ago', mode: 'individual' },
    { id: 6, name: 'Violence Detection', description: 'Identifies violent content, graphic imagery, and threats', models: ['Multimodal Vision', 'NLP', 'Severity Scoring'], riskScore: 88, actions: ['Flag Content', 'Send to Moderator'], automation: 'Semi-Automated', lastDecision: '45 minutes ago', mode: 'government' }
  ]);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, time: '2026-06-17 18:30:12', type: 'Text (NLP)', mode: 'enterprise', risk: '89%', action: 'Flag & Notify', model: 'LLM-Guard-v2', status: 'Success' },
    { id: 2, time: '2026-06-17 18:24:55', type: 'Image (Vision)', mode: 'individual', risk: '95%', action: 'Age-Gate Appled', model: 'Vision-Guard-v4', status: 'Success' },
    { id: 3, time: '2026-06-17 18:15:30', type: 'Video (Motion)', mode: 'government', risk: '92%', action: 'Escalate to Authority', model: 'Temporal-Scan-X', status: 'Flagged' },
    { id: 4, time: '2026-06-17 17:58:12', type: 'Audio (Speech)', mode: 'enterprise', risk: '76%', action: 'Monitor Session', model: 'Whisper-Sentinel', status: 'Success' }
  ]);

  // Handle Mode Change from Navbar or dropdown
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIntegrationsTab(newMode);
  };

  // Sync mode filter inside policy form
  useEffect(() => {
    setNewPolicy(prev => ({ ...prev, mode: mode }));
  }, [mode]);

  // Filter policies based on Search & Mode Switcher
  const filteredPolicies = policies.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = p.mode === mode;
    return matchesSearch && matchesMode;
  });

  // Add Policy Handler
  const handleSavePolicy = () => {
    const activeModels = [];
    if (newPolicy.models.nlp) activeModels.push('NLP Classifier');
    if (newPolicy.models.vision) activeModels.push('Multimodal Vision');
    if (newPolicy.models.speech) activeModels.push('Speech Analysis');
    if (newPolicy.models.deepfake) activeModels.push('Deepfake Detection');
    if (newPolicy.models.offender) activeModels.push('Repeat Offender Model');
    if (newPolicy.models.xgboost) activeModels.push('Risk Scoring (XGBoost)');

    const activeActions = [];
    if (newPolicy.actions.flag) activeActions.push('Flag Content');
    if (newPolicy.actions.notify) activeActions.push('Notify User');
    if (newPolicy.actions.moderator) activeActions.push('Send to Moderator');
    if (newPolicy.actions.remove) activeActions.push('Remove Content');
    if (newPolicy.actions.shadowban) activeActions.push('Shadow Ban');
    if (newPolicy.actions.suspend) activeActions.push('Suspend Account');
    if (newPolicy.actions.warning) activeActions.push('Add Warning Label');
    if (newPolicy.actions.visibility) activeActions.push('Reduce Visibility');
    if (newPolicy.actions.agegate) activeActions.push('Age-Gate');
    if (newPolicy.actions.tempban) activeActions.push('Temporary Ban');

    const added = {
      id: Date.now(),
      name: newPolicy.name || 'Untitled Custom Policy',
      description: newPolicy.description || 'Custom defined compliance rules targeting content',
      models: activeModels.length > 0 ? activeModels : ['NLP Classifier', 'Risk Scoring'],
      riskScore: newPolicy.riskThreshold,
      actions: activeActions.length > 0 ? activeActions : ['Flag Content'],
      automation: newPolicy.automation,
      lastDecision: 'Just Now',
      mode: newPolicy.mode
    };

    setPolicies(prev => [added, ...prev]);

    // Append to Audit Logs
    const addedLog = {
      id: Date.now() + 1,
      time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: newPolicy.targets.text ? 'Text (NLP)' : newPolicy.targets.image ? 'Image (Vision)' : 'Multimodal',
      mode: newPolicy.mode,
      risk: `${newPolicy.riskThreshold}%`,
      action: activeActions[0] || 'Flagged',
      model: activeModels[0] || 'XGBoost',
      status: 'Created'
    };
    setAuditLogs(prev => [addedLog, ...prev]);

    // Reset Creation State
    setIsCreateOpen(false);
    setWizardStep(1);
    setNewPolicy({
      name: '',
      description: '',
      mode: mode,
      targets: { text: true, image: true, audio: false, video: false },
      models: { nlp: true, vision: true, speech: false, deepfake: false, offender: false, xgboost: true },
      riskThreshold: 80,
      contentType: 'Spam',
      repeatOffender: 'No',
      contextRisk: 'Medium',
      actions: { flag: true, notify: true, moderator: false, remove: false, shadowban: false, suspend: false, warning: false, visibility: false, agegate: false, tempban: false },
      automation: 'Semi-Automated'
    });
  };

  // Mock Export Handler
  const handleExportSubmit = () => {
    setIsExporting(true);
    setExportSuccess(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => {
        setIsExportOpen(false);
        setExportSuccess(false);
        alert(`Successfully downloaded Guardian_AI_${mode}_Metrics.${exportFormat.toLowerCase()}`);
      }, 1200);
    }, 1500);
  };

  // Toggle Connection Platform
  const togglePlatform = (p) => {
    setConnectedPlatforms(prev => ({ ...prev, [p]: !prev[p] }));
  };

  // Toggle Device Connection
  const toggleDevice = (d) => {
    setDeviceConnections(prev => ({ ...prev, [d]: !prev[d] }));
  };

  // Handle Workflow Config Save
  const handleSaveWorkflow = () => {
    alert("AI Auto-Enforcement Workflow Settings Saved Successfully!");
  };

  // Handle Chat Submit
  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: chatInput, time: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Simulate response
    setTimeout(() => {
      let botResponse = 'Understood. Guardian AI auto-enforcement engine evaluates incoming content streams against active model weights. Actions are explanation-ready and trace directly back to our NLP/Vision layers.';
      if (chatInput.toLowerCase().includes('policy')) {
        botResponse = 'Active policies span across NLP Classification, Multimodal Vision, and KMeans Offender tracking. The risk score threshold triggers soft actions for individuals and aggressive actions for governmental feeds.';
      } else if (chatInput.toLowerCase().includes('enforcement') || chatInput.toLowerCase().includes('risk')) {
        botResponse = 'The Auto-Enforcement Engine executes actions based on risk scoring thresholds: Risk < 70 (Monitoring/Tracking), Risk 70-90 (Warnings/Review/Flags), and Risk > 90 (Removal, Account lock, or suspension).';
      }
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse, time: 'Just now' }]);
    }, 1000);
  };

  // Dynamic Chart Data based on Mode
  const getChartData = () => {
    if (mode === 'individual') {
      return [
        { name: 'Week 1', personalRisk: 12, screenTimeRisk: 34, userTrust: 95 },
        { name: 'Week 2', personalRisk: 8, screenTimeRisk: 28, userTrust: 97 },
        { name: 'Week 3', personalRisk: 15, screenTimeRisk: 42, userTrust: 93 },
        { name: 'Week 4', personalRisk: 5, screenTimeRisk: 20, userTrust: 98 },
      ];
    } else if (mode === 'enterprise') {
      return [
        { name: 'Mon', brandRisk: 45, spamBots: 120, modelHits: 230 },
        { name: 'Tue', brandRisk: 38, spamBots: 98, modelHits: 180 },
        { name: 'Wed', brandRisk: 62, spamBots: 145, modelHits: 310 },
        { name: 'Thu', brandRisk: 25, spamBots: 80, modelHits: 150 },
        { name: 'Fri', brandRisk: 30, spamBots: 110, modelHits: 195 },
        { name: 'Sat', brandRisk: 18, spamBots: 55, modelHits: 90 },
        { name: 'Sun', brandRisk: 15, spamBots: 40, modelHits: 85 }
      ];
    } else {
      return [
        { name: '00:00', cyberThreats: 89, suspiciousNodes: 450, trackingAlerts: 12 },
        { name: '04:00', cyberThreats: 95, suspiciousNodes: 520, trackingAlerts: 15 },
        { name: '08:00', cyberThreats: 140, suspiciousNodes: 680, trackingAlerts: 32 },
        { name: '12:00', cyberThreats: 110, suspiciousNodes: 610, trackingAlerts: 24 },
        { name: '16:00', cyberThreats: 180, suspiciousNodes: 790, trackingAlerts: 48 },
        { name: '20:00', cyberThreats: 165, suspiciousNodes: 720, trackingAlerts: 40 }
      ];
    }
  };

  return (
    <div className="w-full flex flex-col bg-guardian-bg text-guardian-body min-h-screen">
      
      {/* Dark Navy Header Banner - Matches design exactly & stretches edge-to-edge */}
      <div className="bg-[#0A192F] text-white p-6 md:p-8 lg:px-12 rounded-none -mx-4 md:-mx-8 lg:-mx-10 -mt-4 md:-mt-8 lg:-mt-10 border-b border-[#112240] flex flex-col items-start gap-6 shadow-xl relative overflow-hidden w-auto animate-[fadeIn_0.2s_ease-out] shrink-0">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Security Layer:</span>
              <span className="px-2.5 py-0.5 rounded text-xs font-black uppercase tracking-wider bg-blue-600 text-white">
                Policy Enforcement
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                Model-Driven Policy Enforcement
              </h1>
              <span className="px-2 py-0.5 border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase rounded">
                Live Automation
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {/* Mode Switcher Selector */}
            <div className="relative">
              <select 
                value={mode}
                onChange={(e) => handleModeChange(e.target.value)}
                className="bg-white/5 border border-white/10 hover:border-blue-500 px-3.5 py-2.5 rounded-xl text-sm font-bold text-white focus:outline-none transition-all cursor-pointer shadow-sm select-dark-bg"
              >
                <option value="individual" className="text-slate-900">👤 Individual Mode</option>
                <option value="enterprise" className="text-slate-900">🏢 Enterprise Mode</option>
                <option value="government" className="text-slate-900">🏛 Government Mode</option>
              </select>
            </div>

            <button 
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all uppercase tracking-wider cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Export Data</span>
            </button>

            <button 
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/10 uppercase tracking-wider cursor-pointer"
            >
              <Plus className="w-4 h-4 text-blue-200 flex-shrink-0" />
              <span>Create Policy</span>
            </button>

            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all uppercase tracking-wider cursor-pointer"
            >
              <Server className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Integrations</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content wrapped inside the dashboard container */}
      <div className="dashboard-container py-8 space-y-8 w-full flex-grow text-left">
        
        {/* AI MODELS INFO CARD */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-[#1E293B] tracking-tight">AI Models Powering This Dashboard</h3>
            <p className="text-sm text-[#64748B] font-light">
              All policies, scores, and actions displayed here are generated by Guardian AI's proprietary machine learning models operating in real time.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {['NLP Classifier', 'Multimodal Vision', 'Risk Scoring (XGBoost)', 'Repeat Offender (KMeans)'].map((tag, idx) => (
              <span key={idx} className="bg-blue-50 border border-blue-200 text-[#0D9488] px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CORE PIPELINE COMMON VISUAL FLOW */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm text-left space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <h3 className="font-extrabold text-base text-[#1E293B] tracking-tight">Core Multimodal Pipeline</h3>
            <p className="text-sm text-[#64748B] font-light mt-0.5">Automated signal flow from input analysis to auto-enforcement engine decision</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 bg-slate-50 border border-[#E2E8F0] rounded-xl relative hover:border-blue-500 transition-colors">
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">1</div>
              <h4 className="font-black text-sm text-[#1E293B] uppercase tracking-wider mb-2">Multimodal Input Analysis</h4>
              <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                NLP, Speech, Vision, and Temporal motion algorithms extract raw content tags and audit indicators.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#0D9488] font-bold">
                <Activity className="w-4 h-4" />
                <span>Extracting metadata streams</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 bg-slate-50 border border-[#E2E8F0] rounded-xl relative hover:border-blue-500 transition-colors">
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">2</div>
              <h4 className="font-black text-sm text-[#1E293B] uppercase tracking-wider mb-2">Policy Enforcement Center</h4>
              <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                Compares indicators against active policies using XGBoost severity risk mapping and context classifiers.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
                <SlidersIcon className="w-4 h-4" />
                <span>Matching operational mode rules</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 bg-slate-50 border border-[#E2E8F0] rounded-xl relative hover:border-blue-500 transition-colors">
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-black">3</div>
              <h4 className="font-black text-sm text-[#1E293B] uppercase tracking-wider mb-2">Auto-Enforcement Engine</h4>
              <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                Triggers programmatic actions across linked APIs and writes cryptographically verified log events.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>Executing API actions in real-time</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: MULTIMODAL INPUT ANALYSIS (COMMON) */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm text-left space-y-6">
          <div>
            <h3 className="font-extrabold text-base text-[#1E293B] tracking-tight">🔍 Section 1: Multimodal Input Analysis</h3>
            <p className="text-sm text-[#64748B] font-light mt-0.5">Real-time status of Guardian AI sensory algorithms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* NLP */}
            <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-slate-550 uppercase">Text (NLP)</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded">LLM-Guard-v2</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#64748B]">Confidence Score</div>
                  <div className="text-lg font-black text-[#1E293B]">94%</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap gap-1">
                {['Abusive', 'Spam', 'Discriminatory'].map((tag, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] text-[9px] font-bold text-[#64748B] uppercase rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Speech AI */}
            <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-slate-550 uppercase">Audio (Speech AI)</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded">Whisper-Sentinel</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#64748B]">Confidence Score</div>
                  <div className="text-lg font-black text-[#1E293B]">88%</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap gap-1">
                {['Tone: Urgent', 'Sentiment: Negative'].map((tag, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] text-[9px] font-bold text-[#64748B] uppercase rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Vision AI */}
            <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-slate-550 uppercase">Image (Vision AI)</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded">Vision-Guard-v4</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#64748B]">Confidence Score</div>
                  <div className="text-lg font-black text-[#1E293B]">91%</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap gap-1">
                {['Object: Logo', 'Brand: Safe'].map((tag, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] text-[9px] font-bold text-[#64748B] uppercase rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Temporal Model */}
            <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-slate-550 uppercase">Video (Deepfake + Motion AI)</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded">Temporal-Scan-X</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#64748B]">Authenticity Score</div>
                  <div className="text-lg font-black text-[#1E293B]">96%</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap gap-1">
                {['Deepfake: Not Detected', 'Coherence: High'].map((tag, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] text-[9px] font-bold text-[#64748B] uppercase rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: POLICY ENFORCEMENT CENTER (MODE-BASED) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Left Column: Model-Aware Parameters (2 columns wide inside grid) */}
          <div className="lg:col-span-2 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4 mb-6">
                <div>
                  <h3 className="font-extrabold text-base text-[#1E293B] tracking-tight">🧠 Section 2: Policy Enforcement Center</h3>
                  <p className="text-sm text-[#64748B] font-light mt-0.5">Dynamic rules applied for active operational context</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded border ${
                  mode === 'individual' ? 'bg-green-50 border-green-200 text-green-700' :
                  mode === 'enterprise' ? 'bg-blue-50 border-blue-200 text-[#0D9488]' :
                  'bg-rose-50 border-rose-200 text-rose-700'
                }`}>
                  {mode} Mode
                </span>
              </div>

              {/* Mode Specific Layout Render */}
              {mode === 'individual' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Content Behavior Analysis</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Checks personal chat behavior metrics & local alerts.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Spam & Abuse Detection</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Shields profiles from repetitive harassment and toxic copy.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Personal Risk Score</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Live score mapping computed from individual device signals.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Context Awareness Layer</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Flags high-risk apps and warns parents/users instantly.</p>
                    </div>
                  </div>

                  <div className="p-4.5 bg-green-50 border border-green-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-green-800">
                      <span>ENFORCEMENT STYLE: SOFT ACTIONS ONLY</span>
                      <span>RISK RANGE: MILD / MEDIUM / HIGH</span>
                    </div>
                    <p className="text-xs text-green-700 font-medium leading-relaxed">
                      Guardian AI targets educational guidance. Enforcement restricts visibility, warns users, or blurs sensitive media without punitive blocks.
                    </p>
                  </div>
                </div>
              )}

              {mode === 'enterprise' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Spam Bot Detection</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Flags high-frequency automated posts or scripts.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Fake Account Detection</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Audits platform profile headers, avatars, and timestamps.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Brand Risk Scoring</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Scans platform feeds for policy violations that threaten brand safety.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Repeat Offender Analysis</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Maps IP nodes and accounts committing persistent infractions.</p>
                    </div>
                  </div>

                  <div className="p-4.5 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-blue-800">
                      <span>ENFORCEMENT STYLE: BALANCED AUTOMATION</span>
                      <span>RISK RANGE: BRAND RISK CLASSIFIED</span>
                    </div>
                    <p className="text-xs text-blue-705 font-medium leading-relaxed">
                      Maintains optimal brand security and compliance. Triggers content removal, shadow bans, or redirects flagged events to manual moderator pipelines.
                    </p>
                  </div>
                </div>
              )}

              {mode === 'government' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Threat Detection Engine</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Flags high-risk cyberthreat profiles, files, and traffic.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Network Pattern Analysis</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Detects coordinated bot attacks or network intrusions.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Repeat Offender Tracking</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Maintains surveillance indexes of flagged IPs and national threats.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Context Intelligence Engine</span>
                      <p className="text-xs text-[#1E293B] font-semibold">Uses state-level threat intelligence databases for real-time analysis.</p>
                    </div>
                  </div>

                  <div className="p-4.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-rose-800">
                      <span>ENFORCEMENT STYLE: AGGRESSIVE REAL-TIME</span>
                      <span>RISK RANGE: LOW / MEDIUM / HIGH / CRITICAL</span>
                    </div>
                    <p className="text-xs text-rose-700 font-medium leading-relaxed">
                      Secures national infrastructure and cyber assets. Triggers immediate automated flags, account suspension, cross-platform tracking, and direct authority escalations.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center border-t border-[#E2E8F0] pt-4 mt-6">
              <span className="text-xs font-bold text-[#64748B] uppercase">Operational Interface Focus</span>
              <span className="text-sm font-black text-[#1E293B] uppercase tracking-wide">
                {mode === 'individual' ? 'Friendly & Educational' : mode === 'enterprise' ? 'Professional & Data-driven' : 'High-Alert & Security-focused'}
              </span>
            </div>
          </div>

          {/* Right Column: Section 3 Auto-Enforcement Engine */}
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-[#E2E8F0] pb-4">
                <h3 className="font-extrabold text-base text-[#1E293B] tracking-tight">⚙ Section 3: Auto-Enforcement Engine</h3>
                <p className="text-sm text-[#64748B] font-light mt-0.5">Mode-adaptive compliance threshold mapping</p>
              </div>

              {/* Threshold Display based on Mode */}
              <div className="space-y-4">
                
                {/* Rule 1 */}
                <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl flex items-center justify-between text-xs font-semibold">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#64748B] uppercase">Risk &lt; 70</div>
                    <div className="text-slate-800 font-bold">
                      {mode === 'individual' ? 'Notify User' : mode === 'enterprise' ? 'Monitor Session' : 'Track System Node'}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-[#10B981] border border-emerald-100 rounded text-[10px] font-black uppercase">Low Threat</span>
                </div>

                {/* Rule 2 */}
                <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl flex items-center justify-between text-xs font-semibold">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#64748B] uppercase">Risk 70 – 90</div>
                    <div className="text-slate-800 font-bold">
                      {mode === 'individual' ? 'Warn Profile' : mode === 'enterprise' ? 'Moderator Review' : 'Flag Account & Alert'}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-50 text-[#F59E0B] border border-amber-100 rounded text-[10px] font-black uppercase">Medium Risk</span>
                </div>

                {/* Rule 3 */}
                <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl flex items-center justify-between text-xs font-semibold">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#64748B] uppercase">Risk &gt; 90</div>
                    <div className="text-slate-800 font-bold">
                      {mode === 'individual' ? 'Restrict Access' : mode === 'enterprise' ? 'Remove Content' : 'Immediate Lockout'}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-rose-50 text-[#EF4444] border border-rose-100 rounded text-[10px] font-black uppercase">Critical Risk</span>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-xs font-bold text-blue-850">
              ⚡ Threshold updates propagate instantly.
            </div>
          </div>

        </div>

        {/* STATS CARDS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#00BFA5]">
                <Shield className="w-5 h-5" />
              </div>
              <span className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                +3 this week
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-[#1E293B] tracking-tight">24</div>
              <div className="text-xs font-bold text-[#1E293B] mt-0.5 uppercase tracking-wide">Active AI Policies</div>
              <div className="text-[10px] text-[#64748B] font-light mt-0.5">Mapped to detection and enforcement models</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#F59E0B]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="bg-amber-50 border border-amber-250 text-amber-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                -12% from yesterday
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-[#1E293B] tracking-tight">147</div>
              <div className="text-xs font-bold text-[#1E293B] mt-0.5 uppercase tracking-wide">High-Risk Violations (24h)</div>
              <div className="text-[10px] text-[#64748B] font-light mt-0.5">Calculated using AI risk scoring models</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Play className="w-5 h-5" />
              </div>
              <span className="bg-purple-50 border border-purple-200 text-purple-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                +8% this week
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-[#1E293B] tracking-tight">1,284</div>
              <div className="text-xs font-bold text-[#1E293B] mt-0.5 uppercase tracking-wide">Automated Actions</div>
              <div className="text-[10px] text-[#64748B] font-light mt-0.5">Executed by AI enforcement workflows</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-650">
                <FileText className="w-5 h-5" />
              </div>
              <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                All timestamped
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-[#1E293B] tracking-tight">3,567</div>
              <div className="text-xs font-bold text-[#1E293B] mt-0.5 uppercase tracking-wide">Audit Logs Generated</div>
              <div className="text-[10px] text-[#64748B] font-light mt-0.5">Created automatically by the audit engine</div>
            </div>
          </div>

        </div>

        {/* ACTIVE POLICY ENFORCEMENT TABLE */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm text-left overflow-hidden">
          
          {/* Table Header Controls */}
          <div className="p-6 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-base text-[#1E293B] tracking-tight">Active Policy Enforcement</h3>
              <p className="text-sm text-[#64748B] font-light mt-0.5">Real-time AI model decisions and enforcement actions for {mode} mode</p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-[#E2E8F0] hover:border-blue-500 focus:border-blue-500 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none transition-all w-48 sm:w-60 text-[#1E293B]"
                />
              </div>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-3.5 py-2 bg-slate-50 border border-[#E2E8F0] hover:bg-slate-100 text-[#1E293B] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E2E8F0] text-left text-[10px] font-black text-[#64748B] uppercase tracking-wider">
                  <th className="py-3 px-6">Policy Name</th>
                  <th className="py-3 px-4">AI Models Applied</th>
                  <th className="py-3 px-4 text-center">AI Risk Intelligence</th>
                  <th className="py-3 px-4">Enforcement Action</th>
                  <th className="py-3 px-4 text-center">Automation Status</th>
                  <th className="py-3 px-4 text-right">Last Model Decision</th>
                  <th className="py-3 px-6 text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs font-semibold text-[#1E293B]">
                {filteredPolicies.length > 0 ? (
                  filteredPolicies.map((p) => {
                    // Score Color Config
                    let badgeColor = 'bg-green-50 text-green-700 border-green-200';
                    if (p.riskScore >= 90) {
                      badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
                    } else if (p.riskScore >= 80) {
                      badgeColor = 'bg-orange-50 text-orange-700 border-orange-200';
                    } else if (p.riskScore >= 70) {
                      badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                    }

                    return (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4.5 px-6">
                          <div className="font-extrabold text-slate-850 leading-tight">{p.name}</div>
                          <div className="text-[10px] text-[#64748B] font-light mt-0.5 max-w-xs">{p.description}</div>
                        </td>
                        <td className="py-4.5 px-4 font-bold text-[#64748B]">
                          <div className="flex flex-wrap gap-1">
                            {p.models.map((model, idx) => (
                              <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">
                                {model}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4.5 px-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded font-black text-xs border ${badgeColor}`}>
                            {p.riskScore}/100
                          </span>
                        </td>
                        <td className="py-4.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {p.actions.map((act, idx) => (
                              <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                {act}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4.5 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${
                            p.automation === 'Fully Automated' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-blue-50 text-[#0D9488] border-blue-200'
                          }`}>
                            {p.automation}
                          </span>
                        </td>
                        <td className="py-4.5 px-4 text-right font-medium text-[#64748B]">
                          {p.lastDecision}
                        </td>
                        <td className="py-4.5 px-6 text-center">
                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete policy: ${p.name}?`)) {
                                setPolicies(prev => prev.filter(item => item.id !== p.id));
                              }
                            }}
                            className="p-1.5 hover:bg-rose-50 text-[#64748B] hover:text-[#EF4444] rounded-lg transition-colors cursor-pointer"
                            title="Delete policy"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-sm font-bold text-[#64748B] bg-slate-50/50">
                      No active policies found for the current operational mode.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI ENFORCEMENT WORKFLOW CONFIG SECTION */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm text-left overflow-hidden">
          
          <div className="p-6 border-b border-[#E2E8F0]">
            <h3 className="font-extrabold text-base text-[#1E293B] tracking-tight">AI Enforcement Workflow</h3>
            <p className="text-sm text-[#64748B] font-light mt-0.5">Configure how Guardian AI models respond automatically to detected violations.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
            
            {/* Left: Workflow Blocks */}
            <div className="p-6 space-y-4">
              <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">Workflow blocks pipeline</span>
              
              <div className="space-y-3">
                {[
                  { num: 1, title: 'Violation Detection Model', desc: 'AI scans content in real-time' },
                  { num: 2, title: 'Risk Threshold Evaluation', desc: 'Calculates severity score' },
                  { num: 3, title: 'Repeat Offender Analysis', desc: 'Checks user history' },
                  { num: 4, title: 'Enforcement Action Selection', desc: 'Determines appropriate response' },
                  { num: 5, title: 'Audit Logging Engine', desc: 'Records all decisions' }
                ].map((block) => (
                  <div key={block.num} className="p-4 bg-slate-50 border border-[#E2E8F0] hover:border-blue-500 rounded-xl flex gap-3 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-[#00BFA5] font-black text-xs flex items-center justify-center shrink-0">
                      {block.num}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 leading-tight uppercase tracking-wide">{block.title}</h4>
                      <p className="text-[10px] text-[#64748B] font-light mt-0.5">{block.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Actions Checklist Selector */}
            <div className="p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase text-[#1E293B] tracking-wider block">
                  Select enforcement actions to apply when violations are detected:
                </span>
                
                <div className="grid grid-cols-2 gap-3.5">
                  {Object.entries({
                    flag: 'Flag Content',
                    notify: 'Notify User',
                    moderator: 'Send to Moderator',
                    suspend: 'Suspend Account',
                    shadowban: 'Shadow Ban',
                    remove: 'Remove Content',
                    warning: 'Add Warning Label',
                    visibility: 'Reduce Visibility',
                    agegate: 'Age-Gate',
                    tempban: 'Temporary Ban'
                  }).map(([key, label]) => {
                    const isChecked = workflowActions[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setWorkflowActions(prev => ({ ...prev, [key]: !prev[key] }))}
                        className={`p-3 border rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                          isChecked 
                            ? 'bg-blue-50/50 border-blue-500 shadow-sm' 
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {isChecked ? (
                          <div className="w-5 h-5 bg-[#00BFA5] rounded flex items-center justify-center text-white shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border border-slate-300 rounded shrink-0" />
                        )}
                        <span className="text-xs font-bold text-slate-700">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
                {/* Active Tags list */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#64748B]">Selected Actions: {Object.values(workflowActions).filter(Boolean).length}</span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {Object.entries(workflowActions).map(([k, active]) => {
                      if (!active) return null;
                      const labels = {
                        flag: 'Flag Content', notify: 'Notify User', moderator: 'Send to Moderator',
                        suspend: 'Suspend Account', shadowban: 'Shadow Ban', remove: 'Remove Content',
                        warning: 'Add Warning Label', visibility: 'Reduce Visibility', agegate: 'Age-Gate', tempban: 'Temporary Ban'
                      };
                      return (
                        <span key={k} className="bg-blue-50 border border-blue-200 text-[#0D9488] px-2 py-0.5 rounded text-[10px] font-bold">
                          {labels[k]}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <button 
                  onClick={handleSaveWorkflow}
                  className="w-full py-3 bg-[#00BFA5] hover:bg-blue-605 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  Save Workflow Configuration
                </button>

                {/* Trust and System Labels Card */}
                <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl flex items-start gap-3 text-left">
                  <Headphones className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black text-purple-800 uppercase tracking-wide block">Trust & System Labels</span>
                    <ul className="text-[10px] text-purple-750 font-bold space-y-1 mt-1.5 list-disc pl-4">
                      <li>Model-Driven Automated Enforcement</li>
                      <li>Explainable, Audit-Ready AI Decisions</li>
                      <li>Traceable XGBoost Risk Calculations</li>
                      <li>Enterprise-Grade Compliance Sandbox</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* DYNAMIC MODE-AWARE CHART DATA VISUALIZATION */}
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm text-left space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4 flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-base text-[#1E293B] tracking-tight">
                {mode === 'individual' ? 'User Safety & Behavior Activity' : mode === 'enterprise' ? 'Compliance Violations & Bot Traffic' : 'Cyber Security Alert Heatmap'}
              </h3>
              <p className="text-sm text-[#64748B] font-light mt-0.5">Live neural engine signal indicators computed dynamically</p>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-[#64748B] border border-slate-200 text-[10px] font-bold uppercase">
              Mode: {mode}
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {mode === 'individual' ? (
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="personalRisk" stroke="#EF4444" strokeWidth={2.5} name="Individual Risk Factor" />
                  <Line type="monotone" dataKey="screenTimeRisk" stroke="#F59E0B" strokeWidth={2.5} name="Device Usage Risk" />
                  <Line type="monotone" dataKey="userTrust" stroke="#10B981" strokeWidth={2.5} name="Safety Score Index" />
                </LineChart>
              ) : mode === 'enterprise' ? (
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="brandRisk" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Brand Threat Incidents" />
                  <Bar dataKey="spamBots" fill="#EF4444" radius={[4, 4, 0, 0]} name="Spam Bot Blocks" />
                  <Bar dataKey="modelHits" fill="#00BFA5" radius={[4, 4, 0, 0]} name="Policy Model Hits" />
                </BarChart>
              ) : (
                <AreaChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="cyberThreats" stroke="#EF4444" fill="rgba(239, 68, 68, 0.1)" strokeWidth={2.5} name="Cybersecurity Threats" />
                  <Area type="monotone" dataKey="suspiciousNodes" stroke="#F59E0B" fill="rgba(245, 158, 11, 0.05)" strokeWidth={2} name="Suspicious Nodes Blocked" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* AUDIT LOG TABLE */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm text-left overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h3 className="font-extrabold text-base text-[#1E293B] tracking-tight">📋 Audit Logs (Advanced)</h3>
            <p className="text-sm text-[#64748B] font-light mt-0.5">Real-time trace logs written automatically for every model enforcement event</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E2E8F0] text-left text-[10px] font-black text-[#64748B] uppercase tracking-wider">
                  <th className="py-3 px-6">Timestamp</th>
                  <th className="py-3 px-4">Input Type</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4 text-center">Threat Level</th>
                  <th className="py-3 px-4">Action Taken</th>
                  <th className="py-3 px-4">Model Used</th>
                  <th className="py-3 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs font-semibold text-[#1E293B]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-[10px] text-[#64748B]">{log.time}</td>
                    <td className="py-3.5 px-4 font-bold">{log.type}</td>
                    <td className="py-3.5 px-4 capitalize">{log.mode}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-705 text-[10px] font-bold">
                        {log.risk}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">{log.action}</td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-blue-700">{log.model}</td>
                    <td className="py-3.5 px-6 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        log.status === 'Success' || log.status === 'Created' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRICING SYSTEM DIFFERENCES SUMMARY */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-extrabold text-base text-[#1E293B] tracking-tight">Pricing Difference – Quick Summary</h3>
            <p className="text-sm text-[#64748B] font-light mt-0.5">Choose the right level of AI protection for your platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            
            {/* Starter */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex flex-col justify-between text-left space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">Starter Tier</span>
                <h4 className="text-lg font-black text-slate-800 leading-tight">Detection Only</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Basic access to NLP and visual scanning models. Provides warnings and metadata flags without automation triggers.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E2E8F0] text-[10px] font-bold text-[#64748B]">
                Ideal for individual hobbyists
              </div>
            </div>

            {/* Professional */}
            <div className="bg-white border border-blue-500 p-6 rounded-2xl flex flex-col justify-between text-left shadow-md relative space-y-6">
              <span className="absolute -top-3 right-6 bg-[#00BFA5] text-white px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                Recommended
              </span>
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase text-[#0D9488] tracking-wider block">Professional Tier</span>
                <h4 className="text-lg font-black text-slate-805 leading-tight">Detection + Intelligence</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Includes advanced XGBoost risk scores, historical offender audits, platform API webhooks, and priority pipeline processing speeds.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E2E8F0] text-[10px] font-bold text-[#0D9488]">
                Unlock AI Risk Intelligence
              </div>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-900 border border-slate-950 text-white p-6 rounded-2xl flex flex-col justify-between text-left shadow-lg space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider block">Enterprise Tier</span>
                <h4 className="text-lg font-black text-white leading-tight">Full Autopilot &amp; Compliance</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Full custom policy wizard, complete integrations connection suite, role-based access, automatic report export APIs, and certified audit logs.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 text-[10px] font-bold text-blue-400">
                Automate enforcement decisions
              </div>
            </div>

          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-[#0D9488] pt-2">
            <span>✔ Unlock AI Risk Intelligence with Professional</span>
            <span>✔ Automate enforcement decisions with Enterprise</span>
            <span>✔ Reduce platform violations by up to 70%</span>
            <span>✔ Meet compliance and audit requirements effortlessly</span>
          </div>
        </div>
      </div>

      {/* FLOATING TALK WITH US CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5">
        
        {/* Chat window */}
        {isChatOpen && (
          <div className="w-80 sm:w-96 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[450px] animate-scaleIn text-left">
            <div className="bg-[#0F172A] text-white p-4.5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#00BFA5] flex items-center justify-center text-white">
                  <Headphones size={16} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm leading-none">Talk with Us</h4>
                  <span className="text-[10px] text-blue-400 font-bold mt-0.5 block">Choose voice or text</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-350 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed font-semibold ${
                    msg.sender === 'user' 
                      ? 'bg-[#00BFA5] text-white rounded-br-none shadow-sm' 
                      : 'bg-white border border-[#E2E8F0] text-slate-800 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isVoiceActive && (
                <div className="flex justify-start">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-xs text-blue-800 font-bold flex items-center gap-2">
                    <div className="flex gap-0.5 items-center">
                      <span className="w-1.5 h-3 bg-[#00BFA5] rounded-full animate-pulse inline-block" />
                      <span className="w-1.5 h-4 bg-[#00BFA5] rounded-full animate-pulse inline-block delay-75" />
                      <span className="w-1.5 h-2.5 bg-[#00BFA5] rounded-full animate-pulse inline-block delay-150" />
                    </div>
                    <span>Listening to audio voice feed...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-[#E2E8F0] bg-white flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setIsVoiceActive(!isVoiceActive);
                  if(!isVoiceActive) {
                    setTimeout(() => {
                      setIsVoiceActive(false);
                      setChatMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Voice command parsed successfully. Activating temporary moderation rules.', time: 'Just now' }]);
                    }, 3000);
                  }
                }}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isVoiceActive 
                    ? 'bg-rose-50 border-rose-300 text-rose-600' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-[#64748B]'
                }`}
                title="Toggle voice chat"
              >
                <Mic size={16} />
              </button>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') handleChatSend(); }}
                placeholder="Type your message..."
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none text-slate-800"
              />
              <button 
                onClick={handleChatSend}
                className="p-2.5 bg-[#00BFA5] hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-all shadow-sm shrink-0"
              >
                <Send size={14} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Toggle Icon */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-[#0F172A] hover:bg-slate-800 text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95 group border border-slate-700 font-extrabold text-sm"
        >
          <Headphones className="w-4.5 h-4.5 text-[#00BFA5] group-hover:rotate-12 transition-transform" />
          <span>Talk with Us</span>
        </button>

      </div>

      {/* EXPORT DATA MODAL */}
      {isExportOpen && (
        <div className="fixed inset-0 z-50 bg-[#060913]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xl animate-scaleIn text-left">
            <div className="flex items-center justify-between mb-6 border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-805 uppercase tracking-wider">Export Data</h3>
                <p className="text-xs text-[#64748B] font-light mt-0.5">Select data and format to export from Guardian AI system</p>
              </div>
              <button 
                onClick={() => setIsExportOpen(false)}
                className="p-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5 text-xs font-semibold">
              
              {/* Data Types */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">Select Data Types</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries({
                    policy: ['Policy Data', 'Includes policies, models used, risk thresholds, automation status'],
                    metrics: ['Overview Metrics', 'Dashboard stats, violations, and performance trends'],
                    logs: ['Audit Logs', 'Full logs with timestamps, actions, and model decisions'],
                    actions: ['Enforcement Actions', 'All actions executed by AI enforcement systems'],
                    multimodal: ['Multimodal Analysis Data', 'Input type, detection tags, confidence scores']
                  }).map(([key, [label, desc]]) => {
                    const isChecked = exportDataTypes[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setExportDataTypes(prev => ({ ...prev, [key]: !prev[key] }))}
                        className={`p-3 border rounded-xl flex items-start gap-2.5 transition-all text-left cursor-pointer ${
                          isChecked 
                            ? 'bg-blue-50/50 border-blue-500 shadow-sm' 
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="mt-0.5">
                          {isChecked ? (
                            <div className="w-4 h-4 bg-[#00BFA5] rounded flex items-center justify-center text-white shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 border border-slate-300 rounded shrink-0" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-[#1E293B] leading-none">{label}</div>
                          <div className="text-[9px] text-[#64748B] font-light mt-1 leading-snug">{desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Format selection */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">Export Format</span>
                <div className="grid grid-cols-3 gap-2">
                  {['CSV', 'JSON', 'PDF'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setExportFormat(f)}
                      className={`py-2 rounded-xl text-center text-xs font-bold border transition-colors cursor-pointer ${
                        exportFormat === f 
                          ? 'bg-blue-50 border-blue-500 text-[#0D9488]' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {f} {f === 'CSV' ? '(Default)' : f === 'PDF' ? '(Formatted Report)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E2E8F0]">
                <div>
                  <label className="block text-[#64748B] text-[10px] font-black uppercase tracking-wider mb-1.5">Date Range Filter</label>
                  <select className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#1E293B]">
                    <option>Today</option>
                    <option>Past 7 Days</option>
                    <option>Past 30 Days</option>
                    <option>Custom Date Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#64748B] text-[10px] font-black uppercase tracking-wider mb-1.5">Risk / Threat Level</label>
                  <select className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#1E293B]">
                    <option>All Risk Levels</option>
                    <option>Low Risk</option>
                    <option>Medium Risk</option>
                    <option>High Risk</option>
                    <option>Critical Threat</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-2.5 border-t border-[#E2E8F0] pt-4 mt-6">
                <button 
                  onClick={() => setIsExportOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleExportSubmit}
                  disabled={isExporting}
                  className="px-5 py-2 bg-[#00BFA5] hover:bg-blue-700 text-white font-extrabold uppercase rounded-lg transition-all cursor-pointer min-w-36 flex items-center justify-center gap-2"
                >
                  {isExporting ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : exportSuccess ? (
                    <>
                      <Check size={12} className="stroke-[3]" />
                      <span>Exported!</span>
                    </>
                  ) : (
                    'Export Data'
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW POLICY WIZARD MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-[#060913]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xl animate-scaleIn text-left max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between mb-6 border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-805 uppercase tracking-wider">Create New Policy</h3>
                <p className="text-xs text-[#64748B] font-light mt-0.5">Define AI-driven enforcement rules for multimodal content and behavior</p>
              </div>
              <button 
                onClick={() => {
                  setIsCreateOpen(false);
                  setWizardStep(1);
                }}
                className="p-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Indicators */}
            <div className="overflow-x-auto pb-2 mb-6">
              <div className="flex items-center justify-between gap-2.5 min-w-[580px] px-2 text-[10px] font-black uppercase tracking-wider text-[#64748B]">
                {[
                  'Basic Info', 'Multimodal Target', 'Detection Models', 'Conditions', 'Actions', 'Automation', 'Rules Preview', 'Simulation', 'Save'
                ].map((stepName, index) => {
                  const stepNum = index + 1;
                  const isPassed = wizardStep > stepNum;
                  const isActive = wizardStep === stepNum;
                  return (
                    <div key={stepNum} className="flex items-center gap-1">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black border ${
                        isPassed ? 'bg-[#00BFA5] border-transparent text-white' :
                        isActive ? 'border-[#00BFA5] text-[#00BFA5]' : 'border-slate-350 text-slate-500'
                      }`}>
                        {isPassed ? '✓' : stepNum}
                      </span>
                      <span className={isActive ? 'text-[#00BFA5] font-black' : ''}>{stepName}</span>
                      {stepNum < 9 && <span className="text-slate-300 mx-1">→</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: Basic Info */}
            {wizardStep === 1 && (
              <div className="space-y-4 text-xs font-semibold">
                <h4 className="text-xs font-extrabold uppercase text-[#1E293B] tracking-wider border-b pb-2">Step 1: Policy Identification</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#64748B] text-[10px] font-black uppercase tracking-wider mb-1.5">Policy Name *</label>
                    <input
                      type="text"
                      value={newPolicy.name}
                      onChange={(e) => setNewPolicy(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Copyright Violation filter, Misleading Claim Detector"
                      className="w-full bg-slate-50 border border-[#E2E8F0] focus:border-blue-500 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] text-[10px] font-black uppercase tracking-wider mb-1.5">Description *</label>
                    <textarea
                      value={newPolicy.description}
                      onChange={(e) => setNewPolicy(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Explain what this policy identifies and enforces..."
                      className="w-full bg-slate-50 border border-[#E2E8F0] focus:border-blue-500 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none h-20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748B] text-[10px] font-black uppercase tracking-wider mb-1.5">Operational Mode Context *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['individual', 'enterprise', 'government'].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setNewPolicy(prev => ({ ...prev, mode: item }))}
                          className={`py-2 rounded-xl text-center text-xs font-bold border capitalize transition-colors cursor-pointer ${
                            newPolicy.mode === item 
                              ? 'bg-blue-50 border-blue-500 text-[#0D9488]' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Multimodal Input Target */}
            {wizardStep === 2 && (
              <div className="space-y-4 text-xs font-semibold">
                <h4 className="text-xs font-extrabold uppercase text-[#1E293B] tracking-wider border-b pb-2">Step 2: Multimodal Input Target</h4>
                <div className="space-y-3">
                  <span className="text-[10px] text-[#64748B] font-light leading-relaxed">
                    Choose which data streams Guardian AI sensory algorithms will check for this policy:
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries({
                      text: 'Text (NLP streams, captions, comments)',
                      image: 'Image (Visual tags, pixels, frames)',
                      audio: 'Audio (Speech AI, tones, keywords)',
                      video: 'Video (Deepfakes, temporal motion)'
                    }).map(([key, label]) => {
                      const isChecked = newPolicy.targets[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setNewPolicy(prev => ({ 
                            ...prev, 
                            targets: { ...prev.targets, [key]: !prev.targets[key] } 
                          }))}
                          className={`p-4 border rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                            isChecked 
                              ? 'bg-blue-50/50 border-blue-500 shadow-sm' 
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="w-5 h-5 border border-slate-300 rounded flex items-center justify-center shrink-0">
                            {isChecked && <Check className="w-3.5 h-3.5 text-[#00BFA5] stroke-[3.5]" />}
                          </div>
                          <span className="text-xs font-bold text-slate-700">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Detection Models */}
            {wizardStep === 3 && (
              <div className="space-y-4 text-xs font-semibold">
                <h4 className="text-xs font-extrabold uppercase text-[#1E293B] tracking-wider border-b pb-2">Step 3: AI Detection Models</h4>
                <div className="space-y-3">
                  <span className="text-[10px] text-[#64748B] font-light leading-relaxed">
                    Assign proprietary models to parse content elements:
                  </span>
                  <div className="grid grid-cols-2 gap-3.5">
                    {Object.entries({
                      nlp: 'NLP Classifier (Bert-Guard)',
                      vision: 'Multimodal Vision (ResNet-Guard)',
                      speech: 'Speech Analysis (Whisper)',
                      deepfake: 'Deepfake Detection',
                      offender: 'Repeat Offender Model (KMeans)',
                      xgboost: 'Risk Scoring (XGBoost Classifier)'
                    }).map(([key, label]) => {
                      const isChecked = newPolicy.models[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setNewPolicy(prev => ({ 
                            ...prev, 
                            models: { ...prev.models, [key]: !prev.models[key] } 
                          }))}
                          className={`p-3.5 border rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                            isChecked 
                              ? 'bg-blue-50/50 border-blue-500 shadow-sm' 
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="w-4 h-4 border border-slate-300 rounded flex items-center justify-center shrink-0">
                            {isChecked && <Check className="w-3 h-3 text-[#00BFA5] stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold text-slate-705">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Policy Conditions */}
            {wizardStep === 4 && (
              <div className="space-y-5 text-xs font-semibold">
                <h4 className="text-xs font-extrabold uppercase text-[#1E293B] tracking-wider border-b pb-2">Step 4: Define Conditions &amp; Triggers</h4>
                
                {/* Risk Threshold slider */}
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-slate-700">
                    <label className="text-[10px] uppercase tracking-wide">Risk Score Threshold</label>
                    <span className="text-blue-650 font-black text-sm">{newPolicy.riskThreshold}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newPolicy.riskThreshold}
                    onChange={(e) => setNewPolicy(prev => ({ ...prev, riskThreshold: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#00BFA5]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>Low Sensitivity</span>
                    <span>High Sensitivity (Block most)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
                  <div>
                    <label className="block text-[#64748B] text-[10px] font-black uppercase tracking-wider mb-1.5">Violation Target</label>
                    <select
                      value={newPolicy.contentType}
                      onChange={(e) => setNewPolicy(prev => ({ ...prev, contentType: e.target.value }))}
                      className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#1E293B]"
                    >
                      <option>Spam</option>
                      <option>NSFW Content</option>
                      <option>Hate Speech</option>
                      <option>Violence</option>
                      <option>Misinformation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#64748B] text-[10px] font-black uppercase tracking-wider mb-1.5">Repeat Offender Check</label>
                    <select
                      value={newPolicy.repeatOffender}
                      onChange={(e) => setNewPolicy(prev => ({ ...prev, repeatOffender: e.target.value }))}
                      className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#1E293B]"
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#64748B] text-[10px] font-black uppercase tracking-wider mb-1.5">Context Risk Scale</label>
                    <select
                      value={newPolicy.contextRisk}
                      onChange={(e) => setNewPolicy(prev => ({ ...prev, contextRisk: e.target.value }))}
                      className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#1E293B]"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Enforcement Actions */}
            {wizardStep === 5 && (
              <div className="space-y-4 text-xs font-semibold">
                <h4 className="text-xs font-extrabold uppercase text-[#1E293B] tracking-wider border-b pb-2">Step 5: Enforcement Actions</h4>
                
                <div className="space-y-3">
                  <span className="text-[10px] text-[#64748B] font-light leading-relaxed">
                    Check which actions this policy will execute upon matching condition triggers:
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries({
                      flag: 'Flag Content',
                      notify: 'Notify User',
                      moderator: 'Send to Moderator',
                      remove: 'Remove Content',
                      shadowban: 'Shadow Ban',
                      suspend: 'Suspend Account',
                      warning: 'Add Warning Label',
                      visibility: 'Reduce Visibility',
                      agegate: 'Age-Gate',
                      tempban: 'Temporary Ban'
                    }).map(([key, label]) => {
                      const isChecked = newPolicy.actions[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setNewPolicy(prev => ({ 
                            ...prev, 
                            actions: { ...prev.actions, [key]: !prev.actions[key] } 
                          }))}
                          className={`p-3 border rounded-xl flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                            isChecked 
                              ? 'bg-blue-50/50 border-blue-500 shadow-sm' 
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="w-4.5 h-4.5 border border-slate-300 rounded flex items-center justify-center shrink-0">
                            {isChecked && <Check className="w-3 h-3 text-[#00BFA5] stroke-[3.5]" />}
                          </div>
                          <span className="text-xs font-bold text-slate-700">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Automation Level */}
            {wizardStep === 6 && (
              <div className="space-y-4 text-xs font-semibold">
                <h4 className="text-xs font-extrabold uppercase text-[#1E293B] tracking-wider border-b pb-2">Step 6: Automation &amp; Enforcement Level</h4>
                
                <div className="space-y-3.5">
                  {[
                    { mode: 'Manual', desc: 'Alerts are queued for manual verification. AI does not block content.' },
                    { mode: 'Semi-Automated', desc: 'AI warns the profile or reduces visibility, but escalates permanent suspension to manual review.' },
                    { mode: 'Fully Automated', desc: 'AI executes instant action blocks, deletes content, and logs status parameters without human oversight.' }
                  ].map((item) => (
                    <button
                      key={item.mode}
                      onClick={() => setNewPolicy(prev => ({ ...prev, automation: item.mode }))}
                      className={`w-full p-4 border rounded-xl text-left transition-all cursor-pointer flex gap-3.5 ${
                        newPolicy.automation === item.mode 
                          ? 'bg-blue-50/50 border-blue-500 shadow-sm' 
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="mt-0.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          newPolicy.automation === item.mode ? 'border-[#00BFA5]' : 'border-slate-350'
                        }`}>
                          {newPolicy.automation === item.mode && <div className="w-2 h-2 rounded-full bg-[#00BFA5]" />}
                        </div>
                      </div>
                      <div>
                        <div className="font-extrabold text-[#1E293B]">{item.mode} Mode</div>
                        <div className="text-[10px] text-[#64748B] font-light mt-1">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7: Mode-Based Rules Summary */}
            {wizardStep === 7 && (
              <div className="space-y-4 text-xs font-semibold">
                <h4 className="text-xs font-extrabold uppercase text-[#1E293B] tracking-wider border-b pb-2">Step 7: Smart Operational Rules Summary</h4>
                
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-blue-800 uppercase">
                    <span>Smart Adaptive Enforcement Active</span>
                    <span>Mode: {newPolicy.mode}</span>
                  </div>
                  
                  <div className="space-y-2 text-slate-650 leading-relaxed font-medium">
                    {newPolicy.mode === 'individual' ? (
                      <p>
                        💡 <strong>Soft Enforcement Behavior:</strong> Individual rules prefer user notifications and safety warning labels. It completely avoids account bans or severe content restrictions to ensure user agency.
                      </p>
                    ) : newPolicy.mode === 'enterprise' ? (
                      <p>
                        🏢 <strong>Balanced Automations:</strong> Enterprise rules prioritize brand alignment and fake account blocks. It integrates manual review redirects with selective visibility mitigations.
                      </p>
                    ) : (
                      <p>
                        🏛 <strong>Strict Enforcement Priority:</strong> State / Government rules utilize immediate blocks, permanent lockout, node quarantine, and escalate alerts directly to monitoring databases.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: Live Policy Simulation Example */}
            {wizardStep === 8 && (
              <div className="space-y-4 text-xs font-semibold">
                <h4 className="text-xs font-extrabold uppercase text-[#1E293B] tracking-wider border-b pb-2">Step 8: Live Policy Simulation Example</h4>
                
                <div className="p-4 border border-[#E2E8F0] rounded-xl space-y-3.5 bg-slate-50">
                  <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">Real-time Simulation Node</span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Policy Simulated:</span>
                      <span className="font-bold text-[#1E293B]">{newPolicy.name || 'Untitled Policy'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Scope Type:</span>
                      <span className="font-bold text-[#1E293B] capitalize">{newPolicy.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Trigger Conditions:</span>
                      <span className="font-bold text-amber-600">Risk Score &gt;= {newPolicy.riskThreshold}% • Content: {newPolicy.contentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Model Output Assessment:</span>
                      <span className="text-green-650 font-black">Cleared compliance (Simulated Input: Risk 45%)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: Save Policy */}
            {wizardStep === 9 && (
              <div className="space-y-4 text-xs font-semibold text-center py-6">
                <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center text-[#00BFA5] mx-auto mb-4 animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-sm font-black text-slate-800">Policy Ready for Deployment</h4>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
                  Your custom policy "{newPolicy.name || 'Untitled custom policy'}" is successfully structured. Click below to add it immediately into the live decision grid.
                </p>
              </div>
            )}

            {/* Wizard Controls */}
            <div className="flex justify-between gap-2.5 border-t border-[#E2E8F0] pt-4 mt-6">
              <button
                onClick={() => {
                  if (wizardStep > 1) {
                    setWizardStep(prev => prev - 1);
                  } else {
                    setIsCreateOpen(false);
                  }
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase rounded-lg transition-colors cursor-pointer"
              >
                {wizardStep === 1 ? 'Cancel' : '← Back'}
              </button>
              
              <button
                onClick={() => {
                  if (wizardStep < 9) {
                    setWizardStep(prev => prev + 1);
                  } else {
                    handleSavePolicy();
                  }
                }}
                disabled={wizardStep === 1 && !newPolicy.name}
                className="px-4 py-2 bg-[#00BFA5] hover:bg-blue-700 text-white font-bold uppercase rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {wizardStep === 9 ? '✓ Save Policy' : 'Next Step →'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* INTEGRATIONS DRAWER PANEL */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#060913]/60 backdrop-blur-sm flex justify-end">
          
          <div className="w-full max-w-md bg-white border-l border-[#E2E8F0] shadow-2xl h-full flex flex-col justify-between animate-slideLeft text-left">
            
            {/* Drawer Header */}
            <div className="bg-[#0F172A] text-white p-5 flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-extrabold text-base leading-none">🔌 Integrations Panel</h3>
                <p className="text-[10px] text-blue-400 font-bold mt-1.5 block uppercase tracking-wider">
                  Operational Scope: {integrationsTab} Mode
                </p>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mode sub-tabs inside drawer */}
            <div className="bg-slate-50 border-b border-[#E2E8F0] p-3 flex gap-2 shrink-0">
              {['individual', 'enterprise', 'government'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setIntegrationsTab(tab)}
                  className={`flex-1 py-1.5 text-center text-[10px] font-black uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                    integrationsTab === tab 
                      ? 'bg-[#00BFA5] text-white border-transparent shadow-sm' 
                      : 'bg-white border-slate-205 text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Drawer Content */}
            <div className="flex-1 p-5 overflow-y-auto space-y-6">
              
              {/* Tab 1: Individual */}
              {integrationsTab === 'individual' && (
                <div className="space-y-6">
                  
                  {/* Platforms */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">👤 Connected Platforms</span>
                    <div className="space-y-2">
                      {['instagram', 'whatsapp', 'telegram', 'twitter', 'youtube'].map((platform) => {
                        const isConnected = connectedPlatforms[platform];
                        return (
                          <div key={platform} className="p-3 border border-slate-150 rounded-xl bg-slate-50 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-xs capitalize text-slate-800">{platform}</span>
                              <span className="text-[9px] text-[#64748B] block mt-0.5">Last Sync: 5m ago</span>
                            </div>
                            <button
                              onClick={() => togglePlatform(platform)}
                              className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-colors cursor-pointer ${
                                isConnected 
                                  ? 'bg-rose-50 hover:bg-rose-100 text-[#EF4444] border border-rose-200' 
                                  : 'bg-blue-50 hover:bg-blue-100 text-[#00BFA5] border border-blue-200'
                              }`}
                            >
                              {isConnected ? 'Disconnect' : 'Connect'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Devices */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">📱 Your Devices</span>
                    <div className="space-y-2.5">
                      
                      {/* Mobile */}
                      <div className="p-3 border border-slate-150 rounded-xl bg-slate-50 flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-800">Mobile Device</span>
                            <span className="px-1.5 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[8px] font-bold uppercase rounded">Android</span>
                          </div>
                          <ul className="text-[9px] text-slate-500 font-bold space-y-0.5 mt-2 list-disc pl-3">
                            <li>App scanning active</li>
                            <li>Real-time media audit</li>
                          </ul>
                        </div>
                        <button
                          onClick={() => toggleDevice('mobile')}
                          className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-colors cursor-pointer ${
                            deviceConnections.mobile ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 text-white'
                          }`}
                        >
                          {deviceConnections.mobile ? 'Manage' : 'Connect'}
                        </button>
                      </div>

                      {/* Desktop */}
                      <div className="p-3 border border-slate-150 rounded-xl bg-slate-50 flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-800">Desktop / Laptop</span>
                            <span className="px-1.5 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[8px] font-bold uppercase rounded">Windows</span>
                          </div>
                          <ul className="text-[9px] text-slate-500 font-bold space-y-0.5 mt-2 list-disc pl-3">
                            <li>File scanning active</li>
                            <li>Activity detector online</li>
                          </ul>
                        </div>
                        <button
                          onClick={() => toggleDevice('desktop')}
                          className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-colors cursor-pointer ${
                            deviceConnections.desktop ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 text-white'
                          }`}
                        >
                          {deviceConnections.desktop ? 'Manage' : 'Connect'}
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* Tab 2: Enterprise */}
              {integrationsTab === 'enterprise' && (
                <div className="space-y-6">
                  
                  {/* API Platforms */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">🌐 Platform Integrations</span>
                    <div className="space-y-2">
                      {[
                        { name: 'Instagram Graph API', desc: 'Syncs moderation triggers' },
                        { name: 'YouTube Moderation SDK', desc: 'Fetches streaming tracks' },
                        { name: 'Discord / Slack Webhook', desc: 'Alert notifications feed' }
                      ].map((item, i) => (
                        <div key={i} className="p-3 border border-slate-150 rounded-xl bg-slate-50 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-xs text-slate-800 block">{item.name}</span>
                            <span className="text-[9px] text-[#64748B] mt-0.5">{item.desc}</span>
                          </div>
                          <button 
                            onClick={() => alert(`Configuring details for ${item.name}`)}
                            className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-650 hover:text-slate-800 rounded text-[10px] font-bold uppercase cursor-pointer"
                          >
                            Configure
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Systems */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">🏗 Enterprise Infrastructure</span>
                    <div className="space-y-2">
                      {[
                        { name: 'CMS (REST API)', desc: 'Integrates inline blocks in post editors' },
                        { name: 'Mobile App SDK', desc: 'Bridges detection nodes inside native applications' },
                        { name: 'Cloud Storage (S3)', desc: 'Pre-scans media files upon upload events' }
                      ].map((item, i) => (
                        <div key={i} className="p-3 border border-slate-150 rounded-xl bg-slate-50 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-xs text-slate-800 block">{item.name}</span>
                            <span className="text-[9px] text-[#64748B] mt-0.5">{item.desc}</span>
                          </div>
                          <button 
                            onClick={() => alert(`Configuring details for ${item.name}`)}
                            className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-650 hover:text-slate-800 rounded text-[10px] font-bold uppercase cursor-pointer"
                          >
                            Configure
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 3: Government */}
              {integrationsTab === 'government' && (
                <div className="space-y-6">
                  
                  {/* Database & Networks */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">📡 Infrastructure Feeds</span>
                    <div className="space-y-2.5">
                      {[
                        { name: 'Cybercrime Database Node', details: 'Status: Connected • 10Gbps' },
                        { name: 'Law Enforcement surveillance feed', details: 'Status: Connected • Port 22' },
                        { name: 'Intelligence Threat databases', details: 'Status: Inactive • Check token' }
                      ].map((item, i) => (
                        <div key={i} className="p-3 border border-slate-150 rounded-xl bg-slate-50 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-xs text-slate-800 block">{item.name}</span>
                            <span className="text-[9px] text-[#64748B] mt-0.5">{item.details}</span>
                          </div>
                          <button 
                            onClick={() => alert(`Authorizing secure keys for ${item.name}`)}
                            className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded text-[10px] font-bold uppercase cursor-pointer hover:bg-slate-50"
                          >
                            Authenticate
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* WEBHOOKS SECTON COMMON */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-3 text-left">
                <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block">🔁 Webhooks Integration (Common)</span>
                
                <div className="space-y-2 text-[10px] font-bold text-[#64748B]">
                  {[
                    { id: 'wh_882', event: 'content.flagged', url: 'https://api.guardian.ai/hook-flag', status: 'Active' },
                    { id: 'wh_556', event: 'user.reported', url: 'https://api.guardian.ai/hook-report', status: 'Active' },
                    { id: 'wh_114', event: 'threat.detected', url: 'https://api.guardian.ai/hook-threat', status: 'Inactive' }
                  ].map((hook) => (
                    <div key={hook.id} className="p-2.5 bg-slate-50 border rounded-lg flex items-center justify-between gap-2">
                      <div>
                        <div className="text-slate-800 font-extrabold">{hook.event}</div>
                        <div className="text-[8px] text-slate-400 font-light mt-0.5 truncate max-w-[180px]">{hook.url}</div>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${
                        hook.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {hook.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#E2E8F0] bg-slate-50 shrink-0">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer text-center"
              >
                Close Panel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

