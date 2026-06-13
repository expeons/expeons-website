import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatedSection, animatedItemVariants } from '../components/ui/AnimatedSection';

const values = [
  { title: 'Precision', description: 'Every calculation checked. Every assumption documented. Accuracy in every number, every line.' },
  { title: 'Reliability', description: 'We deliver what we scope. On time. In the right format. Ready for client review.' },
  { title: 'Integrity', description: 'We tell you what the process can and cannot do. No overclaiming, no vague estimates.' },
  { title: 'Systems Thinking', description: 'We see how everything connects. A change upstream affects utilities, safety, equipment sizing — we track all of it.' },
  { title: 'Innovation', description: 'Modern methods and simulation tools applied to real industrial problems.' },
  { title: 'Collaboration', description: 'We work as an extension of your team, not as a black box.' },
];

export function About() {
  return (
    <div>
      <Helmet>
        <title>About Expeons | Precision Process Engineering Specialists</title>
        <meta name="description" content="Learn about Expeons, our story, and our mission to provide EPC-ready process engineering support for the industrial sector." />
        <link rel="canonical" href="https://expeons.com/about" />
      </Helmet>
      {/* Hero — no pt-16 wrapper; gradient must reach the very top so the transparent navbar sits over it */}
      <section className="relative hero-gradient overflow-hidden pt-40 pb-24 lg:pt-56 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-body font-semibold tracking-widest uppercase text-xs text-white/60 mb-6">About Us</p>
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-white leading-tight mb-6">
              Engineers who've <em className="not-italic text-brand-violet">lived inside</em> EPC projects.
            </h1>
            <p className="font-body text-base lg:text-lg text-white/70 leading-relaxed">
              We are a team of process engineers with hands-on experience delivering process packages on large-scale EPC projects — refineries, petrochemical plants, fertilizer facilities. We know what good looks like.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Story */}
            <div>
              <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-6">Our Story</p>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-brand-navy mb-8 leading-tight">
                Built from the inside of EPC projects.
              </h2>
              <div className="prose font-body text-base text-neutral-600 leading-relaxed flex flex-col gap-5">
                <p>
                  We built Expeons because we saw a consistent gap in the market: EPC contractors and growing industrial businesses needed process engineering expertise, but not a full in-house team. They needed someone who already understood the workflow, the deliverable format, and the review process — without needing to be onboarded from scratch.
                </p>
                <p>
                  That's what we offer. Process-only expertise, with EPC project DNA.
                </p>
                <p>
                  Our team has worked inside the project environments we now support — we've sat in the same HAZOP rooms, produced the same datasheet formats, and navigated the same client review cycles. We bring that experience to every engagement.
                </p>
              </div>

              {/* Decorative symbol */}
              <div className="mt-10 flex items-center gap-4">
                <img src="/brand/symbol-black.png" alt="" aria-hidden="true" className="w-12 h-12 opacity-10" />
                <div className="font-body text-sm text-neutral-400">
                  <p className="font-semibold text-neutral-700">Precision Process Engineering</p>
                  <p>expeons.com</p>
                </div>
              </div>
            </div>

            {/* Right - Values */}
            <div>
              <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-6">Our Values</p>
              <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {values.map((value) => (
                  <motion.div
                    key={value.title}
                    variants={animatedItemVariants}
                    className="p-5 bg-neutral-50 rounded-3xl shadow-sm"
                  >
                    <div className="w-6 h-0.5 bg-brand-purple mb-3" />
                    <h3 className="font-heading font-semibold text-base text-brand-navy mb-2">{value.title}</h3>
                    <p className="font-body text-sm text-neutral-500 leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-purple-light/40 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-brand-navy mb-4">
              Ready to work with us?
            </h2>
            <p className="font-body text-base text-neutral-500 mb-8 max-w-lg mx-auto">
              Tell us about your project and we'll respond with a clear scope and proposal within one business day.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-white font-body font-medium text-base rounded-full hover:bg-brand-violet transition-colors"
            >
              Get in Touch →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
