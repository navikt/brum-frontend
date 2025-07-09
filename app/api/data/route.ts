import { NextRequest, NextResponse } from 'next/server';
import { getOboToken } from '../../../common/utils/getOboToken';

export async function GET(req: NextRequest) {
  try {
    const userToken = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!userToken) {
      console.error(
        'No user token provided in the request headers (Authorization header missing or empty).',
      );
      return NextResponse.json(
        { message: 'Unauthorized: User session required.' },
        { status: 401 },
      );
    }

    const oboAccessToken = await getOboToken(userToken);
    if (!oboAccessToken) {
      console.error('Failed to obtain OBO access token from Texas.');
      return NextResponse.json(
        { message: 'Internal Server Error: Unable to obtain OBO token.' },
        { status: 500 },
      );
    } else {
      console.log('OBO access token obtained successfully');
    }

    const BRUM_API_URL = process.env.BRUM_API_URL;
    if (!BRUM_API_URL) {
      throw new Error(
        'BRUM_API_URL is not defined in environment variables for Next.js API route.',
      );
    }

    const { searchParams } = new URL(req.url);
    const datasetnr = searchParams.get('dataset');

    const ktorResponse = await fetch(`${BRUM_API_URL}/testData?dataset=${datasetnr}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${oboAccessToken}`,
      },
    });

    if (!ktorResponse.ok) {
      const ktorErrorBody = await ktorResponse.text();
      console.error(`Ktor API request failed with status ${ktorResponse.status}:`, ktorErrorBody);
      return NextResponse.json(
        { message: 'Ktor API request failed', error: ktorErrorBody },
        { status: ktorResponse.status },
      );
    }

    const dataFromKtor = await ktorResponse.text();
    const ktorContentType = ktorResponse.headers.get('Content-Type') || 'text/plain';
    return new NextResponse(dataFromKtor, {
      status: 200,
      headers: {
        'Content-Type': ktorContentType,
      },
    });
  } catch (error) {
    console.error('An error occurred while processing the request in Next.js API route:', error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
