import React, { useEffect } from 'react';
import { X, Users, MapPin, Calendar, DollarSign, Award, Sparkles, PlusCircle, UserCheck } from 'lucide-react';

export const DemandDetailOrganizerModal = ({ pool, onClose, onCreateProposal }) => {
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
        
        {/* Sticky Header with X button */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5 sm:p-6 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                Chi tiết Nhu cầu Gom nhóm (Góc nhìn BTC)
              </span>
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

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Aggregation Summary */}
          <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-950 rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Cộng đồng Nhu cầu</div>
              <div className="text-lg sm:text-xl font-black flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>{pool.playerCount} người chơi đang chờ đề xuất</span>
              </div>
              <p className="text-xs text-slate-300">
                Nhóm người chơi sẵn sàng tham gia hoạt động nếu BTC đáp ứng thông số bên dưới.
              </p>
            </div>
          </div>

          {/* Parameter Details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Thông số mong muốn của nhóm</h4>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Khu vực & Bán kính</span>
                  <span className="font-bold text-slate-800">{pool.location} ({pool.radius}km)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Khung giờ</span>
                  <span className="font-bold text-slate-800">{pool.preferredTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Ngân sách tối đa</span>
                  <span className="font-bold text-emerald-700">≤ {pool.maxBudget?.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Quy mô mong muốn</span>
                  <span className="font-bold text-slate-800">{pool.desiredPlayers || '8 người'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILED PLAYER USER LIST */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Danh sách chi tiết người chơi trong nhóm ({pool.demands?.length || pool.playerCount}):</span>
              </h4>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 max-h-48 overflow-y-auto space-y-2 text-xs">
              {pool.demands && pool.demands.length > 0 ? (
                pool.demands.map((user, idx) => (
                  <div
                    key={user.id || idx}
                    className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs"
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{user.userName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md">⏰ {user.time || pool.preferredTime}</span>
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
                        ≤ {user.budget ? user.budget.toLocaleString('vi-VN') : pool.maxBudget?.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-2">Đang có {pool.playerCount} người chơi đăng ký trong nhóm này.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Action Buttons Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
          >
            Đóng
          </button>

          <button
            onClick={() => {
              onClose();
              if (onCreateProposal) onCreateProposal(pool);
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>[Tạo giải từ nhu cầu này]</span>
          </button>
        </div>
      </div>
    </div>
  );
};
