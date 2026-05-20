import { Building2, Target, CheckSquare, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection, animatedItemVariants } from '../ui/AnimatedSection';
import type { LucideIcon } from 'lucide-react';

interface Pillar {
  icon: LucideIcon;
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    icon: Building2,
    title: 'EPC Project DNA',
    body: "We've worked inside EPC workflows. We know how deliverables are reviewed, what client teams expect, and how documentation must be structured for approval.",
  },
  {
    icon: Target,
    title: 'Process-Only Focus',
    body: 'We specialize. Accurate process inputs without overstepping into mechanical, structural, or civil disciplines. Clean interfaces, clear scope.',
  },
  {
    icon: CheckSquare,
    title: 'Industry-Ready Outputs',
    body: 'Every deliverable is formatted, structured, and detailed to pass EPC review — the right format, the right depth, the right standards.',
  },
  {
    icon: Layers,
    title: 'Flexible Engagement',
    body: 'Hourly, package-based, or retainer. Right-sized for EPC surge demand, FEED studies, or SMEs building their first process design.',
  },
];

export function WhyExpeons() {
  return (
    <section className="bg-brand-purple-light/40 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-4">Why Expeons</p>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-brand-navy mb-5">
            Where precision engineering meets{' '}
            <em className="not-italic text-brand-purple">process intelligence.</em>
          </h2>
          <p className="font-body text-base lg:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            We're not generalists. We're process engineers who've delivered inside real EPC projects.
          </p>
        </AnimatedSection>

        {/* Pillars */}
        <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={animatedItemVariants}
                className="bg-white rounded-3xl p-8 border border-neutral-200"
              >
                <div className="mb-5 text-brand-purple">
                  <Icon size={28} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-brand-navy mb-3">{pillar.title}</h3>
                <p className="font-body text-base text-neutral-500 leading-relaxed">{pillar.body}</p>
              </motion.div>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
