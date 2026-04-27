import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="bg-guardian-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-guardian-navy px-8 py-20 text-center shadow-xl"
        >
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-guardian-blue/20 blur-[110px]" />
          <p className="relative text-xs font-bold uppercase tracking-widest text-guardian-blue">Ready to Secure Your Brand?</p>
          <h2 className="relative mx-auto mt-6 max-w-3xl text-3xl font-bold text-white md:text-5xl leading-tight">
            Build the safety infrastructure before the next crisis builds itself.
          </h2>
          <p className="relative mx-auto mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
            Request a live platform walkthrough to evaluate deployment readiness, strategic fit, and integration architecture.
          </p>
          <div className="relative mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group inline-flex items-center gap-2 rounded-xl bg-guardian-blue px-8 py-4 text-sm font-bold text-white transition hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]">
              Request Executive Demo
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/40">
              Discuss Strategic Partnership
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
