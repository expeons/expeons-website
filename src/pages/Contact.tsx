import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, AlertCircle, ExternalLink, ChevronDown, Loader2, Phone } from 'lucide-react';
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

  const onSubmit = async (_data: FormData) => {
    setError('');
    try {
      // In production, POST to /api/contact
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    }
  };

  return (
    <div className="hero-gradient min-h-screen">
      {/* Hero — transparent container since parent div has hero-gradient */}
      <section className="pt-32 pb-12 lg:pt-44 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-body font-semibold tracking-widest uppercase text-xs text-white/60 mb-4">Get in Touch</p>
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-4">Send us a brief.</h1>
            <p className="font-body text-base text-white/70 max-w-xl leading-relaxed">
              Share your project scope and we'll come back with a clear proposal. No jargon, no obligation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 pt-4 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">
            {/* Form */}
            <AnimatedSection>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-10 shadow-xl shadow-black/10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center"
                  >
                    <CheckCircle2 size={48} className="text-green-400 mx-auto mb-5" />
                    <h2 className="font-heading font-bold text-2xl text-white mb-3">We've received your inquiry.</h2>
                    <p className="font-body text-base text-white/60">We'll be in touch within 1 business day.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    {/* Name + Company */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <input
                          {...register('name')}
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/15 backdrop-blur-sm font-body text-sm text-white placeholder:text-white/65 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 transition-all"
                          placeholder="Your name *"
                        />
                        {errors.name && <p className="mt-1.5 text-xs text-red-400 font-body">{errors.name.message}</p>}
                      </div>
                      <div>
                        <input
                          {...register('company')}
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/15 backdrop-blur-sm font-body text-sm text-white placeholder:text-white/65 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 transition-all"
                          placeholder="Company name"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/15 backdrop-blur-sm font-body text-sm text-white placeholder:text-white/65 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 transition-all"
                          placeholder="Work email *"
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-red-400 font-body">{errors.email.message}</p>}
                      </div>
                      <div>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/15 backdrop-blur-sm font-body text-sm text-white placeholder:text-white/65 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 transition-all"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <div className="relative">
                        <select
                          {...register('projectType')}
                          className="w-full appearance-none px-4 py-3 pr-10 rounded-lg border border-white/20 bg-white/15 backdrop-blur-sm font-body text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 transition-all cursor-pointer [&>option]:bg-brand-navy [&>option]:text-white"
                        >
                          <option value="">Project type *</option>
                          <option value="epc">EPC Contract</option>
                          <option value="industrial">Industrial Facility</option>
                          <option value="sme">SME / Startup</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                      </div>
                      {errors.projectType && <p className="mt-1.5 text-xs text-red-400 font-body">{errors.projectType.message}</p>}
                    </div>

                    {/* Services */}
                    <div>
                      <div className="flex flex-wrap gap-2.5">
                        {serviceOptions.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`font-body text-xs px-3.5 py-2 rounded-full border transition-all duration-150 ${
                              selectedServices.includes(service)
                                ? 'bg-white text-brand-purple border-white font-semibold'
                                : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        {...register('message')}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/15 backdrop-blur-sm font-body text-sm text-white placeholder:text-white/65 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 transition-all resize-vertical"
                        placeholder="Your message *  —  project scope, timeline, what you need..."
                      />
                      {errors.message && <p className="mt-1.5 text-xs text-red-400 font-body">{errors.message.message}</p>}
                    </div>

                    {error && (
                      <div className="flex items-start gap-2 p-4 bg-red-500/20 rounded-xl border border-red-400/30">
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="font-body text-sm text-red-300">{error}</p>
                      </div>
                    )}

                    <div className="flex justify-end pt-1">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="inline-flex items-center gap-2 px-7 py-2.5 bg-white text-brand-purple font-body font-semibold text-sm rounded-full hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                      >
                        {isSubmitting ? (
                          <><Loader2 size={15} className="animate-spin" /> Sending...</>
                        ) : (
                          'Send Inquiry →'
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Direct Contact sidebar */}
            <AnimatedSection delay={0.2} className="flex flex-col gap-8">
              {/* Office Locations */}
              <div>
                <p className="font-body font-semibold tracking-widest uppercase text-xs text-white/50 mb-5">Our Offices</p>
                <div className="flex flex-col gap-4">
                  {[
                    { country: 'India', phone: '+91 98765 43210' },
                    { country: 'Dubai', phone: '+971 50 123 4567' },
                    { country: 'Kuwait', phone: '+965 9876 5432' },
                    { country: 'Qatar', phone: '+974 5512 3456' },
                  ].map(({ country, phone }) => (
                    <div key={country} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                      <span className="font-body text-sm font-medium text-white/90">{country}</span>
                      <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 font-body text-sm text-white/60 hover:text-white transition-colors group">
                        <Phone size={13} className="group-hover:text-white transition-colors" />
                        {phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Contact */}
              <div>
                <p className="font-body font-semibold tracking-widest uppercase text-xs text-white/50 mb-4">Direct Contact</p>
                <div className="flex flex-col gap-4">
                  <a href="mailto:hello@expeons.com" className="flex items-center gap-3 font-body text-sm text-white/80 hover:text-white transition-colors group">
                    <Mail size={16} className="text-white/50 flex-shrink-0 group-hover:text-white transition-colors" />
                    hello@expeons.com
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-sm text-white/80 hover:text-white transition-colors group">
                    <ExternalLink size={16} className="text-white/50 flex-shrink-0 group-hover:text-white transition-colors" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
