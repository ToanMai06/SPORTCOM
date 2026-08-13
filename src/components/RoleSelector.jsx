import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, ShieldCheck, MapPin, Search, CalendarPlus, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

export const RoleSelector = () => {
  const { setRole } = useApp();

  return (
    <div className="max-w-3xl mx-auto w-full p-4 sm:p-6 py-8 sm:py-12 flex flex-col justify-center min-h-[calc(100vh-80px)]">
      {/* Hero Intro */}
      <div className="text-center space-y-3 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Nền tảng kết nối Thể thao Quanh tôi</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Khám phá giải đấu & Kết nối câu lạc bộ thể thao
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Chọn vai trò của bạn để bắt đầu trải nghiệm hệ sinh thái kết nối thể thao thông minh ngay tại khu vực của bạn.
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Card 1: Player */}
        <div
          onClick={() => setRole('player')}
          className="group relative bg-white border-2 border-slate-200 hover:border-emerald-500 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
          
          <div className="space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Users className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Dành cho Người chơi</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Người chơi
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Tìm kiếm giải đấu, CLB tuyển thành viên gần vị trí của bạn, lọc theo môn thể thao, trình độ và đăng ký tham gia chỉ với 1 click.
              </p>
            </div>

            <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Xem danh sách giải & CLB xếp theo khoảng cách</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Bộ lọc theo Môn, Bán kính (2-10km), Trình độ</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Đăng ký / Ứng tuyển trực tiếp tức thì</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <button className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 group-hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2">
              <span>Vào vai Người chơi</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Card 2: Organizer */}
        <div
          onClick={() => setRole('organizer')}
          className="group relative bg-white border-2 border-slate-200 hover:border-indigo-500 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all"></div>

          <div className="space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Dành cho Ban Tổ Chức / CLB</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                BTC / CLB
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Đăng bài thông báo giải đấu, tuyển thành viên mới cho CLB và quản lý phê duyệt danh sách người đăng ký nhanh chóng.
              </p>
            </div>

            <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Tạo giải đấu & tin tuyển thành viên dễ dàng</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Hiển thị ngay cho người chơi ở đúng khu vực</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Duyệt / Từ chối đơn đăng ký real-time</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <button className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md group-hover:shadow-slate-900/30 transition-all flex items-center justify-center gap-2">
              <span>Vào vai BTC / CLB</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
