'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FreshWizard({ initialProgram = '' }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    objective: '',
    employment: '',
    homeValue: '650000',
    downPayment: '130000',
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSelect = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    nextStep();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const stepsVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <section id="wizard" className="py-24 bg-[#141515] border-t border-white/5 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Eligibility Portal
          </span>
          <h2 className="text-4xl font-bold font-editorial-heading">
            Check your wholesale eligibility in 60 seconds.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Answer a few quick questions to help Quyen Sy filter rates across our network of 150+ lenders.
          </p>
        </div>

        <div className="flat-card p-8 md:p-12 bg-[#161717] border-white/10 relative min-h-[400px] flex flex-col justify-between">
          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#1e2020]">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                variants={stepsVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-center py-12 space-y-6 flex-1 flex flex-col justify-center items-center"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-gold/10 border border-gold rounded-full text-gold">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-editorial-heading text-white">Application Received</h3>
                  <p className="text-sm text-white/50 max-w-md leading-relaxed mx-auto">
                    Quyen Sy will audit our wholesale catalogs matching your scenario. A representative from <strong>West Capital Lending</strong> will be in touch shortly.
                  </p>
                </div>
                <div className="bg-[#1e2020] p-4 text-xs max-w-sm border border-white/5">
                  <span className="block text-gold uppercase tracking-wider font-bold mb-1">Match Factor: 96% Success</span>
                  <p className="text-white/40">Our wholesale filters indicate active programs match your profile.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 flex-1 flex flex-col justify-between">
                <div>
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepsVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold font-editorial-heading text-white">What is your loan objective?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => handleSelect('objective', 'Purchase')}
                          className={`p-6 text-left border hover:border-gold hover:bg-gold/5 transition-all flex flex-col justify-between h-36 ${
                            formData.objective === 'Purchase' ? 'border-gold bg-gold/5' : 'border-white/5 bg-[#1e2020]'
                          }`}
                        >
                          <span className="text-xs text-white/40 uppercase tracking-widest block">Objective A</span>
                          <span className="text-lg font-bold text-white block mt-auto">Purchase a New Home</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelect('objective', 'Refinance')}
                          className={`p-6 text-left border hover:border-gold hover:bg-gold/5 transition-all flex flex-col justify-between h-36 ${
                            formData.objective === 'Refinance' ? 'border-gold bg-gold/5' : 'border-white/5 bg-[#1e2020]'
                          }`}
                        >
                          <span className="text-xs text-white/40 uppercase tracking-widest block">Objective B</span>
                          <span className="text-lg font-bold text-white block mt-auto">Refinance Existing Loan</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepsVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold font-editorial-heading text-white">Select your primary income source</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { value: 'w2', label: 'W-2 Employee', desc: 'Standard tax records' },
                          { value: 'self-employed', label: 'Self-Employed', desc: 'Business owners / Freelance' },
                          { value: 'investor', label: 'Investor', desc: 'Rental income / DSCR' },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelect('employment', opt.value)}
                            className={`p-6 text-left border hover:border-gold hover:bg-gold/5 transition-all flex flex-col justify-between h-40 ${
                              formData.employment === opt.value ? 'border-gold bg-gold/5' : 'border-white/5 bg-[#1e2020]'
                            }`}
                          >
                            <span className="text-[10px] text-white/40 uppercase tracking-wider block">{opt.desc}</span>
                            <span className="text-base font-bold text-white block mt-auto">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={stepsVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold font-editorial-heading text-white">What is your target budget?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs text-white/60 uppercase tracking-wider block">Estimated Home Value ($)</label>
                          <input
                            type="number"
                            name="homeValue"
                            value={formData.homeValue}
                            onChange={handleChange}
                            className="flat-input w-full p-4 text-white font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-white/60 uppercase tracking-wider block">Target Down Payment ($)</label>
                          <input
                            type="number"
                            name="downPayment"
                            value={formData.downPayment}
                            onChange={handleChange}
                            className="flat-input w-full p-4 text-white font-medium"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      variants={stepsVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold font-editorial-heading text-white">Provide your contact info to audit rates</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs text-white/60 uppercase tracking-wider block">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="flat-input w-full p-4 text-sm"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-white/60 uppercase tracking-wider block">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="flat-input w-full p-4 text-sm"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-white/60 uppercase tracking-wider block">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="flat-input w-full p-4 text-sm"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Form Controls */}
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div>
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-xs uppercase tracking-widest text-white/40 hover:text-white font-bold transition-colors"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                  <div>
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-gold px-6 py-3 text-xs uppercase tracking-wider font-bold"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-gold px-8 py-3 text-xs uppercase tracking-wider font-bold"
                      >
                        {isSubmitting ? 'Submitting...' : 'Find My Wholesale Rate'}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
