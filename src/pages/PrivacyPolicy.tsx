import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const lastUpdated = 'June 13, 2026';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect the following information when you interact with our website or services:
• Full name
• Email address
• Phone number
• Company or organization details
• Project-related information submitted through our website, email, or other communications`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect strictly for the following purposes:
• Provide engineering, consulting, and project support services
• Respond to inquiries and requests
• Prepare proposals, quotations, and project documentation
• Improve our services, website, and customer experience
• Communicate with clients, partners, and prospective customers
• Comply with applicable legal and regulatory requirements`,
  },
  {
    title: '3. Data Protection',
    content: `We implement appropriate technical and organizational measures to safeguard personal information against unauthorized access, disclosure, alteration, loss, or misuse. While we strive to protect your information, no method of transmission or storage is completely secure.`,
  },
  {
    title: '4. Information Sharing',
    content: `Expeons does not sell, rent, or trade personal information to third parties.

We may share information only:
• When required by applicable laws, regulations, or legal processes
• With trusted service providers who assist in operating our business and services, subject to confidentiality obligations`,
  },
  {
    title: '5. Cookies and Analytics',
    content: `Our website may use cookies and analytics tools to enhance user experience, analyze website performance, and improve our services. You may choose to disable cookies through your browser settings; however, some website features may not function properly.`,
  },
  {
    title: '6. Your Rights',
    content: `You may request access to, correction of, or deletion of your personal information by contacting us. We will respond to such requests in accordance with applicable laws.`,
  },
  {
    title: '7. Policy Updates',
    content: `We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date.`,
  },
  {
    title: '8. Contact Us',
    content: `If you have any questions, concerns, or requests relating to this Privacy Policy or the way we handle your personal data, please contact us:

Expeons
Email: info@expeons.com`,
  },
];

export function PrivacyPolicy() {
  return (
    <div>
      <Helmet>
        <title>Privacy Policy | Expeons</title>
        <meta name="description" content="Read the Expeons Privacy Policy to understand how we handle your data and protect your privacy." />
        <link rel="canonical" href="https://expeons.com/privacy" />
      </Helmet>
      {/* Hero */}
      <section className="hero-gradient pt-36 pb-16 lg:pt-48 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="font-body font-semibold tracking-widest uppercase text-xs text-white/60 mb-5">Legal</p>
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-5 leading-tight">
              Privacy Policy
            </h1>
            <p className="font-body text-base text-white/60">
              Effective Date: <span className="text-white/80">{lastUpdated}</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-16 items-start">

            {/* Sticky sidebar — section index */}
            <aside className="hidden lg:block sticky top-28">
              <p className="font-body font-semibold tracking-widest uppercase text-xs text-neutral-400 mb-4">Sections</p>
              <nav className="flex flex-col gap-1">
                {sections.map((s) => (
                  <a
                    key={s.title}
                    href={`#${s.title.replace(/[\.\s]+/g, '-').toLowerCase()}`}
                    className="font-body text-sm text-neutral-500 hover:text-brand-purple transition-colors py-1 leading-snug"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Policy content */}
            <article className="flex flex-col gap-12">
              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 bg-brand-purple-light/30 rounded-3xl border border-brand-purple/10"
              >
                <p className="font-body text-sm text-neutral-700 leading-relaxed">
                  At Expeons, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website, services, and communications.
                </p>
              </motion.div>

              {/* Sections */}
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  id={section.title.replace(/[\.\s]+/g, '-').toLowerCase()}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="scroll-mt-28"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-brand-purple rounded-full flex-shrink-0" />
                    <h2 className="font-heading font-bold text-xl text-brand-navy">{section.title}</h2>
                  </div>
                  <div className="pl-4 border-l border-neutral-100">
                    {section.content.split('\n\n').map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-body text-sm text-neutral-600 leading-relaxed mb-4 last:mb-0 whitespace-pre-line"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Bottom note */}
              <div className="pt-8 border-t border-neutral-100">
                <p className="font-body text-xs text-neutral-400 leading-relaxed">
                  This Privacy Policy was last reviewed and updated on {lastUpdated}. For the most current version, please visit this page on our website.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
