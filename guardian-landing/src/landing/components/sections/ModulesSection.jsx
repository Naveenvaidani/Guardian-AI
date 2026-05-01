import { motion } from 'framer-motion';
import SectionHeader from '../../../shared/ui/SectionHeader';
import { ShieldCheck, Scale, BarChart3, Zap, Eye, Brain } from 'lucide-react';

const modules = [
  {
    icon: ShieldCheck,
    title: "Content Moderation",
    desc: "Ensures all user-generated content stays safe, appropriate, and platform-compliant."
  },
  {
    icon: Scale,
    title: "Policy Enforcement",
    desc: "Automatically applies and maintains rules to keep the community aligned with guidelines."
  },
  {
    icon: BarChart3,
    title: "Research & Analytics",
    desc: "Provides insights into trends, risks, and user behavior for smarter decision-making."
  },
  {
    icon: Zap,
    title: "Threat Response",
    desc: "Detects and responds to threats in real time to prevent crises and platform abuse."
  },
  {
    icon: Eye,
    title: "Ad & Brand Safety",
    desc: "Protects brand reputation by ensuring ads and content meet safety standards."
  },
  {
    icon: Brain,
    title: "AI Marketing Intelligence",
    desc: "Drives growth with data-driven insights, automation, and campaign optimization."
  }
];

export default function ModulesSection() {
  return (
    <section className="bg-white py-24 md:py-32" id="platform">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-4 inline-flex rounded-full border border-guardian-blue/20 bg-guardian-blue/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-guardian-blue"
          >
            Integrated Protection Suite
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-guardian-navy mb-6 tracking-tight"
          >
            Orchestrating Platform Integrity: The Comprehensive Protection Suite
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-guardian-secondary max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Six powerful modules working together to keep the platform safe, compliant, and scalable.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, idx) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-10 rounded-[2.5rem] bg-white border border-guardian-border hover:border-guardian-blue/30 hover:shadow-2xl hover:shadow-guardian-blue/5 transition-all duration-500"
            >
              <div className="p-4 bg-guardian-section rounded-2xl w-fit text-guardian-blue mb-8 group-hover:bg-guardian-blue group-hover:text-white transition-all duration-300">
                <module.icon size={30} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-guardian-navy mb-4">{module.title}</h3>
              <p className="text-guardian-secondary text-sm leading-relaxed">
                {module.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
