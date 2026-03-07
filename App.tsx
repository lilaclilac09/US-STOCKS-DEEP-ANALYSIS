
import React, { useState, useEffect, useMemo } from 'react';
import { STOCKS as INITIAL_STOCKS, CISLUNAR_TIERS } from './constants';
import StockCard from './components/StockCard';
import SpaceCompanyCard from './components/SpaceCompanyCard';
import { StockData } from './types';
import { analyzeStock } from './services/analysisService';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>(INITIAL_STOCKS);
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'stocks' | 'space'>('all');
  const spaceCompanies = useMemo(
    () => CISLUNAR_TIERS.flatMap((tier) => tier.companies),
    []
  );

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

      for (const tier of CISLUNAR_TIERS) {
        const element = document.getElementById(`tier-${tier.tier}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSymbol(`T${tier.tier}`);
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
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                activeSymbol === 'T1'
                  ? 'bg-emerald-500/20 text-white border-emerald-400'
                  : 'text-emerald-400 hover:text-white hover:bg-slate-800 border-emerald-500/50'
              }`}
            >
              🌙 T1
            </a>
            <a
              href="#tier-2"
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                activeSymbol === 'T2'
                  ? 'bg-blue-500/20 text-white border-blue-400'
                  : 'text-blue-400 hover:text-white hover:bg-slate-800 border-blue-500/50'
              }`}
            >
              🌙 T2
            </a>
            <a
              href="#tier-3"
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                activeSymbol === 'T3'
                  ? 'bg-purple-500/20 text-white border-purple-400'
                  : 'text-purple-400 hover:text-white hover:bg-slate-800 border-purple-500/50'
              }`}
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

          <div className="flex justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              All Coverage
            </button>
            <button
              type="button"
              onClick={() => setViewMode('stocks')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'stocks'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Equity View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('space')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'space'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Space View
            </button>
          </div>

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
        {(viewMode === 'all' || viewMode === 'stocks') && (
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
        )}

        {(viewMode === 'all' || viewMode === 'space') && (
          <div className={`${viewMode === 'all' ? 'mt-24 pt-12 border-t-4 border-slate-700' : ''}`}>
            <section className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
              <div className="bg-slate-900 px-6 py-6 md:px-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Cis-Lunar Space Economy <span className="text-slate-400 font-light">-</span> Company Research Framework
                </h2>
              </div>
              <div className="p-6 md:p-10">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Coverage</p>
                    <p className="text-2xl font-black text-slate-900">{spaceCompanies.length}</p>
                    <p className="text-xs text-slate-500">Companies Tracked</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tier Structure</p>
                    <p className="text-2xl font-black text-slate-900">3</p>
                    <p className="text-xs text-slate-500">Execution Anchors to Disruptors</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Domains</p>
                    <p className="text-2xl font-black text-slate-900">8+</p>
                    <p className="text-xs text-slate-500">Access, Mobility, ISRU, Power, Comms, Habitats</p>
                  </div>
                </div>
              </div>
            </section>

            {CISLUNAR_TIERS.map((tier) => (
              <div key={tier.tier} className="mb-14" id={`tier-${tier.tier}`}>
                <section className="mb-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                  <div className="bg-slate-900 px-6 py-6 md:px-10">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                      Tier {tier.tier} <span className="text-slate-400 font-light">-</span> {tier.name}
                    </h3>
                  </div>
                  <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                    <p className="text-slate-600 font-semibold text-sm">{tier.riskProfile} • {tier.trl} • {tier.characteristics}</p>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">{tier.companies.length} Companies</span>
                  </div>
                </section>

                <div>
                  {tier.companies.map((company) => (
                    <SpaceCompanyCard key={company.name} company={company} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-slate-300 text-[10px] uppercase tracking-widest">
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
