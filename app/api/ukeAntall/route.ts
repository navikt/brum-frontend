import { NextRequest, NextResponse } from 'next/server';
import { hentBrukerToken, hentOboAccessToken, requireEnv, sendFeilMelding } from '@/lib/utils/api';
import { testData } from '@/mocks/mocks';

// Henter antall uker for valgt år og uke
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json(testData);
  }
  try {
    // Hent brukertoken fra header
    const brukerToken = hentBrukerToken(req);
    if (!brukerToken) {
      return NextResponse.json(
        { melding: 'Ikke autorisert: Brukersesjon kreves.' },
        { status: 401 },
      );
    }

    // Hent OBO-token
    const oboAccessToken = await hentOboAccessToken(brukerToken);
    if (!oboAccessToken) {
      return NextResponse.json(
        { melding: 'Intern serverfeil: Klarte ikke hente OBO-token.' },
        { status: 500 },
      );
    }

    // Hent miljøvariabel for API-URL
    const BRUM_API_URL = requireEnv('BRUM_API_URL');

    // Hent parametere fra URL
    const { searchParams } = new URL(req.url);
    const aar = searchParams.get('aar');
    const uke = searchParams.get('uke');

    // Forespørsel mot Ktor API
    const ktorResponse = await fetch(`${BRUM_API_URL}/ukeAntall?aar=${aar}&uke=${uke}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${oboAccessToken}`,
      },
    });

    if (!ktorResponse.ok) {
      const feilBody = await ktorResponse.text();
      return NextResponse.json(
        { melding: 'Ktor API-forespørsel feilet', feil: feilBody },
        { status: ktorResponse.status },
      );
    }

    const data = await ktorResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return sendFeilMelding(error);
  }
}