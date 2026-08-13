import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Check, Navigation, X } from 'lucide-react';

export const LocationModal = () => {
  const { locations, currentLocation, setCurrentLocation, showLocationModal, setShowLocationModal } = useApp();

  if (!showLocationModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Chọn khu vực của bạn</h2>
              <p className="text-xs text-slate-500 font-medium">Tìm giải đấu & CLB ở vị trí gần bạn nhất</p>
            </div>
          </div>
          <button
            onClick={() => setShowLocationModal(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Selection Buttons */}
        <div className="space-y-3">
          {locations.map((loc) => {
            const isSelected = currentLocation === loc;
            return (
              <button
                key={loc}
                onClick={() => setCurrentLocation(loc)}
                className={`w-full flex items-center gap-3 p-4 justify-between rounded-2xl border text-left font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-500 text-emerald-900 shadow-sm ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold">{loc}</span>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Hệ thống tự động tính khoảng cách các hoạt động tới khu vực này
          </p>
        </div>
      </div>
    </div>
  );
};
