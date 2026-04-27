import { motion } from 'framer-motion';

export default function VisionSection() {
  return (
    <section className="bg-guardian-bg py-24 md:py-32 text-center border-t border-guardian-border">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex rounded-full border border-guardian-blue/20 bg-guardian-blue/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-guardian-blue"
        >
          Our Vision
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-4 text-4xl font-bold tracking-tight text-guardian-heading md:text-5xl lg:text-6xl leading-[1.1] max-w-3xl mx-auto"
        >
          Establishing the Definitive Intelligence Layer for Global Digital Ecosystems.
        </motion.h2>
      </div>
    </section>
  );
}
