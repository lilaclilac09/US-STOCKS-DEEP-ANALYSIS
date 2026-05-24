import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, CandlestickSeries } from 'lightweight-charts';

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface Props {
  data: Candle[];
  height?: number;
  width?: number;
}

const MiniKLineChart: React.FC<Props> = ({ data, height = 72, width = 160 }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || data.length < 5) return;
    const chart = createChart(chartContainerRef.current, {
      width,
      height,
      layout: { background: { color: 'transparent' }, textColor: '#64748b' },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      timeScale: { visible: false },
      rightPriceScale: { visible: false },
      crosshair: { mode: 0 }, // 0 = CrosshairMode.Normal, hides on small charts
    });
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });
    candleSeries.setData(data);
    chart.timeScale().fitContent();
    chartRef.current = chart;
    return () => { if (chartRef.current) chartRef.current.remove(); };
  }, [data, height, width]);

  return (
    <div
      ref={chartContainerRef}
      className="rounded-lg overflow-hidden bg-zinc-950/50 border border-zinc-800"
    />
  );
};

export default MiniKLineChart;
