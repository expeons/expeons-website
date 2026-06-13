import { Helmet } from 'react-helmet-async';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'General Documents',
    items: [
      { name: 'Process Design Basis', description: 'Governing technical rules and assumptions for the project.' },
      { name: 'Process Descriptions', description: 'Narrative overview of process units and operating sequences.' },
      { name: 'Operating and Control Philosophy', description: 'Guidelines for plant automation and operator intervention.' },
      { name: 'Shutdown Philosophy', description: 'Logic and levels for emergency and planned plant shutdowns.' },
      { name: 'Relief and Blow down Philosophy', description: 'Governing principles for overpressure protection and depressurization.' },
      { name: 'Pre-commissioning and Commissioning philosophy', description: 'Strategic approach to plant startup and testing.' },
      { name: 'Isolation & Sparing Philosophy', description: 'Rules for equipment redundancy and maintenance isolation.' },
      { name: 'Vent and drain philosophy', description: 'Management of process fluids during maintenance and upset.' },
      { name: 'Plant Operating Manual', description: 'Step-by-step procedures for start-up, normal operation, and shutdown.' },
    ]
  },
  {
    title: 'Process Studies',
    items: [
      { name: 'Process Simulations', description: 'Steady-state and dynamic modeling using Aspen HYSYS/Plus.' },
      { name: 'Equipment Sizing', description: 'Rigorous calculations for vessels, separators, and tanks.' },
      { name: 'Heat Exchanger Design', description: 'Thermal design and rating of shell-and-tube or plate exchangers.' },
      { name: 'Line Sizing Calculations', description: 'Hydraulic analysis ensuring optimal pressure drop and velocity.' },
      { name: 'Flare & Depressurization studies', description: 'Rigorous analysis of emergency blowdown scenarios.' },
      { name: 'NPSH Calculations', description: 'Net Positive Suction Head verification for all pump systems.' },
      { name: 'Blow down valve and Relief valve sizing', description: 'Calculation of required orifice areas for safety valves.' },
      { name: 'Heat and Material Balance', description: 'Precise thermodynamic stream-by-stream data.' },
      { name: 'Utility Balance', description: 'Consumption estimates for steam, water, air, and power.' },
    ]
  },
  {
    title: 'Drawings',
    items: [
      { name: 'Process Flow Diagrams', description: 'Main process streams and primary control loops.' },
      { name: 'P&IDs', description: 'Detailed piping, instrumentation, and mechanical design.' },
      { name: 'Material selection diagram', description: 'Corrosion-based mapping of metallurgy requirements.' },
      { name: 'Process Safety Flow Schemes', description: 'Diagrams highlighting safety critical elements and barriers.' },
    ]
  },
  {
    title: 'Data Sheets & Reports',
    items: [
      { name: 'Cause & Effect Diagram (ESD)', description: 'Logic matrix connecting plant sensors to final elements.' },
      { name: 'Process Equipment Data Sheets', description: 'Process specifications for all engineered equipment.' },
      { name: 'Equipment List', description: 'Master registry of all mechanical items in the unit.' },
      { name: 'Line List', description: 'Comprehensive registry of all process and utility piping.' },
      { name: 'Tie-in List', description: 'Management of battery limit connections to existing facilities.' },
      { name: 'HAZOP close out report', description: 'Formal documentation of safety action resolution.' },
      { name: 'Technical Bid Evaluations', description: 'Process-side review of vendor document submissions.' },
    ]
  }
];

export function Services() {
  return (
    <div>
      <Helmet>
        <title>Process Engineering Deliverables | Expeons Matrix</title>
        <meta name="description" content="Exhaustive list of process engineering deliverables including P&IDs, Simulations, Philosophies, and Datasheets for EPC compliance." />
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
            <p className="font-body font-semibold tracking-widest uppercase text-xs text-white/60 mb-6">Our Matrix</p>
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-white leading-tight mb-6">
              Tailored process engineering deliverables built in compliance with International Standards & EPC Requirements.
            </h1>
            <p className="font-body text-base lg:text-lg text-white/70 leading-relaxed">
              We provide process-only engineering support across the full project lifecycle — from conceptual stage to detailed design, safety review, and documentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Matrix */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {categories.map((category) => (
              <AnimatedSection key={category.title} className="flex flex-col gap-8">
                <div>
                  <div className="w-12 h-1 bg-brand-purple mb-4 rounded-full" />
                  <h2 className="font-heading font-bold text-xl text-brand-navy uppercase tracking-tight">
                    {category.title}
                  </h2>
                </div>
                
                <div className="flex flex-col gap-6">
                  {category.items.map((item) => (
                    <div key={item.name} className="group">
                      <h3 className="font-heading font-bold text-sm text-brand-navy mb-1.5 group-hover:text-brand-purple transition-colors">
                        {item.name}
                      </h3>
                      <p className="font-body text-xs text-neutral-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-neutral-50 py-16 lg:py-20">
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
