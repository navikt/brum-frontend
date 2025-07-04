'use client';

import { Theme } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>();
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else {
      setTheme('light');
    }
  }, []);

  if (!theme) return null; // or a loader

  return (
    <Theme theme={theme}>
      <NavBar theme={theme} setTheme={setTheme} />
      {children}
    </Theme>
  );
}
