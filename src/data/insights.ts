import matter from 'gray-matter';

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  content: string;
}

// Vite feature to import all markdown files in a directory
const modules = import.meta.glob('../content/insights/*.md', { eager: true, query: '?raw', import: 'default' });

export const articles: Article[] = Object.keys(modules).map((path) => {
  const content = modules[path] as string;
  const { data, content: body } = matter(content);
  
  return {
    slug: data.slug || path.split('/').pop()?.replace('.md', '') || '',
    title: data.title,
    date: data.date,
    category: data.category,
    excerpt: data.excerpt,
    readTime: data.readTime,
    featured: data.featured || false,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    keywords: data.keywords,
    content: body,
  } as Article;
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const categories = ['All', 'Process Design', 'Simulation', 'EPC Workflows', 'Safety', 'Industry'];
