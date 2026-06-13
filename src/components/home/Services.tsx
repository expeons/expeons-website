import { motion } from 'framer-motion';
import { GitBranch, FileText, BookOpen, Activity, Shield, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection, animatedItemVariants } from '../ui/AnimatedSection';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  { 
    icon: Activity, 
    title: 'Process Studies & Simulation', 
    description: 'Rigorous heat & mass balances, utility summaries, and steady-state/dynamic simulation for plant optimization.' 
  },
  { 
    icon: GitBranch, 
    title: 'Detailed Engineering Drawings', 
    description: 'Professional P&IDs, material selection diagrams, and process flow schemes built to international ISO/API standards.' 
  },
  { 
    icon: BookOpen, 
    title: 'Operational Philosophies', 
    description: 'Comprehensive design basis, shutdown narratives, and control philosophies that set the project governing rules.' 
  },
  { 
    icon: Shield, 
    title: 'Safety & Relief Systems', 
    description: 'Expert HAZOP support, flare depressurization studies, and relief valve sizing for zero-compromise safety.' 
  },
  { 
    icon: FileText, 
    title: 'Equipment Design & Specs', 
    description: 'Precise process-side datasheets and heat exchanger design ensuring accurate vendor procurement.' 
  },
  { 
    icon: Search, 
    title: 'Vendor Review & Procurement', 
    description: 'In-depth technical bid evaluations and vendor document reviews to eliminate project technical risk.' 
  },
];

export function Services() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-4">What We Do</p>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-brand-navy mb-5">
            Engineering solutions, <em className="not-italic text-brand-purple">delivered with expertise.</em>
          </h2>
          <p className="font-body text-base lg:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            We provide specialized process engineering support across the full project lifecycle, from conceptual design to detailed execution.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={animatedItemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-white rounded-3xl p-6 cursor-pointer hover:shadow-xl hover:border-l-2 hover:border-l-brand-purple transition-all duration-200 shadow-sm"
              >
                <div className="mb-4 text-brand-purple">
                  <Icon size={28} />
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
