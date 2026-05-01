import { motion } from 'framer-motion';
import SectionHeader from '../../../shared/ui/SectionHeader';
import { stats } from '../../../data/content';

export default function MetricsSection() {
  return (
    <section className="bg-guardian-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Measured Impact"
          title="Operational Outcomes That Matter"
          subtitle="Performance gains derived from real-world deployments and modeled enterprise implementations."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-guardian-border bg-white p-8 text-center shadow-sm"
            >
              <p className="text-4xl font-bold text-guardian-navy md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-4 text-sm font-medium text-guardian-secondary uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
