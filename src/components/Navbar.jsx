import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Compass, PhoneCall } from 'lucide-react';
import { navLinks, resortInfo } from '../data/resortData';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['hero', 'about', 'rooms', 'pool', 'dining', 'wellness', 'family', 'experiences', 'facilities', 'gallery', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3 shadow-lg shadow-black/20'
            : 'bg-gradient-to-b from-charcoal-950/85 via-charcoal-950/40 to-transparent py-4 sm:py-6'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 lg:gap-4">
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#hero');
                }}
                className="group flex flex-col items-start focus:outline-none"
              >
                <span className="font-serif text-base sm:text-xl xl:text-2xl tracking-[0.2em] sm:tracking-[0.25em] text-cream-50 font-light group-hover:text-gold-300 transition-colors uppercase whitespace-nowrap">
                  {resortInfo.brandName}
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold-400/90 font-medium -mt-0.5 whitespace-nowrap">
                  {resortInfo.brandSubtitle}
                </span>
              </a>
            </div>

            {/* Center: Desktop Navigation Links (Centered) */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4 space-x-0.5 xl:space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-1.5 xl:px-2.5 py-1 text-[11px] xl:text-[12px] uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                      isActive
                        ? 'text-gold-300 font-medium'
                        : 'text-cream-100/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-1.5 right-1.5 xl:left-2 xl:right-2 h-[1.5px] bg-gold-400"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Action Button */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              <button
                onClick={onOpenBooking}
                className="group relative inline-flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-full overflow-hidden text-xs uppercase tracking-widest font-semibold bg-gold-500 hover:bg-gold-400 text-charcoal-950 shadow-md shadow-gold-500/20 transition-all duration-300 hover:shadow-gold-500/30 whitespace-nowrap"
              >
                <span className="font-serif font-bold text-sm leading-none transition-transform group-hover:scale-110">₹</span>
                <span>Book Your Stay</span>
              </button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gold-500 text-charcoal-950 text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap"
              >
                <span className="font-bold">₹</span>
                <span>Book</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                className="p-2 rounded-lg text-cream-100 hover:text-gold-300 hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Fullscreen Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden bg-charcoal-950/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-serif text-xl tracking-[0.25em] text-cream-50">
                  {resortInfo.brandName}
                </span>
                <p className="text-[9px] tracking-[0.3em] uppercase text-gold-400">
                  {resortInfo.brandSubtitle}
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
                className="p-2 rounded-full bg-white/10 text-white hover:text-gold-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation List */}
            <nav className="flex flex-col space-y-3 py-6">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-serif text-xl sm:text-2xl text-cream-100 hover:text-gold-400 transition-colors py-1 flex items-center justify-between border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-sans text-gold-400/60 font-light">
                    0{idx + 1}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Bottom Actions inside Mobile Menu */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-widest shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span className="font-serif font-bold text-base leading-none">₹</span>
                <span>Book Your Stay</span>
              </button>
              <div className="text-center text-xs text-sand-300/70 pt-1">
                Direct Line: <a href={`tel:${resortInfo.contactPhone}`} className="text-gold-300 underline underline-offset-2">{resortInfo.contactPhone}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
