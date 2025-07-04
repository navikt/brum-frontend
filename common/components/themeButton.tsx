'use client';
import { MoonIcon, SunIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

function ThemeButton({ setTheme, theme }: any) {
  return (
    <>
      <Button
        variant="secondary"
        icon={
          <>
            <MoonIcon
              style={{ display: 'var(--website-theme-toggle-dark-display)' }}
              title="Endre til mørkt"
            />
            <SunIcon
              style={{ display: 'var(--website-theme-toggle-light-display)' }}
              title="Endre til lyst"
            />
          </>
        }
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
    </>
  );
}

export { ThemeButton };
