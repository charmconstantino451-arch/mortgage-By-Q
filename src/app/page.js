'use client';

import { useState } from 'react';
import FreshNavigation from '@/components/FreshNavigation';
import CanvasScrollytelling from '@/components/CanvasScrollytelling';
import BlueprintHero from '@/components/BlueprintHero';
import TrustTicker from '@/components/TrustTicker';
import FreshComparison from '@/components/FreshComparison';
import CalculatorMatrix from '@/components/CalculatorMatrix';
import SolutionGrid from '@/components/SolutionGrid';
import FreshWizard from '@/components/FreshWizard';
import BlueprintFaq from '@/components/BlueprintFaq';
import BlueprintFooter from '@/components/BlueprintFooter';

export default function Home() {
  const [wizardProgram, setWizardProgram] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductSelect = (programName) => {
    setWizardProgram(programName);
    scrollToSection('wizard');
  };

  const handleCtaClick = () => {
    scrollToSection('wizard');
  };

  return (
    <main className="relative min-h-screen bg-[#111212] text-white">
      {/* 2D Canvas Scrollytelling Background Layer */}
      <CanvasScrollytelling />

      {/* Sticky Pill Navigation */}
      <FreshNavigation onContactClick={() => scrollToSection('wizard')} />

      {/* Foreground Scroll Sections */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <BlueprintHero onCtaClick={handleCtaClick} />

        {/* Sub-hero Wholesale Trust Ticker */}
        <TrustTicker />

        {/* Comparison Grid (Broker Advantage) */}
        <FreshComparison />

        {/* Centralized Calculator Dashboard */}
        <CalculatorMatrix onCtaClick={handleCtaClick} />

        {/* Editorial High-Contrast Solution Grid */}
        <SolutionGrid onSelect={handleProductSelect} />

        {/* Eligibility Multi-Step Wizard */}
        <FreshWizard initialProgram={wizardProgram} />

        {/* FAQs Accordion */}
        <BlueprintFaq />

        {/* Footer */}
        <BlueprintFooter />
      </div>
    </main>
  );
}
