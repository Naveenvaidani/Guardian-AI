import React, { useState } from 'react';
import { Shield, Globe, User, BarChart3, Sparkles, PlusCircle, Rocket, ShieldAlert, Compass, Settings, Bell, X, AlertTriangle, CheckCircle } from 'lucide-react';
import QuickActions from './components/QuickActions';
import ChatWindow from './components/ChatWindow';
import CampaignDashboard from './components/CampaignDashboard';
import CreativeStudio from './components/CreativeStudio';
import CampaignPipeline from './components/CampaignPipeline';
import { generateImage, createVideo, createCampaign, boostPost } from './api/mock';

export default function MarketingStudio() {
  const [mode, setMode] = useState('enterprise'); // government, enterprise, personal
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, studio, assistant, pipeline
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Welcome to your Guardian AI Marketing & Campaign Command Center. Use the Quick Action buttons or chat with me directly to generate visual creatives, build campaign pipelines, run compliance scans, or manage live budgets.',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Validation States for "Launch Ads"
  const [validationModal, setValidationModal] = useState({
    isOpen: false,
    status: 'idle', // 'success', 'error'
    errors: []
  });

  // Action card handlers for the AI Assistant tab
  const handleApproveCard = (cardId) => {
    setMessages(prev => prev.map(msg => {
      if (msg.card && msg.card.id === cardId) {
        return {
          ...msg,
          card: { ...msg.card, status: 'approved' }
        };
      }
      return msg;
    }));
    addSystemResponse("Creative Approved! Successfully queued and posted to verified social channels.");
  };

  const handleRunAdsCampaign = async (cardId) => {
    let targetCard = null;
    messages.forEach(m => {
      if (m.card && m.card.id === cardId) targetCard = m.card;
    });

    if (!targetCard) return;

    setIsTyping(true);
    const result = await createCampaign({
      budget: '$750/week',
      platform: targetCard.type === 'video' ? 'TikTok Ads' : 'Meta Ads Manager',
      audience: 'Tech Professionals 25-45'
    });
    setIsTyping(false);

    setMessages(prev => prev.map(msg => {
      if (msg.card && msg.card.id === cardId) {
        return {
          ...msg,
          card: { ...msg.card, status: 'running' }
        };
      }
      return msg;
    }));

    addSystemResponse(`Campaign Live!\n• ID: ${result.campaignId}\n• Platform: ${result.platform}\n• Spend Limit: ${result.spendLimit}\n• Status: ${result.status}\n\nMetrics tracker is active at port 8000.`);
  };

  const handleEditCard = (cardId) => {
    addSystemResponse("Design editor panel overlay initialized. Drag/drop assets to customize layout and title.");
  };

  const handleFixCompliance = (cardId, actionType) => {
    if (actionType === 'regenerate') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => prev.map(msg => {
          if (msg.card && msg.card.id === cardId) {
            return {
              ...msg,
              card: {
                ...msg.card,
                compliance: { passed: true, issues: [] },
                title: msg.card.title + ' (Compliance Adjusted)',
                metrics: {
                  ...msg.card.metrics,
                  safetyScore: '99'
                }
              }
            };
          }
          return msg;
        }));
        addSystemResponse("Compliance scan cleared! Visual elements and description regenerated to comply with advertising policy guidelines.");
      }, 1000);
    } else {
      addSystemResponse("Manual review requested. Sent to Guardian AI Compliance queue.");
    }
  };

  const addSystemResponse = (text, card = null) => {
    setMessages(prev => [
      ...prev,
      {
        id: 'reply_' + Date.now(),
        sender: 'ai',
        text,
        card
      }
    ]);
  };

  const handleSendMessage = async (text) => {
    const userMsgId = 'user_' + Date.now();
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text }]);
    
    setIsTyping(true);
    const lower = text.toLowerCase();
    
    if (lower.includes('image') || lower.includes('creative') || lower.includes('photo')) {
      const response = await generateImage(text);
      setIsTyping(false);
      addSystemResponse(
        `I have generated a responsive product creative matching your prompt. Compliance scan score: ${response.metrics.safetyScore}/100.`,
        {
          id: 'card_' + Date.now(),
          type: 'creative',
          title: response.title,
          url: response.url,
          description: response.description,
          metrics: response.metrics,
          compliance: response.compliance,
          status: 'draft'
        }
      );
    } else if (lower.includes('video') || lower.includes('clip') || lower.includes('animation')) {
      const response = await createVideo(text, 'Instagram/TikTok Reel');
      setIsTyping(false);
      addSystemResponse(
        `Dynamic kinetic-text promotional clip generated successfully. Check the performance indicators below.`,
        {
          id: 'card_' + Date.now(),
          type: 'video',
          title: response.title,
          thumbnail: response.thumbnail,
          description: response.description,
          metrics: response.metrics,
          compliance: response.compliance,
          status: 'draft'
        }
      );
    } else if (lower.includes('campaign') || lower.includes('ads') || lower.includes('meta') || lower.includes('google')) {
      setIsTyping(false);
      addSystemResponse(
        `I've configured a draft campaign builder. Review the parameters before pushing it live.`,
        {
          id: 'card_' + Date.now(),
          type: 'campaign',
          title: 'Strategic Lead Gen Campaign',
          description: 'A comprehensive audience-matched campaign targeting technology decison-makers, using pre-validated assets.',
          metrics: {
            predictedCTR: '4.85',
            engagement: '14.20',
            safetyScore: '98'
          },
          compliance: { passed: true, issues: [] },
          status: 'draft'
        }
      );
    } else if (lower.includes('boost') || lower.includes('post') || lower.includes('reach')) {
      setIsTyping(false);
      addSystemResponse(
        `Draft configuration for post amplification:`,
        {
          id: 'card_' + Date.now(),
          type: 'boost',
          title: 'Announcement Amplification Boost',
          description: 'Promote security updates and verification highlights to immediate lookalike audience (2%).',
          metrics: {
            predictedCTR: '3.90',
            engagement: '25.60',
            safetyScore: '100'
          },
          compliance: { passed: true, issues: [] },
          status: 'draft'
        }
      );
    } else if (lower.includes('safety') || lower.includes('audit') || lower.includes('risk') || lower.includes('policy')) {
      setIsTyping(false);
      addSystemResponse(
        `Warning: Policy check detected high-risk indicators inside the promotional text copy. Review is required.`,
        {
          id: 'card_' + Date.now(),
          type: 'creative',
          title: 'Special Offer: Cyber Protection Suite',
          description: 'Claim your protection license now! High-risk claim "guaranteed absolute immunity" might breach advertising guidelines.',
          metrics: {
            predictedCTR: '6.50',
            engagement: '18.90',
            safetyScore: '45'
          },
          compliance: {
            passed: false,
            issues: ['Unverifiable absolute claim detected ("guaranteed absolute immunity"). Recommended modification: Use relative benefits terms.']
          },
          status: 'draft'
        }
      );
    } else {
      setTimeout(() => {
        setIsTyping(false);
        addSystemResponse("Understood. I can build campaigns, generate ad visual creatives, or boost posts. Try clicking one of the Quick Action buttons above to see the automated rendering flow in action!");
      }, 800);
    }
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'generate_image':
        handleSendMessage("Generate a modern tech workspace photo ad banner");
        break;
      case 'create_video':
        handleSendMessage("Create a video clip for our SaaS product announcement");
        break;
      case 'run_campaign':
        handleSendMessage("Setup meta lead campaign for tech professionals");
        break;
      case 'boost_post':
        handleSendMessage("Boost latest company post on safety standards");
        break;
      case 'safety_check':
        handleSendMessage("Run a policy safety audit scan for absolute security claims");
        break;
      default:
        break;
    }
  };

  // + CREATE CAMPAIGN: scrolls to the form and opens it
  const handleHeaderCreateCampaign = () => {
    setActiveTab('dashboard');
    setTimeout(() => {
      const formEl = document.querySelector('.bg-teal-600');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // LAUNCH ADS SYSTEM: Validation Checks as per Section 6 of campaign execution hub PDF
  const handleHeaderLaunchAds = () => {
    setActiveTab('dashboard');
    
    // Validate:
    // 1. Campaign Input fields
    // 2. Compliance status approved (Brand Safety check fails if high risk item exists)
    // 3. Integrations connected
    // 4. Budget configured
    const errors = [];
    
    // Simulate check:
    // If active mode is secure/gov, or by default, check if we have any active violation
    // Item 3 inside Brand Safety is "Get Rich Quick with Our Amazing System" which is a VIOLATION!
    errors.push('Compliance: Policy violation detected in ad copy "Get Rich Quick with Our Amazing System" (Misleading claims, Unrealistic promises).');
    errors.push('Integrations: Google Ads & Meta Ads must have custom API connection tokens verified before launch.');

    setValidationModal({
      isOpen: true,
      status: 'error',
      errors: errors
    });
  };

  return (
    <div className="w-full flex flex-col bg-guardian-bg text-guardian-body min-h-screen">
      
      {/* Dark Navy Header Banner - Matches design exactly & stretches edge-to-edge */}
      <div className="bg-[#0A192F] text-white p-6 md:p-8 lg:px-12 rounded-none -mx-4 md:-mx-8 lg:-mx-10 -mt-4 md:-mt-8 lg:-mt-10 border-b border-[#112240] flex flex-col items-start gap-6 shadow-xl relative overflow-hidden w-auto animate-[fadeIn_0.2s_ease-out] shrink-0">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Campaign Layer:</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white">
                ACTIVE PIPELINE
              </span>
            </div>

            <div className="flex items-center gap-3 flex-nowrap whitespace-nowrap">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
                Marketing Studio
              </h1>
              <span className="px-2 py-0.5 border border-red-500/30 bg-red-500/10 text-red-400 text-[9px] font-bold tracking-widest uppercase rounded">
                LIVE PIPELINE
              </span>
            </div>
          </div>

          {/* Action buttons inside the banner, positioned beautifully */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {/* Outlined Pill button with circle-plus icon */}
            <button
              onClick={handleHeaderCreateCampaign}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all uppercase tracking-wider cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div className="flex flex-col text-left font-extrabold text-[9px] leading-tight">
                <span>+ CREATE</span>
                <span>CAMPAIGN</span>
              </div>
            </button>
            
            {/* Outlined Pill button */}
            <button
              onClick={() => setActiveTab('studio')}
              className="flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all uppercase tracking-wider cursor-pointer"
            >
              <div className="flex flex-col text-center font-extrabold text-[9px] leading-tight">
                <span>GENERATE</span>
                <span>CREATIVE</span>
              </div>
            </button>
            
            {/* Filled Pill button with rocket icon */}
            <button
              onClick={handleHeaderLaunchAds}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/10 uppercase tracking-wider cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-blue-200 flex-shrink-0" />
              <div className="flex flex-col text-left font-extrabold text-[9px] leading-tight text-white">
                <span>LAUNCH</span>
                <span>ADS</span>
              </div>
            </button>
          </div>
        </div>

        {/* Operating Mode Selector Pill - Repositioned below dashboard name */}
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
        
        {/* Pill sub-tabs below the header */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'dashboard', label: 'Campaign Dashboard', icon: BarChart3 },
            { id: 'studio', label: 'Creative Studio', icon: Sparkles },
            { id: 'assistant', label: 'AI Assistant', icon: User },
            { id: 'pipeline', label: 'Campaign Pipeline', icon: Rocket }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  isActive 
                    ? 'bg-blue-650/10 text-blue-605 border-blue-200 font-bold' 
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-55 hover:text-slate-800'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-blue-605' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3. MAIN WORKSPACE */}
        <div className="w-full">
          {activeTab === 'dashboard' && (
            <CampaignDashboard />
          )}

          {activeTab === 'studio' && (
            <CreativeStudio />
          )}

          {activeTab === 'pipeline' && (
            <CampaignPipeline />
          )}

          {activeTab === 'assistant' && (
            <div className="max-w-5xl mx-auto flex flex-col space-y-6">
              <div className="bg-white border border-guardian-border p-5 rounded-2xl shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Launch Direct Campaign Action
                </h3>
                <QuickActions onActionClick={handleQuickAction} disabled={isTyping} />
              </div>

              <ChatWindow
                messages={messages}
                onSendMessage={handleSendMessage}
                onCardApprove={handleApproveCard}
                onCardRunAds={handleRunAdsCampaign}
                onCardEdit={handleEditCard}
                onCardFixCompliance={handleFixCompliance}
                isTyping={isTyping}
              />
            </div>
          )}
        </div>
      </div>

      {/* Launch Validation Modal (Section 6 of hub specs) */}
      {validationModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-[#060913]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                Launch Ads Validation Failures
              </h3>
              <button 
                onClick={() => setValidationModal({ isOpen: false, status: 'idle', errors: [] })}
                className="p-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-gray-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-slate-500 mb-4 font-light leading-relaxed">
              Before launching live ad streams, your campaign setup must pass all automated policy and integration checkouts. The following blocks are preventing execution:
            </p>

            <div className="space-y-3.5 mb-6">
              {validationModal.errors.map((err, idx) => (
                <div key={idx} className="p-3.5 bg-rose-50 border border-rose-150 rounded-xl flex items-start gap-2.5 text-xs text-rose-900 leading-relaxed font-semibold">
                  <ShieldAlert className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>{err}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setValidationModal({ isOpen: false, status: 'idle', errors: [] });
                  alert("Resolving compliance issues... Regenerating assets.");
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
              >
                Resolve Violations
              </button>
              <button
                onClick={() => setValidationModal({ isOpen: false, status: 'idle', errors: [] })}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-707 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                Cancel Setup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Footer */}
      <footer className="w-full mt-auto py-6 border-t border-slate-200/60 text-center text-xs text-slate-400 bg-white">
        <div className="w-12 h-0.5 bg-blue-650 rounded-full mx-auto mb-3"></div>
        <p className="tracking-wide">Powered by Guardian AI Intelligence Layer • Running on port 8000</p>
      </footer>

    </div>
  );
}
