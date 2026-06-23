'use client';

import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  { name: 'Facebook', href: '#', icon: 'FB' },
  { name: 'Instagram', href: '#', icon: 'IG' },
  { name: 'Twitter', href: '#', icon: 'X' },
  { name: 'LinkedIn', href: '#', icon: 'LN' },
  { name: 'YouTube', href: '#', icon: 'YT' },
  { name: 'TikTok', href: '#', icon: 'TT' },
];

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About Quyen', href: '#broker-edge' },
  { label: 'Loan Programs', href: '#services' },
  { label: 'Contact', href: '#footer' },
  { label: 'Reviews', href: '#reviews' },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative z-10 w-full bg-void-black border-t border-white/[0.06] pt-20 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Block: Corporate Summary */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold flex items-center justify-center font-serif text-black text-sm font-bold leading-none select-none">
                Q
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-serif text-xs font-bold tracking-[0.18em] uppercase">
                  Mortgage by Q
                </span>
                <span className="text-white/40 text-[9px] tracking-widest uppercase mt-0.5 font-sans">
                  West Capital Lending
                </span>
              </div>
            </div>
            
            <p className="text-white/40 text-xs leading-relaxed font-sans max-w-sm">
              Dedicated to pairing home buyers and real estate investors with bespoke, zero-junk-fee financing packages. 
              We utilize state-of-the-art pricing engines to browse over 200 competing wholesale lenders on every deal.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/50 hover:text-gold hover:border-gold transition-all duration-300 font-mono"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Center Block: Links */}
          <div className="md:col-span-3 space-y-6 md:pl-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold block">
              Navigation
            </span>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-white/50 hover:text-gold transition-colors font-sans"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Block: Contact & Location */}
          <div className="md:col-span-4 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold block">
              Office & Contact
            </span>
            <div className="space-y-4 text-xs font-sans text-white/60">
              <a href="tel:9495367410" className="flex items-center gap-2 hover:text-gold transition-colors">
                <span className="text-gold">☎</span> (949) 536-7410
              </a>
              <a href="mailto:Qsy@westcapitallending.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                <span className="text-gold">✉</span> Qsy@westcapitallending.com
              </a>
              <p className="leading-relaxed text-white/40">
                📍 1799 Von Karman Ave, Ste 400, Irvine, CA 92614
              </p>
              <div className="pt-2 flex items-center gap-2 text-white/80 font-medium">
                <span>🏠</span> Equal Housing Lender
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Compliance & Licensing */}
        <div className="border-t border-white/[0.08] pt-8 space-y-6">
          <div className="text-[10px] text-white/30 leading-relaxed space-y-3 font-sans">
            <p>
              Quyen &quot;Q&quot; Sy is an Executive Branch Manager and licensed mortgage broker of West Capital Lending, Inc. 
              All loans are subject to credit approval, underwriting guidelines, and property evaluation. Program terms, 
              rates, and conditions are subject to change without notice. This is not a commitment to lend.
            </p>
            <p>
              Quyen Sy (NMLS #1028669, DRE #02350634). West Capital Lending, Inc. (NMLS #1028669, DRE #02350634). 
              For licensing validation, visit the NMLS Consumer Access portal at www.nmlsconsumeraccess.org. 
              Authorized to conduct business in compliance with state-specific lending frameworks and regulatory acts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] text-white/20 font-sans">
            <p>© 2026 Mortgage by Q | West Capital Lending. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Licensing</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
