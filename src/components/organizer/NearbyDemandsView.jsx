import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, MapPin, Calendar, DollarSign, Award, Sparkles, PlusCircle, Eye } from 'lucide-react';
import { CreateProposalModal } from './CreateProposalModal';
import { DemandDetailOrganizerModal } from './DemandDetailOrganizerModal';

export const NearbyDemandsView = () => {
  const { demandPools, currentLocation } = useApp();
  const [selectedPoolForProposal, setSelectedPoolForProposal] = useState(null);
  const [selectedPoolForDetail, setSelectedPoolForDetail] = useState(null);

  return (
    <div className="space-y-4">
      {/* Sub-header banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Danh Sách Nhu Cầu Quanh Tôi</span>
          </div>
          <h3 className="text-base font-black text-white mt-0.5">
            Khu vực hoạt động: {currentLocation}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Bấm vào từng nhóm nhu cầu để <strong>xem trước danh sách thông tin người chơi</strong> trước khi tạo Giải đấu đề xuất.
          </p>
        </div>
      </div>

      {/* Demand Pools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demandPools.map((pool) => (
          <div
            key={pool.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3 cursor-pointer" onClick={() => setSelectedPoolForDetail(pool)}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
                    Đang gom nhu cầu
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-1 flex items-center gap-2">
                    <span>Môn {pool.sport}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {pool.skillLevel}
                    </span>
                  </h4>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-right">
                  <span className="text-[10px] text-emerald-600 font-semibold block uppercase">Đã gom nhóm</span>
                  <span className="text-sm font-black text-emerald-700 flex items-center gap-1 justify-end">
                    <Users className="w-4 h-4" />
                    {pool.playerCount} người
                  </span>
                </div>
              </div>

              {/* Pool Details */}
              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" /> Khu vực:
                  </span>
                  <span className="font-bold text-slate-800">{pool.location} ({pool.radius}km)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" /> Khung giờ:
                  </span>
                  <span className="font-bold text-slate-800">{pool.preferredTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-400">
                    <DollarSign className="w-3.5 h-3.5" /> Ngân sách:
                  </span>
                  <span className="font-bold text-emerald-700">≤ {pool.maxBudget?.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={() => setSelectedPoolForDetail(pool)}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-200"
              >
                <Eye className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Xem người chơi ({pool.playerCount})</span>
              </button>

              <button
                onClick={() => setSelectedPoolForProposal(pool)}
                className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer transition-all shrink-0"
              >
                <PlusCircle className="w-4 h-4 shrink-0" />
                <span>[Tạo giải từ nhu cầu]</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Organizer Detail Modal to view player list */}
      {selectedPoolForDetail && (
        <DemandDetailOrganizerModal
          pool={selectedPoolForDetail}
          onClose={() => setSelectedPoolForDetail(null)}
          onCreateProposal={(poolToPropose) => setSelectedPoolForProposal(poolToPropose)}
        />
      )}

      {/* Create Proposal Modal */}
      {selectedPoolForProposal && (
        <CreateProposalModal
          pool={selectedPoolForProposal}
          onClose={() => setSelectedPoolForProposal(null)}
        />
      )}
    </div>
  );
};
