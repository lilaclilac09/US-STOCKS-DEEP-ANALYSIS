import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { CISLUNAR_TIERS, STOCKS as STATIC_STOCKS } from './constants';
import StockCard from './components/StockCard';
import SpaceCompanyCard from './components/SpaceCompanyCard';
import { StockData, CisLunarTier } from './types';
import { CategoryProvider, useCategories } from './contexts/CategoryContext';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import CategoryModal from './components/CategoryModal';
import SortableItem from './components/SortableItem';
import { AlertProvider, useAlerts } from './contexts/AlertContext';
import toast, { Toaster } from 'react-hot-toast';
import FeaturedThesis from './components/FeaturedThesis';
import ResearchDispatch from './components/ResearchDispatch';

// ─── data service ───────────────────────────────────────────────────────────
async function loadStocks(): Promise<StockData[]> {
  try {
    const res = await fetch('/api/companies');
    if (res.ok) {
      const json = await res.json();
      const docs = (json.docs || json.companies || []) as StockData[];
      if (docs.length > 0) return docs;
    }
  } catch {
    // fall through to static
  }
  return STATIC_STOCKS;
}

// ─── Finnhub price refresh ───────────────────────────────────────────────────
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY || import.meta.env.VITE_FINNHUB_API_KEY || '';
const TAIWAN_TICKERS = new Set(['SIVE', 'ALRIB', 'WIN', 'VP']); // no Finnhub coverage

async function fetchLivePrice(symbol: string): Promise<string | null> {
  if (!FINNHUB_KEY || TAIWAN_TICKERS.has(symbol)) return null;
  try {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`);
    const data = await res.json();
    if (data.c && data.c > 0) return `$${data.c.toFixed(2)}`;
  } catch {
    // ignore
  }
  return null;
}

async function refreshPrices(
  stocks: StockData[],
  onUpdate: (symbol: string, price: string) => void
) {
  const BATCH_DELAY_MS = 150; // stay under 60 req/min free tier
  for (const stock of stocks) {
    const price = await fetchLivePrice(stock.symbol);
    if (price) onUpdate(stock.symbol, price);
    await new Promise(r => setTimeout(r, BATCH_DELAY_MS));
  }
}

// ─── Main app ────────────────────────────────────────────────────────────────
function MainAppContent() {
  const { categories, handleDragEnd, isModalOpen, setIsModalOpen, addCategory } = useCategories();
  const { checkAlerts } = useAlerts();

  const [stocks, setStocks] = useState<StockData[]>([]);
  const [cislunarTiers] = useState<CisLunarTier[]>(CISLUNAR_TIERS);
  const [currentView, setCurrentView] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all' | 'stocks' | 'space'>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [group, setGroup] = useState('');
  const [symbolSuggestions, setSymbolSuggestions] = useState<{ symbol: string; name: string }[]>([]);
  const [pricesUpdatedAt, setPricesUpdatedAt] = useState<Date | null>(null);

  const spaceCompanies = useMemo(
    () => cislunarTiers.flatMap(t => t.companies),
    [cislunarTiers]
  );

  // Load stocks on mount
  useEffect(() => {
    loadStocks().then(data => {
      setStocks(data);
      // refresh live prices after initial load
      refreshPrices(data, (symbol, price) => {
        setStocks(prev =>
          prev.map(s => s.symbol === symbol ? { ...s, currentPrice: price, livePriceFetched: true } : s)
        );
      }).then(() => setPricesUpdatedAt(new Date()));
    });
  }, []);

  // Alert polling
  useEffect(() => {
    if (stocks.length === 0) return;
    const interval = setInterval(() => checkAlerts(stocks), 30_000);
    if (Notification.permission === 'default') Notification.requestPermission();
    return () => clearInterval(interval);
  }, [stocks, checkAlerts]);

  // Autocomplete suggestions
  useEffect(() => {
    if (!searchQuery.trim() || !FINNHUB_KEY) {
      setSymbolSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://finnhub.io/api/v1/search?q=${encodeURIComponent(searchQuery)}&token=${FINNHUB_KEY}`
        );
        if (res.data?.result) {
          setSymbolSuggestions(
            res.data.result.slice(0, 8).map((item: any) => ({
              symbol: item.symbol,
              name: item.description,
            }))
          );
        }
      } catch {
        setSymbolSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter stocks by current category tab
  const displayedStocks = useMemo(() => {
    let base = stocks;
    if (searchQuery.trim()) {
      const q = searchQuery.toUpperCase();
      base = stocks.filter(
        s => s.symbol.includes(q) || s.fullName.toUpperCase().includes(q)
      );
    } else if (currentView !== 'all') {
      const cat = categories.find(c => c.id === currentView);
      if (cat && cat.stocks.length > 0) {
        base = stocks.filter(s => cat.stocks.includes(s.symbol));
      }
    }
    return base;
  }, [stocks, searchQuery, currentView, categories]);

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isAnalyzing) return;
    const ticker =
      symbolSuggestions.find(s => s.symbol.toUpperCase() === searchQuery.toUpperCase())?.symbol ||
      searchQuery.toUpperCase();
    if (stocks.find(s => s.symbol === ticker)) {
      toast.error(`${ticker} is already in the list.`);
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      // Fetch live price to create a minimal card
      const price = await fetchLivePrice(ticker);
      const newStock: StockData = {
        symbol: ticker,
        fullName: ticker,
        mainBusiness: `${ticker} — added via search. Edit to add full analysis.`,
        financials: { revenue: '—', netProfit: '—', cashFlow: '—', period: '—' },
        indicators: { roic: '—', debt: '—', currentRatio: '—' },
        latestDevelopments: [],
        currentPrice: price || '—',
        category: group || undefined,
      };
      setStocks(prev => [...prev, newStock]);
      setSearchQuery('');
      setGroup('');
      setSymbolSuggestions([]);
      setTimeout(() => {
        document.getElementById(ticker)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      toast.success(`${ticker} added`);
    } catch (err: any) {
      setError(err.message || 'Failed to add stock.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveStock = (symbol: string) => {
    setStocks(prev => prev.filter(s => s.symbol !== symbol));
    toast(`${symbol} removed`);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ── Header ── */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-baseline gap-3">
            <h1 className="text-lg md:text-xl font-black tracking-tighter">
              Aileen Xu <span className="text-indigo-400">· Equity Research</span>
            </h1>
            <a href="https://aileena.xyz" target="_blank" rel="noopener noreferrer" className="hidden md:inline text-[10px] font-mono text-slate-500 hover:text-indigo-400 uppercase tracking-widest">aileena.xyz ↗</a>
          </div>
          <nav className="flex flex-wrap justify-center gap-1.5 items-center">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={categories.map(c => c.id)} strategy={horizontalListSortingStrategy}>
                {categories.map((category) => (
                  <SortableItem key={category.id} id={category.id}>
                    <button
                      onClick={() => { setCurrentView(category.id); setViewMode(category.id === 'space' ? 'space' : category.id === 'all' ? 'all' : 'stocks'); }}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                        currentView === category.id
                          ? 'bg-indigo-500 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {category.name}
                    </button>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white"
            >
              + Category
            </button>
          </nav>
        </div>
      </header>

      <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addCategory} />
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />

      {/* ── Hero / Search ── */}
      <div className="bg-slate-900 text-white pt-12 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-3">
              AI Equity Research Terminal
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter leading-none">
              The AI supply chain, <span className="text-indigo-400">priced.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              Memory · HBM · Semis · Optical interconnect · PCB / CCL · Hidden chokepoints. Bear / Base / Bull price targets cross-checked against comps. Companion long-form dispatches at aileena.xyz.
            </p>
          </div>

          {/* Featured Coverage Thesis */}
          <div className="mb-10">
            <FeaturedThesis
              ticker="MU"
              name="Micron Technology"
              sector="Memory / HBM"
              rating="BUY"
              cmp="$965"
              bear={{ pt: '$650', delta: '–33%' }}
              base={{ pt: '$1,100', delta: '+14%' }}
              bull={{ pt: '$1,500', delta: '+55%' }}
              thesis="Mark-to-market update post a ~10x trailing-twelve-month re-rate. The memory super-cycle thesis we underwrote in 2024 played out faster than modeled, but the cycle has not finished. HBM3e is sold out through 2026; HBM4 contracts being signed at ASPs we previously modeled as a bull case; Samsung qualification continues to slip; NAND structurally undersupplied. Risk has shifted from thesis-break to multiple compression — and at ~27x FY27E EBITDA, that is now the primary downside vector. The base case is essentially earnings growth × constant multiple, not multiple expansion."
              modelUrl="https://github.com/lilaclilac09/US-STOCKS-DEEP-ANALYSIS/blob/main/content/equities/mu.md"
              positionNote="Largest single equity weight in personal book. Memory long basket: MU + SNDK + SK Hynix (000660.KS), averaged 2024–2026 — basket up ~10x TTM. May 2026 P&L +3x on the HBM4 narrative resetting. Continuing to hold; trim triggers documented in full note."
            />
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {(['all', 'stocks', 'space'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => { setViewMode(mode); setCurrentView(mode); }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  viewMode === mode
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {mode === 'all' ? 'All Coverage' : mode === 'stocks' ? 'Equity View' : 'Space View'}
              </button>
            ))}
          </div>

          <form onSubmit={handleAddStock} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Add ticker (e.g. NVDA, TTMI, SIVE)…"
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-4 pl-6 pr-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500 shadow-xl"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              {symbolSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-16 bg-white z-10 rounded-xl shadow-lg max-h-56 overflow-auto">
                  {symbolSuggestions.map(s => (
                    <li
                      key={s.symbol}
                      className="px-4 py-2 cursor-pointer hover:bg-indigo-50 text-slate-900 text-sm"
                      onClick={() => { setSearchQuery(s.symbol); setSymbolSuggestions([]); }}
                    >
                      <span className="font-bold">{s.symbol}</span>{' '}
                      <span className="text-slate-400">{s.name}</span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="absolute right-2 top-2 bottom-2 px-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 rounded-full font-bold text-sm transition-all flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : '+'}
                {isAnalyzing ? 'Adding…' : 'Add'}
              </button>
            </div>
            {error && <p className="mt-3 text-red-400 text-sm font-medium">{error}</p>}
          </form>

          {pricesUpdatedAt && (
            <p className="mt-4 text-slate-500 text-xs">
              Prices updated {pricesUpdatedAt.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="max-w-4xl mx-auto px-4 -mt-10 pb-20 relative z-10">
        {/* Research dispatch strip — always visible at top of main */}
        <ResearchDispatch />

        {viewMode !== 'space' && (
          <div className="space-y-10">
            {displayedStocks.length === 0 && !isAnalyzing && (
              <div className="text-center py-20 text-slate-500">
                <p className="text-lg font-semibold">No stocks in this view yet.</p>
                <p className="text-sm mt-1">Use the search above to add tickers.</p>
              </div>
            )}
            {displayedStocks.map(stock => (
              <div key={stock.symbol} id={stock.symbol} className="scroll-mt-24">
                <StockCard data={stock} />
                <button
                  className="mt-2 text-xs text-red-400 hover:text-red-300 hover:underline"
                  onClick={() => handleRemoveStock(stock.symbol)}
                >
                  Remove {stock.symbol}
                </button>
              </div>
            ))}
            {isAnalyzing && (
              <div className="animate-pulse bg-slate-900 rounded-2xl p-10 shadow-xl border border-slate-800 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
                </div>
                <p className="text-slate-400 text-sm">Adding stock…</p>
              </div>
            )}
          </div>
        )}

        {viewMode !== 'stocks' && (
          <div className={viewMode === 'all' ? 'mt-20 pt-12 border-t-4 border-slate-800' : ''}>
            <section className="mb-10 bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
              <div className="px-6 py-6 md:px-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Cis-Lunar Space Economy
                </h2>
                <p className="text-slate-400 text-sm mt-1">Company Research Framework — {spaceCompanies.length} companies tracked</p>
              </div>
            </section>
            {cislunarTiers.map(tier => (
              <div key={tier.tier} className="mb-12" id={`tier-${tier.tier}`}>
                <section className="mb-6 bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
                  <div className="px-6 py-5 md:px-10 flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                      Tier {tier.tier} — {tier.name}
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">{tier.companies.length} Companies</span>
                  </div>
                  <div className="px-6 pb-4 md:px-10 text-slate-500 text-xs font-medium">
                    {tier.riskProfile} · {tier.trl} · {tier.characteristics}
                  </div>
                </section>
                <div>
                  {tier.companies.map(company => (
                    <SpaceCompanyCard key={company.name} company={company} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 py-8 mt-4">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-600 text-xs uppercase tracking-widest space-y-2">
          <p>Aileen Xu · AI Equity Research Terminal</p>
          <p className="normal-case tracking-normal text-slate-700 text-[11px]">
            Research & long-form dispatches: <a href="https://aileena.xyz" className="text-slate-500 hover:text-indigo-400">aileena.xyz</a> · Code & data: <a href="https://github.com/lilaclilac09/US-STOCKS-DEEP-ANALYSIS" className="text-slate-500 hover:text-indigo-400">github.com/lilaclilac09</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AlertProvider>
      <CategoryProvider>
        <MainAppContent />
      </CategoryProvider>
    </AlertProvider>
  );
}
