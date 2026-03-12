import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  onAddAlert: (alert: any) => void;
}

const AlertModal: React.FC<Props> = ({ isOpen, onClose, symbol, onAddAlert }) => {
  const [type, setType] = useState<'price_above' | 'price_below' | 'indicator'>('price_above');
  const [target, setTarget] = useState(100);
  const [indicatorKey, setIndicatorKey] = useState('roic');

  const handleAdd = () => {
    onAddAlert({
      symbol,
      type,
      target,
      indicatorKey: type === 'indicator' ? indicatorKey : undefined,
    });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-slate-900 p-8 rounded-3xl w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">为 {symbol} 设置警报</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <select value={type} onChange={e => setType(e.target.value as any)} className="w-full bg-slate-800 p-3 rounded-2xl mb-4">
              <option value="price_above">价格高于</option>
              <option value="price_below">价格低于</option>
              <option value="indicator">指标超过</option>
            </select>
            {type === 'indicator' && (
              <select value={indicatorKey} onChange={e => setIndicatorKey(e.target.value)} className="w-full bg-slate-800 p-3 rounded-2xl mb-4">
                <option value="roic">ROIC</option>
                <option value="roe">ROE</option>
                <option value="revenueGrowth">营收增长</option>
              </select>
            )}
            <input
              type="number"
              value={target}
              onChange={e => setTarget(Number(e.target.value))}
              className="w-full bg-slate-800 p-3 rounded-2xl text-2xl text-center"
              placeholder="目标值"
            />
            <button onClick={handleAdd} className="mt-6 w-full bg-rose-600 py-4 rounded-2xl font-bold text-lg">
              确认设置警报
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlertModal;
