'use client';

import { useState, useEffect } from 'react';

export default function FreshCalculator({ onCtaClick }) {
  const [homePrice, setHomePrice] = useState(650000);
  const [downPayment, setDownPayment] = useState(130000); // 20% default
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTerm, setLoanTerm] = useState(30); // years
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Synchronize down payment dollar amount when home price changes to keep percentage reasonable
  useEffect(() => {
    if (downPayment > homePrice) {
      setDownPayment(homePrice);
    }
  }, [homePrice]);

  useEffect(() => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    if (loanAmount <= 0) {
      setMonthlyPayment(0);
      return;
    }

    if (monthlyRate === 0) {
      setMonthlyPayment(loanAmount / numberOfPayments);
      return;
    }

    const payment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(payment);
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const handlePercentageChange = (pct) => {
    setDownPayment(Math.round(homePrice * (pct / 100)));
  };

  const downPaymentPercentage = Math.round((downPayment / homePrice) * 100) || 0;
  const loanAmount = homePrice - downPayment;

  return (
    <section id="calculator" className="py-24 bg-[#141515] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Intro */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              Payment Dashboard
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-editorial-heading">
              Estimate your wholesale mortgage payment.
            </h2>
            <p className="text-white/60 leading-relaxed">
              Wholesale interest rates are significantly lower than traditional retail bank rates. Adjust the sliders to see how small rate differences save you thousands over the life of your home loan.
            </p>
            <div className="p-5 bg-[#161717] border border-white/5 space-y-2">
              <h4 className="text-xs font-semibold text-gold uppercase tracking-wider">The Wholesale Effect</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                A 0.5% reduction in rate on a $500,000 loan saves you approximately <strong>$150/month</strong> and over <strong>$54,000</strong> in interest payments over 30 years.
              </p>
            </div>
          </div>

          {/* Right Column: Calculator Box */}
          <div className="lg:col-span-7">
            <div className="flat-card p-6 md:p-8 bg-[#161717] border-white/10 space-y-8">
              {/* Payment Output Header */}
              <div className="flex flex-col sm:flex-row items-baseline sm:justify-between pb-6 border-b border-white/5">
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-widest block">Estimated Monthly P&I</span>
                  <span className="text-4xl md:text-5xl font-bold font-editorial-heading text-gold">
                    ${Math.round(monthlyPayment).toLocaleString()}
                    <span className="text-sm font-sans font-medium text-white/40">/mo</span>
                  </span>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className="text-xs text-white/40 uppercase tracking-widest block">Loan Amount</span>
                  <span className="text-lg font-semibold text-white">
                    ${Math.round(loanAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Sliders Block */}
              <div className="space-y-6">
                {/* Home Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Home Price</span>
                    <span className="font-semibold text-white">${homePrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="10000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Down Payment */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Down Payment ({downPaymentPercentage}%)</span>
                    <span className="font-semibold text-white">${downPayment.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max={homePrice}
                    step="5000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full"
                  />
                  {/* Preset Percentages */}
                  <div className="flex space-x-2 pt-1">
                    {[3, 5, 10, 20].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => handlePercentageChange(pct)}
                        className={`text-[10px] px-2 py-1 border transition-colors ${
                          downPaymentPercentage === pct
                            ? 'border-gold text-gold bg-gold/5'
                            : 'border-white/10 text-white/40 hover:border-white/30'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Interest Rate</span>
                    <span className="font-semibold text-white">{interestRate.toFixed(2)}%</span>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="9.5"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Term Buttons & CTA */}
              <div className="pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* Loan Term */}
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setLoanTerm(30)}
                    className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      loanTerm === 30
                        ? 'bg-gold text-black'
                        : 'bg-[#1e2020] text-white/60 hover:text-white border border-white/5'
                    }`}
                  >
                    30-Year Fixed
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoanTerm(15)}
                    className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      loanTerm === 15
                        ? 'bg-gold text-black'
                        : 'bg-[#1e2020] text-white/60 hover:text-white border border-white/5'
                    }`}
                  >
                    15-Year Fixed
                  </button>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="btn-gold py-3 text-xs uppercase tracking-wider font-bold"
                >
                  Verify This Rate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
