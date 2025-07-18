import BrukerData from '@/lib/types/brukerData';
import { hentBrukerToken, hentOboAccessToken, requireEnv, sendFeilMelding } from '@/lib/utils/api';
import { logger } from '@navikt/next-logger';
import { NextRequest, NextResponse } from 'next/server';

// Henter brukerinfo fra Ktor API
export async function GET(req: NextRequest) {
  // For utvikling: return mock brukerinfo
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({
      NAVident: 'Z123456',
      email: 'test.user@nav.no',
      name: 'Test User',
    });
  }
  try {
    // Sjekker om brukersesjon finnes
    const brukerToken = hentBrukerToken(req);
    if (!brukerToken) {
      return NextResponse.json(
        { melding: 'Ikke autorisert: Brukersesjon kreves.' },
        { status: 401 },
      );
    }
    // Introspekter brukerens token for å bekrefte at det er gyldig
    const introspeksjonUrl = requireEnv('NAIS_TOKEN_INTROSPECTION_ENDPOINT');
    const introspeksjonRes = await fetch(introspeksjonUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identity_provider: 'azuread',
        token: brukerToken,
      }),
    });

    const introspeksjonBody = await introspeksjonRes.json();

    if (!introspeksjonBody.active) {
      return NextResponse.json({ melding: 'Bruker ikke innlogget.' }, { status: 401 });
    }

    // Henter OBO-token for å kalle Ktor API
    const oboAccessToken = await hentOboAccessToken(brukerToken);
    if (!oboAccessToken) {
      return NextResponse.json(
        { melding: 'Intern serverfeil: Klarte ikke hente OBO-token.' },
        { status: 500 },
      );
    }
    // Kaller Ktor API for å hente brukerinfo med OBO-token
    const BRUM_API_URL = requireEnv('BRUM_API_URL');
    const ktorResponse = await fetch(`${BRUM_API_URL}/bruker-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
    // Leser og returnerer brukerinfo fra Ktor API
    const data = await ktorResponse.json();
    const userInfo: BrukerData = {
      NAVident: data.NAVident,
      email: data.email,
      name: data.name,
    };
    logger.warn('Brukerinfo:', userInfo);

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return sendFeilMelding(error);
  }
}
