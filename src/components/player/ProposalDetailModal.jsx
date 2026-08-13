import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, ShieldCheck, CheckCircle2, AlertCircle, MapPin, Calendar, DollarSign, Users, Award, Sparkles, CreditCard } from 'lucide-react';

export const ProposalDetailModal = ({ proposal, onClose }) => {
  const {
    userCommitments,
    userInterests,
    toggleInterest,
    toggleCommitment
  } = useApp();

  const [showDepositModal, setShowDepositModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!proposal) return null;

  const isInterested = !!userInterests[proposal.id];
  const commitmentState = userCommitments[proposal.id];
  const isCommitted = !!commitmentState;
  const isPaidReserve = commitmentState?.isPaidReserve;

  // Threshold logic
  const minThreshold = proposal.minThreshold || 6;
  const currentCommitted = proposal.committedCount || 0;
  const thresholdReached = currentCommitted >= minThreshold;

  const progressPercent = Math.min(100, Math.round((currentCommitted / minThreshold) * 100));

  const handleCommitClick = () => {
    const activeCommitmentsCount = Object.keys(userCommitments).length;
    if (!isCommitted && activeCommitmentsCount > 0) {
      setShowDepositModal(true);
    } else {
      toggleCommitment(proposal.id, false);
    }
  };

  const handleConfirmSecondaryDeposit = () => {
    toggleCommitment(proposal.id, true);
    setShowDepositModal(false);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-200 relative">
        
        {/* Sticky Header with X button */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5 sm:p-6 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                Giải Đấu Đề Xuất (Proposal)
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                thresholdReached ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {thresholdReached ? 'ĐỦ ĐIỀU KIỆN MỞ GIẢI' : 'Đang chờ giữ suất'}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-1">{proposal.title}</h2>
            <p className="text-xs text-slate-500 font-medium">Tạo từ nhóm Nhu cầu môn {proposal.sport}</p>
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
          {/* THRESHOLD PROGRESS BAR */}
          <div className={`p-4 rounded-2xl border transition-all ${
            thresholdReached
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            <div className="flex items-center justify-between font-bold text-xs mb-1.5">
              <span className="flex items-center gap-1.5">
                {thresholdReached ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
                <span>
                  {thresholdReached
                    ? 'ĐỦ ĐIỀU KIỆN MỞ GIẢI'
                    : `${currentCommitted}/${minThreshold} - Chưa đủ số lượng mở giải`}
                </span>
              </span>
              <span>{progressPercent}%</span>
            </div>

            <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  thresholdReached ? 'bg-emerald-600' : 'bg-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
              <span>Số lượng tối thiểu: {minThreshold} người cam kết</span>
              <span>Đã quan tâm: {proposal.interestedCount || 0} | Đã giữ suất: {currentCommitted}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Award className="w-3.5 h-3.5 text-slate-400" /> Môn & Trình độ
              </span>
              <span className="font-bold text-slate-900">{proposal.sport} — {proposal.skillLevel}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Địa điểm cụ thể
              </span>
              <span className="font-bold text-slate-900 text-right">{proposal.exactAddress}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Giờ thi đấu chính thức
              </span>
              <span className="font-bold text-slate-900">{proposal.exactTime}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Lệ phí chính thức
              </span>
              <span className="font-bold text-emerald-700">{proposal.fee}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Đơn vị tổ chức (BTC)
              </span>
              <span className="font-bold text-slate-900">{proposal.organizer}</span>
            </div>
          </div>

          {/* Commitment Status Notice */}
          {isCommitted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isPaidReserve
                  ? 'Bạn đã đặt cọc giữ suất dự phòng (50.000đ). Suất của bạn đã được tính vào số lượng đủ điều kiện mở giải!'
                  : 'Bạn đã Giữ suất thành công! Suất của bạn đã được tính trực tiếp vào số lượng tối thiểu để mở giải.'}
              </span>
            </div>
          )}
        </div>

        {/* Sticky Footer with explicit [Đóng] button */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center gap-3">
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
          >
            Đóng
          </button>

          <button
            onClick={() => toggleInterest(proposal.id)}
            className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              isInterested
                ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInterested ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            <span>{isInterested ? 'Đã Quan Tâm' : '[Quan tâm]'}</span>
          </button>

          <button
            onClick={handleCommitClick}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              isCommitted
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isCommitted ? 'Đã Giữ Suất' : '[Giữ suất]'}</span>
          </button>
        </div>

        {/* Secondary Commitment Mock Deposit Dialog */}
        {showDepositModal && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between z-20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>Giữ suất thứ 2 trong cùng khung giờ</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">Đặt cọc giữ suất dự phòng (50.000đ)</h3>
              <p className="text-xs text-slate-600">
                Bạn đã Giữ suất chính cho 1 giải đấu khác trong cùng khung thời gian. Để tiếp tục giữ suất dự phòng cho giải đề xuất này, vui lòng chọn 
                <strong className="text-emerald-700 font-bold"> Đặt cọc giữ suất dự phòng (50.000đ)</strong>.
              </p>
              <div className="bg-slate-100 rounded-xl p-3 text-xs text-slate-700 font-medium">
                ✔ Suất cọc dự phòng này sẽ được tính trực tiếp vào <strong>Số lượng người giữ suất tối thiểu để kích hoạt mở giải</strong>.
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <button
                onClick={() => setShowDepositModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmSecondaryDeposit}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Xác nhận Đặt cọc 50.000đ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
