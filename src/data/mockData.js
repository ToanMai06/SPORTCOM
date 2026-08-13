export const INITIAL_LOCATIONS = [
  "Bách Khoa, Hà Nội",
  "Hai Bà Trưng, Hà Nội",
  "Hoàn Kiếm, Hà Nội",
  "Đống Đa, Hà Nội",
  "Cầu Giấy, Hà Nội",
  "Thanh Xuân, Hà Nội"
];

export const SPORTS_LIST = [
  'Tất cả',
  'Bi-a',
  'Bóng đá',
  'Cầu lông',
  'Tennis',
  'Pickleball',
  'Bóng rổ'
];

export const LEVEL_OPTIONS = [
  'Tất cả trình độ',
  'Phong trào',
  'Trung bình',
  'Trình B',
  'Khá',
  'Bán chuyên'
];

export const INITIAL_ACTIVITIES = [
  {
    id: "act-1",
    title: "Giải Cầu Lông Mở Rộng Hai Bà Trưng 2026",
    type: "tournament",
    sport: "Cầu lông",
    location: "Hai Bà Trưng, Hà Nội",
    mockDistance: 1.5,
    level: "Phong trào",
    fee: "200.000 VNĐ / Đôi",
    maxParticipants: 16,
    currentParticipants: 10,
    date: "20/08/2026 - 08:00",
    organizer: "BTC Cầu Lông Hai Bà Trưng",
    description: "Giải thi đấu giao lưu cầu lông đôi nam và đôi nam nữ dành cho các tay vợt phong trào khu vực Hai Bà Trưng. Có phần thưởng cúp & huy chương cho Top 3.",
    createdAt: new Date().toISOString(),
    status: "REGISTRATION_OPEN"
  },
  {
    id: "act-2",
    title: "CLB Bóng Đá Phủ Doãn tuyển 3 Tiền Vệ",
    type: "club",
    sport: "Bóng đá",
    location: "Hoàn Kiếm, Hà Nội",
    mockDistance: 3.2,
    level: "Khá",
    fee: "50.000 VNĐ / Buổi",
    maxParticipants: 5,
    currentParticipants: 2,
    date: "Thứ 3 & Thứ 6 hàng tuần - 19:30",
    organizer: "CLB Bóng Đá Phủ Doãn FC",
    description: "CLB hoạt động định kỳ sân 7 người tại Hoàn Kiếm. Cần tuyển thêm các bạn đá vị trí tiền vệ trung tâm/tiền vệ cánh có thể lực tốt, thi đấu gắn kết.",
    createdAt: new Date().toISOString(),
    status: "REGISTRATION_OPEN"
  },
  {
    id: "act-3",
    title: "Giải Tennis Đơn Nam Cầu Giấy Summer Cup",
    type: "tournament",
    sport: "Tennis",
    location: "Cầu Giấy, Hà Nội",
    mockDistance: 6.8,
    level: "Khá",
    fee: "350.000 VNĐ / VĐV",
    maxParticipants: 32,
    currentParticipants: 24,
    date: "25/08/2026 - 14:00",
    organizer: "Hội Tennis Cầu Giấy",
    description: "Giải Tennis đơn nam quy tụ các tay vợt bán chuyên và phong trào. Thi đấu theo thể thức loại trực tiếp 1 set 6 game chạm 6.",
    createdAt: new Date().toISOString(),
    status: "REGISTRATION_OPEN"
  },
  {
    id: "act-4",
    title: "CLB Pickleball Đống Đa tuyển thành viên mới",
    type: "club",
    sport: "Pickleball",
    location: "Đống Đa, Hà Nội",
    mockDistance: 2.1,
    level: "Phong trào",
    fee: "80.000 VNĐ / Buổi",
    maxParticipants: 8,
    currentParticipants: 5,
    date: "Tối Thứ 4 & Chủ Nhật - 18:00",
    organizer: "Pickleball Đống Đa Club",
    description: "Hội Pickleball giao lưu vui vẻ, hỗ trợ hướng dẫn luật cho người mới bắt đầu. Sân bãi hiện đại có đèn chiếu sáng đạt chuẩn.",
    createdAt: new Date().toISOString(),
    status: "REGISTRATION_OPEN"
  }
];

export const INITIAL_REGISTRATIONS = [
  {
    id: "reg-101",
    activityId: "act-1",
    activityTitle: "Giải Cầu Lông Mở Rộng Hai Bà Trưng 2026",
    activityType: "tournament",
    playerName: "Nguyễn Văn Hùng",
    playerPhone: "0987654321",
    playerNote: "Đăng ký đôi nam trình độ Trung bình khá",
    status: "Approved",
    appliedAt: "2026-08-10T10:15:00.000Z"
  }
];

// Initial Demand Pools for Aggregation Logic & Demo Workflow
export const INITIAL_DEMAND_POOLS = [
  {
    id: "pool-bia-b",
    sport: "Bi-a",
    skillLevel: "Trình B",
    location: "Bách Khoa, Hà Nội",
    radius: 5,
    preferredTime: "Thứ 7",
    maxBudget: 250000,
    desiredPlayers: 8,
    playerCount: 7, // 7 players currently aggregated; user submitting demand brings total to 8!
    status: "OPEN", // Enum: OPEN, FULL, EXPIRED
    createdAt: "2026-08-12T14:00:00.000Z",
    description: "Nhu cầu gom nhóm thi đấu & giao lưu Bi-a Trình B khu vực Bách Khoa, chiều Thứ 7.",
    demands: [
      { id: "dem-1", userName: "Hoàng Anh", time: "Thứ 7", budget: 250000 },
      { id: "dem-2", userName: "Minh Đức", time: "Thứ 7", budget: 200000 },
      { id: "dem-3", userName: "Quốc Bảo", time: "Thứ 7", budget: 250000 },
      { id: "dem-4", userName: "Tuấn Kiệt", time: "Thứ 7", budget: 220000 },
      { id: "dem-5", userName: "Hữu Hải", time: "Thứ 7", budget: 250000 },
      { id: "dem-6", userName: "Thành Nam", time: "Thứ 7", budget: 240000 },
      { id: "dem-7", userName: "Việt Dũng", time: "Thứ 7", budget: 250000 }
    ]
  },
  {
    id: "pool-tennis-kha",
    sport: "Tennis",
    skillLevel: "Khá",
    location: "Cầu Giấy, Hà Nội",
    radius: 5,
    preferredTime: "Chủ Nhật",
    maxBudget: 300000,
    desiredPlayers: 12,
    playerCount: 5,
    status: "OPEN",
    createdAt: "2026-08-11T09:30:00.000Z",
    description: "Cần gom 12 VĐV trình độ Khá để tổ chức giải đấu giao lưu Tennis mini.",
    demands: [
      { id: "dem-10", userName: "Phan Thanh", time: "Chủ Nhật", budget: 300000 },
      { id: "dem-11", userName: "Lê Cường", time: "Chủ Nhật", budget: 300000 }
    ]
  }
];

// Initial Proposals
export const INITIAL_PROPOSALS = [];
