'use client';
import { MoonIcon, SunIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useTheme } from '../../providers/ThemeContext';

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Button
        variant="secondary"
        value={theme === 'light' ? 'dark' : 'light'}
        icon={
          theme === 'light' ? (
            <MoonIcon title="Endre til mørkt" />
          ) : (
            <SunIcon title="Endre til lyst" />
          )
        }
        onClick={(e) => {
          setTheme(e.currentTarget.value as 'light' | 'dark');
          localStorage.setItem('theme', e.currentTarget.value);
        }}
      />
    </>
  );
}

export { ThemeButton };
