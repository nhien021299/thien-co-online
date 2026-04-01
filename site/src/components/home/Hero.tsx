import React from 'react';
import { appData } from '@/data/mockData';

export interface ReadonlyHeroProps {}

export const Hero: React.FC<ReadonlyHeroProps> = () => {
  const { hero } = appData;
  return (
    <div className="text-center mb-20">
      <span className="font-label text-sm uppercase tracking-[0.3em] text-tertiary mb-6 block">
        {hero.subtitle}
      </span>
      <h1 className="font-headline text-5xl md:text-7xl text-on-surface tracking-tight leading-tight max-w-3xl mx-auto">
        {hero.title}
      </h1>
      <p className="mt-8 text-on-surface-variant max-w-xl mx-auto text-xl font-light leading-relaxed">
        {hero.description}
      </p>
    </div>
  );
};
