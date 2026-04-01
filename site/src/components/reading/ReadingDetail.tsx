import React, { useEffect } from 'react';
import { useAstroStore } from '@/store/useAstroStore';
import { useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export const ReadingDetail: React.FC = () => {
  const { detailedResult, result, status, generateDetailedDestiny } = useAstroStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!result) {
      navigate({ to: '/' });
      return;
    }
    if (!detailedResult && status !== 'generating-detail') {
      generateDetailedDestiny();
    }
  }, [result, detailedResult, status, navigate, generateDetailedDestiny]);

  if (!detailedResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 text-center px-4 bg-surface text-on-surface">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-primary/10 animate-pulse" />
          <div className="absolute inset-2 rounded-full border-4 border-t-tertiary border-transparent animate-spin duration-[2000ms]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-tertiary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight italic">Đang Soi Chiếu <span className="text-tertiary not-italic">Định Mệnh</span></h2>
          <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed italic opacity-70">
            "Bậc thầy đang lật mở từng trang của bản trường ca này với sự tôn nghiêm nhất..."
          </p>
        </div>
      </div>
    );
  }

  const { cungMenh, phuThe, taiBach, phuMau, thienDi, tatAch, noBoc, quanLoc, dienTrach, tuTuc, huynhDe, phucDuc, tongQuan } = detailedResult;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .text-gradient-gold {
            background: linear-gradient(135deg, #e9c349 0%, #ffe088 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .text-gradient-celestial {
            background: linear-gradient(135deg, #c2c2f2 0%, #dcbaf4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
      `}</style>

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 font-body selection:bg-primary-container selection:text-primary text-on-surface bg-surface">
        {/* Hero Section */}
        <section className="mb-32 flex flex-col md:flex-row items-center gap-12 md:gap-24 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="w-full md:w-5/12 aspect-[4/5] relative rounded-full overflow-hidden border border-outline-variant/15 group">
            <img 
              alt="Portrait of an ethereal, gender-neutral figure integrated with glowing cosmic patterns" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5UnVHHopOMWyhJqCeAdUOOfqG6kn3Ugf-tSNDX-5zcTzQc5OJboRlikU1xoTNHWfNFMGFSCECJvwCF1oQA2IMIjmcUlXNLPFBDhwZpEbuYs74FQW5I8Yxdgh0XJKFcp1RUGLh5n6Xl_v2DQ52ah-ft78jMGYD6Zoxpfe3icFZSTMAM2HDIYOoEBKC2fU8KgoevofpP6Dx3D_IBulB_NNr8i6RTm8M31ShIBM68zibHL8iwrv3u6XmRTzuhQ6lUHBuek7AvzQw_Hc"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent"></div>
          </div>
          <div className="w-full md:w-7/12 space-y-8">
            <span className="font-label text-sm uppercase tracking-[0.3em] text-tertiary block">Bản Giao Hưởng Định Mệnh</span>
            <h2 className="text-5xl md:text-7xl font-headline leading-tight italic">
              Lời Nhắn Nhủ Từ <span className="text-gradient-celestial block not-italic font-bold">Bậc Thầy Vận Mệnh</span>
            </h2>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl">
              "Kẻ nhìn ra ngoài thì mơ mộng, kẻ nhìn vào trong thì tỉnh thức. Những vì sao không điều khiển chúng ta, chúng chỉ soi sáng con đường mà linh hồn đã chọn từ thuở sơ khai. Hãy lật mở từng trang của bản trường ca này với sự tôn nghiêm nhất."
            </p>
            <div className="flex items-center gap-4 text-tertiary">
              <span className="h-px w-12 bg-tertiary/30"></span>
              <span className="font-headline italic text-lg">— The Master of Fate</span>
            </div>
          </div>
        </section>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Cung Menh */}
          <article className="md:col-span-8 bg-surface-container-low p-10 rounded-xl border-l-4 border-tertiary/20 relative group hover:bg-surface-container transition-all duration-500">
            <span className="material-symbols-outlined absolute top-10 right-10 text-8xl text-primary/5 select-none">person</span>
            <div className="relative z-10">
              <span className="font-label text-tertiary text-xs tracking-widest block mb-4 uppercase">Cung 01</span>
              <h3 className="text-4xl font-headline mb-8 text-on-surface">Bản Mệnh</h3>
              <div className="space-y-6 text-on-surface-variant leading-relaxed">
                <p><strong className="text-on-surface font-semibold italic">Ngoại hình & Thần thái:</strong> {cungMenh.ngoaiHinh}</p>
                <p><strong className="text-on-surface font-semibold italic">Tính cách & Trí tuệ:</strong> {cungMenh.tinhCach}</p>
                <p><strong className="text-on-surface font-semibold italic">Sức khỏe:</strong> {cungMenh.sucKhoa}</p>
              </div>
            </div>
          </article>

          {/* Phu The */}
          <article className="md:col-span-4 bg-surface-container-high p-10 rounded-xl relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-10 text-primary transition-transform group-hover:scale-110 duration-500">
              <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <span className="font-label text-tertiary text-xs tracking-widest block mb-4 uppercase">Cung 02</span>
            <h3 className="text-3xl font-headline mb-6 text-on-surface">Phu Thê</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6 italic">"{phuThe.header}"</p>
            <p className="text-on-surface-variant text-sm leading-relaxed">{phuThe.content}</p>
          </article>

          {/* Tai Bach & Nghe Nghiep */}
          <article className="md:col-span-6 bg-surface-container p-10 rounded-xl border-t border-outline-variant/10">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              <h3 className="text-2xl font-headline uppercase tracking-wider text-on-surface">Tài Sản & Nghề Nghiệp</h3>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-surface-dim rounded-lg border border-outline-variant/10">
                <p className="text-xs font-label text-on-surface-variant uppercase mb-2">Tiềm năng tài chính</p>
                <p className="text-on-surface leading-relaxed">{taiBach.tiemNang}</p>
              </div>
              <div className="p-6 bg-surface-dim rounded-lg border border-outline-variant/10">
                <p className="text-xs font-label text-on-surface-variant uppercase mb-2">Lời khuyên nghề nghiệp</p>
                <p className="text-on-surface leading-relaxed">{taiBach.loiKhuyen}</p>
              </div>
            </div>
          </article>

          {/* Phu Mau */}
          <article className="md:col-span-6 bg-surface-container-low p-10 rounded-xl flex flex-col justify-between">
            <div>
              <span className="font-label text-tertiary text-xs tracking-widest block mb-4 uppercase">Cung 04</span>
              <h3 className="text-2xl font-headline mb-6 text-on-surface">Phụ Mẫu</h3>
              <p className="text-on-surface-variant leading-relaxed">{phuMau.content}</p>
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant/10 flex items-center justify-between">
              <span className="text-xs font-label text-on-surface-variant uppercase">Mức độ tương hợp</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(step => (
                  <span 
                    key={step} 
                    className={cn(
                      "w-2 h-2 rounded-full",
                      step <= phuMau.tuongHop ? "bg-tertiary" : "bg-outline-variant"
                    )} 
                  />
                ))}
              </div>
            </div>
          </article>

          {/* Thien Di */}
          <article className="md:col-span-4 bg-primary-container p-10 rounded-xl relative">
            <span className="material-symbols-outlined absolute top-6 right-6 text-on-primary-container/30">explore</span>
            <h3 className="text-2xl font-headline mb-4 text-primary">Cung Thiên Di</h3>
            <p className="text-on-primary-container leading-relaxed text-sm">{thienDi}</p>
          </article>

          {/* Tat Ach */}
          <article className="md:col-span-4 bg-surface-container-high p-10 rounded-xl">
            <h3 className="text-2xl font-headline mb-4 text-error/80">Cung Tật Ách</h3>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              {tatAch.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-error/60 text-lg">{idx % 2 === 0 ? 'warning' : 'eco'}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* No Boc */}
          <article className="md:col-span-4 bg-surface-container p-10 rounded-xl">
            <h3 className="text-2xl font-headline mb-4 text-on-surface">Cung Nô Bộc</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">{noBoc}</p>
          </article>

          {/* Quan Loc */}
          <article className="md:col-span-12 bg-surface-container-highest p-10 md:p-16 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
            <div className="relative z-10 max-w-3xl">
              <span className="font-label text-tertiary text-xs tracking-widest block mb-4 uppercase">ĐỈNH CAO DANH VỌNG</span>
              <h3 className="text-4xl font-headline mb-8 text-on-surface">Cung Quan Lộc</h3>
              <p className="text-xl text-on-surface mb-8 italic text-gradient-gold">"{quanLoc.quote}"</p>
              <div className="grid md:grid-cols-2 gap-8 text-on-surface-variant leading-relaxed">
                {quanLoc.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </article>

          {/* Dien Trach */}
          <article className="md:col-span-6 bg-surface-container p-10 rounded-xl border border-outline-variant/10">
            <span className="material-symbols-outlined text-tertiary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
            <h3 className="text-2xl font-headline mb-4 text-on-surface">Cung Điền Trạch</h3>
            <p className="text-on-surface-variant leading-relaxed">{dienTrach}</p>
          </article>

          {/* Tu Tuc */}
          <article className="md:col-span-6 bg-surface-container p-10 rounded-xl border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>family_restroom</span>
            <h3 className="text-2xl font-headline mb-4 text-on-surface">Cung Tử Tức</h3>
            <p className="text-on-surface-variant leading-relaxed">{tuTuc}</p>
          </article>

          {/* Huynh De */}
          <article className="md:col-span-4 bg-surface-container-low p-10 rounded-xl">
            <h3 className="text-2xl font-headline mb-4 text-on-surface">Cung Huynh Đệ</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{huynhDe}</p>
          </article>

          {/* Phuc Duc */}
          <article className="md:col-span-8 bg-gradient-to-br from-surface-container-high to-surface-container-highest p-10 rounded-xl relative border border-tertiary/10">
            <div className="absolute top-0 right-0 p-8">
              <span className="material-symbols-outlined text-tertiary/20 text-6xl">temple_buddhist</span>
            </div>
            <h3 className="text-3xl font-headline mb-6 text-on-surface">Cung Phúc Đức</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">{phucDuc.content}</p>
            <div className="flex items-center gap-2 text-tertiary font-label text-sm uppercase">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span>Năng lượng bảo hộ: {phucDuc.level}</span>
            </div>
          </article>
        </div>

        {/* Tong Quan */}
        <section className="mt-24 bg-surface-container-lowest p-10 md:p-16 rounded-xl border border-outline-variant/15 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]"></div>
          <div className="relative z-10">
            <span className="font-label text-tertiary text-xs tracking-[0.3em] block mb-6 uppercase">TỔNG QUAN HÀNH TRÌNH</span>
            <h2 className="text-4xl md:text-5xl font-headline mb-10 italic text-on-surface">Luận Giải Tổng Quan</h2>
            <div className="max-w-4xl space-y-8 text-on-surface-variant leading-relaxed text-lg">
              {tongQuan.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="mt-12 flex flex-col items-center sm:items-start gap-6">
              <div className="h-px w-full bg-outline-variant/20"></div>
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-between">
                <div>
                  <p className="text-sm font-label text-tertiary uppercase tracking-widest mb-1">Sở hữu bản in đặc biệt</p>
                  <p className="text-on-surface-variant text-sm italic">Lưu giữ hành trình định mệnh của riêng bạn.</p>
                </div>
                <button className="group relative inline-flex items-center gap-3 bg-tertiary text-on-tertiary px-8 py-4 rounded-full font-headline font-bold hover:bg-tertiary-fixed transition-all duration-300 transform hover:-translate-y-1">
                  <span className="material-symbols-outlined">auto_stories</span>
                  <span>TẢI BẢN FULL (PDF) - 20.000đ</span>
                  <div className="absolute -inset-1 bg-tertiary/20 blur opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Quote */}
        <section className="mt-24 py-24 border-t border-outline-variant/15 text-center">
          <div className="max-w-3xl mx-auto space-y-12">
            <span className="material-symbols-outlined text-6xl text-tertiary/40">fluid</span>
            <h2 className="text-4xl md:text-5xl font-headline italic leading-tight text-on-surface text-gradient-gold px-4">
              "{tongQuan.finalQuote}"
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed px-6">
              <p>Mỗi chỉ dẫn trên đây là một mảnh ghép của bức tranh toàn cảnh. Đừng để những khó khăn làm chùn bước, cũng đừng để những vận may làm mờ mắt. Hãy sống với sự tỉnh thức và lòng trắc ẩn.</p>
              <p>Hãy bước ra thế giới, hỡi linh hồn dũng cảm, và viết tiếp chương rực rỡ nhất của chính mình.</p>
            </div>
            <div className="pt-8">
              <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-surface-container border border-tertiary/30 shadow-[0_0_30px_rgba(233,195,73,0.2)]">
                <span className="material-symbols-outlined text-5xl text-tertiary/80" style={{ fontVariationSettings: "'wght' 200, 'FILL' 0" }}>change_history</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
