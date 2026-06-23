'use client';

export default function FreshFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0c0c] border-t border-white/5 py-16 text-white/50 text-xs">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <span className="font-editorial-heading text-xl font-bold text-white">
            Mortgage by <span className="text-gold italic font-normal">Q</span>
          </span>
          <p className="leading-relaxed max-w-sm">
            Independent mortgage broker Quyen Sy helps home buyers and investors shop 150+ wholesale lenders to lock in California’s most competitive mortgage rates.
          </p>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Contact & Advisory</h4>
          <ul className="space-y-2">
            <li>
              <span className="block text-white/30 text-[9px] uppercase tracking-wider">Direct Hotline</span>
              <a href="tel:7148564023" className="text-white hover:text-gold transition-colors text-sm font-semibold">
                (714) 856-4023
              </a>
            </li>
            <li>
              <span className="block text-white/30 text-[9px] uppercase tracking-wider">Email Inquiry</span>
              <a href="mailto:qsy@westcaplending.com" className="text-white hover:text-gold transition-colors text-sm">
                qsy@westcaplending.com
              </a>
            </li>
          </ul>
        </div>

        {/* Regulatory Column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Licensing & Operations</h4>
          <p className="leading-relaxed">
            Quyen Sy is a licensed mortgage professional affiliated with <strong>West Capital Lending, Inc.</strong>
          </p>
          <div className="space-y-1">
            <p className="text-[10px] text-white/30">West Capital Lending NMLS #181907</p>
            <p className="text-[10px] text-white/30">DRE License #02073994</p>
            <p className="text-[10px] text-white/30">Equal Housing Opportunity Broker</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {currentYear} Mortgage by Q. All rights reserved.</p>
        <div className="flex space-x-6 text-[10px] uppercase tracking-wider font-bold">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Licensing Disclosures</a>
        </div>
      </div>
    </footer>
  );
}
