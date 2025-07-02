'use client';
import '@navikt/ds-css';
import { InternalHeader } from '@navikt/ds-react';
import UserInfo from '@/common/components/userInfo';
import { InternalHeaderTitle } from '@navikt/ds-react/InternalHeader';

export default function NavBar() {
  return (
    <div>
      <InternalHeader>
        <InternalHeaderTitle as="h1">Brum</InternalHeaderTitle>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div style={{ marginLeft: 'auto' }}>
            <UserInfo />
          </div>
        </div>
      </InternalHeader>
    </div>
  );
}
