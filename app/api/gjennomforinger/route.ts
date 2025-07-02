import { NextRequest, NextResponse } from 'next/server';
import { getOboToken } from '../../../common/utils/getOboToken';
import { logger } from '@navikt/next-logger';

export async function GET(req: NextRequest) {
  try {
    const userToken = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!userToken) {
      console.error('No user token provided in the request headers.');
      return NextResponse.json(
        { message: 'Unauthorized: User session required.' },
        { status: 401 },
      );
    }

    const introspectionUrl = process.env.NAIS_TOKEN_INTROSPECTION_ENDPOINT;
    if (!introspectionUrl) {
      throw new Error('NAIS_TOKEN_INTROSPECTION_ENDPOINT is not defined in environment variables');
    }

    const introspectionRes = await fetch(introspectionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identity_provider: 'azuread',
        token: userToken,
      }),
    });

    const introspectionBody = await introspectionRes.json();
    logger.warn(introspectionBody);

    if (!introspectionBody.active) {
      console.error('User not logged in.');
      return NextResponse.json({ message: 'User not logged in' }, { status: 401 });
    }

    const oboAccessToken = await getOboToken(userToken);
    if (!oboAccessToken) {
      console.error('Failed to obtain OBO access token from Texas (userinfo).');
      return NextResponse.json(
        { message: 'Internal Server Error: Unable to obtain OBO token.' },
        { status: 500 },
      );
    }

    const BRUM_API_URL = process.env.BRUM_API_URL;
    if (!BRUM_API_URL) {
      throw new Error('BRUM_API_URL is not defined in environment variables.');
    }

    const ktorResponse = await fetch(`${BRUM_API_URL}/gjennomforing`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${oboAccessToken}`,
      },
    });

    if (!ktorResponse.ok) {
      const errorBody = await ktorResponse.text();
      console.error(`Ktor API request failed with status ${ktorResponse.status}:`, errorBody);
      return NextResponse.json(
        { message: 'Ktor API request failed', error: errorBody },
        { status: ktorResponse.status },
      );
    }

    const data = await ktorResponse.text;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in userInfo API handler:', error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
