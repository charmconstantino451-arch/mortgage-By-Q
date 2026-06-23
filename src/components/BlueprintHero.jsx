'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BlueprintHero({ onCtaClick }) {
  const [formData, setFormData] = useState({
    purpose: 'purchase',
    credit: 'excellent',
    zip: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCtaClick(formData);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-transparent z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Asymmetric Bold Typography */}
        <div className="lg:col-span-7 space-y-8 text-white">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D9B48F] font-semibold bg-[#D9B48F]/10 px-3 py-1">
              Quyen Sy • West Capital Lending Affiliated Broker
            </span>
            <h1 className="text-5xl md:text-[100px] xl:text-[120px] font-bold font-editorial-heading leading-[0.9] tracking-tighter">
              Your bank offers <span className="text-[#D9B48F] italic font-normal">one</span> rate. <br />
              I make 200+ lenders compete for <span className="text-[#D9B48F] italic font-normal">yours.</span>
            </h1>
          </div>

          <p className="text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            Walking into your local bank restricts you to a single catalog of retail rates. As an independent advocate, we bypass the middleman and negotiate directly with over 200 wholesale lenders to find custom finance packages.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleSubmit}
              className="btn-gold px-8 py-4 text-xs uppercase tracking-wider font-bold group flex items-center justify-center space-x-2"
            >
              <span>Compare Rates</span>
              <span className="transition-transform duration-200 group-hover:translate-x-2">→</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('advantage');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-ghost px-8 py-4 text-xs uppercase tracking-wider font-semibold"
            >
              How it works
            </button>
          </div>
        </div>

        {/* Right Column: Floating Lead Collection Card */}
        <div className="lg:col-span-5 w-full">
          <div className="flat-card p-6 md:p-8 space-y-6 bg-[#161717]/90 backdrop-blur-md border border-white/10 relative">
            <div className="absolute top-0 right-0 bg-[#D9B48F] text-[#151717] text-[10px] uppercase font-bold px-3 py-1">
              Soft Check
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-editorial-heading text-white">Find Wholesale Programs</h3>
              <p className="text-xs text-white/50">
                Provide basic details to filter 200+ active lender sheets.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-widest block font-bold">Loan Purpose</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, purpose: 'purchase' }))}
                    className={`py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      formData.purpose === 'purchase'
                        ? 'bg-[#D9B48F] text-black'
                        : 'bg-[#1e2020] text-white/60 hover:text-white border border-white/5'
                    }`}
                  >
                    Purchase
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, purpose: 'refinance' }))}
                    className={`py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      formData.purpose === 'refinance'
                        ? 'bg-[#D9B48F] text-black'
                        : 'bg-[#1e2020] text-white/60 hover:text-white border border-white/5'
                    }`}
                  >
                    Refinance
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-widest block font-bold">Credit Range</label>
                <select
                  name="credit"
                  value={formData.credit}
                  onChange={(e) => setFormData(prev => ({ ...prev, credit: e.target.value }))}
                  className="flat-input w-full p-3 text-xs bg-[#1e2020]"
                >
                  <option value="excellent">Excellent (740+)</option>
                  <option value="good">Good (700-739)</option>
                  <option value="fair">Fair (640-699)</option>
                  <option value="non-qm">Self-Employed / Bank Statements</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-widest block font-bold">Zip Code</label>
                <input
                  type="text"
                  required
                  placeholder="90210"
                  value={formData.zip}
                  onChange={(e) => setFormData(prev => ({ ...prev, zip: e.target.value }))}
                  className="flat-input w-full p-3 text-xs bg-[#1e2020]"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-3 text-xs uppercase tracking-wider font-bold mt-2"
              >
                Analyze Rates
              </button>
            </form>

            <div className="pt-4 border-t border-white/5 flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 text-[#D9B48F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                Won&apos;t ding your credit score
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
