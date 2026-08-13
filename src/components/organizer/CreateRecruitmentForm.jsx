import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Calendar, MapPin, Award, DollarSign, Shield, FileText, Send, ArrowRight } from 'lucide-react';

export const CreateRecruitmentForm = ({ onSuccess }) => {
  const { locations, addActivity, setRole } = useApp();

  const [clubName, setClubName] = useState('');
  const [sport, setSport] = useState('Bóng đá');
  const [location, setLocation] = useState(locations[0]);
  const [level, setLevel] = useState('Khá & Bán chuyên');
  const [neededMembers, setNeededMembers] = useState(3);
  const [fee, setFee] = useState('50.000 VNĐ / Buổi');
  const [date, setDate] = useState('Thứ 3 & Thứ 6 - 19:30');
  const [contactName, setContactName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clubName.trim() || !contactName.trim()) return;

    addActivity({
      title: `${clubName.trim()} tuyển ${neededMembers} thành viên môn ${sport}`,
      type: 'club',
      sport,
      location,
      level,
      fee,
      maxParticipants: Number(neededMembers),
      date,
      organizer: contactName.trim(),
      description: description.trim() || 'CLB sinh hoạt thể thao định kỳ, tuyển thành viên gắn bó lâu dài.'
    });

    setIsCreated(true);

    if (onSuccess) onSuccess();
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Tạo Tin Tuyển Thành Viên CLB</h2>
            <p className="text-xs text-slate-500 font-medium">Tuyển đồng đội cùng đam mê môn thể thao tại khu vực của bạn</p>
          </div>
        </div>
      </div>

      {isCreated ? (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
            ✓
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-indigo-900">Đăng tin tuyển thành công!</h3>
            <p className="text-xs text-indigo-700 max-w-md mx-auto">
              Tin tuyển của <strong>{clubName}</strong> đã được xuất bản tới các người chơi tại khu vực <strong>{location}</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setIsCreated(false);
                setClubName('');
                setContactName('');
                setDescription('');
              }}
              className="px-4 py-2.5 rounded-xl bg-white border border-indigo-300 text-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors"
            >
              Đăng tin khác
            </button>
            <button
              onClick={() => setRole('player')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Xem bài đăng từ giao diện Người chơi</span>
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
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Tên CLB / Nhóm thể thao *</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: CLB Bóng Đá Phủ Doãn FC"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Form Grid Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Môn thể thao *</label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <option value="Bóng đá">Bóng đá</option>
                <option value="Cầu lông">Cầu lông</option>
                <option value="Tennis">Tennis</option>
                <option value="Pickleball">Pickleball</option>
                <option value="Bóng rổ">Bóng rổ</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Khu vực hoạt động *</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
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
                <Award className="w-3.5 h-3.5 text-slate-400" />
                <span>Trình độ yêu cầu *</span>
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <option value="Mới chơi & Phong trào">Mới chơi & Phong trào</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Khá & Bán chuyên">Khá & Bán chuyên</option>
                <option value="Tất cả trình độ">Tất cả trình độ</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Số lượng người cần tuyển *</span>
              </label>
              <input
                type="number"
                min="1"
                max="50"
                required
                value={neededMembers}
                onChange={(e) => setNeededMembers(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Form Grid Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                <span>Chi phí sinh hoạt / đóng góp *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: 50.000 VNĐ / Buổi"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Lịch sinh hoạt cố định *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Tối Thứ 3 & Thứ 6 hàng tuần (19:30)"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Contact name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Tên Trưởng CLB / Người đại diện *</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Anh Tuấn FC Phủ Doãn"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Mô tả chi tiết CLB & yêu cầu</span>
            </label>
            <textarea
              rows={3}
              placeholder="Mô tả vị trí thi đấu cần tuyển, phong cách sinh hoạt của đội..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Đăng tin tuyển ngay</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
