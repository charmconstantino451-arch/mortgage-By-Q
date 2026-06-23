'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 1, title: 'What is your lending goal?' },
  { id: 2, title: 'Your credit & scenario' },
  { id: 3, title: 'Where should I send your options?' },
];

export default function ContactDrawer({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('Purchase');
  const [credit, setCredit] = useState('Excellent (740+)');
  const [budget, setBudget] = useState(650000);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${name}! Quyen Sy and the Mortgage by Q team will review your ${credit} credit scenario for a ${goal} loan of $${budget.toLocaleString()} and reach out shortly.`);
    onClose();
    // Reset wizard
    setStep(1);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 180 }}
            className="relative w-full max-w-md h-full bg-obsidian text-white border-l border-white/[0.08] p-8 flex flex-col justify-between overflow-y-auto z-10"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-sans font-bold">
                    Step {step} of 3
                  </span>
                  <h3 className="font-serif text-2xl text-white font-medium">
                    {STEPS[step - 1].title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Multi-step Forms */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3"
                    >
                      {[
                        { label: 'Purchase a Home', desc: 'Standard Conventional / FHA / VA options', value: 'Purchase' },
                        { label: 'Refinance & Cash-Out', desc: 'Lower your rate or unlock equity', value: 'Refinance' },
                        { label: 'Self-Employed Loan', desc: 'Bank statement & alt-income programs', value: 'Self-Employed' },
                        { label: 'DSCR Investment Portfolio', desc: 'Qualify using rental cash flow only', value: 'DSCR' }
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setGoal(opt.value);
                            handleNext();
                          }}
                          className={`w-full text-left p-4 border transition-all ${
                            goal === opt.value
                              ? 'border-gold bg-gold/[0.03]'
                              : 'border-white/[0.08] hover:border-white/20 bg-white/[0.01]'
                          }`}
                        >
                          <div className="font-serif text-sm font-semibold text-white">{opt.label}</div>
                          <div className="text-white/40 text-[11px] mt-0.5 font-sans">{opt.desc}</div>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      {/* Credit Range */}
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 font-sans font-bold">
                          Estimated Credit Score
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Excellent (740+)', 'Good (680-739)', 'Fair (620-679)', 'Alternative'].map((scr) => (
                            <button
                              key={scr}
                              type="button"
                              onClick={() => setCredit(scr)}
                              className={`py-3 px-2 text-center text-xs font-sans border transition-all ${
                                credit === scr
                                  ? 'border-gold bg-gold/5 text-gold'
                                  : 'border-white/[0.08] hover:border-white/20 text-white/60 bg-white/[0.01]'
                              }`}
                            >
                              {scr}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Loan Amount Slider */}
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between text-xs font-sans">
                          <span className="text-white/40 uppercase tracking-wider text-[10px] font-bold">Estimated Loan Size</span>
                          <span className="text-gold font-bold">${budget.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min="150000"
                          max="2000000"
                          step="10000"
                          value={budget}
                          onChange={(e) => setBudget(Number(e.target.value))}
                          className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-gold focus:outline-none"
                        />
                        <div className="flex justify-between text-[8px] font-mono text-white/20">
                          <span>$150K</span>
                          <span>$1.1M</span>
                          <span>$2.0M</span>
                        </div>
                      </div>

                      {/* Nav buttons */}
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="flex-1 btn-ghost py-3 text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="flex-1 btn-gold py-3 text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Next Step
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 font-sans font-bold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white/[0.02] text-white border border-white/[0.08] focus:border-gold focus:outline-none p-3 text-xs transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 font-sans font-bold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/[0.02] text-white border border-white/[0.08] focus:border-gold focus:outline-none p-3 text-xs transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 font-sans font-bold">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white/[0.02] text-white border border-white/[0.08] focus:border-gold focus:outline-none p-3 text-xs transition-colors"
                          placeholder="(555) 000-0000"
                        />
                      </div>

                      {/* Nav buttons */}
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="flex-1 btn-ghost py-3 text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 btn-gold py-3 text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Submit
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Footer NMLS info */}
            <div className="border-t border-white/[0.08] pt-6 mt-8 text-[10px] text-white/20 space-y-1">
              <p>Affiliated with West Capital Lending, Inc.</p>
              <p>Corporate NMLS #1028669 | CA DRE #02350634</p>
              <p>Equal Housing Opportunity Lender. Subject to guidelines.</p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
