'use client';

import { motion } from 'framer-motion';

export default function Hero({ onOpenDrawer }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-36 pb-12 px-4 md:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top / Main Hero content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8 w-full">
        {/* Left Side: Massive Hook Text */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="inline-flex items-center gap-2 border border-accent-gold/30 bg-[#1F242E]/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-gold rounded-none"
          >
            <span>★</span> NMLS #1028669
          </motion.div>

          <motion.h1
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-hero-giant font-serif text-white font-bold leading-[0.95] tracking-tighter"
          >
            YOUR BANK
            <br />
            OFFERS <span className="text-accent-gold italic font-normal">ONE</span> RATE.
          </motion.h1>

          <motion.h2
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.35 }}
            className="text-2xl md:text-4xl text-zinc-300 font-serif max-w-2xl leading-relaxed"
          >
            I make <span className="text-white font-semibold">200+ competing lenders</span> compete for yours.
          </motion.h2>
        </div>

        {/* Right Side: Floating details & Avatar CTA card */}
        <div className="lg:col-span-4 lg:mt-24 space-y-8 w-full">
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.5 }}
            className="bg-[#1F242E]/80 backdrop-blur-sm border border-zinc-800 p-8 rounded-none space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-accent-gold font-bold">
                Quyen Sy • Managing Broker
              </span>
              <h3 className="font-serif text-xl text-white">
                Skip the banking hassle. Get transparent, custom-fit options.
              </h3>
            </div>

            {/* Overlapping Avatar Cluster + Action */}
            <div className="space-y-4 pt-2">
              <div className="flex -space-x-3 items-center overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#1F242E] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="Client Profile"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#1F242E] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Client Profile"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#1F242E] object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                  alt="Client Profile"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#1F242E] object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                  alt="Client Profile"
                />
              </div>
              
              <div className="text-xs text-zinc-400 leading-normal">
                Join <span className="text-white font-medium">500+ families</span> who bypassed standard banks with Mortgage by Q.
              </div>

              <button
                onClick={onOpenDrawer}
                className="w-full bg-white hover:bg-zinc-200 text-slate-dark text-xs uppercase tracking-wider py-3 px-6 rounded-full font-semibold flex items-center justify-between group transition-all"
              >
                <span>Get Started Now</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom: Trust bar / metadata */}
      <motion.div
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.6 }}
        className="w-full border-t border-zinc-800/80 pt-8 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 items-center"
      >
        <div>
          <span className="block text-2xl font-serif text-accent-gold font-bold">150+</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-400">Competing Lenders Shopped</span>
        </div>
        <div>
          <span className="block text-2xl font-serif text-accent-gold font-bold">5.0 ★★★★★</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-400">Client Rating on Google</span>
        </div>
        <div>
          <span className="block text-2xl font-serif text-accent-gold font-bold">$3,800+</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-400">Avg. Annual Refinance Saving</span>
        </div>
        <div>
          <span className="block text-2xl font-serif text-accent-gold font-bold">15 Days</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-400">Average Turnaround Time</span>
        </div>
      </motion.div>
    </section>
  );
}
