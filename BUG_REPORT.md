# 🐛 Báo Cáo Bug — Thiên Cơ Online (Tử Vi Đẩu Số)

> **Cập nhật:** 2026-04-02  
> **Dự án:** Thiên Cơ Online — Ứng dụng Tử Vi Đẩu Số AI  
> **Stack:** Vite + React 19 + TypeScript + TailwindCSS v4 + iztro + Gemini AI

---

## ✅ Các Bug Đã Fix

### 🔧 Engine (`tuViEngine.ts`)

| # | Bug | Mô tả | Cách fix |
|---|-----|-------|----------|
| 1 | **AI tính lá số sai toàn bộ** | Trước đây toàn bộ lá số (12 cung, sao, cục, mệnh) do AI Gemini tự sinh → sai nghiêm trọng, không theo bất kỳ thuật toán tử vi chuẩn nào | Chuyển sang dùng thư viện `iztro` tính toán chính xác (code-based), AI chỉ còn làm nhiệm vụ luận giải |
| 2 | **Mapping tên cung Trung → Việt** | 12 tên cung hiển thị bằng tiếng Trung (命宫, 父母...) | Tạo `PALACE_KEY_MAP` & `PALACE_LABEL_MAP` dịch đầy đủ 12 cung sang tiếng Việt |
| 3 | **Mapping tên sao Trung → Việt** | 100+ tên sao hiển thị bằng ký tự Trung Quốc | Tạo `STAR_NAME_MAP` với 100+ entry dịch đầy đủ (紫微→Tử Vi, 天机→Thiên Cơ...) |
| 4 | **Vòng Tướng Tinh (jiangqian12) gây rác** | iztro sinh ra vòng sao Tướng Tinh (将前12) theo hệ Trung Quốc, không dùng trong Tử Vi Việt Nam | Bỏ hoàn toàn `jiangqian12`, chỉ giữ `boshi12` (Bác Sỹ) và `suiqian12` (Thái Tuế) |
| 5 | **Vòng Thái Tuế sai tên** | Vòng sao Thái Tuế (suiqian12) dùng tên Trung Quốc khác với chuẩn Việt Nam (VD: 晦气 phải là Thiếu Dương chứ không phải Hối Khí) | Tạo `THAI_TUE_MAP` riêng biệt map đúng theo chuẩn VN: Thái Tuế, Thiếu Dương, Tang Môn, Thiếu Âm, Quan Phù, Tử Phù, Tuế Phá, Long Đức, Bạch Hổ, Phúc Đức, Điếu Khách, Trực Phù |
| 6 | **Thiếu sao đặc thù Việt Nam** | Các sao Thiên La, Địa Võng, Quốc Ấn, Đường Phù, Lưu Hà, Thiên Giải, Địa Giải, Đẩu Quân không có trong iztro | Code inject thủ công post-iztro: Thiên La luôn ở Thìn, Địa Võng ở Tuất, Quốc Ấn theo Lộc Tồn +8 cung, Đường Phù theo Can năm sinh, v.v. |
| 7 | **Hỏa Tinh, Linh Tinh sai vị trí** | iztro tính Hỏa/Linh theo thuật toán Trung Quốc, khác chuẩn Việt Nam | Viết logic riêng an Hỏa/Linh theo Tam Hợp năm sinh (Dần Ngọ Tuất, Thân Tý Thìn...) + đếm thuận/nghịch theo Âm Dương Nam Nữ |
| 8 | **Ân Quang, Thiên Quý sai** | iztro đặt khác vị trí so với chuẩn VN | An Ân Quang từ Văn Xương đếm thuận theo ngày sinh âm lịch, Thiên Quý từ Văn Khúc đếm nghịch |
| 9 | **Độ sáng (Đắc/Hãm) sao dùng chuẩn TQ** | iztro trả về brightness theo trường phái Trung Quốc (庙/旺/得/利/平/陷), nhiều sao sai so với chuẩn VN | Tạo `VN_BRIGHTNESS_MAP` hardcode cho 20+ sao chính/phụ quan trọng (Tử Vi, Thiên Cơ, Thái Dương... đến Hóa Kỵ) theo đúng chuẩn Việt Nam 12 cung |
| 10 | **Thiếu Ngũ Hành cho sao** | Không có thông tin ngũ hành (Kim/Mộc/Thủy/Hỏa/Thổ) cho các sao → không tô màu được | Tạo `NGU_HANH_MAP` đầy đủ cho 80+ sao, gán element cho mỗi `StarDetail` |
| 11 | **Nạp Âm sai/thiếu** | Chỉ có vài entry hoặc ánh xạ không đúng 60 Giáp Tý | Tạo đầy đủ `NAP_AM_MAP` 60 entry (甲子→Hải Trung Kim ... 癸亥→Đại Hải Thủy) |
| 12 | **Cục hiển thị tiếng Trung** | 水二局 hiển thị thay vì Thủy Nhị Cục | Tạo `CUC_MAP` dịch đúng 5 cục |
| 13 | **Thiếu Mệnh chủ, Thân chủ** | Không tính toán và hiển thị Mệnh chủ, Thân chủ | Thêm logic tính từ Chi năm sinh theo bảng chuẩn 12 Chi |
| 14 | **Cung Thân không hiển thị** | Không xác định cung nào là Cung Thân | Sử dụng `result.earthlyBranchOfBodyPalace` từ iztro, set cờ `isThan = true` |
| 15 | **Tuần/Triệt xác định sai** | Logic check Tuần/Triệt dựa vào source sai | Fix: check `adjectiveStars` cho `截路`/`截空` (Triệt) và `旬空` (Tuần) |
| 16 | **Giải Thần TQ trùng Giải Thần VN** | Sao 解神 (Giải Thần Trung Quốc) bị lẫn với Giải Thần (Niên Giải) Việt Nam | Đổi tên thành `Giải Thần (TQ)` và thêm vào danh sách `IGNORED` để lọc ra |
| 17 | **Sao trùng lặp (Quốc Ấn dư)** | Logic an Quốc Ấn cũ dùng `find` trên mảng sai, gây dư sao | Fix lại dùng `palaceMap.entries()` tìm cung chứa Lộc Tồn chính xác |
| 18 | **Tràng Sinh hiển thị lẫn với phụ tinh** | Vòng Tràng Sinh (长生12) bị gộp chung với minor stars | Tách riêng thành field `trangSinh` chuyên dụng, render ở vị trí bottom-center |

---

### 🎨 UI (`ReadingDisplay.tsx`)

| # | Bug | Mô tả | Cách fix |
|---|-----|-------|----------|
| 19 | **Phụ tinh không phân cột** | Tất cả phụ tinh xếp liên tục 1 cột, không phân biệt Cát tinh/Sát tinh | Chia thành 2 cột trái (Cát tinh) / phải (Sát tinh) dựa trên `side` attribute từ engine |
| 20 | **Sao không có màu theo Ngũ Hành** | Tất cả sao cùng 1 màu trắng | Áp dụng color theo element: Kim=trắng, Mộc=xanh lá, Thủy=xanh dương, Hỏa=đỏ, Thổ=vàng |
| 21 | **Center panel thiếu thông tin** | Chỉ hiển thị tên + quote chung chung ("The Sovereign...") | Redesign thành layout đầy đủ: Tên, Lịch Âm Dương, Giới tính (Âm/Dương Nam/Nữ), Mệnh Ngũ Hành, Cục, Mệnh chủ, Thân chủ |
| 22 | **Sinh/Khắc Mệnh-Cục sai** | Hiển thị cứng "Bản Mệnh khắc Cục" cho mọi trường hợp | Viết hàm `checkSinhKhac()` đúng logic ngũ hành: sinh, khắc, bình hòa, thuận/nghịch |
| 23 | **Tên file AI client sai** | File `ollamaClient.ts` nhưng thực tế dùng Gemini API | Đổi tên thành `geminiClient.ts`, cập nhật import |
| 24 | **Vô Chính Diệu không hiển thị** | Cung không có chính tinh không có dấu hiệu nhận biết | Thêm cờ `isVoChinhDieu` khi `mainStars.length === 0` |

---

## ⚠️ Các Bug/Vấn Đề Còn Tồn Đọng

### 🔴 Mức Cao (Critical)

| # | Bug | Mô tả | Ghi chú |
|---|-----|-------|---------|
| 1 | **API Key Gemini lộ client-side** | API key nằm trong `.env` với prefix `VITE_` → bị bundle vào JS, lộ trên browser DevTools | Cần tạo backend proxy (Cloudflare Workers / Vercel Edge Function) để ẩn key |
| 2 | **Chưa có backend** | Toàn bộ logic AI chạy client-side, không có server | Cần API proxy tối thiểu để bảo mật key & rate limiting |
| 3 | **Natal Chart (`/natal-chart`) hardcoded** | Cung Mặt Trời/Trăng/Mọc luôn hiển thị cố định "Sư Tử/Song Ngư/Thiên Yết" — không tính từ dữ liệu thật | Cần tích hợp thư viện tính Natal Chart phương Tây hoặc bỏ trang này |
| 4 | **Độ sáng phụ tinh có thể sai lệch nhỏ** | `VN_BRIGHTNESS_MAP` chỉ cover 20+ sao chính/phụ. Các sao còn lại vẫn dùng brightness từ iztro (TQ) hoặc không có | Cần bổ sung thêm nếu phát hiện sai lệch cụ thể so với Altuvi |
| 5 | **Âm lịch parse chưa hoàn chỉnh** | Hàm `translateLunarDate()`, `parseLunarDay()`, `parseLunarMonth()` xử lý ký tự Trung Quốc theo regex đơn giản, có thể fail ở edge case (nhuận tháng, ngày 10/20/30 đặc biệt) | Cần test toàn diện với nhiều ngày sinh khác nhau |

### 🟡 Mức Trung Bình

| # | Bug | Mô tả | Ghi chú |
|---|-----|-------|---------|
| 6 | **Dashboard hardcoded** | "Năng lượng ngày" + "Bản đồ đã lưu" là mock data tĩnh | Cần logic tính năng lượng ngày dựa trên Lưu niên & database lưu lịch sử |
| 7 | **Chưa có auth/payment** | CTA "Mở khóa ngay – 20.000đ" chưa có logic thật | Cần tích hợp VNPay/MoMo/Stripe |
| 8 | **Chưa lưu lịch sử** | Chỉ lưu 1 kết quả gần nhất vào localStorage | Cần database (Supabase/Firebase) để lưu nhiều lá số |
| 9 | **SVG Chart decorative** | Bản đồ sao SVG trên trang `/natal-chart` chỉ là hình trang trí | Cần vẽ đúng vị trí sao trên bản đồ thiên văn |
| 10 | **SEO chưa đầy đủ** | Thiếu meta tags, title động theo người dùng | Cần thêm React Helmet hoặc meta tags cho từng route |
| 11 | **Luận giải AI lúc đúng lúc sai** | AI Gemini đôi khi bịa nội dung luận giải không phù hợp với lá số đã tính | Cần refine prompt engineering, bơm thêm context Tam Hợp/Xung Chiếu vào prompt |
| 12 | **`luuStars` luôn rỗng** | Trường `luuStars` trong `CungData` luôn là mảng rỗng `[]` (có comment "Placeholder") | Cần extract từ `hscope.yearly.stars` và map đúng |
| 13 | **Tam Hợp/Xung Chiếu chỉ hiển thị label** | `tamHop`, `xungChieu`, `nhiHop` đã tính nhưng chỉ lưu label text, chưa có tương tác UI | Cần thêm UI highlight line drawing giữa các cung khi hover/click |

### 🟢 Mức Nhẹ

| # | Bug | Mô tả | Ghi chú |
|---|-----|-------|---------|
| 14 | **Text quá nhỏ trên mobile** | Chart grid đã responsive nhưng text size rất nhỏ khi xem trên điện thoại | Cần tối ưu font-size hoặc cho phép zoom/scroll horizontal |
| 15 | **Tiểu vận chưa verify** | Logic `tieuVanBranch` tính từ `hscope.yearly.index` chưa được kiểm chứng kỹ | Cần cross-check với Altuvi cho nhiều case |
| 16 | **Một số sao nhỏ có thể thiếu Ngũ Hành** | `NGU_HANH_MAP` mặc định fallback về 'Thủy' nếu thiếu entry | Cần review và bổ sung nếu phát hiện sao hiển thị sai màu |
| 17 | **ReadingDetail.tsx chưa đồng bộ** | Trang chi tiết cung chưa áp dụng cùng styling/filtering như lưới chính | Cần refactor để dùng chung logic render star |

---

## 🚧 Tính Năng Chưa Bắt Đầu

- [ ] Backend API (proxy Gemini để bảo mật key)
- [ ] Authentication (đăng ký/đăng nhập)
- [ ] Payment integration (VNPay/MoMo)
- [ ] Database lưu lịch sử xem lá số
- [ ] Natal Chart thật (vẽ SVG đúng vị trí sao phương Tây)
- [ ] Tải PDF bản đồ sao
- [ ] Hệ thống đánh giá "năng lượng ngày" dựa trên Lưu niên
- [ ] Admin dashboard
- [ ] PWA / offline support
- [ ] Social sharing (chia sẻ lá số lên Facebook/Zalo)
- [ ] Tối ưu prompt AI cho từng cung (Tam Hợp & Xung Chiếu context)
- [ ] Interactive Tam Hợp (vẽ đường nối giữa các cung khi click)

---

## 📊 Tổng Kết

| Trạng thái | Số lượng |
|------------|----------|
| ✅ Đã fix | **24 bug** |
| 🔴 Tồn đọng (Critical) | **5 bug** |
| 🟡 Tồn đọng (Medium) | **8 bug** |
| 🟢 Tồn đọng (Low) | **4 bug** |
| 🚧 Tính năng mới | **11 items** |

> **Tiến độ tổng thể:** Core engine tính toán lá số đã đạt ~90% chính xác so với chuẩn Altuvi. UI hiển thị lưới 12 cung đẹp và functional. Phần còn thiếu lớn nhất là **backend** (bảo mật API key), **persistence** (lưu lịch sử), và **business logic** (auth + payment).
