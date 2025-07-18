import { logger } from '@navikt/next-logger';
import { NextRequest, NextResponse } from 'next/server';
import {
  hentBrukerToken,
  hentOboAccessToken,
  requireEnv,
  sendFeilMelding,
} from '../../../lib/utils/api';

// Henter gjennomføringer fra Ktor API
export async function GET(req: NextRequest) {
  try {
    // hent brukertoken fra header
    const brukerToken = hentBrukerToken(req);
    if (!brukerToken) {
      logger.error('Ingen brukertoken i forespørselen.');
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
      logger.error('Bruker ikke innlogget.');
      return NextResponse.json({ melding: 'Bruker ikke innlogget.' }, { status: 401 });
    }
    // Hent OBO-token for å kalle Ktor API
    const oboAccessToken = await hentOboAccessToken(brukerToken);
    if (!oboAccessToken) {
      logger.error('Klarte ikke hente OBO-token.');
      return NextResponse.json(
        { melding: 'Intern serverfeil: Klarte ikke hente OBO-token.' },
        { status: 500 },
      );
    }
    // Kaller Ktor API for å hente gjennomføringer med OBO-token
    const BRUM_API_URL = requireEnv('BRUM_API_URL');
    const ktorResponse = await fetch(`${BRUM_API_URL}/gjennomforing`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${oboAccessToken}`,
      },
    });

    if (!ktorResponse.ok) {
      const feilBody = await ktorResponse.text();
      logger.error(`Ktor API-forespørsel feilet med status ${ktorResponse.status}:`, feilBody);
      return new NextResponse(feilBody, {
        status: ktorResponse.status,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const data = await ktorResponse.text();
    return new NextResponse(data, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    logger.error('Feil i gjennomføringer API-handler:', error);
    return sendFeilMelding(error);
  }
}
