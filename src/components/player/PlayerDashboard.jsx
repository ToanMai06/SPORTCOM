import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ActivityCard } from './ActivityCard';
import { ActivityFilters } from './ActivityFilters';
import { ActivityDetailModal } from './ActivityDetailModal';
import { MapPin, Search, Trophy, Users, SlidersHorizontal, Sparkles, Navigation } from 'lucide-react';

export const PlayerDashboard = () => {
  const { activities, currentLocation, setShowLocationModal } = useApp();

  const [activeTab, setActiveTab] = useState('tournament'); // 'tournament' | 'club'
  const [selectedSport, setSelectedSport] = useState('Tất cả');
  const [selectedRadius, setSelectedRadius] = useState('all'); // 'all' | 2 | 5 | 10
  const [selectedLevel, setSelectedLevel] = useState('Tất cả trình độ');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter activities and sort by mockDistance (Closest to Farthest)
  const filteredActivities = useMemo(() => {
    return activities
      .filter((act) => {
        // Tab filter
        if (act.type !== activeTab) return false;

        // Sport filter
        if (selectedSport !== 'Tất cả' && act.sport !== selectedSport) return false;

        // Radius filter
        if (selectedRadius !== 'all' && act.mockDistance > selectedRadius) return false;

        // Level filter
        if (selectedLevel !== 'Tất cả trình độ' && !act.level.toLowerCase().includes(selectedLevel.toLowerCase())) {
          return false;
        }

        return true;
      })
      .sort((a, b) => a.mockDistance - b.mockDistance);
  }, [activities, activeTab, selectedSport, selectedRadius, selectedLevel]);

  const tournamentCount = activities.filter((a) => a.type === 'tournament').length;
  const clubCount = activities.filter((a) => a.type === 'club').length;

  return (
    <div className="max-w-3xl mx-auto w-full p-4 sm:p-6 space-y-6">
      
      {/* Location Banner (Breathing room, max-w-3xl mx-auto) */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-emerald-600/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-100 text-xs font-semibold">
            <Navigation className="w-3.5 h-3.5" />
            <span>Khu vực hoạt động của bạn</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            <span>{currentLocation}</span>
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-sm">
            Danh sách giải đấu & CLB được tự động sắp xếp theo khoảng cách gần bạn nhất
          </p>
        </div>

        <button
          onClick={() => setShowLocationModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs sm:text-sm border border-white/30 transition-all cursor-pointer shrink-0"
        >
          Đổi khu vực
        </button>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('tournament')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'tournament'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Giải đấu quanh tôi</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              activeTab === 'tournament' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
            }`}>
              {tournamentCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('club')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'club'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>CLB đang tuyển</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              activeTab === 'club' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
            }`}>
              {clubCount}
            </span>
          </button>
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            showFilters || selectedSport !== 'Tất cả' || selectedRadius !== 'all'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Bộ lọc</span>
        </button>
      </div>

      {/* Expandable Filter Box */}
      {showFilters && (
        <ActivityFilters
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          selectedRadius={selectedRadius}
          setSelectedRadius={setSelectedRadius}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          activeTab={activeTab}
        />
      )}

      {/* Activity List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Sắp xếp theo khoảng cách (Gần nhất → Xa nhất)</span>
          <span>{filteredActivities.length} kết quả</span>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Không tìm thấy hoạt động phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thử thay đổi bộ lọc bán kính, môn thể thao hoặc chuyển sang khu vực lân cận.
            </p>
            <button
              onClick={() => {
                setSelectedSport('Tất cả');
                setSelectedRadius('all');
                setSelectedLevel('Tất cả trình độ');
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredActivities.map((act) => (
              <ActivityCard
                key={act.id}
                activity={act}
                onSelect={(selected) => setSelectedActivity(selected)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </div>
  );
};
