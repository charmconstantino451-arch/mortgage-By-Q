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
  return (
    <section id="services" className="relative z-10 py-28 px-6 md:px-12 section-divider">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.22em] text-gold font-sans font-semibold"
            >
              Every Situation, A Solution
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl text-white font-bold leading-[1.05]"
            >
              When other lenders say no,{' '}
              <em className="gold-italic">I find the way</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-sm md:text-base font-sans leading-relaxed"
          >
            First-time buyer or seasoned investor — with 200+ lenders behind me, there&apos;s almost always a path. Here&apos;s where I help borrowers most.
          </motion.p>
        </div>

        {/* 6-Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={onOpenDrawer}
              className="group glass-card p-8 space-y-6 cursor-pointer hover:border-gold/25 hover:bg-gold/[0.03] transition-all"
            >
              {/* Icon + Tag row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 text-lg group-hover:border-gold/30 group-hover:text-gold transition-colors">
                  {svc.icon}
                </div>
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/25 font-sans font-medium group-hover:text-gold/50 transition-colors">
                  {svc.tag}
                </span>
              </div>

              {/* Copy */}
              <div className="space-y-2.5">
                <h3 className="font-serif text-lg text-white font-semibold group-hover:text-gold transition-colors">
                  {svc.title}
                </h3>
                <p className="text-white/35 text-sm font-sans leading-relaxed">
                  {svc.body}
                </p>
              </div>

              {/* CTA link */}
              <div className="text-[11px] uppercase tracking-wider text-gold/40 group-hover:text-gold flex items-center gap-1 transition-colors font-sans">
                Get a Rate
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
