import React from 'react';

interface Dispatch {
  date: string;
  ticker?: string;
  title: string;
  hook: string;
  url: string;
}

const DISPATCHES: Dispatch[] = [
  {
    date: '2026.05.29',
    ticker: 'NVDA',
    title: 'NVIDIA Is Buying Its Own Demand',
    hook: '$18.4B public 13F + $100B+ private commitments — the equity book IS the income statement. The cleanest articulation of the flywheel / Lucent-Nortel risk you\'ll read.',
    url: 'https://aileena.xyz/blog/nvidia-flywheel',
  },
  {
    date: '2026.05.29',
    ticker: 'DELL',
    title: 'Why Bet on Dell — The Flywheel Has Hands',
    hook: '$64.1B FY26 AI orderbook, $43B backlog, FY27 ~$50B guide. The integrator that turns NVDA chips + equity into liquid-cooled racks on a data-center floor — at 5–6% margin.',
    url: 'https://aileena.xyz/blog/dell-nvidia-flywheel',
  },
  {
    date: '2026.05.30',
    ticker: 'NOK',
    title: 'Why Bet on Nokia — The DCI Capacity Trade',
    hook: 'Post-Infinera idle optical capacity, ~$2.5–4B/yr, in a market booked through 2027. Ciena sold out; Nokia took 50–60% of Google\'s DCI tender.',
    url: 'https://aileena.xyz/blog/nokia-dci',
  },
  {
    date: '2026.05.30',
    title: 'What AI Hardware Is Running Out Of',
    hook: 'Pump laser duopoly booked to 2027. HVLP4 copper foil gap 48%. PMIC lead times 10w → 40w. The actual binding constraints behind the GPU story.',
    url: 'https://aileena.xyz/blog/ai-hardware-scarcity',
  },
  {
    date: '2026.05.31',
    title: 'Let There Be Light Modules',
    hook: 'EML, SiPh, LPO, CPO, Micro LED, OCS — six paths racing toward the same horizon. Optical orders booked into 2028. The FAU is hand-built and nobody talks about it.',
    url: 'https://aileena.xyz/blog/let-there-be-light',
  },
];

const ResearchDispatch: React.FC = () => {
  return (
    <section className="mt-12 mb-8">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Research Dispatch
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Long-form equity + supply-chain notes · published at <a href="https://aileena.xyz" className="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline">aileena.xyz</a>
          </p>
        </div>
        <a
          href="https://aileena.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest"
        >
          Full archive →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {DISPATCHES.map((d) => (
          <a
            key={d.url}
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 hover:border-indigo-700/60 p-5 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono text-slate-500 tracking-wider">{d.date}</span>
              {d.ticker && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-indigo-900/60 text-indigo-200 tracking-wider">
                  {d.ticker}
                </span>
              )}
            </div>
            <h3 className="text-white font-bold text-base leading-tight mb-2 group-hover:text-indigo-300 transition-colors">
              {d.title}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">{d.hook}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ResearchDispatch;
