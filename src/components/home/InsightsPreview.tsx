import { Link } from 'react-router-dom';
import { AnimatedSection, animatedItemVariants } from '../ui/AnimatedSection';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Clock, Calendar } from 'lucide-react';

const articles = [
  {
    slug: 'heat-mass-balance-guide',
    title: 'What Goes Into a Heat & Mass Balance Sheet',
    category: 'Process Design',
    excerpt: 'A heat and mass balance is one of the most fundamental process engineering deliverables. Here\'s what it contains, how it\'s built, and what EPC teams use it for.',
    readTime: '7 min read',
    date: 'May 1, 2025',
    featured: true,
    gradient: 'from-brand-navy to-brand-navy-mid',
  },
  {
    slug: 'hysys-vs-aspen-plus',
    title: 'Aspen HYSYS vs Aspen Plus: Which Should You Use?',
    category: 'Simulation',
    excerpt: 'The core difference, when to use each, and a practical recommendation by project type.',
    readTime: '5 min read',
    date: 'May 8, 2025',
    gradient: 'from-brand-purple to-brand-violet',
  },
  {
    slug: 'hazop-study-explained',
    title: 'How a HAZOP Study Works: A Process Engineer\'s Guide',
    category: 'Safety',
    excerpt: 'From guide words to worksheet structure — a complete walkthrough of the HAZOP process.',
    readTime: '8 min read',
    date: 'May 15, 2025',
    gradient: 'from-neutral-700 to-neutral-800',
  },
];

export function InsightsPreview() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="bg-neutral-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-16">
          <div>
            <p className="font-body font-semibold tracking-widest uppercase text-xs text-brand-purple mb-4">Insights</p>
            <h2 className="font-heading font-bold text-3xl lg:text-5xl text-brand-navy">
              Engineering <em className="not-italic text-brand-purple">insights</em> from the process floor.
            </h2>
          </div>
          <Link to="/insights" className="flex-shrink-0 font-body font-medium text-sm text-brand-purple hover:text-brand-violet transition-colors">
            View All Insights →
          </Link>
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Featured */}
          <motion.div variants={animatedItemVariants}>
            <Link to={`/insights/${featured.slug}`} className="group block h-full">
              <div className={`relative rounded-3xl bg-gradient-to-br ${featured.gradient} overflow-hidden h-72 lg:h-80 mb-5 flex items-end p-8`}>
                <div className="absolute inset-0 opacity-20">
                  <img src="/brand/symbol-blue.png" alt="" aria-hidden="true" className="absolute bottom-4 right-4 w-32 opacity-20" />
                </div>
                <div className="relative">
                  <Badge variant="navy" className="mb-3 bg-white/10 text-white border-0">{featured.category}</Badge>
                  <h3 className="font-heading font-bold text-xl lg:text-2xl text-white leading-snug group-hover:text-brand-violet transition-colors">
                    {featured.title}
                  </h3>
                </div>
              </div>
              <p className="font-body text-base text-neutral-600 leading-relaxed mb-3">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-neutral-400 font-body">
                <span className="flex items-center gap-1"><Clock size={12} />{featured.readTime}</span>
                <span className="flex items-center gap-1"><Calendar size={12} />{featured.date}</span>
              </div>
            </Link>
          </motion.div>

          {/* Smaller cards */}
          <div className="flex flex-col gap-6">
            {rest.map((article) => (
              <motion.div key={article.slug} variants={animatedItemVariants}>
                <Link to={`/insights/${article.slug}`} className="group block">
                  <div className={`relative rounded-3xl bg-gradient-to-br ${article.gradient} overflow-hidden h-36 mb-4`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="navy" className="bg-white/10 text-white border-0 text-xs">{article.category}</Badge>
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-base text-brand-navy group-hover:text-brand-purple transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 font-body">
                    <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} />{article.date}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
