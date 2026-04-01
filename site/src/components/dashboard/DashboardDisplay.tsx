import React from 'react';
import { useAstroStore } from '@/store/useAstroStore';

export const DashboardDisplay: React.FC = () => {
  const store = useAstroStore();
  const userName = store.fullName || 'người tìm đạo';

  return (
    <div className="pt-6 pb-32 px-6 max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Welcome Section */}
      <header className="space-y-2">
        <p className="font-label text-sm font-semibold tracking-[0.2em] text-tertiary uppercase">HỒ SƠ TINH TÚ</p>
        <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">Xin chào, {userName}</h2>
      </header>

      {/* Daily Bite Section */}
      <section className="relative group overflow-hidden rounded-3xl bg-surface-container-high p-8 md:p-10 transition-all duration-500 border border-outline-variant/10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-tertiary">
              <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              <span className="font-label text-xs font-bold tracking-widest uppercase">Năng Lượng Ngày Hôm Nay</span>
            </div>
            <h3 className="font-headline text-2xl text-on-surface">Sự hội tụ của Sao Mộc và Sao Kim</h3>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              Hôm nay là thời điểm vàng để thực hiện các dự định sáng tạo. Sự dịch chuyển của các hành tinh cho thấy một luồng năng lượng dồi dào, giúp bạn kết nối sâu sắc hơn với bản ngã và những người xung quanh. Hãy tin vào trực giác của mình.
            </p>
          </div>
          <button className="flex-shrink-0 bg-gradient-to-br from-primary to-secondary text-on-primary-fixed px-8 py-3 rounded-full font-bold tracking-wide hover:scale-95 transition-transform duration-400">
            Đọc Chi Tiết
          </button>
        </div>
      </section>

      {/* Saved Charts Section */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="font-label text-[10px] font-bold tracking-[0.3em] text-on-surface-variant uppercase">Lưu Trữ Cá Nhân</p>
            <h3 className="font-headline text-3xl font-bold text-on-surface">Bản Đồ Sao Đã Lưu</h3>
          </div>
          <a className="text-tertiary font-label text-sm font-semibold border-b border-tertiary/30 pb-1 hover:border-tertiary transition-all" href="#view-all">Xem tất cả</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative overflow-hidden bg-surface-container-high rounded-3xl p-6 transition-all duration-500 cursor-pointer group hover:bg-surface-bright hover:shadow-[0_0_20px_2px_rgba(220,186,244,0.15)]">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">auto_graph</span>
              </div>
              <h4 className="font-headline text-xl font-bold text-on-surface">Bản đồ năm 2024</h4>
              <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest">Cập nhật: 12 Tháng 01</p>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-primary opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">temple_hindu</span>
          </div>
          
          {/* Card 2 */}
          <div className="relative overflow-hidden bg-surface-container-high rounded-3xl p-6 transition-all duration-500 cursor-pointer group hover:bg-surface-bright hover:shadow-[0_0_20px_2px_rgba(220,186,244,0.15)]">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <span className="material-symbols-outlined">nightlight</span>
              </div>
              <h4 className="font-headline text-xl font-bold text-on-surface">Nguyệt thực Tháng 10</h4>
              <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest">Cập nhật: 28 Tháng 10</p>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-primary opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">dark_mode</span>
          </div>
          
          {/* Card 3 */}
          <div className="relative overflow-hidden bg-surface-container-high rounded-3xl p-6 transition-all duration-500 cursor-pointer group hover:bg-surface-bright hover:shadow-[0_0_20px_2px_rgba(220,186,244,0.15)]">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary mb-6">
                <span className="material-symbols-outlined">balance</span>
              </div>
              <h4 className="font-headline text-xl font-bold text-on-surface">Cung Mọc Thiên Bình</h4>
              <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest">Cập nhật: 05 Tháng 11</p>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-primary opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">vape_free</span>
          </div>
        </div>
      </section>

      {/* Premium Insight Teaser */}
      <section className="flex flex-col md:flex-row gap-12 items-center py-10">
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-outline-variant/10">
            <img 
              alt="Nebula" 
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000" 
              src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80"
            />
          </div>
          <div className="absolute -bottom-6 -left-2 md:-left-6 bg-surface-container-highest/90 backdrop-blur-lg p-6 rounded-2xl border border-outline-variant/10 shadow-2xl max-w-xs">
            <p className="font-headline text-lg italic text-on-surface">"Tương lai không được định đoạt, nó được soi sáng."</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 space-y-6 md:pl-8">
          <span className="font-label text-xs font-bold tracking-[0.3em] text-secondary uppercase">Đặc Quyền Hội Viên</span>
          <h3 className="font-headline text-4xl leading-tight text-on-surface">Khám phá bản đồ định mệnh sâu sắc hơn</h3>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Nâng cấp lên gói Editorial Premium để nhận được những bản luận giải chuyên sâu từ các chiêm tinh gia hàng đầu, cùng các dự báo cá nhân hóa theo từng giờ.
          </p>
          <div className="pt-4">
            <button className="text-tertiary font-bold tracking-widest uppercase text-sm flex items-center gap-2 group hover:opacity-80 transition-opacity">
              Khám Phá Ngay
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_right_alt</span>
            </button>
            <div className="h-[1px] w-12 bg-tertiary mt-2"></div>
          </div>
        </div>
      </section>

    </div>
  );
};
