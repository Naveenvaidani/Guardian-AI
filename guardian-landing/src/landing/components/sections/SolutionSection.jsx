import { motion } from 'framer-motion';
import SectionHeader from '../../../shared/ui/SectionHeader';
import { Zap, Brain, Shield, Globe } from 'lucide-react';

export default function SolutionSection() {
  const pillars = [
    {
      icon: Zap,
      title: 'Real-Time Protection',
      desc: 'Instant detection and response across content, users, and emerging threats as they happen.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      desc: 'Advanced adaptive models that continuously learn and evolve for industry-leading accuracy.',
    },
    {
      icon: Shield,
      title: 'Scalable Security',
      desc: 'Engineered to protect platforms of every size — from startups to global enterprises.',
    },
    {
      icon: Globe,
      title: 'Multi-Platform Support',
      desc: 'Seamlessly integrates across Meta, Google, TikTok, and more for unified brand protection.',
    },
  ];

  return (
    <section className="bg-guardian-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why Guardian AI"
          title="Secure Modern Digital Platforms with Intelligence"
          subtitle="Built to provide absolute precision in brand safety and platform moderation through a unified intelligence layer."
        />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:gap-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-guardian-navy text-white">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-guardian-heading">{pillar.title}</h3>
                  <p className="mt-2 text-guardian-secondary leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
