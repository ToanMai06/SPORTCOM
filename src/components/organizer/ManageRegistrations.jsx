import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, XCircle, Clock, User, Phone, FileText, Calendar, Inbox } from 'lucide-react';

export const ManageRegistrations = () => {
  const { registrations, updateRegistrationStatus } = useApp();

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Quản Lý Đăng Ký & Ứng Tuyển</h2>
          <p className="text-xs text-slate-500 font-medium">Danh sách các yêu cầu tham gia từ người chơi quanh bạn</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
          Tổng số: {registrations.length} đơn
        </span>
      </div>

      {registrations.length === 0 ? (
        <div className="p-8 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-700">Chưa có đơn đăng ký nào</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Khi người chơi bấm "Đăng ký" hoặc "Ứng tuyển" từ giao diện Người chơi, thông tin sẽ hiển thị ngay tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {registrations.map((reg) => {
            const isApproved = reg.status === 'Approved';
            const isRejected = reg.status === 'Rejected';
            const isPending = reg.status === 'Pending';
            const isTournament = reg.activityType === 'tournament';

            return (
              <div
                key={reg.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 transition-all space-y-3.5"
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isTournament ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {isTournament ? '🏆 Giải đấu' : '⚽ CLB'}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                      {reg.activityTitle}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                    isApproved ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    isRejected ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                    'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {isApproved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {isRejected && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                    {isPending && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                    <span>{isApproved ? 'Đã duyệt' : isRejected ? 'Đã từ chối' : 'Chờ duyệt'}</span>
                  </span>
                </div>

                {/* Player details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Tên người chơi</span>
                      <span className="font-bold text-slate-900">{reg.playerName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Số điện thoại / Zalo</span>
                      <span className="font-semibold text-emerald-700">{reg.playerPhone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Thời gian gửi đơn</span>
                      <span className="font-medium">{new Date(reg.appliedAt).toLocaleString('vi-VN')}</span>
                    </div>
                  </div>
                </div>

                {/* Player Note */}
                {reg.playerNote && (
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Ghi chú từ người chơi: </span>
                    <span>{reg.playerNote}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => updateRegistrationStatus(reg.id, 'Approved')}
                    disabled={isApproved}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isApproved
                        ? 'bg-emerald-100 text-emerald-700 cursor-default opacity-80'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isApproved ? 'Đã phê duyệt' : 'Duyệt đơn'}</span>
                  </button>

                  <button
                    onClick={() => updateRegistrationStatus(reg.id, 'Rejected')}
                    disabled={isRejected}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isRejected
                        ? 'bg-rose-100 text-rose-700 cursor-default opacity-80'
                        : 'bg-white hover:bg-rose-50 border border-slate-200 text-slate-700 hover:text-rose-700'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{isRejected ? 'Đã từ chối' : 'Từ chối'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
