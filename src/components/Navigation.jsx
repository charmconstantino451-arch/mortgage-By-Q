'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactDrawer from './ContactDrawer';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#broker-edge' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#footer' },
];

export default function Navigation({ onOpenDrawer }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-xl border border-white/[0.06] rounded-none py-3 px-6'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-7 h-7 bg-accent-gold flex items-center justify-center font-serif text-black text-sm font-bold leading-none select-none flex-shrink-0">
            Q
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-serif text-xs font-bold tracking-[0.18em] uppercase">
              Mortgage by Q
            </span>
            <span className="text-white/40 text-[9px] tracking-widest uppercase mt-0.5 font-sans">
              West Capital Lending
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-[11px] uppercase tracking-[0.12em] text-white/60 hover:text-accent-gold font-sans font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Phone + CTA */}
        <div className="flex items-center gap-4">
          <a
            href="tel:9495367410"
            className="hidden lg:flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-sans tracking-wide"
          >
            <svg className="w-3 h-3 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            (949) 536-7410
          </a>
          <button
            onClick={onOpenDrawer}
            className="btn-gold text-[11px] uppercase tracking-wider py-2.5 px-5 flex items-center gap-1.5 group font-sans"
          >
            Get My Free Quote
            <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
          </button>
        </div>
      </div>
    </header>
  );
}
