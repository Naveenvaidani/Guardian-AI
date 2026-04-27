import { motion } from 'framer-motion';

export default function TrustedBySection() {
  return (
    <section className="border-y border-white/5 bg-slate-950/50 py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Designed for governments, enterprises, and global platforms
        </p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-50 grayscale transition-all hover:grayscale-0 md:gap-16">
          {/* Placeholder Logos to build trust layout */}
          {['Palantir', 'Scale', 'OpenAI', 'Stripe', 'Anduril'].map((logo, idx) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="text-xl font-bold tracking-tight text-slate-300 md:text-2xl"
            >
              {logo}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-[1px] w-8 bg-slate-800" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            Backed by Research & Engineering Rigor
          </p>
          <div className="h-[1px] w-8 bg-slate-800" />
        </div>
      </div>
    </section>
  );
}
