'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

const fadeLeft = {
  initial: { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

const fadeRight = {
  initial: { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

export default function HeroSection({ onOpenDrawer }) {
  // Mouse coordinates for interactive parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to avoid jumpy animations
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  // Map mouse movement to slight background shifts
  const bgX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const bgScale = useTransform(springX, [-0.5, 0.5], [1.03, 1.05]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 w-full overflow-hidden z-10"
    >
      {/* Layer 1: Background Modern Home Image (z-0) with Mouse Parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <motion.img
          style={{ 
            x: bgX, 
            y: bgY, 
            scale: bgScale 
          }}
          src="/images/modern_luxury_house.png"
          alt="Modern Luxury Home"
          className="w-full h-full object-cover opacity-[0.48]"
        />
        {/* Ambient vignettes to guarantee foreground contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/35 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* Layer 2: Foreground Split Layout & Interactive Elements (z-20) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-between">
        
        {/* Main 3-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center flex-grow w-full py-10">
          
          {/* Left Column: Stacked Uppercase Title */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              {...fadeRight}
              transition={{ ...fadeRight.transition, delay: 0.2 }}
              className="space-y-1"
            >
              <h1 className="font-serif text-5xl md:text-[130px] xl:text-[140px] tracking-tighter leading-[0.85] text-white uppercase font-light">
                YOUR BANK<br />
                OFFERS<br />
                <span className="text-accent-gold italic font-normal">ONE RATE.</span>
              </h1>
            </motion.div>
          </div>

          {/* Center Column: Open/empty space to reveal house background in parallax */}
          <div className="lg:col-span-1" />

          {/* Right Column: Descriptions & Interactive Eligibility Card */}
          <div className="lg:col-span-5 flex flex-col lg:items-end lg:text-right space-y-6">
            
            {/* Direct Headline & Pitch */}
            <motion.div
              {...fadeLeft}
              transition={{ ...fadeLeft.transition, delay: 0.3 }}
              className="space-y-4 max-w-md"
            >
              <h3 className="font-serif text-2xl md:text-3xl font-medium leading-snug text-white/90">
                I make <em className="text-accent-gold font-sans font-bold not-italic">200+ lenders</em> compete for yours.
              </h3>
              <p className="text-white/45 text-xs md:text-sm font-sans leading-relaxed">
                One quick application puts hundreds of lenders in a bidding war for your loan — so you get a lower rate, more options, and zero runaround.
              </p>
            </motion.div>

            {/* Interactive Eligibility check card */}
            <motion.div
              {...fadeLeft}
              transition={{ ...fadeLeft.transition, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              onClick={onOpenDrawer}
              className="glass-card p-6 text-left border border-accent-gold/20 hover:border-accent-gold cursor-pointer transition-all duration-300 w-full max-w-sm lg:ml-auto select-none bg-white/[0.02]"
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-accent-gold font-sans font-semibold">
                Interactive Eligibility Check
              </span>
              <h4 className="font-serif text-lg text-white font-semibold mt-1">
                What do I actually qualify for?
              </h4>
              <p className="text-white/45 text-xs font-sans mt-2">
                Find out in about 3 minutes. Soft credit check — it won&apos;t ding your score.
              </p>
              <div className="text-accent-gold text-xs uppercase font-sans font-bold tracking-wider mt-4 flex items-center gap-1.5 group">
                Start Soft Check
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Bottom Conversion & License Row */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.5 }}
          className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full"
        >
          {/* Left Side: Glowing Conversion CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={onOpenDrawer}
              className="btn-gold py-3 px-8 text-xs uppercase tracking-wider flex items-center gap-2 group cursor-pointer"
            >
              See My Options
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
            <a
              href="tel:9495367410"
              className="btn-ghost py-3 px-8 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Prefer to talk? (949) 536-7410
            </a>
          </div>

          {/* Right Side: Regulatory Branch Summary */}
          <div className="text-[10px] text-white/20 font-sans tracking-wide leading-relaxed text-left md:text-right">
            <p className="font-semibold text-white/30">Quyen &ldquo;Q&rdquo; Sy · Executive Branch Manager</p>
            <p>West Capital Lending · NMLS #1028669 · CA DRE #02350634</p>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
