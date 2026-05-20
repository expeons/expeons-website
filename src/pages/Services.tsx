import { GitBranch, FileText, Zap, BookOpen, Activity, Shield, ClipboardList, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface ServiceDetail {
  icon: LucideIcon;
  title: string;
  description: string[];
  deliverables: string[];
  tools: string[];
}

const serviceDetails: ServiceDetail[] = [
  {
    icon: GitBranch,
    title: 'PFDs & Heat-Mass Balance',
    description: [
      'The Process Flow Diagram and Heat & Mass Balance are the foundational deliverables of any process design. We develop stream-by-stream process flows with complete thermodynamic data — temperatures, pressures, compositions, flowrates, and enthalpies — for all streams including utilities.',
      'Our H&MBs are built on rigorous simulation using Aspen HYSYS or Aspen Plus, then formatted to match client or EPC contractor templates. Every deliverable is checked for mass balance closure, phase consistency, and stream traceability against the PFD.',
    ],
    deliverables: ['Process Flow Diagram (PFD)', 'Stream tables (normal and design case)', 'Heat and mass balance spreadsheets', 'Equipment block diagram'],
    tools: ['Aspen HYSYS', 'Aspen Plus', 'ISO 10628', 'Client PFD templates'],
  },
  {
    icon: FileText,
    title: 'Process Datasheets',
    description: [
      'Process datasheets define the process-side operating conditions and requirements for each piece of equipment. We provide process inputs to the mechanical specification — without crossing into mechanical, structural, or civil disciplines.',
      'Our datasheets cover all process-side parameters: temperatures, pressures, flowrates, compositions, physical properties, and operating cases. Formatted to ASME, IEC, or client-specific templates.',
    ],
    deliverables: ['Heat exchanger datasheets', 'Vessel and separator datasheets', 'Pump and compressor datasheets', 'Fired heater process datasheets'],
    tools: ['ASME templates', 'IEC standards', 'DEP standards', 'Client-specific formats'],
  },
  {
    icon: Zap,
    title: 'Utility Balance',
    description: [
      'An accurate utility balance ensures the site utility systems — steam, cooling water, nitrogen, instrument air, and electrical power — are correctly sized from day one. Under-designed utility systems are one of the most common causes of operational constraints.',
      'We prepare comprehensive utility consumption summaries by unit operation, across operating cases, with clear identification of instantaneous peaks and average loads.',
    ],
    deliverables: ['Utility summary tables by unit', 'Instantaneous and average load estimates', 'Utility flow diagrams', 'Steam balance diagrams'],
    tools: ['Aspen HYSYS', 'Excel utility balance templates', 'ISO 15519'],
  },
  {
    icon: BookOpen,
    title: 'Design Basis Documents',
    description: [
      'The Process Design Basis sets the governing rules for process engineering across the project. It documents design parameters, applicable standards, operational philosophy, and the technical assumptions underpinning all process calculations.',
      'A well-structured design basis reduces review cycles by making assumptions explicit, traceable, and defensible. It is the first document a client project team reviews — and the one they return to throughout the project.',
    ],
    deliverables: ['Process Design Basis document', 'Design parameter summaries', 'Standards and codes register', 'Operational philosophy narrative'],
    tools: ['ISO 15519', 'IEC 61511', 'API standards', 'Client engineering specifications'],
  },
  {
    icon: Activity,
    title: 'Aspen HYSYS / Plus Simulation',
    description: [
      'Process simulation is the computational core of modern process engineering. We build steady-state and dynamic simulation models for sizing, design validation, debottlenecking studies, and optimization work.',
      'Models are built to be transferable — documented with clear assumptions, fluid package selection rationale, and stream cross-reference tables. Clients receive both the simulation files and a written summary of results.',
    ],
    deliverables: ['HYSYS or Aspen Plus simulation files', 'Simulation summary report', 'Sensitivity analysis results', 'Dynamic simulation results (where applicable)'],
    tools: ['Aspen HYSYS V12+', 'Aspen Plus V12+', 'Peng-Robinson EOS', 'NRTL / UNIQUAC / ELECNRTL'],
  },
  {
    icon: Shield,
    title: 'HAZOP & Safety Reviews',
    description: [
      'We provide process engineering support for HAZOP studies — from preparation through participation to action close-out. Our role is to ensure the process engineering input is rigorous, the P&IDs are complete, and the action register captures every relevant finding.',
      'We also support Layer of Protection Analysis (LOPA), Safety Integrity Level (SIL) determination, and process safety documentation for operating plants.',
    ],
    deliverables: ['HAZOP worksheets', 'P&ID mark-up for HAZOP actions', 'Action register with risk rankings', 'Cause and effect matrix support'],
    tools: ['IEC 61882', 'IEC 61511', 'HAZOP software (PHAPro, SitePro)', 'LOPA methodology'],
  },
  {
    icon: ClipboardList,
    title: 'SOPs & Compliance Docs',
    description: [
      'Operating procedures are a regulatory requirement and an operational tool. We develop start-up, normal operation, shutdown, and emergency procedures that are clear, step-by-step, and tied directly to the P&ID.',
      'We also prepare compliance documentation for environmental permits, process safety management (PSM), and pre-startup safety reviews (PSSR).',
    ],
    deliverables: ['Normal operating procedures', 'Start-up and shutdown sequences', 'Emergency procedures', 'PSM documentation'],
    tools: ['IEC 61511', 'OSHA PSM (29 CFR 1910.119)', 'COMAH regulations', 'Client SOP templates'],
  },
  {
    icon: Search,
    title: 'Technical Bid Evaluations',
    description: [
      'When vendors submit technical proposals, someone needs to review them against the process requirements. We provide process-side technical bid evaluation — reviewing vendor datasheets, process performance guarantees, and technical deviations.',
      'Our evaluations produce a structured deviation list that makes the gaps between vendor offer and process requirement explicit. No hidden technical risk.',
    ],
    deliverables: ['Technical bid evaluation report', 'Vendor deviation list', 'Technical comparison matrix', 'Recommendation memo'],
    tools: ['Vendor datasheet review', 'Process guarantee verification', 'ASME/IEC standard compliance check'],
  },
];

export function Services() {
  return (
    <div>
      <Helmet>
        <title>Process Engineering Services | Expeons</title>
        <meta name="description" content="Specialized process engineering deliverables including PFDs, Heat & Mass Balance, Simulation, and Safety Reviews for EPC projects." />
        <link rel="canonical" href="https://expeons.com/services" />
      </Helmet>
      {/* Hero — gradient reaches top so transparent navbar sits over it */}
      <section className="relative hero-gradient overflow-hidden pt-40 pb-24 lg:pt-56 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-body font-semibold tracking-widest uppercase text-xs text-white/60 mb-6">What We Offer</p>
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-white leading-tight mb-6">
              Specialized process engineering deliverables,{' '}
              <em className="not-italic text-brand-violet">built for EPC standards.</em>
            </h1>
            <p className="font-body text-base lg:text-lg text-white/70 leading-relaxed">
              We provide process-only engineering support across the full project lifecycle — from concept through to detailed design, safety review, and documentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-20 lg:gap-28">
            {serviceDetails.map((service, i) => {
              const Icon = service.icon;
              const isEven = i % 2 === 0;
              return (
                <AnimatedSection key={service.title} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  {/* Text */}
                  <div>
                    <div className="mb-6 text-brand-purple">
                      <Icon size={32} />
                    </div>
                    <h2 className="font-heading font-bold text-3xl text-brand-navy mb-5">{service.title}</h2>
                    {service.description.map((para, j) => (
                      <p key={j} className="font-body text-base text-neutral-600 leading-relaxed mb-4">{para}</p>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-6">
                    <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-200">
                      <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-neutral-400 mb-4">Typical Deliverables</h4>
                      <ul className="flex flex-col gap-2.5">
                        {service.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-2 flex-shrink-0" />
                            <span className="font-body text-sm text-neutral-700">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-neutral-400 mb-3">Standards & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.tools.map((tool) => (
                          <span key={tool} className="font-body text-xs bg-brand-purple-light text-brand-purple px-3 py-1.5 rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-neutral-50 py-16 lg:py-20 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-brand-navy mb-4">
              Need a specific service? Let's scope it together.
            </h2>
            <p className="font-body text-base text-neutral-500 mb-8">Tell us about your project and we'll put together a clear scope and proposal.</p>
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
