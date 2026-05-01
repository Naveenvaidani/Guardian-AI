import { motion } from 'framer-motion';
import SectionHeader from '../../../shared/ui/SectionHeader';

const pains = [
  { title: 'Harmful Content Scale', body: 'Billions of daily interactions exceed manual moderation capacity, creating delayed and inconsistent response windows.' },
  { title: 'Threat Visibility Gaps', body: 'Most systems detect incidents after impact, not during escalation, leaving organizations vulnerable to avoidable crises.' },
  { title: 'Brand Safety Fragility', body: 'Ad and content operations run on fragmented tooling, exposing brands to adjacency risk and reputational damage.' },
  { title: 'Slow Enforcement Loops', body: 'Decision latency across legal, policy, and operational teams reduces deterrence and increases compliance exposure.' },
];

export default function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <SectionHeader
        eyebrow="Global Problem"
        title="The Risk Surface Is Growing Faster Than Legacy Systems"
        subtitle="Digital operations now demand real-time intelligence, coordinated decisioning, and policy-grade accountability at machine speed."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {pains.map((pain, idx) => (
          <motion.article
            key={pain.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: idx * 0.07, duration: 0.55 }}
            className="glass-panel rounded-3xl p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-cyan-300">Critical signal</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{pain.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{pain.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
