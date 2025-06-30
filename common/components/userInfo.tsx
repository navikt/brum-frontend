'use client'
import Link from "next/link";
import { Button, Dropdown, Loader } from '@navikt/ds-react';
import { DropdownMenuGroupedList,DropdownMenuGroupedListHeading,DropdownMenuGroupedListItem,DropdownMenuList,DropdownMenuListItem,DropdownMenu,DropdownMenuDivider} from '@navikt/ds-react/Dropdown';

const UserInfo = () => {
  return (
    <div className="min-h-32">
      <Dropdown>
        <Button as={Dropdown.Toggle}>Nahom Berhane</Button>
        <DropdownMenu>
          <DropdownMenuGroupedList>
            <DropdownMenuGroupedListHeading>
             Account
            </DropdownMenuGroupedListHeading>
            <DropdownMenuGroupedListItem onClick={() => {}}>
              Nahom Berhane
            </DropdownMenuGroupedListItem>
            <DropdownMenuGroupedListItem as="a" href="https://nav.no">
              Nahom.berhne@nav.no
            </DropdownMenuGroupedListItem>
          </DropdownMenuGroupedList>
          <DropdownMenuDivider />
          <DropdownMenuList>
            <DropdownMenuListItem as={Link} href="https://nav.no">
              Kontakt
            </DropdownMenuListItem>
            <DropdownMenuListItem
              as={Link}
              href="https://nav.no"
              target="_blank"
            >
            logg ut
            </DropdownMenuListItem>
          </DropdownMenuList>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const mainStyles: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default UserInfo;