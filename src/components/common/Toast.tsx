import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, Star, Zap } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:right-6 z-50 flex flex-col gap-2 pointer-events-none items-center md:items-end">
      {toasts.map((toast) => {
        const isFav = toast.type === 'favorite';
        const isInfo = toast.type === 'info';
        const isAutomation = toast.type === 'automation';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl text-sm font-medium transition-all animate-in fade-in slide-in-from-bottom-2 ${
              isAutomation
                ? 'bg-[#0E2016] border-[#25D366] text-white ring-1 ring-[#25D366]/40'
                : isFav
                ? 'bg-[#15241C] border-[#25D366]/40 text-[#DCFCE7]'
                : isInfo
                ? 'bg-[#18202F] border-blue-500/30 text-blue-100'
                : 'bg-[#111B21] border-[#25D366]/30 text-white'
            }`}
          >
            {isAutomation ? (
              <Zap className="w-4 h-4 text-[#25D366] fill-[#25D366] shrink-0" />
            ) : isFav ? (
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
            ) : isInfo ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
            )}
            <span className="leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
