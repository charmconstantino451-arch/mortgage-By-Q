'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: 'How does Mortgage by Q compare to a standard retail bank?',
      a: 'A retail bank only sells their own proprietary loan products and interest rates. Mortgage by Q is an independent brokerage. We analyze your scenario once, then plug it into our network of over 150+ competing wholesale lenders. We match you with the underwriter offering the lowest rates and best terms for your specific profile, saving you weeks of shopping around.'
    },
    {
      q: 'What is a DSCR loan and who is it for?',
      a: 'DSCR (Debt Service Coverage Ratio) loans are designed for real estate investors. Instead of verifying your personal income, salary, or employment, we qualify the property based on its rental cash flow. If the monthly rent covers the mortgage payment (DITI), the loan is approved. This allows investors to scale their portfolios quickly without hitting personal debt-to-income limits.'
    },
    {
      q: 'How do bank statement loans work for self-employed clients?',
      a: 'Standard bank rules require two years of tax returns, which often show heavy write-offs that lower your borrowing power. Our Non-QM bank statement programs allow self-employed buyers to qualify using the average monthly deposits of 12 or 24 months of bank statements to establish true cash-flow income, completely bypassing IRS tax documents.'
    },
    {
      q: 'What are the turnaround times compared to traditional lenders?',
      a: 'While traditional retail banks average 45 to 60 days to close a loan, Mortgage by Q averages 15 to 21 days from submission to funding. By working directly with wholesale lending operations and utilizing digital fast-track processing, we eliminate multiple layers of corporate retail bureaucracy.'
    }
  ];

  return (
    <section
      id="faq"
      className="relative w-full py-24 px-4 md:px-8 bg-surface-light text-slate-dark border-b border-zinc-200 z-10"
    >
      <div className="max-w-4xl mx-auto w-full space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <span className="text-[10px] uppercase tracking-widest text-accent-gold bg-[#151717] px-3 py-1 text-white font-semibold">
            Good to Know
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordions */}
        <div className="border-t border-zinc-200 divide-y divide-zinc-200">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className="py-5">
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center text-left py-2 font-serif text-lg md:text-xl font-semibold text-slate-dark hover:text-accent-gold transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl font-mono text-zinc-400">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-zinc-600 text-sm leading-relaxed pt-3 pb-2 pr-8 font-sans">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
