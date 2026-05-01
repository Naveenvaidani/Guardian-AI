import { motion } from 'framer-motion';
import SectionHeader from '../../../shared/ui/SectionHeader';

export default function AdvantageSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <SectionHeader
        eyebrow="Competitive Advantage"
        title="Why Guardian AI Is Structurally Different"
        subtitle="Not another point solution. A full-stack operational intelligence platform built for high-consequence environments."
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="grid gap-5 rounded-3xl border border-blue-500/25 bg-slate-900/55 p-8 md:grid-cols-3"
      >
        {[
          ['Multi-Domain Integration', 'Moderation, threat, ads, enforcement, and analytics are coordinated in one risk model.'],
          ['AI + Human Hybrid Intelligence', 'Automation handles velocity; experts govern edge cases and policy-sensitive interventions.'],
          ['Real-Time Decisioning', 'From signal to action in seconds with confidence scoring and deterministic response paths.'],
        ].map((item) => (
          <article key={item[0]} className="rounded-3xl glass-panel p-8">
            <h3 className="text-lg font-semibold text-white">{item[0]}</h3>
            <p className="mt-3 text-sm text-slate-300">{item[1]}</p>
          </article>
        ))}
      </motion.div>
    </section>
  );
}
