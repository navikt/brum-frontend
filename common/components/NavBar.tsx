'use client';
import { InternalHeader } from '@navikt/ds-react';
import { useUser } from '../hooks/getUser';
import { UserMenu } from './UserMenu';
import { PersonIcon } from '@navikt/aksel-icons';
import { ThemeButton } from "./themeButton";

export default function NavBar() {
  const user = useUser();

  return (
    <InternalHeader className="px-4">
      <InternalHeader.Title href="/">Brum</InternalHeader.Title>

      <InternalHeader.User name={''} />

      {user && (
        <InternalHeader.User name={user.username} description={user.oid}>
          <InternalHeader.UserButton name={user.username} aria-label="Åpne brukermeny">
            <PersonIcon aria-hidden />
          </InternalHeader.UserButton>
          <UserMenu user={user} />
        </InternalHeader.User>
      )}
      <ThemeButton/>
    </InternalHeader>
  );
}
