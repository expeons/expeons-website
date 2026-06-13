import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection, animatedItemVariants } from '../ui/AnimatedSection';
import { motion } from 'framer-motion';

interface Package {
  name: string;
  tag: string;
  deliverables: string[];
  bestFor: string;
  featured?: boolean;
}

const packages: Package[] = [
  {
    name: 'Basic Design',
    tag: 'Feasibility',
    deliverables: ['P&ID', 'Heat & Mass Balance'],
    bestFor: 'Feasibility studies and concept work',
  },
  {
    name: 'Process Package',
    tag: 'Most Popular',
    deliverables: ['Datasheets', 'Utility balance', 'Process narrative'],
    bestFor: 'EPC contractors needing a complete process deliverable set',
    featured: true,
  },
  {
    name: 'Safety & Compliance',
    tag: 'Documentation',
    deliverables: ['HAZOP worksheets', 'SOPs', 'Compliance documentation'],
    bestFor: 'Operating plants requiring documentation',
  },
  {
    name: 'Simulation Support',
    tag: 'Advanced',
    deliverables: ['Aspen/HYSYS models', 'Optimization report'],
    bestFor: 'Troubleshooting, efficiency studies, debottlenecking',
  },
];

export function Packages() {
  return (
    <section className="bg-neutral-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-4">Engagement Packages</p>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-brand-navy mb-5">
            Choose the engagement that fits your{' '}
            <em className="not-italic text-brand-purple">project stage.</em>
          </h2>
          <p className="font-body text-base lg:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Four structured packages, each mapped to a specific stage of the process engineering lifecycle.
          </p>
        </AnimatedSection>

        {/* Cards */}
        <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={animatedItemVariants}
              className={`rounded-3xl p-6 flex flex-col gap-5 h-full ${
                pkg.featured
                  ? 'bg-brand-purple text-white shadow-xl shadow-brand-purple/20 lg:-mt-4 lg:py-10'
                  : 'bg-white shadow-sm'
              }`}
            >
              <span className={`self-start font-body font-bold text-[10px] tracking-widest uppercase ${
                pkg.featured ? 'text-white/60' : 'text-brand-purple'
              }`}>
                {pkg.featured ? '★ Most Popular' : pkg.tag}
              </span>
              <h3 className={`font-heading font-bold text-xl ${pkg.featured ? 'text-white' : 'text-brand-navy'}`}>
                {pkg.name}
              </h3>
              <ul className="flex flex-col gap-2.5 flex-1">
                {pkg.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <Check size={14} className={`mt-0.5 flex-shrink-0 ${pkg.featured ? 'text-white/70' : 'text-brand-purple'}`} />
                    <span className={`font-body text-sm ${pkg.featured ? 'text-white/80' : 'text-neutral-600'}`}>{d}</span>
                  </li>
                ))}
              </ul>
              <p className={`font-body text-xs ${pkg.featured ? 'text-white/60' : 'text-neutral-400'} leading-relaxed`}>
                Best for: {pkg.bestFor}
              </p>
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center px-4 py-2.5 rounded-full font-body font-medium text-sm transition-colors ${
                  pkg.featured
                    ? 'bg-white text-brand-purple hover:bg-neutral-100'
                    : 'border border-brand-purple text-brand-purple hover:bg-brand-purple-light'
                }`}
              >
                Get a Quote →
              </Link>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
