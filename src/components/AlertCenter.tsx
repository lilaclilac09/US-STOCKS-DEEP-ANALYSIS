import React, { useState } from 'react';
import { useAlerts } from '../contexts/AlertContext';
import { useCategories } from '../contexts/CategoryContext';
import AlertStatsChart from './AlertStatsChart';

const AlertCenter: React.FC = () => {
  const { alerts, removeAlert, getStats } = useAlerts();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'triggered'>('all');

  const stats = getStats();
  const displayedAlerts = alerts.filter(a => {
    const catMatch = selectedCategory === 'all' || categories.find(c => c.id === selectedCategory)?.stocks.includes(a.symbol);
    const statusMatch = statusFilter === 'all' || (statusFilter === 'triggered' && a.triggered);
    return catMatch && statusMatch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">🚨 警报管理中心</h2>
        {/* 分类 + 状态过滤 */}
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-slate-800 px-5 py-3 rounded-2xl text-sm font-medium"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="bg-slate-800 px-5 py-3 rounded-2xl text-sm font-medium"
          >
            <option value="all">全部状态</option>
            <option value="triggered">仅已触发</option>
          </select>
        </div>
      </div>

      {/* 统计概览卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-900 p-6 rounded-3xl text-center">
          <p className="text-sm text-slate-400">总警报</p>
          <p className="text-5xl font-bold text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl text-center">
          <p className="text-sm text-slate-400">已触发</p>
          <p className="text-5xl font-bold text-emerald-400 mt-2">{stats.triggered}</p>
          <p className="text-xs text-emerald-400 mt-1">({stats.triggeredRate}%)</p>
        </div>
        {/* 更多卡片可自行扩展 */}
      </div>

      {/* 统计图表 */}
      <AlertStatsChart stats={stats} />

      {/* 警报列表（带过滤） */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">当前警报列表 ({displayedAlerts.length})</h3>
        {displayedAlerts.length === 0 ? (
          <p className="text-slate-400">暂无符合条件的警报</p>
        ) : (
          <div className="space-y-4">
            {displayedAlerts.map(alert => (
              <div key={alert.id} className="bg-slate-900 p-6 rounded-3xl flex justify-between items-center">
                {/* ... 原有列表内容保持不变 ... */}
                <button onClick={() => removeAlert(alert.id)} className="px-6 py-3 bg-red-600 rounded-2xl font-bold">删除</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertCenter;
