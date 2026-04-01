import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAstroStore } from '@/store/useAstroStore';
import { cn } from '@/lib/utils';
import type { CungData } from '@/lib/astrology/types';

// Layout grid map for Tử Vi (4x4 grid with central hole)
// Iztro indices 0=Tý, 1=Sửu... 11=Hợi
const GRID_POSITION_MAP: Record<number, string> = {
  5: "col-start-1 row-start-1", // Tỵ
  6: "col-start-2 row-start-1", // Ngọ
  7: "col-start-3 row-start-1", // Mùi
  8: "col-start-4 row-start-1", // Thân
  9: "col-start-4 row-start-2", // Dậu
  10: "col-start-4 row-start-3", // Tuất
  11: "col-start-4 row-start-4", // Hợi
  0: "col-start-3 row-start-4",  // Tý
  1: "col-start-2 row-start-4",  // Sửu
  2: "col-start-1 row-start-4",  // Dần
  3: "col-start-1 row-start-3",  // Mão
  4: "col-start-1 row-start-2",  // Thìn
};

const getElementColor = (star: any) => {
  switch (star.element) {
    case 'Kim': return 'text-slate-200 drop-shadow-[0_0_2px_rgba(226,232,240,0.5)]'; // Trắng xám
    case 'Mộc': return 'text-emerald-400 drop-shadow-[0_0_2px_rgba(52,211,153,0.3)]'; // Xanh lá
    case 'Thủy': return 'text-sky-300 drop-shadow-[0_0_3px_rgba(125,211,252,0.4)]'; // Xanh biển nhạt
    case 'Hỏa': return 'text-rose-400 drop-shadow-[0_0_2px_rgba(251,113,133,0.3)]'; // Đỏ
    case 'Thổ': return 'text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.3)]'; // Vàng
    default: return 'text-zinc-400';
  }
};

export const ReadingDisplay: React.FC = () => {
  const result = useAstroStore(state => state.result);
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  const handleUnlock = () => {
    navigate({ to: '/reading/detail' });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!result || !result.chart || !isClient) return null;
  const { chart } = result;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 animate-in fade-in duration-1000">
      <header className="text-center mb-12 md:mb-16 space-y-4">
        <h2 className="font-headline text-4xl md:text-6xl text-white font-black tracking-tight italic drop-shadow-2xl">Lá Số <span className="text-gradient-gold not-italic">Tử Vi</span></h2>
        <p className="text-on-surface-variant font-medium tracking-[0.2em] uppercase text-xs md:text-sm opacity-80 italic">The Celestial Monograph • 2026</p>
      </header>

      {/* Main Astrology Grid (4x4) */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-2 md:gap-3 lg:gap-4 w-full max-w-[1400px] mx-auto">
        
        {/* 12 Palaces */}
        {chart.cungs.map((cung: CungData, idx: number) => {
          const isMenh = cung.key === 'menh';
          return (
            <div 
              key={idx} 
              className={cn(
                "group relative min-h-[280px] lg:min-h-[320px] p-3 lg:p-5 rounded-2xl md:rounded-3xl transition-all duration-500 border border-white/5 flex flex-col hover:border-primary/30 z-10",
                GRID_POSITION_MAP[idx] || "",
                isMenh ? "bg-primary/10 border-primary/25 ring-1 ring-primary/20 shadow-[inset_0_0_20px_rgba(194,194,242,0.1)]" : "bg-surface-container-low/40 hover:bg-surface-container-low/60 shadow-xl"
              )}
            >
              {/* Badges */}
              <div className="absolute top-3 right-3 flex flex-col gap-1 items-end z-20">
                 {cung.isThan && <span className="bg-red-500/90 text-white text-[7px] lg:text-[9px] font-black px-1.5 py-0.5 rounded uppercase italic shadow-lg">Thân</span>}
                 {cung.isTriet && <span className="bg-black/80 text-white text-[7px] lg:text-[8px] font-black px-1.5 py-0.5 rounded border border-white/20 uppercase">Triệt</span>}
                 {cung.isTuan && <span className="bg-zinc-800/80 text-white text-[7px] lg:text-[8px] font-black px-1.5 py-0.5 rounded border border-white/10 uppercase">Tuần</span>}
              </div>

              <header className="mb-4 lg:mb-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 relative">
                  <span className="text-[10px] lg:text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-50">{cung.branch}</span>
                  
                  <div className="absolute left-1/2 -translate-x-1/2 top-0">
                    <h4 className={cn("text-[10px] lg:text-xs font-headline font-bold uppercase tracking-widest", isMenh ? "text-primary italic" : "text-on-surface/60 group-hover:text-primary transition-colors")}>{cung.label}</h4>
                  </div>

                  {cung.isVoChinhDieu ? (
                    <span className="text-[8px] lg:text-[9px] font-black text-white/20 uppercase italic">VCD</span>
                  ) : <div className="w-4" />}
                </div>
              </header>

              <div className="space-y-4 flex-1 overflow-hidden">
                {/* Main Stars */}
                <div className={cn("font-black text-[11px] lg:text-[14px] leading-tight mb-2 uppercase tracking-tight flex flex-col items-center", isMenh ? "text-primary" : "text-white")}>
                  {cung.mainStars.map((s, i: number) => (
                    <div key={i} className={cn(
                      "w-full text-center flex items-center justify-center gap-1",
                      getElementColor(s)
                    )}>
                      {s.name} 
                      {s.brightness && <span className="text-[9px] lg:text-[11px] opacity-60 font-bold">({s.brightness})</span>}
                    </div>
                  ))}
                </div>
                
                {/* Minor Stars */}
                <div className="w-full h-full text-[10px] lg:text-[12px] font-bold leading-[1.6]">
                  <div className="flex justify-between h-full">
                    {/* Cát Tinh (Trái) */}
                    <div className="flex flex-col items-start gap-px">
                      {cung.minorStars.filter(s => s.side === 'left').map((s, i) => (
                        <span key={i} className={cn("whitespace-nowrap overflow-hidden text-ellipsis", getElementColor(s))}>
                          {s.name} {s.brightness && <span className="opacity-60 text-[8px] lg:text-[10px]">({s.brightness})</span>}
                        </span>
                      ))}
                    </div>
                    {/* Hung/Sát Tinh (Phải) */}
                    <div className="flex flex-col items-end gap-px text-right">
                      {cung.minorStars.filter(s => s.side === 'right').map((s, i) => (
                        <span key={i} className={cn("whitespace-nowrap overflow-hidden text-ellipsis", getElementColor(s))}>
                          {s.name} {s.brightness && <span className="opacity-60 text-[8px] lg:text-[10px]">({s.brightness})</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Luu Stars */}
                {cung.luuStars.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-white/5 opacity-40">
                    {cung.luuStars.map((ls, i: number) => (
                       <span key={i} className="text-[7px] lg:text-[9px] font-black text-tertiary italic">L.{ls}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mt-2 pt-2 border-t border-white/5 relative">
                <span className="text-[8px] lg:text-[10px] text-on-surface font-black opacity-40">{cung.ageRange}</span>
                <span className="text-[9px] lg:text-[11px] font-black text-rose-500/90 drop-shadow-[0_0_5px_rgba(244,63,94,0.3)] absolute left-1/2 -translate-x-1/2 bottom-0">{cung.trangSinh}</span>
                <span className="text-[8px] lg:text-[10px] text-tertiary font-black italic">{cung.tieuVan}</span>
              </div>
            </div>
          );
        })}

        {/* Central Information (Center Hole of Grid) */}
        <div className="hidden md:flex col-span-2 row-span-2 col-start-2 row-start-2 bg-gradient-to-br from-surface-container/20 to-surface-container/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 lg:p-10 flex-col justify-center items-center relative overflow-hidden z-0 shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
          
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            
            <div className="text-center mb-6 space-y-2">
              <p className="text-[10px] lg:text-[11px] text-tertiary uppercase tracking-widest font-semibold opacity-90">Chương trình luận giải Tử Vi bằng AI</p>
              <h1 className="text-sm lg:text-base text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-[0.2em] font-black border-b border-transparent">Thiên Cơ</h1>
              <h2 className="text-3xl lg:text-5xl font-headline font-black tracking-widest text-white mt-4 uppercase drop-shadow-lg p-3">Lá Số Tử Vi</h2>
            </div>

            <div className="w-full max-w-[85%] grid grid-cols-[100px_1fr_1fr] lg:grid-cols-[120px_1fr_1fr] gap-x-4 gap-y-3.5 items-center text-[12px] lg:text-[14px] border-t border-white/10 pt-6">
              <span className="text-white/60 font-medium">Họ tên</span>
              <span className="col-span-2 font-black text-white text-[16px] lg:text-[18px] tracking-wide">{chart.center.fullName}</span>

              <span className="text-white/60 font-medium">Năm</span>
              <span className="font-bold text-white tabular-nums">{chart.center.solarBirthday.split('-')[0]}</span>
              <span className="font-bold text-tertiary drop-shadow-[0_0_8px_rgba(233,195,73,0.3)] tabular-nums">{chart.center.canChiYear}</span>

              <span className="text-white/60 font-medium">Tháng</span>
              <span className="font-bold text-white tabular-nums">{chart.center.solarBirthday.split('-')[1]}</span>
              <span className="font-bold text-white/50 text-[10px] lg:text-[11px] italic">(Âm Lịch)</span>

              <span className="text-white/60 font-medium">Ngày</span>
              <span className="font-bold text-white tabular-nums">{chart.center.solarBirthday.split('-')[2]}</span>
              <span className="font-bold text-white/50 text-[10px] lg:text-[11px] italic">(Âm Lịch)</span>

              <span className="text-white/60 font-medium">Giờ</span>
              <span className="font-bold text-white tabular-nums">{chart.center.hourBranch}</span>
              <span className="font-bold text-tertiary drop-shadow-[0_0_8px_rgba(233,195,73,0.3)]">{chart.center.hourBranch}</span>

              <span className="text-white/60 font-medium">Năm xem</span>
              <span className="font-bold text-white tabular-nums">2026</span>
              <span className="font-bold text-tertiary">Bính Ngọ <span className="opacity-70 font-normal">({2026 - parseInt(chart.center.solarBirthday.split('-')[0]) + 1} tuổi)</span></span>

              <div className="col-span-3 h-px bg-white/5 my-1" />

              <span className="text-white/60 font-medium">Âm Dương</span>
              <span className="col-span-2 font-bold text-white uppercase tracking-wider">{chart.center.gender} <span className="opacity-50 mx-2">•</span> <span className="text-white/80 capitalize">{chart.center.quote.includes('thuận lý') ? 'Âm dương thuận lý' : 'Âm dương nghịch lý'}</span></span>

              <span className="text-white/60 font-medium">Mệnh</span>
              <span className="col-span-2 font-black uppercase text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.3)] tracking-wider">{chart.center.menhNguHanh}</span>

              <span className="text-white/60 font-medium">Cục</span>
              <div className="col-span-2 flex flex-col gap-0.5">
                <span className="font-black uppercase text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)] tracking-wider">{chart.center.cucName}</span>
                <span className="text-[10px] lg:text-[11px] opacity-70 italic">{chart.center.sinhKhacNote}</span>
              </div>
              
              <div className="col-span-3 h-px bg-white/5 my-1" />

              <span className="text-white/60 font-medium">Mệnh chủ</span>
              <span className="col-span-2 font-black uppercase tracking-widest text-[#a8b1ff] drop-shadow-[0_0_5px_rgba(168,177,255,0.4)]">{chart.center.menhChu || 'Vũ Khúc'}</span>

              <span className="text-white/60 font-medium">Thân chủ</span>
              <span className="col-span-2 font-black uppercase tracking-widest text-[#a8b1ff] drop-shadow-[0_0_5px_rgba(168,177,255,0.4)]">{chart.center.thanChu || 'Thiên Cơ'}</span>
            </div>

            {/* Red Stamp Fake */}
            <div className="absolute bottom-10 right-10 w-[70px] h-[70px] lg:w-[90px] lg:h-[90px] border-[3px] border-red-600/80 rounded flex items-center justify-center p-1.5 rotate-[-8deg] opacity-80 mix-blend-screen shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              <div className="w-full h-full border-2 border-red-600/60 rounded-sm flex items-center justify-center relative">
                 <span className="text-red-500 font-serif font-black text-[14px] lg:text-[18px] leading-[0.85] text-center transform scale-y-[1.4] tracking-tighter mix-blend-screen">PHONG<br/>THỦY</span>
                 <div className="absolute inset-0 bg-red-600/10" />
              </div>
            </div>

            <div className="absolute top-10 right-10 z-20">
              <button 
                onClick={() => navigate({ to: '/reading/detail' })}
                className="px-4 lg:px-6 py-2 lg:py-2.5 bg-white/10 hover:bg-white/20 text-white font-black text-[9px] lg:text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 shadow-xl"
              >
                Mở Luận Giải
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Interpretation Sections */}
      <section className="mt-24 space-y-8 max-w-4xl mx-auto">
        {/* Personality Section */}
        <div className="bg-surface-container/50 rounded-xl p-10 border border-outline-variant/10 relative overflow-hidden group transition-all hover:bg-surface-container/80">
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
            <span className="material-symbols-outlined text-[160px]">auto_awesome</span>
          </div>
          <h4 className="font-headline text-2xl text-primary mb-6 flex items-center gap-4">
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
            Cá Tính & Bản Mệnh
          </h4>
          <p className="text-on-surface-variant leading-relaxed text-base md:text-lg">
            {result.summary?.general || (
              <span className="flex items-center gap-1">
                Đang phân tích
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
              </span>
            )}
          </p>
        </div>

        {/* Career Section */}
        <div className="bg-surface-container/50 rounded-xl p-10 border border-outline-variant/10 relative overflow-hidden group transition-all hover:bg-surface-container/80">
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
            <span className="material-symbols-outlined text-[160px]">trending_up</span>
          </div>
          <h4 className="font-headline text-2xl text-primary mb-6 flex items-center gap-4">
            <span className="material-symbols-outlined text-xl">stars</span>
            Sự Nghiệp & Công Danh
          </h4>
          <p className="text-on-surface-variant leading-relaxed text-base md:text-lg">
            {result.summary?.career || (
              <span className="flex items-center gap-1">
                Đang phân tích
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
              </span>
            )}
          </p>
        </div>

        {/* Romance & Marriage Section */}
        <div className="bg-surface-container/50 rounded-xl p-10 border border-outline-variant/10 relative overflow-hidden group transition-all hover:bg-surface-container/80">
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
            <span className="material-symbols-outlined text-[160px]">favorite</span>
          </div>
          <h4 className="font-headline text-2xl text-primary mb-6 flex items-center gap-4">
            <span className="material-symbols-outlined text-xl">favorite</span>
            Tình Duyên & Phu Thê
          </h4>
          <p className="text-on-surface-variant leading-relaxed text-base md:text-lg mt-4 whitespace-pre-wrap">
            {result.summary?.love || (
              <span className="flex items-center gap-1">
                Đang phân tích
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <div 
        className="mt-20 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-primary/10 max-w-5xl mx-auto"
        style={{
          background: "radial-gradient(circle at top left, rgba(194, 194, 242, 0.08), transparent), radial-gradient(circle at bottom right, rgba(220, 186, 244, 0.08), transparent), #191a29"
        }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-tertiary text-3xl">lock</span>
            </div>
          </div>
          <h3 className="font-headline text-3xl md:text-4xl text-on-surface mb-6 font-bold">Mở Khóa Định Mệnh Toàn Diện</h3>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-base md:text-lg">
            Báo cáo chuyên sâu 50 trang phân tích chi tiết từng góc khuất của bản mệnh, giúp bạn nắm bắt thời cơ và hóa giải vận hạn trong 10 năm tới.
          </p>
          
          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              <span className="text-xs font-label uppercase tracking-wider text-on-surface/80">Chi tiết 12 cung số</span>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              <span className="text-xs font-label uppercase tracking-wider text-on-surface/80">Đại vận 10 năm tới</span>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              <span className="text-xs font-label uppercase tracking-wider text-on-surface/80">Lời khuyên bậc thầy</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleUnlock}
              className="bg-gradient-to-br from-[#c2c2f2] to-[#dcbaf4] text-on-primary-fixed font-extrabold px-12 py-5 rounded-full hover:scale-105 transition-all shadow-[0_10px_30px_rgba(194,194,242,0.3)] flex items-center justify-center gap-4 group"
            >
              <span className="flex items-center gap-2">
                Mở khóa ngay
              </span>
              <span className="text-sm opacity-90 border-l border-on-primary-fixed/20 pl-4 font-bold tracking-tight">20.000đ</span>
            </button>
            <button 
              onClick={() => navigate({ to: '/reading/detail' })}
              className="text-primary border border-primary/30 px-10 py-5 rounded-full hover:bg-primary/5 transition-colors font-bold text-sm tracking-widest uppercase flex justify-center w-full sm:w-auto"
            >
              Xem bản mẫu
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-10 text-[10px] text-outline uppercase tracking-[0.2em] font-label">
            <span className="flex items-center gap-2.5"><span className="material-symbols-outlined text-sm">verified_user</span> Bảo mật tuyệt đối</span>
            <span className="flex items-center gap-2.5"><span className="material-symbols-outlined text-sm">bolt</span> Nhận kết quả tức thì</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-32 border-t border-outline-variant/10">
        <div className="flex flex-col items-center gap-10 py-16 px-4 w-full text-center max-w-7xl mx-auto">
          <div className="font-headline text-xl text-primary italic">The Celestial Editorial</div>
          <nav className="flex flex-wrap justify-center gap-8 font-body text-xs tracking-widest uppercase text-outline">
            <a className="hover:text-secondary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-secondary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-secondary transition-colors" href="#">Consultations</a>
            <a className="hover:text-secondary transition-colors" href="#">Contact</a>
          </nav>
          <p className="font-body text-sm tracking-wide text-on-surface-variant/60 max-w-md italic">
            © 2026 The Celestial Editorial. All rights reserved. Your destiny is written in the stars.
          </p>
        </div>
      </footer>
    </div>
  );
};
