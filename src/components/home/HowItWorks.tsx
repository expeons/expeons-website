import { AnimatedSection, animatedItemVariants } from '../ui/AnimatedSection';
import { motion } from 'framer-motion';
import { FileSearch, Handshake, PackageCheck, LifeBuoy } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Scope',
    icon: FileSearch,
    body: 'We review your project brief, define the deliverable scope, confirm applicable standards, and agree a timeline.',
  },
  {
    number: '02',
    title: 'Engage',
    icon: Handshake,
    body: 'We sign an agreement, clarify required inputs, and begin engineering work using your project data.',
  },
  {
    number: '03',
    title: 'Deliver',
    icon: PackageCheck,
    body: 'Structured deliverables — PFDs, datasheets, simulation files, reports — submitted in the agreed format.',
  },
  {
    number: '04',
    title: 'Support',
    icon: LifeBuoy,
    body: 'We support review cycles, respond to client comments, and revise as required within agreed scope.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <AnimatedSection className="text-center mb-16 lg:mb-24">
          <h2 className="font-heading font-bold text-4xl lg:text-6xl text-brand-navy mb-4">
            Our Process
          </h2>
          <p className="font-body text-base lg:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            From brief to{' '}
            <span className="text-brand-violet">deliverable,</span>{' '}
            with no surprises.
          </p>
        </AnimatedSection>

        {/* ── Desktop: horizontal stepper ── */}
        <AnimatedSection stagger className="hidden lg:block">
          <div className="grid grid-cols-4 gap-0 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={animatedItemVariants}
                  className="flex flex-col items-center text-center px-6 relative"
                >
                  {/* Icon circle + connector line row */}
                  <div className="flex items-center w-full mb-6">
                    {/* Left connector (hidden for first item) */}
                    <div
                      className={`flex-1 h-px ${i === 0 ? 'invisible' : 'bg-neutral-200'}`}
                    />
                    {/* Purple icon circle */}
                    <div className="w-16 h-16 rounded-full bg-brand-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-purple/30 z-10">
                      <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                    {/* Right connector (hidden for last item) */}
                    <div
                      className={`flex-1 h-px ${i === steps.length - 1 ? 'invisible' : 'bg-neutral-200'}`}
                    />
                  </div>

                  {/* Step number accent line */}
                  <div className="w-8 h-0.5 bg-brand-purple mb-3 rounded-full" />

                  <h3 className="font-heading font-bold text-brand-navy text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-neutral-500 leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ── Mobile: vertical list ── */}
        <AnimatedSection stagger className="lg:hidden flex flex-col gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={animatedItemVariants}
                className="flex items-start gap-5"
              >
                {/* Purple icon circle */}
                <div className="w-14 h-14 rounded-full bg-brand-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-purple/30">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="pt-1">
                  <h3 className="font-heading font-bold text-brand-navy text-base mb-1.5">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-neutral-500 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatedSection>

      </div>
    </section>
  );
}
