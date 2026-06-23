'use client';

export default function FreshLoanMatrix({ onProductSelect }) {
  const loanProducts = [
    {
      id: 'first-time',
      title: 'First-Time Buyers',
      subtitle: 'Accessible Homeownership',
      description: 'Flexible programs designed to help individuals and families buy their first home with minimal down payment options.',
      features: ['Down payments as low as 3%', 'FHA, VA, and Conventional', 'Down payment assistance options'],
      icon: (
        <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'self-employed',
      title: 'Self-Employed & W-2 Alternatives',
      subtitle: 'Alternative Income Underwriting',
      description: 'For business owners, freelancers, and W-2 contractors who cannot show standard corporate tax records.',
      features: ['12 & 24-month bank statement loans', 'No W-2 or tax returns required', 'Asset depletion programs'],
      icon: (
        <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'investors',
      title: 'Property Investors',
      subtitle: 'DSCR & Portfolio Financing',
      description: 'Helping investors acquire or refinance rental assets rapidly based on the property cashflow, not personal W-2 income.',
      features: ['DSCR loans based on rental income', 'Qualify using lease agreement values', 'Unlimited portfolio scaling'],
      icon: (
        <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'refinance',
      title: 'Refinance Solutions',
      subtitle: 'Rate Reduction & Equity Release',
      description: 'Lower your monthly payment or withdraw equity to consolidate high-interest debt or fund investments.',
      features: ['Rate-and-term reductions', 'Cash-out refinancing', 'FHA & VA streamline refinances'],
      icon: (
        <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#111212] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Product Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-editorial-heading">
            Custom financing programs for every borrower path.
          </h2>
          <p className="text-white/60 leading-relaxed">
            Because Quyen Sy works with 150+ lenders, we aren&apos;t restricted to standard bank boxes. We find specialized loan products optimized for your specific financial profile.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanProducts.map((product) => (
            <div
              key={product.id}
              className="flat-card p-6 bg-[#161717] border-white/5 flex flex-col justify-between hover:border-gold/30 transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center bg-[#1e2020] border border-white/5">
                  {product.icon}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-editorial-heading text-white">{product.title}</h3>
                  <span className="text-[10px] uppercase font-bold text-gold/80 tracking-wider block">
                    {product.subtitle}
                  </span>
                </div>

                <p className="text-xs text-white/50 leading-relaxed">{product.description}</p>

                <ul className="space-y-2 pt-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-white/70">
                      <span className="text-gold font-bold mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onProductSelect(product.title)}
                  className="w-full py-2 bg-[#1e2020] hover:bg-gold hover:text-black border border-white/5 hover:border-gold transition-colors text-xs uppercase font-bold tracking-wider"
                >
                  Explore Program
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
