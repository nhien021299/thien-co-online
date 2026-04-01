import React from 'react';

export interface ReadonlyHeaderProps {}

export const Header: React.FC<ReadonlyHeaderProps> = () => {
  return (
    <header className="bg-[#111220]/70 backdrop-blur-xl text-[#c2c2f2] font-['Noto_Serif'] antialiased tracking-tight docked full-width top-0 sticky z-50 tonal-shift bg-[#191a29]/40 shadow-[0_40px_40px_-15px_rgba(194,194,242,0.06)]">
      <nav className="flex justify-center items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
        <div className="text-3xl font-['Noto_Serif'] italic tracking-tighter text-[#c2c2f2]">
          The Celestial Editorial
        </div>
      </nav>
    </header>
  );
};
