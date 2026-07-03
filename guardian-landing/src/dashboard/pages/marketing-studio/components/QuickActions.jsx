import React from 'react';
import { Image, Video, Megaphone, Zap, ShieldAlert } from 'lucide-react';

export default function QuickActions({ onActionClick, disabled }) {
  const actions = [
    {
      id: 'generate_image',
      label: 'Generate Image',
      icon: Image,
      description: 'Create premium ad banners',
      color: 'text-emerald-600 border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 hover:border-emerald-300',
    },
    {
      id: 'create_video',
      label: 'Create Video',
      icon: Video,
      description: 'Render high-CTR short clips',
      color: 'text-cyan-600 border-cyan-200 bg-cyan-50/60 hover:bg-cyan-100/70 hover:border-cyan-300',
    },
    {
      id: 'run_campaign',
      label: 'Run Ads Campaign',
      icon: Megaphone,
      description: 'Configure Meta/Google budget',
      color: 'text-orange-600 border-orange-200 bg-orange-50/60 hover:bg-orange-100/70 hover:border-orange-300',
    },
    {
      id: 'boost_post',
      label: 'Boost Post',
      icon: Zap,
      description: 'Increase social engagement',
      color: 'text-purple-600 border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 hover:border-purple-300',
    },
    {
      id: 'safety_check',
      label: 'Policy Audit',
      icon: ShieldAlert,
      description: 'Check content for policy risk',
      color: 'text-rose-600 border-rose-200 bg-rose-50/60 hover:bg-rose-100/70 hover:border-rose-300',
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.id}
            onClick={() => onActionClick(act.id)}
            disabled={disabled}
            className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${act.color}`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Icon className="w-5 h-5" />
              <span className="font-bold text-xs tracking-wider uppercase">{act.label}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-light leading-relaxed">
              {act.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
