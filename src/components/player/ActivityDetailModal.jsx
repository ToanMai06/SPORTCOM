import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MapPin, Calendar, Users, Award, Shield, DollarSign, CheckCircle2, Send, FileText } from 'lucide-react';

export const ActivityDetailModal = ({ activity, onClose }) => {
  const { addRegistration } = useApp();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerPhone, setPlayerPhone] = useState('');
  const [playerNote, setPlayerNote] = useState('');

  if (!activity) return null;

  const isTournament = activity.type === 'tournament';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim() || !playerPhone.trim()) return;

    addRegistration({
      activityId: activity.id,
      activityTitle: activity.title,
      activityType: activity.type,
      playerName: playerName.trim(),
      playerPhone: playerPhone.trim(),
      playerNote: playerNote.trim() || (isTournament ? 'Đăng ký thi đấu' : 'Ứng tuyển thành viên')
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                isTournament ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
              }`}>
                {isTournament ? '🏆 Giải đấu' : '⚽ CLB Đang tuyển'}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {activity.sport}
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Cách bạn {activity.mockDistance} km
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 leading-snug mt-2">
              {activity.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details (Vertical spacing space-y-3.5) */}
        <div className="py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-700">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Đơn vị tổ chức</span>
                <span className="font-semibold">{activity.organizer}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Thời gian</span>
                <span className="font-semibold">{activity.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Địa điểm</span>
                <span className="font-semibold">{activity.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Trình độ yêu cầu</span>
                <span className="font-semibold">{activity.level}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Lệ phí</span>
                <span className="font-bold text-emerald-700">{activity.fee}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Số lượng hiện tại</span>
                <span className="font-semibold">{activity.currentParticipants}/{activity.maxParticipants}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Mô tả chi tiết</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/70 whitespace-pre-line">
              {activity.description}
            </p>
          </div>

          {/* Application Form Drawer / Section */}
          {showApplyForm && (
            <form onSubmit={handleSubmit} className="bg-emerald-50/60 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 space-y-3.5 animate-in slide-in-from-top-2 duration-200">
              <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Nhập thông tin {isTournament ? 'Đăng ký giải' : 'Ứng tuyển CLB'}</span>
              </h4>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Họ và tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Số điện thoại / Zalo *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912345678"
                  value={playerPhone}
                  onChange={(e) => setPlayerPhone(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Ghi chú thêm (Vị trí / Trình độ / Đội)</label>
                <textarea
                  rows={2}
                  placeholder="Nhập ghi chú cho BTC / CLB nếu có..."
                  value={playerNote}
                  onChange={(e) => setPlayerNote(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Xác nhận {isTournament ? 'Đăng ký' : 'Ứng tuyển'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Main Footer Actions */}
        {!showApplyForm && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
            <button
              onClick={() => setShowApplyForm(true)}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isTournament ? 'Đăng ký ngay' : 'Ứng tuyển ngay'}</span>
            </button>
            <button
              onClick={onClose}
              className="py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
