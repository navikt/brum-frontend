import { NextRequest, NextResponse } from 'next/server';
import { getOboToken } from './getOboToken';

// Henter brukertoken fra request header
export function getUserToken(req: NextRequest): string | null {
  return req.headers.get('authorization')?.replace('Bearer ', '') ?? null;
}
// Henter OBO-token for å kalle Ktor API
export async function getOboAccessToken(userToken: string): Promise<string | null> {
  return await getOboToken(userToken);
}

// Henter miljøvariabel og kaster feil hvis den ikke er definert
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} er ikke definert i miljøvariabler`);
  return value;
}

// Håndterer feil i API-kall og returnerer JSON-respons
export function handleError(error: unknown) {
  return NextResponse.json(
    {
      melding: 'En feil oppstod',
      feil: error instanceof Error ? error.message : 'Ukjent feil',
    },
    { status: 500 },
  );
}
