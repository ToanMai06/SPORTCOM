import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ActivityCard } from './ActivityCard';
import { ActivityFilters } from './ActivityFilters';
import { ActivityDetailModal } from './ActivityDetailModal';
import { CreateDemandModal } from './CreateDemandModal';
import { DemandDetailModal } from './DemandDetailModal';
import { MyDemandsList } from './MyDemandsList';
import { MyApplicationsList } from './MyApplicationsList';
import { ProposalDetailModal } from './ProposalDetailModal';
import { Search, Trophy, Users, SlidersHorizontal, Sparkles, Navigation, PlusCircle, Bell, ClipboardList } from 'lucide-react';

export const PlayerDashboard = () => {
  const { activities, currentLocation, setShowLocationModal, registrations, playerViewMode, setPlayerViewMode } = useApp();

  const viewMode = playerViewMode || 'discover';
  const setViewMode = setPlayerViewMode;
  const [activeTab, setActiveTab] = useState('tournament'); // 'tournament' | 'club'
  const [selectedSport, setSelectedSport] = useState('Tất cả');
  const [selectedRadius, setSelectedRadius] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('Tất cả trình độ');

  // Modals
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateDemandModal, setShowCreateDemandModal] = useState(false);
  const [selectedPoolIdForDetail, setSelectedPoolIdForDetail] = useState(null);
  const [selectedProposalForDetail, setSelectedProposalForDetail] = useState(null);

  // Filter activities and sort by mockDistance (Closest to Farthest)
  const filteredActivities = useMemo(() => {
    return activities
      .filter((act) => {
        if (act.type !== activeTab) return false;
        if (selectedSport !== 'Tất cả' && !act.sport.toLowerCase().includes(selectedSport.toLowerCase())) return false;
        if (selectedRadius !== 'all' && act.mockDistance > selectedRadius) return false;
        if (selectedLevel !== 'Tất cả trình độ' && !act.level.toLowerCase().includes(selectedLevel.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.mockDistance - b.mockDistance);
  }, [activities, activeTab, selectedSport, selectedRadius, selectedLevel]);

  const tournamentCount = activities.filter((a) => a.type === 'tournament').length;
  const clubCount = activities.filter((a) => a.type === 'club').length;
  const pendingApplicationCount = registrations.filter((r) => r.status === 'Pending').length;

  return (
    <div className="max-w-3xl mx-auto w-full p-4 sm:p-6 space-y-6">
      
      {/* Location Banner */}
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
            Kết nối giải đấu, CLB và gom nhóm Nhu cầu người chơi quanh bạn
          </p>
        </div>

        <button
          onClick={() => setShowLocationModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs sm:text-sm border border-white/30 transition-all cursor-pointer shrink-0"
        >
          Đổi khu vực
        </button>
      </div>

      {/* Main Navigation Tabs (3 INLINE TABS FOR PLAYER) */}
      <div className="flex items-center gap-1 bg-slate-200/60 p-1.5 rounded-2xl text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setViewMode('discover')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            viewMode === 'discover'
              ? 'bg-white text-slate-900 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Khám phá Hoạt động</span>
        </button>

        <button
          onClick={() => setViewMode('my-demands')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            viewMode === 'my-demands'
              ? 'bg-white text-slate-900 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Nhu cầu & Suất giữ của tôi</span>
        </button>

        <button
          onClick={() => setViewMode('my-applications')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            viewMode === 'my-applications'
              ? 'bg-white text-slate-900 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ClipboardList className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Đơn ứng tuyển của tôi</span>
          {pendingApplicationCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold">
              {pendingApplicationCount}
            </span>
          )}
        </button>
      </div>

      {viewMode === 'my-demands' ? (
        <MyDemandsList />
      ) : viewMode === 'my-applications' ? (
        <MyApplicationsList />
      ) : (
        <>
          {/* Tabs: Tournament vs Club */}
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

            {/* Filter Toggle */}
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
            />
          )}

          {/* SECTION II.1: "TẠO NHU CẦU" TRIGGER BANNER */}
          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 rounded-2xl p-4 sm:p-5 text-white shadow-md border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Gom Nhóm Nhu Cầu Người Chơi</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                Chưa có hoạt động phù hợp với bạn? Hãy tạo nhu cầu để kết nối với những người chơi khác và các CLB/BTC gần đây.
              </p>
            </div>

            <button
              onClick={() => setShowCreateDemandModal(true)}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer shrink-0 flex items-center gap-2"
            >
              <PlusCircle className="w-4.5 h-4.5" />
              <span>[Tạo nhu cầu tham gia]</span>
            </button>
          </div>

          {/* Activity List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <span>Sắp xếp theo khoảng cách (Gần nhất → Xa nhất)</span>
              <span>{filteredActivities.length} kết quả</span>
            </div>

            {filteredActivities.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">Không tìm thấy hoạt động phù hợp</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Hiện chưa có giải đấu nào phù hợp với bộ lọc môn <strong>"{selectedSport}"</strong> ({selectedLevel}) tại khu vực này.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedSport('Tất cả');
                      setSelectedRadius('all');
                      setSelectedLevel('Tất cả trình độ');
                    }}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Đặt lại bộ lọc
                  </button>

                  <button
                    onClick={() => setShowCreateDemandModal(true)}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>[Tạo nhu cầu tham gia]</span>
                  </button>
                </div>
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
        </>
      )}

      {/* Modals */}
      {selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}

      {showCreateDemandModal && (
        <CreateDemandModal
          initialFilterData={{
            sport: selectedSport,
            level: selectedLevel,
            radius: selectedRadius
          }}
          onClose={() => setShowCreateDemandModal(false)}
          onViewDetail={(poolId) => setSelectedPoolIdForDetail(poolId)}
        />
      )}

      {selectedPoolIdForDetail && (
        <DemandDetailModal
          poolId={selectedPoolIdForDetail}
          onClose={() => setSelectedPoolIdForDetail(null)}
          onSelectProposal={(p) => setSelectedProposalForDetail(p)}
        />
      )}

      {selectedProposalForDetail && (
        <ProposalDetailModal
          proposal={selectedProposalForDetail}
          onClose={() => setSelectedProposalForDetail(null)}
        />
      )}
    </div>
  );
};
