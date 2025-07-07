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
          {user.username}
        </Button>
      </ActionMenuTrigger>
      <ActionMenuContent>
        <ActionMenuGroup label="Min info">
          <ActionMenuItem onSelect={console.info}>Navn: {user.username}</ActionMenuItem>
          <ActionMenuItem onSelect={console.info}>NAV-ID: {user.NAVident}</ActionMenuItem>
          <ActionMenuItem onSelect={console.info}>OID: {user.oid}</ActionMenuItem>
          <ActionMenuItem onSelect={console.info}>Grupper: {user.groups.join(', ')}</ActionMenuItem>
          <ActionMenuItem onSelect={console.info}>Rolle: {user.roles?.join(', ')}</ActionMenuItem>
          <ActionMenuItem onSelect={console.info}>Scop: {user.scp?.join(', ')}</ActionMenuItem>
          <ActionMenuItem onSelect={console.info}>ID-typ: {user.idtyp}</ActionMenuItem> 
        </ActionMenuGroup>
        <br/>
          <ActionMenuItem>
            <a href="/loggut">Logg ut</a>
          </ActionMenuItem>
      </ActionMenuContent>
    </ActionMenu>
  );
}