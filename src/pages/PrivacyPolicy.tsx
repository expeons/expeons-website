import { motion } from 'framer-motion';

const lastUpdated = 'May 20, 2025';

const sections = [
  {
    title: '1. Who We Are',
    content: `Expeons is a precision process engineering consultancy operating across India, the UAE (Dubai), Kuwait, and Qatar. We provide engineering services including process design, simulation, HAZOP & safety reviews, and technical documentation to clients in the EPC, industrial, and energy sectors.

For the purposes of this Privacy Policy, "Expeons", "we", "us", or "our" refers to the Expeons entity you are engaging with. Our registered office is in India.

If you have any questions about this policy or how we handle your data, please contact us at: privacy@expeons.com`,
  },
  {
    title: '2. What Data We Collect',
    content: `We collect personal data only when you provide it voluntarily or when it is necessary to deliver our services. The categories of data we may collect include:

Contact & Inquiry Data — When you submit a project inquiry through our website, we collect your name, company name, work email address, phone number, project type, and the details of your message.

Communication Data — Records of any email, call, or written correspondence you have with us.

Technical Data — Standard web analytics data such as your approximate location (country/city level), browser type, device type, pages visited, and time spent on site. This data is collected in aggregate and is not linked to your identity.

We do not collect sensitive personal data (e.g. health information, financial account details, or government ID numbers) through this website.`,
  },
  {
    title: '3. How We Use Your Data',
    content: `We use the personal data we collect strictly for the following purposes:

• To respond to your project inquiries and send you a scoping proposal
• To communicate with you about an ongoing or potential engagement
• To send you relevant technical updates or insights if you have opted in
• To improve our website and understand how visitors engage with our content
• To comply with legal, regulatory, or contractual obligations

We do not use your data for unsolicited marketing, and we never sell, rent, or trade your personal information to third parties.`,
  },
  {
    title: '4. Legal Basis for Processing',
    content: `Where applicable (e.g. for users in the European Economic Area or jurisdictions with similar frameworks), we process your personal data on the following legal bases:

Legitimate Interests — Responding to project inquiries and communicating with prospective clients is in our mutual legitimate interest.

Consent — Where we send optional updates or insights, we rely on your opt-in consent, which you may withdraw at any time.

Contract — Where we have entered into a service agreement, we process data as necessary to perform that contract.

Legal Obligation — Where we are required to retain records by applicable law or regulation.`,
  },
  {
    title: '5. Data Sharing',
    content: `We do not sell your personal data. We may share it only in the following limited circumstances:

Service Providers — We use trusted third-party tools to operate our website and communications (e.g. analytics, email delivery, CRM). These providers process data strictly on our behalf and under confidentiality obligations.

Professional Advisors — We may share data with lawyers, accountants, or auditors as necessary to run our business.

Legal Requirements — We may disclose data if required by law, court order, or government authority.

Business Transfers — If Expeons is acquired, merged, or undergoes a restructuring, your data may be transferred as part of that transaction. You will be notified of any such change.

All third-party providers we use are required to maintain appropriate security standards and are not permitted to use your data for their own purposes.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law.

Project inquiry data — Retained for 2 years from the date of last contact, unless a contract was formed, in which case records are retained for 7 years from contract completion.

Website analytics — Retained in aggregated, anonymised form indefinitely.

Marketing communications data — Retained until you unsubscribe or request deletion.

When your data is no longer required, we securely delete or anonymise it.`,
  },
  {
    title: '7. Cookies',
    content: `Our website uses cookies and similar technologies to help us understand how visitors interact with our content. We use:

Essential Cookies — Necessary for the website to function correctly (e.g. security, session management). These cannot be disabled.

Analytics Cookies — Help us understand visitor behaviour in aggregate (e.g. which pages are most visited). No personally identifiable information is shared with analytics providers.

We do not use advertising or tracking cookies. You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect website functionality.`,
  },
  {
    title: '8. Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:

• Right to Access — Request a copy of the personal data we hold about you
• Right to Rectification — Ask us to correct inaccurate or incomplete data
• Right to Erasure — Request deletion of your data where there is no lawful reason for us to continue holding it
• Right to Restriction — Ask us to limit how we process your data in certain circumstances
• Right to Object — Object to processing based on legitimate interests
• Right to Portability — Request your data in a structured, commonly used format
• Right to Withdraw Consent — Where processing is based on consent, withdraw it at any time

To exercise any of these rights, please email us at privacy@expeons.com. We will respond within 30 days. We may need to verify your identity before processing requests.`,
  },
  {
    title: '9. Data Security',
    content: `We take the security of your personal data seriously. We implement appropriate technical and organisational measures to protect your data from unauthorised access, loss, or disclosure. These include:

• Encrypted data transmission (HTTPS/TLS) across our website
• Access controls limiting who within our team can access personal data
• Regular review of our data handling practices and third-party providers

No method of transmission over the internet is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security. In the event of a data breach that is likely to result in risk to your rights, we will notify you and the relevant supervisory authority as required by law.`,
  },
  {
    title: '10. International Transfers',
    content: `Expeons operates internationally and may transfer your data between our offices in India, the UAE, Kuwait, and Qatar. Where we use third-party service providers, your data may be processed in countries outside your own.

When transferring data internationally, we ensure appropriate safeguards are in place, such as standard contractual clauses or transfers to countries with adequate data protection frameworks.`,
  },
  {
    title: '11. Third-Party Links',
    content: `Our website may contain links to third-party websites (e.g. LinkedIn, partner organisations). This Privacy Policy applies only to our website. We are not responsible for the privacy practices of external sites and encourage you to review their policies before submitting any personal information.`,
  },
  {
    title: '12. Children\'s Privacy',
    content: `Our services are intended for businesses and professionals. We do not knowingly collect personal data from individuals under the age of 16. If you believe a minor has submitted data to us, please contact us and we will promptly delete it.`,
  },
  {
    title: '13. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make material changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: '14. Contact Us',
    content: `If you have any questions, concerns, or requests relating to this Privacy Policy or the way we handle your personal data, please contact us:

Email: privacy@expeons.com
General enquiries: hello@expeons.com

We aim to respond to all data-related requests within 30 days.`,
  },
];

export function PrivacyPolicy() {
  return (
    <div>
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
              Last updated: <span className="text-white/80">{lastUpdated}</span>
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
                    href={`#${s.title.replace(/\s+/g, '-').toLowerCase()}`}
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
                  At Expeons, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains what information we collect, why we collect it, how we use it, and what rights you have in relation to it. Please read it carefully before submitting any information through our website or engaging with our services.
                </p>
              </motion.div>

              {/* Sections */}
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  id={section.title.replace(/\s+/g, '-').toLowerCase()}
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
