import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { AnimatedSection } from '../components/ui/AnimatedSection';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  services: z.array(z.string()).optional(),
  message: z.string().min(20, 'Please describe your project (at least 20 characters)'),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  'PFDs & Heat-Mass Balance',
  'Process Datasheets',
  'Utility Balance',
  'Design Basis Documents',
  'Aspen HYSYS / Plus Simulation',
  'HAZOP & Safety Reviews',
  'SOPs & Compliance Docs',
  'Technical Bid Evaluations',
];

const whatToExpect = [
  'We review your brief within 1 business day',
  "We'll send a scoping question if we need clarification",
  'You receive a clear proposal: deliverables, timeline, cost estimate',
  'We begin once scope and terms are agreed',
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  });

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const payload = { ...data, services: selectedServices };
      // In production, POST to /api/contact
      console.log('Contact form submission:', payload);
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    }
  };

  return (
    <div className="pt-16 lg:pt-20 bg-neutral-50 min-h-screen">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 lg:mb-16"
          >
            <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-4">Get in Touch</p>
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-brand-navy mb-4">Send us a brief.</h1>
            <p className="font-body text-base text-neutral-500 max-w-xl leading-relaxed">
              Share your project scope and we'll come back with a clear proposal. No jargon, no obligation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
            {/* Form */}
            <AnimatedSection>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-10 border border-neutral-200 text-center"
                >
                  <CheckCircle2 size={48} className="text-green-500 mx-auto mb-5" />
                  <h2 className="font-heading font-bold text-2xl text-brand-navy mb-3">We've received your inquiry.</h2>
                  <p className="font-body text-base text-neutral-500">We'll be in touch within 1 business day.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 border border-neutral-200 flex flex-col gap-6">
                  {/* Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body font-medium text-sm text-neutral-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('name')}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 font-body text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-colors"
                        placeholder="Your name"
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-500 font-body">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block font-body font-medium text-sm text-neutral-700 mb-2">Company</label>
                      <input
                        {...register('company')}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 font-body text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body font-medium text-sm text-neutral-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 font-body text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-colors"
                        placeholder="you@company.com"
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-500 font-body">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block font-body font-medium text-sm text-neutral-700 mb-2">Phone</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 font-body text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block font-body font-medium text-sm text-neutral-700 mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('projectType')}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 font-body text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-colors bg-white"
                    >
                      <option value="">Select project type</option>
                      <option value="epc">EPC Contract</option>
                      <option value="industrial">Industrial Facility</option>
                      <option value="sme">SME / Startup</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.projectType && <p className="mt-1.5 text-xs text-red-500 font-body">{errors.projectType.message}</p>}
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block font-body font-medium text-sm text-neutral-700 mb-3">Services Needed</label>
                    <div className="flex flex-wrap gap-2.5">
                      {serviceOptions.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`font-body text-xs px-3.5 py-2 rounded-full border transition-all duration-150 ${
                            selectedServices.includes(service)
                              ? 'bg-brand-purple text-white border-brand-purple'
                              : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-purple hover:text-brand-purple'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-body font-medium text-sm text-neutral-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 font-body text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-colors resize-vertical"
                      placeholder="Briefly describe your project scope, timeline, and what you need from us..."
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-500 font-body">{errors.message.message}</p>}
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 p-4 bg-red-50 rounded-lg border border-red-200">
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="font-body text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-purple text-white font-body font-medium text-base rounded-lg hover:bg-brand-violet transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry →'}
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* What happens next */}
            <AnimatedSection delay={0.2} className="flex flex-col gap-8">
              <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-6">What to Expect</p>
                <div className="flex flex-col gap-4">
                  {whatToExpect.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="font-body text-sm text-neutral-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                <p className="font-body font-semibold tracking-widest uppercase text-xs text-neutral-400 mb-5">Direct Contact</p>
                <div className="flex flex-col gap-4">
                  <a href="mailto:hello@expeons.com" className="flex items-center gap-3 font-body text-sm text-neutral-700 hover:text-brand-purple transition-colors">
                    <div className="w-8 h-8 bg-brand-purple-light rounded-lg flex items-center justify-center">
                      <Mail size={14} className="text-brand-purple" />
                    </div>
                    hello@expeons.com
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-sm text-neutral-700 hover:text-brand-purple transition-colors">
                    <div className="w-8 h-8 bg-brand-purple-light rounded-lg flex items-center justify-center">
                      <ExternalLink size={14} className="text-brand-purple" />
                    </div>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="bg-brand-purple-light/40 rounded-2xl p-6 border border-brand-purple/10">
                <p className="font-body text-sm text-neutral-600 leading-relaxed">
                  <span className="font-semibold text-brand-navy">Or book a quick call</span> — share your availability and we'll find a time that works.
                </p>
                <button className="mt-4 font-body text-sm text-brand-purple font-medium hover:text-brand-violet transition-colors">
                  Book a call → {/* Calendly embed placeholder */}
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
