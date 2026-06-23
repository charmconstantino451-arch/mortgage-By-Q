'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FreshHero({ onCtaClick, onSecondaryCtaClick }) {
  const [bids, setBids] = useState([
    { name: 'United Wholesale', rate: '6.45%', status: 'calculating', active: true },
    { name: 'Rocket Pro TPO', rate: '6.58%', status: 'calculating', active: false },
    { name: 'Pennymac Wholesale', rate: '6.35%', status: 'calculating', active: false },
    { name: 'Caliber Home Loans', rate: '6.70%', status: 'calculating', active: false },
  ]);
  const [winnerIndex, setWinnerIndex] = useState(-1);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    // Bidding animation sequence
    setWinnerIndex(-1);
    setBids([
      { name: 'United Wholesale Mortgage', rate: '6.45%', status: 'evaluating...', active: false },
      { name: 'Rocket Pro TPO', rate: '6.58%', status: 'evaluating...', active: false },
      { name: 'Pennymac Wholesale', rate: '6.25%', status: 'evaluating...', active: false },
      { name: 'Plaza Home Mortgage', rate: '6.65%', status: 'evaluating...', active: false },
    ]);

    const timers = [];
    
    // Step-by-step evaluation
    bids.forEach((_, idx) => {
      timers.push(setTimeout(() => {
        setBids(prev => {
          const next = [...prev];
          next[idx].status = 'submitted';
          next[idx].active = true;
          return next;
        });
      }, (idx + 1) * 1000));
    });

    // Reveal winner
    timers.push(setTimeout(() => {
      setWinnerIndex(2); // Pennymac is lowest at 6.25%
      setBids(prev => {
        const next = [...prev];
        next.forEach((bid, i) => {
          if (i === 2) {
            bid.status = 'MATCHED (Lowest)';
          } else {
            bid.status = 'outbid';
            bid.active = false;
          }
        });
        return next;
      });
    }, 5000));

    // Loop every 12 seconds
    const interval = setInterval(() => {
      setResetKey(prev => prev + 1);
    }, 12000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [resetKey]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#111212]">
      {/* Editorial Grid */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Brand Statement */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold bg-gold/10 px-3 py-1 rounded-full">
              Quyen Sy — Affiliated with West Capital Lending
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-editorial-heading leading-[1.05] tracking-tight">
              150+ Lenders. <br />
              One Advocate. <br />
              <span className="text-gold italic font-normal">The Better Rate.</span>
            </h1>
          </div>

          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            Shopping for a mortgage alone is exhausting. Retail banks sell you only their own high-interest loans. 
            As an independent broker, Quyen Sy shops over 150 wholesale lenders simultaneously, forcing them to compete for your business. We find custom programs for first-time buyers, property investors, and self-employed borrowers who get rejected by traditional banks.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onCtaClick}
              className="btn-gold px-8 py-4 text-sm uppercase tracking-wider font-bold"
            >
              Get Started
            </button>
            <button
              onClick={onSecondaryCtaClick}
              className="btn-ghost px-8 py-4 text-sm uppercase tracking-wider font-semibold"
            >
              Compare Brokers vs. Bankers
            </button>
          </div>

          {/* Core USP strip */}
          <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-6 text-center sm:text-left">
            <div>
              <p className="text-3xl font-editorial-heading font-bold text-gold">150+</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Wholesale Lenders</p>
            </div>
            <div>
              <p className="text-3xl font-editorial-heading font-bold text-gold">0$</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Broker Fees</p>
            </div>
            <div>
              <p className="text-3xl font-editorial-heading font-bold text-gold">15-Day</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Average Close</p>
            </div>
          </div>
        </div>

        {/* Right Column: Live Competition Interactive Mockup */}
        <div className="lg:col-span-5 w-full">
          <div className="flat-card p-6 md:p-8 space-y-6 relative overflow-hidden bg-[#161717] border-white/10">
            {/* Flat top bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-white">Wholesale Bid Center</h3>
                <p className="text-xs text-white/40">Active comparison request #MBQ-2026</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Live Broker Audit</span>
              </div>
            </div>

            {/* Parameter Bar */}
            <div className="bg-[#1e2020] p-4 flex justify-between text-xs border border-white/5">
              <div>
                <span className="block text-white/40 uppercase text-[9px] tracking-wider">Scenario</span>
                <span className="font-semibold text-white">30-Yr Fixed • $650K</span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-[9px] tracking-wider">Credit Range</span>
                <span className="font-semibold text-white">720 - 739</span>
              </div>
              <div>
                <span className="block text-white/40 uppercase text-[9px] tracking-wider">Location</span>
                <span className="font-semibold text-white">California</span>
              </div>
            </div>

            {/* Bids List */}
            <div className="space-y-3">
              {bids.map((bid, index) => {
                const isSelected = index === winnerIndex;
                return (
                  <div
                    key={index}
                    className={`p-4 transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? 'bg-gold/10 border border-gold'
                        : bid.active
                        ? 'bg-[#1e2020] border border-white/10'
                        : 'bg-[#181919] border border-white/5 opacity-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-white block">{bid.name}</span>
                      <span
                        className={`text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-sm inline-block ${
                          isSelected
                            ? 'bg-gold text-black'
                            : bid.status === 'submitted'
                            ? 'bg-white/10 text-white/80'
                            : 'bg-white/5 text-white/40'
                        }`}
                      >
                        {bid.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-lg font-bold block ${
                          isSelected ? 'text-gold font-editorial-heading' : 'text-white'
                        }`}
                      >
                        {bid.rate}
                      </span>
                      <span className="text-[10px] text-white/40">APR</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Results block */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Broker Result</p>
                <p className="text-base font-semibold text-white">
                  {winnerIndex !== -1 ? 'Pennymac Wins (Save $284/mo)' : 'Auditing wholesale sheets...'}
                </p>
              </div>
              <button
                onClick={onCtaClick}
                className="btn-gold px-4 py-2 text-[10px] uppercase font-bold"
              >
                Match My Rate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
