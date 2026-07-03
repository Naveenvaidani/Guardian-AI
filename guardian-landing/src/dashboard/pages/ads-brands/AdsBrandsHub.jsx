import React, { useState } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, FileText, PlusCircle, 
  RefreshCw, Info, Download, X, Bell, Globe, User, Server, BarChart2
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function AdsBrandsHub() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, integrations
  const [compliancePlatform, setCompliancePlatform] = useState('google'); // google, meta, asci, ftc
  
  // Real-Time Re-Analysis States
  const [adText, setAdText] = useState('Get rich quick with our amazing system! Guaranteed 100% returns on security investment.');
  const [riskScore, setRiskScore] = useState(65);
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [category, setCategory] = useState('finance'); // finance, health, general
  const [issuesList, setIssuesList] = useState([
    { type: 'Misleading Claim', text: 'Unverifiable financial promise ("Guaranteed 100% returns").' },
    { type: 'Absolute Statement', text: 'High-pressure absolute wording ("Get rich quick").' }
  ]);
  const [suggestionsList, setSuggestionsList] = useState([
    { issue: 'Guaranteed returns', suggestion: 'Avoid misleading claims. Use compliant wording such as "Explore potential growth opportunities."' },
    { issue: 'Get rich quick', suggestion: 'Focus on enterprise security value rather than quick financial outcomes.' }
  ]);

  // Influencer verification states
  const [verifyInput, setVerifyInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedInfluencer, setVerifiedInfluencer] = useState(null);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);

  // Creator Modal State (Sarah, Michael, Emma, David)
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);

  // Campaign Performance Report Modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Create Campaign Modal Wizard (3-step)
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  
  // Campaign content upload states (within modal)
  const [modalUploadText, setModalUploadText] = useState('Get rich quick with our amazing system! Guaranteed 100% returns on security investment.');
  const [modalUploadedImage, setModalUploadedImage] = useState(null);
  const [modalUploadedVideo, setModalUploadedVideo] = useState(null);
  const [isModalAnalyzing, setIsModalAnalyzing] = useState(false);
  const [modalAnalysisDone, setModalAnalysisDone] = useState(false);
  const [modalRiskScore, setModalRiskScore] = useState(65);
  const [modalIssues, setModalIssues] = useState([
    { type: 'Misleading Claim', text: 'Unverifiable financial promise ("Guaranteed 100% returns").' }
  ]);
  const [modalSuggestions, setModalSuggestions] = useState([
    { issue: 'Guaranteed returns', suggestion: 'Use compliant wording such as "Explore potential growth opportunities."' }
  ]);

  const [newCampaignData, setNewCampaignData] = useState({
    name: '',
    type: 'Brand Awareness',
    platforms: [],
    description: '',
    budget: 10000,
    startDate: '2026-06-17',
    endDate: '2026-07-17',
    audience: 'Technology decision makers, C-level executives'
  });

  // Integration connection states
  const [integrations, setIntegrations] = useState({
    meta: { connected: true, id: 'act_123456', pages: 2, syncing: false },
    google: { connected: true, id: '987-654-321', syncing: false },
    tiktok: { connected: false, id: '', syncing: false }
  });

  const creatorTrendData = [
    { name: 'Jan', score: 95 },
    { name: 'Feb', score: 96 },
    { name: 'Mar', score: 95 },
    { name: 'Apr', score: 97 },
    { name: 'May', score: 96 },
    { name: 'Jun', score: 96 },
  ];

  const campaignData = [
    { name: 'Summer Fashion Collection 2024', status: 'Active', score: 87, risk: 'Content Risk', ads: 24, flagged: 2, impressions: '1.25M', spend: '$45.0K' },
    { name: 'Tech Product Launch Campaign', status: 'Active', score: 92, risk: 'Policy Risk', ads: 18, flagged: 0, impressions: '890K', spend: '$32.0K' },
    { name: 'Holiday Special Promotion', status: 'Review', score: 65, risk: 'Sentiment Risk', ads: 32, flagged: 5, impressions: '2.10M', spend: '$68.0K' },
    { name: 'Brand Awareness Campaign Q2', status: 'Active', score: 94, risk: 'None', ads: 15, flagged: 0, impressions: '750K', spend: '$28.0K' },
    { name: 'Influencer Partnership Series', status: 'Active', score: 78, risk: 'Creator Risk', ads: 28, flagged: 3, impressions: '1.45M', spend: '$52.0K' }
  ];

  const creators = [
    { name: 'Sarah Johnson', followers: '2.4M', engagement: '8.2%', risk: 'Low Risk', index: 94, violations: 0, avatar: 'SJ' },
    { name: 'Michael Chen', followers: '1.8M', engagement: '6.5%', risk: 'Low Risk', index: 89, violations: 1, avatar: 'MC' },
    { name: 'Emma Rodriguez', followers: '980K', engagement: '5.1%', risk: 'Medium Risk', index: 72, violations: 3, avatar: 'ER' },
    { name: 'David Kim', followers: '3.2M', engagement: '9.8%', risk: 'Low Risk', index: 96, violations: 0, avatar: 'DK' }
  ];

  const placements = [
    { id: 1, name: 'News Placement', type: 'News', status: 'Safe', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', badge: '✅', keywords: ['innovation', 'technology', 'business'], relevance: 92, barColor: '#16A34A' },
    { id: 2, name: 'Social Feed', type: 'Social Feed', status: 'Safe', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', badge: '✅', keywords: ['fashion', 'style', 'trends'], relevance: 88, barColor: '#16A34A' },
    { id: 3, name: 'Video Content', type: 'Video Content', status: 'Unsafe', color: 'bg-rose-50 border-rose-200 text-rose-800', badge: '✖', keywords: ['politics', 'debate', 'controversy'], relevance: 15, barColor: '#DC2626' },
    { id: 4, name: 'Blog Articles', type: 'Blog Articles', status: 'Safe', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', badge: '✅', keywords: ['lifestyle', 'blog', 'trends'], relevance: 95, barColor: '#16A34A' },
    { id: 5, name: 'Entertainment', type: 'Entertainment', status: 'Irrelevant', color: 'bg-slate-50 border-slate-200 text-slate-800', badge: 'ℹ', keywords: ['movies', 'popcorn', 'music'], relevance: 42, barColor: '#64748B' }
  ];

  const handleConnect = (platform) => {
    setIntegrations(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        connected: !prev[platform].connected,
        id: prev[platform].connected ? '' : (platform === 'meta' ? 'act_123456' : platform === 'google' ? '987-654-321' : 'tiktok_adv_556'),
        pages: platform === 'meta' ? 2 : undefined
      }
    }));
  };

  const handleSync = (platform) => {
    setIntegrations(prev => ({
      ...prev,
      [platform]: { ...prev[platform], syncing: true }
    }));
    setTimeout(() => {
      setIntegrations(prev => ({
        ...prev,
        [platform]: { ...prev[platform], syncing: false }
      }));
    }, 1500);
  };

  // Re-Analysis Logic based on Category
  const handleReanalyze = (targetText = adText, targetCat = category) => {
    setIsReanalyzing(true);
    setTimeout(() => {
      setIsReanalyzing(false);
      const textLower = targetText.toLowerCase();
      if (targetCat === 'finance') {
        if (textLower.includes('returns') || textLower.includes('guaranteed') || textLower.includes('get rich')) {
          setRiskScore(65);
          setIssuesList([
            { type: 'Misleading Claim', text: 'Unverifiable financial promise ("Guaranteed 100% returns").' },
            { type: 'Absolute Statement', text: 'High-pressure absolute wording ("Get rich quick").' }
          ]);
          setSuggestionsList([
            { issue: 'Guaranteed returns', suggestion: 'Avoid misleading claims. Use compliant wording such as "Explore potential growth opportunities."' },
            { issue: 'Get rich quick', suggestion: 'Focus on enterprise security value rather than quick financial outcomes.' }
          ]);
        } else {
          setRiskScore(94);
          setIssuesList([]);
          setSuggestionsList([]);
        }
      } else if (targetCat === 'health') {
        if (textLower.includes('cure') || textLower.includes('healthcare') || textLower.includes('medicine') || textLower.includes('treats') || textLower.includes('returns') || textLower.includes('guaranteed')) {
          setRiskScore(58);
          setIssuesList([
            { type: 'Restricted Category', text: 'Healthcare products require additional verification.' },
            { type: 'Unsubstantiated Claim', text: 'Medical claims must be verified by regulatory bodies.' }
          ]);
          setSuggestionsList([
            { issue: 'Healthcare products', suggestion: 'Ensure all ingredients and manufacturer certificates are uploaded for manual verification.' },
            { issue: 'Medical claims', suggestion: 'Use compliant disclaimer wording: "Results may vary. Consult a medical professional."' }
          ]);
        } else {
          setRiskScore(92);
          setIssuesList([]);
          setSuggestionsList([]);
        }
      } else {
        // general
        setRiskScore(95);
        setIssuesList([]);
        setSuggestionsList([]);
      }
    }, 1200);
  };

  // Modal Campaign upload Auto AI trigger scan logic
  const handleModalReanalyze = (targetText = modalUploadText) => {
    setIsModalAnalyzing(true);
    setModalAnalysisDone(false);
    setTimeout(() => {
      setIsModalAnalyzing(false);
      setModalAnalysisDone(true);
      const textLower = targetText.toLowerCase();
      if (textLower.includes('returns') || textLower.includes('guaranteed') || textLower.includes('get rich') || textLower.includes('cure')) {
        setModalRiskScore(68);
        setModalIssues([
          { type: 'Misleading Claim', text: 'Unverifiable claims detected in copy.' }
        ]);
        setModalSuggestions([
          { issue: 'Unverifiable claims', suggestion: 'Use compliant wording such as "Explore potential growth opportunities."' }
        ]);
      } else {
        setModalRiskScore(96);
        setModalIssues([]);
        setModalSuggestions([]);
      }
    }, 1200);
  };

  // Influencer verification logic
  const handleVerifyInfluencer = () => {
    if (!verifyInput.trim()) return;
    setIsVerifying(true);
    setVerifiedInfluencer(null);
    
    setTimeout(() => {
      setIsVerifying(false);
      let inputVal = verifyInput.trim().toLowerCase();
      inputVal = inputVal.replace(/^(https?:\/\/)?(www\.)?/, '');
      if (inputVal.includes('/')) {
        const parts = inputVal.split('/');
        inputVal = parts[parts.length - 1] || parts[parts.length - 2];
      }
      inputVal = inputVal.replace(/^@/, '');
      
      let found = creators.find(c => c.name.toLowerCase().includes(inputVal) || inputVal.includes(c.name.toLowerCase().split(' ')[0]));
      
      if (found) {
        const details = {
          ...found,
          authenticity: found.name === 'David Kim' ? '94%' : found.name === 'Sarah Johnson' ? '91%' : found.name === 'Michael Chen' ? '88%' : '79%',
          contentQuality: found.name === 'David Kim' ? '95/100' : found.name === 'Sarah Johnson' ? '92/100' : found.name === 'Michael Chen' ? '89/100' : '72/100',
          brandAlignment: found.name === 'David Kim' ? '88/100' : found.name === 'Sarah Johnson' ? '95/100' : found.name === 'Michael Chen' ? '85/100' : '78/100',
          audienceSafety: found.name === 'David Kim' ? '92/100' : found.name === 'Sarah Johnson' ? '90/100' : found.name === 'Michael Chen' ? '86/100' : '74/100',
          networkRisk: found.name === 'David Kim' ? '95/100' : found.name === 'Sarah Johnson' ? '90/100' : found.name === 'Michael Chen' ? '85/100' : '70/100',
          pastViolationsScore: '100/100',
          insights: found.name === 'David Kim' ? 'Stable growth pattern. Strong audience trust with high engagement. No recent controversial content detected.' : 
                    found.name === 'Sarah Johnson' ? 'Highly aligned with lifestyle brands. Growth is steady and organic. Audience contains less than 9% suspect accounts.' : 
                    found.name === 'Michael Chen' ? '1 minor past violation related to copyright claim resolved. Strong performance metric consistency.' : 
                    'Controversial content detected in late 2025. Higher than average fake followers detected. Monitor posts closely.',
          violationsCount: found.violations,
          avatarUrl: found.name === 'David Kim' ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80' : 
                     found.name === 'Sarah Johnson' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80' : 
                     found.name === 'Michael Chen' ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' : 
                     'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80'
        };
        setVerifiedInfluencer(details);
      } else {
        const formattedName = inputVal.split(/[-_.]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setVerifiedInfluencer({
          name: formattedName || 'Custom Influencer',
          followers: '1.2M',
          engagement: '4.8%',
          risk: 'Medium Risk',
          index: 75,
          violations: 2,
          avatar: inputVal.substring(0,2).toUpperCase(),
          authenticity: '83%',
          contentQuality: '78/100',
          brandAlignment: '82/100',
          audienceSafety: '74/100',
          networkRisk: '65/100',
          pastViolationsScore: '80/100',
          insights: 'Audience authenticity is slightly low. Recommended to monitor sponsored posts closely for FTC compliance. Detected 2 disclosures missing.',
          violationsCount: 2,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
        });
      }
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col bg-guardian-bg text-guardian-body min-h-screen">
      
      {/* Dark Navy Header Banner - Matches design exactly & stretches edge-to-edge */}
      <div className="bg-[#0A192F] text-white p-6 md:p-8 lg:px-12 rounded-none -mx-4 md:-mx-8 lg:-mx-10 -mt-4 md:-mt-8 lg:-mt-10 border-b border-[#112240] flex flex-col items-start gap-6 shadow-xl relative overflow-hidden w-auto animate-[fadeIn_0.2s_ease-out] shrink-0">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Security Layer:</span>
              <span className="px-2.5 py-0.5 rounded text-xs font-black uppercase tracking-wider bg-blue-600 text-white">
                AD SAFETY CONTROL
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                Ad & Brand Safety Intelligence
              </h1>
              <span className="px-2 py-0.5 border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold tracking-widest uppercase rounded">
                LIVE SCANNERS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={() => setIsCreateCampaignOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all uppercase tracking-wider cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>+ New Campaign</span>
            </button>
            
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/10 uppercase tracking-wider cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-200 flex-shrink-0" />
              <span>Campaign Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content wrapped inside the dashboard container */}
      <div className="dashboard-container py-8 space-y-8 w-full flex-grow">
        
        {/* Navigation sub-tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border cursor-pointer ${
              activeTab === 'overview' 
                ? 'bg-blue-50 text-blue-700 border-blue-200 font-bold' 
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BarChart2 size={14} />
            Risk Analytics
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border cursor-pointer ${
              activeTab === 'integrations' 
                ? 'bg-blue-50 text-blue-700 border-blue-200 font-bold' 
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Server size={14} />
            Connected Platforms
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="bg-white border border-guardian-border p-6 rounded-2xl shadow-sm text-left space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Interactive Brand Safety &amp; Re-Analysis Engine (Brand Safety Engine)
                </h3>
                {isReanalyzing && (
                  <span className="text-sm text-blue-600 flex items-center gap-1.5 animate-pulse font-semibold">
                    <RefreshCw size={12} className="animate-spin" /> AI Core Scanning...
                  </span>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-56 shrink-0">
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      handleReanalyze(adText, e.target.value);
                    }}
                    className="w-full bg-slate-50 border border-guardian-border rounded-xl px-3 py-2.5 text-sm font-bold text-slate-705 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                  >
                    <option value="finance">💼 Finance Industry Rules</option>
                    <option value="health">🏥 Healthcare & Medical Rules</option>
                    <option value="general">🌍 General Industry Rules</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={adText}
                  onChange={(e) => setAdText(e.target.value)}
                  placeholder="Enter ad creative text copy..."
                  className="flex-1 bg-slate-50 border border-guardian-border rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-slate-700"
                />
                <button 
                  onClick={() => handleReanalyze(adText, category)}
                  disabled={isReanalyzing}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <RefreshCw size={14} className={isReanalyzing ? 'animate-spin' : ''} />
                  Re-Analyze
                </button>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Modify the text or change the industry category rules to trigger a real-time policy safety scan. Try replacing terms like "Get rich quick" or "Guaranteed" under Finance to see the score change to Green!
              </p>
            </div>

            {/* SECTION 5: Policy Compliance & Sentiment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              <div className="bg-white border border-guardian-border p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6 border-b border-guardian-border pb-4">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Policy Compliance Details</h3>
                      <p className="text-sm text-slate-400 font-light mt-0.5">Automated checks against compliance standards</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Score</span>
                      <span className="font-black text-3xl text-blue-650">{riskScore}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                    {['google', 'meta', 'asci', 'ftc'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setCompliancePlatform(p)}
                        className={`py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center ${
                          compliancePlatform === p 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        {p === 'google' ? 'Google Ads' : p === 'meta' ? 'Meta Ads' : p.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 border border-guardian-border rounded-xl flex items-center justify-between text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-emerald-500 w-4 h-4" />
                        <span className="text-slate-705">Allowed Claims</span>
                      </div>
                      <span className="text-slate-400 font-light">Product claims are substantiated</span>
                    </div>

                    <div className={`p-3 border rounded-xl flex items-center justify-between text-sm font-semibold transition-all ${
                      riskScore < 70 
                        ? 'bg-red-50 border-red-100 text-red-805' 
                        : 'bg-slate-50 border-guardian-border text-slate-705'
                    }`}>
                      <div className="flex items-center gap-2">
                        {riskScore < 70 ? (
                          <XCircle className="text-rose-500 w-4 h-4" />
                        ) : (
                          <CheckCircle className="text-emerald-500 w-4 h-4" />
                        )}
                        <span>Restricted Category</span>
                      </div>
                      <span className={riskScore < 70 ? 'text-rose-605 font-bold' : 'text-slate-400 font-light'}>
                        {riskScore < 70 ? 'Healthcare products require additional verification' : 'Passed verified standard checks'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 border border-guardian-border rounded-xl flex items-center justify-between text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-emerald-500 w-4 h-4" />
                        <span className="text-slate-705">Ad Format Compliance</span>
                      </div>
                      <span className="text-slate-400 font-light">Meets platforms specifications</span>
                    </div>

                    <div className="p-3 bg-slate-50 border border-guardian-border rounded-xl flex items-center justify-between text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-emerald-500 w-4 h-4" />
                        <span className="text-slate-705">Landing Page Quality</span>
                      </div>
                      <span className="text-slate-400 font-light">Destination URL is relevant &amp; active</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-guardian-border pt-4 mt-6">
                  <span className="text-sm font-bold text-slate-400 uppercase">Overall Compliance Rate</span>
                  <span className="text-xl font-black text-blue-650">92%</span>
                </div>
              </div>

              <div className="bg-white border border-guardian-border p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between">
                <div>
                  <div className="mb-6 border-b border-guardian-border pb-4">
                    <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Sentiment &amp; Emotion Insights</h3>
                    <p className="text-sm text-slate-400 font-light mt-0.5">AI NLP parsing of brand messaging tones</p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Emotion Breakdown</label>
                      <div className="h-6 w-full rounded-lg overflow-hidden flex text-white text-xs font-black">
                        <div className="bg-emerald-500 flex items-center justify-center" style={{ width: '45%' }}>45%</div>
                        <div className="bg-slate-400 flex items-center justify-center" style={{ width: '35%' }}>35%</div>
                        <div className="bg-rose-500 flex items-center justify-center" style={{ width: '20%' }}>20%</div>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span> Positive</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-400 rounded-full inline-block"></span> Neutral</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full inline-block"></span> Negative</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-sm">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Detected Emotions</label>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-slate-700">
                          <span>😨 Fear</span>
                          <span>28%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-[#7C3AED] h-full rounded-full" style={{ width: '28%' }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-slate-700">
                          <span>😊 Joy</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-slate-700">
                          <span>😡 Anger</span>
                          <span>12%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full rounded-full" style={{ width: '12%' }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-bold text-slate-700">
                          <span>🛡️ Trust</span>
                          <span>67%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: '67%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-amber-50 border border-amber-200 text-amber-805 text-xs leading-relaxed font-semibold rounded-xl flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Risk Insight:</strong> Fear-based messaging detected (28%) — potential brand trust risk.
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 6: Contextual Ad Placement Simulator */}
            <div className="bg-white border border-guardian-border p-6 rounded-2xl shadow-sm text-left space-y-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Contextual Ad Placement Simulator</h3>
                <p className="text-sm text-slate-400 font-light mt-0.5">Pre-scan publisher categories to verify safety and target alignments</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {placements.map((p) => (
                  <div 
                    key={p.id} 
                    className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                      p.status === 'Safe' ? 'bg-emerald-50/50 border-emerald-100' : 
                      p.status === 'Unsafe' ? 'bg-rose-50/50 border-rose-100' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-extrabold text-slate-850 leading-tight">{p.type}</span>
                        <div className="flex">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase inline-flex items-center gap-1 whitespace-nowrap ${
                            p.status === 'Safe' ? 'bg-emerald-100 text-emerald-800' : 
                            p.status === 'Unsafe' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            <span>{p.badge}</span> {p.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">
                        Context: <span className="text-slate-700 font-bold">{p.name}</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.keywords.map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/80 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2.5 mt-5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Relevance</span>
                        <span>{p.relevance}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: `${p.relevance}%`, backgroundColor: p.barColor }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 7: Influencer & Creator Safety Panel */}
            <div className="bg-white border border-guardian-border p-6 rounded-2xl shadow-sm text-left space-y-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Influencer &amp; Creator Safety Panel</h3>
                <p className="text-sm text-slate-400 font-light mt-0.5">Verify safety indices, track violations, and monitor content in real-time</p>
              </div>

              {/* Search & Verification Input System */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl space-y-4">
                <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block">Verify Influencer Authenticity</span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      value={verifyInput}
                      onChange={(e) => setVerifyInput(e.target.value)}
                      placeholder="Enter Username (e.g. @davidkim) or Profile URL (e.g. instagram.com/davidkim)"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-blue-500 text-slate-705"
                    />
                  </div>
                  <button
                    onClick={handleVerifyInfluencer}
                    disabled={isVerifying || !verifyInput.trim()}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" /> Scanning Core...
                      </>
                    ) : (
                      'Verify Influencer'
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  AI verification normalizes the input, pulls live metrics, audits audience authenticity, checks past violations, scans connections for network risks, and generates safety insights.
                </p>
              </div>

              {/* Verified Influencer Results Card */}
              {verifiedInfluencer && (
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-6 animate-fadeIn text-left">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={verifiedInfluencer.avatarUrl} 
                        alt={verifiedInfluencer.name} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-base text-slate-800 leading-tight">{verifiedInfluencer.name}</h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
                            isMonitoringActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-650'
                          }`}>
                            {isMonitoringActive ? '⊙ Monitoring Active' : 'Monitoring Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-405 font-semibold mt-1">
                          Followers: <span className="text-slate-705">{verifiedInfluencer.followers}</span> • Engagement Rate: <span className="text-slate-705">{verifiedInfluencer.engagement}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full lg:w-auto">
                      <button 
                        onClick={() => {
                          setIsMonitoringActive(!isMonitoringActive);
                          alert(isMonitoringActive ? "Monitoring disabled for this creator." : "Monitoring enabled for this creator.");
                        }}
                        className={`flex-1 lg:flex-none px-4 py-2 text-center text-sm font-bold uppercase rounded-lg border transition-colors cursor-pointer ${
                          isMonitoringActive 
                            ? 'bg-blue-50 text-blue-705 border-blue-200 hover:bg-blue-100' 
                            : 'bg-white text-slate-505 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {isMonitoringActive ? '✓ Active Monitoring' : 'Enable Monitoring'}
                      </button>
                      <button 
                        onClick={() => alert(`Report exported for ${verifiedInfluencer.name}`)}
                        className="flex-1 lg:flex-none px-4 py-2 bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 text-center text-sm font-bold uppercase rounded-lg transition-colors cursor-pointer"
                      >
                        ⬇ Export Report
                      </button>
                      <button 
                        onClick={() => alert(`Comparing ${verifiedInfluencer.name} with other creators...`)}
                        className="flex-1 lg:flex-none px-4 py-2 bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 text-center text-sm font-bold uppercase rounded-lg transition-colors cursor-pointer"
                      >
                        Compare Creator
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left: Score Card */}
                    <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Creator Safety Index</span>
                        <div className="flex items-baseline gap-1 mt-2">
                          <span className="text-3xl font-black text-slate-800">{verifiedInfluencer.index}</span>
                          <span className="text-xs text-slate-400 font-semibold">/100</span>
                          <span className={`ml-3 px-2 py-0.5 rounded text-xs font-black uppercase ${
                            verifiedInfluencer.index >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {verifiedInfluencer.risk}
                          </span>
                        </div>
                      </div>
                      <div className="w-full mt-4">
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${verifiedInfluencer.index}%`, 
                              backgroundColor: verifiedInfluencer.index >= 90 ? '#16A34A' : '#EA580C' 
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Middle: Breakdown */}
                    <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Risk Breakdown</span>
                      <div className="space-y-2 text-xs font-bold text-slate-600">
                        <div className="flex justify-between">
                          <span>Content Quality</span>
                          <span>{verifiedInfluencer.contentQuality}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Audience Authenticity</span>
                          <span>{verifiedInfluencer.authenticity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Brand Alignment</span>
                          <span>{verifiedInfluencer.brandAlignment}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: AI Insights */}
                    <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">🧠 AI Verification Insights</span>
                        <p className="text-sm text-blue-900 font-semibold leading-relaxed mt-2">
                          {verifiedInfluencer.insights}
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedCreator(verifiedInfluencer);
                          setIsCreatorModalOpen(true);
                        }}
                        className="text-left text-xs font-black uppercase text-blue-700 hover:text-blue-950 mt-4 flex items-center gap-1 cursor-pointer"
                      >
                        📈 View 6-Month Risk Trend & Graph →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {creators.map((c, idx) => {
                  const avatarUrls = {
                    'Sarah Johnson': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
                    'Michael Chen': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
                    'Emma Rodriguez': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
                    'David Kim': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
                  };
                  return (
                    <div key={idx} className="p-5 border border-guardian-border bg-white rounded-xl shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-500 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={avatarUrls[c.name]} 
                            alt={c.name} 
                            className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm"
                          />
                          <div>
                            <h4 className="text-sm font-black text-slate-800 leading-tight">{c.name}</h4>
                            <p className="text-xs text-slate-400 font-bold mt-0.5">{c.followers} • {c.engagement}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-bold uppercase">Safety Indicator</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-black uppercase ${
                            c.risk === 'Low Risk' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {c.risk}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-500">
                            <span>Safety Index</span>
                            <span className={c.index >= 90 ? 'text-emerald-600' : 'text-amber-600'}>{c.index}/100</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${c.index}%`, 
                                backgroundColor: c.index >= 90 ? '#16A34A' : '#EA580C' 
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400 uppercase">Violations</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-black uppercase ${
                            c.violations > 0 ? 'bg-orange-100 text-orange-800' : 'text-slate-500'
                          }`}>
                            {c.violations} {c.violations === 1 ? 'Violation' : 'Violations'}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          const details = {
                            ...c,
                            authenticity: c.name === 'David Kim' ? '94%' : c.name === 'Sarah Johnson' ? '91%' : c.name === 'Michael Chen' ? '88%' : '79%',
                            contentQuality: c.name === 'David Kim' ? '95/100' : c.name === 'Sarah Johnson' ? '92/100' : c.name === 'Michael Chen' ? '89/100' : '72/100',
                            brandAlignment: c.name === 'David Kim' ? '88/100' : c.name === 'Sarah Johnson' ? '95/100' : c.name === 'Michael Chen' ? '85/100' : '78/100',
                            audienceSafety: c.name === 'David Kim' ? '92/100' : c.name === 'Sarah Johnson' ? '90/100' : c.name === 'Michael Chen' ? '86/100' : '74/100',
                            networkRisk: c.name === 'David Kim' ? '95/100' : c.name === 'Sarah Johnson' ? '90/100' : c.name === 'Michael Chen' ? '85/100' : '70/100',
                            pastViolationsScore: '100/100',
                            insights: c.name === 'David Kim' ? 'Stable growth pattern. Strong audience trust with high engagement. No recent controversial content detected.' : 
                                      c.name === 'Sarah Johnson' ? 'Highly aligned with lifestyle brands. Growth is steady and organic. Audience contains less than 9% suspect accounts.' : 
                                      c.name === 'Michael Chen' ? '1 minor past violation related to copyright claim resolved. Strong performance metric consistency.' : 
                                      'Controversial content detected in late 2025. Higher than average fake followers detected. Monitor posts closely.',
                            violationsCount: c.violations,
                            avatarUrl: avatarUrls[c.name]
                          };
                          setSelectedCreator(details);
                          setIsCreatorModalOpen(true);
                        }}
                        className="w-full py-2 text-center text-xs font-bold uppercase text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        📈 View Creator Risk Graph
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 8: AI Decision & Actions */}
            <div className="bg-white border border-guardian-border p-6 rounded-2xl shadow-sm text-left space-y-4">
              <h3 className="font-extrabold text-sm text-slate-800 tracking-tight">AI Decision &amp; Actions</h3>
              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <div className="flex-1 p-5 border border-guardian-border rounded-xl flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 rounded-full text-emerald-600 shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800 leading-tight">Safe to Run</h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Campaign satisfies all active brand safety thresholds.</p>
                  </div>
                </div>
                <div className="flex-1 p-5 border border-guardian-border rounded-xl flex flex-col justify-center gap-2 text-left">
                  <button 
                    onClick={() => alert("Campaign Approved successfully!")}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Approve Campaign
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6 text-left">
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 tracking-tight">Connected Platforms</h3>
              <p className="text-xs text-slate-400 font-light mt-0.5">Manage credentials, fetch campaigns, and sync asset indexes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white border border-guardian-border p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="font-black text-base text-slate-800">Meta Ads Manager</div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      integrations.meta.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {integrations.meta.connected ? '✅ Connected' : '❌ Not Connected'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    Fetch Facebook and Instagram ad creatives and copy feeds automatically.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleConnect('meta')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all border cursor-pointer text-center ${
                      integrations.meta.connected ? 'bg-slate-100 text-slate-650 border-slate-200' : 'bg-blue-600 text-white border-transparent hover:bg-blue-750'
                    }`}
                  >
                    {integrations.meta.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>

              <div className="bg-white border border-guardian-border p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="font-black text-base text-slate-800">Google Ads</div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      integrations.google.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {integrations.google.connected ? '✅ Connected' : '❌ Not Connected'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    Fetch search terms, target keywords, and display ads for policy audits.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleConnect('google')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all border cursor-pointer text-center ${
                      integrations.google.connected ? 'bg-slate-100 text-slate-650 border-slate-200' : 'bg-blue-600 text-white border-transparent hover:bg-blue-750'
                    }`}
                  >
                    {integrations.google.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>

              <div className="bg-white border border-guardian-border p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="font-black text-base text-slate-800">TikTok Ads</div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      integrations.tiktok.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {integrations.tiktok.connected ? '✅ Connected' : '❌ Not Connected'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    Analyze video clips, captions, and creator accounts for brand safety.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleConnect('tiktok')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all border cursor-pointer text-center ${
                      integrations.tiktok.connected ? 'bg-slate-100 text-slate-650 border-slate-200' : 'bg-blue-600 text-white border-transparent hover:bg-blue-755'
                    }`}
                  >
                    {integrations.tiktok.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* CREATE NEW CAMPAIGN WIZARD */}
      {isCreateCampaignOpen && (
        <div className="fixed inset-0 z-50 bg-[#060913]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-white border border-guardian-border rounded-2xl p-6 shadow-2xl animate-scaleIn text-left">
            <div className="flex items-center justify-between mb-6 border-b border-guardian-border pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wider">Create New Campaign</h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">Set up your advertising campaign with AI-powered brand safety</p>
              </div>
              <button 
                onClick={() => setIsCreateCampaignOpen(false)}
                className="p-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 px-8">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                  wizardStep >= 1 ? 'bg-blue-605 bg-[#0D9488]' : 'bg-slate-200'
                }`}>1</span>
                <span className="text-xs font-bold text-slate-600">Campaign Details</span>
              </div>
              <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                  wizardStep === 2 ? 'bg-blue-605 bg-[#0D9488]' : 'bg-slate-200'
                }`}>2</span>
                <span className="text-xs font-bold text-slate-600">Budget &amp; Schedule</span>
              </div>
            </div>

            {wizardStep === 1 ? (
              <div className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">Campaign Name *</label>
                  <input
                    type="text"
                    value={newCampaignData.name}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Summer Fashion Collection 2024"
                    className="w-full bg-slate-50 border border-guardian-border rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">Campaign Type *</label>
                  <select
                    value={newCampaignData.type}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-slate-50 border border-guardian-border rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none"
                  >
                    <option>Brand Awareness</option>
                    <option>Product Launch</option>
                    <option>Lead Generation</option>
                    <option>Seasonal Promotion</option>
                    <option>Influencer Partnership</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2.5 border-t border-guardian-border pt-4 mt-6">
                  <button 
                    onClick={() => setIsCreateCampaignOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setWizardStep(2)}
                    disabled={!newCampaignData.name}
                    className="px-4 py-2 bg-[#0D9488] hover:bg-blue-700 text-white font-bold uppercase rounded-lg transition-colors disabled:opacity-50"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">Campaign Budget (USD) *</label>
                  <input
                    type="number"
                    value={newCampaignData.budget}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-slate-50 border border-guardian-border rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="p-3.5 bg-blue-50 border border-blue-150 text-blue-800 rounded-xl leading-relaxed text-[10px]">
                  🛡️ <strong>AI Brand Safety Analysis:</strong> Once created, your campaign will be automatically analyzed by our 6 AI models.
                </div>

                <div className="flex justify-end gap-2.5 border-t border-guardian-border pt-4 mt-6">
                  <button 
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-707 font-bold uppercase rounded-lg transition-colors"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={() => {
                      alert("Campaign configured and submitted for active AI scanning!");
                      setIsCreateCampaignOpen(false);
                      setWizardStep(1);
                    }}
                    className="px-4 py-2 bg-[#0D9488] hover:bg-blue-700 text-white font-bold uppercase rounded-lg transition-colors"
                  >
                    ✓ Create Campaign
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CAMPAIGN PERFORMANCE REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#060913]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white border border-guardian-border rounded-2xl p-6 shadow-2xl animate-scaleIn text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 border-b border-guardian-border pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wider">Campaign Performance Report</h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">Generated on March 8, 2026</p>
              </div>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-6 text-white text-center">
              <div className="p-4 bg-blue-600 rounded-xl shadow-sm">
                <span className="text-[9px] uppercase tracking-wider font-extrabold block text-blue-100">Total Campaigns</span>
                <span className="text-xl font-black mt-1 block">5</span>
              </div>
              <div className="p-4 bg-blue-600 rounded-xl shadow-sm">
                <span className="text-[9px] uppercase tracking-wider font-extrabold block text-blue-100">Total Ads</span>
                <span className="text-xl font-black mt-1 block">117</span>
              </div>
              <div className="p-4 bg-amber-600 rounded-xl shadow-sm">
                <span className="text-[9px] uppercase tracking-wider font-extrabold block text-amber-100">Flagged Ads</span>
                <span className="text-xl font-black mt-1 block">10</span>
              </div>
              <div className="p-4 bg-emerald-600 rounded-xl shadow-sm">
                <span className="text-[9px] uppercase tracking-wider font-extrabold block text-emerald-100">Avg Risk Score</span>
                <span className="text-xl font-black mt-1 block">83</span>
              </div>
              <div className="p-4 bg-purple-600 rounded-xl shadow-sm">
                <span className="text-[9px] uppercase tracking-wider font-extrabold block text-purple-100">Impressions</span>
                <span className="text-xl font-black mt-1 block">6.4M</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="border border-guardian-border rounded-xl overflow-hidden text-xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-guardian-border text-slate-400 font-bold text-left uppercase text-[9px]">
                      <th className="py-2.5 px-4">Campaign</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Risk</th>
                      <th className="py-2.5 px-3">Ads</th>
                      <th className="py-2.5 px-3 text-right">Spend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignData.map((c, idx) => (
                      <tr key={idx} className="border-b border-[#E2E8F0] hover:bg-slate-50 font-semibold text-slate-700">
                        <td className="py-2.5 px-4 font-bold text-slate-900">{c.name}</td>
                        <td className="py-2.5 px-3">{c.status}</td>
                        <td className="py-2.5 px-3">{c.score}</td>
                        <td className="py-2.5 px-3">{c.ads}</td>
                        <td className="py-2.5 px-3 text-right text-slate-900 font-bold">{c.spend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-guardian-border">
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-xs rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW CAMPAIGN MODAL WIZARD */}
      {isCreateCampaignOpen && (
        <div className="fixed inset-0 z-50 bg-[#060913]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xl animate-scaleIn text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wider">Create New Campaign</h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">Set up your advertising campaign with AI-powered brand safety</p>
              </div>
              <button 
                onClick={() => {
                  setIsCreateCampaignOpen(false);
                  setWizardStep(1);
                }}
                className="p-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 px-8">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                  wizardStep >= 1 ? 'bg-blue-600' : 'bg-slate-200'
                }`}>1</span>
                <span className="text-xs font-bold text-slate-600">Campaign Details</span>
              </div>
              <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                  wizardStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'
                }`}>2</span>
                <span className="text-xs font-bold text-slate-600">Connect Integrations</span>
              </div>
              <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                  wizardStep === 3 ? 'bg-blue-600' : 'bg-slate-200'
                }`}>3</span>
                <span className="text-xs font-bold text-slate-600">Upload & AI Scan</span>
              </div>
            </div>

            {/* STEP 1: CAMPAIGN DETAILS */}
            {wizardStep === 1 && (
              <div className="space-y-4 text-xs font-semibold">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">Campaign Name *</label>
                    <input
                      type="text"
                      value={newCampaignData.name}
                      onChange={(e) => setNewCampaignData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Summer Fashion Collection 2024"
                      className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-slate-805 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">Campaign Type *</label>
                    <select
                      value={newCampaignData.type}
                      onChange={(e) => setNewCampaignData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-slate-805 focus:outline-none focus:border-blue-500"
                    >
                      <option>Brand Awareness</option>
                      <option>Product Launch</option>
                      <option>Lead Generation</option>
                      <option>Seasonal Promotion</option>
                      <option>Influencer Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">Target Platforms *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Google Ads', icon: (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21.356 11.1H12v3.8h5.38c-.23 1.21-.91 2.24-1.94 2.93v2.43h3.14c1.84-1.7 2.9-4.2 2.9-7.16 0-.6-.05-1.19-.14-1.71z" fill="#4285F4"/>
                          <path d="M12 20.6c2.32 0 4.27-.77 5.7-2.1l-3.14-2.43c-.87.58-1.99.93-3.14.93-2.42 0-4.47-1.63-5.2-3.83H3.04v2.5C4.47 18.5 7.97 20.6 12 20.6z" fill="#34A853"/>
                          <path d="M6.8 13.17c-.18-.58-.29-1.2-.29-1.84s.11-1.26.29-1.84V7H3.04C2.37 8.35 2 9.87 2 11.5s.37 3.15 1.04 4.5l3.76-2.83z" fill="#FBBC05"/>
                          <path d="M12 6.13c1.26 0 2.4.43 3.3 1.28l2.47-2.47C16.27 3.47 14.32 2.7 12 2.7 7.97 2.7 4.47 4.8 3.04 7.3l3.76 2.83c.73-2.2 2.78-3.83 5.2-3.83z" fill="#EA4335"/>
                        </svg>
                      ) },
                      { name: 'Meta Ads', icon: (
                        <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                        </svg>
                      ) },
                      { name: 'YouTube', icon: (
                        <svg className="w-3.5 h-3.5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      ) },
                      { name: 'TikTok', icon: (
                        <svg className="w-3.5 h-3.5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.21-.42-.45-.6-.69-.06 2.86-.01 5.71-.02 8.57-.02 1.4-.31 2.82-1.05 4-1.15 1.83-3.19 3.03-5.36 3.1-2.23.1-4.58-.87-5.69-2.8-1.19-1.98-1.07-4.71.3-6.52 1.25-1.7 3.41-2.58 5.51-2.29v4.13c-1.04-.26-2.2.08-2.81.98-.67.92-.5 2.33.39 3.06.84.72 2.19.66 2.95-.15.4-.41.61-.98.6-1.55.03-4.54.01-9.08.02-13.62z"/>
                        </svg>
                      ) },
                      { name: 'LinkedIn', icon: (
                        <svg className="w-3.5 h-3.5 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      ) },
                      { name: 'Twitter/X', icon: (
                        <svg className="w-3.5 h-3.5 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      ) }
                    ].map((plat) => {
                      const isSelected = newCampaignData.platforms.includes(plat.name);
                      return (
                        <button
                          key={plat.name}
                          type="button"
                          onClick={() => {
                            setNewCampaignData(prev => ({
                              ...prev,
                              platforms: isSelected 
                                ? prev.platforms.filter(p => p !== plat.name) 
                                : [...prev.platforms, plat.name]
                            }));
                          }}
                          className={`py-2 px-3 border rounded-xl text-center text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isSelected 
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                              : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50'
                          }`}
                        >
                          {plat.icon}
                          <span>{plat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1.5 uppercase font-bold">
                    <label>Campaign Description</label>
                    <span>{newCampaignData.description.length}/500 characters</span>
                  </div>
                  <textarea
                    value={newCampaignData.description}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, description: e.target.value.slice(0, 500) }))}
                    placeholder="Describe your campaign objectives and target audience..."
                    className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-slate-805 focus:outline-none focus:border-blue-500 h-16 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">Campaign Budget (USD) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        value={newCampaignData.budget}
                        onChange={(e) => setNewCampaignData(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl pl-6 pr-2 py-1.5 text-slate-850 font-bold focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">Start Date *</label>
                    <input
                      type="date"
                      value={newCampaignData.startDate}
                      onChange={(e) => setNewCampaignData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-slate-808 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">End Date *</label>
                    <input
                      type="date"
                      value={newCampaignData.endDate}
                      onChange={(e) => setNewCampaignData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-slate-808 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 mb-1.5 uppercase text-[10px] font-bold">Target Audience</label>
                  <input
                    type="text"
                    value={newCampaignData.audience}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, audience: e.target.value }))}
                    placeholder="e.g., Women 25-45, Fashion enthusiasts, Urban areas"
                    className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2.5 border-t border-[#E2E8F0] pt-4 mt-6">
                  <button 
                    onClick={() => {
                      setIsCreateCampaignOpen(false);
                      setWizardStep(1);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-707 font-bold uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setWizardStep(2)}
                    disabled={!newCampaignData.name}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CONNECT INTEGRATIONS */}
            {wizardStep === 2 && (
              <div className="space-y-5 text-xs font-semibold">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Fetch Creative Ads Assets</span>
                
                <div className="space-y-3.5">
                  {/* Meta */}
                  <div className="p-4 border border-slate-150 rounded-xl bg-slate-50 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-850">Meta Ads</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                          integrations.meta.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-650'
                        }`}>
                          {integrations.meta.connected ? '✅ Connected' : '❌ Not Connected'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                        Fetch Facebook and Instagram creatives automatically.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleConnect('meta')}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-[10px] uppercase hover:bg-slate-100 transition-all cursor-pointer"
                      >
                        {integrations.meta.connected ? 'Disconnect' : 'Connect'}
                      </button>
                      {integrations.meta.connected && (
                        <button 
                          onClick={() => handleSync('meta')}
                          disabled={integrations.meta.syncing}
                          className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase hover:bg-blue-700 transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {integrations.meta.syncing ? 'Syncing...' : 'Sync Ads'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Google */}
                  <div className="p-4 border border-slate-150 rounded-xl bg-slate-50 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-850">Google Ads</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                          integrations.google.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-650'
                        }`}>
                          {integrations.google.connected ? '✅ Connected' : '❌ Not Connected'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                        Import search text, copy parameters, keywords, and URLs.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleConnect('google')}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-[10px] uppercase hover:bg-slate-100 transition-all cursor-pointer"
                      >
                        {integrations.google.connected ? 'Disconnect' : 'Connect'}
                      </button>
                      {integrations.google.connected && (
                        <button 
                          onClick={() => handleSync('google')}
                          disabled={integrations.google.syncing}
                          className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase hover:bg-blue-700 transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {integrations.google.syncing ? 'Syncing...' : 'Sync Ads'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* TikTok */}
                  <div className="p-4 border border-slate-150 rounded-xl bg-slate-50 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-850">TikTok Ads</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                          integrations.tiktok.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-650'
                        }`}>
                          {integrations.tiktok.connected ? '✅ Connected' : '❌ Not Connected'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                        Fetch audio overlay files and hashtag creative structures.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleConnect('tiktok')}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-[10px] uppercase hover:bg-slate-100 transition-all cursor-pointer"
                      >
                        {integrations.tiktok.connected ? 'Disconnect' : 'Connect'}
                      </button>
                      {integrations.tiktok.connected && (
                        <button 
                          onClick={() => handleSync('tiktok')}
                          disabled={integrations.tiktok.syncing}
                          className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase hover:bg-blue-700 transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {integrations.tiktok.syncing ? 'Syncing...' : 'Sync Ads'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-150 rounded-xl text-blue-900 leading-relaxed text-[10px]">
                  🛡️ <strong>OAuth Platform integrations</strong> grant read-only parameters `ads_read` and `adwords.readonly` to automatically synchronize materials in the next step.
                </div>

                <div className="flex justify-end gap-2.5 border-t border-[#E2E8F0] pt-4 mt-6">
                  <button 
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={() => setWizardStep(3)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: UPLOAD CONTENT & AUTO AI TRIGGER */}
            {wizardStep === 3 && (
              <div className="space-y-4 text-xs font-semibold">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Upload Content & AI Brand Safety Analysis</span>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Image Upload Box */}
                  <div 
                    onClick={() => {
                      setModalUploadedImage(modalUploadedImage ? null : 'creative_banner.png');
                      handleModalReanalyze(modalUploadText);
                    }}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1.5 ${
                      modalUploadedImage ? 'border-blue-500 bg-blue-50/20' : 'border-slate-300'
                    }`}
                  >
                    <svg className={`w-8 h-8 ${modalUploadedImage ? 'text-blue-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-extrabold text-[10px] text-slate-700">
                      {modalUploadedImage ? 'creative_banner.png' : 'Click to Upload Image'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-light">PNG, JPG up to 10MB</span>
                  </div>

                  {/* Video Upload Box */}
                  <div 
                    onClick={() => {
                      setModalUploadedVideo(modalUploadedVideo ? null : 'promo_video.mp4');
                      handleModalReanalyze(modalUploadText);
                    }}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1.5 ${
                      modalUploadedVideo ? 'border-blue-500 bg-blue-50/20' : 'border-slate-300'
                    }`}
                  >
                    <svg className={`w-8 h-8 ${modalUploadedVideo ? 'text-blue-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="font-extrabold text-[10px] text-slate-700">
                      {modalUploadedVideo ? 'promo_video.mp4' : 'Click to Upload Video'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-light">MP4, MOV up to 100MB</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-slate-500 uppercase text-[10px] font-bold">Ad Text copy *</label>
                    <button 
                      onClick={() => {
                        setModalUploadText('Explore potential growth opportunities with our unified security platforms.');
                        handleModalReanalyze('Explore potential growth opportunities with our unified security platforms.');
                      }}
                      className="text-[9px] font-black text-blue-605 uppercase hover:text-blue-700 cursor-pointer"
                    >
                      🔌 Import Compliant Copy
                    </button>
                  </div>
                  <textarea
                    value={modalUploadText}
                    onChange={(e) => {
                      setModalUploadText(e.target.value);
                      handleModalReanalyze(e.target.value);
                    }}
                    placeholder="Enter or edit your campaign ad copy text..."
                    className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-blue-500 h-16 resize-none"
                  />
                </div>

                {/* AI Analysis loader / results */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">AI Analysis Output</span>
                    {isModalAnalyzing ? (
                      <span className="text-[10px] text-blue-650 font-bold flex items-center gap-1.5 animate-pulse">
                        <RefreshCw size={10} className="animate-spin" /> Auto Trigger Scanning...
                      </span>
                    ) : modalAnalysisDone ? (
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        modalRiskScore >= 80 ? 'bg-emerald-100 text-emerald-850' : 'bg-amber-100 text-amber-850'
                      }`}>
                        {modalRiskScore >= 80 ? 'Safe to Run' : 'Needs Review'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold">Waiting for uploaded materials...</span>
                    )}
                  </div>

                  {isModalAnalyzing && (
                    <div className="h-12 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {!isModalAnalyzing && modalAnalysisDone && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-600">Simulated AI Risk Score:</span>
                        <span className={`text-base font-black ${modalRiskScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {modalRiskScore}/100
                        </span>
                      </div>
                      
                      {modalIssues.length > 0 ? (
                        <div className="space-y-2">
                          <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-800 rounded-lg text-[10px] font-bold flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                              {modalIssues.map((issue, idx) => (
                                <div key={idx}><strong>{issue.type}:</strong> {issue.text}</div>
                              ))}
                            </div>
                          </div>
                          <div className="p-2.5 bg-blue-50 border border-blue-100 text-blue-900 rounded-lg text-[10px] font-bold flex items-start gap-1.5">
                            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              {modalSuggestions.map((sug, idx) => (
                                <div key={idx}><strong>💡 Suggestion ({sug.issue}):</strong> {sug.suggestion}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>All scanners cleared! Content compliance index is optimal.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2.5 border-t border-[#E2E8F0] pt-4 mt-6">
                  <button 
                    onClick={() => setWizardStep(2)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 font-bold uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={() => {
                      alert("Campaign configured and submitted for active AI scanning!");
                      setIsCreateCampaignOpen(false);
                      setWizardStep(1);
                      setModalAnalysisDone(false);
                    }}
                    disabled={isModalAnalyzing}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    ✓ Create Campaign
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATOR MODAL */}
      {isCreatorModalOpen && selectedCreator && (

        <div className="fixed inset-0 z-50 bg-[#060913]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white border border-guardian-border rounded-2xl p-6 shadow-2xl animate-scaleIn text-left">
            <div className="flex items-start justify-between mb-6 border-b border-guardian-border pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-800 leading-tight">{selectedCreator.name}</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">{selectedCreator.followers} followers • {selectedCreator.engagement} engagement</p>
              </div>
              <button 
                onClick={() => {
                  setSelectedCreator(null);
                  setIsCreatorModalOpen(false);
                }}
                className="p-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="p-3 bg-blue-50 border border-blue-150 text-blue-900 rounded-xl leading-relaxed text-xs flex items-start gap-2.5 font-semibold">
                <Bell size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Active Monitoring Enabled:</strong> You'll receive real-time alerts for content violations and safety score changes.
                </span>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={creatorTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                    <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={10} tickLine={false} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#0D9488" 
                      strokeWidth={3} 
                      dot={{ r: 4, stroke: '#0D9488', strokeWidth: 2, fill: '#FFFFFF' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-end gap-2 border-t border-guardian-border pt-4 mt-6">
                <button 
                  onClick={() => {
                    setSelectedCreator(null);
                    setIsCreatorModalOpen(false);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

