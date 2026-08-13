import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SPORTS_LIST, LEVEL_OPTIONS } from '../../data/mockData';
import { X, Sparkles, MapPin, Calendar, DollarSign, Users, Award, Send } from 'lucide-react';

export const CreateDemandModal = ({ initialFilterData = {}, onClose, onViewDetail }) => {
  const { currentLocation, createDemand } = useApp();

  const [sport, setSport] = useState(
    initialFilterData.sport && initialFilterData.sport !== 'Tất cả' ? initialFilterData.sport : 'Bi-a'
  );
  const [skillLevel, setSkillLevel] = useState(
    initialFilterData.level && initialFilterData.level !== 'Tất cả trình độ' ? initialFilterData.level : 'Trình B'
  );
  const [location, setLocation] = useState(currentLocation || 'Bách Khoa, Hà Nội');
  const [radius, setRadius] = useState(initialFilterData.radius !== 'all' ? initialFilterData.radius : 5);
  const [preferredTime, setPreferredTime] = useState('Thứ 7');
  const [maxBudget, setMaxBudget] = useState(250000);
  const [desiredPlayers, setDesiredPlayers] = useState('8 người');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdPoolId = createDemand({
      sport,
      skillLevel,
      location,
      radius,
      preferredTime,
      maxBudget: Number(maxBudget),
      desiredPlayers,
      userName: userName.trim() || 'Bạn (Current User)'
    });

    onClose();
    if (onViewDetail) {
      onViewDetail(createdPoolId);
    }
  };

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
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Gom Nhóm Nhu Cầu</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-1">Tạo nhu cầu tham gia</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hệ thống sẽ tự động gom nhu cầu của bạn với những người chơi có cùng mong muốn trong khu vực.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors shrink-0"
            title="Đóng (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs font-medium">
          {/* Pre-fill Banner */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-emerald-800 font-medium">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Thông tin đã được <strong>tự động điền sẵn (Pre-fill)</strong> từ bộ lọc hiện tại của bạn. Bạn có thể điều chỉnh lại nếu cần.
            </span>
          </div>

          {/* User Name */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold">Họ tên của bạn</label>
            <input
              type="text"
              placeholder="Nhập họ tên..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Sport */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                <span>Môn thể thao</span>
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {SPORTS_LIST.filter((s) => s !== 'Tất cả').map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Level */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                <span>Yêu cầu trình độ</span>
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {LEVEL_OPTIONS.filter((l) => l !== 'Tất cả trình độ').map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Khu vực</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Radius */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Bán kính chấp nhận</span>
              </label>
              <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value={2}>Dưới 2 km</option>
                <option value={5}>Dưới 5 km</option>
                <option value={10}>Dưới 10 km</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Preferred Time */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Thời gian mong muốn</span>
              </label>
              <input
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                placeholder="VD: Thứ 7..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Max Budget */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                <span>Mức ngân sách tối đa</span>
              </label>
              <select
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value={150000}>≤ 150.000 VNĐ</option>
                <option value={250000}>≤ 250.000 VNĐ</option>
                <option value={350000}>≤ 350.000 VNĐ</option>
                <option value={500000}>≤ 500.000 VNĐ</option>
              </select>
            </div>
          </div>

          {/* Minimum Desired Players */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Số người mong muốn tối thiểu</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['8 người', '12 người', '16 người', 'Không quan trọng'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setDesiredPlayers(opt)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    desiredPlayers === opt
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold cursor-pointer transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>[Gửi nhu cầu]</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
