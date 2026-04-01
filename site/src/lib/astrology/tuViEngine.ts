/**
 * tuViEngine.ts - Adapter module chuyển đổi output iztro → ChartData app
 * 
 * FULL HARDCORE VERSION - chuẩn Altuvi style
 */
import { astro } from 'iztro';
import type { CungKey, CungData, ChartData, StarDetail, StarType } from './types';

// ===== CONSTANTS =====
const PALACE_KEY_MAP: Record<string, string> = {
  '命宫':'menh','父母':'phuMau','福德':'phucDuc','田宅':'dienTrach',
  '官禄':'quanLoc','仆役':'noBoc','迁移':'thienDi','疾厄':'tatAch',
  '财帛':'taiBach','子女':'tuTuc','夫妻':'phuThe','兄弟':'huynhDe',
};

export const PALACE_LABEL_MAP: Record<string, string> = {
  '命宫':'Mệnh','父母':'Phụ Mẫu','福德':'Phúc Đức','田宅':'Điền Trạch',
  '官禄':'Quan Lộc','仆役':'Nô Bộc','迁移':'Thiên Di','疾厄':'Tật Ách',
  '财帛':'Tài Bạch','子女':'Tử Tức','夫妻':'Phu Thê','兄弟':'Huynh Đệ',
};

const BRANCH_LIST = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

const BRANCH_MAP: Record<string, string> = {
  '子':'Tý','丑':'Sửu','寅':'Dần','卯':'Mão','辰':'Thìn','巳':'Tỵ',
  '午':'Ngọ','未':'Mùi','申':'Thân','酉':'Dậu','戌':'Tuất','亥':'Hợi'
};

const STEM_MAP: Record<string, string> = {
  '甲':'Giáp','乙':'Ất','丙':'Bính','丁':'Đinh','戊':'Mậu',
  '己':'Kỷ','庚':'Canh','辛':'Tân','壬':'Nhâm','癸':'Quý'
};

const BRIGHTNESS_MAP: Record<string, string> = {
  '庙':'M','旺':'V','得':'Đ','利':'B','平':'B','陷':'H','不':'H'
};

const MUTAGEN_MAP: Record<string, string> = {
  '禄':'Hóa Lộc','权':'Hóa Quyền','科':'Hóa Khoa','忌':'Hóa Kỵ'
};

const CAT = ['左辅','右弼','文昌','文曲','天魁','天钺','禄存','天马','天喜','红鸾'];
const SAT = ['擎羊','陀罗','火星','铃星','地空','地劫','天刑'];
const DAO = ['桃花','红鸾','天喜','天姚'];

const THAI_TUE_MAP: Record<string, string> = {
  '岁建': 'Thái Tuế', '晦气': 'Thiếu Dương', '丧门': 'Tang Môn', '贯索': 'Thiếu Âm',
  '官符': 'Quan Phù', '小耗': 'Tử Phù', '大耗': 'Tuế Phá', '龙德': 'Long Đức',
  '白虎': 'Bạch Hổ', '天德': 'Phúc Đức', '吊客': 'Điếu Khách', '病符': 'Trực Phù'
};

const CUC_MAP: Record<string, string> = {
  '水二局': 'Thủy Nhị Cục', '木三局': 'Mộc Tam Cục', '金四局': 'Kim Tứ Cục', '土五局': 'Thổ Ngũ Cục', '火六局': 'Hỏa Lục Cục'
};

// Translate all from before + missing ones from iztro output in Altuvi
const STAR_NAME_MAP: Record<string, string> = {
  '紫微':'Tử Vi','天机':'Thiên Cơ','太阳':'Thái Dương','武曲':'Vũ Khúc',
  '天同':'Thiên Đồng','廉贞':'Liêm Trinh','天府':'Thiên Phủ','太阴':'Thái Âm',
  '贪狼':'Tham Lang','巨门':'Cự Môn','天相':'Thiên Tướng','天梁':'Thiên Lương',
  '七杀':'Thất Sát','破军':'Phá Quân',
  '左辅':'Tả Phù','右弼':'Hữu Bật','文昌':'Văn Xương','文曲':'Văn Khúc','天魁':'Thiên Khôi','天钺':'Thiên Việt',
  '擎羊':'Kình Dương','陀罗':'Đà La','火星':'Hỏa Tinh','铃星':'Linh Tinh','地空':'Địa Không','地劫':'Địa Kiếp',
  '禄存':'Lộc Tồn','天马':'Thiên Mã','太岁':'Thái Tuế','少阳':'Thiếu Dương','丧门':'Tang Môn','少阴':'Thiếu Âm','官符':'Quan Phù','死符':'Tử Phù','岁破':'Tuế Phá','龙德':'Long Đức','白虎':'Bạch Hổ','福德':'Phúc Đức','吊客':'Điếu Khách','直符':'Trực Phù',
  '博士':'Bác Sỹ','力士':'Lực Sĩ','青龙':'Thanh Long','小耗':'Tiểu Hao','将军':'Tướng Quân','奏书':'Tấu Thư','飞廉':'Phi Liêm','喜神':'Hỷ Thần','病符':'Bệnh Phù','大耗':'Đại Hao','伏兵':'Phục Binh','官府':'Quan Phủ',
  '天刑':'Thiên Hình','天姚':'Thiên Diêu','天喜':'Thiên Hỷ','红鸾':'Hồng Loan','咸池':'Đào Hoa','桃花':'Đào Hoa','孤辰':'Cô Thần','寡宿':'Quả Tú','天哭':'Thiên Khốc','天虚':'Thiên Hư','龙池':'Long Trì','凤阁':'Phượng Các','天福':'Thiên Phúc','天官':'Thiên Quan','天寿':'Thiên Thọ','天才':'Thiên Tài','天月':'Thiên Nguyệt','台辅':'Thai Phụ','封诰':'Phong Cáo','恩光':'Ân Quang','天贵':'Thiên Quý','三台':'Tam Thai','八座':'Bát Tọa','解神':'Giải Thần (TQ)','华盖':'Hoa Cái','天空':'Thiên Không','截路':'Triệt','旬空':'Tuần','破碎':'Phá Toái','劫煞':'Kiếp Sát','流霞':'Lưu Hà','堂符':'Đường Phù','国印':'Quốc Ấn','截空':'Triệt',
  '长生':'Trường Sinh','沐浴':'Mộc Dục','冠带':'Quan Đới','临官':'Lâm Quan','帝旺':'Đế Vượng','衰':'Suy','病':'Bệnh','死':'Tử','墓':'Mộ','绝':'Tuyệt','胎':'Thai','养':'Dưỡng',
  '岁驿':'Tuế Mã','息神':'Tức Thần','灾煞':'Tai Sát','天煞':'Thiên Sát','指背':'Chỉ Bối','月煞':'Nguyệt Sát','亡神':'Vong Thần','晦气':'Hối Khí','贯索':'Quán Sách','天德':'Thiên Đức',
  '天巫':'Thiên Vu','阴煞':'Âm Sát','天使':'Thiên Sứ','天伤':'Thiên Thương','地解':'Địa Giải','天解':'Thiên Giải','月德':'Nguyệt Đức',
  '天厨':'Thiên Trù','天医':'Thiên Y','年解':'Giải Thần','空亡':'Không Vong','蜚廉':'Phi Liêm'
};

const NGU_HANH_MAP: Record<string, string> = {
  'Tử Vi': 'Thổ', 'Thiên Cơ': 'Mộc', 'Thái Dương': 'Hỏa', 'Vũ Khúc': 'Kim', 'Thiên Đồng': 'Thủy', 'Liêm Trinh': 'Hỏa', 'Thiên Phủ': 'Thổ', 'Thái Âm': 'Thủy', 'Tham Lang': 'Mộc', 'Cự Môn': 'Thủy', 'Thiên Tướng': 'Thủy', 'Thiên Lương': 'Thổ', 'Thất Sát': 'Kim', 'Phá Quân': 'Thủy',
  'Kình Dương': 'Kim', 'Đà La': 'Kim', 'Hỏa Tinh': 'Hỏa', 'Linh Tinh': 'Hỏa', 'Địa Không': 'Hỏa', 'Địa Kiếp': 'Hỏa',
  'Tả Phù': 'Thổ', 'Hữu Bật': 'Thổ', 'Văn Xương': 'Kim', 'Văn Khúc': 'Thủy', 'Thiên Khôi': 'Hỏa', 'Thiên Việt': 'Hỏa',
  'Hóa Lộc': 'Mộc', 'Hóa Quyền': 'Mộc', 'Hóa Khoa': 'Mộc', 'Hóa Kỵ': 'Thủy', 'Lộc Tồn': 'Thổ', 'Bác Sỹ': 'Thủy', 'Lực Sĩ': 'Hỏa', 'Thanh Long': 'Thủy', 'Tiểu Hao': 'Hỏa', 'Tướng Quân': 'Mộc', 'Tấu Thư': 'Kim', 'Phi Liêm': 'Hỏa', 'Hỷ Thần': 'Hỏa', 'Bệnh Phù': 'Mộc', 'Đại Hao': 'Hỏa', 'Phục Binh': 'Hỏa', 'Quan Phủ': 'Hỏa',
  'Thái Tuế': 'Hỏa', 'Thiếu Dương': 'Hỏa', 'Tang Môn': 'Mộc', 'Thiếu Âm': 'Thủy', 'Quan Phù': 'Hỏa', 'Tử Phù': 'Kim', 'Tuế Phá': 'Hỏa', 'Long Đức': 'Thủy', 'Bạch Hổ': 'Kim', 'Phúc Đức': 'Thổ', 'Điếu Khách': 'Hỏa', 'Trực Phù': 'Hỏa',
  'Trường Sinh': 'Thủy', 'Mộc Dục': 'Thủy', 'Quan Đới': 'Kim', 'Lâm Quan': 'Kim', 'Đế Vượng': 'Kim', 'Suy': 'Thủy', 'Bệnh': 'Thủy', 'Tử': 'Thủy', 'Mộ': 'Thổ', 'Tuyệt': 'Thổ', 'Thai': 'Thổ', 'Dưỡng': 'Mộc',
  'Thiên Mã': 'Hỏa', 'Đào Hoa': 'Mộc', 'Hồng Loan': 'Thủy', 'Thiên Hỷ': 'Thủy', 'Thiên Diêu': 'Thủy', 'Thiên Hình': 'Hỏa', 'Thiên Khốc': 'Thủy', 'Thiên Hư': 'Thủy', 'Cô Thần': 'Thổ', 'Quả Tú': 'Thổ', 'Giải Thần': 'Mộc', 'Thiên Giải': 'Mộc', 'Địa Giải': 'Thổ',
  'Thiên Phượng': 'Thủy', 'Long Trì': 'Thủy', 'Phượng Các': 'Mộc', 'Đẩu Quân': 'Hỏa', 'Thiên Tài': 'Mộc', 'Thiên Thọ': 'Thổ', 'Ân Quang': 'Mộc', 'Thiên Quý': 'Thổ', 'Tam Thai': 'Mộc', 'Bát Tọa': 'Mộc', 'Thai Phụ': 'Kim', 'Phong Cáo': 'Thổ',
  'Thiên La': 'Thổ', 'Địa Võng': 'Thổ', 'Lưu Hà': 'Thủy', 'Quốc Ấn': 'Thổ', 'Đường Phù': 'Mộc', 'Tuần': 'Hỏa', 'Triệt': 'Kim', 'Kiếp Sát': 'Hỏa', 'Thiên Trù': 'Thổ', 'Thiên Sứ': 'Thủy', 'Thiên Thương': 'Thủy', 'Thiên Y': 'Thủy', 'Thiên Quan': 'Mộc', 'Thiên Phúc': 'Mộc', 'Hoa Cái': 'Kim', 'Nguyệt Đức': 'Hỏa', 'Thiên Đức': 'Hỏa',
  'Phá Toái': 'Hỏa', 'Thiên Không': 'Hỏa', 'Giải Thần (TQ)': 'Mộc', 'Không Vong': 'Thủy'
};



const RIGHT_SIDE_STARS = new Set([
  'Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp', 'Thiên Hình', 'Thiên Diêu', 'Hóa Kỵ',
  'Đại Hao', 'Tiểu Hao', 'Tang Môn', 'Bạch Hổ', 'Điếu Khách', 'Tuế Phá', 'Thiên Khốc', 'Thiên Hư', 'Cô Thần', 'Quả Tú',
  'Thiên La', 'Địa Võng', 'Phá Toái', 'Kiếp Sát', 'Lưu Hà', 'Thiên Thương', 'Thiên Sứ', 'Tử Phù', 'Bệnh Phù', 'Phục Binh',
  'Thiếu Âm', 'Thiếu Dương', 'Trực Phù', 'Quan Phủ', 'Quan Phù', 'Thái Tuế', 'Tuần', 'Triệt', 'Đẩu Quân', 'Âm Sát',
  'Tai Sát', 'Thiên Sát', 'Chỉ Bối', 'Nguyệt Sát', 'Vong Thần', 'Hối Khí', 'Quán Sách', 'Đà La (H)', 'Kình Dương (Đ)', 'Phi Liêm'
]);


const NAP_AM_MAP: Record<string, string> = {
  '甲子': 'Hải Trung Kim', '乙丑': 'Hải Trung Kim', '丙寅': 'Lư Trung Hỏa', '丁卯': 'Lư Trung Hỏa',
  '戊辰': 'Đại Lâm Mộc', '己巳': 'Đại Lâm Mộc', '庚午': 'Lộ Bàng Thổ', '辛未': 'Lộ Bàng Thổ',
  '壬申': 'Kiếm Phong Kim', '癸酉': 'Kiếm Phong Kim', '甲戌': 'Sơn Đầu Hỏa', '乙亥': 'Sơn Đầu Hỏa',
  '丙子': 'Giản Hạ Thủy', '丁丑': 'Giản Hạ Thủy', '戊寅': 'Thành Đầu Thổ', '己卯': 'Thành Đầu Thổ',
  '庚辰': 'Bạch Lạp Kim', '辛巳': 'Bạch Lạp Kim', '壬午': 'Dương Liễu Mộc', '癸未': 'Dương Liễu Mộc',
  '甲申': 'Tuyền Trung Thủy', '乙酉': 'Tuyền Trung Thủy', '丙戌': 'Ốc Thượng Thổ', '丁亥': 'Ốc Thượng Thổ',
  '戊子': 'Tích Lịch Hỏa', '己丑': 'Tích Lịch Hỏa', '庚寅': 'Tùng Bách Mộc', '辛卯': 'Tùng Bách Mộc',
  '壬辰': 'Trường Lưu Thủy', '癸巳': 'Trường Lưu Thủy', '甲午': 'Sa Trung Kim', '乙未': 'Sa Trung Kim',
  '丙申': 'Sơn Hạ Hỏa', '丁酉': 'Sơn Hạ Hỏa', '戊戌': 'Bình Địa Mộc', '己亥': 'Bình Địa Mộc',
  '庚子': 'Bích Thượng Thổ', '辛丑': 'Bích Thượng Thổ', '壬寅': 'Kim Bạch Kim', '癸卯': 'Kim Bạch Kim',
  '甲辰': 'Phú Đăng Hỏa', '乙巳': 'Phú Đăng Hỏa', '丙午': 'Thiên Hà Thủy', '丁未': 'Thiên Hà Thủy',
  '戊申': 'Đại Trạch Thổ', '己酉': 'Đại Trạch Thổ', '庚戌': 'Thoa Xuyến Kim', '辛亥': 'Thoa Xuyến Kim',
  '壬子': 'Tang Đố Mộc', '癸丑': 'Tang Đố Mộc', '甲寅': 'Đại Khê Thủy', '乙卯': 'Đại Khê Thủy',
  '丙辰': 'Sa Trung Thổ', '丁巳': 'Sa Trung Thổ', '戊午': 'Thiên Thượng Hỏa', '己未': 'Thiên Thượng Hỏa',
  '庚申': 'Thạch Lựu Mộc', '辛酉': 'Thạch Lựu Mộc', '壬戌': 'Đại Hải Thủy', '癸亥': 'Đại Hải Thủy'
};

function getElement(str: string): string {
  if (str.includes('Kim')) return 'Kim';
  if (str.includes('Mộc')) return 'Mộc';
  if (str.includes('Thủy')) return 'Thủy';
  if (str.includes('Hỏa')) return 'Hỏa';
  if (str.includes('Thổ')) return 'Thổ';
  return '';
}

function checkSinhKhac(menh: string, cuc: string): string {
  const m = getElement(menh);
  const c = getElement(cuc);
  if (!m || !c) return 'Bình hòa';
  if (m === c) return 'Bản Mệnh Bình hòa Cục';
  const sinh: any = { 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy' };
  const khac: any = { 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy' };
  if (sinh[m] === c) return 'Bản Mệnh sinh Cục (vất vả)';
  if (sinh[c] === m) return 'Cục sinh Bản Mệnh (thuận lợi)';
  if (khac[m] === c) return 'Bản Mệnh khắc Cục';
  if (khac[c] === m) return 'Cục khắc Bản Mệnh (vất vả)';
  return 'Bản Mệnh và Cục tương khắc';
}

const VN_BRIGHTNESS_MAP: Record<string, string[]> = {
  // Tý=0, Sửu=1, Dần=2, Mão=3, Thìn=4, Tỵ=5, Ngọ=6, Mùi=7, Thân=8, Dậu=9, Tuất=10, Hợi=11
  'Tử Vi':      ['B', 'Đ', 'M', 'B', 'Đ', 'M', 'M', 'Đ', 'M', 'B', 'Đ', 'B'],
  'Thiên Cơ':   ['Đ', 'Đ', 'Đ', 'Đ', 'B', 'B', 'M', 'Đ', 'Đ', 'V', 'B', 'B'],
  'Thái Dương': ['H', 'H', 'V', 'M', 'V', 'M', 'M', 'Đ', 'B', 'H', 'H', 'H'],
  'Vũ Khúc':    ['V', 'M', 'B', 'H', 'M', 'B', 'V', 'M', 'B', 'H', 'M', 'B'],
  'Thiên Đồng': ['V', 'H', 'H', 'Đ', 'H', 'H', 'H', 'H', 'V', 'H', 'H', 'M'],
  'Liêm Trinh': ['B', 'Đ', 'M', 'H', 'Đ', 'H', 'B', 'Đ', 'M', 'H', 'Đ', 'H'],
  'Thiên Phủ':  ['M', 'M', 'M', 'B', 'M', 'Đ', 'M', 'M', 'M', 'B', 'M', 'Đ'],
  'Thái Âm':    ['M', 'M', 'V', 'H', 'H', 'H', 'H', 'H', 'Đ', 'M', 'M', 'M'],
  'Tham Lang':  ['V', 'M', 'B', 'H', 'M', 'H', 'V', 'M', 'B', 'H', 'M', 'H'],
  'Cự Môn':     ['V', 'H', 'M', 'M', 'H', 'H', 'V', 'H', 'M', 'M', 'H', 'M'],
  'Thiên Tướng':['V', 'M', 'M', 'H', 'V', 'Đ', 'V', 'M', 'M', 'H', 'V', 'Đ'],
  'Thiên Lương':['M', 'Đ', 'M', 'M', 'M', 'H', 'M', 'Đ', 'M', 'H', 'M', 'H'],
  'Thất Sát':   ['M', 'M', 'M', 'H', 'Đ', 'B', 'M', 'M', 'M', 'H', 'Đ', 'B'],
  'Phá Quân':   ['M', 'V', 'H', 'H', 'V', 'H', 'M', 'V', 'H', 'H', 'V', 'H'],
  // Phụ tinh
  'Kình Dương': ['H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H'],
  'Đà La':      ['H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H'],
  'Địa Không':  ['H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ'],
  'Địa Kiếp':   ['H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ'],
  'Văn Xương':  ['H', 'Đ', 'H', 'H', 'Đ', 'Đ', 'H', 'Đ', 'H', 'H', 'Đ', 'Đ'],
  'Văn Khúc':   ['H', 'Đ', 'H', 'H', 'Đ', 'Đ', 'H', 'Đ', 'H', 'H', 'Đ', 'Đ'],
  'Hỏa Tinh':   ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], // Mặc định nhiều trường phái Hãm
  'Linh Tinh':  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  'Bạch Hổ':    ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'Đ', 'Đ', 'H', 'H'],
  'Tang Môn':   ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'Đ', 'Đ', 'H', 'H'],
  'Đại Hao':    ['H', 'H', 'Đ', 'Đ', 'H', 'H', 'H', 'H', 'Đ', 'Đ', 'H', 'H'],
  'Tiểu Hao':   ['H', 'H', 'Đ', 'Đ', 'H', 'H', 'H', 'H', 'Đ', 'Đ', 'H', 'H'],
  'Thiên Khốc': ['Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H'],
  'Thiên Hư':   ['Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H'],
  'Hóa Kỵ':     ['H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H', 'H', 'Đ', 'H']
};

function mapStar(name: string, isMain: boolean, branchIdx: number, brightnessLiteral?: string, mutagenLiteral?: string): StarDetail {
  const vietName = STAR_NAME_MAP[name] || name;
  let type: StarType = isMain ? 'main' : 'other';

  if (!isMain) {
    if (CAT.includes(name)) type = 'cat';
    else if (SAT.includes(name)) type = 'sat';
    else if (DAO.includes(name)) type = 'daoHoa';
    if (mutagenLiteral) type = 'hoa';
  }

  // Lấy độ sáng mặc định từ Iztro
  let brightness = BRIGHTNESS_MAP[brightnessLiteral || ''] || undefined;
  
  // Override độ sáng chuẩn Việt Nam nếu có định nghĩa
  if (VN_BRIGHTNESS_MAP[vietName]) {
    brightness = VN_BRIGHTNESS_MAP[vietName][branchIdx];
  }

  return {
    name: vietName,
    type,
    brightness,
    mutagen: mutagenLiteral ? (MUTAGEN_MAP[mutagenLiteral] || mutagenLiteral) : undefined,
    element: NGU_HANH_MAP[vietName] || 'Thủy', // Mặc định nếu sót
    side: RIGHT_SIDE_STARS.has(vietName) ? 'right' : 'left'
  };
}

function translateLunarDate(lunarStr: string): string {
  const years = lunarStr.substring(0, 3); // e.g. "己卯年"
  const rest = lunarStr.substring(3); // e.g. "十月廿五"
  
  const vnYear = (years.length === 3 && years.endsWith('年')) 
    ? `${STEM_MAP[years[0]] || years[0]}${BRANCH_MAP[years[1]] || years[1]} năm ` 
    : years;

  const numMap: Record<string, string> = { '正':'1', '一':'1','二':'2','三':'3','四':'4','五':'5','六':'6','七':'7','八':'8','九':'9','十':'10','十一':'11','十二':'12','腊':'12' };
  
  let result = vnYear;
  if (rest.includes('月')) {
    const parts = rest.split('月');
    const mStr = parts[0];
    const dStr = parts[1];
    const vnM = numMap[mStr] || mStr;
    result += `tháng ${vnM} ngày ${dStr.replace('初','').replace('廿','2').replace('卅','3').replace('十','1')}`;
  }
  
  // A bit simplified, but let's just use the raw numbers for now to avoid complexity
  // Proper way is to just use the numerical parts we parsed
  return result;
}

function parseLunarMonth(lunarStr: string): number {
  const match = lunarStr.match(/([一二三四五六七八九十]+)月/);
  if (!match) return 1;
  const numMap: Record<string, string> = { '正':'1', '一':'1','二':'2','三':'3','四':'4','五':'5','六':'6','七':'7','八':'8','九':'9','十':'10' };
  let s = match[1];
  if (s === '十一') return 11;
  if (s === '十二') return 12;
  return parseInt(numMap[s] || '1', 10);
}

function parseLunarDay(lunarStr: string): number {
  const match = lunarStr.match(/月(.+)$/);
  if (!match) return 15;
  let dayStr = match[1];
  if (dayStr === '十') return 10;
  if (dayStr === '二十' || dayStr === '廿') return 20;
  if (dayStr === '三十' || dayStr === '卅') return 30;

  const prefixMap: Record<string, string> = { '初': '0', '十': '1', '廿': '2', '二十': '2', '卅': '3', '三十': '3' };
  const numMap: Record<string, string> = { '一':'1','二':'2','三':'3','四':'4','五':'5','六':'6','七':'7','八':'8','九':'9','十':'0' };
  
  let numStr = '';
  const firstChar = dayStr[0];
  if (prefixMap[firstChar]) {
    numStr += prefixMap[firstChar];
    dayStr = dayStr.substring(1);
  } else if (prefixMap[dayStr.substring(0,2)]) {
    numStr += prefixMap[dayStr.substring(0,2)];
    dayStr = dayStr.substring(2);
  }
  
  for (let c of dayStr) {
    if (numMap[c]) numStr += numMap[c];
  }
  
  const parsed = parseInt(numStr, 10);
  return isNaN(parsed) ? 15 : parsed;
}

export interface TuViInput {
  fullName: string;
  solarDate: string;
  birthTime: string;
  gender: 'nam' | 'nữ';
}

export function calculateChart(input: TuViInput): ChartData {
  const [y, m, d] = input.solarDate.split('-').map(Number);
  const timeIndex = Math.ceil(Number(input.birthTime.split(':')[0]) / 2);

  const result = astro.bySolar(
    `${y}-${m}-${d}`,
    timeIndex,
    input.gender === 'nam' ? '男' : '女',
    true,
    'zh-CN'
  );

  const hscope = result.horoscope('2026-06-15');

  const yearStem = result.rawDates.chineseDate.yearly[0];
  const yearBranch = result.rawDates.chineseDate.yearly[1];
  const cucName = result.fiveElementsClass;

  const napAmKey = yearStem + yearBranch;
  const menhNguHanh = NAP_AM_MAP[napAmKey] || 'Bạch Lạp Kim';

  const duongCan = ['甲','丙','戊','庚','壬'];
  const isDuong = duongCan.includes(yearStem);
  const genderLabel = input.gender === 'nam' 
    ? (isDuong ? 'Dương Nam' : 'Âm Nam') 
    : (isDuong ? 'Dương Nữ' : 'Âm Nữ');

  const menhChuMap = ['Tham Lang','Cự Môn','Lộc Tồn','Văn Khúc','Liêm Trinh','Vũ Khúc','Phá Quân','Vũ Khúc','Liêm Trinh','Văn Khúc','Lộc Tồn','Cự Môn'];
  const thanChuMap = ['Linh Tinh','Thiên Tướng','Thiên Lương','Thiên Đồng','Văn Xương','Thiên Cơ','Hỏa Tinh','Thiên Tướng','Thiên Lương','Thiên Đồng','Văn Xương','Thiên Cơ'];
  const yearBranchIndex = BRANCH_LIST.indexOf(BRANCH_MAP[yearBranch]);
  const menhChu = menhChuMap[yearBranchIndex];
  const thanChu = thanChuMap[yearBranchIndex];

  const palaceMap = new Map<number, CungData>();

  result.palaces.forEach((p, idx) => {
    const branch = BRANCH_MAP[p.earthlyBranch];
    const branchIdx = BRANCH_LIST.indexOf(branch);

    const mainStars = p.majorStars.map(s => mapStar(s.name, true, branchIdx, s.brightness, s.mutagen));
    
    // Minor normal stars
    const minorStarsData: StarDetail[] = [];
    minorStarsData.push(...p.minorStars.map(s => mapStar(s.name, false, branchIdx, s.brightness, s.mutagen)));
    minorStarsData.push(...p.adjectiveStars.map(s => mapStar(s.name, false, branchIdx)));

    // Vòng sao phụ
    if (p.boshi12) minorStarsData.push(mapStar(p.boshi12, false, branchIdx));
    
    // Vòng Thái Tuế chuẩn Việt Nam (suiqian12)
    if (p.suiqian12) {
      const vnName = THAI_TUE_MAP[p.suiqian12] || mapStar(p.suiqian12, false, branchIdx).name;
      minorStarsData.push(mapStar(vnName, false, branchIdx));
    }


    // Cố tình bỏ qua jiangqian12 (Vòng Tướng Tinh - của Tử Vi Trung Quốc) vì làm rác lá số

    // Tứ Hóa => Always Last
    [...p.majorStars,...p.minorStars].forEach(s=>{
      if(s.mutagen){
        const vnName = MUTAGEN_MAP[s.mutagen] || s.mutagen;
        minorStarsData.push({
          name: vnName,
          type: 'hoa',
          element: NGU_HANH_MAP[vnName] || 'Thủy',
          brightness: VN_BRIGHTNESS_MAP[vnName] ? VN_BRIGHTNESS_MAP[vnName][branchIdx] : undefined,
          side: 'left'
        });
      }
    });

    // Fix logic Tuần/Triệt theo adjectiveStars
    const isTriet = p.adjectiveStars.some(s => s.name === '截路' || s.name === '截空');
    const isTuan = p.adjectiveStars.some(s => s.name === '旬空');

    const luuStars: string[] = [];
    if (hscope.yearly.stars) {
        hscope.yearly.stars[idx]?.forEach(s => {
            const vn = STAR_NAME_MAP[s.name];
            if (vn) luuStars.push(vn);
        });
    }

    // Tiểu vận: nhánh lưu niên của năm xem
    const tieuVanBranch = BRANCH_LIST[(hscope.yearly.index + idx) % 12];
    const trangSinhLabel = STAR_NAME_MAP[p.changsheng12] || p.changsheng12;

    // Giải Thần (TQ) bị trùng với Giải Thần (VN = Niên Giải), 蜚廉 bị trùng với Phi Liêm (Bác sĩ)
    const IGNORED = new Set(['Hỏa Tinh', 'Linh Tinh', 'Thiên Quý', 'Ân Quang', 'Giải Thần (TQ)', '蜚廉']);
    palaceMap.set(branchIdx, {
      key: PALACE_KEY_MAP[p.name] as CungKey,
      label: PALACE_LABEL_MAP[p.name],
      branch,
      mainStars,
      minorStars: minorStarsData.filter(s => !IGNORED.has(s.name)),
      luuStars: [], // Placeholder per tuViEngineV3
      ageRange: `${p.decadal.range[0]}-${p.decadal.range[1]}`,
      tieuVan: tieuVanBranch,
      trangSinh: trangSinhLabel,
      isThan: result.earthlyBranchOfBodyPalace === p.earthlyBranch,
      isTriet,
      isTuan,
      isVoChinhDieu: mainStars.length === 0,
      tamHop: [],
      xungChieu: '',
      nhiHop: ''
    });
  });

  // ========== VIỆT NAM TỬ VI OVERRIDES & ADDITIONS ==========
  // 1. Thiên La, Địa Võng luôn an tại Thìn, Tuất
  palaceMap.get(4)?.minorStars.push(mapStar('Thiên La', false, 4));
  palaceMap.get(10)?.minorStars.push(mapStar('Địa Võng', false, 10));

  // 2. Quốc Ấn, Đường Phù an theo Lộc Tồn
  const lộcTồnCung = Array.from(palaceMap.entries()).find(([, c]) => c.minorStars.some(s => s.name === 'Lộc Tồn' || s.name === '禄存'));
  if (lộcTồnCung) {
    const lộcTồnIdx = lộcTồnCung[0];
    const quocAnIdx = (lộcTồnIdx + 8) % 12;
    palaceMap.get(quocAnIdx)?.minorStars.push(mapStar('Quốc Ấn', false, quocAnIdx));
    
    // Đường phù an theo kinh nghiệm
    const ĐƯỜNG_PHÙ_MAP: Record<string, number> = {'甲':7, '乙':8, '丙':9, '丁':11, '戊':9, '己':11, '庚':1, '辛':2, '壬':3, '癸':5};
    if (yearStem in ĐƯỜNG_PHÙ_MAP) {
      const dpIdx = ĐƯỜNG_PHÙ_MAP[yearStem];
      palaceMap.get(dpIdx)?.minorStars.push(mapStar('Đường Phù', false, dpIdx));
    }
  }

  // 3. Hỏa Tinh, Linh Tinh an theo chuẩn Việt Nam
  const genderType = input.gender === 'nam' ? (isDuong ? 'Dương Nam' : 'Âm Nam') : (isDuong ? 'Dương Nữ' : 'Âm Nữ');
  const namThuanHien = ['Dương Nam', 'Âm Nữ'].includes(genderType);
  const HOA_LINH_KHOI: Record<string, [number, number]> = {
    'Dần': [1, 3], 'Ngọ': [1, 3], 'Tuất': [1, 3],       // Dần Ngọ Tuất -> Sửu(1), Mão(3)
    'Thân': [2, 10], 'Tý': [2, 10], 'Thìn': [2, 10],    // Thân Tý Thìn -> Dần(2), Tuất(10)
    'Tỵ': [3, 10], 'Dậu': [3, 10], 'Sửu': [3, 10],      // Tỵ Dậu Sửu -> Mão(3), Tuất(10)
    'Hợi': [9, 10], 'Mão': [9, 10], 'Mùi': [9, 10],     // Hợi Mão Mùi -> Dậu(9), Tuất(10)
  };
  const vnYearBranch = BRANCH_MAP[yearBranch];
  const [hoaKhoi, linhKhoi] = HOA_LINH_KHOI[vnYearBranch] || [1, 3];
  
  // Hỏa Tinh đếm tới giờ sinh (Thuận hay Nghịch tùy namThuanHien)
  const gioSinhIdx = timeIndex === 12 ? 0 : timeIndex; // Tý=0, Sửu=1...
  
  // Hỏa đếm (nam dương âm nữ đếm thuận, nam âm dương nữ đếm nghịch)
  let hoaIdx = namThuanHien ? (hoaKhoi + gioSinhIdx) % 12 : (hoaKhoi - gioSinhIdx + 12) % 12;
  palaceMap.get(hoaIdx)?.minorStars.push(mapStar('Hỏa Tinh', false, hoaIdx));
  
  // Linh Tinh chuẩn Việt Nam LUÔN đếm thuận (một số phái: Linh cũng theo luật thuận nghịch, nhưng đa số An Linh tinh đều đếm thuận hoặc theo Nam thuận Nữ nghịch. Chuẩn: Đều thuận hoặc Hỏa thuận Linh nghịch? Ta dùng Linh luôn đếm thuận cho tuổi Âm Nam theo kết quả Image 2)
  // Thực tế ở Image 2: Giờ sinh = Tuất(10). Linh khởi từ Tuất(10). Nếu đếm Thuận tới Tuất(10) -> Thân(8). (10+10)%12 = 20%12 = 8. Khớp 100% với Hình 2 (Linh Tinh ở Thân).
  let linhIdx = (linhKhoi + gioSinhIdx) % 12;
  palaceMap.get(linhIdx)?.minorStars.push(mapStar('Linh Tinh', false, linhIdx));

  // 4. Ân Quang, Thiên Quý an theo chuẩn Việt Nam
  // Tìm Văn Xương, Văn Khúc đã an
  const vanXuongCung = Array.from(palaceMap.entries()).find(([, c]) => c.minorStars.some(s => s.name === 'Văn Xương'));
  const vanKhucCung = Array.from(palaceMap.entries()).find(([, c]) => c.minorStars.some(s => s.name === 'Văn Khúc'));
  const ngaySinhAm = parseLunarDay(result.lunarDate);
  const thangSinhAm = parseLunarMonth(result.lunarDate);
  
  if (vanXuongCung) {
    const vxIdx = vanXuongCung[0];
    let anQuangIdx = (vxIdx + ngaySinhAm - 2) % 12; // Đếm thuận, lùi 1
    palaceMap.get(anQuangIdx)?.minorStars.push(mapStar('Ân Quang', false, anQuangIdx));
  }
  if (vanKhucCung) {
    const vkIdx = vanKhucCung[0];
    let thienQuyIdx = (vkIdx - (ngaySinhAm - 2) % 12 + 12) % 12; // Đếm nghịch, lùi 1
    palaceMap.get(thienQuyIdx)?.minorStars.push(mapStar('Thiên Quý', false, thienQuyIdx));
  }

  // 5. Thiên Giải, Địa Giải, Đẩu Quân chuẩn Việt Nam
  // Thiên Giải: Từ Thân (8) đếm thuận đến tháng sinh
  const thienGiaiIdx = (8 + thangSinhAm - 1) % 12;
  palaceMap.get(thienGiaiIdx)?.minorStars.push(mapStar('Thiên Giải', false, thienGiaiIdx));

  // Địa Giải: Từ Mùi (7) đếm thuận đến tháng sinh
  const diaGiaiIdx = (7 + thangSinhAm - 1) % 12;
  palaceMap.get(diaGiaiIdx)?.minorStars.push(mapStar('Địa Giải', false, diaGiaiIdx));

  // Đẩu Quân: Từ Thái Tuế (năm sinh) đếm nghịch tới tháng sinh, rồi đếm thuận tới giờ sinh
  const dauQuanBase = (yearBranchIndex - (thangSinhAm - 1) + 12) % 12;
  const dauQuanIdx = (dauQuanBase + gioSinhIdx) % 12;
  palaceMap.get(dauQuanIdx)?.minorStars.push(mapStar('Đẩu Quân', false, dauQuanIdx));

  // 5. Lưu Hà an theo Can Năm sinh
  const LƯU_HÀ_MAP: Record<string, number> = {'甲':9, '乙':10, '丙':7, '丁':8, '戊':5, '己':6, '庚':4, '辛':3, '壬':11, '癸':2};
  if (yearStem in LƯU_HÀ_MAP) {
    const lhIdx = LƯU_HÀ_MAP[yearStem];
    palaceMap.get(lhIdx)?.minorStars.push(mapStar('Lưu Hà', false, lhIdx));
  }

  // 4. Cleanup & Sắp xếp các sao rác
  palaceMap.forEach((c) => {
    // Lọc ra các sao không cần thiết nếu bị trùng lặp hoặc lọt nhầm
    // Rất nhiều sao Iztro tự sinh thừa với bảng Việt Nam (Vd: Bác Sỹ, Tấu Thư, Lực Sĩ... đã có sẵn hoặc không muốn render)
    // Tạm thời user chỉ kêu dư Quốc Ấn (do lộcTồn logic cũ sai). Giờ logic lộcTồnIdx được fix (find trên entries).
    
    c.minorStars.sort((a, b) => {
      // Ưu tiên bên trái trước, phải sau
      if (a.side !== b.side) return a.side === 'left' ? -1 : 1;
      return 0;
    });
  });
  // ==========================================================

  const NHI_HOP:Record<number, number> = { 0: 1, 1: 0, 2: 11, 3: 10, 4: 9, 5: 8, 6: 7, 7: 6, 8: 5, 9: 4, 10: 3, 11: 2 };

  const cungs = Array.from({length: 12}).map((_, i) => {
    const c = palaceMap.get(i)!;
    return {
      ...c,
      tamHop: [(i + 4) % 12, (i + 8) % 12].map(idx => palaceMap.get(idx)?.label || ''),
      xungChieu: palaceMap.get((i + 6) % 12)?.label || '',
      nhiHop: palaceMap.get(NHI_HOP[i])?.label || ''
    };
  });

  const bodyPalace = result.palaces.find(p => p.earthlyBranch === result.earthlyBranchOfBodyPalace);
  const thanLabel = bodyPalace ? PALACE_LABEL_MAP[bodyPalace.name] : '';
  const finalCuc = CUC_MAP[cucName] || cucName;

  return { 
    center: {
      fullName: input.fullName,
      gender: genderLabel,
      solarBirthday: input.solarDate, 
      lunarBirthday: translateLunarDate(result.lunarDate),
      canChiYear: `${STEM_MAP[yearStem]} ${BRANCH_MAP[yearBranch]}`,
      menhNguHanh, 
      cucName: finalCuc,
      hourBranch: BRANCH_LIST[timeIndex % 12],
      quote: `${checkSinhKhac(getElement(menhNguHanh), finalCuc)}. Âm Dương ${isDuong ? 'thuận lý' : 'nghịch lý'}.`,
      thanCung: thanLabel,
      sinhKhacNote: checkSinhKhac(getElement(menhNguHanh), finalCuc),
      menhChu: STAR_NAME_MAP[menhChu] || menhChu,
      thanChu: STAR_NAME_MAP[thanChu] || thanChu
    }, 
    cungs 
  };
}
