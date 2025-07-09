'use client';

import { Theme } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { ThemeContext, ThemeType } from './ThemeContext';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') setTheme(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <Theme theme={theme}>
        <NavBar />
        {children}
      </Theme>
    </ThemeContext>
  );
}
