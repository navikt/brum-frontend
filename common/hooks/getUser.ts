'user client'
import { useEffect, useState } from 'react';
import { logger } from '@navikt/next-logger';

export function useUser() {
  const [user, setUser] = useState<{ oid: string; username: string } | null>(null);

  useEffect(() => {
    fetch('/api/userInfo')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(setUser)
      .catch((err) => {
        logger.warn('Could not load user', err);
        setUser(null);
      });
  }, []);

  return user;
}
