import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastNotification = () => {
  const { toast } = useApp();

  if (!toast.show) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
  };

  const borderMap = {
    success: 'border-emerald-500/30 bg-slate-900 text-white',
    info: 'border-sky-500/30 bg-slate-900 text-white',
    warning: 'border-amber-500/30 bg-slate-900 text-white'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short transition-all duration-300">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border ${borderMap[toast.type] || borderMap.success}`}>
        {iconMap[toast.type] || iconMap.success}
        <span className="text-sm font-medium tracking-wide">{toast.message}</span>
      </div>
    </div>
  );
};
