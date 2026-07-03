import React, { useState } from 'react';
import { Image as ImageIcon, Video, FileText, Sparkles, Download, Share2, RefreshCw, Eye } from 'lucide-react';

export default function CreativeStudio() {
  const [activeSubTab, setActiveSubTab] = useState('image');

  // Image states
  const [imagePrompt, setImagePrompt] = useState('Premium cybersecurity dashboard visual showing global server telemetry');
  const [imageStyle, setImageStyle] = useState('Modern');
  const [imageRatio, setImageRatio] = useState('16:9');
  const [imageOutput, setImageOutput] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Video states
  const [videoPrompt, setVideoPrompt] = useState('Cinematic zoom-in on an enterprise security command center');
  const [videoDuration, setVideoDuration] = useState('10 sec');
  const [videoStyle, setVideoStyle] = useState('Cinematic');
  const [voiceover, setVoiceover] = useState('Female');
  const [bgMusic, setBgMusic] = useState(true);
  const [videoOutput, setVideoOutput] = useState(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  // Caption states
  const [captionPrompt, setCaptionPrompt] = useState('An announcement of our new AI-powered security threat intelligence layer.');
  const [captionTone, setCaptionTone] = useState('Professional');
  const [captionPlatform, setCaptionPlatform] = useState('LinkedIn');
  const [captionOutput, setCaptionOutput] = useState(null);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

  // Trigger generators
  const handleGenerateImage = () => {
    setIsGeneratingImage(true);
    setTimeout(() => {
      setIsGeneratingImage(false);
      setImageOutput({
        url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
        title: 'AI Generated Image',
        style: imageStyle,
        ratio: imageRatio,
        metrics: {
          quality: 94,
          ctr: 4.8,
          engagement: 'High'
        }
      });
    }, 1500);
  };

  const handleGenerateVideo = () => {
    setIsGeneratingVideo(true);
    setTimeout(() => {
      setIsGeneratingVideo(false);
      setVideoOutput({
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        title: 'AI Generated Video Spot',
        style: videoStyle,
        duration: videoDuration,
        voice: voiceover,
        metrics: {
          quality: 92,
          ctr: 5.6,
          engagement: 'Excellent'
        }
      });
    }, 2000);
  };

  const handleGenerateCaption = () => {
    setIsGeneratingCaption(true);
    setTimeout(() => {
      setIsGeneratingCaption(false);
      setCaptionOutput({
        variations: [
          `🔒 Elevate your defenses. We are excited to announce our new AI-powered Security Threat Intelligence Layer. Real-time prevention, automated compliance audits, and total command control.`,
          `Cyber security changes forever today. Meet Guardian AI's newest threat monitoring agent. 🚀 Integrated with Meta & Google ads, audit campaigns automatically.`,
          `Is your corporate brand protected? Guard campaigns, creatives, and budget with Guardian AI. Zero policy risks, maximum ROI.`
        ],
        hashtags: '#CyberSecurity #AIMarketing #GuardianAI #EnterpriseProtection',
        cta: 'Book a demo today at guardian-ai.com/demo'
      });
    }, 1000);
  };
  return (
    <div className="glass-panel p-6 rounded-2xl max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-guardian-border">
        <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/10">
          <Sparkles className="w-5 h-5 text-blue-200" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-guardian-heading">Content Studio</h2>
          <p className="text-xs text-guardian-secondary font-light">Create stunning marketing content with AI assistant</p>
        </div>
      </div>

      {/* Sub-tabs switchers */}
      <div className="grid grid-cols-3 gap-2 bg-guardian-section p-1.5 rounded-xl border border-guardian-border mb-6">
        <button
          onClick={() => setActiveSubTab('image')}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
            activeSubTab === 'image' 
              ? 'bg-white text-blue-650 border border-guardian-border shadow-sm' 
              : 'text-guardian-secondary hover:text-guardian-heading'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Image Generation
        </button>
        <button
          onClick={() => setActiveSubTab('video')}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
            activeSubTab === 'video' 
              ? 'bg-white text-blue-650 border border-guardian-border shadow-sm' 
              : 'text-guardian-secondary hover:text-guardian-heading'
          }`}
        >
          <Video className="w-4 h-4" />
          Video Generation
        </button>
        <button
          onClick={() => setActiveSubTab('caption')}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
            activeSubTab === 'caption' 
              ? 'bg-white text-blue-650 border border-guardian-border shadow-sm' 
              : 'text-guardian-secondary hover:text-guardian-heading'
          }`}
        >
          <FileText className="w-4 h-4" />
          Caption & Copy
        </button>
      </div>

      {/* Tab Contents */}
      {activeSubTab === 'image' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-4.5 text-sm">
            <div>
              <label className="block text-xs font-bold text-guardian-secondary mb-1.5 uppercase">Describe your image</label>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2.5 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all h-24 resize-none"
                placeholder="Describe the image you want to generate..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-guardian-secondary mb-2 uppercase">Style Selection</label>
              <div className="flex flex-wrap gap-1.5">
                {['Modern', 'Minimal', 'Bold', 'Playful', 'Corporate', 'Vintage'].map(st => (
                  <button
                    key={st}
                    onClick={() => setImageStyle(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all uppercase ${
                      imageStyle === st 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                        : 'bg-white text-guardian-secondary border-guardian-border hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-guardian-secondary mb-2 uppercase">Aspect Ratio</label>
              <div className="flex flex-wrap gap-1.5">
                {['1:1', '4:5', '9:16', '16:9', '3:4'].map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setImageRatio(ratio)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all uppercase ${
                      imageRatio === ratio 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                        : 'bg-white text-guardian-secondary border-guardian-border hover:bg-slate-50'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateImage}
              disabled={isGeneratingImage || !imagePrompt}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              {isGeneratingImage ? 'Synthesizing layout...' : 'Generate Image'}
            </button>
          </div>

          {/* Output Preview */}
          <div className="flex flex-col items-center justify-center p-4.5 rounded-xl border border-guardian-border bg-guardian-section/30 min-h-[300px]">
            {imageOutput ? (
              <div className="w-full space-y-4">
                <div className="relative rounded-lg overflow-hidden border border-guardian-border aspect-[16/9] bg-slate-950">
                  <img src={imageOutput.url} alt="Output visual" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-slate-900/90 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                    {imageOutput.style} • {imageOutput.ratio}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white border border-guardian-border p-2.5 rounded-xl">
                    <span className="text-[9px] text-guardian-secondary block font-bold uppercase">Quality Score</span>
                    <span className="font-extrabold text-guardian-heading">{imageOutput.metrics.quality}%</span>
                  </div>
                  <div className="bg-white border border-guardian-border p-2.5 rounded-xl">
                    <span className="text-[9px] text-guardian-secondary block font-bold uppercase">Est. CTR</span>
                    <span className="font-extrabold text-green-600">{imageOutput.metrics.ctr}%</span>
                  </div>
                  <div className="bg-white border border-guardian-border p-2.5 rounded-xl">
                    <span className="text-[9px] text-guardian-secondary block font-bold uppercase">Engagement</span>
                    <span className="font-extrabold text-guardian-heading">{imageOutput.metrics.engagement}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase rounded-lg border border-guardian-border transition-colors">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase rounded-lg border border-guardian-border transition-colors">
                    <Share2 className="w-4 h-4" /> Send to Campaign
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-guardian-secondary text-center font-light leading-relaxed">
                Provide prompt details and click Generate to render the custom visual banner mockup.
              </p>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'video' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-4.5 text-sm">
            <div>
              <label className="block text-xs font-bold text-guardian-secondary mb-1.5 uppercase">Video Prompt</label>
              <textarea
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2.5 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all h-20 resize-none"
                placeholder="Describe your video..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-guardian-secondary mb-1.5 uppercase">Duration</label>
                <select
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(e.target.value)}
                  className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                >
                  <option>5 sec</option>
                  <option>10 sec</option>
                  <option>30 sec</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-guardian-secondary mb-1.5 uppercase">Style</label>
                <select
                  value={videoStyle}
                  onChange={(e) => setVideoStyle(e.target.value)}
                  className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/55 focus:ring-4 focus:ring-blue-505/5 transition-all"
                >
                  <option>Ad</option>
                  <option>Cinematic</option>
                  <option>Social Media</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-guardian-secondary mb-1.5 uppercase">Voiceover</label>
                <div className="flex gap-2">
                  {['Male', 'Female', 'None'].map(voice => (
                    <button
                      key={voice}
                      onClick={() => setVoiceover(voice)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all uppercase ${
                        voiceover === voice 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                          : 'bg-white text-guardian-secondary border-guardian-border hover:bg-slate-50'
                      }`}
                    >
                      {voice}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-guardian-secondary mb-1.5 uppercase">Background Music</label>
                <button
                  onClick={() => setBgMusic(!bgMusic)}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold border transition-all uppercase ${
                    bgMusic 
                      ? 'bg-green-50 text-green-600 border-green-200' 
                      : 'bg-slate-50 text-guardian-secondary border-guardian-border'
                  }`}
                >
                  {bgMusic ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerateVideo}
              disabled={isGeneratingVideo || !videoPrompt}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              {isGeneratingVideo ? 'Compiling video track...' : 'Generate Video'}
            </button>
          </div>

          {/* Output Preview */}
          <div className="flex flex-col items-center justify-center p-4.5 rounded-xl border border-guardian-border bg-guardian-section/30 min-h-[300px]">
            {videoOutput ? (
              <div className="w-full space-y-4">
                <div className="relative rounded-lg overflow-hidden border border-guardian-border aspect-[16/9] bg-slate-950">
                  <img src={videoOutput.url} alt="Video visual" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="p-3.5 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/20">
                      <Video className="w-5 h-5 fill-white" />
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-slate-900/90 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                    {videoOutput.style} • {videoOutput.duration} • Audio: {videoOutput.voice}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white border border-guardian-border p-2.5 rounded-xl">
                    <span className="text-[9px] text-guardian-secondary block font-bold uppercase">Quality Score</span>
                    <span className="font-extrabold text-guardian-heading">{videoOutput.metrics.quality}%</span>
                  </div>
                  <div className="bg-white border border-guardian-border p-2.5 rounded-xl">
                    <span className="text-[9px] text-guardian-secondary block font-bold uppercase">Est. CTR</span>
                    <span className="font-extrabold text-green-600">{videoOutput.metrics.ctr}%</span>
                  </div>
                  <div className="bg-white border border-guardian-border p-2.5 rounded-xl">
                    <span className="text-[9px] text-guardian-secondary block font-bold uppercase">Engagement</span>
                    <span className="font-extrabold text-guardian-heading">{videoOutput.metrics.engagement}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase rounded-lg border border-guardian-border transition-colors">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase rounded-lg border border-guardian-border transition-colors">
                    <Share2 className="w-4 h-4" /> Send to Campaign
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-guardian-secondary text-center font-light leading-relaxed">
                Input video description prompts to build social-formatted kinetic advertising content.
              </p>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'caption' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-4.5 text-sm">
            <div>
              <label className="block text-xs font-bold text-guardian-secondary mb-1.5 uppercase">Describe your caption / copy</label>
              <textarea
                value={captionPrompt}
                onChange={(e) => setCaptionPrompt(e.target.value)}
                className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2.5 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all h-24 resize-none"
                placeholder="Engaging caption details..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-guardian-secondary mb-1.5 uppercase">Tone of Voice</label>
                <select
                  value={captionTone}
                  onChange={(e) => setCaptionTone(e.target.value)}
                  className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-550/5 transition-all"
                >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Emotional</option>
                  <option>Sales-driven</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-guardian-secondary mb-1.5 uppercase">Target Network</label>
                <select
                  value={captionPlatform}
                  onChange={(e) => setCaptionPlatform(e.target.value)}
                  className="w-full bg-guardian-bg border border-guardian-border rounded-xl px-3.5 py-2 text-xs text-guardian-body focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                >
                  <option>LinkedIn</option>
                  <option>Instagram</option>
                  <option>Twitter</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateCaption}
              disabled={isGeneratingCaption || !captionPrompt}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              {isGeneratingCaption ? 'Drafting variations...' : 'Generate Captions'}
            </button>
          </div>

          {/* Output Preview */}
          <div className="flex flex-col items-center justify-center p-4.5 rounded-xl border border-guardian-border bg-guardian-section/30 min-h-[300px]">
            {captionOutput ? (
              <div className="w-full space-y-4 text-xs">
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {captionOutput.variations.map((v, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-guardian-border shadow-sm relative group">
                      <p className="text-guardian-body leading-relaxed font-light">{v}</p>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(v);
                          alert("Caption copied to clipboard!");
                        }}
                        className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-guardian-border text-guardian-secondary hover:text-guardian-heading opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy text"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-1.5">
                  <div className="font-bold text-blue-800 text-[10px] uppercase">AI Suggestions & Hashtags</div>
                  <p className="text-blue-900 font-semibold text-[11px] leading-relaxed">{captionOutput.hashtags}</p>
                  <p className="text-guardian-secondary text-[10px] font-medium mt-1">CTA: {captionOutput.cta}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-guardian-secondary text-center font-light leading-relaxed">
                Input copy context and select brand tones to write optimized marketing caption tags.
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
