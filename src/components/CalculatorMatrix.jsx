'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CalculatorMatrix({ onCtaClick }) {
  const [homePrice, setHomePrice] = useState(650000);
  const [downPayment, setDownPayment] = useState(130000); // 20%
  const [interestRate, setInterestRate] = useState(6.25);
  const [term, setTerm] = useState(30); // 30 years
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    if (downPayment > homePrice) {
      setDownPayment(homePrice);
    }
  }, [homePrice]);

  useEffect(() => {
    const loan = homePrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const n = term * 12;

    if (loan <= 0) {
      setPayment(0);
      return;
    }

    if (monthlyRate === 0) {
      setPayment(loan / n);
      return;
    }

    const calculatedPayment =
      (loan * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
      (Math.pow(1 + monthlyRate, n) - 1);

    setPayment(calculatedPayment);
  }, [homePrice, downPayment, interestRate, term]);

  const downPaymentPercent = Math.round((downPayment / homePrice) * 100) || 0;
  const loanAmount = homePrice - downPayment;

  return (
    <section id="calculator" className="py-24 bg-transparent z-10 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D9B48F] font-bold">
            Interactive Rate Matrix
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-editorial-heading text-white">
            Estimate your payment with wholesale margins.
          </h2>
          <p className="text-white/60 leading-relaxed text-sm md:text-base">
            Retail bank markups add massive cost to home financing. Use this simulator to check how moving from retail bank pricing to wholesale broker catalogs saves you monthly cash flow.
          </p>
        </div>

        {/* Dashboard Block */}
        <div className="flat-card p-6 md:p-12 bg-[#161717]/95 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Sliders Grid */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Home Price */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-white/50 font-bold">Home Value</span>
                <span className="text-xl font-bold text-white font-editorial-heading">
                  ${homePrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="2500000"
                step="10000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#D9B48F]"
              />
            </div>

            {/* Down Payment */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-white/50 font-bold">
                  Down Payment ({downPaymentPercent}%)
                </span>
                <span className="text-xl font-bold text-white font-editorial-heading">
                  ${downPayment.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max={homePrice}
                step="5000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#D9B48F]"
              />
              <div className="flex space-x-2">
                {[5, 10, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPayment(Math.round(homePrice * (pct / 100)))}
                    className={`text-[10px] px-3 py-1 border font-bold uppercase transition-colors ${
                      downPaymentPercent === pct
                        ? 'border-[#D9B48F] text-[#D9B48F] bg-[#D9B48F]/5'
                        : 'border-white/5 text-white/40 hover:border-white/20'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-white/50 font-bold">Interest Rate</span>
                <span className="text-xl font-bold text-[#D9B48F] font-editorial-heading">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min="3.00"
                max="9.50"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#D9B48F]"
              />
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-[#1b1c1c] border border-white/5 p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#D9B48F] font-bold block">
                Estimated Output
              </span>
              
              <div className="space-y-1">
                <span className="text-xs text-white/40 uppercase tracking-wider block">Principal & Interest</span>
                <h3 className="text-4xl md:text-5xl font-bold font-editorial-heading text-white">
                  ${Math.round(payment).toLocaleString()}
                  <span className="text-sm font-sans font-medium text-white/30">/mo</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs">
                <div>
                  <span className="text-white/40 block">Loan Amount</span>
                  <span className="font-semibold text-white">${Math.round(loanAmount).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Loan Term</span>
                  <div className="flex space-x-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setTerm(30)}
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 border ${term === 30 ? 'border-[#D9B48F] text-[#D9B48F]' : 'border-white/5 text-white/40'}`}
                    >
                      30-Yr
                    </button>
                    <button
                      type="button"
                      onClick={() => setTerm(15)}
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 border ${term === 15 ? 'border-[#D9B48F] text-[#D9B48F]' : 'border-white/5 text-white/40'}`}
                    >
                      15-Yr
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onCtaClick({ homePrice, downPayment, interestRate, term })}
              className="w-full btn-gold py-4 text-xs uppercase tracking-wider font-bold text-center"
            >
              Verify wholesale rate
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
