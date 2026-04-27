import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mx-auto mb-16 max-w-3xl text-center"
    >
      <p className="mb-4 inline-flex rounded-full border border-guardian-blue/20 bg-guardian-blue/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-guardian-blue">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold leading-tight text-guardian-heading md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-6 text-base text-guardian-secondary md:text-lg leading-relaxed">{subtitle}</p> : null}
    </motion.div>
  );
}
