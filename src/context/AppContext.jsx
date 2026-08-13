import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LOCATIONS, INITIAL_ACTIVITIES, INITIAL_REGISTRATIONS } from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEY_ACTIVITIES = 'dmst_sports_activities_v1';
const STORAGE_KEY_REGISTRATIONS = 'dmst_sports_registrations_v1';
const STORAGE_KEY_LOCATION = 'dmst_sports_location_v1';
const STORAGE_KEY_ROLE = 'dmst_sports_role_v1';

export const AppProvider = ({ children }) => {
  // Global states with localStorage persistence
  const [role, setRoleState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_ROLE) || 'landing';
  });

  const [currentLocation, setCurrentLocationState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_LOCATION) || INITIAL_LOCATIONS[0];
  });

  const [locations] = useState(INITIAL_LOCATIONS);

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [showLocationModal, setShowLocationModal] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOCATION, currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROLE, role);
  }, [role]);

  const setRole = (newRole) => {
    setRoleState(newRole);
    if (newRole === 'player' && !currentLocation) {
      setShowLocationModal(true);
    }
  };

  const setCurrentLocation = (loc) => {
    setCurrentLocationState(loc);
    setShowLocationModal(false);
    showToast(`Đã chuyển khu vực sang ${loc}`, 'info');
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  // Add new activity from Organizer Form
  const addActivity = (newAct) => {
    const activityObj = {
      ...newAct,
      id: `act-${Date.now()}`,
      mockDistance: parseFloat((Math.random() * 8 + 0.5).toFixed(1)), // random distance 0.5km - 8.5km
      currentParticipants: 0,
      createdAt: new Date().toISOString()
    };
    setActivities((prev) => [activityObj, ...prev]);
    showToast(`Đã đăng thành công "${activityObj.title}"!`, 'success');
    return activityObj;
  };

  // Player applies/registers for an activity
  const addRegistration = (registrationData) => {
    const newReg = {
      ...registrationData,
      id: `reg-${Date.now()}`,
      status: 'Pending',
      appliedAt: new Date().toISOString()
    };
    setRegistrations((prev) => [newReg, ...prev]);

    // Toast message based on type
    const toastMsg = registrationData.activityType === 'tournament'
      ? 'Đăng ký thành công! BTC sẽ liên hệ xác nhận.'
      : 'Đã gửi yêu cầu tham gia! CLB sẽ phản hồi sớm.';

    showToast(toastMsg, 'success');
  };

  // Organizer approves or rejects registration
  const updateRegistrationStatus = (regId, status) => {
    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.id === regId) {
          // If approving for the first time, increment participants count in activity
          if (status === 'Approved' && reg.status !== 'Approved') {
            setActivities((acts) =>
              acts.map((act) =>
                act.id === reg.activityId
                  ? { ...act, currentParticipants: Math.min(act.maxParticipants, act.currentParticipants + 1) }
                  : act
              )
            );
          }
          return { ...reg, status };
        }
        return reg;
      })
    );

    const actionText = status === 'Approved' ? 'Đã duyệt đơn đăng ký' : 'Đã từ chối đơn';
    showToast(actionText, status === 'Approved' ? 'success' : 'info');
  };

  // Reset to initial mock data (Convenience helper for testing)
  const resetToMockData = () => {
    setActivities(INITIAL_ACTIVITIES);
    setRegistrations(INITIAL_REGISTRATIONS);
    setCurrentLocationState(INITIAL_LOCATIONS[0]);
    localStorage.removeItem(STORAGE_KEY_ACTIVITIES);
    localStorage.removeItem(STORAGE_KEY_REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEY_LOCATION);
    showToast('Đã khôi phục dữ liệu thử nghiệm ban đầu!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentLocation,
        setCurrentLocation,
        locations,
        activities,
        registrations,
        addActivity,
        addRegistration,
        updateRegistrationStatus,
        showLocationModal,
        setShowLocationModal,
        toast,
        showToast,
        resetToMockData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
