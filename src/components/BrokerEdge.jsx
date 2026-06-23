'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const VALUE_PROPS = [
  {
    icon: '◎',
    title: '200+ lenders, one application',
    body: 'I shop hundreds of loan options for you — no calling around, no juggling quotes, no wasted weekends.',
  },
  {
    icon: '⬡',
    title: 'Doors banks keep shut',
    body: 'Self-employed, lower credit, or buying an investment property? I have programs the big banks simply cannot offer.',
  },
  {
    icon: '◇',
    title: 'Always in your corner',
    body: 'No pressure, no jargon, no junk fees. Just honest guidance from someone who actually picks up the phone.',
  },
];

function TiltCard({ children, delay = 0 }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 25 });
  const springY = useSpring(y, { stiffness: 150, damping: 25 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card"
    >
      {children}
    </motion.div>
  );
}

export default function BrokerEdge() {
  return (
    <section id="broker-edge" className="relative z-10 py-28 px-6 md:px-12 section-divider">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Section Header */}
        <div className="max-w-3xl space-y-5">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.22em] text-gold font-sans font-semibold"
          >
            Brokers, Not Bankers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-6xl text-white font-bold leading-[1.05]"
          >
            Why settle for one rate when you can have the{' '}
            <em className="gold-italic">best of 200+?</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/45 text-base md:text-lg font-sans leading-relaxed max-w-2xl"
          >
            A bank can only sell you its own loans, from a single rate sheet. As your independent broker, I work for you — putting 200+ lenders in competition to win your business. More options, sharper pricing, and a real human who answers the phone.
          </motion.p>
        </div>

        {/* Three Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map((prop, i) => (
            <TiltCard key={i} delay={i * 0.12}>
              <div className="glass-card p-8 h-full space-y-6 group hover:border-gold/20 transition-colors cursor-default">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold text-xl">
                  {prop.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-white font-semibold leading-snug group-hover:text-gold transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-white/40 text-sm font-sans leading-relaxed">
                    {prop.body}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}
