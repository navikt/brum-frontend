'use client'
import Link from "next/link";
import { Button, Dropdown, Loader } from '@navikt/ds-react';
import { DropdownMenuGroupedList,DropdownMenuGroupedListHeading,DropdownMenuGroupedListItem,DropdownMenuList,DropdownMenuListItem,DropdownMenu,DropdownMenuDivider} from '@navikt/ds-react/Dropdown';
import { useEffect, useState } from 'react';
import { logger } from '@navikt/next-logger';
import { redirect } from 'next/navigation'
import { PersonIcon } from '@navikt/aksel-icons';

export default function  UserInfo() {
  const [userInfo, setUserInfo] = useState<{
    oid: string;
    username: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/userInfo");
        if (!response.ok) throw new Error("Failed to fetch user info");
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


  //const handlelogoutClick = () => {
    // localStorage.removeItem("token");
    // redirect('/oauth2/logout');
  // };

  if(userInfo ){
    return (
      <div className="min-h-32">
        <PersonIcon title="a11y-title" fontSize="1.5rem" />
        <Dropdown>
          <DropdownMenu>
            <DropdownMenuGroupedList>
              <DropdownMenuGroupedListHeading>
                Konto
              </DropdownMenuGroupedListHeading>
              <DropdownMenuGroupedListItem>
                {userInfo.username}
              </DropdownMenuGroupedListItem>
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
        <PersonIcon/>
      </div>
    );
  }
};

const mainStyles: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};
