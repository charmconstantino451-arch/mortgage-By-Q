'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FreshFaq() {
  const faqs = [
    {
      question: 'What is the difference between a wholesale broker and a retail bank loan officer?',
      answer: 'A bank loan officer works for one institution and can only sell that bank’s specific loan products and rates, even if they aren’t competitive. As an independent broker, Quyen Sy represents you. We scan over 150 wholesale lenders simultaneously, forcing them to compete for your business and finding the lowest cost structure available in the market.',
    },
    {
      question: 'Do you charge a separate broker fee?',
      answer: 'No. Our broker commissions are paid directly by the wholesale lender you choose. There are no hidden fees or extra surcharges added to your loan balance for our shopping services.',
    },
    {
      question: 'How are you able to secure lower rates than retail banks?',
      answer: 'Wholesale lenders do not operate brick-and-mortar retail branches or pay for massive national consumer advertising campaigns. They pass these structural cost savings directly to independent brokers in the form of lower interest rates, which we then pass directly to you.',
    },
    {
      question: 'What if I am self-employed or have non-traditional W-2 income?',
      answer: 'Retail banks have rigid automated underwriting engines that frequently reject self-employed borrowers because their tax returns show deductions. We work with specialized wholesale lenders who offer bank statement programs (using 12 or 24 months of deposits) and asset depletion models to approve loans without standard tax transcripts.',
    },
    {
      question: 'How long does the mortgage process take from start to close?',
      answer: 'While traditional retail banks average 30 to 45 days to close a loan, our streamlined broker channels allow us to clear underwriting conditions rapidly, resulting in an average close time of just 15 days.',
    },
  ];

  return (
    <section id="faqs" className="py-24 bg-[#111212] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Common Inquiries
          </span>
          <h2 className="text-4xl font-bold font-editorial-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Everything you need to know about navigating the wholesale mortgage market with Quyen Sy.
          </p>
        </div>

        {/* Accordions */}
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
    <div className="border border-white/5 bg-[#161717] transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
      >
        <span className="font-semibold text-white text-sm md:text-base leading-snug pr-4">{question}</span>
        <span className={`w-5 h-5 flex items-center justify-center border border-white/10 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.25 }, opacity: { duration: 0.2 } } }}
            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.2 }, opacity: { duration: 0.15 } } }}
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
