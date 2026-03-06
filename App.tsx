
import React, { useState, useEffect, useRef } from 'react';
import { STOCKS as INITIAL_STOCKS, CISLUNAR_TIERS } from './constants';
import StockCard from './components/StockCard';
import CisLunarCard from './components/CisLunarCard';
import { StockData } from './types';
import { analyzeStock } from './services/analysisService';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>(INITIAL_STOCKS);
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stocksEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const stock of stocks) {
        const element = document.getElementById(stock.symbol);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSymbol(stock.symbol);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stocks]);

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isAnalyzing) return;

    const ticker = searchQuery.toUpperCase();
    if (stocks.find(s => s.symbol === ticker)) {
      setError(`${ticker} is already in the list.`);
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    try {
      const newData = await analyzeStock(ticker);
      setStocks(prev => [...prev, newData]);
      setSearchQuery('');
      // Scroll to new stock after state update
      setTimeout(() => {
        document.getElementById(newData.symbol)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze stock. Ticker might be invalid or API limit reached.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase">
            US Stocks <span className="text-indigo-400">Deep Analysis</span>
          </h1>
          <nav className="flex flex-wrap justify-center gap-2">
            {stocks.map((stock) => (
              <a
                key={stock.symbol}
                href={`#${stock.symbol}`}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  activeSymbol === stock.symbol
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {stock.symbol}
              </a>
            ))}
            <div className="w-px bg-slate-700 mx-1"></div>
            <a
              href="#tier-1"
              className="px-3 py-1 rounded-full text-xs font-bold transition-all text-emerald-400 hover:text-white hover:bg-slate-800 border border-emerald-500/50"
            >
              🌙 T1
            </a>
            <a
              href="#tier-2"
              className="px-3 py-1 rounded-full text-xs font-bold transition-all text-blue-400 hover:text-white hover:bg-slate-800 border border-blue-500/50"
            >
              🌙 T2
            </a>
            <a
              href="#tier-3"
              className="px-3 py-1 rounded-full text-xs font-bold transition-all text-purple-400 hover:text-white hover:bg-slate-800 border border-purple-500/50"
            >
              🌙 T3
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Banner with Search */}
      <div className="bg-slate-900 text-white pt-16 pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-none">
            Growth Sectors <span className="text-indigo-500">Jan 2026</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-12">
            Professional equity research and cis-lunar market intelligence for high-potential growth assets.
          </p>

          <form onSubmit={handleAddStock} className="max-w-md mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Stock Ticker (e.g. NVDA, TSLA)..."
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-4 pl-6 pr-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500 shadow-2xl transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 rounded-full font-bold text-sm transition-all flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <i className="fa-solid fa-magnifying-glass"></i>
                )}
                {isAnalyzing ? 'Analyzing...' : 'Research'}
              </button>
            </div>
            {error && <p className="mt-3 text-red-400 text-sm font-medium">{error}</p>}
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 -mt-12 pb-20 relative z-10">
        {/* Traditional Stocks Section */}
        <div className="space-y-12">
          {stocks.map((stock) => (
            <div key={stock.symbol} id={stock.symbol} className="scroll-mt-24">
              <StockCard data={stock} />
            </div>
          ))}

          {isAnalyzing && (
            <div className="animate-pulse bg-white rounded-2xl p-10 shadow-xl border border-slate-100 flex flex-col items-center justify-center space-y-4">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-microchip text-slate-300 text-3xl animate-bounce"></i>
               </div>
               <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800">Generating AI Analysis</h3>
                  <p className="text-slate-400 text-sm">Processing 2026 market projections and financial benchmarks...</p>
               </div>
               <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-1/3 animate-[progress_2s_infinite]"></div>
               </div>
            </div>
          )}
        </div>

        {/* Cis-Lunar Space Economy Section */}
        <div className="mt-24 pt-12 border-t-4 border-slate-700">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Cis-Lunar <span className="text-cyan-400">Space Economy</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Professional market map of lunar economy companies organized by execution maturity, technology readiness, and asymmetric upside potential.
            </p>
          </div>

          {CISLUNAR_TIERS.map((tier) => (
            <div key={tier.tier} className="mb-16" id={`tier-${tier.tier}`}>
              <div className="mb-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Tier {tier.tier} – {tier.name}
                    </h3>
                    <p className="text-slate-300 text-sm">
                      {tier.riskProfile} • {tier.trl} • {tier.characteristics}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-600">
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Companies</span>
                    <div className="text-2xl font-bold text-white">{tier.companies.length}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tier.companies.map((company) => (
                  <CisLunarCard key={company.name} company={company} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Generated on Jan 9, 2026 | Powered by Gemini 3 Deep Reasoning
          </p>
          <div className="mt-4 text-slate-300 text-[10px] uppercase tracking-widest">
            Investment research dashboard — Equities & Cis-Lunar Space Economy — Dynamic Data Enabled
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default App;
