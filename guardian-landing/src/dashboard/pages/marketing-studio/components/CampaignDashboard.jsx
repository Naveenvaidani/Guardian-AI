import React, { useState } from 'react';
import { Target, CheckCircle2, ShieldAlert, Sparkles, ChevronDown, ChevronUp, AlertCircle, Clock, XCircle, Settings, Bell, Download, HelpCircle, AlertTriangle, TrendingUp, Info, BarChart3 } from 'lucide-react';

export default function CampaignDashboard() {
  // Collapsible accordion state for Section 1
  const [isInputExpanded, setIsInputExpanded] = useState(true);

  // Form States
  const [product, setProduct] = useState('Guardian AI Protection Suite');
  const [industry, setIndustry] = useState('Technology');
  const [goal, setGoal] = useState('Sales');
  const [platforms, setPlatforms] = useState(['Google', 'Meta']);
  const [websiteUrl, setWebsiteUrl] = useState('https://guardian-ai.com');
  const [monthlyBudget, setMonthlyBudget] = useState('$5,000');
  const [targetRegion, setTargetRegion] = useState('United States');
  const [keywords, setKeywords] = useState('AI protection, cyber threat detection, absolute security');

  // Brand Safety States
  const [autoReview, setAutoReview] = useState(true);
  const [safetyItems, setSafetyItems] = useState([
    {
      id: 1,
      title: 'Transform Your Marketing ROI with AI-Powered Intelligence',
      sentiment: 92,
      risk: 'Low Risk',
      status: 'APPROVED'
    },
    {
      id: 2,
      title: 'Stop Guessing. Start Winning. AI Marketing That Actually Works',
      sentiment: 88,
      risk: 'Low Risk',
      status: 'PENDING'
    },
    {
      id: 3,
      title: 'Get Rich Quick with Our Amazing System',
      sentiment: 45,
      risk: 'High Risk',
      status: 'VIOLATION',
      violations: ['Misleading claims', 'Unrealistic promises']
    }
  ]);

  // Performance Intelligence Tab & Chart State
  const [activeMetricTab, setActiveMetricTab] = useState('CTR');

  const metricData = {
    Reach: {
      values: [42000, 55000, 48000, 67000, 62000, 71000, 78000],
      suffix: '',
      peak: 'Jan 21 (78,000)'
    },
    CTR: {
      values: [3.2, 3.8, 3.5, 3.9, 3.7, 4.18, 4.4],
      suffix: '%',
      peak: 'Jan 21 (4.4%)'
    },
    Conversion: {
      values: [120, 145, 130, 165, 155, 178, 195],
      suffix: '',
      peak: 'Jan 21 (195)'
    },
    Revenue: {
      values: [8500, 10200, 9100, 11961, 11200, 13400, 14800],
      prefix: '$',
      suffix: '',
      peak: 'Jan 21 ($14,800)'
    }
  };

  const handleTogglePlatform = (p) => {
    if (platforms.includes(p)) {
      setPlatforms(platforms.filter(plat => plat !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const handleApproveItem = (id) => {
    setSafetyItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'APPROVED' };
      }
      return item;
    }));
  };

  const handleRegenerateItem = (id) => {
    setSafetyItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: 'Continuous Protection & AI Threat Prevention Suite',
          sentiment: 95,
          risk: 'Low Risk',
          status: 'APPROVED',
          violations: []
        };
      }
      return item;
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 text-guardian-body font-sans">
      
      {/* LEFT COLUMN: Input & Safety (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* SECTION 1: Campaign Input Panel (Collapsible Card) */}
        <div className="bg-white border border-guardian-border rounded-2xl shadow-sm overflow-hidden">
          {/* Header Row */}
          <div 
            onClick={() => setIsInputExpanded(!isInputExpanded)}
            className="flex items-center justify-between p-4.5 bg-guardian-section/50 cursor-pointer select-none border-b border-guardian-border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/10">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-guardian-heading uppercase tracking-wide">Campaign Input Panel</h3>
                <p className="text-[11px] text-guardian-secondary font-light">Create AI-powered marketing campaigns</p>
              </div>
            </div>
            {isInputExpanded ? (
              <ChevronUp className="w-5 h-5 text-guardian-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-guardian-secondary" />
            )}
          </div>

          {/* Form Content (collapsible with smooth height) */}
          {isInputExpanded && (
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-guardian-secondary mb-1.5 uppercase tracking-wider">Product / Service</label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    placeholder="e.g., AI Marketing Platform"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-guardian-secondary mb-1.5 uppercase tracking-wider">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                  >
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Retail</option>
                    <option>Education</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-guardian-secondary mb-1.5 uppercase tracking-wider">Campaign Goal</label>
                  <div className="grid grid-cols-3 gap-1.5 bg-guardian-section p-1 rounded-xl border border-guardian-border">
                    {['Sales', 'Leads', 'Traffic'].map(gl => (
                      <button
                        key={gl}
                        type="button"
                        onClick={() => setGoal(gl)}
                        className={`py-1 rounded-lg text-[10px] font-bold transition-all uppercase tracking-wider ${
                          goal === gl 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-guardian-secondary hover:text-guardian-heading'
                        }`}
                      >
                        {gl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-guardian-secondary mb-1.5 uppercase tracking-wider">Target Platforms</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Google', 'Meta', 'Instagram', 'LinkedIn', 'X'].map(plat => {
                      const isSelected = platforms.includes(plat);
                      return (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => handleTogglePlatform(plat)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all uppercase ${
                            isSelected 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                              : 'bg-white text-guardian-secondary border-guardian-border hover:bg-slate-50'
                          }`}
                        >
                          {plat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-guardian-secondary mb-1.5 uppercase tracking-wider">Website URL</label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-guardian-secondary mb-1.5 uppercase tracking-wider">Monthly Budget</label>
                  <input
                    type="text"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                    className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    placeholder="$5,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-guardian-secondary mb-1.5 uppercase tracking-wider">Target Region</label>
                  <input
                    type="text"
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value)}
                    className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    placeholder="United States"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-guardian-secondary mb-1.5 uppercase tracking-wider">Keywords (Optional)</label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    placeholder="AI marketing, automation, ROI"
                  />
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-guardian-border/60">
                <button
                  type="button"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors shadow-sm"
                >
                  Run Market Intelligence
                </button>
                <button
                  type="button"
                  className="flex-1 bg-white hover:bg-slate-50 text-blue-600 border border-blue-600 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-colors"
                >
                  Generate Campaign
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Brand Safety & Compliance Check */}
        <div className="bg-white border border-guardian-border rounded-2xl shadow-sm p-6 space-y-5">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-4 border-b border-guardian-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-605">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-guardian-heading uppercase tracking-wide">Brand Safety & Compliance Check</h3>
                <p className="text-[11px] text-guardian-secondary font-light">AI-powered content moderation and policy validation</p>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-guardian-secondary font-semibold">Auto-review:</span>
              <button 
                onClick={() => setAutoReview(!autoReview)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                  autoReview ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <div 
                  className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform duration-300 ${
                    autoReview ? 'translate-x-4.5' : 'translate-x-0'
                  }`} 
                />
              </button>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {safetyItems.map((item) => {
              const isApproved = item.status === 'APPROVED';
              const isPending = item.status === 'PENDING';
              const isViolation = item.status === 'VIOLATION';

              return (
                <div 
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isViolation 
                      ? 'bg-red-50/50 border-red-200/60 shadow-sm' 
                      : 'bg-guardian-section/40 border-guardian-border/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className={`text-xs font-bold leading-relaxed ${isViolation ? 'text-red-900' : 'text-guardian-heading'}`}>
                      {item.title}
                    </p>
                    
                    {/* Status Icons */}
                    {isApproved && <CheckCircle2 className="w-4.5 h-4.5 text-green-600 flex-shrink-0" />}
                    {isPending && <Clock className="w-4.5 h-4.5 text-orange-500 flex-shrink-0" />}
                    {isViolation && <XCircle className="w-4.5 h-4.5 text-red-500 flex-shrink-0" />}
                  </div>

                  <div className="flex flex-wrap items-center gap-3.5 text-[10px] text-guardian-secondary mb-3 font-semibold uppercase tracking-wider">
                    <span>Sentiment: <strong className="text-guardian-heading font-black">{item.sentiment}%</strong></span>
                    <span className="flex items-center gap-1">
                      Risk Level: 
                      <strong className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                        isViolation 
                          ? 'bg-red-100 text-red-650' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {item.risk}
                      </strong>
                    </span>
                  </div>

                  {/* Violation details box */}
                  {isViolation && item.violations && (
                    <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-100 text-xs">
                      <p className="font-bold text-red-950 flex items-center gap-1 mb-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        Policy Violations:
                      </p>
                      <ul className="space-y-1 text-red-800 font-medium">
                        {item.violations.map((v, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-red-650 font-extrabold text-[9px]">⊘</span> {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Rows */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/40">
                    {isPending && (
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => handleApproveItem(item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-green-600 hover:bg-green-705 text-white font-bold text-[10px] uppercase transition-colors"
                        >
                          ✓ Approve
                        </button>
                        <button
                          className="px-3.5 py-1.5 rounded-lg bg-white border border-guardian-border text-guardian-secondary hover:bg-slate-50 font-bold text-[10px] uppercase transition-colors"
                        >
                          Manual Review
                        </button>
                        <button
                          className="px-3.5 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 font-bold text-[10px] uppercase transition-colors"
                        >
                          Auto-fix
                        </button>
                      </div>
                    )}

                    {isViolation && (
                      <button
                        onClick={() => handleRegenerateItem(item.id)}
                        className="w-full py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-[10px] uppercase border border-blue-150 transition-colors"
                      >
                        ↻ Regenerate Content
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2 pt-5 border-t border-guardian-border/60 text-center">
            <div>
              <span className="text-[10px] text-guardian-secondary font-bold uppercase block">Approval Rate</span>
              <span className="text-lg font-black text-green-600">94%</span>
            </div>
            <div>
              <span className="text-[10px] text-guardian-secondary font-bold uppercase block">Avg Check Time</span>
              <span className="text-lg font-black text-guardian-heading">2.3s</span>
            </div>
            <div>
              <span className="text-[10px] text-guardian-secondary font-bold uppercase block">Pending Review</span>
              <span className="text-lg font-black text-orange-500">3</span>
            </div>
            <div>
              <span className="text-[10px] text-guardian-secondary font-bold uppercase block">Violations</span>
              <span className="text-lg font-black text-red-600">1</span>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Publishing Control & Performance charts (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* SECTION 3: Publishing & Ads Control */}
        <div className="bg-white border border-guardian-border rounded-2xl shadow-sm p-6 space-y-5">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-4 border-b border-guardian-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-orange-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-guardian-heading uppercase tracking-wide">Publishing & Ads Control</h3>
                <p className="text-[11px] text-guardian-secondary font-light">Manage campaigns across platforms</p>
              </div>
            </div>
            <button className="text-[10px] font-bold px-2.5 py-1.5 border border-blue-500/20 text-blue-606 rounded-lg hover:bg-blue-50/50 uppercase tracking-wider">
              Configure
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-guardian-section rounded-xl border border-guardian-border space-y-3">
              <h4 className="text-[10px] font-bold text-guardian-secondary uppercase tracking-wider">Connected Platforms</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Google Ads', 'Meta Ads', 'Instagram', 'LinkedIn'].map(plat => (
                  <div key={plat} className="flex items-center justify-between p-2 rounded-lg bg-white border border-guardian-border text-xs font-semibold text-guardian-body">
                    <span>{plat}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-bold uppercase">Active</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-t border-b border-guardian-border/60 text-xs font-semibold">
              <div>
                <span className="text-guardian-secondary mr-1.5">Scheduled Posts:</span>
                <span className="text-guardian-heading font-bold">8</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-guardian-secondary">Auto-post:</span>
                <span className="text-blue-600 font-black uppercase text-[10px]">ON</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-guardian-secondary">Paid Ads:</span>
                <span className="text-blue-600 font-black uppercase text-[10px]">ON</span>
              </div>
            </div>

            <div className="p-4 bg-guardian-section rounded-xl border border-guardian-border space-y-3.5">
              <h4 className="text-[10px] font-bold text-guardian-secondary uppercase tracking-wider">Budget Allocation (AI Suggested)</h4>
              <div className="space-y-2.5">
                {[
                  { name: 'Google', pct: 45, width: '45%' },
                  { name: 'Meta', pct: 35, width: '35%' },
                  { name: 'Instagram', pct: 15, width: '15%' },
                  { name: 'LinkedIn', pct: 5, width: '5%' }
                ].map(b => (
                  <div key={b.name} className="text-xs">
                    <div className="flex justify-between font-bold text-guardian-body mb-1">
                      <span>{b.name}</span>
                      <span>{b.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: b.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-[10px] font-bold text-guardian-secondary uppercase tracking-wider">Performance Predictions</h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-guardian-section border border-guardian-border rounded-xl">
                  <span className="text-[9px] text-guardian-secondary font-bold uppercase block">Avg CPC</span>
                  <span className="font-extrabold text-guardian-heading text-sm">$2.45</span>
                </div>
                <div className="p-2.5 bg-guardian-section border border-guardian-border rounded-xl">
                  <span className="text-[9px] text-guardian-secondary font-bold uppercase block">Avg CPA</span>
                  <span className="font-extrabold text-guardian-heading text-sm">$18.50</span>
                </div>
                <div className="p-2.5 bg-guardian-section border border-guardian-border rounded-xl">
                  <span className="text-[9px] text-guardian-secondary font-bold uppercase block">ROI</span>
                  <span className="font-extrabold text-green-600 text-sm">4.2x</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                ➤ Publish Now
              </button>
              <button className="py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors border border-guardian-border">
                Schedule Posts
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4: Live Performance Intelligence */}
        <div className="bg-white border border-guardian-border rounded-2xl shadow-sm p-6 space-y-5">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-4 border-b border-guardian-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-105 text-blue-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-guardian-heading uppercase tracking-wide">Live Performance Intelligence</h3>
                <p className="text-[11px] text-guardian-secondary font-light">Real time campaign metrics with AI predictions</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button className="px-2.5 py-1.5 border border-guardian-border rounded-lg hover:bg-slate-50 flex items-center gap-1 text-guardian-secondary">
                Last 7 Days
              </button>
              <button className="p-1.5 rounded-lg border border-guardian-border hover:bg-slate-50 text-guardian-secondary">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metric Selector Tabs */}
          <div className="grid grid-cols-4 gap-1 bg-guardian-section p-1 rounded-xl border border-guardian-border">
            {['Reach', 'CTR', 'Conversion', 'Revenue'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveMetricTab(tab)}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all uppercase tracking-wider ${
                  activeMetricTab === tab 
                    ? 'bg-blue-650 text-white shadow-sm' 
                    : 'text-guardian-secondary hover:text-guardian-heading'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Custom Interactive SVG Graph */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-guardian-heading text-center">
              {activeMetricTab} Performance — Last 7 Days
            </h4>
            <div className="relative h-44 w-full flex items-end justify-between px-2 pt-4 border-b border-l border-guardian-border">
              {/* Bars */}
              {metricData[activeMetricTab].values.map((val, idx) => {
                const day = 15 + idx;
                const maxVal = Math.max(...metricData[activeMetricTab].values);
                const heightPct = (val / maxVal) * 80; // Scale height up to 80% maximum

                return (
                  <div key={day} className="flex flex-col items-center flex-1 group relative">
                     {/* Tooltip */}
                    <span className="absolute -top-7 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-bold shadow-md">
                      {metricData[activeMetricTab].prefix || ''}{val}{metricData[activeMetricTab].suffix}
                    </span>
                    
                    {/* SVG/CSS Interactive Bar with Gradient */}
                    <div 
                      className="w-7 bg-gradient-to-t from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 rounded-t transition-all duration-500 cursor-pointer" 
                      style={{ height: `${heightPct}%` }} 
                    />
                    <span className="text-[9px] text-guardian-secondary mt-1.5 font-bold uppercase">Jan {day}</span>
                  </div>
                );
              })}
            </div>

            {/* KPI Metrics row below the chart */}
            <div className="grid grid-cols-4 gap-2 text-center bg-guardian-section p-3 rounded-xl border border-guardian-border text-[10px]">
              <div>
                <span className="text-guardian-secondary font-bold uppercase block text-[8px] mb-0.5">Avg Growth</span>
                <span className="font-extrabold text-green-600 flex items-center justify-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> +24.5%
                </span>
              </div>
              <div>
                <span className="text-guardian-secondary font-bold uppercase block text-[8px] mb-0.5">Peak Day</span>
                <span className="font-extrabold text-guardian-heading">{metricData[activeMetricTab].peak}</span>
              </div>
              <div>
                <span className="text-guardian-secondary font-bold uppercase block text-[8px] mb-0.5">AI Confidence</span>
                <span className="font-extrabold text-blue-600">94%</span>
              </div>
              <div>
                <span className="text-guardian-secondary font-bold uppercase block text-[8px] mb-0.5">Risk Signals</span>
                <span className="font-extrabold text-orange-500 font-bold">2</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
