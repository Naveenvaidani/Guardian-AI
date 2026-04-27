import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { flowSteps } from '../../data/content';

export default function FlowSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-32 md:py-40">
      <SectionHeader
        eyebrow="Processing Pipeline"
        title="Signal to Action in Milliseconds"
        subtitle="A deterministic AI-to-human workflow ensures speed, control, and explainability across critical decisions."
      />

      <div className="relative mt-16">
        {/* Vertical Pipeline Line */}
        <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-slate-800 md:left-1/2 md:-translate-x-1/2" />
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent md:left-1/2 md:-translate-x-1/2" 
        />

        <div className="flex flex-col gap-12">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className={`relative flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
              >
                {/* Node */}
                <div className="absolute left-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] md:left-1/2" />
                
                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'} flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="group relative w-full max-w-sm rounded-2xl glass-panel p-6 transition-all hover:-translate-y-1 hover:shadow-glow">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-cyan-300 ring-1 ring-white/10">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{step.label}</h3>
                    <p className="mt-2 text-sm text-slate-400">{step.detail}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
