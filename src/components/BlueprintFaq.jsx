'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlueprintFaq() {
  const faqs = [
    {
      question: 'How does Quyen Sy secure wholesale pricing?',
      answer: 'Wholesale lenders do not deal directly with retail consumers. By bypassing the brick-and-mortar branch network and national advertising campaigns, they pass the savings to us. We pass these raw interest rate sheets directly to our clients.',
    },
    {
      question: 'Will checking rates ding my credit score?',
      answer: 'No. Our initial rate audit uses a soft credit inquiry, which does not impact or lower your credit score. We only execute a hard credit pull when we submit your chosen loan program to underwriting.',
    },
    {
      question: 'How are the broker commissions structured?',
      answer: 'Independent brokers do not charge separate upfront consultation fees. Our fees are paid directly by the wholesale lender you choose. This commission is built into the lender wholesale sheets, aligning our interests with finding you the lowest rate.',
    },
    {
      question: 'What documentation is required for bank statement loans?',
      answer: 'For self-employed borrowers, we bypass standard tax transcripts and W-2 boxes. Instead, we qualify your income based on your average monthly deposits across 12 or 24 months of business or personal bank statements.',
    },
    {
      question: 'What is the average wholesale closing timeline?',
      answer: 'While traditional retail banks average 30 to 45 days to close, our direct-to-lender integrations allow us to clear underwriting conditions in a fraction of the time. Our average close window is 15 business days.',
    },
  ];

  return (
    <section id="faqs" className="py-24 bg-[#111212] border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D9B48F] font-bold">
            Good to Know
          </span>
          <h2 className="text-4xl font-bold font-editorial-heading text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50 text-sm">
            Bypassing retail banking bureaucracy: how the wholesale pipeline works.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>

      </div>
    </section>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 bg-[#161717]/95 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
      >
        <span className="font-semibold text-white text-sm md:text-base leading-snug pr-4">
          {question}
        </span>
        <span
          className={`w-5 h-5 flex items-center justify-center border border-white/10 text-[#D9B48F] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.25, ease: 'easeOut' },
                opacity: { duration: 0.2 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.2, ease: 'easeIn' },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 text-xs md:text-sm text-white/50 leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
