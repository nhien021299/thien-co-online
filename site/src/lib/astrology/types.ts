export type CungKey =
  | "menh" | "phuMau" | "phucDuc" | "dienTrach"
  | "quanLoc" | "noBoc" | "thienDi" | "tatAch"
  | "taiBach" | "tuTuc" | "phuThe" | "huynhDe";

export type StarType = "main" | "cat" | "hung" | "sat" | "daoHoa" | "other" | "hoa";

export type StarDetail = {
  name: string;
  type: StarType;
  brightness?: string;
  mutagen?: string; // Tứ hóa: Lộc, Quyền, Khoa, Kỵ
  element?: string; // Kim, Mộc, Thủy, Hỏa, Thổ
  side?: "left" | "right"; // Vị trí cột: Cát -> trái, Hung -> phải
};

export type CungData = {
  key: CungKey;
  label: string;       // Tên cung: Mệnh, Phụ Mẫu...
  branch: string;      // Địa chi: Tý, Sửu, Dần...
  mainStars: StarDetail[];  // Chính tinh chi tiết
  minorStars: StarDetail[]; // Phụ tinh chi tiết
  luuStars: string[];       // Danh sách các sao lưu (Thế, Lộc...)
  ageRange: string;         // Đại vận: "4-13"
  tieuVan: string;          // Địa chi tiểu vận (Tý, Sửu...)
  trangSinh: string;        // Vòng Tràng Sinh (Trường Sinh, Mộc Dục...)
  isThan: boolean;          // Cung Thân đóng tại đây?
  isTriet: boolean;         // Có Triệt?
  isTuan: boolean;          // Có Tuần?
  isVoChinhDieu: boolean;   // Vô chính diệu?
  
  // Quan hệ cung
  tamHop: string[];         // Các cung labels tam hợp
  xungChieu: string;        // Cung label xung chiếu
  nhiHop: string;           // Cung label nhị hợp
};

export type CenterInfo = {
  fullName: string;
  gender: string;
  solarBirthday: string;
  lunarBirthday: string;
  canChiYear: string;
  menhNguHanh: string;
  cucName: string;
  hourBranch: string;
  quote: string;
  thanCung: string;         // Tên cung Thân (VD: Quan Lộc)
  sinhKhacNote: string;     // Ghi chú sinh khắc: Mệnh sinh Cục, Cục khắc Mệnh...
  menhChu: string;          // Sao bản mệnh chủ
  thanChu: string;          // Sao thân chủ
};

export type ChartData = {
  center: CenterInfo;
  cungs: CungData[];   // Luôn đúng 12 phần tử, thứ tự theo địa chi cố định
};

export type ReadingContent = {
  stars: string[];
  content: string;
};

export type ReadingResult = {
  chart: ChartData;
  readings: {
    [key in CungKey]: ReadingContent;
  };
  summary: {
    general: string;
    career: string;
    love: string;
  };
};
