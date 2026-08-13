import React from 'react';
import { Filter, SlidersHorizontal, MapPin, Calendar, Award } from 'lucide-react';

export const ActivityFilters = ({
  selectedSport,
  setSelectedSport,
  selectedRadius,
  setSelectedRadius,
  selectedLevel,
  setSelectedLevel,
  activeTab
}) => {
  const sports = ['Tất cả', 'Bóng đá', 'Cầu lông', 'Tennis', 'Pickleball', 'Bóng rổ'];
  const radiusOptions = [
    { label: 'Tất cả bán kính', value: 'all' },
    { label: 'Dưới 2 km', value: 2 },
    { label: 'Dưới 5 km', value: 5 },
    { label: 'Dưới 10 km', value: 10 },
  ];

  const levelOptions = ['Tất cả trình độ', 'Phong trào', 'Trung bình', 'Khá', 'Bán chuyên'];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <span>Bộ lọc nâng cao</span>
        </div>
        {(selectedSport !== 'Tất cả' || selectedRadius !== 'all' || selectedLevel !== 'Tất cả trình độ') && (
          <button
            onClick={() => {
              setSelectedSport('Tất cả');
              setSelectedRadius('all');
              setSelectedLevel('Tất cả trình độ');
            }}
            className="text-xs text-emerald-600 hover:underline font-semibold cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>

      {/* Sport Pills */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Môn thể thao</label>
        <div className="flex flex-wrap gap-2">
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedSport === sport
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Radius Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Khoảng cách bán kính</span>
          </label>
          <select
            value={selectedRadius}
            onChange={(e) => setSelectedRadius(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer"
          >
            {radiusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-400" />
            <span>Yêu cầu Trình độ</span>
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer"
          >
            {levelOptions.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
