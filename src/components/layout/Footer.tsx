import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 pb-12 border-b border-white/10">
          <div className="flex flex-col gap-3">
            <img src="/brand/logo-white.png" alt="Expeons" className="h-7 w-auto self-start" />
            <p className="font-body text-sm text-white/60 uppercase tracking-widest">Precision Process Engineering</p>
          </div>
          <p className="font-body text-sm text-white/50 lg:text-right max-w-sm leading-relaxed">
            Engineering Connections.<br />
            Optimizing Processes.<br />
            Delivering Impact.
          </p>
        </div>

        {/* Row 2 - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 pb-12 border-b border-white/10">
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {['Process Design', 'Simulation', 'HAZOP & Safety', 'Packages'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="font-body text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/about" className="font-body text-sm text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/about#process" className="font-body text-sm text-white/70 hover:text-white transition-colors">Our Process</Link></li>
              <li><Link to="/insights" className="font-body text-sm text-white/70 hover:text-white transition-colors">Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">Contact</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="mailto:hello@expeons.com" className="font-body text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={14} />
                  hello@expeons.com
                </a>
              </li>
              <li>
                <Link to="/contact" className="font-body text-sm text-white/70 hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <ExternalLink size={14} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="font-body text-xs text-white/40">
            © 2025 Expeons. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <p className="font-body text-xs text-white/40">
              Registered in India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
