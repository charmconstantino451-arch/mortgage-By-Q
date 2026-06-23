'use client';

export default function TrustTicker() {
  const lenders = [
    { name: 'United Wholesale Mortgage' },
    { name: 'Rocket Pro TPO' },
    { name: 'Pennymac Wholesale' },
    { name: 'Caliber Home Loans' },
    { name: 'Plaza Home Mortgage' },
    { name: 'Flagstar Wholesale' },
    { name: 'Angel Oak Mortgage' },
    { name: 'Carrington Wholesale' },
  ];

  return (
    <section className="relative z-10 w-full py-8 border-y border-white/5 bg-[#111212]/90 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[#D9B48F] font-bold">
          Wholesale Network Leveraged
        </span>
        <span className="text-[9px] uppercase tracking-widest text-white/30 font-semibold hidden sm:inline">
          Direct Lender Access • Institutional Pricing
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex flex-nowrap">
        {/* We double the elements to ensure seamless loop */}
        <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap min-w-full space-x-12">
          {lenders.concat(lenders).map((lender, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center h-10 px-4 text-xs font-semibold uppercase tracking-wider text-white/40 select-none hover:text-[#D9B48F] transition-colors duration-300"
            >
              {lender.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
