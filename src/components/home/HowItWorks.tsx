import { AnimatedSection, animatedItemVariants } from '../ui/AnimatedSection';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Scope',
    body: 'We review your project brief, define the deliverable scope, confirm applicable standards, and agree a timeline.',
  },
  {
    number: '02',
    title: 'Engage',
    body: 'We sign an agreement, clarify required inputs, and begin engineering work using your project data.',
  },
  {
    number: '03',
    title: 'Deliver',
    body: 'Structured deliverables — PFDs, datasheets, simulation files, reports — submitted in the agreed format.',
  },
  {
    number: '04',
    title: 'Support',
    body: 'We support review cycles, respond to client comments, and revise as required within agreed scope.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-4">Our Process</p>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-brand-navy mb-5">
            From brief to <em className="not-italic text-brand-purple">deliverable,</em> with no surprises.
          </h2>
          <p className="font-body text-base lg:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            A structured engagement process that keeps you informed at every stage.
          </p>
        </AnimatedSection>

        {/* Stepper */}
        <AnimatedSection stagger className="relative">
          {/* Connector line - desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-neutral-200" style={{ top: '2rem' }}>
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 h-8 -translate-y-1/2 flex items-center justify-center">
              <img src="/brand/symbol-blue.png" alt="" aria-hidden="true" className="w-6 h-6 opacity-30" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={animatedItemVariants}
                className="relative flex flex-col"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-brand-purple-light border-2 border-brand-purple flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-brand-purple text-sm">{step.number}</span>
                  </div>
                  {/* Mobile connector */}
                  {i < steps.length - 1 && (
                    <div className="flex-1 lg:hidden h-px bg-neutral-200" />
                  )}
                </div>
                <h3 className="font-heading font-semibold text-xl text-brand-navy mb-2">{step.title}</h3>
                <p className="font-body text-sm text-neutral-500 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
