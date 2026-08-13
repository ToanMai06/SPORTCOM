import React from 'react';
import { useApp } from '../../context/AppContext';
import { ClipboardList, CheckCircle2, Clock, XCircle, Trophy, Users } from 'lucide-react';

export const MyApplicationsList = () => {
  const { registrations } = useApp();

  return (
    <div className="space-y-4">
      {/* Sub-header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ClipboardList className="w-4 h-4" />
            <span>Trạng Thái Đơn Ứng Tuyển & Đăng Ký Trực Tiếp</span>
          </div>
          <h3 className="text-base font-black text-white mt-0.5">
            Các đơn đăng ký Giải đấu & CLB của tôi ({registrations.length})
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Theo dõi tiến độ duyệt đơn từ Ban tổ chức (BTC) hoặc Chủ nhiệm CLB.
          </p>
        </div>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3">
          <p className="text-xs text-slate-500">Bạn chưa nộp đơn đăng ký giải đấu hay ứng tuyển CLB nào.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {registrations.map((reg) => {
            const isApproved = reg.status === 'Approved';
            const isPending = reg.status === 'Pending';

            return (
              <div
                key={reg.id}
                className={`bg-white rounded-2xl p-4 border transition-all space-y-3 shadow-xs ${
                  isApproved
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : isPending
                    ? 'border-amber-200'
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                        reg.activityType === 'tournament'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      }`}>
                        {reg.activityType === 'tournament' ? (
                          <>
                            <Trophy className="w-3 h-3 text-amber-600" />
                            <span>Giải đấu</span>
                          </>
                        ) : (
                          <>
                            <Users className="w-3 h-3 text-indigo-600" />
                            <span>Tuyển CLB</span>
                          </>
                        )}
                      </span>

                      <span className="text-[11px] text-slate-400">
                        Nộp lúc: {new Date(reg.appliedAt).toLocaleDateString('vi-VN')} {new Date(reg.appliedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900">
                      {reg.activityTitle}
                    </h4>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    {isApproved && (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black flex items-center gap-1.5 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Đã duyệt đơn [Approved]</span>
                      </span>
                    )}

                    {isPending && (
                      <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>Đang chờ duyệt [Pending]</span>
                      </span>
                    )}

                    {!isApproved && !isPending && (
                      <span className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-300 text-xs font-black flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Đã từ chối [Rejected]</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Player details */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Người nộp đơn:</span>
                    <span className="font-bold text-slate-800">{reg.playerName} ({reg.playerPhone})</span>
                  </div>
                  {reg.playerNote && (
                    <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-200/60">
                      <span className="text-slate-400 font-medium shrink-0">Ghi chú:</span>
                      <span className="font-medium text-slate-700 italic text-right">{reg.playerNote}</span>
                    </div>
                  )}
                </div>

                {/* Status explanation note */}
                <div className="text-[11px] text-slate-500 font-medium pt-0.5">
                  {isApproved
                    ? '🎉 Bạn đã chính thức được BTC xác nhận tham gia!'
                    : isPending
                    ? '⏳ Đang chờ BTC/CLB kiểm tra thông tin và phản hồi.'
                    : 'Đơn đăng ký chưa thành công.'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
