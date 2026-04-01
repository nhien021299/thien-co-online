import React from 'react';
import { useAstroStore } from '@/store/useAstroStore';
import { Link } from '@tanstack/react-router';

export const NatalChartDisplay: React.FC = () => {
  const store = useAstroStore();

  return (
    <div className="w-full max-w-2xl mx-auto pt-6 pb-24 px-6 md:px-12 relative animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-20">
        <div className="absolute top-[10%] left-[-10%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--color-primary-container)_0%,_transparent_100%)] blur-[120px]"></div>
      </div>

      {/* Hero Section: Asymmetric Title */}
      <section className="mb-12 relative">
        <span className="font-label text-tertiary text-[10px] uppercase tracking-[0.2em] mb-2 block">Vận Mệnh Tinh Tú</span>
        <h2 className="font-headline text-4xl leading-tight tracking-tight max-w-[80%] text-on-surface">
          Bức Tranh Thiên Hà Của {store.fullName || 'Bạn'}
        </h2>
      </section>

      {/* Circular Astronomical Chart: Intentional Asymmetry */}
      <section className="relative mb-16 flex justify-end -mr-12 md:mr-0 md:justify-center">
        <div className="relative w-80 h-80 filter drop-shadow-[0_0_15px_rgba(194,194,242,0.2)]">
          {/* SVG Chart Concept */}
          <svg className="w-full h-full transform -rotate-12" viewBox="0 0 200 200">
            {/* Outer Ring */}
            <circle cx="100" cy="100" fill="none" opacity="0.4" r="95" stroke="#47464e" strokeDasharray="2 4" strokeWidth="0.5"></circle>
            <circle cx="100" cy="100" fill="none" opacity="0.3" r="85" stroke="#c2c2f2" strokeWidth="0.2"></circle>
            {/* Zodiac Segments */}
            <g opacity="0.6">
              <line stroke="#47464e" strokeWidth="0.2" x1="100" x2="100" y1="15" y2="185"></line>
              <line stroke="#47464e" strokeWidth="0.2" x1="15" x2="185" y1="100" y2="100"></line>
              <line stroke="#47464e" strokeWidth="0.2" x1="40" x2="160" y1="40" y2="160"></line>
              <line stroke="#47464e" strokeWidth="0.2" x1="40" x2="160" y1="160" y2="40"></line>
            </g>
            {/* Inner Details */}
            <circle cx="100" cy="100" fill="none" r="40" stroke="#e9c349" strokeDasharray="1 2" strokeWidth="0.5"></circle>
            <circle cx="100" cy="100" fill="#e9c349" r="1"></circle>
            {/* Floating Points */}
            <circle className="animate-pulse" cx="150" cy="60" fill="#c2c2f2" r="3"></circle>
            <circle cx="60" cy="140" fill="#dcbaf4" r="2"></circle>
            <circle cx="110" cy="30" fill="#e9c349" r="1.5"></circle>
          </svg>
          {/* Decorative Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="material-symbols-outlined text-9xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
          </div>
        </div>
      </section>

      {/* Big Details: Vertically Stacked Bento-ish Cards */}
      <section className="space-y-4 mb-16">
        {/* Sun Sign */}
        <div className="bg-surface-container-high rounded-full p-6 flex items-center gap-6 group hover:bg-surface-bright transition-all duration-500 cursor-default relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-tertiary shadow-lg group-hover:scale-110 duration-500 shrink-0">
            <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>light_mode</span>
          </div>
          <div>
            <span className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest block mb-1">Cung Mặt Trời</span>
            <h3 className="font-headline text-2xl text-on-surface">Sư Tử</h3>
          </div>
          <span className="material-symbols-outlined absolute right-8 opacity-5 text-8xl text-primary pointer-events-none hidden sm:block">light_mode</span>
        </div>
        
        {/* Moon Sign */}
        <div className="bg-surface-container-high rounded-full p-6 flex items-center gap-6 group hover:bg-surface-bright transition-all duration-500 cursor-default relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary shadow-lg group-hover:scale-110 duration-500 shrink-0">
            <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>dark_mode</span>
          </div>
          <div>
            <span className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest block mb-1">Cung Mặt Trăng</span>
            <h3 className="font-headline text-2xl text-on-surface">Song Ngư</h3>
          </div>
          <span className="material-symbols-outlined absolute right-8 opacity-5 text-8xl text-primary pointer-events-none hidden sm:block">dark_mode</span>
        </div>
        
        {/* Rising Sign */}
        <div className="bg-surface-container-high rounded-full p-6 flex items-center gap-6 group hover:bg-surface-bright transition-all duration-500 cursor-default relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-secondary shadow-lg group-hover:scale-110 duration-500 shrink-0">
            <span className="material-symbols-outlined text-3xl">expand_less</span>
          </div>
          <div>
            <span className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest block mb-1">Cung Mọc</span>
            <h3 className="font-headline text-2xl text-on-surface">Thiên Yết</h3>
          </div>
          <span className="material-symbols-outlined absolute right-8 opacity-5 text-8xl text-primary pointer-events-none hidden sm:block">expand_less</span>
        </div>
      </section>

      {/* Short Summary */}
      <section className="mb-16">
        <div className="bg-surface-container-low p-8 rounded-3xl relative">
          <span className="material-symbols-outlined text-tertiary opacity-40 absolute top-4 left-6">format_quote</span>
          <p className="font-body text-lg leading-relaxed text-on-surface italic text-center px-4">
            Tâm hồn bạn là một bản giao hưởng giữa khát vọng rực rỡ và chiều sâu nội tâm bí ẩn. Vũ trụ đang mời gọi bạn bước vào hành trình tự khám phá bản thân qua lăng kính của những vì sao.
          </p>
        </div>
      </section>

      {/* CTA Button */}
      <section className="flex flex-col items-center gap-6">
        <Link 
          to="/reading" 
          className="bg-gradient-to-br from-primary to-secondary text-on-primary-fixed font-bold py-5 px-10 rounded-full w-full max-w-xs shadow-[0_10px_30px_rgba(194,194,242,0.15)] active:scale-95 hover:scale-[1.02] transition-all duration-400 font-body flex items-center justify-center gap-3"
        >
          Đọc Luận Giải Chi Tiết
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
        <button className="text-tertiary font-label text-sm tracking-widest hover:opacity-80 transition-opacity">
          <span className="border-b border-tertiary/30 pb-1">TẢI BẢN ĐỒ PDF (Sắp có)</span>
        </button>
      </section>
      
    </div>
  );
};
