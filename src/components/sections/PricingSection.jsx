import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, Globe, Users, Database, Lock, ArrowRight, Sparkles } from 'lucide-react';

const pricingData = {
  individual: [
    {
      name: 'Starter',
      price: '₹999',
      description: 'Essential moderation for creators.',
      features: ['1 Admin Seat', '3 Accounts Connected', '10,000 Scans/mo', 'Basic Fraud Alerts', 'Email Support'],
      icon: <Zap className="text-blue-500" size={24} />,
      highlight: false
    },
    {
      name: 'Pro',
      price: '₹2,999',
      description: 'Advanced safety for growing brands.',
      features: ['3 Seats', '10 Accounts Connected', '50,000 Scans/mo', 'Deepfake Image Scanning', 'Priority Support'],
      icon: <Shield className="text-guardian-blue" size={24} />,
      highlight: true
    },
    {
      name: 'Elite',
      price: '₹5,999',
      description: 'Full protection for power users.',
      features: ['10 Seats', 'Unlimited Accounts', '200,000 Scans/mo', 'Brand Safety Manager', '24/7 Support'],
      icon: <Sparkles className="text-indigo-500" size={24} />,
      highlight: false
    }
  ],
  enterprise: [
    {
      name: 'Startup',
      price: '₹9,999',
      description: 'For growing teams and departments.',
      features: ['10 Seats', '3 Departments', '500,000 Scans/mo', 'RBAC Controls', 'Department Analytics'],
      icon: <Users className="text-blue-500" size={24} />,
      highlight: false
    },
    {
      name: 'Growth',
      price: '₹29,999',
      description: 'Scalable safety for enterprises.',
      features: ['50 Seats', 'Unlimited Departments', '2,000,000 Scans/mo', 'Video/Voice Deepfake Detection', 'Full API Access'],
      icon: <Database className="text-guardian-blue" size={24} />,
      highlight: true
    },
    {
      name: 'Ent. Elite',
      price: '₹79,999',
      description: 'Customized scale for global firms.',
      features: ['200+ Seats', 'Unlimited Units', '10,000,000 Scans/mo', 'Custom AI Training', 'SOC2 Compliance'],
      icon: <Shield className="text-indigo-500" size={24} />,
      highlight: false
    }
  ],
  government: [
    {
      name: 'Municipal',
      price: '₹99,999',
      description: 'City-level monitoring and safety.',
      features: ['Smart City Integration', 'Citizen Intelligence', 'Regional Monitoring', 'Public Safety Alerts', 'Hybrid Cloud'],
      icon: <Globe className="text-blue-500" size={24} />,
      highlight: false
    },
    {
      name: 'State',
      price: '₹2,99,999',
      description: 'State-wide protection and scale.',
      features: ['500 Seats', '100M Scans/mo', 'Gov Response Team', 'Dedicated Infrastructure', 'Private VPC'],
      icon: <Database className="text-guardian-blue" size={24} />,
      highlight: true
    },
    {
      name: 'National',
      price: '₹9,99,999+',
      description: 'National security and defense Grade.',
      features: ['Classified Infrastructure', 'Election Security', 'Air-Gapped Deployment', '24/7 War Room Support', 'Custom Cryptography'],
      icon: <Lock className="text-indigo-500" size={24} />,
      highlight: false
    }
  ]
};

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState('enterprise');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="pricing" className="py-24 bg-guardian-section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-guardian-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-guardian-heading mb-6"
          >
            Predictable Pricing for <span className="text-guardian-blue">Every Scale</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-guardian-secondary max-w-2xl mx-auto"
          >
            Choose the perfect plan to secure your brand, organization, or infrastructure.
          </motion.p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-white border border-guardian-border rounded-xl shadow-sm">
            {['individual', 'enterprise', 'government'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-guardian-navy text-white shadow-md'
                    : 'text-guardian-secondary hover:text-guardian-heading'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {pricingData[activeTab].map((plan, index) => (
              <motion.div
                key={`${activeTab}-${plan.name}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col p-8 rounded-2xl border transition-all hover:shadow-xl ${
                  plan.highlight 
                    ? 'bg-white border-guardian-blue shadow-glow ring-1 ring-guardian-blue/20' 
                    : 'bg-white/80 border-guardian-border backdrop-blur-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-guardian-blue text-white text-xs font-bold rounded-full tracking-wide uppercase">
                    Most Popular
                  </div>
                )}

                <div className="mb-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-guardian-heading mb-1">{plan.name}</h3>
                    <p className="text-sm text-guardian-secondary">{plan.description}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    {plan.icon}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-guardian-heading">{plan.price}</span>
                    <span className="ml-1 text-guardian-secondary">/mo</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-guardian-body">
                      <div className="mt-0.5 p-0.5 bg-emerald-50 rounded-full">
                        <Check size={14} className="text-emerald-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-4 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    plan.highlight
                      ? 'bg-guardian-navy text-white hover:bg-slate-800'
                      : 'bg-white border border-guardian-border text-guardian-navy hover:bg-slate-50'
                  }`}
                >
                  Get Started
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-sm text-guardian-secondary"
        >
          Need a custom deployment? <span className="text-guardian-blue font-semibold cursor-pointer hover:underline">Contact our sales team</span> for tailored solutions.
        </motion.p>
      </div>
    </section>
  );
}
