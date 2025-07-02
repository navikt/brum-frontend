'use client';
import Link from 'next/link';
import { Button, Dropdown } from '@navikt/ds-react';
import {
  DropdownMenuGroupedList,
  DropdownMenuGroupedListHeading,
  DropdownMenuGroupedListItem,
  DropdownMenuList,
  DropdownMenuListItem,
  DropdownMenu,
  DropdownMenuDivider,
} from '@navikt/ds-react/Dropdown';
import { useEffect, useState } from 'react';
import { logger } from '@navikt/next-logger';

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState<{
    oid: string;
    username: string;
    groups: string[];
  } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/userInfo');
        if (!response.ok) throw new Error('Failed to fetch user info');
        const userData = await response.json();
        setUserInfo(userData);
      } catch (error) {
        logger.warn("Not logged in, can't render user info");
        console.error(error);
        setUserInfo(null);
      }
    };
    fetchUserInfo();
  }, []);

  if (userInfo == null) {
    return <div>null</div>;
  }

  return (
    <div className="min-h-32">
      <Dropdown>
        <Button as={Dropdown.Toggle}>{userInfo.username}</Button>
        <DropdownMenu>
          <DropdownMenuGroupedList>
            <DropdownMenuGroupedListHeading>Konto</DropdownMenuGroupedListHeading>
            <DropdownMenuGroupedListItem>{userInfo.username}</DropdownMenuGroupedListItem>
            <DropdownMenuGroupedListItem as="a" href="#">
              {userInfo.username}
            </DropdownMenuGroupedListItem>
          </DropdownMenuGroupedList>
          <DropdownMenuDivider />
          <DropdownMenuList>
            <DropdownMenuListItem as={Link} href="https://nav.no">
              Kontakt
            </DropdownMenuListItem>
            <DropdownMenuListItem as={Link} href="/oauth2/logout">
              Logg ut
            </DropdownMenuListItem>
          </DropdownMenuList>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

const mainStyles: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};
