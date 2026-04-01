import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export const BottomNavBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { id: '/', icon: 'auto_awesome', label: 'Home' },
    { id: '/natal-chart', icon: 'explore', label: 'Chart' },
    { id: '/reading', icon: 'menu_book', label: 'Read' },
    { id: '/dashboard', icon: 'person', label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-surface/90 backdrop-blur-2xl flex justify-around items-center px-8 pb-safe z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(194,194,242,0.08)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.id || (item.id !== '/' && location.pathname.startsWith(item.id));
        
        return (
          <Link
            key={item.id}
            to={item.id}
            className={cn(
              "flex flex-col items-center justify-center p-3 transition-all duration-500",
              isActive 
                ? "text-tertiary bg-surface-container rounded-full scale-110" 
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface rounded-full"
            )}
          >
            <span 
              className="material-symbols-outlined" 
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
