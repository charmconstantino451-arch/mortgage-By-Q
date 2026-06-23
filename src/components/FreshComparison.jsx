'use client';

export default function FreshComparison() {
  const comparisonPoints = [
    {
      title: 'Lender Selection',
      broker: 'Shops 150+ wholesale lenders simultaneously to find your best match.',
      banker: 'Can only sell products offered by their single employer bank.',
    },
    {
      title: 'Pricing & Rates',
      broker: 'Access to direct wholesale rates, bypassing consumer retail markup.',
      banker: 'Retail rates loaded with bank overhead, commissions, and branch costs.',
    },
    {
      title: 'Flexible Underwriting',
      broker: 'Tailored guidelines for W-2, self-employed, bank statements, and DSCR.',
      banker: 'Rigid, automated approval sheets. Self-employed borrowers are frequently declined.',
    },
    {
      title: 'Time to Close',
      broker: '15-day average close, managed directly by a personal, dedicated broker.',
      banker: '30-45 day average close. Files get lost in corporate processing queues.',
    },
  ];

  return (
    <section id="advantage" className="py-24 border-t border-white/5 bg-[#111212]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            The Broker Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-editorial-heading">
            Why shop 150+ lenders instead of walking into a single bank?
          </h2>
          <p className="text-white/60 leading-relaxed">
            A retail banker works for the bank—their job is to sell you the bank&apos;s rates. As an independent broker, Quyen Sy works for you. Our job is to make the banks compete for your signature.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Broker Panel */}
          <div className="flat-card p-8 bg-[#161717] border-gold/30 relative">
            <div className="absolute top-0 right-0 bg-gold text-black text-[10px] uppercase font-bold px-3 py-1">
              Your Advocate
            </div>
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-8 h-8 flex items-center justify-center bg-gold/10 border border-gold text-gold font-bold font-editorial-heading">Q</span>
              <h3 className="text-2xl font-bold font-editorial-heading">Quyen Sy (Broker)</h3>
            </div>
            
            <div className="space-y-6">
              {comparisonPoints.map((item, idx) => (
                <div key={idx} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
                  <h4 className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">{item.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{item.broker}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Retail Banker Panel */}
          <div className="flat-card p-8 bg-[#141515] border-white/5 opacity-80">
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 text-white/50 font-bold font-editorial-heading">B</span>
              <h3 className="text-2xl font-bold font-editorial-heading text-white/70">Retail Bankers</h3>
            </div>

            <div className="space-y-6">
              {comparisonPoints.map((item, idx) => (
                <div key={idx} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
                  <h4 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-2">{item.title}</h4>
                  <p className="text-white/55 text-sm leading-relaxed">{item.banker}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explanatory CTA Block */}
        <div className="mt-16 bg-[#161717] border border-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-semibold text-white">Affiliated with West Capital Lending</h4>
            <p className="text-xs text-white/50">Leveraging institutional leverage to secure deep wholesale pricing for California home buyers.</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-white/50 font-medium">NMLS #181907</span>
            <span className="text-xs text-white/50 font-medium">Equal Housing Opportunity</span>
          </div>
        </div>
      </div>
    </section>
  );
}
