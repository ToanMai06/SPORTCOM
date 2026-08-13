import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, RefreshCw, Trophy, ArrowRightLeft, Bell, Sparkles, X, ShieldCheck } from 'lucide-react';

export const Header = () => {
  const { role, setRole, currentLocation, setShowLocationModal, resetToMockData, notifications, markNotificationRead, setPlayerViewMode } = useApp();
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-3xl mx-auto w-full px-4 py-3.5 flex items-center justify-between gap-3 relative">
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
          {/* Notification Bell for Player */}
          {role === 'player' && (
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className={`p-2 rounded-xl border transition-all cursor-pointer relative ${
                  unreadCount > 0
                    ? 'bg-amber-50 text-amber-700 border-amber-300 animate-pulse'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
                title="Thông báo từ BTC"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 space-y-3 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Thông báo Đề xuất từ BTC ({notifications.length})
                    </span>
                    <button
                      onClick={() => setShowNotifMenu(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-3">Chưa có thông báo mới.</p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            setShowNotifMenu(false);
                            setRole('player');
                            setPlayerViewMode('my-demands');
                          }}
                          className={`p-3 rounded-xl border text-xs space-y-1 transition-all cursor-pointer hover:border-amber-400 ${
                            n.read ? 'bg-slate-50 border-slate-200' : 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-300/40'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span className="text-amber-900 flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                              {n.proposalTitle || 'Đề xuất mới'}
                            </span>
                            {!n.read && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug">{n.message}</p>
                          <span className="text-[10px] text-slate-400 block pt-0.5">
                            {new Date(n.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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
