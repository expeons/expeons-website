import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const lastUpdated = 'June 13, 2026';

const sections = [
  {
    title: '1. Company Information',
    content: `Expeons is a process design and engineering consultancy company incorporated and operating in India, providing engineering, process design, technical consulting, feasibility studies, project support, and related professional services.`,
  },
  {
    title: '2. Scope of Services',
    content: `• Process design engineering services
• Process simulations and calculations
• Feasibility studies
• Engineering consulting
• Technical documentation
• Project engineering support
• Process optimization services
• Training and technical advisory services`,
  },
  {
    title: '3. Professional Services',
    content: `All engineering services are provided based on information supplied by clients and accepted engineering standards and practices. We apply rigorous internal quality controls to all deliverables, but the final implementation and operational safety remain the responsibility of the plant owner/operator.`,
  },
  {
    title: '4. Client Responsibilities',
    content: `Clients agree to provide accurate information, technical data, review deliverables in a timely manner, obtain necessary local approvals, and comply with all relevant safety and environmental regulations. Expeons is not responsible for errors resulting from inaccurate or incomplete data provided by the client.`,
  },
  {
    title: '5. Fees and Payments',
    content: `Fees shall be specified in formal proposals or service agreements and paid within the agreed timelines. Late payments may result in a suspension of services or the withholding of deliverables until the account is settled.`,
  },
  {
    title: '6. Intellectual Property Rights',
    content: `All intellectual property developed by Expeons, including simulation models, templates, and proprietary methodologies, remains the property of Expeons unless assigned to the client in writing through a specific project agreement. Clients are granted a license to use deliverables specifically produced for their project.`,
  },
  {
    title: '7. Confidentiality',
    content: `Both parties agree to maintain strict confidentiality of proprietary and business information shared during the course of an engagement. This obligation survives the termination of any individual service agreement.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `Expeons shall not be liable for indirect, incidental, consequential, special, or punitive damages, including loss of profits, revenue, data, or use, incurred by the client or any third party, whether in an action in contract or tort, even if advised of the possibility of such damages.`,
  },
  {
    title: '9. Disclaimer',
    content: `Expeons does not guarantee commercial success, specific regulatory approvals, market performance, or specific operational outcomes. Engineering is an iterative process based on variables and assumptions that may change during project execution.`,
  },
  {
    title: '10. Third-Party Materials',
    content: `Ownership of third-party materials (such as licensed software components or standardized industry data) remains with their respective owners and is subject to their own licensing terms.`,
  },
  {
    title: '11. Website Usage',
    content: `Users shall not violate laws, gain unauthorized access to our systems, introduce malware, or copy/distribute website content without our express written permission.`,
  },
  {
    title: '12. Termination',
    content: `Either party may terminate an engagement according to the specific termination clauses outlined in the applicable service agreement. Upon termination, the client shall pay for all services rendered up to the termination date.`,
  },
  {
    title: '13. Force Majeure',
    content: `Expeons shall not be liable for delays or failures in performance caused by events beyond our reasonable control, including natural disasters, strikes, pandemic-related restrictions, or failures in telecommunications infrastructure.`,
  },
  {
    title: '14. Governing Law',
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.`,
  },
  {
    title: '15. Amendments',
    content: `Expeons reserves the right to modify these Terms and Conditions at any time. The most current version will always be posted on our website.`,
  },
];

export function TermsAndConditions() {
  return (
    <div>
      <Helmet>
        <title>Terms and Conditions | Expeons</title>
        <meta name="description" content="Review the Expeons Terms and Conditions governing our engineering services and website usage." />
        <link rel="canonical" href="https://expeons.com/terms" />
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
              Terms and Conditions
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

            {/* Content */}
            <article className="flex flex-col gap-12">
              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 bg-brand-purple-light/30 rounded-3xl border border-brand-purple/10"
              >
                <p className="font-body text-sm text-neutral-700 leading-relaxed">
                  Welcome to Expeons ("Company", "we", "our", or "us"). These Terms and Conditions govern your access to and use of our website, services, and any related communications. By accessing our website or engaging our services, you agree to be bound by these Terms and Conditions.
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
              <div className="pt-8 border-t border-neutral-100 text-center lg:text-left">
                <p className="font-body text-sm text-neutral-500 mb-2">
                  <strong>Contact Information</strong>
                </p>
                <p className="font-body text-xs text-neutral-400 leading-relaxed">
                  Expeons Engineering<br />
                  Email: info@expeons.com<br />
                  Website: www.expeons.com
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
