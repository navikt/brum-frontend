'use client';
import { useEffect } from 'react';

/**
 * MSWProvider - Mock Service Worker Provider
 */
const MSWProvider = () => {
  useEffect(() => {
    // Kun start MSW i utviklingsmiljø
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Starter Mock Service Worker i utviklingsmiljø');

      // Dynamisk import for å unngå å laste MSW i produksjon
      import('../mocks/browser')
        .then(({ worker }) => {
          worker.start({
            serviceWorker: { url: '/mockServiceWorker.js' },
            onUnhandledRequest: 'bypass',
          });
          console.log('✅ Mock Service Worker startet');
        })
        .catch((error) => {
          console.error('❌ Feil ved oppstart av Mock Service Worker:', error);
        });
    }
  }, []);

  return null;
};

export default MSWProvider;
