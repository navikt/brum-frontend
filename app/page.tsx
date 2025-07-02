'use client';

import { Button, ErrorSummary, Heading, Loader, Spacer } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const route = useRouter();

  const handleGoToDashboardClick = () => {
    route.push('/dashboard');
  };
  return (
    <main style={mainStyles}>
      <Heading level="1" size="large" align="center" spacing>
        Velkommen til Brum
      </Heading>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#444' }}>Analyse av tiltak</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <Button variant="primary" onClick={handleGoToDashboardClick}>
            Gå til Dashboard
          </Button>
      </div>
      <Spacer />
    </main>
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

export default Home;
