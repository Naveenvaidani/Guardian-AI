import React from 'react';
import { Shield, Lock, Eye, Share2, Clock, CheckCircle2, Globe, Cookie, HelpCircle, Mail, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const policyPoints = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    items: [
      { label: "Personal data", value: "name, email, company, billing details" },
      { label: "Usage data", value: "IP address, device information, activity logs" },
      { label: "Content data", value: "text, images, and AI-generated results" }
    ]
  },
  {
    icon: Settings,
    title: "2. How We Use Your Information",
    content: [
      "Provide and maintain services",
      "Process payments and subscriptions",
      "Improve AI models and system performance",
      "Detect fraud and security risks",
      "Send service updates and alerts"
    ]
  },
  {
    icon: Share2,
    title: "3. Data Sharing & Disclosure",
    desc: "No sale of personal data. Shared only with:",
    items: [
      { label: "Payment providers", value: "Stripe, Razorpay" },
      { label: "Cloud providers", value: "AWS" },
      { label: "Legal authorities", value: "When required by law" }
    ]
  },
  {
    icon: Clock,
    title: "4. Data Retention",
    content: [
      "Retention based on plan: 7 / 30 / 90 days",
      "Users may request data deletion",
      "Temporary backups maintained for security"
    ]
  },
  {
    icon: Lock,
    title: "5. Security Measures",
    content: [
      "SSL/TLS encryption for data in transit",
      "Secure encrypted storage",
      "Role-based access control",
      "Regular internal and external audits"
    ]
  },
  {
    icon: CheckCircle2,
    title: "6. Your Rights",
    content: [
      "Access and review personal data",
      "Correct or update information",
      "Request deletion of data",
      "Request data portability",
      "Object to certain processing activities"
    ]
  },
  {
    icon: Globe,
    title: "7. GDPR & Compliance",
    content: [
      "Fully GDPR-compliant for EU users",
      "Lawful processing based on consent and legitimate interest",
      "Supports compliance with global data protection standards"
    ]
  },
  {
    icon: Cookie,
    title: "8. Cookies & Tracking",
    content: [
      "Used to enhance user experience",
      "Analyze usage and performance",
      "Maintain login sessions",
      "Users can disable cookies in browser settings"
    ]
  },
  {
    icon: HelpCircle,
    title: "9. Third-Party Services",
    desc: "Each third party operates under its own privacy policy:",
    content: [
      "Payment gateways (Stripe, Razorpay)",
      "Cloud and infrastructure providers",
      "Analytics and monitoring tools"
    ]
  },
  {
    icon: Mail,
    title: "10. Changes & Contact",
    desc: "Policy subject to updates or revisions. Contact for privacy inquiries:",
    items: [
      { label: "Support", value: "support@guardianai.co.in" },
      { label: "Inquiries", value: "info@guardianai.co.in" }
    ]
  }
];


export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-guardian-bg py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-guardian-blue/10 rounded-2xl mb-6">
            <Shield className="text-guardian-blue w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-guardian-navy mb-4">Privacy Policy</h1>
          <p className="text-guardian-secondary text-lg max-w-2xl mx-auto">
            Your privacy is our priority. Learn how Guardian AI protects your data and maintains compliance with global standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {policyPoints.map((point, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl border border-guardian-border p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-guardian-section rounded-2xl text-guardian-blue shrink-0">
                  <point.icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-guardian-navy mb-4">{point.title}</h3>
                  
                  {point.desc && (
                    <p className="text-guardian-secondary mb-4 leading-relaxed">{point.desc}</p>
                  )}

                  {point.items ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {point.items.map((item, i) => (
                        <div key={i} className="p-4 bg-guardian-section/50 rounded-xl border border-guardian-border">
                          <p className="text-[10px] font-bold text-guardian-secondary uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-sm font-bold text-guardian-navy">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {point.content.map((text, i) => (
                        <li key={i} className="flex items-center gap-3 text-guardian-secondary text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-guardian-blue shrink-0" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 pt-16 border-t border-guardian-border text-center"
        >
          <p className="text-guardian-secondary text-sm mb-4">
            Last updated: April 25, 2026
          </p>
          <p className="text-guardian-navy font-bold">
            Target End of Core Privacy Policy Summary
          </p>
        </motion.div>
      </div>
    </div>
  );
}
