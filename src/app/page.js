'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// V2 Components
import Navigation from '@/components/Navigation';
import Scene3D from '@/components/Scene3D';
import HeroSection from '@/components/HeroSection';
import MetricsMarquee from '@/components/MetricsMarquee';
import BrokerEdge from '@/components/BrokerEdge';
import ThreeStepProcess from '@/components/ThreeStepProcess';
import PaymentCalculator from '@/components/PaymentCalculator';
import ServiceMatrix from '@/components/ServiceMatrix';
import ReviewCarousel from '@/components/ReviewCarousel';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import ContactDrawer from '@/components/ContactDrawer';

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  // Monitor scroll progress to drive the Three.js background camera & animations
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;
      if (totalScrollable > 0) {
        setScrollProgress(window.scrollY / totalScrollable);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial evaluation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-void-black text-white select-none">
      
      {/* 3D WebGL Canvas Layer (Fixed Background) */}
      <Scene3D scrollProgress={scrollProgress} />

      {/* Floating Pill Navigation */}
      <Navigation onOpenDrawer={handleOpenDrawer} />

      {/* Foreground Scroll Sections */}
      <div className="relative z-10 w-full">
        
        {/* Section 1: Hero Hook */}
        <HeroSection onOpenDrawer={handleOpenDrawer} />

        {/* Section 2: Wholesale Lender Marquee & GSAP Counters */}
        <MetricsMarquee />

        {/* Section 3: Brokers vs Bankers — 3D Tilt Cards */}
        <BrokerEdge />

        {/* Section 4: 3-Step Process with pulsing CTA anchor */}
        <ThreeStepProcess onOpenDrawer={handleOpenDrawer} />

        {/* Section 4.5: Monthly Payment Calculator Slider Dashboard */}
        <PaymentCalculator onOpenDrawer={handleOpenDrawer} />

        {/* Section 5: Dynamic Service Matrix (6-card grid) */}
        <ServiceMatrix onOpenDrawer={handleOpenDrawer} />

        {/* Section 6: Testimonials horizontal drag carousel */}
        <ReviewCarousel />

        {/* Section 7: Final Conversion Hook & Accordion FAQs */}
        <FaqSection onOpenDrawer={handleOpenDrawer} />

        {/* Section 8: Corporate & Regulatory Footer */}
        <Footer />

      </div>

      {/* Conversion Quote Slider (Contact Form Drawer) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <ContactDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
        )}
      </AnimatePresence>

    </main>
  );
}
