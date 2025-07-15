'use client';

import { Theme } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { ThemeContext, ThemeType } from './ThemeContext';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const htmlTheme = document.documentElement.className;
      if (htmlTheme === 'light' || htmlTheme === 'dark') {
        setTheme(htmlTheme as ThemeType);
      } else {
        setTheme('light');
      }
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
      document.documentElement.className = theme;
    }
  }, [theme]);

  if (!theme) return null;

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <Theme theme={theme}>
        <NavBar />
        {children}
      </Theme>
    </ThemeContext>
  );
}