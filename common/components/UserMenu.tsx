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
          {user.username[1] + ',' +user.username[2]}
        </Button>
      </ActionMenuTrigger>
      <ActionMenuContent>
        <ActionMenuGroup label="Min info">
          <ActionMenuItem onSelect={console.info}>Email: {user.username[0]}</ActionMenuItem>
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