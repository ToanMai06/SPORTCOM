import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_LOCATIONS,
  INITIAL_ACTIVITIES,
  INITIAL_REGISTRATIONS,
  INITIAL_DEMAND_POOLS,
  INITIAL_PROPOSALS
} from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEY_ACTIVITIES = 'dmst_sports_activities_v3';
const STORAGE_KEY_REGISTRATIONS = 'dmst_sports_registrations_v3';
const STORAGE_KEY_LOCATION = 'dmst_sports_location_v3';
const STORAGE_KEY_ROLE = 'dmst_sports_role_v3';
const STORAGE_KEY_DEMAND_POOLS = 'dmst_sports_demand_pools_v3';
const STORAGE_KEY_PROPOSALS = 'dmst_sports_proposals_v3';
const STORAGE_KEY_USER_COMMITMENTS = 'dmst_sports_user_commitments_v3';
const STORAGE_KEY_USER_INTERESTS = 'dmst_sports_user_interests_v3';
const STORAGE_KEY_FOLLOWED_POOLS = 'dmst_sports_followed_pools_v3';
const STORAGE_KEY_NOTIFICATIONS = 'dmst_sports_notifications_v3';

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

  const [demandPools, setDemandPools] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_DEMAND_POOLS);
    return saved ? JSON.parse(saved) : INITIAL_DEMAND_POOLS;
  });

  const [proposals, setProposals] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROPOSALS);
    return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
  });

  const [userCommitments, setUserCommitments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER_COMMITMENTS);
    return saved ? JSON.parse(saved) : {};
  });

  const [userInterests, setUserInterests] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER_INTERESTS);
    return saved ? JSON.parse(saved) : {};
  });

  const [followedPools, setFollowedPools] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_FOLLOWED_POOLS);
    return saved ? JSON.parse(saved) : {};
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    return saved ? JSON.parse(saved) : [];
  });

  const [playerViewMode, setPlayerViewMode] = useState('discover'); // 'discover' | 'my-demands' | 'my-applications'
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DEMAND_POOLS, JSON.stringify(demandPools));
  }, [demandPools]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROPOSALS, JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER_COMMITMENTS, JSON.stringify(userCommitments));
  }, [userCommitments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER_INTERESTS, JSON.stringify(userInterests));
  }, [userInterests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FOLLOWED_POOLS, JSON.stringify(followedPools));
  }, [followedPools]);

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

  // Flow 1: Add new activity
  const addActivity = (newAct) => {
    const activityObj = {
      ...newAct,
      id: `act-${Date.now()}`,
      mockDistance: parseFloat((Math.random() * 4 + 0.5).toFixed(1)),
      currentParticipants: 0,
      createdAt: new Date().toISOString(),
      status: 'REGISTRATION_OPEN'
    };
    setActivities((prev) => [activityObj, ...prev]);
    showToast(`Đã đăng thành công "${activityObj.title}"!`, 'success');
    return activityObj;
  };

  // Flow 1: Player registration
  const addRegistration = (registrationData) => {
    const newReg = {
      ...registrationData,
      id: `reg-${Date.now()}`,
      status: 'Pending',
      appliedAt: new Date().toISOString()
    };
    setRegistrations((prev) => [newReg, ...prev]);
    showToast('Đăng ký thành công! BTC sẽ liên hệ xác nhận.', 'success');
  };

  const updateRegistrationStatus = (regId, status) => {
    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.id === regId) {
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
    showToast(status === 'Approved' ? 'Đã duyệt đơn đăng ký' : 'Đã từ chối đơn', status === 'Approved' ? 'success' : 'info');
  };

  // --- FLOW 2: DEMAND -> PROPOSAL -> COMMITMENT -> OFFICIAL ACTIVITY ---

  // 1. Create Demand (Player) & Aggregate into Demand Pools
  const createDemand = (newDemand) => {
    const demandSport = newDemand.sport || 'Bi-a';
    const demandLevel = newDemand.skillLevel || 'Trình B';

    let targetPool = demandPools.find((pool) => {
      const sportMatch =
        pool.sport.toLowerCase().includes(demandSport.toLowerCase()) ||
        (pool.sport === 'Bi-a' && demandSport === 'Billiards') ||
        (pool.sport === 'Billiards' && demandSport === 'Bi-a');
      const levelMatch =
        pool.skillLevel.toLowerCase().includes(demandLevel.toLowerCase()) ||
        (pool.skillLevel.includes('B') && demandLevel.includes('B'));
      return sportMatch && levelMatch;
    });

    let updatedPoolId;

    if (targetPool) {
      updatedPoolId = targetPool.id;
      setDemandPools((prev) =>
        prev.map((pool) => {
          if (pool.id === targetPool.id) {
            const newCount = pool.playerCount + 1;
            return {
              ...pool,
              playerCount: newCount,
              demands: [
                ...pool.demands,
                {
                  id: `dem-${Date.now()}`,
                  userName: newDemand.userName || 'Bạn (Current User)',
                  time: newDemand.preferredTime || 'Thứ 7',
                  budget: newDemand.maxBudget || 250000
                }
              ]
            };
          }
          return pool;
        })
      );
      showToast(`Đã gộp nhu cầu của bạn vào nhóm "${targetPool.sport} - ${targetPool.skillLevel}" (${targetPool.playerCount + 1} người)!`, 'success');
    } else {
      const newPool = {
        id: `pool-${Date.now()}`,
        sport: demandSport,
        skillLevel: demandLevel,
        location: newDemand.location || currentLocation,
        radius: newDemand.radius || 5,
        preferredTime: newDemand.preferredTime || 'Thứ 7',
        maxBudget: Number(newDemand.maxBudget) || 250000,
        desiredPlayers: Number(newDemand.desiredPlayers) || 8,
        playerCount: 1,
        status: 'OPEN',
        createdAt: new Date().toISOString(),
        description: `Nhu cầu cho môn ${demandSport} trình độ ${demandLevel}.`,
        demands: [
          {
            id: `dem-${Date.now()}`,
            userName: 'Bạn (Current User)',
            time: newDemand.preferredTime || 'Thứ 7',
            budget: newDemand.maxBudget || 250000
          }
        ]
      };
      updatedPoolId = newPool.id;
      setDemandPools((prev) => [newPool, ...prev]);
      showToast(`Đã tạo nhóm Nhu cầu thành công cho môn ${demandSport}!`, 'success');
    }

    setFollowedPools((prev) => ({ ...prev, [updatedPoolId]: true }));
    return updatedPoolId;
  };

  const toggleFollowPool = (poolId) => {
    setFollowedPools((prev) => {
      const isFollowing = !!prev[poolId];
      const next = { ...prev, [poolId]: !isFollowing };
      showToast(isFollowing ? 'Đã bỏ theo dõi nhu cầu' : 'Đã theo dõi nhu cầu này!', 'info');
      return next;
    });
  };

  // 2. Organizer Creates Proposal from Demand Pool
  const createProposalFromPool = (proposalData) => {
    const minThreshold = Number(proposalData.minThreshold) || 6;
    const initialCommitted = proposalData.initialCommitted !== undefined ? Number(proposalData.initialCommitted) : 5;
    const initialInterested = Number(proposalData.initialInterested) || 8;

    const status = initialCommitted >= minThreshold ? 'THRESHOLD_REACHED' : 'OPEN_FOR_COMMITMENT';

    const newProposal = {
      id: `prop-${Date.now()}`,
      poolId: proposalData.poolId,
      title: proposalData.title || 'Giải Bi-a ABC',
      sport: proposalData.sport || 'Bi-a',
      skillLevel: proposalData.skillLevel || 'Trình B',
      location: proposalData.location || 'Bách Khoa, Hà Nội',
      exactAddress: proposalData.exactAddress || 'CLB Bi-a ABC, 123 Tạ Quang Bửu, Bách Khoa, Hà Nội',
      exactTime: proposalData.exactTime || 'Thứ 7 19:00',
      fee: proposalData.fee || '220.000đ',
      feeAmount: Number(proposalData.feeAmount) || 220000,
      maxCapacity: Number(proposalData.maxCapacity) || 12,
      minThreshold,
      interestedCount: initialInterested,
      primaryCommitments: initialCommitted,
      paidReserve: 0,
      committedCount: initialCommitted,
      status, // Enum: DRAFT, OPEN_FOR_COMMITMENT, THRESHOLD_REACHED, REJECTED, EXPIRED
      organizer: proposalData.organizer || 'BTC Bi-a Bách Khoa',
      createdAt: new Date().toISOString()
    };

    setProposals((prev) => [newProposal, ...prev]);

    // CREATE NOTIFICATION FOR PLAYERS IN THIS DEMAND POOL
    const newNotif = {
      id: `notif-${Date.now()}`,
      poolId: proposalData.poolId,
      proposalId: newProposal.id,
      proposalTitle: newProposal.title,
      sport: newProposal.sport,
      skillLevel: newProposal.skillLevel,
      organizer: newProposal.organizer,
      exactTime: newProposal.exactTime,
      exactAddress: newProposal.exactAddress,
      fee: newProposal.fee,
      title: `🔔 Đề xuất giải đấu mới từ BTC: "${newProposal.title}"`,
      message: `BTC ${newProposal.organizer} đã gửi Đề xuất "${newProposal.title}" (${newProposal.exactTime}) dành cho nhóm Nhu cầu môn ${newProposal.sport} của bạn!`,
      createdAt: new Date().toISOString(),
      read: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Đã công bố Đề xuất & gửi thông báo tới nhóm Nhu cầu "${newProposal.sport}"!`, 'success');
    return newProposal;
  };

  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  // 3. Player Toggles Interest
  const toggleInterest = (proposalId) => {
    const currentlyInterested = !!userInterests[proposalId];
    setUserInterests((prev) => ({ ...prev, [proposalId]: !currentlyInterested }));

    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === proposalId) {
          const updatedInterested = currentlyInterested ? Math.max(0, p.interestedCount - 1) : p.interestedCount + 1;
          return { ...p, interestedCount: updatedInterested };
        }
        return p;
      })
    );

    showToast(currentlyInterested ? 'Đã bỏ quan tâm đề xuất' : 'Đã đánh dấu QUAN TÂM đề xuất!', 'info');
  };

  // 4. Player Toggles Commitment (Giữ Suất)
  const toggleCommitment = (proposalId, isPaidDeposit = false) => {
    const existingCommitment = userCommitments[proposalId];

    if (existingCommitment) {
      setUserCommitments((prev) => {
        const next = { ...prev };
        delete next[proposalId];
        return next;
      });

      setProposals((prev) =>
        prev.map((p) => {
          if (p.id === proposalId) {
            const isPrimary = existingCommitment.isPrimary;
            const newPrimary = isPrimary ? Math.max(0, p.primaryCommitments - 1) : p.primaryCommitments;
            const newPaid = !isPrimary ? Math.max(0, p.paidReserve - 1) : p.paidReserve;
            const totalCommitted = newPrimary + newPaid;
            const newStatus = totalCommitted >= p.minThreshold ? 'THRESHOLD_REACHED' : 'OPEN_FOR_COMMITMENT';

            return {
              ...p,
              primaryCommitments: newPrimary,
              paidReserve: newPaid,
              committedCount: totalCommitted,
              status: p.status === 'REGISTRATION_OPEN' ? 'REGISTRATION_OPEN' : newStatus
            };
          }
          return p;
        })
      );

      showToast('Đã hủy giữ suất.', 'info');
    } else {
      const hasOtherCommitment = Object.keys(userCommitments).length > 0;
      const isSecondary = hasOtherCommitment || isPaidDeposit;

      setUserCommitments((prev) => ({
        ...prev,
        [proposalId]: {
          isPrimary: !isSecondary,
          isPaidReserve: isSecondary,
          paidAmount: isSecondary ? 50000 : 0
        }
      }));

      setProposals((prev) =>
        prev.map((p) => {
          if (p.id === proposalId) {
            const newPrimary = !isSecondary ? p.primaryCommitments + 1 : p.primaryCommitments;
            const newPaid = isSecondary ? p.paidReserve + 1 : p.paidReserve;
            const totalCommitted = newPrimary + newPaid;
            const newStatus = totalCommitted >= p.minThreshold ? 'THRESHOLD_REACHED' : 'OPEN_FOR_COMMITMENT';

            return {
              ...p,
              primaryCommitments: newPrimary,
              paidReserve: newPaid,
              committedCount: totalCommitted,
              status: p.status === 'REGISTRATION_OPEN' ? 'REGISTRATION_OPEN' : newStatus
            };
          }
          return p;
        })
      );

      const msg = isSecondary
        ? 'Đã cọc giữ suất dự phòng (50.000đ)! Đã tính vào số lượng đủ điều kiện mở giải.'
        : 'Đã GIỮ SUẤT thành công! Suất của bạn đã được tính vào Ngưỡng kích hoạt mở giải.';
      showToast(msg, 'success');
    }
  };

  // 5. Organizer Opens Registration (Mở Đăng Ký Chính Thức)
  const openRegistration = (proposalId) => {
    const prop = proposals.find((p) => p.id === proposalId);
    if (!prop) return;

    if (prop.committedCount < prop.minThreshold) {
      showToast(`Chưa đủ số lượng tối thiểu để mở giải (${prop.committedCount}/${prop.minThreshold} người)!`, 'warning');
      return;
    }

    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: 'REGISTRATION_OPEN' } : p))
    );

    const existingAct = activities.find((a) => a.title === prop.title);
    if (!existingAct) {
      const newOfficialActivity = {
        id: `act-official-${Date.now()}`,
        proposalId: prop.id,
        title: prop.title,
        type: 'tournament',
        sport: prop.sport,
        location: prop.location,
        mockDistance: 0.8,
        level: prop.skillLevel,
        fee: prop.fee,
        maxParticipants: prop.maxCapacity,
        currentParticipants: prop.committedCount,
        date: prop.exactTime,
        organizer: prop.organizer,
        description: `Giải thi đấu chính thức được mở từ nhóm Nhu cầu cộng đồng (${prop.committedCount} người đã giữ suất cam kết). Sân bãi: ${prop.exactAddress}`,
        createdAt: new Date().toISOString(),
        status: 'REGISTRATION_OPEN'
      };
      setActivities((prev) => [newOfficialActivity, ...prev]);
    }

    showToast(`🎉 Đã MỞ ĐĂNG KÝ CHÍNH THỨC cho "${prop.title}"! Giải đấu đã hiển thị công khai trên trang Khám phá.`, 'success');
  };

  const resetToMockData = () => {
    setActivities(INITIAL_ACTIVITIES);
    setRegistrations(INITIAL_REGISTRATIONS);
    setDemandPools(INITIAL_DEMAND_POOLS);
    setProposals(INITIAL_PROPOSALS);
    setUserCommitments({});
    setUserInterests({});
    setFollowedPools({});
    setCurrentLocationState(INITIAL_LOCATIONS[0]);

    localStorage.removeItem(STORAGE_KEY_ACTIVITIES);
    localStorage.removeItem(STORAGE_KEY_REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEY_DEMAND_POOLS);
    localStorage.removeItem(STORAGE_KEY_PROPOSALS);
    localStorage.removeItem(STORAGE_KEY_USER_COMMITMENTS);
    localStorage.removeItem(STORAGE_KEY_USER_INTERESTS);
    localStorage.removeItem(STORAGE_KEY_FOLLOWED_POOLS);
    localStorage.removeItem(STORAGE_KEY_LOCATION);

    showToast('Đã khôi phục dữ liệu ban đầu!', 'info');
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

        // Flow 2
        demandPools,
        proposals,
        userCommitments,
        userInterests,
        followedPools,
        notifications,
        setNotifications,
        markNotificationRead,
        playerViewMode,
        setPlayerViewMode,
        createDemand,
        toggleFollowPool,
        createProposalFromPool,
        toggleInterest,
        toggleCommitment,
        openRegistration,

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
