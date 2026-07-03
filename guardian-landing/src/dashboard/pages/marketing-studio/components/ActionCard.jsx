import React, { useState } from 'react';
import { ShieldCheck, Calendar, DollarSign, Target, Award, ArrowUpRight, CheckCircle2, AlertTriangle, Edit2, Play, Eye } from 'lucide-react';
import ComplianceBanner from './ComplianceBanner';

export default function ActionCard({ card, onApprove, onRunAds, onEdit, onFixCompliance }) {
  const { id, type, title, url, thumbnail, description, metrics, compliance, status } = card;
  const [showDetails, setShowDetails] = useState(false);

  const getStatusBadge = () => {
    switch (status) {
      case 'approved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/25">Live & Approved</span>;
      case 'running':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 border border-orange-500/25">Campaign Running</span>;
      case 'draft':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/25">Ready to Launch</span>;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 mb-5 hover:border-slate-300/40 transition-all duration-300">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-slate-100 uppercase tracking-widest text-slate-500">
            {type}
          </span>
          <h3 className="font-bold text-base text-slate-800">{title}</h3>
        </div>
        {getStatusBadge()}
      </div>

      {/* Main Grid: Content Left, Stats Right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Preview Panel */}
        <div className="md:col-span-2 space-y-3">
          {(url || thumbnail) && (
            <div className="relative group rounded-xl overflow-hidden aspect-[16/9] border border-slate-100 bg-slate-100">
              <img
                src={url || thumbnail}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/25 to-transparent flex items-end p-3.5">
                <p className="text-xs text-white line-clamp-2 leading-relaxed font-medium">
                  {description}
                </p>
              </div>
              {type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="p-3.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white/30 transition-all">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </span>
                </div>
              )}
            </div>
          )}

          {!url && !thumbnail && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-600 leading-relaxed font-light">{description}</p>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Predicted Performance</h4>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            {metrics.predictedCTR && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">CTR Prediction</p>
                  <p className="text-lg font-extrabold text-slate-800 mt-0.5">{metrics.predictedCTR}%</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-500" />
              </div>
            )}

            {metrics.engagement && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Engagement Rate</p>
                  <p className="text-lg font-extrabold text-slate-800 mt-0.5">{metrics.engagement}%</p>
                </div>
                <Award className="w-5 h-5 text-indigo-500" />
              </div>
            )}

            {metrics.safetyScore && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Safety Score</p>
                  <p className="text-lg font-extrabold text-slate-800 mt-0.5">{metrics.safetyScore}/100</p>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compliance Section */}
      {compliance && !compliance.passed && (
        <ComplianceBanner
          issues={compliance.issues}
          onResolve={(actionType) => onFixCompliance(id, actionType)}
          onProceed={() => {
            card.compliance.passed = true;
            onApprove(id);
          }}
        />
      )}

      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {compliance && compliance.passed && status !== 'approved' && status !== 'running' && (
            <button
              onClick={() => onApprove(id)}
              className="flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Approve & Post
            </button>
          )}

          {status !== 'running' && (
            <button
              onClick={() => onRunAds(id)}
              className="flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/10 cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              Run Ads Campaign
            </button>
          )}

          <button
            onClick={() => onEdit(id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200/60 cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Design
          </button>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-slate-500 hover:text-slate-700 transition-colors font-medium"
        >
          {showDetails ? 'Hide details' : 'Show advanced metrics'}
        </button>
      </div>

      {/* Expanded Metrics Details */}
      {showDetails && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2.5 animate-fadeIn">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-slate-400 block font-medium">Brand Consistency</span>
              <span className="font-bold text-slate-700">96% Matches guidelines</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Tone of Voice</span>
              <span className="font-bold text-slate-700">Assertive & Creative</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Target Audience Fit</span>
              <span className="font-bold text-slate-700">92% Relevance</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Est. Reach Increase</span>
              <span className="font-bold text-slate-700">+24K - 50K Views</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
