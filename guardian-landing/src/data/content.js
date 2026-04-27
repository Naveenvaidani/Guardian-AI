import {
  BrainCircuit,
  Flame,
  ShieldCheck,
  Megaphone,
  Siren,
  LineChart,
  DatabaseZap,
  Bot,
  AlertTriangle,
  UserCog,
  Gavel,
  Building2,
  Landmark,
  Globe,
  TrendingUp,
} from 'lucide-react';

export const navItems = ['Platform', 'Modules', 'Architecture', 'Use Cases', 'Security'];

export const moduleCards = [
  {
    icon: BrainCircuit,
    title: 'Content Moderation',
    desc: 'Ensures all user-generated content stays safe, appropriate, and platform-compliant with multimodal AI detection.',
  },
  {
    icon: Gavel,
    title: 'Policy Enforcement',
    desc: 'Automatically applies and maintains rules to keep your digital community aligned with evolving guidelines.',
  },
  {
    icon: LineChart,
    title: 'Research & Analytics',
    desc: 'Provides deep insights into trends, risks, and user behavior for smarter, data-driven decision-making.',
  },
  {
    icon: Siren,
    title: 'Threat Response',
    desc: 'Detects and responds to threats in real time to prevent crises and mitigate platform abuse before it scales.',
  },
  {
    icon: ShieldCheck,
    title: 'Ad & Brand Safety',
    desc: 'Protects brand reputation by ensuring ads and content meet strict safety standards and placement rules.',
  },
  {
    icon: TrendingUp,
    title: 'AI Marketing Intelligence',
    desc: 'Drives growth with data-driven insights, automation, and campaign optimization for modern advertising.',
  },
];

export const flowSteps = [
  { icon: DatabaseZap, label: 'Data Ingestion', detail: 'Omnichannel streams, reports, and telemetry pipelines.' },
  { icon: Bot, label: 'AI Models', detail: 'Specialized detectors for policy, threats, and anomalies.' },
  { icon: AlertTriangle, label: 'Risk Scoring', detail: 'Unified severity index with explainable confidence output.' },
  { icon: UserCog, label: 'Human Review', detail: 'Priority queues for analysts and operational supervisors.' },
  { icon: Gavel, label: 'Action', detail: 'Automated or manual intervention with full governance guardrails.' },
  { icon: TrendingUp, label: 'Analytics', detail: 'Feedback loops that improve models and operational playbooks.' },
];

export const useCases = [
  {
    icon: Landmark,
    title: 'Governments',
    body: 'Protect citizens and critical systems with always-on situational intelligence and coordinated response workflows.',
  },
  {
    icon: Globe,
    title: 'Social Platforms',
    body: 'Scale safety operations globally while preserving speed, consistency, and transparency in moderation decisions.',
  },
  {
    icon: Building2,
    title: 'Enterprises',
    body: 'Defend brands, monitor market narratives, and detect high-risk events before they cascade across channels.',
  },
  {
    icon: ShieldCheck,
    title: 'Law Enforcement',
    body: 'Improve triage velocity and evidence quality using integrated case intelligence and compliant audit infrastructure.',
  },
];

export const stats = [
  { value: '72%', label: 'Reduction in critical incident response time' },
  { value: '3.4x', label: 'Improvement in threat detection accuracy' },
  { value: '<120ms', label: 'Latency for real-time automated decisions' },
  { value: '< 2m', label: 'Zero-day risk containment globally' },
];
