'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Tell me your goal',
    body: 'A quick 15-minute chat — phone or video. No paperwork to get started, no commitment.',
    icon: '◎',
  },
  {
    num: '02',
    title: 'I shop 200+ lenders',
    body: 'One application, and I do the heavy lifting to find the rate and program that fit your life.',
    icon: '⬡',
  },
  {
    num: '03',
    title: 'You pick, we close',
    body: 'Compare your top options side by side, choose with confidence, and close — often in about 30 days.',
    icon: '◆',
  },
];

export default function ThreeStepProcess({ onOpenDrawer }) {
  return (
    <section id="process" className="relative z-10 py-28 px-6 md:px-12 section-divider bg-obsidian/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Header */}
        <div className="space-y-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.22em] text-gold font-sans font-semibold"
          >
            Simple by Design
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-6xl text-white font-bold"
          >
            From &ldquo;hello&rdquo; to your best rate<br />
            in <em className="gold-italic">3 easy steps</em>
          </motion.h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-12 left-[33%] w-[34%] h-[1px] bg-gradient-to-r from-gold/20 to-gold/20" />
          <div className="hidden md:block absolute top-12 left-[66%] w-[34%] h-[1px] bg-gold/20" />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative space-y-6"
            >
              {/* Step number badge */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center text-gold text-xs font-mono font-bold flex-shrink-0 bg-gold/5">
                  {step.num}
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/20 to-transparent md:hidden" />
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-xl md:text-2xl text-white font-semibold">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm font-sans leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center pt-4"
        >
          <button
            onClick={onOpenDrawer}
            className="btn-gold animate-pulse-gold py-4 px-10 text-sm flex items-center gap-2.5 group"
          >
            Start My Free Quote
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
