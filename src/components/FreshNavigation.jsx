'use client';

import { useState, useEffect } from 'react';

export default function FreshNavigation({ onContactClick }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111212]/80 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Mark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2 text-xl font-medium tracking-tight focus:outline-none"
        >
          <span className="font-editorial-heading text-2xl font-bold">
            Mortgage by <span className="text-gold italic font-normal">Q</span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
          <button
            onClick={() => scrollToSection('advantage')}
            className="hover:text-white transition-colors duration-200"
          >
            Broker Advantage
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            className="hover:text-white transition-colors duration-200"
          >
            Calculator
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-white transition-colors duration-200"
          >
            Loan Solutions
          </button>
          <button
            onClick={() => scrollToSection('faqs')}
            className="hover:text-white transition-colors duration-200"
          >
            FAQs
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onContactClick}
            className="btn-gold px-6 py-2 text-xs uppercase tracking-wider font-semibold"
          >
            Check Rates
          </button>
        </div>
      </div>
    </header>
  );
}
