/**
 * geminiClient.ts
 * 
 * AI chỉ dùng để LUẬN GIẢI dựa trên lá số đã tính sẵn bằng code.
 * Không yêu cầu AI tính toán bất kỳ vị trí sao nào.
 */
import type { CungData, CungKey, ReadingContent } from "../astrology/types";

const MODEL = "gemini-flash-latest";

function getApiKey() {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key) throw new Error("Thiếu VITE_GEMINI_API_KEY trong file .env");
  return key;
}

function getApiBaseUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://generativelanguage.googleapis.com/v1beta";
  return baseUrl.replace(/\/$/, "");
}

/** Tạo prompt luận giải dựa trên lá số đã tính sẵn */
function buildReadingPrompt(
  fullName: string,
  gender: string,
  menhNguHanh: string,
  cucName: string,
  cungs: CungData[],
): string {
  // Tóm tắt lá số cho AI với logic nâng cao
  const chartSummary = cungs.map(c => {
    const mainStr = c.mainStars.map(s => `${s.name}${s.brightness ? `(${s.brightness})` : ''}`).join(', ');
    const minorStr = c.minorStars.map(s => s.name).join(', ');
    const status = [
      c.isThan ? "[CUNG THÂN]" : "",
      c.isTriet ? "[TRIỆT]" : "",
      c.isTuan ? "[TUẦN]" : "",
      c.isVoChinhDieu ? "[VCD]" : ""
    ].filter(Boolean).join(' ');

    return `CUNG ${c.label} (${c.branch}) ${status}: 
- Chính: ${mainStr || 'Vô chính diệu'}
- Phụ: ${minorStr}
- Hội chiếu: Tam hợp (${c.tamHop.join(', ')}), Xung (${c.xungChieu}), Nhị hợp (${c.nhiHop})
- Vận: Đại vận ${c.ageRange}, Lưu niên 2026 (${c.tieuVan})`;
  }).join('\n\n');

  return `Bạn là BẬC THẦY VẬN MỆNH. Hãy viết lời phán hàng ngày cực kỳ HUYỀN BÍ và CHIÊM NGHIỆM cho lá số sau.
Bối cảnh: ${fullName}, ${gender}, Mệnh ${menhNguHanh}, Cục ${cucName}.

DỮ LIỆU LÁ SỐ NÂNG CAO (Giao thoa đa cung):
${chartSummary}

YÊU CẦU LUẬN GIẢI:
1. Phân tích dựa trên sự HỘI CHIẾO (Tam hợp, Xung chiếu) của các sao. Không chỉ đọc đơn cung.
2. Đặc biệt lưu tâm đến cung THÂN (hậu vận) và các cung bị TRIỆT/TUẦN án ngữ - đây là những điểm nhấn quan trọng của lá số này.
3. Dự báo các biến động cho năm LƯU NIÊN 2026 (Bính Ngọ).
4. Văn phong: Sáu sắc, huyền bí nhưng cũng thực tế, mang tính định hướng linh hồn.

CHỈ TRẢ VỀ JSON, KHÔNG TEXT THỪA:
{
  "summary": {
    "general": "Tổng quan vận mệnh & chuyển hóa linh hồn (4-5 câu). Nhấn mạnh vào Mệnh/Thân và Triệt/Tuần.",
    "career": "Công danh sự nghiệp & Tài chính năm 2026 (4-5 câu). Dựa trên hội chiếu Quan/Tài.",
    "love": "Tình duyên, gia đạo & các mối quan hệ (4-5 câu). Dựa trên cung Phu/Phúc/Nô."
  }
} `;
}

export interface DetailedReadings {
  cungMenh: { ngoaiHinh: string; tinhCach: string; sucKhoa: string };
  phuThe: { header: string; content: string };
  taiBach: { tiemNang: string; loiKhuyen: string };
  phuMau: { content: string; tuongHop: number }; // 1-5
  thienDi: string;
  tatAch: string[];
  noBoc: string;
  quanLoc: { quote: string; paragraphs: string[] };
  dienTrach: string;
  tuTuc: string;
  huynhDe: string;
  phucDuc: { content: string; level: string };
  tongQuan: { paragraphs: string[]; finalQuote: string };
}

export interface ReadingsResult {
  summary: { general: string; career: string; love: string };
  readings?: { [key in CungKey]: ReadingContent };
  detailed?: DetailedReadings;
}

/** Gọi AI chỉ để lấy luận giải, dựa trên chart đã tính sẵn */
export async function fetchReadingsFromAI(
  fullName: string,
  gender: string,
  menhNguHanh: string,
  cucName: string,
  cungs: CungData[],
): Promise<ReadingsResult> {
  const prompt = buildReadingPrompt(fullName, gender, menhNguHanh, cucName, cungs);
  const key = getApiKey();
  const baseUrl = getApiBaseUrl();

  const endpoint = `${baseUrl}/models/${MODEL}:generateContent?key=${key}`;

  console.log(`[AI] Gửi lá số tới ${MODEL} (Google Gemini) để luận giải...`);

  try {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("API không trả về kết quả.");
    }

    try {
      // Làm sạch text nếu AI trả về markdown code block
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleanJson) as ReadingsResult;
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]) as ReadingsResult;
      throw new Error("Luận giải trả về sai định dạng JSON.");
    }

  } catch (err: any) {
    console.error(`[AI] Luận giải thất bại: ${err.message}`);
    throw new Error(`Không thể luận giải. Chi tiết: ${err.message}`);
  }
}

/** Tạo luận giải mặc định (khi AI lỗi hoặc không sẵn sàng) */
export function buildDefaultReadings(cungs: CungData[]): ReadingsResult {
  const readings: any = {};
  for (const c of cungs) {
    const mainNames = c.mainStars.map(s => s.name);
    const mainStr = mainNames.length > 0 ? mainNames.join(', ') : 'Vô Chính Diệu';
    readings[c.key] = {
      stars: mainNames,
      content: `Cung ${c.label} có ${mainStr}. Đang chờ luận giải chi tiết từ AI.`,
    };
  }
  return {
    readings,
    summary: {
      general: "Lá số đã được lập chính xác. Luận giải AI đang tải...",
      career: "Đang chờ luận giải...",
      love: "Đang chờ luận giải...",
    },
  };
}

/** Tạo prompt cho bản báo cáo chi tiết cuối cùng */
function buildDetailedReadingPrompt(
  fullName: string,
  gender: string,
  menhNguHanh: string,
  cucName: string,
  cungs: CungData[]
): string {
  const chartSummary = cungs.map(c => {
    const mainStr = c.mainStars.map(s => `${s.name}${s.brightness ? `(${s.brightness})` : ''}`).join(', ');
    const minorStr = c.minorStars.map(s => s.name).join(', ');
    const status = [
      c.isThan ? "[CUNG THÂN]" : "",
      c.isTriet ? "[TRIỆT]" : "",
      c.isTuan ? "[TUẦN]" : "",
      c.isVoChinhDieu ? "[VCD]" : ""
    ].filter(Boolean).join(' ');
    
    return `CUNG ${c.label} (${c.branch}) ${status}: 
- Chính: ${mainStr || 'Vô chính diệu'}
- Phụ: ${minorStr}
- Hội chiếu: Tam hợp (${c.tamHop.join(', ')}), Xung (${c.xungChieu}), Nhị hợp (${c.nhiHop})
- Vận: Đại vận ${c.ageRange}, Lưu niên 2026 (${c.tieuVan})`;
  }).join('\n\n');

  return `Bạn là BẬC THẦY VẬN MỆNH, chuyên gia cao cấp nhất về Tử Vi Đẩu Số với hơn 30 năm kinh nghiệm nghiên cứu cổ tịch. 
Hãy viết bản LUẬN GIẢI CHI TIẾT CUỐI CÙNG (FINAL READING) cho lá số sau với văn phong HUYỀN BÍ, CHIÊM NGHIỆM, SÂU SẮC và GIÀU TÍNH CHIẾT TRUNG. 

HỌ TÊN: ${fullName}
GIỚI TÍNH: ${gender}
MỆNH: ${menhNguHanh}
CỤC: ${cucName}

DỮ LIỆU CHÍNH XÁC 12 CUNG:
${chartSummary}

YÊU CẦU QUAN TRỌNG: 
1. Mỗi đoạn luận giải phải DÀI ít nhất 3-4 câu văn, phân tích sâu sắc cả về âm dương ngũ hành và tâm lý học linh hồn. 
2. Tránh các câu sáo rỗng. Hãy dùng các ẩn dụ về thiên văn và triết học cổ phương Đông.
3. Luận giải phải dựa TRỰC TIẾP vào các chính tinh và phụ tinh đã được cung cấp (ví dụ: nếu có Tử Vi thì luận về phong thái lãnh đạo, nếu có Thiên Không thì luận về bài học buông bỏ).

YÊU CẦU: Cung cấp JSON theo đúng cấu trúc dưới đây. KHÔNG TRẢ VỀ TEXT THỪA.
{
  "cungMenh": { 
     "ngoaiHinh": "Phân tích kỹ lưỡng về thần thái, khí chất và diện mạo từ góc độ tinh tú (ít nhất 3 câu)", 
     "tinhCach": "Đi sâu vào tầng sâu tâm thức, trí tuệ ngầm và những mâu thuẫn nội tâm (ít nhất 4 câu)", 
     "sucKhoa": "Cảnh báo chi tiết về các bộ phận cơ thể dễ tổn thương và lời khuyên dưỡng sinh cổ truyền" 
  },
  "phuThe": { 
     "header": "Một câu trích dẫn lãng mạn, sâu sắc về nghiệp quả duyên nợ", 
     "content": "Luận giải chi tiết về tầm vóc, tính cách của bạn đời và các giai đoạn biến động trong hôn nhân (ít nhất 3 câu)" 
  },
  "taiBach": { 
     "tiemNang": "Dự báo chi tiết về dòng chảy tiền bạc qua từng đại vận và xu hướng tích lũy (ít nhất 3 câu)", 
     "loiKhuyen": "Chiến lược cụ thể về quản lý tài chính và các ngành nghề 'sinh lộc' nhất dựa trên lá số" 
  },
  "phuMau": { 
     "content": "Phân tích sâu về di sản tinh thần từ cha mẹ, ân đức tổ tiên và mức độ tương trợ thực tế (ít nhất 3 câu)", 
     "tuongHop": 4 
  },
  "thienDi": "Luận về khả năng thích nghi với môi trường mới, danh tiếng khi ra ngoài và các biến số viễn xứ (ít nhất 4 câu)",
  "tatAch": ["Cảnh báo cụ thể về huyết tương/khí lực hoặc tâm trí", "Lời khuyên về thiền định và các phương pháp chữa lành tự nhiên"],
  "noBoc": "Bản chất các mối quan hệ xã hội, sự phản trắc hoặc phò tá từ cấp dưới và bằng hữu (ít nhất 3 câu)",
  "quanLoc": { 
     "quote": "Một câu chân ngôn đanh thép về con đường công danh", 
     "paragraphs": [
       "Phân tích các nút thắt sự nghiệp, thời điểm bùng nổ và các thách thức từ đối thủ (ít nhất 3 câu)",
       "Tầm nhìn về đỉnh cao sự nghiệp, vị thế xã hội và sứ mệnh linh hồn trong công việc (ít nhất 3 câu)"
     ] 
  },
  "dienTrach": "Sức hút with bất động sản, phong thủy không gian sống và khả năng thừa hưởng tổ nghiệp (ít nhất 3 câu)",
  "tuTuc": "Luận về số lượng và chất lượng hậu thế, mối liên kết tâm linh giữa cha mẹ và con cái (ít nhất 3 câu)",
  "huynhDe": "Luận về sự tương trợ kín đáo hoặc những rào cản từ anh chị em trong gia đình (ít nhất 3 câu)",
  "phucDuc": { 
     "content": "Tầng sâu về phúc phần, sức mạnh từ dòng tộc và khả năng nhận được sự bảo hộ âm phần (ít nhất 4 câu)", 
     "level": "Cấp độ bảo hộ thần thánh (Ví dụ: Cấp độ tối cao / Vững chãi như Thái Sơn / Mênh mông như biển cả)" 
  },
  "tongQuan": { 
     "paragraphs": [
       "Đoạn 1: Tổng kết bức tranh toàn cảnh về hành trình linh hồn trong kiếp này (ít nhất 4 câu)", 
       "Đoạn 2: Những bài học lớn nhất mà cá nhân phải vượt qua để tiến hóa tâm thức (ít nhất 4 câu)", 
       "Đoạn 3: Viễn cảnh tương lai và lời nhắn nhủ từ các vì sao về chân lý sống (ít nhất 4 câu)"
     ],
     "finalQuote": "Câu phán quyết cuối cùng mang tính sấm truyền về tương lai vị lai"
  }
}`;
}

export async function fetchDetailedReadingsFromAI(
  fullName: string,
  gender: string,
  menhNguHanh: string,
  cucName: string,
  cungs: CungData[]
): Promise<DetailedReadings> {
  const prompt = buildDetailedReadingPrompt(fullName, gender, menhNguHanh, cucName, cungs);
  const key = getApiKey();
  const baseUrl = getApiBaseUrl();

  const endpoint = `${baseUrl}/models/${MODEL}:generateContent?key=${key}`;

  try {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Lỗi API chi tiết: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) throw new Error("AI không trả về nội dung báo cáo.");

    // Parse JSON safely
    const cleanJson = content.replace(/```json/g, "").replace(/```/g, "").trim();
    const match = cleanJson.match(/\{[\s\S]*\}/);
    const jsonStr = match ? match[0] : cleanJson;
    return JSON.parse(jsonStr) as DetailedReadings;
  } catch (error: any) {
    console.error("[AI-Detailed] Thất bại:", error.message);
    throw error;
  }
}
