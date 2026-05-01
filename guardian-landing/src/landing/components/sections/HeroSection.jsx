import { motion } from 'framer-motion';
import { Shield, ArrowRight, PlayCircle, Sparkles, Activity, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onStart }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 bg-guardian-bg">
      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-guardian-blue/5 blur-[150px]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-guardian-blue/20 bg-guardian-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-guardian-blue">
            <Sparkles size={14} />
            Next-Gen AI Safety Platform
          </motion.p>
          
          <motion.h1 variants={itemVariants} className="mt-8 text-5xl font-bold tracking-tight text-guardian-heading md:text-7xl lg:text-[5.5rem] leading-[1.05]">
            The Intelligent Shield for
            <span className="block text-guardian-blue">
              Modern Advertising
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mx-auto mt-8 max-w-2xl text-lg text-guardian-secondary md:text-xl leading-relaxed">
            Unified AI platform for brand safety, policy compliance, and real-time decision intelligence. Protect your brand reputation with precision.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button 
              onClick={onStart}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-guardian-navy px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#0F2A4D] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Analyzing
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-guardian-border bg-white px-8 py-4 text-sm font-bold text-guardian-body transition-all hover:bg-guardian-section hover:border-guardian-secondary">
              <PlayCircle size={18} className="text-guardian-blue" />
              Watch Demo
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
