'use client';

import { useState, useEffect } from 'react';

const SECTIONS = ['hero', 'experience', 'highlights', 'skills', 'work', 'education', 'contact'];

export function useActiveSection(): string {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100; // offset for sticky nav height

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= scrollY) {
          setActive(SECTIONS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return active;
}
