import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MapPin, Calendar, DollarSign, Users, ShieldCheck, Send } from 'lucide-react';

export const CreateProposalModal = ({ pool, onClose, onSuccess }) => {
  const { createProposalFromPool } = useApp();

  const isBiaDemo = pool.sport === 'Bi-a' || pool.sport === 'Billiards';

  const [title, setTitle] = useState(isBiaDemo ? 'Giải Bi-a ABC' : `Giải ${pool.sport} ${pool.location}`);
  const [exactAddress, setExactAddress] = useState(
    isBiaDemo ? 'CLB Bi-a ABC, 123 Tạ Quang Bửu, Bách Khoa, Hà Nội' : `${pool.location} (Sân đạt chuẩn)`
  );
  const [exactTime, setExactTime] = useState(isBiaDemo ? 'Thứ 7 19:00' : 'Thứ 7 - 19:00');
  const [feeAmount, setFeeAmount] = useState(isBiaDemo ? 220000 : pool.maxBudget || 250000);
  const [maxCapacity, setMaxCapacity] = useState(12);
  const [minThreshold, setMinThreshold] = useState(6);
  const [organizerName, setOrganizerName] = useState(isBiaDemo ? 'CLB Bi-a ABC' : 'BTC SportCom');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProp = createProposalFromPool({
      poolId: pool.id,
      title: title.trim(),
      sport: pool.sport,
      skillLevel: pool.skillLevel,
      location: pool.location,
      exactAddress: exactAddress.trim(),
      exactTime: exactTime.trim(),
      fee: `${Number(feeAmount).toLocaleString('vi-VN')} VNĐ`,
      feeAmount: Number(feeAmount),
      maxCapacity: Number(maxCapacity),
      minThreshold: Number(minThreshold),
      organizer: organizerName.trim(),
      initialCommitted: 5,
      initialInterested: pool.playerCount || 8
    });

    onClose();
    if (onSuccess) onSuccess(newProp);
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
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Tạo Giải Đề Xuất (Create Proposal)</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-1">Đề xuất giải từ Nhu cầu #{pool.id}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Thông tin đã được tự động điền sẵn từ nhóm {pool.playerCount} người chơi đang có nhu cầu.
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
          {/* Inherited Info */}
          <div className="bg-slate-100 rounded-2xl p-3.5 border border-slate-200 space-y-1 text-xs">
            <span className="font-bold text-slate-700 block">Thông số Nhu cầu đã kế thừa:</span>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
              <span className="bg-white px-2 py-1 rounded-md border">🏆 Môn: {pool.sport}</span>
              <span className="bg-white px-2 py-1 rounded-md border">⭐ Trình độ: {pool.skillLevel}</span>
              <span className="bg-white px-2 py-1 rounded-md border">📍 Khu vực: {pool.location}</span>
              <span className="bg-white px-2 py-1 rounded-md border">👥 Số người gom: {pool.playerCount} người</span>
            </div>
          </div>

          {/* Event Title */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold">Tên giải đấu chính thức</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Giải Bi-a ABC..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Organizer Name */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold">Đơn vị tổ chức (BTC/CLB)</label>
              <input
                type="text"
                required
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Official Fee */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                <span>Lệ phí chính thức (VNĐ)</span>
              </label>
              <input
                type="number"
                required
                step="10000"
                value={feeAmount}
                onChange={(e) => setFeeAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold text-emerald-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Exact Address */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Địa điểm tổ chức cụ thể</span>
            </label>
            <input
              type="text"
              required
              value={exactAddress}
              onChange={(e) => setExactAddress(e.target.value)}
              placeholder="VD: CLB Bi-a ABC, 123 Tạ Quang Bửu..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Exact Time */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Giờ thi đấu chính thức</span>
            </label>
            <input
              type="text"
              required
              value={exactTime}
              onChange={(e) => setExactTime(e.target.value)}
              placeholder="VD: Thứ 7 19:00..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Minimum Threshold */}
            <div className="space-y-1.5 bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <label className="text-amber-900 font-bold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>Số người tối thiểu (Ngưỡng kích hoạt)</span>
              </label>
              <input
                type="number"
                required
                min="2"
                max="64"
                value={minThreshold}
                onChange={(e) => setMinThreshold(e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-amber-900 font-black focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <span className="text-[10px] text-amber-700 block">Số người giữ suất cần đạt để mở giải</span>
            </div>

            {/* Max Capacity */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Số lượng tối đa</span>
              </label>
              <input
                type="number"
                required
                min="4"
                max="128"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Sticky Actions Footer */}
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>[Đăng giải đề xuất]</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
