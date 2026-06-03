import React from 'react';

interface Bucket {
  label: string;
  tickers: string[];
  blurb: string;
}

const BUCKETS: Bucket[] = [
  {
    label: 'Defense + GovTech',
    tickers: ['LMT', 'RTX', 'PLTR', 'BWXT', 'GD'],
    blurb: 'Multi-decade procurement pipelines, state-protected margins, classified-workload moats. Sell-side models attribute zero terminal value to 10-year backlogs they cannot underwrite.',
  },
  {
    label: 'Rockets + Space',
    tickers: ['RKLB', 'ASTS', 'BA', 'SpaceX (private)'],
    blurb: 'Launch cadence is the only thing that matters and it compounds non-linearly. Per-kilo cost still falling 30%/year. The market keeps treating this like aerospace; it is becoming logistics.',
  },
  {
    label: 'Contrarian Discretionary',
    tickers: ['SHOP'],
    blurb: 'Consensus: mature e-commerce, growth slowing. Our read: the agentic-commerce infrastructure layer — every AI agent that buys things buys through a Shopify API. The unit economics are about to inflect.',
  },
];

const FeaturedTheme: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 rounded-2xl shadow-2xl border border-amber-900/30 overflow-hidden">
      <div className="bg-slate-950/60 px-6 py-3 md:px-8 border-b border-slate-800 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
          Featured Theme · The Asymmetric Tape
        </span>
        <span className="text-[10px] font-mono text-slate-500">
          Multi-year horizon
        </span>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-3">
            Asymmetric bets live <span className="text-amber-400">where the cycle is long.</span>
          </h2>
          <p className="text-slate-300 text-[15px] leading-relaxed">
            The market dramatically underprices businesses with 10+ year capex cycles because forward DCFs become illegible past year five. The most asymmetric tape in 2026 is not AI infrastructure — it is the old, capital-intensive, state-facing businesses everyone learned to discount. Contracts take five years to land and then print revenue for twenty, at margins the buyer cannot force lower. Sell-side models built for next-quarter EPS attribute almost no terminal value to that geometry. That mispricing is the trade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {BUCKETS.map((b) => (
            <div key={b.label} className="rounded-xl bg-slate-950/60 border border-amber-900/20 p-4">
              <p className="text-[10px] font-black tracking-[0.2em] text-amber-400 mb-2">{b.label.toUpperCase()}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {b.tickers.map(t => (
                  <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-950/40 text-amber-200 font-mono tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{b.blurb}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-slate-800">
          <p className="text-xs text-slate-500 italic leading-relaxed">
            Influence stack: I read Cathie Wood / ARK Invest's open-source models cover to cover — not for the picks, for the framework of underwriting 5-to-10-year terminal value on hardware-intensive businesses. The B2G + space theme borrows that frame and applies it to companies with state-protected demand curves rather than disruptive demand curves.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTheme;
