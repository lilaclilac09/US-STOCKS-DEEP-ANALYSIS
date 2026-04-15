import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export type Category = {
  id: string;
  name: string;
  stocks: string[];
};

type CategoryContextType = {
  categories: Category[];
  addCategory: (name: string) => void;
  deleteCategory: (id: string) => void;
  addStockToCategory: (catId: string, symbol: string) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'all', name: 'All', stocks: [] },
  { id: 'ai-hyperscalers', name: 'AI Hyperscalers', stocks: ['NVDA', 'MSFT', 'GOOGL', 'META', 'AMZN', 'TSLA', 'AAPL'] },
  { id: 'semis', name: 'Semis Supply Chain', stocks: ['AVGO', 'AMD', 'ARM', 'TSM', 'ASML', 'SMCI', 'MRVL', 'MU'] },
  { id: 'cpo-light', name: 'CPO Light Source', stocks: ['SIVE', 'AAOI', 'LITE', 'COHR'] },
  { id: 'pcb-ccl', name: 'PCB / CCL Bottleneck', stocks: ['TTMI', 'ROG', 'SANM'] },
  { id: 'chokepoints', name: 'Hidden Chokepoints', stocks: ['ALRIB', 'AXTI', 'PLTR', 'TEM'] },
  { id: 'ai-software', name: 'AI Software', stocks: ['CRSP', 'ROKU', 'COIN'] },
  { id: 'space', name: 'Space Economy', stocks: [] },
  { id: 'watchlist', name: 'My Watchlist', stocks: ['RCL', 'LLY', 'MAR', 'HLT'] },
];

const PROTECTED_IDS = new Set(['all', 'ai-hyperscalers', 'semis', 'cpo-light', 'pcb-ccl', 'chokepoints', 'ai-software', 'space', 'watchlist']);

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('stockCategories_v3');
    if (saved) {
      try {
        setCategories(JSON.parse(saved));
      } catch {
        setCategories(DEFAULT_CATEGORIES);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stockCategories_v3', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (name: string) => {
    const newCat: Category = { id: `cat_${Date.now()}`, name, stocks: [] };
    setCategories(prev => [...prev, newCat]);
  };

  const deleteCategory = (id: string) => {
    if (PROTECTED_IDS.has(id)) return;
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addStockToCategory = (catId: string, symbol: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === catId && !cat.stocks.includes(symbol)
          ? { ...cat, stocks: [...cat.stocks, symbol] }
          : cat
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setCategories(prev => {
      const oldIndex = prev.findIndex(c => c.id === active.id);
      const newIndex = prev.findIndex(c => c.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <CategoryContext.Provider value={{
      categories,
      addCategory,
      deleteCategory,
      addStockToCategory,
      handleDragEnd,
      isModalOpen,
      setIsModalOpen,
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error('useCategories must be used within CategoryProvider');
  return context;
};
