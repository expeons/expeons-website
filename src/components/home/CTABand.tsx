import { Link } from 'react-router-dom';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Mail } from 'lucide-react';

export function CTABand() {
  return (
    <section className="relative bg-brand-navy overflow-hidden py-20 lg:py-28">
      {/* Background orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(91,92,246,0.25) 0%, transparent 70%)' }}
      />

      {/* Decorative symbol */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
        <img src="/brand/symbol-white.png" alt="" aria-hidden="true" className="w-64" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-white mb-5 max-w-3xl mx-auto leading-tight">
            Have a project that needs process engineering support?
          </h2>
          <p className="font-body text-base lg:text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Share your scope and we'll respond with a clear proposal. No obligation. No jargon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-white font-body font-medium text-base rounded-lg hover:bg-brand-violet transition-colors"
            >
              Send Us a Brief →
            </Link>
          </div>
          <p className="mt-6 font-body text-sm text-white/40 flex items-center justify-center gap-2">
            <Mail size={14} />
            Or email us directly at{' '}
            <a href="mailto:hello@expeons.com" className="text-white/60 hover:text-white transition-colors underline underline-offset-2">
              hello@expeons.com
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
