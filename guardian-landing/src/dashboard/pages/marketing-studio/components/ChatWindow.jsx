import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Sparkles, User, ArrowDown } from 'lucide-react';
import ActionCard from './ActionCard';

export default function ChatWindow({
  messages,
  onSendMessage,
  onCardApprove,
  onCardRunAds,
  onCardEdit,
  onCardFixCompliance,
  isTyping
}) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-[600px] rounded-2xl border border-slate-200/80 bg-white/70 overflow-hidden backdrop-blur-xl shadow-xl">
      {/* Chat Messages Log */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth bg-slate-50/50"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="p-3.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">AI Marketing Copilot</h3>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed font-light">
              Ask me to generate visual creatives, launch new ad campaigns, boost post reach, or analyze compliance!
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3.5 max-w-[85%] ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div className={`p-2 rounded-xl border text-xs flex-shrink-0 ${
                isUser 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-600'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Message Bubble & Embedded Card */}
              <div className="space-y-2">
                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed border ${
                  isUser 
                    ? 'bg-indigo-600 border-indigo-500/20 text-white rounded-tr-none' 
                    : 'bg-white border-slate-200/85 text-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Inline Action Card if present */}
                {msg.card && (
                  <div className="w-full min-w-[320px] max-w-[550px] animate-fadeIn">
                    <ActionCard
                      card={msg.card}
                      onApprove={onCardApprove}
                      onRunAds={onCardRunAds}
                      onEdit={onCardEdit}
                      onFixCompliance={onCardFixCompliance}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3.5 mr-auto max-w-[85%]">
            <div className="p-2 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form 
        onSubmit={handleSubmit}
        className="p-4 border-t border-slate-200/80 bg-white"
      >
        <div className="flex items-center gap-3 glass-input rounded-xl px-4 py-2 bg-slate-50 border border-slate-200">
          <button 
            type="button" 
            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
            title="Upload Assets"
          >
            <Upload className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Tell Copilot to create ads, generate visuals, or launch campaign..."
            className="flex-1 bg-transparent text-sm text-slate-800 focus:outline-none placeholder-slate-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 fill-current" />
          </button>
        </div>
      </form>
    </div>
  );
}
