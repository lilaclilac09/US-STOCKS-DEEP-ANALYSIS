
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { CISLUNAR_TIERS } from './constants';
import StockCard from './components/StockCard';
import SpaceCompanyCard from './components/SpaceCompanyCard';
import { StockData, CisLunarTier } from './types';
import { analyzeStock } from './services/analysisService';
import { getCompanies, getCisLunarCompanies } from './src/api/payload';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistOrder
} from './src/api/supabase';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [watchlist, setWatchlist] = useState<any[]>([]); // Supabase watchlist
  const [cislunarTiers, setCislunarTiers] = useState<CisLunarTier[]>(CISLUNAR_TIERS);
  const [dataSource, setDataSource] = useState<'json' | 'payload'>('json');
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [group, setGroup] = useState('');
  const [symbolSuggestions, setSymbolSuggestions] = useState<{symbol: string, name: string}[]>([]);
    // 股票代码自动补全（用公开API或本地API，示例用finnhub）
    useEffect(() => {
      const fetchSuggestions = async () => {
        if (!searchQuery.trim()) {
          setSymbolSuggestions([]);
          return;
        }
        try {
          // 你可以替换为自己的API或本地接口
          const apiKey = import.meta.env.VITE_FINNHUB_KEY || process.env.FINNHUB_KEY;
          const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(searchQuery)}&token=${apiKey}`;
          const res = await axios.get(url);
          if (res.data && res.data.result) {
            setSymbolSuggestions(res.data.result.map((item: any) => ({ symbol: item.symbol, name: item.description })));
          } else {
            setSymbolSuggestions([]);
          }
        } catch {
          setSymbolSuggestions([]);
        }
      };
      if (searchQuery.length > 0) fetchSuggestions();
      else setSymbolSuggestions([]);
    }, [searchQuery]);
  const [searchResults, setSearchResults] = useState<StockData[]>([]);
    // 搜索功能：模糊匹配 symbol/fullName
    useEffect(() => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      const q = searchQuery.trim().toLowerCase();
      setSearchResults(
        stocks.filter(
          s => s.symbol.toLowerCase().includes(q) || (s.fullName && s.fullName.toLowerCase().includes(q))
        )
      );
    }, [searchQuery, stocks]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'stocks' | 'space'>('all');
  const spaceCompanies = useMemo(
    () => cislunarTiers.flatMap((tier) => tier.companies),
    [cislunarTiers]
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

      for (const tier of cislunarTiers) {
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
  }, [stocks, cislunarTiers]);

  // 初始化拉取 watchlist 并分析股票数据
  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const wl = await getWatchlist();
        setWatchlist(wl);
        // 拉取每个 symbol 的详细数据
        const stockDatas = await Promise.all(
          wl.map(async (item: any) => {
            try {
              return await analyzeStock(item.symbol);
            } catch {
              return null;
            }
          })
        );
        setStocks(stockDatas.filter(Boolean));
      } catch (err) {
        setError('Failed to load watchlist');
      }
    };
    loadWatchlist();
  }, []);

  // 添加自选股（Supabase）
  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isAnalyzing) return;
    // 优先用补全选中的symbol，否则用输入
    const ticker =
      symbolSuggestions.find(s => s.symbol.toUpperCase() === searchQuery.toUpperCase())?.symbol ||
      searchQuery.toUpperCase();
    if (watchlist.find(w => w.symbol === ticker)) {
      setError(`${ticker} is already in the list.`);
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      await addToWatchlist(ticker, { group });
      const newData = await analyzeStock(ticker);
      setStocks(prev => [...prev, newData]);
      setWatchlist(prev => [...prev, { symbol: ticker, group }]);
      setSearchQuery('');
      setGroup('');
      setSymbolSuggestions([]);
      setTimeout(() => {
        document.getElementById(newData.symbol)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Failed to add stock.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 删除自选股
  const handleRemoveStock = async (symbol: string) => {
    const wlItem = watchlist.find(w => w.symbol === symbol);
    if (!wlItem) return;
    try {
      await removeFromWatchlist(wlItem.id);
      setWatchlist(prev => prev.filter(w => w.symbol !== symbol));
      setStocks(prev => prev.filter(s => s.symbol !== symbol));
    } catch (err) {
      setError('Failed to remove stock');
    }
  };

  // 拖拽排序（需配合 react-beautiful-dnd 或类似库）
  const handleReorder = async (newOrder: string[]) => {
    // newOrder: symbol 数组
    const newWl = newOrder.map((symbol, idx) => {
      const wlItem = watchlist.find(w => w.symbol === symbol);
      return wlItem ? { id: wlItem.id, order: idx } : null;
    }).filter(Boolean);
    try {
      await updateWatchlistOrder(newWl);
      // 本地同步顺序
      setWatchlist(prev => {
        const wlMap = Object.fromEntries(prev.map(w => [w.symbol, w]));
        return newOrder.map(symbol => wlMap[symbol]).filter(Boolean);
      });
      setStocks(prev => {
        const stockMap = Object.fromEntries(prev.map(s => [s.symbol, s]));
        return newOrder.map(symbol => stockMap[symbol]).filter(Boolean);
      });
    } catch (err) {
      setError('Failed to reorder');
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
                placeholder="输入股票名称或代码 (如 苹果/AAPL)..."
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-4 pl-6 pr-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500 shadow-2xl transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              {/* 自动补全下拉 */}
              {symbolSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-16 bg-white z-10 rounded-xl shadow-lg max-h-60 overflow-auto">
                  {symbolSuggestions.slice(0, 8).map((s) => (
                    <li
                      key={s.symbol}
                      className="px-4 py-2 cursor-pointer hover:bg-indigo-100 text-slate-900"
                      onClick={() => setSearchQuery(s.symbol)}
                    >
                      <span className="font-bold">{s.symbol}</span> <span className="text-xs text-slate-500">{s.name}</span>
                    </li>
                  ))}
                </ul>
              )}
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
                {isAnalyzing ? '分析中...' : '添加'}
              </button>
            </div>
            {/* 分组输入 */}
            <div className="mt-3 flex gap-2 items-center">
              <input
                type="text"
                placeholder="自定义分组（如 科技/消费/自定义）"
                className="flex-1 bg-slate-100 border border-slate-300 rounded-full py-2 px-4 text-slate-700 placeholder-slate-400 text-sm"
                value={group}
                onChange={e => setGroup(e.target.value)}
              />
              <span className="text-xs text-slate-400">可选</span>
            </div>
            {error && <p className="mt-3 text-red-400 text-sm font-medium">{error}</p>}
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 -mt-12 pb-20 relative z-10">
        {(viewMode === 'all' || viewMode === 'stocks') && (
          <DragDropContext
            onDragEnd={(result: DropResult) => {
              if (!result.destination) return;
              const reordered = Array.from(stocks);
              const [removed] = reordered.splice(result.source.index, 1);
              reordered.splice(result.destination.index, 0, removed);
              handleReorder(reordered.map(s => s.symbol));
            }}
          >
            <Droppable droppableId="stocks-droppable">
              {(provided) => (
                <div
                  className="space-y-12"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {(searchQuery.trim() ? searchResults : stocks).map((stock, idx) => (
                    <Draggable key={stock.symbol} draggableId={stock.symbol} index={idx}>
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          id={stock.symbol}
                          className={`scroll-mt-24 ${dragSnapshot.isDragging ? 'ring-2 ring-indigo-400' : ''}`}
                        >
                          <StockCard data={stock} />
                          <button
                            className="mt-2 text-xs text-red-500 hover:underline"
                            onClick={() => handleRemoveStock(stock.symbol)}
                          >移除</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
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
            </Droppable>
          </DragDropContext>
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

             {cislunarTiers.map((tier) => (
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
