import React from 'react';
import { UploadCloud, Image as ImageIcon, Video, Mic } from 'lucide-react';

export default function InputPanel() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 backdrop-blur-xl p-8 min-h-[300px] flex flex-col gap-4 shadow-sm relative overflow-hidden">
      {/* Subtle Gradient Glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-fraud-cyan/10 rounded-full blur-[100px] pointer-events-none" />
      
      <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
        <UploadCloud className="w-6 h-6 text-fraud-cyan" />
        Input Section
      </h2>
      
      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 cursor-pointer hover:border-fraud-cyan transition-colors mb-6 flex-grow relative z-10">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
          <UploadCloud className="w-8 h-8 text-fraud-cyan" />
        </div>
        <p className="text-slate-900 font-medium mb-2">Drop file or click to upload</p>
        <p className="text-sm text-slate-500 mb-4">Supported formats: JPG, PNG, MP4, WAV</p>
        <div className="flex gap-4 text-fraud-cyan">
          <ImageIcon className="w-5 h-5" />
          <Video className="w-5 h-5" />
          <Mic className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 relative z-10">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Preview</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
            <Video className="w-6 h-6 text-fraud-cyan" />
          </div>
          <div className="overflow-hidden">
            <p className="text-slate-900 font-medium text-sm truncate w-full">interview_recording_v2.mp4</p>
            <p className="text-xs text-slate-500">12.4 MB • Video</p>
          </div>
        </div>
      </div>
    </div>
  );
}
