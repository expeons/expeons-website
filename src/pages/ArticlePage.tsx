import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { getArticleBySlug, articles } from '../data/insights';
import type { ReactElement } from 'react';

function renderMarkdown(content: string): ReactElement[] {
  const lines = content.trim().split('\n');
  const elements: ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-heading font-bold text-2xl text-brand-navy mt-10 mb-4 pb-2 border-b border-neutral-200">
          {line.slice(3)}
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

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <section className="bg-white border-b border-neutral-200 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/insights" className="inline-flex items-center gap-2 font-body text-sm text-neutral-500 hover:text-brand-purple transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Insights
            </Link>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-body font-semibold bg-brand-purple-light text-brand-purple mb-5">
              {article.category}
            </span>
            <h1 className="font-heading font-bold text-3xl lg:text-5xl text-brand-navy mb-5 leading-tight">{article.title}</h1>
            <p className="font-body text-base lg:text-lg text-neutral-500 leading-relaxed mb-6">{article.excerpt}</p>
            <div className="flex items-center gap-5 text-sm text-neutral-400 font-body">
              <span className="flex items-center gap-1.5"><Clock size={14} />{article.readTime}</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            {renderMarkdown(article.content)}
          </div>

          {/* End CTA */}
          <div className="mt-16 p-8 bg-brand-purple rounded-2xl text-center">
            <h3 className="font-heading font-bold text-2xl text-white mb-3">Need process engineering support?</h3>
            <p className="font-body text-base text-white/70 mb-6">Share your project brief and we'll respond with a clear proposal within one business day.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-purple font-body font-medium text-sm rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Get in Touch →
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="font-heading font-semibold text-xl text-brand-navy mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link key={r.slug} to={`/insights/${r.slug}`} className="group block p-5 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-brand-purple transition-colors">
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
