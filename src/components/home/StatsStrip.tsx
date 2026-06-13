import { AnimatedSection } from '../ui/AnimatedSection';

const stats = [
  { value: '10+', label: 'Years', sub: 'Combined EPC project experience' },
  { value: 'Large-Scale', label: '', sub: 'Refinery, petrochemical, fertilizer' },
  { value: '4', label: 'Packages', sub: 'From feasibility to HAZOP' },
  { value: "Int'l", label: 'Standards', sub: 'EPC-aligned deliverables' },
];

export function StatsStrip() {
  return (
    <section className="bg-white py-12 lg:py-16 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection stagger className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.sub}
              className="pl-4 border-l-2 border-brand-purple"
            >
              <div className="font-heading font-bold text-2xl lg:text-3xl text-brand-navy mb-1">
                {stat.value}{stat.label && <span className="text-lg ml-1 font-medium text-neutral-500">{stat.label}</span>}
              </div>
              <p className="font-body text-sm text-neutral-500 leading-snug">{stat.sub}</p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
