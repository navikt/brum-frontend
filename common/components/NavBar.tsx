'use client';
import '@navikt/ds-css';
import { ActionMenu, InternalHeader, Page } from '@navikt/ds-react';
import Graph from '@/common/components/graph';
import UserInfo from '@/common/components/userInfo';
import { InternalHeaderButton, InternalHeaderTitle } from '@navikt/ds-react/InternalHeader';
import { ActionMenuContent, ActionMenuTrigger } from '@navikt/ds-react/ActionMenu';
import { useEffect, useState } from 'react';
import { logger } from '@navikt/next-logger';

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/oauth2/session', { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to check session');
        const data = await response.json();
        setIsLoggedIn(data.session?.active ?? false);
      } catch (error) {
        logger.warn('Not logged in cant render navbar');
        console.error(error);
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <InternalHeader>
          <InternalHeaderTitle as="h1">Brum</InternalHeaderTitle>
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
        </InternalHeader>
      </div>
    );
  }
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
