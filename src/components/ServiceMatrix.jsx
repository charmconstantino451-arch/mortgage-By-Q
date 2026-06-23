'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    id: 'purchase',
    tag: 'Home Purchase',
    title: 'First home or your next',
    body: 'A competitive rate with first-time-buyer programs and low-down options — from FHA 3.5% to conventional.',
    icon: '⌂',
  },
  {
    id: 'refinance',
    tag: 'Refinance & Cash-Out',
    title: 'Lower your rate or unlock equity',
    body: 'Shorten your term, reduce your payment, or turn equity into cash for renovations, investments, or debt consolidation.',
    icon: '↺',
  },
  {
    id: 'nonqm',
    tag: 'Non-QM & Self-Employed',
    title: 'Bank-statement programs that work',
    body: 'Alt-income qualification for business owners, freelancers, and entrepreneurs the big banks routinely overlook.',
    icon: '◎',
  },
  {
    id: 'dscr',
    tag: 'Investment & DSCR',
    title: 'Grow your rental portfolio',
    body: 'Loans that use property rental income to qualify — not your personal tax returns. Scale without limits.',
    icon: '⬡',
  },
  {
    id: 'bridge',
    tag: 'Bridge Loans',
    title: 'Buy before you sell',
    body: 'Flexible short-term financing so you can secure your next home before your current one closes — on your timeline.',
    icon: '⇌',
  },
  {
    id: 'foreign',
    tag: 'Foreign National',
    title: 'Cross-border financing simplified',
    body: 'Overseas buyers and foreign nationals — we navigate the documentation and lender landscape so you can close.',
    icon: '◇',
  },
];

export default function ServiceMatrix({ onOpenDrawer }) {
  const offsets = [
    'md:translate-y-0',
    'md:translate-y-8',
    'md:translate-y-4',
    'md:translate-y-0',
    'md:translate-y-8',
    'md:translate-y-4'
  ];

  return (
    <section id="services" className="relative z-10 py-32 pb-44 px-6 md:px-12 bg-surface-light text-[#151717]">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.22em] text-accent-gold font-sans font-semibold"
            >
              Every Situation, A Solution
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl text-[#151717] font-bold leading-[1.05]"
            >
              When other lenders say no,{' '}
              <span className="text-accent-gold italic font-normal">I find the way</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#151717]/60 text-sm md:text-base font-sans leading-relaxed"
          >
            First-time buyer or seasoned investor — with 200+ lenders behind me, there&apos;s almost always a path. Here&apos;s where I help borrowers most.
          </motion.p>
        </div>

        {/* 6-Panel Grid (grid-cols-1 md:grid-cols-3) with offsets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={onOpenDrawer}
              className={`group bg-[#151717]/5 border border-[#151717]/10 p-8 space-y-6 cursor-pointer hover:border-accent-gold hover:bg-[#D9B48F]/5 transition-all rounded-none ${offsets[i % 6]}`}
            >
              {/* Icon + Tag row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 border border-[#151717]/10 flex items-center justify-center text-[#151717]/40 text-lg group-hover:border-accent-gold/40 group-hover:text-accent-gold transition-colors">
                  {svc.icon}
                </div>
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#151717]/50 font-sans font-medium group-hover:text-accent-gold transition-colors">
                  {svc.tag}
                </span>
              </div>

              {/* Copy */}
              <div className="space-y-2.5">
                <h3 className="font-serif text-xl text-[#151717] font-semibold group-hover:text-accent-gold transition-colors">
                  {svc.title}
                </h3>
                <p className="text-[#151717]/70 text-sm font-sans leading-relaxed">
                  {svc.body}
                </p>
              </div>

              {/* CTA link */}
              <div className="text-[11px] uppercase tracking-wider text-accent-gold/80 group-hover:text-accent-gold flex items-center gap-1 transition-colors font-sans font-semibold">
                Get a Rate
                <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
