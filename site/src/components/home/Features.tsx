import React from 'react';
import { appData } from '@/data/mockData';

export interface ReadonlyFeaturesProps {}

export const Features: React.FC<ReadonlyFeaturesProps> = () => {
  const { features } = appData;
  return (
    <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 w-full text-center relative z-10">
      {features.map((feature) => (
        <div key={feature.id} className="flex flex-col items-center">
          <span className="material-symbols-outlined text-5xl text-tertiary mb-6" data-icon={feature.icon}>
            {feature.icon}
          </span>
          <h3 className="font-headline text-2xl mb-3">{feature.title}</h3>
          <p className="text-base text-on-surface-variant font-light px-4">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};
