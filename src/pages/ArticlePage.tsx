import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getArticleBySlug, articles } from '../data/insights';
import { useState, useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';

function renderMarkdown(content: string): ReactElement[] {
  const lines = content.trim().split('\n');
  const elements: ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      const text = line.slice(3).trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      elements.push(
        <h2 key={i} id={id} className="font-heading font-bold text-2xl text-brand-navy mt-10 mb-4 pb-2 border-b border-neutral-200 scroll-mt-24">
          {text}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="font-heading font-semibold text-lg text-brand-navy mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('| ')) {
      // Table
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split('|').filter(Boolean).map((h) => h.trim());
      const rows = tableLines.slice(2).map((row) => row.split('|').filter(Boolean).map((c) => c.trim()));
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-brand-purple-light">
                {headers.map((h, hi) => (
                  <th key={hi} className="text-left px-4 py-3 font-heading font-semibold text-brand-navy border border-neutral-200 text-sm">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 font-body text-neutral-700 border border-neutral-200">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith('- **')) {
      // Bold list item
      const match = line.match(/^- \*\*(.+?)\*\* — (.+)$/);
      if (match) {
        elements.push(
          <li key={i} className="font-body text-base text-neutral-700 leading-relaxed">
            <span className="font-semibold text-brand-navy">{match[1]}</span> — {match[2]}
          </li>
        );
      } else {
        elements.push(<li key={i} className="font-body text-base text-neutral-700 leading-relaxed">{line.slice(2)}</li>);
      }
    } else if (line.startsWith('- ')) {
      // Collect list items
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-none flex flex-col gap-2 my-5 pl-4 border-l-2 border-brand-purple-light">
          {listItems.map((item, ii) => {
            const match = item.match(/^\*\*(.+?)\*\* — (.+)$/);
            if (match) {
              return (
                <li key={ii} className="font-body text-base text-neutral-700 leading-relaxed">
                  <span className="font-semibold text-brand-navy">{match[1]}</span> — {match[2]}
                </li>
              );
            }
            return (
              <li key={ii} className="font-body text-base text-neutral-700 leading-relaxed flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-2 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            );
          })}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      // Ordered list
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="flex flex-col gap-2 my-5 counter-reset-none">
          {listItems.map((item, ii) => (
            <li key={ii} className="font-body text-base text-neutral-700 leading-relaxed flex items-start gap-3">
              <span className="w-6 h-6 bg-brand-purple-light text-brand-purple rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">{ii + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      // Paragraph
      if (line.trim()) {
        const html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        elements.push(
          <p key={i} className="font-body text-base lg:text-lg text-neutral-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
    }

    i++;
  }

  return elements;
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? '');

  if (!article) return <Navigate to="/insights" replace />;

  const siteUrl = 'https://expeons.com'; // Replace with actual domain
  const articleUrl = `${siteUrl}/insights/${article.slug}`;
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  // Extract headings memoized
  const headings = useMemo(() => {
    return article.content
      .split('\n')
      .filter((line) => line.startsWith('## '))
      .map((line) => {
        const text = line.slice(3).trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return { text, id };
      });
  }, [article.content]);

  // Scroll spy active header tracking
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the heading that is intersecting closest to top of viewport
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // Sort by position or simply take the first matching entry
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px', // trigger when crossing navbar threshold
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [article.slug, headings]);

  const pageTitle = article.seoTitle ? `${article.seoTitle} | Expeons Insights` : `${article.title} | Expeons Insights`;
  const pageDescription = article.seoDescription || article.excerpt;

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {article.keywords && <meta name="keywords" content={article.keywords} />}
        <link rel="canonical" href={articleUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${siteUrl}/brand/logo-black.png`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={articleUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        
        {/* LLM Advantage: Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": pageTitle,
            "description": pageDescription,
            "keywords": article.keywords,
            "datePublished": article.date,
            "author": {
              "@type": "Organization",
              "name": "Expeons"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Expeons",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/brand/logo-black.png`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": articleUrl
            }
          })}
        </script>
      </Helmet>

      {/* Header — gradient reaches top so transparent navbar sits over it */}
      <section className="hero-gradient pt-28 pb-12 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <Link to="/insights" className="inline-flex items-center gap-2 font-body text-sm text-white/60 hover:text-white transition-colors">
                <ArrowLeft size={14} /> Back to Insights
              </Link>
            </div>
            <div className="mb-4">
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-white/60">
                {article.category}
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl lg:text-5xl text-white mb-5 leading-tight">{article.title}</h1>
            <p className="font-body text-base lg:text-lg text-white/70 leading-relaxed mb-6">{article.excerpt}</p>
            <div className="flex items-center gap-5 text-sm text-white/50 font-body">
              <span className="flex items-center gap-1.5"><Clock size={14} />{article.readTime}</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content grid containing side TOC card */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
            {/* Main content column */}
            <div className="max-w-3xl flex flex-col gap-5">
              {renderMarkdown(article.content)}

              {/* End CTA */}
              <div className="mt-16 p-8 bg-brand-purple rounded-3xl text-center">
                <h3 className="font-heading font-bold text-2xl text-white mb-3">Need process engineering support?</h3>
                <p className="font-body text-base text-white/70 mb-6">Share your project brief and we'll respond with a clear proposal within one business day.</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-purple font-body font-medium text-sm rounded-full hover:bg-neutral-100 transition-colors"
                >
                  Get in Touch →
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar card for Table of Contents (Scroll Spy) & Related */}
            <aside className="hidden lg:block sticky top-28 self-start w-full">
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm flex flex-col gap-8">
                {/* On this page */}
                {headings.length > 0 && (
                  <div>
                    <h3 className="font-heading font-bold text-sm text-brand-navy mb-4">On this page</h3>
                    <nav className="flex flex-col gap-3">
                      {headings.map((heading) => {
                        const active = activeId === heading.id;
                        return (
                          <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(heading.id);
                              if (el) {
                                el.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className={`font-body text-sm transition-all duration-200 block truncate ${
                              active
                                ? 'text-brand-purple font-semibold translate-x-1'
                                : 'text-neutral-500 hover:text-brand-purple'
                            }`}
                          >
                            {heading.text}
                          </a>
                        );
                      })}
                    </nav>
                  </div>
                )}

                {/* Related Articles */}
                {related.length > 0 && (
                  <div className="pt-6 border-t border-neutral-100">
                    <h3 className="font-heading font-bold text-sm text-brand-navy mb-4">Related</h3>
                    <div className="flex flex-col gap-4">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          to={`/insights/${r.slug}`}
                          className="group block"
                        >
                          <h4 className="font-heading font-medium text-sm text-neutral-600 group-hover:text-brand-purple transition-colors leading-snug">
                            {r.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Bottom Related Articles (Visible on mobile/tablet, hidden on desktop sidebar) */}
          {related.length > 0 && (
            <div className="mt-16 lg:hidden border-t border-neutral-200 pt-12">
              <h3 className="font-heading font-semibold text-xl text-brand-navy mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link key={r.slug} to={`/insights/${r.slug}`} className="group block p-5 bg-neutral-50 rounded-3xl border border-neutral-200 hover:border-brand-purple transition-colors">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-body font-semibold bg-brand-purple-light text-brand-purple mb-3">
                      {r.category}
                    </span>
                    <h4 className="font-heading font-semibold text-base text-brand-navy group-hover:text-brand-purple transition-colors leading-snug mb-2">{r.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 font-body">
                      <span className="flex items-center gap-1"><Clock size={11} />{r.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
