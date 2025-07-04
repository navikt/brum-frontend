'use client';

import { Theme } from '@navikt/ds-react';
import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return 'light';
  });

  return (
    <Theme theme={theme}>
      <NavBar theme={theme} setTheme={setTheme} />
      {children}
    </Theme>
  );
}
