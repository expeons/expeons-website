import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // All pages now have a dark hero-gradient at the top, so the navbar
  // should always be transparent until the user scrolls past it.
  const isDark = true;

  useEffect(() => {
    // Reset to transparent immediately on every route change —
    // without this, navigating while scrolled keeps the white bg on the new page
    setScrolled(false);
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    // Don't call handler() immediately — the route-change reset above is authoritative.
    // The listener will update naturally once the user scrolls.
    return () => window.removeEventListener('scroll', handler);
  }, [location.pathname]);

  const transparent = isDark && !scrolled;
  const isHomePage = location.pathname === '/';
  const shouldHideNavbar = isHomePage && !scrolled;

  return (
    <header
      className={`fixed top-4 left-4 right-4 lg:top-6 lg:left-8 lg:right-8 z-50 rounded-2xl transition-all duration-500 ${
        shouldHideNavbar
          ? 'opacity-0 pointer-events-none -translate-y-14'
          : 'opacity-100 pointer-events-auto'
      } ${
        transparent
          ? 'bg-transparent border border-transparent'
          : 'bg-white/90 backdrop-blur-md shadow-lg border border-neutral-200/50'
      }`}
    >
      <nav className="w-full px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={transparent ? '/brand/logo-white.png' : '/brand/logo-black.png'}
            alt="Expeons"
            className="h-7 lg:h-8 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = location.pathname === link.href || location.pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body font-medium text-sm transition-colors relative pb-0.5 ${
                  transparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-neutral-700 hover:text-brand-purple'
                } ${active ? (transparent ? 'text-white' : 'text-brand-purple') : ''}`}
              >
                {link.label}
                {active && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${transparent ? 'bg-white' : 'bg-brand-purple'}`} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2.5 bg-brand-purple text-white font-body font-medium text-sm rounded-full hover:bg-brand-violet transition-colors duration-200"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            transparent ? 'text-white hover:bg-white/10' : 'text-neutral-700 hover:bg-neutral-100'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden rounded-b-2xl"
          >
            <div className="w-full px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`font-body font-medium text-base py-2 border-b border-neutral-100 transition-colors ${
                      active ? 'text-brand-purple' : 'text-neutral-700 hover:text-brand-purple'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="mt-2 inline-flex items-center justify-center px-5 py-3 bg-brand-purple text-white font-body font-medium text-sm rounded-full hover:bg-brand-violet transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
