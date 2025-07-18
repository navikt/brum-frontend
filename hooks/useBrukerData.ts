'use client';
import { logger } from '@navikt/next-logger';
import { useEffect, useState } from 'react';
import BrukerData from '../lib/types/brukerData';

/**
 * Hook for å hente brukerdata
 *
 * @returns BrukerData eller null hvis ikke innlogget
 */
export default function useBruker() {
  const [bruker, setBruker] = useState<BrukerData | null>(null);

  useEffect(() => {
    fetch('/api/brukerData')
      .then((respons) => {
        if (!respons.ok) throw new Error('Kunne ikke hente brukerdata');
        return respons.json();
      })
      .then(setBruker)
      .catch((feil) => {
        logger.warn('Kunne ikke laste brukerdata', feil);
        setBruker(null);
      });
  }, []);

  return bruker;
}
