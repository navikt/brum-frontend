'use client';

import NavBar from '@/components/layout/NavBar';
import { Theme } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { ThemeType } from '../lib/types/theme';
import { ThemeContext } from './ThemeContext';

/**
 * ThemeProvider - Hovedkomponent for tema-håndtering
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType | null>(null);

  // Initialiser tema ved første lasting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const htmlTheme = document.documentElement.className;
      
      if (htmlTheme === 'light' || htmlTheme === 'dark') {
        setTheme(htmlTheme as ThemeType);
      } else {
        const savedTheme = localStorage.getItem('theme') as ThemeType | null;
        
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme);
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setTheme(prefersDark ? 'dark' : 'light');
        }
      }
    }
  }, []);

  // Oppdater localStorage og DOM når tema endres
  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
      document.documentElement.className = theme;
      console.log(`🎨 Tema endret til: ${theme}`);
    }
  }, [theme]);

  // Vent til tema er initialisert
  if (!theme) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme theme={theme}>
        <NavBar />
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}