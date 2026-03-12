import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Category = {
  id: string;
  name: string;
  stocks: string[]; // symbol 数组
};

type CategoryContextType = {
  categories: Category[];
  addCategory: (name: string) => void;
  deleteCategory: (id: string) => void;
  addStockToCategory: (catId: string, symbol: string) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: '全部', stocks: [] },
    { id: 'equity', name: '传统股票', stocks: [] },
    { id: 'space', name: '航天概念', stocks: [] },
  ]);

  // 持久化 localStorage（后面可换 Supabase）
  useEffect(() => {
    const saved = localStorage.getItem('stockCategories');
    if (saved) setCategories(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('stockCategories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (name: string) => {
    const newCat: Category = { id: `cat_${Date.now()}`, name, stocks: [] };
    setCategories([...categories, newCat]);
  };

  const deleteCategory = (id: string) => {
    if (['all', 'equity', 'space'].includes(id)) return; // 保护默认分类
    setCategories(categories.filter(c => c.id !== id));
  };

  const addStockToCategory = (catId: string, symbol: string) => {
    setCategories(categories.map(cat =>
      cat.id === catId ? { ...cat, stocks: [...cat.stocks, symbol] } : cat
    ));
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, deleteCategory, addStockToCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error('useCategories must be used within CategoryProvider');
  return context;
};
