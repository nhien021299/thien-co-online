import React from 'react';
import { appData } from '@/data/mockData';

export interface ReadonlyFooterProps {}

export const Footer: React.FC<ReadonlyFooterProps> = () => {
  const { footer } = appData;
  return (
    <footer className="bg-[#111220] font-['Manrope'] text-sm tracking-wide w-full mt-24 border-t border-[#47464e]/15 tonal-shift top-border-only flex flex-col items-center gap-10 py-16 px-6 text-center">
      <div className="text-2xl font-['Noto_Serif'] text-[#e9c349]">{footer.brand}</div>
      <div className="flex flex-wrap justify-center gap-10">
        {footer.links.map((link, index) => (
          <a key={index} className="text-[#c8c5cf] hover:text-[#dcbaf4] transition-colors" href={link.url}>
            {link.label}
          </a>
        ))}
      </div>
      <p className="text-on-surface-variant/60 max-w-lg leading-relaxed">
        {footer.copyright}
      </p>
    </footer>
  );
};
