import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Calendar, MapPin, Award, DollarSign, Users, Shield, FileText, Send, ArrowRight } from 'lucide-react';

export const CreateTournamentForm = ({ onSuccess }) => {
  const { locations, addActivity, setRole } = useApp();

  const [title, setTitle] = useState('');
  const [sport, setSport] = useState('Cầu lông');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState(locations[0]);
  const [level, setLevel] = useState('Phong trào & Trung bình');
  const [fee, setFee] = useState('200.000 VNĐ / Đội');
  const [maxParticipants, setMaxParticipants] = useState(16);
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !organizer.trim() || !date.trim()) return;

    addActivity({
      title: title.trim(),
      type: 'tournament',
      sport,
      location,
      level,
      fee,
      maxParticipants: Number(maxParticipants),
      date,
      organizer: organizer.trim(),
      description: description.trim() || 'Giải đấu giao lưu thể thao sôi nổi.'
    });

    setIsCreated(true);

    if (onSuccess) onSuccess();
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Tạo Giải Đấu Mới</h2>
            <p className="text-xs text-slate-500 font-medium">Đăng tin giải đấu để thu hút người chơi xung quanh đăng ký</p>
          </div>
        </div>
      </div>

      {isCreated ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
            ✓
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-emerald-900">Đăng giải đấu thành công!</h3>
            <p className="text-xs text-emerald-700 max-w-md mx-auto">
              Giải đấu của bạn đã được xuất bản trực tiếp lên hệ thống và xuất hiện trong danh sách "Quanh tôi" của người chơi tại khu vực <strong>{location}</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setIsCreated(false);
                setTitle('');
                setOrganizer('');
                setDescription('');
              }}
              className="px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              Tạo giải khác
            </button>
            <button
              onClick={() => setRole('player')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Chuyển sang Người chơi để kiểm tra</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Form fields with strictly required space-y-4 formatting */
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Form Row 1 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-slate-400" />
              <span>Tên giải đấu *</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Giải Cầu Lông Mở Rộng Mùa Hè 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Form Grid Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Môn thể thao *</label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
              >
                <option value="Cầu lông">Cầu lông</option>
                <option value="Bóng đá">Bóng đá</option>
                <option value="Tennis">Tennis</option>
                <option value="Pickleball">Pickleball</option>
                <option value="Bóng rổ">Bóng rổ</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Địa điểm tổ chức *</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Grid Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Ngày & Giờ thi đấu *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: 25/08/2026 - 08:00 AM"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                <span>Trình độ *</span>
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
              >
                <option value="Phong trào & Trung bình">Phong trào & Trung bình</option>
                <option value="Trung bình & Khá">Trung bình & Khá</option>
                <option value="Khá & Bán chuyên">Khá & Bán chuyên</option>
                <option value="Tất cả trình độ">Tất cả trình độ</option>
              </select>
            </div>
          </div>

          {/* Form Grid Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                <span>Lệ phí tham gia *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: 200.000 VNĐ / Đội"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Số suất tham gia tối đa *</span>
              </label>
              <input
                type="number"
                min="2"
                max="128"
                required
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Organizer name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Tên BTC / Đơn vị đại diện *</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: BTC Cầu Lông Mở Rộng Hai Bà Trưng"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Mô tả chi tiết giải đấu</span>
            </label>
            <textarea
              rows={3}
              placeholder="Nhập chi tiết cơ cấu giải thưởng, thể thức thi đấu, trang thiết bị..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Đăng giải đấu</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
