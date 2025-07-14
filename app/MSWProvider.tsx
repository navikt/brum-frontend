'use client';
import { useEffect } from 'react';

const MSWProvider = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Starting MSW in development mode');
      import('@/common/mocks/browser').then(({ worker }) => {
        worker.start({
          serviceWorker: { url: '/mockServiceWorker.js' },
          onUnhandledRequest: 'bypass',
        });
      });
    }
  }, []);

  return null; 
};

export default MSWProvider;
