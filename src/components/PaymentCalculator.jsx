'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// Custom component to animate numbers smoothly using Framer Motion springs
function AnimatedNumber({ value, isPercent = false, decimals = 0 }) {
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, { damping: 40, stiffness: 220 });
  const ref = useRef(null);

  // Helper: format a raw number into the display string
  const formatValue = (v) => {
    if (isPercent) return v.toFixed(decimals) + '%';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(v);
  };

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    // The spring doesn't emit 'change' on initial mount — only on transitions.
    // Initial display is handled by rendering `formatValue(value)` as JSX children below.
    return springVal.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [springVal, isPercent, decimals]);

  // Render the initial value as children so it's visible from the very first
  // render (and during SSR). The spring listener overwrites textContent on change.
  return <span ref={ref} className="font-mono font-bold">{formatValue(value)}</span>;
}

export default function PaymentCalculator({ onOpenDrawer }) {
  const [homePrice, setHomePrice] = useState(650000);
  const [downPayPercent, setDownPayPercent] = useState(20);
  const [rate, setRate] = useState(6.50);
  const [loanTerm, setLoanTerm] = useState(30); // 15 or 30 years

  // Derive values
  const downPayAmount = (homePrice * downPayPercent) / 100;
  const loanAmount = homePrice - downPayAmount;

  // Monthly Principal & Interest Calculation
  const r = rate / 100 / 12;
  const n = loanTerm * 12;
  const pAndI = r > 0
    ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    : loanAmount / n;

  return (
    <section
      id="calculator"
      className="relative w-full py-28 px-6 md:px-12 bg-void-black border-t border-white/[0.06] z-10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.22em] text-gold font-sans font-semibold"
          >
            Try It Yourself
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight"
          >
            See your monthly payment<br />
            in <span className="gold-italic">seconds</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/50 text-sm md:text-base font-sans leading-relaxed max-w-2xl mx-auto"
          >
            Slide to ballpark your payment. Then get your real numbers — shopped<br className="hidden md:inline" />
            across 200+ lenders — with a free, no-pressure quote.
          </motion.p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Panel: Interactive Tangible Sliders (7 cols) */}
          <div className="lg:col-span-7 glass-card p-8 flex flex-col justify-center space-y-10 border border-white/[0.08] bg-white/[0.02]">
            
            {/* Slider 1: Home Price */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-[11px] uppercase tracking-widest text-white/50 font-sans font-bold">
                  Home price
                </label>
                <span className="text-xl md:text-2xl text-gold font-sans font-bold">
                  <AnimatedNumber value={homePrice} />
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="200000"
                  max="2000000"
                  step="10000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-gold focus:outline-none"
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-white/20">
                <span>$200,000</span>
                <span>$1,100,000</span>
                <span>$2,000,000</span>
              </div>
            </div>

            {/* Slider 2: Down Payment */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-[11px] uppercase tracking-widest text-white/50 font-sans font-bold">
                  Down payment
                </label>
                <span className="text-lg md:text-xl text-gold font-sans font-bold flex items-center gap-2">
                  <span className="font-mono text-sm text-white/40">{downPayPercent}% ·</span>
                  <AnimatedNumber value={downPayAmount} />
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="50"
                step="1"
                value={downPayPercent}
                onChange={(e) => setDownPayPercent(Number(e.target.value))}
                className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-gold focus:outline-none"
              />
              <div className="flex justify-between text-[9px] font-mono text-white/20">
                <span>3% Min</span>
                <span>20% Ideal</span>
                <span>50% Max</span>
              </div>
            </div>

            {/* Slider 3: Interest Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-[11px] uppercase tracking-widest text-white/50 font-sans font-bold">
                  Interest rate
                </label>
                <span className="text-xl md:text-2xl text-gold font-sans font-bold">
                  <AnimatedNumber value={rate} isPercent={true} decimals={2} />
                </span>
              </div>
              <input
                type="range"
                min="4.00"
                max="9.00"
                step="0.125"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-gold focus:outline-none"
              />
              <div className="flex justify-between text-[9px] font-mono text-white/20">
                <span>4.00%</span>
                <span>6.50%</span>
                <span>9.00%</span>
              </div>
            </div>

            {/* Slider 4: Loan Term */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-[11px] uppercase tracking-widest text-white/50 font-sans font-bold">
                  Loan term
                </label>
                <span className="text-lg text-gold font-sans font-bold">
                  {loanTerm} years
                </span>
              </div>
              {/* Custom Tangible Toggle Slider */}
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="15"
                  max="30"
                  step="15"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-gold focus:outline-none"
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-white/20">
                <span>15-Year Fixed</span>
                <span>30-Year Fixed</span>
              </div>
            </div>

          </div>

          {/* Right Panel: Estimated Results (5 cols) */}
          <div className="lg:col-span-5 bg-white/[0.01] border border-white/[0.06] p-8 flex flex-col justify-between space-y-12">
            
            {/* Payment Box */}
            <div className="space-y-8 flex-grow flex flex-col justify-center text-center py-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans font-semibold block">
                  Estimated Monthly Payment
                </span>
                <div className="text-5xl md:text-6xl font-serif text-gold font-bold leading-tight">
                  <AnimatedNumber value={pAndI} />
                </div>
              </div>
              
              <div className="text-xs text-white/40 font-sans tracking-wide">
                Principal & interest · loan amount <AnimatedNumber value={loanAmount} />
              </div>
            </div>

            {/* Disclaimer & Action */}
            <div className="space-y-8">
              <p className="text-[10px] text-white/20 font-sans leading-relaxed text-center">
                Estimate only. Excludes taxes, insurance, HOA & PMI. Not a commitment to lend. Rates vary by lender, credit & program.
              </p>
              
              <button
                onClick={onOpenDrawer}
                className="btn-gold w-full py-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2 group cursor-pointer"
              >
                Get My Real Numbers
                <span className="group-hover:translate-x-1.5 transition-transform">→</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
