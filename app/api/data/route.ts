import { testData } from '@/mocks/mocks';
import { NextRequest, NextResponse } from 'next/server';
import { getOboToken } from '../../../lib/auth/token';

/**
 * GET endpoint for å hente Brum-data
 *
 * I utviklingsmiljø returneres mock-data, i produksjon hentes
 * data fra backend API ved hjelp av OBO-token.
 */
export async function GET(req: NextRequest) {
  // Returner mock-data i utviklingsmiljø
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json(testData);
  }

  try {
    // Hent brukertoken fra Authorization header
    const brukerToken = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!brukerToken) {
      console.error('Ingen brukertoken oppgitt i forespørselen');
      return NextResponse.json(
        { melding: 'Unauthorized: Brukerautentisering påkrevd' },
        { status: 401 },
      );
    }

    // Hent OBO-token for backend-kall
    const oboAccessToken = await getOboToken(brukerToken);
    if (!oboAccessToken) {
      console.error('Klarte ikke å hente OBO-token fra Texas');
      return NextResponse.json(
        { melding: 'Intern serverfeil: Kunne ikke hente OBO-token' },
        { status: 500 },
      );
    } else {
      console.log('OBO-token hentet vellykket');
    }

    // Valider at backend URL er konfigurert
    const BRUM_API_URL = process.env.BRUM_API_URL;
    if (!BRUM_API_URL) {
      throw new Error('BRUM_API_URL er ikke definert i miljøvariabler');
    }

    // Hent dataset-parameter fra query
    const { searchParams } = new URL(req.url);
    const datasetnr = searchParams.get('dataset');

    // Kall backend API
    const backendRespons = await fetch(`${BRUM_API_URL}/testData?dataset=${datasetnr}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${oboAccessToken}`,
      },
    });

    if (!backendRespons.ok) {
      const feilmelding = await backendRespons.text();
      console.error(`Backend API-kall feilet med status ${backendRespons.status}:`, feilmelding);
      return NextResponse.json(
        { melding: 'Backend API-kall feilet', feil: feilmelding },
        { status: backendRespons.status },
      );
    }

    const dataFraBackend = await backendRespons.json();
    return NextResponse.json(dataFraBackend, { status: 200 });
  } catch (feil) {
    console.error('En feil oppstod under behandling av forespørselen:', feil);
    return NextResponse.json(
      {
        melding: 'Intern serverfeil',
        feil: feil instanceof Error ? feil.message : 'Ukjent feil',
      },
      { status: 500 },
    );
  }
}
