import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreateTournamentForm } from './CreateTournamentForm';
import { CreateRecruitmentForm } from './CreateRecruitmentForm';
import { ManageRegistrations } from './ManageRegistrations';
import { NearbyDemandsView } from './NearbyDemandsView';
import { ProposalDashboard } from './ProposalDashboard';
import { Trophy, Users, ClipboardList, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export const OrganizerDashboard = () => {
  const { registrations, demandPools, proposals } = useApp();
  const [activeTab, setActiveTab] = useState('nearby-demands'); 
  // 'nearby-demands' | 'proposals' | 'create-tournament' | 'create-recruitment' | 'manage-registrations'

  const pendingCount = registrations.filter((r) => r.status === 'Pending').length;
  const demandCount = demandPools.length;
  const proposalCount = proposals.length;

  return (
    <div className="max-w-3xl mx-auto w-full p-4 sm:p-6 space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Giao diện Quản trị BTC / CLB</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Quản lý Nhu cầu & Đề xuất Hoạt động
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Xem nhóm Nhu cầu (Demand Aggregation) quanh khu vực, công bố Đề xuất (Proposal), và Mở đăng ký chính thức khi đạt Ngưỡng kích hoạt.
        </p>
      </div>

      {/* Organizer Navigation Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('nearby-demands')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'nearby-demands'
              ? 'bg-white text-indigo-900 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Nhu cầu quanh tôi</span>
          {demandCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-extrabold">
              {demandCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('proposals')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'proposals'
              ? 'bg-white text-emerald-900 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Quản lý Đề xuất</span>
          {proposalCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
              {proposalCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('create-tournament')}
          className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'create-tournament'
              ? 'bg-white text-amber-900 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Tạo giải mới</span>
        </button>

        <button
          onClick={() => setActiveTab('create-recruitment')}
          className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'create-recruitment'
              ? 'bg-white text-indigo-900 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Tạo tin tuyển</span>
        </button>

        <button
          onClick={() => setActiveTab('manage-registrations')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'manage-registrations'
              ? 'bg-white text-emerald-900 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ClipboardList className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Xem đăng ký</span>
          {pendingCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      {/* Active Tab View */}
      <div>
        {activeTab === 'nearby-demands' && <NearbyDemandsView />}
        {activeTab === 'proposals' && <ProposalDashboard />}
        {activeTab === 'create-tournament' && <CreateTournamentForm onSuccess={() => {}} />}
        {activeTab === 'create-recruitment' && <CreateRecruitmentForm onSuccess={() => {}} />}
        {activeTab === 'manage-registrations' && <ManageRegistrations />}
      </div>
    </div>
  );
};
