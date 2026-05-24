import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#ef4444', '#3b82f6'];

interface Props {
  stats: any;
}

const AlertStatsChart: React.FC<Props> = ({ stats }) => {
  const pieData = [
    { name: '价格高于', value: stats.byType.price_above, color: '#22c55e' },
    { name: '价格低于', value: stats.byType.price_below, color: '#ef4444' },
    { name: '指标警报', value: stats.byType.indicator, color: '#3b82f6' },
  ];

  const barData = stats.topStocks.map(([symbol, count]: [string, number]) => ({
    symbol,
    count,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 饼图：警报类型分布 */}
      <div className="bg-slate-900 p-6 rounded-3xl">
        <h3 className="text-xl font-bold mb-4">警报类型分布</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 柱状图：Top 5 股票警报数量 */}
      <div className="bg-slate-900 p-6 rounded-3xl">
        <h3 className="text-xl font-bold mb-4">Top 5 股票警报数</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={barData}>
            <XAxis dataKey="symbol" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#a855f7" radius={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AlertStatsChart;
