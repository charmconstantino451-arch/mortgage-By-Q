'use client';

export default function SolutionGrid({ onSelect }) {
  const solutions = [
    {
      id: 'first-time',
      title: 'First-Time Homebuyers',
      tag: 'Conventional & FHA',
      description: 'Streamlined loan options with down payments as low as 3%. Designed to help individuals and growing families secure their primary residences with minimal upfront cash friction.',
      features: ['Down payments starting at 3%', 'Gift funds permitted for down payment', 'FHA & VA government-backed loans'],
      offset: 'md:translate-y-0',
    },
    {
      id: 'self-employed',
      title: 'Self-Employed Underwriting',
      tag: 'Bank Statement Loans',
      description: 'Custom underwriting sheets for entrepreneurs, contractors, and business owners. We qualify your income using 12 or 24 months of bank deposits, bypassing standard W-2 tax transcript blocks.',
      features: ['No tax returns or W-2 sheets required', '12 & 24-month deposit averages', 'Up to 90% LTV programs available'],
      offset: 'md:translate-y-6',
    },
    {
      id: 'dscr',
      title: 'DSCR Investor Financing',
      tag: 'Cash-Flow Lending',
      description: 'Debt Service Coverage Ratio loans built for real estate investors. We qualify the loan strictly based on the projected rental cash flow of the subject property, with zero personal income audits.',
      features: ['No debt-to-income (DTI) check', 'Qualify using lease agreements', 'Perfect for LLC portfolio scaling'],
      offset: 'md:translate-y-12',
    },
    {
      id: 'non-qm',
      title: 'Non-QM & Luxury Jumbo',
      tag: 'Custom Private Finance',
      description: 'For luxury acquisitions exceeding standard conforming limits. We leverage custom broker conduits to design bespoke jumbo structures for high-net-worth individuals.',
      features: ['Loan amounts up to $10M', 'Flexible asset-depletion qualification', 'Interest-only payment options'],
      offset: 'md:translate-y-0',
    },
    {
      id: 'bridge',
      title: 'Bridge & Short-Term Equity',
      tag: 'Bridge Loans',
      description: 'Acquire your next property using the equity in your current home before it sells. Avoid contingency clauses in competitive housing markets and close rapidly.',
      features: ['12 to 24-month term flexibility', 'Interest-only structures available', 'Fast funding options within days'],
      offset: 'md:translate-y-6',
    },
    {
      id: 'refinance',
      title: 'Streamlined Refinancing',
      tag: 'Rate & Equity Release',
      description: 'Capitalize on shifting markets. We shop wholesale rate charts to reduce your monthly P&I, shorten your term, or extract cash equity for other investments.',
      features: ['Streamlined processing with minimal files', 'No-appraisal options available', 'FHA/VA streamline rate-reductions'],
      offset: 'md:translate-y-12',
    },
  ];

  return (
    <section id="services" className="relative z-10 py-32 bg-white text-[#151717]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-24 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D9B48F] font-bold bg-[#D9B48F]/10 px-3 py-1 inline-block">
            Financing Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-editorial-heading tracking-tight">
            Six paths to wholesale capital.
          </h2>
          <p className="text-[#151717]/60 leading-relaxed text-sm md:text-lg">
            Because we operate as independent advisors, we aren&apos;t confined to a single bank&apos;s product catalog. We access customized broker channels for W-2 earners, self-employed business owners, and property investors alike.
          </p>
        </div>

        {/* 6-Panel CSS Grid with vertical offsets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 pb-12">
          {solutions.map((item) => (
            <div
              key={item.id}
              className={`flat-card p-8 bg-white border border-black/10 flex flex-col justify-between h-[420px] transition-all duration-300 hover:border-[#D9B48F] hover:shadow-lg ${item.offset}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-black/5 pb-3">
                  <span className="text-[10px] uppercase font-bold text-[#D9B48F] tracking-widest">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-editorial-heading text-[#151717]">
                  {item.title}
                </h3>
                
                <p className="text-xs text-[#151717]/60 leading-relaxed">
                  {item.description}
                </p>

                <ul className="space-y-2 pt-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-[#151717]/80">
                      <span className="text-[#D9B48F] font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onSelect(item.title)}
                  className="w-full py-3 bg-[#151717] hover:bg-[#D9B48F] hover:text-black transition-colors text-white text-xs uppercase font-bold tracking-wider"
                >
                  Apply Under This Program
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
