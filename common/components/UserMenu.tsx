'use client';
import { Button } from '@navikt/ds-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import {
  ActionMenu,
  ActionMenuTrigger,
  ActionMenuContent,
  ActionMenuGroup,
  ActionMenuItem,
} from '@navikt/ds-react/ActionMenu';
import { UserInfo } from '../types/userInfoTypes';

type UserMenuProps = {
  user: UserInfo;
};

export function UserMenu({ user }: UserMenuProps) {
  return (
    <ActionMenu>
      <ActionMenuTrigger>
        <Button
          variant="secondary-neutral"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          {getNameOnly(user.username)}
        </Button>
      </ActionMenuTrigger>
      <ActionMenuContent>
        <ActionMenuGroup label="Min info">
          <ActionMenuItem onSelect={console.info}>Email: {user.username}</ActionMenuItem>
          <ActionMenuItem onSelect={console.info}>NAV-ID: {user.NAVident}</ActionMenuItem>
        </ActionMenuGroup>
        <br/>
          <ActionMenuItem>
            <a href="/oauth2/logout">Logg ut</a>
          </ActionMenuItem>
      </ActionMenuContent>
    </ActionMenu>
  );
}


function getNameOnly(user: string): string {
  const [namePart] = user.split('@');

  const [first, last] = namePart.split('.');
  if (!first || !last) return 'Ukjent bruker';

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  return `${capitalize(first)} ${capitalize(last)}`;
}