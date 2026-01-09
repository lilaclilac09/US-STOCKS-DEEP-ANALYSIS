
import React from 'react';
import { StockData } from '../types';
import { ARK_HOLDER_NOTE } from '../constants';

interface StockCardProps {
  data: StockData;
}

const StockCard: React.FC<StockCardProps> = ({ data }) => {
  return (
    <section className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl">
      <div className="bg-slate-900 px-6 py-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {data.symbol} <span className="text-slate-400 font-light">—</span> {data.fullName}
        </h2>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        {/* Main Business */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
            <i className="fa-solid fa-briefcase mr-2"></i> Main Business
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {data.mainBusiness}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Financial Highlights */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <i className="fa-solid fa-chart-line mr-2 text-indigo-500"></i> Financial Highlights ({data.financials.period})
            </h3>
            <ul className="space-y-2 text-slate-700 font-semibold">
              <li className="flex justify-between border-b border-slate-200 pb-2">
                <span>Revenue:</span>
                <span className="text-indigo-600">{data.financials.revenue}</span>
              </li>
              <li className="flex justify-between border-b border-slate-200 py-2">
                <span>Net Profit:</span>
                <span className="text-indigo-600">{data.financials.netProfit}</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Cash Flow:</span>
                <span className="text-indigo-600 text-right">{data.financials.cashFlow}</span>
              </li>
            </ul>
          </div>

          {/* Key Indicators */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <i className="fa-solid fa-gauge-high mr-2 text-emerald-500"></i> Key Indicators & Risks
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              {data.indicators.occupancy && (
                <li className="flex justify-between">
                  <span className="text-slate-500">Occupancy:</span>
                  <span className="font-bold">{data.indicators.occupancy}</span>
                </li>
              )}
              <li className="flex justify-between">
                <span className="text-slate-500">ROIC:</span>
                <span className="font-bold text-emerald-600">{data.indicators.roic}</span>
              </li>
              {data.indicators.roe && (
                <li className="flex justify-between">
                  <span className="text-slate-500">ROE:</span>
                  <span className="font-bold text-emerald-600">{data.indicators.roe}</span>
                </li>
              )}
              <li className="flex justify-between">
                <span className="text-slate-500">Total Debt:</span>
                <span className="font-bold">{data.indicators.debt}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Current Ratio:</span>
                <span className="font-bold">{data.indicators.currentRatio}</span>
              </li>
              {data.indicators.cashFlow && (
                <li className="flex flex-col border-t border-slate-200 mt-2 pt-2">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Indicator Cash Flow Note:</span>
                  <span className="font-medium text-slate-600 text-[11px] leading-tight mt-1">{data.indicators.cashFlow}</span>
                </li>
              )}
              {data.indicators.leverageNote && (
                <li className="text-right text-red-500 text-[10px] italic">
                  * {data.indicators.leverageNote}
                </li>
              )}
              {data.indicators.margin && (
                 <li className="flex justify-between">
                   <span className="text-slate-500">Focus Detail:</span>
                   <span className="font-bold text-indigo-600 text-right max-w-[200px]">{data.indicators.margin}</span>
                 </li>
              )}
               {data.indicators.pipeline && (
                <li className="flex justify-between">
                  <span className="text-slate-500">Pipeline:</span>
                  <span className="font-bold">{data.indicators.pipeline}</span>
                </li>
              )}
              {data.indicators.buyback && (
                <li className="flex justify-between">
                  <span className="text-slate-500">Buyback Yield:</span>
                  <span className="font-bold text-emerald-600">{data.indicators.buyback}</span>
                </li>
              )}
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
