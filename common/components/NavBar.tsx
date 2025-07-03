'use client';
import {
  InternalHeader,
  InternalHeaderUser,
  InternalHeaderUserButton,
} from '@navikt/ds-react/InternalHeader';
import { useUser } from '../hooks/getUser';
import { UserMenu } from './UserMenu';
import { PersonIcon } from '@navikt/aksel-icons';

export default function NavBar() {
  const user = useUser();

  return (
    <InternalHeader className="px-4">
      <InternalHeader.Title href="/">Brum</InternalHeader.Title>

      <InternalHeaderUser name={''} />

      {user && (
        <InternalHeaderUser name={user.username} description={user.oid}>
          <InternalHeaderUserButton name={user.username} aria-label="Åpne brukermeny">
            <PersonIcon aria-hidden />
          </InternalHeaderUserButton>
          <UserMenu user={user} />
        </InternalHeaderUser>
      )}
    </InternalHeader>
  );
}
