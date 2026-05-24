// 行情与指标缓存表操作
export async function getStockCache(symbol: string) {
  const { data, error } = await supabase.from('stock_cache').select('data').eq('symbol', symbol).single();
  if (error) throw error;
  return data?.data;
}

export async function setStockCache(symbol: string, cacheData: any) {
  // upsert: 有则更新，无则插入
  const { data, error } = await supabase.from('stock_cache').upsert({ symbol, data: cacheData, updated_at: new Date().toISOString() }, { onConflict: ['symbol'] });
  if (error) throw error;
  return data;
}
// src/api/supabase.ts
import { createClient } from '@supabase/supabase-js';

// 支持从 Vite 环境变量读取 Supabase 配置
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY || process.env.SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 示例：自选股表操作
export async function getWatchlist() {
  const { data, error } = await supabase.from('watchlist').select('*').order('order');
  if (error) throw error;
  return data;
}

export async function addToWatchlist(symbol: string, meta: any = {}) {
  const { data, error } = await supabase.from('watchlist').insert([{ symbol, ...meta }]);
  if (error) throw error;
  return data;
}

export async function removeFromWatchlist(id: number) {
  const { data, error } = await supabase.from('watchlist').delete().eq('id', id);
  if (error) throw error;
  return data;
}

export async function updateWatchlistOrder(orderList: {id: number, order: number}[]) {
  const updates = orderList.map(item => supabase.from('watchlist').update({ order: item.order }).eq('id', item.id));
  await Promise.all(updates);
}
