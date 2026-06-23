'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrokersVsBankers() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const treeRef = useRef(null);
  const bankerCardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pin the section
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    });

    // Create animation timeline synced with the scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
      }
    });

    // Reset styles initially to avoid flash of unstyled content
    gsap.set(leftColRef.current, { y: '100vh', opacity: 0 });
    gsap.set(rightColRef.current, { y: '-100vh', opacity: 0 });
    gsap.set(bankerCardRef.current, { scale: 0.9, opacity: 0.3 });

    const tiles = treeRef.current.querySelectorAll('.option-tile');
    gsap.set(tiles, { scale: 0, opacity: 0 });

    // Step 1: Slide columns in from opposite directions
    tl.to(leftColRef.current, {
      y: '0%',
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    }, 0)
    .to(rightColRef.current, {
      y: '0%',
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    }, 0);

    // Step 2: Highlight banker card stiffness
    tl.to(bankerCardRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, 0.8);

    // Step 3: Expand/reveal the glowing tree of options stagger-wise
    tl.to(tiles, {
      scale: 1,
      opacity: 1,
      stagger: 0.15,
      duration: 1.2,
      ease: 'elastic.out(1, 0.75)'
    }, 1.2);

    // Cleanup triggers on unmount
    return () => {
      pinTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="relative min-h-screen w-full flex items-center justify-center bg-slate-dark text-white overflow-hidden border-y border-zinc-800/60 z-10"
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[80vh] py-12">
        
        {/* Left Column: Restrictive Banker */}
        <div className="lg:col-span-5 flex flex-col justify-center w-full">
          <div ref={leftColRef} className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                Option A — The Traditional Route
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white">
                The Restrictive Retail Banker
              </h2>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              A standard banker represents exactly one retail bank. They are bound by a single set of guidelines, a single underwriter, and a rigid, non-negotiable rate sheet. If your profile does not fit, you are rejected.
            </p>

            {/* Banker Rigid Card */}
            <div
              ref={bankerCardRef}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-none space-y-6 relative max-w-md"
            >
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <span className="text-xs uppercase font-mono tracking-widest text-zinc-500">
                  RETAIL BANK RATE SHEET
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                  30-Year Fixed QM Rate
                </span>
                <span className="text-5xl font-mono text-zinc-500 font-bold line-through">
                  7.125%
                </span>
              </div>
              <div className="bg-red-950/20 border border-red-900/40 p-4 text-xs text-red-400 font-mono">
                CRITICAL LENDER RESTRICTION: No self-employed bank statement programs available. Debt-to-income limit capped at 43%.
              </div>
            </div>
          </div>
        </div>

        {/* Column Divider (Hidden on mobile) */}
        <div className="hidden lg:flex lg:col-span-1 justify-center items-center">
          <div className="w-[1px] h-3/4 bg-zinc-800/80" />
        </div>

        {/* Right Column: Dynamic Broker Network */}
        <div className="lg:col-span-6 flex flex-col justify-center w-full">
          <div ref={rightColRef} className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-accent-gold font-bold">
                Option B — The Modern Network
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-accent-gold">
                The Competing Broker Network
              </h2>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
              Mortgage by Q is independent. We plug your scenario into 150+ competing wholesale lenders. As you scroll, our network branches out, matching you with self-employed bank statement loans, DSCR, and low-cost prime rates.
            </p>

            {/* Glowing Options Tree Grid */}
            <div
              ref={treeRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl pt-4"
            >
              {/* Option Tile 1 */}
              <div className="option-tile bg-[#1F242E] border border-accent-gold p-4 rounded-none space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider text-accent-gold font-bold">
                    Lender #03 (UWM)
                  </span>
                  <span className="text-[9px] bg-accent-gold/20 text-accent-gold px-2 py-0.5 font-mono uppercase">
                    Best Prime Rate
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-white">6.250%</span>
                  <span className="text-xs text-zinc-400">Fixed</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  ✓ $0 lender fees + fast-track approval
                </div>
              </div>

              {/* Option Tile 2 */}
              <div className="option-tile bg-[#1F242E] border border-zinc-800 hover:border-accent-gold p-4 rounded-none space-y-2 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                    Lender #41 (Caliber)
                  </span>
                  <span className="text-[9px] bg-zinc-800 text-zinc-300 px-2 py-0.5 font-mono uppercase">
                    Self-Employed QM
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-white">6.375%</span>
                  <span className="text-xs text-zinc-400">Fixed</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  ✓ 12-Month bank statement program
                </div>
              </div>

              {/* Option Tile 3 */}
              <div className="option-tile bg-[#1F242E] border border-zinc-800 hover:border-accent-gold p-4 rounded-none space-y-2 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                    Lender #98 (Deephaven)
                  </span>
                  <span className="text-[9px] bg-zinc-800 text-zinc-300 px-2 py-0.5 font-mono uppercase">
                    DSCR Investor
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-white">6.625%</span>
                  <span className="text-xs text-zinc-400">Fixed</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  ✓ No personal income docs required
                </div>
              </div>

              {/* Option Tile 4 */}
              <div className="option-tile bg-[#1F242E] border border-zinc-800 hover:border-accent-gold p-4 rounded-none space-y-2 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                    Lender #114 (PennyMac)
                  </span>
                  <span className="text-[9px] bg-zinc-800 text-zinc-300 px-2 py-0.5 font-mono uppercase">
                    First-Time Buyer
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-white">6.125%</span>
                  <span className="text-xs text-zinc-400">Fixed</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  ✓ FHA 3.5% down + low credit score fit
                </div>
              </div>

              {/* Decorative nodes/competitors count */}
              <div className="option-tile md:col-span-2 bg-[#151717]/40 border border-dashed border-zinc-800 p-3 rounded-none flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
                  <span>+146 other wholesale lenders evaluated...</span>
                </div>
                <span className="text-accent-gold font-semibold uppercase tracking-wider text-[10px]">
                  All Competing Live
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
