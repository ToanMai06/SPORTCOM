import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { RoleSelector } from './components/RoleSelector';
import { PlayerDashboard } from './components/player/PlayerDashboard';
import { OrganizerDashboard } from './components/organizer/OrganizerDashboard';
import { LocationModal } from './components/LocationModal';
import { ToastNotification } from './components/ToastNotification';
import { Trophy, Heart } from 'lucide-react';

const MainContent = () => {
  const { role } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Header />
        <main className="pb-12">
          {role === 'landing' && <RoleSelector />}
          {role === 'player' && <PlayerDashboard />}
          {role === 'organizer' && <OrganizerDashboard />}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-3xl mx-auto w-full px-4 text-center text-slate-500 text-xs space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-700">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>SPORTCOM MVP — Nền tảng kết nối hoạt động thể thao</span>
          </div>
          <p className="text-slate-400">
            Mô hình thử nghiệm: BTC đăng hoạt động → Người chơi quanh khu vực phát hiện & tham gia.
          </p>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <LocationModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
