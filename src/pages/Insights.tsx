import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Clock, Calendar } from 'lucide-react';
import { AnimatedSection, animatedItemVariants } from '../components/ui/AnimatedSection';
import { articles, categories } from '../data/insights';

const gradients = [
  'from-brand-navy to-brand-navy-mid',
  'from-brand-purple to-brand-violet',
  'from-neutral-700 to-neutral-800',
];

export function Insights() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      <Helmet>
        <title>Engineering Insights & Process Knowledge | Expeons</title>
        <meta name="description" content="Technical guides, simulation tips, and industry insights on process engineering, HYSYS, and EPC workflows." />
        <link rel="canonical" href="https://expeons.com/insights" />
      </Helmet>
      {/* Hero — gradient reaches top so transparent navbar sits over it */}
      <section className="hero-gradient pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body font-semibold tracking-widest uppercase text-xs text-white/60 mb-5">Engineering Notes</p>
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-white mb-5 max-w-3xl leading-tight">
              Process engineering <em className="not-italic text-brand-violet">insights,</em> written by engineers.
            </h1>
            <p className="font-body text-base lg:text-lg text-white/70 max-w-2xl leading-relaxed">
              Technical guides, EPC workflow breakdowns, simulation tips, and industry perspectives — designed to be genuinely useful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="bg-white sticky top-16 lg:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body font-medium text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-purple text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-neutral-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="font-body text-base text-neutral-500 text-center py-16">No articles in this category yet.</p>
          ) : (
            <div className="flex flex-col gap-10">
              {/* Featured Article */}
              {featured && (
                <AnimatedSection>
                  <Link to={`/insights/${featured.slug}`} className="group block">
                    <div className={`relative rounded-3xl bg-gradient-to-br ${gradients[0]} overflow-hidden p-10 lg:p-16 mb-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl`}>
                      <div className="absolute top-4 right-4 opacity-10">
                        <img src="/brand/symbol-white.png" alt="" aria-hidden="true" className="w-40" />
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-body font-semibold bg-white/10 text-white mb-4">
                        {featured.category}
                      </span>
                      <h2 className="font-heading font-bold text-2xl lg:text-4xl text-white mb-4 max-w-2xl group-hover:text-brand-violet transition-colors leading-snug">
                        {featured.title}
                      </h2>
                      <p className="font-body text-base text-white/70 max-w-xl leading-relaxed mb-6">{featured.excerpt}</p>
                      <div className="flex items-center gap-5 text-sm text-white/50 font-body">
                        <span className="flex items-center gap-1.5"><Clock size={14} />{featured.readTime}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} />{featured.date}</span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article, i) => (
                    <motion.div key={article.slug} variants={animatedItemVariants}>
                      <Link to={`/insights/${article.slug}`} className="group block h-full">
                        <div className={`rounded-3xl bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} h-44 mb-5 relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}>
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute bottom-4 left-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-body font-semibold bg-white/10 text-white">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-brand-navy group-hover:text-brand-purple transition-colors leading-snug mb-2">
                          {article.title}
                        </h3>
                        <p className="font-body text-sm text-neutral-500 leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-neutral-400 font-body">
                          <span className="flex items-center gap-1"><Clock size={12} />{article.readTime}</span>
                          <span className="flex items-center gap-1"><Calendar size={12} />{article.date}</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatedSection>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
