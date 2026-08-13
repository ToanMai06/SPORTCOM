import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProposalDetailModal } from '../player/ProposalDetailModal';
import { CheckCircle2, AlertCircle, Sparkles, Trophy, Users, Heart, ShieldCheck } from 'lucide-react';

export const ProposalDashboard = () => {
  const { proposals, openRegistration, setRole } = useApp();
  const [selectedProposal, setSelectedProposal] = useState(null);

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-emerald-950 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Màn Hình Quản Lý Đề Xuất & Tiến Độ Kích Hoạt</span>
          </div>
          <h3 className="text-base font-black text-white mt-0.5">
            Danh Sách Giải Đề Xuất (Proposals)
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Theo dõi số người Quan tâm, Giữ suất chính và Đặt cọc dự phòng. Khi đạt Ngưỡng kích hoạt, bấm <strong>[Mở đăng ký chính thức]</strong> để xuất bản giải công khai.
          </p>
        </div>
      </div>

      {proposals.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3">
          <p className="text-xs text-slate-500">Chưa có giải đề xuất nào được đăng. Hãy chuyển sang mục "Nhu cầu quanh tôi" để tạo Giải từ Nhu cầu!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => {
            const minThreshold = proposal.minThreshold || 6;
            const committedCount = proposal.committedCount || 0;
            const thresholdReached = committedCount >= minThreshold;
            const isOpen = proposal.status === 'REGISTRATION_OPEN';

            const progressPercent = Math.min(100, Math.round((committedCount / minThreshold) * 100));

            return (
              <div
                key={proposal.id}
                className={`bg-white rounded-2xl p-5 border transition-all space-y-4 shadow-xs ${
                  isOpen
                    ? 'border-emerald-400 ring-2 ring-emerald-400/20'
                    : thresholdReached
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-slate-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                        Đề xuất #{proposal.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isOpen
                          ? 'bg-emerald-600 text-white'
                          : thresholdReached
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {isOpen ? 'ĐÃ MỞ ĐĂNG KÝ CHÍNH THỨC' : thresholdReached ? 'ĐỦ ĐIỀU KIỆN MỞ GIẢI' : 'Chưa đủ số lượng mở giải'}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900 mt-1">
                      {proposal.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {proposal.exactAddress} • {proposal.exactTime} • {proposal.fee}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedProposal(proposal)}
                    className="text-xs text-indigo-600 hover:underline font-bold shrink-0 cursor-pointer"
                  >
                    Xem chi tiết →
                  </button>
                </div>

                {/* Live Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Đã Quan tâm</span>
                    <span className="text-sm font-black text-slate-800 flex items-center justify-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      {proposal.interestedCount || 0}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Đã Giữ suất chính</span>
                    <span className="text-sm font-black text-emerald-700 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {proposal.primaryCommitments || 0}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Đặt cọc dự phòng</span>
                    <span className="text-sm font-black text-indigo-700 flex items-center justify-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      {proposal.paidReserve || 0}
                    </span>
                  </div>
                </div>

                {/* THRESHOLD PROGRESS BAR & STATUS */}
                <div className={`p-4 rounded-xl border space-y-2 ${
                  thresholdReached
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}>
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span className="flex items-center gap-1.5">
                      {thresholdReached ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                      )}
                      <span>
                        {thresholdReached
                          ? 'ĐỦ ĐIỀU KIỆN MỞ GIẢI'
                          : `${committedCount}/${minThreshold} - Chưa đủ số lượng mở giải`}
                      </span>
                    </span>
                    <span>{progressPercent}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        thresholdReached ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* ACTION BUTTON (SECTION II.6) */}
                <div className="pt-1 flex items-center justify-between gap-3">
                  {isOpen ? (
                    <div className="flex items-center justify-between w-full bg-emerald-100 border border-emerald-300 rounded-xl p-3 text-xs font-bold text-emerald-900">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Đã chuyển thành Giải đấu chính thức & Đang hiển thị công khai trên trang Khám phá!
                      </span>
                      <button
                        onClick={() => setRole('player')}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold cursor-pointer shrink-0"
                      >
                        Chuyển sang Khám phá →
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={!thresholdReached}
                      onClick={() => openRegistration(proposal.id)}
                      className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                        thresholdReached
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                      }`}
                    >
                      <Trophy className="w-4 h-4" />
                      <span>[Mở đăng ký chính thức]</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedProposal && (
        <ProposalDetailModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
        />
      )}
    </div>
  );
};
