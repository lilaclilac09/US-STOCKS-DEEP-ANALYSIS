import React, { useState, useEffect } from 'react';
import { StockData } from '../types';
import { ARK_HOLDER_NOTE } from '../constants';
import MiniKLineChart from './MiniKLineChart';
import IndicatorSelectorModal from './IndicatorSelectorModal';

interface StockCardProps {
  data: StockData;
}

const MOCK_CANDLES = [
  { time: '2026-01-01', open: 100, high: 110, low: 95, close: 105 },
  { time: '2026-01-15', open: 105, high: 115, low: 100, close: 112 },
  { time: '2026-02-01', open: 112, high: 120, low: 108, close: 118 },
  { time: '2026-02-15', open: 118, high: 125, low: 114, close: 122 },
  { time: '2026-03-01', open: 122, high: 130, low: 118, close: 128 },
];

const INDICATOR_LABELS: Record<string, string> = {
  roic: 'ROIC',
  roe: 'ROE',
  debt: 'Debt',
  currentRatio: 'Current Ratio',
  buyback: 'Buyback Yield',
  margin: 'Margin',
  cashFlow: 'Cash Flow',
  occupancy: 'Occupancy',
  pipeline: 'Pipeline',
  buildup: 'Inventory Status',
  leverageNote: 'Leverage',
};

const StockCard: React.FC<StockCardProps> = ({ data }) => {
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([
    'roic', 'roe', 'debt', 'currentRatio', 'margin',
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`indicators_${data.symbol}`);
    if (saved) {
      try { setSelectedIndicators(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, [data.symbol]);

  useEffect(() => {
    localStorage.setItem(`indicators_${data.symbol}`, JSON.stringify(selectedIndicators));
  }, [selectedIndicators, data.symbol]);

  const displayedIndicators = selectedIndicators.filter(
    ind => data.indicators[ind] !== undefined && data.indicators[ind] !== ''
  );

  const categoryBadge = data.category ? {
    'ai-hyperscalers': { label: 'AI Hyperscaler', color: 'bg-violet-900 text-violet-200' },
    'semis': { label: 'Semis Supply Chain', color: 'bg-blue-900 text-blue-200' },
    'cpo-light': { label: 'CPO Light Source', color: 'bg-cyan-900 text-cyan-200' },
    'pcb-ccl': { label: 'PCB / CCL Bottleneck', color: 'bg-orange-900 text-orange-200' },
    'chokepoints': { label: 'Hidden Chokepoint', color: 'bg-red-900 text-red-200' },
    'ai-software': { label: 'AI Software', color: 'bg-emerald-900 text-emerald-200' },
    'watchlist': { label: 'Watchlist', color: 'bg-slate-700 text-slate-300' },
    'space': { label: 'Space Economy', color: 'bg-indigo-900 text-indigo-200' },
  }[data.category] : null;

  return (
    <section className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 transition-all hover:border-slate-700">
      {/* Header */}
      <div className="px-6 py-5 md:px-8 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {data.symbol}
            </h2>
            {categoryBadge && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${categoryBadge.color}`}>
                {categoryBadge.label}
              </span>
            )}
            {data.livePriceFetched && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-900 text-emerald-300">
                LIVE
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mt-0.5 truncate">{data.fullName}</p>
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {data.tags.slice(0, 5).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <MiniKLineChart data={data.klineData || MOCK_CANDLES} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full font-bold"
          >
            Edit Indicators
          </button>
        </div>
      </div>

      <div className="px-6 pb-6 md:px-8 space-y-6">
        {/* Thesis Explainer (supply chain / chokepoint stocks) */}
        {data.thesisExplainer && (
          <div className="bg-indigo-950 border border-indigo-800 rounded-xl p-4">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
              Why This Bottleneck Matters
            </p>
            <p className="text-sm text-indigo-100 leading-relaxed">{data.thesisExplainer}</p>
            {data.thesisImage && (
              <img
                src={data.thesisImage}
                alt={`${data.symbol} — raw material / supply chain`}
                className="mt-3 rounded-lg max-h-40 object-cover w-full opacity-80"
                loading="lazy"
              />
            )}
          </div>
        )}

        {/* Main Business */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
            Main Business
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">{data.mainBusiness}</p>
        </div>

        {/* Financials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Revenue', value: data.financials.revenue },
            { label: 'Net Profit', value: data.financials.netProfit },
            { label: 'Cash Flow', value: data.financials.cashFlow },
            { label: 'Period', value: data.financials.period },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-800 rounded-xl p-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-bold text-white">{value || '—'}</p>
            </div>
          ))}
        </div>

        {/* Key Indicators */}
        {displayedIndicators.length > 0 && (
          <div className="bg-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Key Indicators
            </h3>
            <ul className="space-y-2">
              {displayedIndicators.map(ind => (
                <li key={ind} className="flex justify-between text-sm">
                  <span className="text-slate-400">{INDICATOR_LABELS[ind] || ind.toUpperCase()}</span>
                  <span className="font-bold text-emerald-400">{data.indicators[ind]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Latest Developments */}
        {data.latestDevelopments && data.latestDevelopments.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Latest Developments
            </h3>
            <ul className="space-y-1.5">
              {data.latestDevelopments.map((dev, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-indigo-400 mr-2 mt-0.5 flex-shrink-0">→</span>
                  <span className="text-slate-300">{dev}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ARK / Major Bull Holders note */}
        <p className="text-xs text-slate-600 italic">{ARK_HOLDER_NOTE}</p>

        {/* Price */}
        <div className="flex items-center justify-between bg-slate-800 px-5 py-3 rounded-xl">
          <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">
            {data.livePriceFetched ? 'Live Price' : 'Reference Price'}
          </span>
          <span className="text-xl font-black text-white">{data.currentPrice}</span>
        </div>
      </div>

      <IndicatorSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={setSelectedIndicators}
        initialSelected={selectedIndicators}
      />
    </section>
  );
};

export default StockCard;
