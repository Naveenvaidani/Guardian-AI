import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { useCases } from '../../data/content';

export default function UseCasesSection() {
  return (
    <section className="bg-guardian-section py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Industry Solutions"
          title="Engineered for High-Stakes Operations"
          subtitle="Guardian AI is deployed where trust, safety, and response speed are non-negotiable."
        />
        
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <motion.article
                key={`${useCase.title}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col rounded-2xl bg-guardian-bg border border-guardian-border p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-guardian-navy text-white">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-guardian-heading">{useCase.title}</h3>
                <p className="mt-4 text-sm text-guardian-secondary leading-relaxed flex-grow">{useCase.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
