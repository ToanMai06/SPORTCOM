import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Users, MapPin, Calendar, DollarSign, Award, Bell, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const DemandDetailModal = ({ poolId, onClose, onSelectProposal }) => {
  const { demandPools, followedPools, toggleFollowPool, proposals } = useApp();

  const pool = demandPools.find((p) => p.id === poolId) || demandPools[0];
  const isFollowing = !!followedPools[pool?.id];

  const relatedProposals = proposals.filter((p) => p.poolId === pool?.id || p.sport === pool?.sport);

  // Keyboard Escape key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!pool) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-200">
        
        {/* Sticky Header with permanently visible X close button */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5 sm:p-6 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Đang gom nhu cầu
              </span>
              <span className="text-xs text-slate-400">ID: {pool.id}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
              <span>Môn {pool.sport}</span>
              <span className="text-sm font-semibold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                {pool.skillLevel}
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors shrink-0"
            title="Đóng (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Community Stat Highlight */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">Trạng thái Gom nhóm</div>
              <div className="text-lg sm:text-xl font-black flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-200" />
                <span>{pool.playerCount} người đang có cùng nhu cầu</span>
              </div>
              <p className="text-xs text-emerald-100/80">
                Đã gom nhóm tự động từ các tiêu chí tương đồng khu vực {pool.location}.
              </p>
            </div>
          </div>

          {/* Parameter Breakdown */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Thông tin Nhu cầu Gom nhóm</h4>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Khu vực & Bán kính</span>
                  <span className="font-bold text-slate-800">{pool.location} ({pool.radius}km)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Khung giờ mong muốn</span>
                  <span className="font-bold text-slate-800">{pool.preferredTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Mức phí tối đa</span>
                  <span className="font-bold text-slate-800">≤ {pool.maxBudget?.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Số người mong muốn</span>
                  <span className="font-bold text-slate-800">{pool.desiredPlayers || '8 người'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Member List */}
          {pool.demands && pool.demands.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700">Danh sách người chơi cùng nhu cầu ({pool.demands.length}):</h4>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-100">
                {pool.demands.map((d, idx) => (
                  <span
                    key={d.id || idx}
                    className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-2xs"
                  >
                    👤 {d.userName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Proposals Created by Organizer */}
          {relatedProposals.length > 0 ? (
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Giải đề xuất từ BTC ({relatedProposals.length}):
                </span>
              </div>
              {relatedProposals.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => {
                    onClose();
                    if (onSelectProposal) onSelectProposal(prop);
                  }}
                  className="bg-white p-3 rounded-xl border border-indigo-100 flex items-center justify-between gap-2 hover:border-indigo-400 transition-all cursor-pointer shadow-xs"
                >
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">{prop.title}</h5>
                    <p className="text-[11px] text-slate-500">{prop.exactAddress} • {prop.exactTime}</p>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-600 font-bold text-xs shrink-0">
                    <span>Xem đề xuất</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-800">
              ⏳ Đang chờ BTC/CLB quanh khu vực xem nhu cầu này để tạo Đề xuất Giải đấu (Proposal)...
            </div>
          )}
        </div>

        {/* Sticky Footer Action Bar with explicit [Đóng] button */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center gap-3">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
          >
            Đóng
          </button>

          <button
            onClick={() => toggleFollowPool(pool.id)}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border ${
              isFollowing
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-md'
            }`}
          >
            {isFollowing ? <Check className="w-4 h-4 text-emerald-400" /> : <Bell className="w-4 h-4 text-white" />}
            <span>{isFollowing ? 'Đã theo dõi nhu cầu này' : '[Theo dõi nhu cầu này]'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
