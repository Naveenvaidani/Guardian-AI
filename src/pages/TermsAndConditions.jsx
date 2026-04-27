import React from 'react';
import { FileText, UserCheck, CreditCard, ShieldAlert, Zap, Lock, Copyright, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const termPoints = [
  {
    icon: FileText,
    title: "1. Use of Services",
    content: [
      "Use the platform only for lawful and authorized purposes",
      "No misuse, hacking, or unauthorized access",
      "No copying, reverse-engineering, or tampering with system components"
    ]
  },
  {
    icon: UserCheck,
    title: "2. Account Registration",
    content: [
      "Provide accurate and up-to-date information",
      "Keep login credentials confidential and secure",
      "Account holders are responsible for all actions under their account"
    ]
  },
  {
    icon: CreditCard,
    title: "3. Subscription & Billing",
    content: [
      "Subscription options: monthly or yearly plans",
      "Payments processed via Stripe, Razorpay, or approved gateways",
      "Auto-renewal enabled by default with cancellation option",
      "Pricing and plan changes communicated in advance"
    ]
  },
  {
    icon: ShieldAlert,
    title: "4. Acceptable Use Policy",
    desc: "Users must NOT:",
    content: [
      "Upload or distribute illegal, harmful, or offensive content",
      "Violate any applicable laws or third-party rights",
      "Attempt to bypass or disable system safeguards",
      "Misuse AI tools for malicious or unethical purposes"
    ]
  },
  {
    icon: Zap,
    title: "5. AI Limitations Disclaimer",
    content: [
      "AI outputs may not always be accurate or complete",
      "Users retain full responsibility for decisions made using AI results",
      "Guardian AI is not liable for errors, omissions, or missed detections"
    ]
  },
  {
    icon: Lock,
    title: "6. Data & Privacy",
    desc: "Data handling governed by our Privacy Policy. Data used for:",
    content: [
      "Service delivery and maintenance",
      "AI model improvement",
      "Security and compliance monitoring"
    ]
  },
  {
    icon: Copyright,
    title: "7. Intellectual Property",
    content: [
      "All software, AI models, content, and branding owned by Guardian AI",
      "No copying, redistribution, or derivative works without consent",
      "Users retain ownership of their uploaded content"
    ]
  },
  {
    icon: AlertTriangle,
    title: "8. Termination & Liability",
    desc: "Guardian AI is not liable for:",
    content: [
      "Data loss or corruption",
      "Service interruptions",
      "Indirect, incidental, or consequential damages",
      "Accounts may be terminated for policy violations"
    ]
  }
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-guardian-bg py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-guardian-navy/5 rounded-2xl mb-6">
            <FileText className="text-guardian-navy w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-guardian-navy mb-4">Terms & Conditions</h1>
          <p className="text-guardian-secondary text-lg max-w-2xl mx-auto">
            Please review the legal terms governing your use of the Guardian AI platform and services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {termPoints.map((point, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl border border-guardian-border p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-guardian-section rounded-2xl text-guardian-navy shrink-0">
                  <point.icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-guardian-navy mb-4">{point.title}</h3>
                  
                  {point.desc && (
                    <p className="text-guardian-secondary mb-4 leading-relaxed font-medium">{point.desc}</p>
                  )}

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {point.content.map((text, i) => (
                      <li key={i} className="flex items-start gap-3 text-guardian-secondary text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-guardian-navy/30 mt-1.5 shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
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
            🎯 End of Core Terms & Conditions Summary
          </p>
        </motion.div>
      </div>
    </div>
  );
}
