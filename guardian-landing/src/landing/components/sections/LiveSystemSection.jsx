import { motion } from 'framer-motion';
import SectionHeader from '../../../shared/ui/SectionHeader';
import { ShieldAlert, Activity, ShieldCheck, DatabaseZap } from 'lucide-react';

export default function LiveSystemSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <SectionHeader
        eyebrow="Inside Guardian AI"
        title="Live System Simulation"
        subtitle="Observe how the platform ingests, scores, and acts on global threat vectors in real time without human latency."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-12">
        {/* Main Dashboard Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="glass-panel col-span-12 overflow-hidden rounded-3xl md:col-span-8"
        >
          <div className="flex items-center justify-between border-b border-white/5 bg-slate-900/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <Activity size={18} className="text-cyan-400" />
              <span className="font-mono text-sm font-semibold text-white">Global Threat Matrix</span>
            </div>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-slate-600" />
              <div className="h-2 w-2 rounded-full bg-slate-600" />
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4 font-mono text-xs text-slate-300">
              {[
                { time: '14:02:11', source: 'API-EU-WEST', event: 'Ingesting 14,021 events', status: 'NOMINAL', color: 'text-emerald-400' },
                { time: '14:02:11', source: 'ML-NODE-4', event: 'Behavioral cluster #89A matched to zero-day signature', status: 'ALERT', color: 'text-amber-400' },
                { time: '14:02:12', source: 'RISK-CORE', event: 'Confidence score: 99.4%. Escalating to autonomous block.', status: 'CRITICAL', color: 'text-red-400' },
                { time: '14:02:12', source: 'ENFORCER', event: 'Entities blocked across 4 endpoints.', status: 'RESOLVED', color: 'text-emerald-400' },
              ].map((log, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.3, duration: 0.5 }}
                  className="flex flex-col justify-between gap-2 border-b border-white/5 pb-3 sm:flex-row sm:items-center"
                >
                  <div className="flex gap-4">
                    <span className="text-slate-500">[{log.time}]</span>
                    <span className="text-cyan-400 w-24">{log.source}</span>
                    <span>{log.event}</span>
                  </div>
                  <span className={`${log.color} font-bold`}>{log.status}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Side Metrics Panel */}
        <div className="col-span-12 flex flex-col gap-6 md:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            className="glass-panel flex-1 rounded-3xl p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <DatabaseZap size={18} className="text-blue-400" />
              <h3 className="font-mono text-sm font-semibold text-white">System Load</h3>
            </div>
            <div className="text-4xl font-light text-white">
              8.4<span className="text-xl text-slate-400">Tbps</span>
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '70%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-blue-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
            className="glass-panel flex-1 rounded-3xl p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <ShieldAlert size={18} className="text-red-400" />
              <h3 className="font-mono text-sm font-semibold text-white">Active Interventions</h3>
            </div>
            <div className="text-4xl font-light text-white">
              1,492
            </div>
            <p className="mt-2 text-xs text-slate-400">+12% vs last hour</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
