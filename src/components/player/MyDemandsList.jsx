import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DemandDetailModal } from './DemandDetailModal';
import { ProposalDetailModal } from './ProposalDetailModal';
import { Users, Bell, ShieldCheck, Heart, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const MyDemandsList = () => {
  const { demandPools, followedPools, proposals, userCommitments, userInterests, notifications } = useApp();
  const [selectedPoolId, setSelectedPoolId] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Followed / Created pools (Screen 4)
  const myPools = demandPools.filter((p) => followedPools[p.id]);

  // Committed / Interested proposals (Screen 6)
  const myProposals = proposals.filter((p) => userCommitments[p.id] || userInterests[p.id]);

  return (
    <div className="space-y-6">
      {/* NOTIFICATION BANNER FOR NEW PROPOSALS FROM BTC */}
      {notifications.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 to-indigo-600 rounded-3xl p-4 sm:p-5 text-white shadow-lg space-y-3 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin-slow" />
              <span>Thông báo Đề xuất từ BTC ({notifications.length})</span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Mới nhất</span>
          </div>

          <div className="space-y-2">
            {notifications.slice(0, 2).map((notif) => {
              const targetProp = proposals.find((p) => p.id === notif.proposalId || p.title === notif.proposalTitle);

              return (
                <div
                  key={notif.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                      {notif.title}
                    </h4>
                    <p className="text-xs text-amber-100/90 leading-snug">{notif.message}</p>
                  </div>

                  {targetProp && (
                    <button
                      onClick={() => setSelectedProposal(targetProp)}
                      className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-black shadow-md cursor-pointer shrink-0 flex items-center gap-1"
                    >
                      <span>Xem & Giữ suất</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SCREEN 4: Nhu cầu của tôi */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>Nhu cầu của tôi ({myPools.length})</span>
          </h3>
        </div>

        {myPools.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 text-xs text-slate-500">
            Bạn chưa tạo hoặc theo dõi nhu cầu nào. Hãy bấm nút <strong>[Tạo nhu cầu tham gia]</strong> trên trang Khám phá!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {myPools.map((pool) => (
              <div
                key={pool.id}
                onClick={() => setSelectedPoolId(pool.id)}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                    Đang gom nhu cầu
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {pool.playerCount} người
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Môn {pool.sport} ({pool.skillLevel})
                  </h4>
                  <p className="text-xs text-slate-500">{pool.location} • {pool.preferredTime}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 text-slate-500 font-medium">
                  <span>Tối đa: ≤ {pool.maxBudget?.toLocaleString('vi-VN')}đ</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    Chi tiết <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SCREEN 6: Suất tham gia của tôi */}
      <div className="space-y-3">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Suất tham gia & Đề xuất ({myProposals.length})</span>
        </h3>

        {myProposals.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 text-xs text-slate-500">
            Bạn chưa Giữ suất hoặc Quan tâm giải đề xuất nào.
          </div>
        ) : (
          <div className="space-y-3">
            {myProposals.map((prop) => {
              const commitment = userCommitments[prop.id];
              const isInterested = userInterests[prop.id];

              return (
                <div
                  key={prop.id}
                  onClick={() => setSelectedProposal(prop)}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-indigo-400 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        {prop.sport}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{prop.status}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm">{prop.title}</h4>
                    <p className="text-xs text-slate-500">{prop.exactAddress} • {prop.exactTime}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {commitment && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {commitment.isPaidReserve ? 'Cọc 50k (Dự phòng)' : 'Đã Giữ suất chính'}
                      </span>
                    )}
                    {isInterested && !commitment && (
                      <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        Quan tâm
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedPoolId && (
        <DemandDetailModal
          poolId={selectedPoolId}
          onClose={() => setSelectedPoolId(null)}
          onSelectProposal={(p) => setSelectedProposal(p)}
        />
      )}

      {selectedProposal && (
        <ProposalDetailModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
        />
      )}
    </div>
  );
};
