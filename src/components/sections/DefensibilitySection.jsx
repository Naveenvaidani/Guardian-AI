import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { Layers, Network, RefreshCw } from 'lucide-react';

export default function DefensibilitySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <SectionHeader
        eyebrow="Built for Scale & Defensibility"
        title="An Expanding Intelligence Moat"
        subtitle="Guardian AI gets smarter with every deployment. Our cross-domain data network effects ensure compounding value that cannot be replicated by point solutions."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          {
            icon: Network,
            title: 'Global Data Network Effects',
            desc: 'Every threat detected in one domain immediately immunizes the entire global network. A zero-day attack on a single enterprise platform updates the core model for all clients instantly.',
          },
          {
            icon: RefreshCw,
            title: 'Continuous Model Improvement Loops',
            desc: 'Analyst interventions and human-in-the-loop decisions are automatically fed back into the training pipeline. The system learns your specific operational threshold over time.',
          },
          {
            icon: Layers,
            title: 'Cross-Domain Intelligence',
            desc: 'Unlike isolated moderation or security tools, we fuse signals across ads, organic content, external telemetry, and user behavior to detect highly coordinated, multi-vector campaigns.',
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: 'easeInOut' }}
              className="glass-panel flex flex-col rounded-3xl p-8"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-slate-800/50 text-cyan-400">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.desc}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
