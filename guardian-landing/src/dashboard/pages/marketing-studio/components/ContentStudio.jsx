import React, { useState } from 'react';
import { Target, CheckCircle2, ShieldAlert, Sparkles, Send, Share2, BarChart2, Globe, TrendingUp, AlertTriangle } from 'lucide-react';

export default function ContentStudio() {
  const [formData, setFormData] = useState({
    product: 'Guardian AI Protection Suite',
    industry: 'cybersecurity',
    goal: 'Sales',
    platforms: ['Google', 'Meta'],
    url: 'https://guardian-ai.com',
    budget: '$5,000',
    region: 'United States',
    keywords: 'AI protection, cyber threat detection, absolute security'
  });

  const [campaignOutputs, setCampaignOutputs] = useState([
    {
      id: 1,
      copy: 'Transform Your Marketing ROI with AI-Powered Intelligence',
      sentiment: 92,
      risk: 'Low Risk',
      violations: []
    },
    {
      id: 2,
      copy: 'Stop Guessing. Start Winning. AI Marketing That Actually Works',
      sentiment: 88,
      risk: 'Low Risk',
      violations: []
    },
    {
      id: 3,
      copy: 'Get Rich Quick with Our Amazing System - Guaranteed Absolute Security!',
      sentiment: 45,
      risk: 'High Risk',
      violations: ['Misleading claims', 'Unrealistic promises']
    }
  ]);

  const [activeChartTab, setActiveChartTab] = useState('CTR');

  const handleGoalChange = (goal) => {
    setFormData(prev => ({ ...prev, goal }));
  };

  const togglePlatform = (platform) => {
    setFormData(prev => {
      const active = prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms: active };
    });
  };

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleRegenerate = (id) => {
    setCampaignOutputs(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          copy: 'Continuous Cyber Protection & AI Threat Prevention Suite',
          sentiment: 96,
          risk: 'Low Risk',
          violations: []
        };
      }
      return item;
    }));
  };

  const handleApprove = (id) => {
    alert(`Content approved & sent to publishing queue: "${campaignOutputs.find(c => c.id === id).copy}"`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12">
      
      {/* Left Column: Form and Compliance Check (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Campaign Input Panel */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-xl bg-slate-900 text-white">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-800">Campaign Input Panel</h2>
              <p className="text-xs text-slate-500 font-light">Create AI-powered marketing campaigns</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Product / Service</label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none"
                  placeholder="e.g., AI Marketing Platform"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none"
                >
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="technology">SaaS & Tech</option>
                  <option value="finance">Finance & Crypto</option>
                  <option value="lifestyle">Lifestyle & Retail</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Campaign Goal</label>
                <div className="grid grid-cols-3 gap-2 bg-slate-100/80 p-1 rounded-xl">
                  {['Sales', 'Leads', 'Traffic'].map(goal => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => handleGoalChange(goal)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                        formData.goal === goal 
                          ? 'bg-slate-800 text-white shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Target Platforms</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Google', 'Meta', 'Instagram', 'LinkedIn', 'X'].map(plat => {
                    const isActive = formData.platforms.includes(plat);
                    return (
                      <button
                        key={plat}
                        type="button"
                        onClick={() => togglePlatform(plat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border uppercase ${
                          isActive 
                            ? 'bg-slate-800 text-white border-slate-800 shadow-sm' 
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
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
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Website URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Monthly Budget</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none"
                  placeholder="$5,000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Target Region</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none"
                  placeholder="United States"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Keywords (Optional)</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none"
                  placeholder="AI marketing, automation, ROI"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors shadow-md"
              >
                Run Market Intelligence
              </button>
              <button
                type="button"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors shadow-md"
              >
                Generate Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Brand Safety & Compliance Check */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-800">Brand Safety & Compliance Check</h2>
                <p className="text-xs text-slate-500 font-light">AI-powered content moderation and policy validation</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-slate-400">Auto-review:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-emerald-600 uppercase font-black text-[10px]">ON</span>
            </div>
          </div>

          <div className="space-y-4">
            {campaignOutputs.map((item) => {
              const isHighRisk = item.risk === 'High Risk';
              return (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-xl border transition-all ${
                    isHighRisk 
                      ? 'bg-rose-50/70 border-rose-200/85 shadow-sm' 
                      : 'bg-slate-50/50 border-slate-200/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className={`text-xs font-bold ${isHighRisk ? 'text-rose-900' : 'text-slate-800'}`}>
                      {item.copy}
                    </p>
                    {isHighRisk && <span className="text-rose-600 font-black text-[10px] uppercase">★ High Risk</span>}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 mb-3 font-medium">
                    <span>Sentiment: <strong className="text-slate-800 font-extrabold">{item.sentiment}%</strong></span>
                    <span>Risk Index: <strong className={isHighRisk ? 'text-rose-600 font-extrabold' : 'text-emerald-600 font-extrabold'}>{item.risk}</strong></span>
                  </div>

                  {/* Policy violations */}
                  {item.violations.length > 0 && (
                    <div className="mb-3.5 p-3 rounded-lg bg-rose-50 border border-rose-100 text-xs">
                      <p className="font-bold text-rose-800 flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Policy Violations Detected:
                      </p>
                      <ul className="list-disc pl-4 space-y-0.5 text-rose-700 font-medium">
                        {item.violations.map((v, i) => <li key={i}>{v}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Resolve Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/40">
                    {!isHighRisk ? (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] uppercase transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[10px] uppercase transition-colors"
                        >
                          Manual Review
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRegenerate(item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] uppercase transition-colors shadow-sm"
                        >
                          Regenerate Content
                        </button>
                        <button
                          className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[10px] uppercase transition-colors"
                        >
                          Request Exception
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Metrics Bar directly matching PDF page 2 */}
          <div className="grid grid-cols-4 gap-2 mt-6 pt-5 border-t border-slate-100 text-center">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Approval Rate</span>
              <span className="text-lg font-black text-emerald-600">94%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg Check Time</span>
              <span className="text-lg font-black text-slate-800">2.3s</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Pending</span>
              <span className="text-lg font-black text-orange-500">3</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Violations</span>
              <span className="text-lg font-black text-rose-500">1</span>
            </div>
          </div>
        </div>

      </div>

      {/* Right Column: Publishing control & performance analytics (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Publishing & Ads Control */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 text-white">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-800">Publishing & Ads Control</h2>
                <p className="text-xs text-slate-500 font-light">Manage campaigns across platforms</p>
              </div>
            </div>
            <button className="text-xs font-semibold px-2.5 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">
              Configure
            </button>
          </div>

          <div className="space-y-5">
            {/* Connected Platforms list from PDF */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Connected Platforms</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Google Ads', 'Meta Ads', 'Instagram', 'LinkedIn'].map(plat => (
                  <div key={plat} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                    <span>{plat}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold uppercase">Active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Options toggles */}
            <div className="flex justify-between items-center py-2.5 border-t border-b border-slate-100 text-xs font-semibold">
              <div>
                <span className="text-slate-400 mr-1">Scheduled Posts:</span>
                <span className="text-slate-800">8</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Auto-post:</span>
                <span className="text-emerald-600 font-extrabold uppercase text-[10px]">ON</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Paid Ads:</span>
                <span className="text-emerald-600 font-extrabold uppercase text-[10px]">ON</span>
              </div>
            </div>

            {/* Budget Allocation bar graphs */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Suggested Budget Allocation</h4>
              <div className="space-y-2.5">
                {[
                  { name: 'Google', pct: 45, color: 'bg-blue-500' },
                  { name: 'Meta', pct: 35, color: 'bg-indigo-600' },
                  { name: 'Instagram', pct: 15, color: 'bg-pink-500' },
                  { name: 'LinkedIn', pct: 5, color: 'bg-cyan-600' },
                ].map(item => (
                  <div key={item.name} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>{item.name}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Predictions tags */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Performance Predictions</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Avg CPC</span>
                  <span className="font-extrabold text-slate-800 text-sm">$2.45</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Avg CPA</span>
                  <span className="font-extrabold text-slate-800 text-sm">$18.50</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Est. ROI</span>
                  <span className="font-extrabold text-emerald-600 text-sm">4.2x</span>
                </div>
              </div>
            </div>

            {/* Platform Submit actions */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                Publish Now
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors">
                Schedule Posts
              </button>
            </div>

          </div>
        </div>

        {/* Live Performance Intelligence Panel */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 text-white">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-800">Performance Intelligence</h2>
                <p className="text-xs text-slate-500 font-light">Real-time metrics with AI predictions</p>
              </div>
            </div>
            <select className="text-xs border border-slate-200 rounded-lg p-1 font-semibold focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          {/* Metric Subtabs */}
          <div className="grid grid-cols-4 gap-1 bg-slate-100/80 p-1 rounded-xl mb-6">
            {['Reach', 'CTR', 'Conversion', 'Revenue'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveChartTab(tab)}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                  activeChartTab === tab 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* SVG Bar Chart representing the graph in PDF page 3 */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-4 text-center">
              {activeChartTab} Performance — Last 7 Days
            </h4>
            <div className="relative h-44 w-full flex items-end justify-between px-2 pt-4 border-b border-l border-slate-200">
              {/* Bars */}
              {[
                { day: 'Jan 15', val: 62 },
                { day: 'Jan 16', val: 78 },
                { day: 'Jan 17', val: 68 },
                { day: 'Jan 18', val: 80 },
                { day: 'Jan 19', val: 76 },
                { day: 'Jan 20', val: 86 },
                { day: 'Jan 21', val: 92 },
              ].map(bar => (
                <div key={bar.day} className="flex flex-col items-center flex-1 group relative">
                  {/* Tooltip */}
                  <span className="absolute -top-6 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {(bar.val / 20).toFixed(1)}%
                  </span>
                  
                  {/* Bar fill */}
                  <div 
                    className="w-8 bg-indigo-500/80 hover:bg-indigo-600 rounded-t transition-all duration-500" 
                    style={{ height: `${bar.val * 1.2}px` }} 
                  />
                  <span className="text-[9px] text-slate-400 mt-1.5 font-bold uppercase">{bar.day.substring(4)}</span>
                </div>
              ))}
            </div>

            {/* Chart Summary metrics footer matching PDF page 3 */}
            <div className="grid grid-cols-4 gap-2 mt-5 text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Avg Growth</span>
                <span className="font-extrabold text-emerald-600 text-xs flex items-center justify-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +24.5%
                </span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Peak Day</span>
                <span className="font-extrabold text-slate-700 text-xs">Jan 21</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Confidence</span>
                <span className="font-extrabold text-indigo-600 text-xs">94%</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Risk Signals</span>
                <span className="font-extrabold text-rose-500 text-xs">2</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
