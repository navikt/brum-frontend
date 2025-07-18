import { NextRequest, NextResponse } from 'next/server';
import { getOboToken } from '../auth/token';

/**
 * Henter brukertoken fra request header
 *
 * @param forespørsel - NextRequest objekt
 * @returns Brukertoken eller null hvis ikke funnet
 */
export function hentBrukerToken(forespørsel: NextRequest): string | null {
  return forespørsel.headers.get('authorization')?.replace('Bearer ', '') ?? null;
}

/**
 * Henter OBO-token for å kalle backend API
 *
 * @param brukerToken - Brukerens access token
 * @returns OBO access token eller null hvis feil
 */
export async function hentOboAccessToken(brukerToken: string): Promise<string | null> {
  return await getOboToken(brukerToken);
}

/**
 * Henter miljøvariabel og kaster feil hvis den ikke er definert
 *
 * @param navn - Navn på miljøvariabel
 * @returns Verdien av miljøvariabelen
 * @throws Error hvis miljøvariabel ikke er definert
 */
export function requireEnv(navn: string): string {
  const verdi = process.env[navn];
  if (!verdi) throw new Error(`${navn} er ikke definert i miljøvariabler`);
  return verdi;
}

/**
 * Håndterer feil i API-kall og returnerer JSON-respons
 *
 * @param feil - Feil som oppstod
 * @returns NextResponse med feilmelding
 */
export function sendFeilMelding(feil: unknown) {
  return NextResponse.json(
    {
      melding: 'En feil oppstod',
      detaljer: feil instanceof Error ? feil.message : 'Ukjent feil',
    },
    { status: 500 },
  );
}
