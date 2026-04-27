import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Eye, CheckCircle2, Globe, Zap, Users, BarChart3, Lock, MessageSquare, Briefcase, Rocket } from 'lucide-react';
import FooterSection from '../components/sections/FooterSection';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(37,99,235,0.05)_0%,transparent_100%)]" />
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-lg font-bold uppercase tracking-widest text-guardian-blue">About Guardian AI</h2>
            <h1 className="mx-auto mb-8 max-w-4xl text-5xl font-black tracking-tight text-guardian-navy lg:text-7xl">
              Building the future of <span className="text-guardian-blue">digital trust</span> and platform protection.
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-guardian-secondary">
              Guardian AI is an advanced AI-powered protection platform designed to help businesses, platforms, governments, and enterprises secure their digital ecosystems. We combine cutting-edge artificial intelligence with real-time intelligence systems to detect threats, enforce policies, protect brands, and optimize business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-guardian-section px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div 
              {...fadeIn}
              className="relative rounded-3xl border border-guardian-border bg-white p-12 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-guardian-blue">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-guardian-navy">Our Mission</h3>
              <p className="text-lg leading-relaxed text-guardian-secondary">
                To create a safer digital world by empowering organizations with intelligent tools that prevent risk, build trust, and enable growth.
              </p>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="relative rounded-3xl border border-guardian-border bg-white p-12 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-guardian-blue">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-guardian-navy">Our Vision</h3>
              <p className="text-lg leading-relaxed text-guardian-secondary">
                To become the global leader in AI-driven digital safety, platform intelligence, and brand protection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeIn} className="mb-20 text-center">
            <h2 className="text-4xl font-bold text-guardian-navy lg:text-5xl">What We Do</h2>
            <p className="mt-6 text-lg text-guardian-secondary">Guardian AI offers a unified suite of powerful solutions</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Brand Safety & Ad Protection", icon: Shield, desc: "Protect campaigns from harmful placements, fake traffic, scams, and reputation risks." },
              { title: "Content Moderation", icon: MessageSquare, desc: "Detect spam, hate speech, fake accounts, abuse, harmful content, and violations instantly." },
              { title: "Policy Compliance Engine", icon: Lock, desc: "Automate rule enforcement, platform governance, and compliance workflows." },
              { title: "Fraud & Scam Detection", icon: Zap, desc: "Identify suspicious users, payment fraud, impersonation, fake leads, and scam networks." },
              { title: "Threat Intelligence", icon: Globe, desc: "Monitor risks, emerging attacks, cyber abuse, and coordinated harmful activity." },
              { title: "AI Marketing Intelligence", icon: BarChart3, desc: "Use data-driven AI insights to improve campaigns, SEO, audience targeting, and growth." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                {...fadeIn}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl border border-guardian-border p-8 transition-all hover:border-guardian-blue/30 hover:bg-blue-50/30"
              >
                <item.icon className="mb-6 h-10 w-10 text-guardian-blue" />
                <h4 className="mb-3 text-xl font-bold text-guardian-navy">{item.title}</h4>
                <p className="text-guardian-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Guardian AI */}
      <section className="bg-guardian-navy px-6 py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-bold lg:text-5xl">Why Guardian AI</h2>
              <div className="mt-12 grid gap-6">
                {[
                  "Real-Time Monitoring",
                  "Multi-Platform Protection",
                  "Scalable for Startups to Governments",
                  "Enterprise-Grade Security",
                  "AI-Powered Automation",
                  "Custom Solutions for Every Industry"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-guardian-blue">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-medium text-blue-100">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeIn}
              className="grid grid-cols-2 gap-4 rounded-3xl bg-white/5 p-8 backdrop-blur-sm"
            >
              {[
                { label: "Industries We Serve", count: "8+" },
                { label: "Real-Time Detection", count: "<10ms" },
                { label: "Global Reach", count: "190+" },
                { label: "AI Accuracy", count: "99.9%" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-guardian-blue">{stat.count}</div>
                  <div className="mt-1 text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeIn} className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-guardian-navy lg:text-4xl">Industries We Serve</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Social Media Platforms", "Advertising Networks", "E-commerce Companies", 
              "Enterprises", "Financial Services", "Governments", "SaaS Businesses", "Media & Entertainment"
            ].map((industry, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-full bg-guardian-section px-8 py-3 text-lg font-bold text-guardian-navy border border-guardian-border"
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-guardian-section px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <motion.h2 {...fadeIn} className="mb-16 text-3xl font-bold text-guardian-navy lg:text-4xl">Our Core Values</motion.h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { title: "Trust", desc: "Security first in everything we build.", icon: Shield },
              { title: "Innovation", desc: "Constantly evolving with AI.", icon: Rocket },
              { title: "Integrity", desc: "Transparent and responsible technology.", icon: Lock },
              { title: "Impact", desc: "Solutions that create measurable results.", icon: BarChart3 }
            ].map((value, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }}>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm text-guardian-blue">
                  <value.icon className="h-8 w-8" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-guardian-navy">{value.title}</h4>
                <p className="text-guardian-secondary">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl rounded-[3rem] bg-guardian-navy p-12 text-center text-white lg:p-24">
          <motion.div {...fadeIn}>
            <h2 className="mb-8 text-4xl font-bold lg:text-6xl leading-tight">
              Guardian AI is your intelligent shield for the modern digital world.
            </h2>
            <div className="flex flex-wrap justify-center gap-6 text-2xl font-bold text-guardian-blue">
              <span>Protect.</span>
              <span>Detect.</span>
              <span>Grow.</span>
            </div>
            <button className="mt-12 rounded-2xl bg-white px-10 py-5 text-xl font-bold text-guardian-navy shadow-xl transition-all hover:bg-blue-50 hover:scale-105 active:scale-95">
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default AboutPage;
