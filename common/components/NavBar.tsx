'use client';

import { BarChartIcon } from '@navikt/aksel-icons';
import { Button, InternalHeader, Spacer, Theme } from '@navikt/ds-react';
import { useUser } from '../hooks/getUser';
import { ThemeButton } from './ThemeButton';
import { UserMenu } from './UserMenu';

export default function NavBar() {
  const user = useUser();
  return (
    <InternalHeader className="px-4" data-color="Blue-100">
      <InternalHeader.Title href="/">
        <img
          src="/assets/StatBear.svg"
          alt="Brum logo"
          style={{
            height: '2rem',
            width: 'auto',
            verticalAlign: 'middle',
            marginRight: '0.5rem',
          }}
        />
        Brum
      </InternalHeader.Title>

      <Spacer />
      {user ? (
        <UserMenu user={user} />
      ) : (
        <Button as="a" href="/oauth2/login" variant="secondary-neutral">
          Logg inn
        </Button>
      )}
      <ThemeButton />
    </InternalHeader>
  );
}
