'use client';

import { Button, ErrorSummary, ExpansionCard, Heading, Loader, Spacer } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Graph from '@/common/components/graph';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const response = await fetch('/oauth2/session');
        if (!response.ok) throw new Error('Network response was not ok');
        const authData = await response.json();
        if (authData.session && authData.session.active) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setError('Kunne ikke sjekke autentisering');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLoginClick = () => {
    window.location.href = '/oauth2/login';
  };

  const handleGoToDashboardClick = () => {
    route.push('/dashboard');
  };

  if (error) {
    return (
      <main style={mainStyles}>
        <div
          style={{
            minWidth: 340,
            maxWidth: 400,
            width: '100%',
            margin: '0 auto',
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 4px 24px #0001',
            padding: '2rem',
          }}
        >
          <ErrorSummary heading="Feil ved" size="medium">
            <ErrorSummaryItem href="#1">Inloigging feilet. Vennligst prøv igjen.</ErrorSummaryItem>
            <ErrorSummaryItem>ERROR: {error}</ErrorSummaryItem>
          </ErrorSummary>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main style={mainStyles}>
        <Loader size="xlarge" title="Laster..." />
        <p>Sjekker påloggingsstatus...</p>
      </main>
    );
  }

  return (
    <main style={mainStyles}>
      <Heading level="1" size="large" align="center" spacing>
        Velkommen til Brum
      </Heading>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#444' }}>Analyse av tiltak</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        {isAuthenticated ? (
          <Button variant="primary" onClick={handleGoToDashboardClick}>
            Gå til Dashboard
          </Button>
        ) : (
          <Button variant="primary" onClick={handleLoginClick} style={{ width: '200px' }}>
            Logg inn
          </Button>
        )}

        <ExpansionCard aria-label="dev check graph">
          <ExpansionCard.Header>Dev: Inspect graph</ExpansionCard.Header>
          <ExpansionCard.Content>
            <Graph filnavn="xxy" />
          </ExpansionCard.Content>
        </ExpansionCard>
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
