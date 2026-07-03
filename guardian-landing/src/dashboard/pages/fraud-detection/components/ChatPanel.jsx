import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Link as LinkIcon, Send, Sparkles, User } from 'lucide-react';

const Message = ({ text, sender, timestamp }) => {
  const isAI = sender === 'ai';
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} gap-4 mb-6`}
    >
      {isAI && (
        <div className="w-8 h-8 rounded-lg bg-guardian-blue/20 border border-guardian-blue/30 flex items-center justify-center shrink-0">
          <Sparkles size={14} className="text-guardian-blue" />
        </div>
      )}
      
      <div className={`max-w-[80%] space-y-2 ${isAI ? 'items-start' : 'items-end flex flex-col'}`}>
        <div className={`px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
          isAI 
            ? 'bg-guardian-section border border-guardian-border text-guardian-body rounded-tl-none' 
            : 'bg-guardian-blue text-white rounded-tr-none'
        }`}>
          {text}
        </div>
        <p className="text-[10px] font-bold text-guardian-secondary uppercase tracking-widest">{timestamp}</p>
      </div>

      {!isAI && (
        <div className="w-8 h-8 rounded-lg bg-guardian-card border border-guardian-border flex items-center justify-center shrink-0">
          <User size={14} className="text-guardian-secondary" />
        </div>
      )}
    </motion.div>
  );
};

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Guardian AI Security Interface. Please paste a message, link, or upload a screenshot for real-time fraud analysis.", sender: 'ai', timestamp: '10:00 AM' },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
    
    // Mock AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Analyzing input vectors... Security scan in progress.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <Message key={msg.id} {...msg} />
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <div className="bg-white border-2 border-guardian-blue/30 rounded-[2rem] p-2 flex items-center gap-2 focus-within:border-guardian-blue focus-within:ring-4 focus-within:ring-guardian-blue/10 transition-all shadow-lg">
          <div className="flex items-center gap-1 pl-2">
            <button className="p-3 text-slate-400 hover:text-guardian-blue hover:bg-slate-100 rounded-full transition-all" title="Upload Image">
              <Image size={20} className="text-slate-500" />
            </button>
            <button className="p-3 text-slate-400 hover:text-guardian-blue hover:bg-slate-100 rounded-full transition-all" title="Paste Link">
              <LinkIcon size={20} className="text-slate-500" />
            </button>
          </div>
          
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Paste message, link, or upload screenshot to analyze fraud"
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-900 placeholder:text-slate-400 py-4 px-2"
          />

          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-4 bg-guardian-blue text-white rounded-full hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="mt-4 flex justify-center gap-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-guardian-blue" /> Multi-Model Analysis
          </p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-guardian-blue" /> Real-time Protection
          </p>
        </div>
      </div>
    </div>
  );
}
