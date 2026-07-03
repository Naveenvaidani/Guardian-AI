import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, ArrowDown, ChevronRight, Play, Sparkles, ShieldCheck, Share2, DollarSign, BarChart2, FileText, Compass, Settings } from 'lucide-react';

export default function CampaignPipeline() {
  const [activeStep, setActiveStep] = useState(3); // Stage 4 is active

  const stages = [
    {
      id: 1,
      title: 'Campaign Input',
      status: 'success',
      desc: 'Product definitions, goals, target platform tags, and monthly budget setup completed.',
      icon: Settings,
      details: 'Product: Guardian AI Suite | Budget: $5,000 | Platforms: Google, Meta'
    },
    {
      id: 2,
      title: 'AI Content Generation',
      status: 'success',
      desc: 'Automated headlines, visual templates, and copywriting variants generated.',
      icon: Sparkles,
      details: '3 text variations compiled | 1 visual placeholder optimized for Instagram'
    },
    {
      id: 3,
      title: 'Market Fit & User Preferences',
      status: 'success',
      desc: 'Optimized geographical region metrics, best posting schedule, and lookalike audience mapping.',
      icon: Compass,
      details: 'Target: Tech Workers 25-45 | Best posting schedule: 9:00 AM'
    },
    {
      id: 4,
      title: 'Brand Safety & Policy Check',
      status: 'review',
      desc: 'Scan copywriting for misleading claims, absolute terminology, and regional restrictions.',
      icon: ShieldCheck,
      details: 'Warning: Claim "absolute immunity" requires relative modifier adjustment.'
    },
    {
      id: 5,
      title: 'Automatic Publishing Engine',
      status: 'pending',
      desc: 'Auto-post configurations, network connections, and post queues.',
      icon: Share2,
      details: 'Platforms connection active. Scheduled posts queued: 8 posts.'
    },
    {
      id: 6,
      title: 'Paid Ads Integration',
      status: 'pending',
      desc: 'Google & Meta API key verification, billing setups, and auto-bidding adjustments.',
      icon: DollarSign,
      details: 'Suggested split: 45% Google / 35% Meta | Target ROI: 4.2x'
    },
    {
      id: 7,
      title: 'Performance Tracking',
      status: 'pending',
      desc: 'Real-time click tracker, CPA tracking, and conversion signals.',
      icon: BarChart2,
      details: 'Tracking pixel active on port 8000.'
    },
    {
      id: 8,
      title: 'AI Report Generation',
      status: 'pending',
      desc: 'Compiling summary reports, click-through rates, budget spend audits, and ROI charts.',
      icon: FileText,
      details: 'Auto-reports compiled every 7 days.'
    },
    {
      id: 9,
      title: 'AI Recommendations',
      status: 'pending',
      desc: 'Scale high-performing variants, pause low engagement copy, suggest layout modifications.',
      icon: Play,
      details: 'Continuous integration and machine learning loop.'
    }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl max-w-4xl mx-auto text-[#1E293B]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
        <div className="p-2.5 rounded-xl bg-slate-900 text-white">
          <Play className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-slate-800 font-sans">Campaign Life Cycle Pipeline</h2>
          <p className="text-xs text-slate-500 font-light">Interactive vertical pipeline tracking stages from design to optimization</p>
        </div>
      </div>

      {/* Visual Pipeline Stack */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        
        {/* Line connector down the center */}
        <div className="absolute left-9 sm:left-11 top-4 bottom-4 w-0.5 bg-slate-200" />

        {stages.map((stage, index) => {
          const IconComponent = stage.icon;
          const isSuccess = stage.status === 'success';
          const isReview = stage.status === 'review';
          const isPending = stage.status === 'pending';

          return (
            <div key={stage.id} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Outer status node */}
              <div 
                className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300 ${
                  isSuccess 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                    : isReview 
                    ? 'bg-[#D97706] border-[#D97706] text-white shadow-md shadow-orange-500/20 animate-pulse' 
                    : 'bg-white border-slate-300 text-slate-400 group-hover:border-slate-400'
                }`}
              >
                {isSuccess && <CheckCircle2 className="w-4.5 h-4.5" />}
                {isReview && <AlertTriangle className="w-4.5 h-4.5" />}
                {isPending && <span className="text-[10px] font-black">{stage.id}</span>}
              </div>

              {/* Card Block */}
              <div 
                onClick={() => setActiveStep(stage.id)}
                className={`flex-1 p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left ${
                  activeStep === stage.id 
                    ? 'bg-slate-50 border-slate-300/80 shadow-md ring-1 ring-slate-200' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-4 h-4 ${
                      isSuccess ? 'text-emerald-500' : isReview ? 'text-[#D97706]' : 'text-slate-400'
                    }`} />
                    <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wide">
                      Stage {stage.id}: {stage.title}
                    </h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                    isSuccess 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : isReview 
                      ? 'bg-orange-50 text-[#D97706]' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {stage.status}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-light leading-relaxed mb-2">
                  {stage.desc}
                </p>

                {/* Extended Details when selected */}
                {activeStep === stage.id && (
                  <div className="mt-2.5 p-2.5 bg-white rounded-lg border border-slate-200 text-[10px] text-slate-600 font-medium font-mono">
                    {stage.details}
                  </div>
                )}
              </div>

              {/* Progress Flow Arrow (except last item) */}
              {index < stages.length - 1 && (
                <div className="absolute left-[26px] sm:left-[34px] -bottom-4 z-20 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
