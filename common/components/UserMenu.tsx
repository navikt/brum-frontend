'use client';
import { ActionMenu, Button } from '@navikt/ds-react';
import Link from 'next/link';
import { PersonIcon } from '@navikt/aksel-icons';
import {
  ActionMenuTrigger,
  ActionMenuContent,
  ActionMenuGroup,
  ActionMenuItem,
  ActionMenuDivider,
} from '@navikt/ds-react/ActionMenu';

export function UserMenu({ user }: { user: { oid: string; username: string } }) {
  return (
    <ActionMenu>
      <ActionMenuTrigger>
        <Button>
          <PersonIcon title={user.oid} />
        </Button>
      </ActionMenuTrigger>

      <ActionMenuContent align="end" className="w-48">
        <ActionMenuGroup label={user.oid}>
          <ActionMenuItem disabled as="div">
            {user.username}
          </ActionMenuItem>
        </ActionMenuGroup>

        <ActionMenuDivider />
        <ActionMenuDivider />

        <ActionMenuGroup label="logg ut knapp">
          <ActionMenuItem as={Link} href="/oauth2/logout">
            Logg ut
          </ActionMenuItem>
        </ActionMenuGroup>
      </ActionMenuContent>
    </ActionMenu>
  );
}
