import React from 'react';

interface FeaturedThesisProps {
  ticker: string;
  name: string;
  sector: string;
  rating: 'BUY' | 'HOLD' | 'SELL';
  cmp: string;
  bear: { pt: string; delta: string };
  base: { pt: string; delta: string };
  bull: { pt: string; delta: string };
  thesis: string;
  modelUrl: string;
  positionNote?: string;
}

const RATING_STYLES: Record<string, string> = {
  BUY: 'bg-emerald-500 text-emerald-950',
  HOLD: 'bg-amber-500 text-amber-950',
  SELL: 'bg-rose-500 text-rose-950',
};

const FeaturedThesis: React.FC<FeaturedThesisProps> = ({
  ticker, name, sector, rating, cmp, bear, base, bull, thesis, modelUrl, positionNote,
}) => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 rounded-2xl shadow-2xl border border-indigo-900/40 overflow-hidden">
      {/* Top bar */}
      <div className="bg-slate-950/60 px-6 py-3 md:px-8 border-b border-slate-800 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
          Featured Coverage · Initiation
        </span>
        <span className="text-[10px] font-mono text-slate-500">
          Last update · 2026.06.01
        </span>
      </div>

      <div className="p-6 md:p-8">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">{ticker}</h2>
              <span className={`px-2.5 py-1 rounded-md text-xs font-black tracking-widest ${RATING_STYLES[rating]}`}>
                {rating}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300">
                {sector}
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">{name}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">CMP</p>
            <p className="text-2xl font-black text-white font-mono">{cmp}</p>
          </div>
        </div>

        {/* Price target grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {([
            { label: 'BEAR', data: bear, color: 'border-rose-900/60 bg-rose-950/30 text-rose-300' },
            { label: 'BASE', data: base, color: 'border-indigo-700/60 bg-indigo-950/40 text-indigo-200' },
            { label: 'BULL', data: bull, color: 'border-emerald-900/60 bg-emerald-950/30 text-emerald-300' },
          ] as const).map(({ label, data, color }) => (
            <div key={label} className={`rounded-xl border ${color} p-4 text-center`}>
              <p className="text-[10px] font-black tracking-[0.2em] opacity-70 mb-1">{label}</p>
              <p className="text-3xl md:text-4xl font-black text-white font-mono leading-none">{data.pt}</p>
              <p className="text-xs font-bold mt-2 font-mono">{data.delta}</p>
            </div>
          ))}
        </div>

        {/* Thesis */}
        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Thesis</p>
          <p className="text-slate-200 text-[15px] leading-relaxed">{thesis}</p>
        </div>

        {positionNote && (
          <p className="text-xs text-slate-500 italic mb-5 border-l-2 border-slate-700 pl-3">
            {positionNote}
          </p>
        )}

        {/* CTA */}
        <a
          href={modelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors"
        >
          Read full DCF + comps →
        </a>
      </div>
    </section>
  );
};

export default FeaturedThesis;
