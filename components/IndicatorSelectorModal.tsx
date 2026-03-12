import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const availableIndicators = [
  'roic', 'roe', 'debt', 'currentRatio', 'cashFlow',
  'margin', 'buildup', 'pipeline', 'buyback', 'occupancy'
] as const;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selected: string[]) => void;
  initialSelected: string[];
}

const IndicatorSelectorModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialSelected }) => {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggle = (ind: string) => {
    setSelected(prev => prev.includes(ind) 
      ? prev.filter(i => i !== ind) 
      : [...prev, ind]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex justify-between mb-6">
                  <Dialog.Title className="text-2xl font-bold">自定义显示指标</Dialog.Title>
                  <button onClick={onClose}><XMarkIcon className="w-6 h-6" /></button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {availableIndicators.map(ind => (
                    <label key={ind} className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selected.includes(ind)}
                        onChange={() => toggle(ind)}
                        className="w-5 h-5 accent-indigo-500"
                      />
                      <span className="font-mono uppercase text-sm">{ind}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleSave}
                  className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-bold text-lg transition"
                >
                  保存并应用
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default IndicatorSelectorModal;
