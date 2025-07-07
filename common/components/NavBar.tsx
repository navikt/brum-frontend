'use client';

import { useUser } from '../hooks/getUser';
import { UserMenu } from './UserMenu';
import { BarChartIcon, ChevronDownIcon, PersonIcon } from '@navikt/aksel-icons';
import { ThemeButton } from './ThemeButton';
import { ActionMenu, Button, InternalHeader, Spacer, Theme } from '@navikt/ds-react';
import {
  ActionMenuTrigger,
  ActionMenuContent,
  ActionMenuGroup,
  ActionMenuItem,
} from '@navikt/ds-react/ActionMenu';
import { UserInfo } from '../types/userInfoTypes';

export default function NavBar() {
  const user = useUser();
  return (
    <InternalHeader className="px-4" data-color="Blue-100">
      <InternalHeader.Title href="/">
        <BarChartIcon title="a11y-title" fontSize="1.5rem" />
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

export function DummyBar() {
  return (
    <Theme>
      <InternalHeader>
        <InternalHeader.Title href="/">
          <BarChartIcon title="a11y-title" fontSize="1.5rem" />
          Brum
        </InternalHeader.Title>
      </InternalHeader>
    </Theme>
  );
}
