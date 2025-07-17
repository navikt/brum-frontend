'use client';
import { BrukerData } from '@/lib/types/brukerData';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuGroup,
  ActionMenuItem,
  ActionMenuTrigger,
} from '@navikt/ds-react/ActionMenu'; 

export function UserMenu({ user }: { user: BrukerData }) {
  return (
    <ActionMenu>
      <ActionMenuTrigger>
        <Button
          variant="secondary-neutral"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          {user.name}
        </Button>
      </ActionMenuTrigger>
      <ActionMenuContent>
        <ActionMenuGroup label="Min Bruker">
          <ActionMenuItem onSelect={console.info}>Email: {user.email}</ActionMenuItem>
          <ActionMenuItem onSelect={console.info}>NAV-ID: {user.NAVident}</ActionMenuItem>
        </ActionMenuGroup>
        <br />
        <ActionMenuItem>
          <a href="/oauth2/logout">Logg ut</a>
        </ActionMenuItem>
      </ActionMenuContent>
    </ActionMenu>
  );
}
