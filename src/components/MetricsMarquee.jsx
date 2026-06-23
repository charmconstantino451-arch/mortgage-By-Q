'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 200, suffix: '+', label: 'Lenders Competing' },
  { value: 2500, suffix: '+', label: 'Families Helped' },
  { value: 8, prefix: '$', suffix: 'k', label: 'Typical Savings' },
  { value: 4.9, suffix: '★', label: 'Client Rating' },
  { value: 30, suffix: ' days', label: 'To Close' },
];

const LENDERS = [
  {
    name: 'Flagstar Bank',
    tag: 'Wholesale Partner',
    logo: (
      <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
      </svg>
    ),
  },
  {
    name: 'Kind Lending',
    tag: 'Primary Network',
    logo: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    name: 'PennyMac',
    tag: 'Direct Wholesale',
    logo: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
  {
    name: 'PRMG',
    tag: 'Gold Underwriter',
    logo: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: 'Champions Funding',
    tag: 'Non-QM Lender',
    logo: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Figure',
    tag: 'HELOC Grid',
    logo: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.564-.386-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    name: 'Loan Stream',
    tag: 'Alt-QM Wholesale',
    logo: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'The Loan Store',
    tag: 'Prime Portfolio',
    logo: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

function CounterStat({ value, prefix = '', suffix = '', label, delay = 0 }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2.2,
          delay,
          ease: 'power2.out',
          onUpdate: () => {
            const display = value % 1 === 0 ? Math.floor(obj.val) : obj.val.toFixed(1);
            el.textContent = `${prefix}${display}${suffix}`;
          },
        });
      },
    });
  }, [value, prefix, suffix, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-center space-y-2"
    >
      <div ref={numRef} className="stat-number">{prefix}0{suffix}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/35 font-sans">{label}</div>
    </motion.div>
  );
}

// 3D Cylinder Card Component
function ThreeDCard({ item, index, dragX, windowWidth, totalCards }) {
  const cardWidth = 265;
  const gap = 20;
  const offsetConstant = index * (cardWidth + gap);

  // Bind transforms directly to the drag motion value
  const relativeX = useTransform(dragX, (latestDragX) => {
    const cardCenter = offsetConstant + latestDragX + cardWidth / 2;
    const screenCenter = windowWidth / 2;
    return cardCenter - screenCenter;
  });

  // Calculate cylindrical Y rotation, scale, opacity, and Z depth
  const rotateY = useTransform(relativeX, [-450, 0, 450], [-42, 0, 42]);
  const translateZ = useTransform(relativeX, [-450, 0, 450], [-180, 0, -180]);
  const scale = useTransform(relativeX, [-450, 0, 450], [0.84, 1, 0.84]);
  const opacity = useTransform(relativeX, [-600, 0, 600], [0.15, 1, 0.15]);

  return (
    <motion.div
      style={{
        width: cardWidth,
        height: 160,
        rotateY,
        z: translateZ,
        scale,
        opacity,
        transformStyle: 'preserve-3d',
      }}
      className="glass-card p-6 flex flex-col justify-between items-center text-center select-none border border-white/10 flex-shrink-0 cursor-grab active:cursor-grabbing hover:border-gold/30 bg-white/[0.01] transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center">
        {item.logo}
      </div>
      <div className="space-y-1">
        <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase">
          {item.name}
        </h4>
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 font-sans block">
          {item.tag}
        </span>
      </div>
    </motion.div>
  );
}

export default function MetricsMarquee() {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(1200);
  const dragX = useMotionValue(0);
  const springDragX = useSpring(dragX, { damping: 30, stiffness: 180 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Set initial centered drag position
    const cardWidth = 265;
    const gap = 20;
    const totalWidth = LENDERS.length * (cardWidth + gap) - gap;
    dragX.set((window.innerWidth - totalWidth) / 2);

    return () => window.removeEventListener('resize', handleResize);
  }, [dragX]);

  const cardWidth = 265;
  const gap = 20;
  const totalWidth = LENDERS.length * (cardWidth + gap) - gap;

  // Drag boundaries
  const dragMin = windowWidth - totalWidth - 80;
  const dragMax = 80;

  return (
    <section id="metrics" className="relative z-10 py-28 section-divider bg-obsidian overflow-hidden">
      
      {/* 3D Image Slider / Lender Carousel Container */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-visible py-10"
        style={{ perspective: 1200 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-obsidian to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-obsidian to-transparent z-20 pointer-events-none" />

        <motion.div
          drag="x"
          _dragX={dragX}
          style={{ x: springDragX, width: totalWidth }}
          dragConstraints={{ left: dragMin, right: dragMax }}
          dragElastic={0.15}
          className="flex gap-[20px] select-none pl-6 pr-6 transform-style-3d"
        >
          {LENDERS.map((lender, i) => (
            <ThreeDCard
              key={lender.name}
              item={lender}
              index={i}
              dragX={springDragX}
              windowWidth={windowWidth}
              totalCards={LENDERS.length}
            />
          ))}
        </motion.div>
      </div>

      {/* Drag helper hint */}
      <div className="text-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-sans pt-4">
        ← Drag Left or Right to Spin Competing Lenders →
      </div>

      {/* Stat Grid */}
      <div className="max-w-5xl mx-auto px-6 pt-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">
          {STATS.map((stat, i) => (
            <CounterStat
              key={i}
              value={stat.value}
              prefix={stat.prefix || ''}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
