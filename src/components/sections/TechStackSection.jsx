import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const pillars = [
  {
    title: 'Machine Learning Pipelines',
    text: 'Domain-specific detectors, adaptive retraining loops, and confidence calibration for high-stakes decisions.',
  },
  {
    title: 'Real-Time Processing',
    text: 'Low-latency event ingestion with stream-first architecture for immediate situational awareness.',
  },
  {
    title: 'Explainability Systems',
    text: 'Policy-linked rationale, score breakdowns, and traceable decision artifacts for audit-ready governance.',
  },
  {
    title: 'Scalable Intelligence Backend',
    text: 'Service-oriented architecture with horizontal scaling, resilient queues, and observability-first operations.',
  },
];

export default function TechStackSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Technology"
        title="Built for Enterprise-Grade AI Operations"
        subtitle="Designed for organizations that need explainable, scalable, and resilient intelligence infrastructure."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {pillars.map((pillar, idx) => (
          <motion.article
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            className="rounded-2xl border border-slate-700 bg-slate-900/55 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{pillar.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
