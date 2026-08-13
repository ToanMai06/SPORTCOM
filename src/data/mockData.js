export const INITIAL_LOCATIONS = [
  "Hai Bà Trưng, Hà Nội",
  "Hoàn Kiếm, Hà Nội",
  "Đống Đa, Hà Nội",
  "Cầu Giấy, Hà Nội",
  "Thanh Xuân, Hà Nội",
  "Nam Từ Liêm, Hà Nội"
];

export const INITIAL_ACTIVITIES = [
  {
    id: "act-1",
    title: "Giải Cầu Lông Mở Rộng Hai Bà Trưng 2026",
    type: "tournament",
    sport: "Cầu lông",
    location: "Hai Bà Trưng, Hà Nội",
    mockDistance: 1.5,
    level: "Phong trào & Trung bình",
    fee: "200.000 VNĐ / Đôi",
    maxParticipants: 16,
    currentParticipants: 10,
    date: "20/08/2026 - 08:00",
    organizer: "BTC Cầu Lông Hai Bà Trưng",
    description: "Giải thi đấu giao lưu cầu lông đôi nam và đôi nam nữ dành cho các tay vợt phong trào khu vực Hai Bà Trưng. Có phần thưởng cúp & huy chương cho Top 3.",
    createdAt: new Date().toISOString()
  },
  {
    id: "act-2",
    title: "CLB Bóng Đá Phủ Doãn tuyển 3 Tiền Vệ",
    type: "club",
    sport: "Bóng đá",
    location: "Hoàn Kiếm, Hà Nội",
    mockDistance: 3.2,
    level: "Khá & Bán chuyên",
    fee: "50.000 VNĐ / Buổi",
    maxParticipants: 5,
    currentParticipants: 2,
    date: "Thứ 3 & Thứ 6 hàng tuần - 19:30",
    organizer: "CLB Bóng Đá Phủ Doãn FC",
    description: "CLB hoạt động định kỳ sân 7 người tại Hoàn Kiếm. Cần tuyển thêm các bạn đá vị trí tiền vệ trung tâm/tiền vệ cánh có thể lực tốt, thi đấu gắn kết.",
    createdAt: new Date().toISOString()
  },
  {
    id: "act-3",
    title: "Giải Tennis Đơn Nam Cầu Giấy Summer Cup",
    type: "tournament",
    sport: "Tennis",
    location: "Cầu Giấy, Hà Nội",
    mockDistance: 6.8,
    level: "Trung bình & Khá",
    fee: "350.000 VNĐ / VĐV",
    maxParticipants: 32,
    currentParticipants: 24,
    date: "25/08/2026 - 14:00",
    organizer: "Hội Tennis Cầu Giấy",
    description: "Giải Tennis đơn nam quy tụ các tay vợt bán chuyên và phong trào. Thi đấu theo thể thức loại trực tiếp 1 set 6 game chạm 6.",
    createdAt: new Date().toISOString()
  },
  {
    id: "act-4",
    title: "CLB Pickleball Đống Đa tuyển thành viên mới",
    type: "club",
    sport: "Pickleball",
    location: "Đống Đa, Hà Nội",
    mockDistance: 2.1,
    level: "Mới chơi & Phong trào",
    fee: "80.000 VNĐ / Buổi",
    maxParticipants: 8,
    currentParticipants: 5,
    date: "Tối Thứ 4 & Chủ Nhật - 18:00",
    organizer: "Pickleball Đống Đa Club",
    description: "Hội Pickleball giao lưu vui vẻ, hỗ trợ hướng dẫn luật cho người mới bắt đầu. Sân bãi hiện đại có đèn chiếu sáng đạt chuẩn.",
    createdAt: new Date().toISOString()
  },
  {
    id: "act-5",
    title: "Giải Bóng Rổ 3x3 Thanh Xuân Open",
    type: "tournament",
    sport: "Bóng rổ",
    location: "Thanh Xuân, Hà Nội",
    mockDistance: 4.5,
    level: "Tất cả trình độ",
    fee: "400.000 VNĐ / Đội",
    maxParticipants: 12,
    currentParticipants: 8,
    date: "30/08/2026 - 09:00",
    organizer: "Youth Basketball Thanh Xuân",
    description: "Giải bóng rổ 3x3 đường phố nhiệt huyết dành cho các bạn trẻ đam mê trái bóng cam. Đăng ký theo đội 3-4 người.",
    createdAt: new Date().toISOString()
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
  },
  {
    id: "reg-102",
    activityId: "act-2",
    activityTitle: "CLB Bóng Đá Phủ Doãn tuyển 3 Tiền Vệ",
    activityType: "club",
    playerName: "Trần Minh Tuấn",
    playerPhone: "0912345678",
    playerNote: "Đã đá tiền vệ 3 năm, thể lực tốt",
    status: "Pending",
    appliedAt: "2026-08-11T14:20:00.000Z"
  }
];
