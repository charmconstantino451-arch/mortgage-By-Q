'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: "Broker or bank — what's the real difference?",
    a: "A traditional bank can only sell its own proprietary mortgage loans from a single interest rate sheet. If your scenario doesn't fit their narrow box, you're declined. As your independent broker, I shop your scenario across a network of 200+ competing wholesale lenders. We pitch them against each other to win your business, securing lower rates, more flexible terms, and bespoke programs they can't offer."
  },
  {
    q: "Will checking my options hurt my credit?",
    a: "Absolutely not. We run a secure soft credit check to explore all your pre-qualification rates and programs. This soft pull has zero impact on your credit score. A hard credit inquiry is only performed much later in the process once you've reviewed your options, selected your ideal program, and formally authorized us to submit your full application."
  },
  {
    q: "How much can I borrow?",
    a: "Your maximum loan amount is determined by several factors, including your income, debt obligations, credit profile, and down payment. While standard conforming loan limits go up to $766,550+, our portfolio programs and Jumbo options support loan amounts up to $5M+. For investors, our DSCR programs bypass personal income checks entirely and qualify you based solely on the property's rental income potential."
  },
  {
    q: "What documents do I need to apply?",
    a: "Our goal is zero runaround. For standard W-2 earners, we typically only need your recent pay stubs, W-2s, and bank statements. For self-employed business owners, we can bypass tax returns entirely and use 12 or 24 months of bank statements to establish your income. For DSCR investment properties, no personal tax returns, pay stubs, or employment history are required at all."
  },
  {
    q: "How fast can I close?",
    a: "While traditional retail banks average 45 to 60 days to process and close home loans, our direct connection to wholesale operations and digital processing systems allows us to bypass corporate bureaucracy. Our average time to close is approximately 30 days, with select clean files funding in as little as 15 to 21 days."
  }
];

export default function FaqSection({ onOpenDrawer }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative z-10 w-full py-24 md:py-32 px-6 bg-void-black border-t border-white/[0.06] overflow-hidden">
      {/* Background radial gold glow for ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
        {/* Left Side: Conversion Hook */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-sans font-semibold">
              The Next Step
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-[1.1] text-white">
              Your best rate is one <span className="gold-italic">conversation</span> away.
            </h2>
          </div>
          
          <p className="text-white/60 text-sm leading-relaxed font-sans max-w-md">
            One quick application. 200+ lenders competing in a bidding war for your loan. 
            No pressure, no retail markups, and zero obligation — just your real financing options, explained clearly.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onOpenDrawer}
              className="btn-gold py-3 px-8 text-xs uppercase tracking-wider flex items-center gap-2 group cursor-pointer"
            >
              Get My Free Quote
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </button>
            <a
              href="tel:9495367410"
              className="btn-ghost py-3 px-8 text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              Book a Free Call
            </a>
          </div>
        </div>

        {/* Right Side: Accordion FAQs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="pb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-sans font-bold">
                Good to Know — Your questions, answered straight
              </span>
            </div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {FAQS.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div key={index} className="py-6">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center text-left font-serif text-lg md:text-xl font-medium text-white hover:text-gold transition-colors focus:outline-none group"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <span className={`text-sm font-mono transition-transform duration-300 ${isOpen ? 'rotate-45 text-gold' : 'text-white/30 group-hover:text-white'}`}>
                        ✕
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
                          <p className="text-white/50 text-sm leading-relaxed pt-4 font-sans max-w-2xl">
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
        </div>
      </div>
    </section>
  );
}
