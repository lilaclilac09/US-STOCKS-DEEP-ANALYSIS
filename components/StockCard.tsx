
import React, { useState, useEffect } from 'react';
import { StockData } from '../types';
import { ARK_HOLDER_NOTE } from '../constants';
import MiniKLineChart from './MiniKLineChart';
import IndicatorSelectorModal from './IndicatorSelectorModal';

interface StockCardProps {
  data: StockData;
}

const StockCard: React.FC<StockCardProps> = ({ data }) => {
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([
    'roic', 'roe', 'debt', 'currentRatio', 'buyback'
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`indicators_${data.symbol}`);
    if (saved) setSelectedIndicators(JSON.parse(saved));
  }, [data.symbol]);

  useEffect(() => {
    localStorage.setItem(`indicators_${data.symbol}`, JSON.stringify(selectedIndicators));
  }, [selectedIndicators, data.symbol]);

  const displayedIndicators = selectedIndicators.filter(ind => 
    data.indicators[ind as keyof typeof data.indicators] !== undefined
  );

  return (
    <section className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl">
      <div className="bg-slate-900 px-6 py-6 md:px-10 flex items-center justify-between">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-4">
          {data.symbol} <span className="text-slate-400 font-light">—</span> {data.fullName}
          <MiniKLineChart data={data.klineData || mockCandleData} />
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded-full font-bold"
        >
          编辑指标
        </button>
      </div>
      <div className="p-6 md:p-10 space-y-8">
        {/* ... 你的 Main Business、Latest Orders、Major Bull Holders、Trading Notes、Current Price 保持原样 ... */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
            <i className="fa-solid fa-gauge-high mr-2 text-emerald-500"></i> 
            Key Indicators & Risks（自定义）
          </h3>
          <ul className="space-y-3 text-slate-700 text-sm">
            {displayedIndicators.map(ind => {
              const value = data.indicators[ind as keyof typeof data.indicators];
              return (
                <li key={ind} className="flex justify-between">
                  <span className="text-slate-500 font-medium uppercase">{ind}</span>
                  <span className="font-bold text-emerald-600">{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
        {/* 其余内容保持原样 ... */}
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

const mockCandleData = [
  { time: '2026-03-01', open: 150, high: 155, low: 148, close: 152 },
  // ... 多加30条即可
];

export default StockCard;
            </ul>
          </div>
        </div>

        {/* Latest Orders / Developments */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
            <i className="fa-solid fa-bullhorn mr-2"></i> Latest Orders / Developments
          </h3>
          <ul className="space-y-2">
            {data.latestDevelopments.map((dev, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-slate-700">{dev}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Major Bull Holders */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
            <i className="fa-solid fa-user-tie mr-2"></i> Major Bull Holders
          </h3>
          <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded italic">
            {ARK_HOLDER_NOTE}
          </p>
        </div>

        {/* Trading Notes */}
        <div className="border-t border-slate-100 pt-8">
           <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Broker</span>
                <span className="text-slate-400 italic text-sm">[Blank - Fill your broker]</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Target / Buy Price</span>
                <span className="text-slate-400 italic text-sm">[Blank - Fill your entry price]</span>
              </div>
           </div>
        </div>

        {/* Current Price */}
        <div className="flex justify-between items-center bg-indigo-50 px-6 py-4 rounded-xl">
           <span className="text-slate-600 font-semibold text-sm">As of Jan 8, 2026 close</span>
           <div className="text-2xl font-black text-indigo-900">
             {data.currentPrice} <span className="text-xs font-normal">USD</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default StockCard;
