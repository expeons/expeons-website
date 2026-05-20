import { motion } from 'framer-motion';
import { GitBranch, FileText, Zap, BookOpen, Activity, Shield, ClipboardList, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection, animatedItemVariants } from '../ui/AnimatedSection';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  { icon: GitBranch, title: 'PFDs & Heat-Mass Balance', description: 'Stream-by-stream process flow and complete mass/energy balance for FEED and basic design.' },
  { icon: FileText, title: 'Process Datasheets', description: 'Process-side equipment datasheets to ASME/IEC/client templates — no mechanical design.' },
  { icon: Zap, title: 'Utility Balance', description: 'Steam, cooling water, nitrogen, instrument air, and power consumption estimates.' },
  { icon: BookOpen, title: 'Design Basis Documents', description: 'Process design basis and narrative documentation covering parameters, standards, and operational philosophy.' },
  { icon: Activity, title: 'Aspen HYSYS / Plus Simulation', description: 'Steady-state and dynamic simulation for sizing, validation, debottlenecking, and optimization.' },
  { icon: Shield, title: 'HAZOP & Safety Reviews', description: 'HAZOP participation, worksheet preparation, action tracking, and P&ID mark-up support.' },
  { icon: ClipboardList, title: 'SOPs & Compliance Docs', description: 'Operating procedures, start-up/shutdown sequences, and compliance documentation.' },
  { icon: Search, title: 'Technical Bid Evaluations', description: 'Process-side review of vendor quotes and technical submissions with deviation lists.' },
];

export function Services() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-4">What We Do</p>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-brand-navy mb-5">
            Every deliverable, <em className="not-italic text-brand-purple">engineered with precision.</em>
          </h2>
          <p className="font-body text-base lg:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            We provide specialized process-only engineering services, structured around EPC project workflows and international standards.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={animatedItemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-white border border-neutral-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:border-l-2 hover:border-l-brand-purple transition-all duration-200"
              >
                <div className="w-10 h-10 bg-brand-purple-light rounded-xl flex items-center justify-center mb-4">
                  <Icon size={18} className="text-brand-purple" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-brand-navy mb-2 leading-snug">{service.title}</h3>
                <p className="font-body text-sm text-neutral-500 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </AnimatedSection>

        <AnimatedSection className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-body font-medium text-sm text-brand-purple hover:text-brand-violet transition-colors"
          >
            View all services →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
