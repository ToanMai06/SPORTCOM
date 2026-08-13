import React from 'react';
import { MapPin, Calendar, Users, Award, Shield, Tag, ChevronRight } from 'lucide-react';

export const ActivityCard = ({ activity, onSelect }) => {
  const isTournament = activity.type === 'tournament';
  const progressPercent = Math.min(100, Math.round((activity.currentParticipants / activity.maxParticipants) * 100));

  return (
    <div
      onClick={() => onSelect(activity)}
      className="group bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4 relative overflow-hidden"
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
            isTournament ? 'bg-amber-100 text-amber-800 border border-amber-200/60' : 'bg-indigo-100 text-indigo-800 border border-indigo-200/60'
          }`}>
            {isTournament ? '🏆 Giải đấu' : '⚽ CLB Đang tuyển'}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {activity.sport}
          </span>
        </div>

        {/* Distance Badge */}
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 shrink-0">
          <MapPin className="w-3.5 h-3.5" />
          <span>{activity.mockDistance} km</span>
        </div>
      </div>

      {/* Main Title & Organizer */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {activity.title}
        </h3>
        <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span>{activity.organizer}</span>
        </p>
      </div>

      {/* Vertical Details with proper line-height spacing (space-y-2.5) */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium text-slate-800">{activity.date}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate">{activity.location}</span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">{activity.level}</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-lg border border-emerald-100">
            {activity.fee}
          </span>
        </div>
      </div>

      {/* Participant Progress Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-500 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{isTournament ? 'Số suất tham gia' : 'Số vị trí tuyển'}</span>
          </span>
          <span className="text-slate-900 font-bold">
            {activity.currentParticipants}/{activity.maxParticipants}  {/* isTournament ? 'đội/VĐV' : 'thành viên'*/} 
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              progressPercent >= 100 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Footer Action Button */}
      <div className="pt-2">
        <button
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>{isTournament ? 'Xem & Đăng ký' : 'Xem & Ứng tuyển'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
