'use client';
import '@navikt/ds-css';
import { ActionMenu, InternalHeader } from '@navikt/ds-react';
import Graph from '@/common/components/graph';
import UserInfo from '@/common/components/userInfo';
import { InternalHeaderButton, InternalHeaderTitle } from '@navikt/ds-react/InternalHeader';
import { ActionMenuContent, ActionMenuTrigger } from '@navikt/ds-react/ActionMenu';

export default function NavBar() {
  return (
    <div>
      <InternalHeader>
        <InternalHeaderTitle as="h1">Brum</InternalHeaderTitle>

        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <ActionMenu>
            <ActionMenuTrigger>
              <InternalHeaderButton>Se graf</InternalHeaderButton>
            </ActionMenuTrigger>
            <ActionMenuContent>
              <div style={{ minWidth: 500 }}>
                <Graph />
              </div>
            </ActionMenuContent>
          </ActionMenu>

          <div style={{ marginLeft: 'auto' }}>
            <UserInfo />
          </div>
        </div>
      </InternalHeader>
    </div>
  );
}
