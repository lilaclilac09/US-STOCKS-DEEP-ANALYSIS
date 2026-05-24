import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

type Alert = {
  id: string;
  symbol: string;
  type: 'price_above' | 'price_below' | 'indicator';
  target: number;
  indicatorKey?: string;
  triggered: boolean;
};

type AlertContextType = {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'triggered'>) => void;
  removeAlert: (id: string) => void;
  checkAlerts: (stocks: any[]) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>(() => {
    const saved = localStorage.getItem('stockAlerts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('stockAlerts', JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = (newAlert: Omit<Alert, 'id' | 'triggered'>) => {
    const alert: Alert = { ...newAlert, id: `alert_${Date.now()}`, triggered: false };
    setAlerts(prev => [...prev, alert]);
    toast.success(`已为 ${newAlert.symbol} 设置警报！`);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const checkAlerts = (stocks: any[]) => {
    setAlerts(prev =>
      prev.map(alert => {
        const stock = stocks.find(s => s.symbol === alert.symbol);
        if (!stock || alert.triggered) return alert;

        let shouldTrigger = false;

        if (alert.type === 'price_above' && stock.currentPrice > alert.target) shouldTrigger = true;
        if (alert.type === 'price_below' && stock.currentPrice < alert.target) shouldTrigger = true;
        if (alert.type === 'indicator' && alert.indicatorKey) {
          const value = stock.indicators?.[alert.indicatorKey as keyof typeof stock.indicators];
          if (value !== undefined && value > alert.target) shouldTrigger = true;
        }

        if (shouldTrigger) {
          if (Notification.permission === 'granted') {
            new Notification(`🚨 ${alert.symbol} 警报触发！`, {
              body: alert.type === 'indicator'
                ? `${alert.indicatorKey} 已达 ${alert.target}`
                : `价格已${alert.type === 'price_above' ? '突破' : '跌破'} ${alert.target}`,
              icon: '/favicon.ico',
            });
          }
          toast.error(`${alert.symbol} 警报已触发！`, { duration: 5000 });
          return { ...alert, triggered: true };
        }
        return alert;
      })
    );
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert, checkAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlerts must be used within AlertProvider');
  return ctx;
};