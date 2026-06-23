'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const REVIEWS = [
  {
    name: 'Kerri M.',
    location: 'Rochester, WA',
    stars: 5,
    text: 'Quyen demonstrated incredible patience and thoroughly answered all my questions. His deep knowledge of refinance options was truly impressive. He found us a rate we could not believe was real. I have already referred him to three family members.',
    outcome: 'Refinance — Saved $387/mo',
  },
  {
    name: 'Andy T.',
    location: 'Thousand Oaks, CA',
    stars: 5,
    text: 'Great group of people to work with — painless and quick. They told us exactly what they needed and made it so simple. Closed in 22 days. Could not have asked for a smoother process from application to keys in hand.',
    outcome: 'Home Purchase — First Home',
  },
  {
    name: 'Laura M.',
    location: 'Royersford, PA',
    stars: 5,
    text: 'Quyen was wonderful to help get our loan. Great communication from start to finish. Highly recommend him to anyone looking to purchase a home or refinance. His team is extremely professional and responsive at every step.',
    outcome: 'Home Purchase — VA Loan',
  },
  {
    name: 'David R.',
    location: 'Irvine, CA',
    stars: 5,
    text: 'As a self-employed borrower, I was told by two other lenders that I simply did not qualify. Quyen found a bank-statement program that got us approved at a great rate. He fought for us when no one else would.',
    outcome: 'Non-QM — Self-Employed',
  },
  {
    name: 'Sarah K.',
    location: 'San Diego, CA',
    stars: 5,
    text: 'I was buying my first investment property and had no idea DSCR loans existed. Quyen walked me through everything. Closed with zero personal income docs required. Incredible expertise and genuine care for his clients.',
    outcome: 'DSCR — Investment Property',
  },
];

export default function ReviewCarousel() {
  const constraintRef = useRef(null);

  return (
    <section id="reviews" className="relative z-10 py-28 section-divider bg-obsidian/70 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">

        {/* Header */}
        <div className="space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.22em] text-gold font-sans font-semibold"
          >
            Premium Social Proof
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-6xl text-white font-bold"
          >
            2,500+ families.<br />
            <em className="gold-italic">One five-star experience.</em>
          </motion.h2>
        </div>

        {/* Drag Carousel */}
        <div ref={constraintRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={constraintRef}
            dragElastic={0.1}
            className="flex gap-5 pb-4"
            style={{ width: 'max-content' }}
          >
            {REVIEWS.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card flex-shrink-0 w-[340px] md:w-[400px] p-8 space-y-6 select-none"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array(review.stars).fill(null).map((_, s) => (
                    <span key={s} className="text-gold text-sm">★</span>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-white/60 text-sm font-sans leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer info */}
                <div className="border-t border-white/[0.06] pt-4 flex items-end justify-between">
                  <div>
                    <div className="text-white font-serif font-semibold text-base">{review.name}</div>
                    <div className="text-white/30 text-xs font-sans mt-0.5">{review.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-wider text-gold/60 font-sans font-medium bg-gold/5 border border-gold/15 px-2.5 py-1">
                      {review.outcome}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Drag hint */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/20 text-xs font-sans">
            <span>←</span>
            <span>Drag to explore</span>
            <span>→</span>
          </div>
          <a
            href="#"
            className="btn-ghost px-6 py-2.5 text-xs flex items-center gap-2 group"
          >
            Read Verified 4.9★ Reviews
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
