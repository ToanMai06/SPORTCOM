import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, User, ShieldCheck, RefreshCw, Trophy, ArrowRightLeft } from 'lucide-react';

export const Header = () => {
  const { role, setRole, currentLocation, setShowLocationModal, resetToMockData } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-3xl mx-auto w-full px-4 py-3.5 flex items-center justify-between gap-3">
        {/* Brand logo & role */}
        <div 
          onClick={() => setRole('landing')}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Trophy className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-xl tracking-tight">SPORTCOM</span>
              {role !== 'landing' && (
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  role === 'player'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}>
                  {role === 'player' ? 'Người chơi' : 'BTC / CLB'}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Hoạt động thể thao quanh bạn</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Location button if Player */}
          {role === 'player' && (
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-all cursor-pointer"
              title="Đổi khu vực của bạn"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="max-w-[120px] sm:max-w-[160px] truncate">{currentLocation}</span>
            </button>
          )}

          {/* Switch Role Button */}
          {role !== 'landing' && (
            <button
              onClick={() => setRole(role === 'player' ? 'organizer' : 'player')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Chuyển sang</span>
              <span className="font-semibold">{role === 'player' ? 'BTC/CLB' : 'Người chơi'}</span>
            </button>
          )}

          {/* Reset Mock Data for Testing */}
          <button
            onClick={resetToMockData}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            title="Khôi phục dữ liệu mẫu ban đầu"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
